# owl_externalApps
owl的手写的apps,不能通过dsl语言自动生成的部分

owlplatform
docker based owl run time platform for fast development of real life apps

docker-compose up

启动后

在浏览器输入： http://localhost/setup/setup.jsp

http://localhost:81 --- graphite 用于监控

http://localhost:9090 --- zkui

http://localhost:5601 --- kibana 用于监控elastic的状态

http://localhost/owl_userRegister/pages/login.jsx --- 用户注册登录

http://localhost/owl/shopLogin.jsx --- 后台登录 root/123456

http://localhost/appMarket/installLocal/listLocalApps.jsp ---管理已经安装好的apps

在host文件里面加上

127.0.0.1 img_dev.oowl365.com local.img_dev.oowl365.com

需要重新初始化的时候：

1.docker-compose down 这一步会删除所有的containers,而不仅仅是停止docker containers

docker volume prune 这一步会删除所有的数据，这样就变成一个全新的环境了。
3.docker-compose up 重新启动

当需要更新的时候：

1.git pull 获取最新的包

2.docker-compose down

3.docker volume prune

4.docker-compose build 重新构建源

5.docker-compose up

清空数据以后需要重新运行setup