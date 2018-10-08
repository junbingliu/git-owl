<%@ page import="net.xinshi.is1.appmarket.bean.App" %>
<%@ page import="net.xinshi.isone.modules.appmarket.Is1AppMarketEngine" %>
<%@ page import="net.xinshi.isone.modules.user.LoginSessionUtils" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String appId = request.getParameter("appId");
    if(appId!=null){
        App app = Is1AppMarketEngine.appPages.getApp(appId);
        if(app!=null){
            request.setAttribute("appName",app.getName());
        }
    }

    String userId = LoginSessionUtils.getBackendLoginUserId(request);
    if(!StringUtils.equals("u_1",userId) && !StringUtils.equals("u_0",userId)){
        out.print("没有权限！");
        return;
    }
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>安装新程序</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <link href="/resources/bootstrap/css/bootstrap.css" rel="stylesheet">
    <style>
        body {
            padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */
        }
    </style>
    <link href="/resources/bootstrap/css/bootstrap-responsive.css" rel="stylesheet">

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
    <script src="/resources/bootstrap/js/html5shiv.js"></script>
    <![endif]-->

</head>

<body>


<div class="container">

    <p><a href="listLocalApps.jsp?m=${param.m}" class="btn btn-primary">管理已有应用</a></p>

   <form action="uploadAppOk.jsp" enctype="multipart/form-data" method="post" class="form well">
       <fieldset>
           <legend>本地上传新应用</legend>
           <label>名称：</label>
           <input type="text" placeholder="应用的名称" name="appName" value="${appName}">
           <input type="text" name="appId" value="${param.appId}"/>
           <input type="hidden" name="m" value="${param.m}"/>
           <label>程序文件:</label>
           <input type="file" name="appZip">
           <div class="form-actions"><button type="submit" class="btn btn-success">确定提交</button></div>
       </fieldset>
   </form>

</div>
<!-- /container -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="/resources/bootstrap/js/jquery.js"></script>
<script src="/resources/bootstrap/js/bootstrap.min.js"></script>


</body>
</html>