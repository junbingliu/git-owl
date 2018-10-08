<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="net.xinshi.is1.appmarket.bean.App" %>
<%@ page import="net.xinshi.isone.modules.appmarket.Is1AppMarketEngine" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Collections" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>安装失败</title>
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

   <div class="alert">
       <strong>安装失败！</strong>请联系系统管理员查明原因。
   </div>
    <a href="uploadApp.jsp">继续安装</a>

</div>
<!-- /container -->

<!-- Placed at the end of the document so the pages load faster -->
<script src="/resources/bootstrap/js/jquery.js"></script>
<script src="/resources/bootstrap/js/bootstrap.min.js"></script>


</body>
</html>