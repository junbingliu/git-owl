FROM java:8

MAINTAINER Miguel Garcia Puyol <miguelpuyol@gmail.com>

WORKDIR /var/app

ADD zkui-*.jar /var/app/zkui.jar
ADD config.cfg /var/app/config.cfg
ADD bootstrap.sh /var/app/bootstrap.sh
ADD start.sh /var/app/start.sh

#ENTRYPOINT ["/var/app/bootstrap.sh"]

ENTRYPOINT ["/bin/bash","/var/app/start.sh"]

EXPOSE 9090
