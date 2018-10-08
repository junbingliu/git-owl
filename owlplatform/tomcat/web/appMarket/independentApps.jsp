<%@ page import="net.xinshi.isone.modules.user.LoginSessionUtils" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<%
    String userId = LoginSessionUtils.getBackendLoginUserId(request);
    if (StringUtils.isBlank(userId)) {
        out.print("no privilege");
        return;
    }
    String merchantId = request.getParameter("m");
    request.setAttribute("isRootAdmin", false);
    if(userId.equals("u_0") && "head_merchant".equals(merchantId)){
        request.setAttribute("isRootAdmin", true);
    }
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>第一电商后台应用</title>
    <link rel="stylesheet" type="text/css" href="/resources/droptile/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/resources/droptile/css/Droptiles.css?v=14">

    <script src="/resources/droptile/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/droptile/js/jquery-ui-1.8.21.custom.min.js"></script>
    <script src="/resources/droptile/js/Knockout-2.1.0.js"></script>
    <!--[if lt IE 9]>
    <script src="/resources/bootstrap/js/html5shiv.js"></script>
    <![endif]-->
    <script type="text/javascript">
         var merchantId = "${param.m}";
    </script>

</head>

<body>

<div id="body" class="unselectable">
    <div id="navbar" class="navbar navbar-fixed-top">
        <div class="navbar-inner">
            <div class="container-fluid">
                <a class="pull-left" style="margin-top: 7px; margin-right: 5px;" href="">
                    <img src="/resources/droptile/img/avatar474_2.gif" style="max-height: 16px;" />
                </a>

                <div class="nav-collapse">
                    <ul class="nav">
                        <li><a class="active" href="javascript:void(0)" data-bind="click:searchAll"><i class="icon-th-large"></i>全部</a></li>
                        <c:if test="${isRootAdmin}">
                            <li><a href="#" id="uploadApp"><i class="icon-shopping-cart"></i>管理应用</a></li>
                        </c:if>
                        <li><a href="#"><i class="icon-gift"></i>最新消息</a></li>
                        <li>
                            <form id="searchForm" class="navbar-search pull-left">
                                <input id="searchText" type="text" class="search-query span2" name="q" placeholder="全部" data-bind="value:searchText,event:{keydown:keyUpFun}">
                                <button type="button" class="btn" data-bind="click:search">搜索</button>
                            </form>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    </div>
</div>

<div id="content">
    <div id="metro-sections-container" class="metro">
        <div class="metro-sections" >
            <div class="metro-section" data-bind="foreach: tiles" >
                <div class="tile" data-bind="attr:{appId:id,appName:name}">
                    <div class="tile-icon-large">
                        <img data-bind="attr: { src: icon } " />
                    </div>
                    <span class="tile-label" data-bind="html: name"></span>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    var merchantId = '${param.m}';
</script>
<script src="/resources/modules/appMarket/independentApps.js"></script>

</body>
</html>