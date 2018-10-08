#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
#

FROM java:8
MAINTAINER zxy<zxy@xinshi.net>

ENV LOGGER_LEVEL=INFO
ENV MYSQL_HOST=mysql
ENV MYSQL_USER=root
ENV MYSQL_PASS=pigeon123456
ENV GRAPHITE_HOST=graphite
ENV GRAPHITE_PORT=2003
ENV GRAPHITE_PREFIX=pigeon
ENV ZK_SERVER=zkServer:2181
ENV SHARD_EXTERNAL_URL=http://shard0.img.owl.com
ENV EXTERNAL_URL=http://img.owl.com
ENV INTERNAL_URL=http://img_in.owl.com
ENV SHARD_INTERNAL_URL=http://shard0.img_in.owl.com

COPY server /server
COPY admin /admin

WORKDIR /server/bin

VOLUME ["/logs","/data", "/upload"]

ENTRYPOINT [ "/bin/bash", "/server/bin/entrypoint.sh" ]
