<%@ page import="net.xinshi.pigeon.util.ClientTools" %>
<%@ page import="java.io.File" %>
<%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 12-12-9
  Time: 下午11:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    long begin = System.currentTimeMillis();
    ClientTools.createMainFile(new File("C:\\work\\isonev45new\\product-1.0-develop_community_discovery\\initscript2"));
    long end = System.currentTimeMillis();
%>


<html>
<head>
    <title>生成 all.jsx</title>
</head>
<body>
Success!!
耗时：<%=end-begin%>ms
</body>
</html>