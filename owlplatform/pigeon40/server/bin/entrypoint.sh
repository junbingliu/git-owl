java -jar /admin/pigeonadmin.4.0-jar-with-dependencies.jar createCluster ${ZK_SERVER} /admin/oneShard.json platform
java -jar /admin/pigeonadmin.4.0-jar-with-dependencies.jar createCluster ${ZK_SERVER} /admin/oneShard.json saasadmin
java -jar /admin/pigeonadmin.4.0-jar-with-dependencies.jar createCluster ${ZK_SERVER} /admin/oneShard.json saasstat
java -jar /admin/pigeonadmin.4.0-jar-with-dependencies.jar createCluster ${ZK_SERVER} /admin/oneShard.json session
java -jar /admin/pigeonadmin.4.0-jar-with-dependencies.jar createCluster ${ZK_SERVER} /admin/oneShard.json appMarket
java -jar /admin/pigeonadmin.4.0-jar-with-dependencies.jar createCluster ${ZK_SERVER} /admin/oneShard.json publicApps
java -jar /admin/pigeonadmin.4.0-jar-with-dependencies.jar createCluster ${ZK_SERVER} /admin/oneShard.json blacklist
java -jar /admin/pigeonadmin.4.0-jar-with-dependencies.jar createCluster ${ZK_SERVER} /admin/oneShard.json shorturl
java -jar /admin/pigeonadmin.4.0-jar-with-dependencies.jar createCluster ${ZK_SERVER} /admin/oneShard.json logs
java -Dlog4j.configuration=file:../configs/log4j.properties -DNodeName=server1 -jar ../lib/pigeonserver.4.0-SNAPSHOT-jar-with-dependencies.jar ../configs/pigeonServerIsoneV45_develop.json 8876 50