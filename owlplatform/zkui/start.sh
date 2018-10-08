#!/usr/bin/env bash
ZK_SERVER=${ZK_SERVER:-"localhost:2181"}
sed -i "s/^zkServer=.*$/zkServer=$ZK_SERVER/" /var/app/config.cfg
java -jar /var/app/zkui.jar