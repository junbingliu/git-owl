
FROM tomcat:7.0.90-jre8
COPY server.xml /usr/local/tomcat/conf/server.xml
RUN rm -rf /usr/local/tomcat/webapps/ROOT
COPY web /usr/local/tomcat/webapps/ROOT
COPY setup /usr/local/tomcat/setup
COPY logging.properties /usr/local/tomcat/conf/
ARG debugDir=/tomcatdebug
RUN mkdir -pv ${debugDir}
ENV ApiServer=http://127.0.0.1:8080
ENV SandBox=/tomcatSandBox
RUN mkdir -pv ${SandBox}
ENV elasticSearchUrl=http://localhost:9200
ENV elasticSearchUser=elastic
ENV elasticSearchPass=changeme
ENV Xmx=-Xmx4048M
ENV SETUP_DIR=/usr/local/tomcat/setup

ENV JAVA_OPTS="${Xmx} -XX:MaxPermSize=512m -Drhino.sourceDir=${debugDir} -agentlib:jdwp=transport=dt_socket,address=4046,suspend=n,server=y -Drhino.debug=true -DApiServer=${ApiServer} -Dsandbox=${SandBox} -DelasticSearchUrl=${elasticSearchUrl} -DelasticSearchUser=${elasticSearchUser} -DelasticSearchPass=${elasticSearchPass}" 
