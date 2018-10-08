#!/usr/bin/env bash
echo "start entrypoint"
PORT0=${PORT0:-${BOOKIE_PORT}}
PORT0=${PORT0:-3181}
BK_DATA_DIR=${BK_DATA_DIR:-"/data/bookkeeper"}
BK_CLUSTER_ROOT_PATH=${BK_CLUSTER_ROOT_PATH:-""}
export BK_HOME=/opt/bookkeeper
export BK_bookiePort=${BK_bookiePort:-${PORT0}}
export BK_zkServers=${BK_zkServers}
export BK_zkLedgersRootPath=${BK_zkLedgersRootPath:-"${BK_CLUSTER_ROOT_PATH}/ledgers"}
export BK_journalDirectory=${BK_journalDirectory:-${BK_DATA_DIR}/journal}
export BK_ledgerDirectories=${BK_ledgerDirectories:-${BK_DATA_DIR}/ledgers}
export BK_indexDirectories=${BK_indexDirectories:-${BK_DATA_DIR}/index}
export BK_metadataServiceUri=${BK_metadataServiceUri:-"zk://${BK_zkServers}${BK_zkLedgersRootPath}"}
export BK_dlogRootPath=${BK_dlogRootPath:-"${BK_CLUSTER_ROOT_PATH}/distributedlog"}
python scripts/apply-config-from-env.py ${BK_HOME}/conf
export BOOKIE_CONF=${BK_HOME}/conf/bk_server.conf
export SERVICE_PORT=${PORT0}
#wait for zookeeper
until /opt/bookkeeper/bin/bookkeeper org.apache.zookeeper.ZooKeeperMain -server ${BK_zkServers} ls /; do sleep 5; done
mkdir -p "${BK_journalDirectory}" "${BK_ledgerDirectories}" "${BK_indexDirectories}"
echo "Created bookie dirs : "
echo "  journal = ${BK_journalDirectory}"
echo "  ledger = ${BK_ledgerDirectories}"
echo "  index = ${BK_indexDirectories}"
# -------------- #
# Allow the container to be started with `--user`
if [ "$(id -u)" = '0' ]; then
    chown -R "${BK_USER}:${BK_USER}" "${BK_journalDirectory}" "${BK_ledgerDirectories}" "${BK_indexDirectories}"
fi
# -------------- #
echo "create the zk root dir for bookkeeper"
/opt/bookkeeper/bin/bookkeeper org.apache.zookeeper.ZooKeeperMain -server ${BK_zkServers} create ${BK_CLUSTER_ROOT_PATH}
# Init the cluster if required znodes not exist in Zookeeper.
# Use ephemeral zk node as lock to keep initialize atomic.
/opt/bookkeeper/bin/bookkeeper shell initnewcluster
# Create default dlog namespace
# Use ephemeral zk node as lock to keep initialize atomic.
/opt/bookkeeper/bin/dlog admin bind -l ${BK_zkLedgersRootPath} -s ${BK_zkServers} -c distributedlog://${BK_zkServers}${BK_dlogRootPath}
/opt/bookkeeper/bin/bookkeeper bookie
