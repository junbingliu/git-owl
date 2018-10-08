<%@ page import="net.xinshi.is1.appmarket.bean.App" %>
<%@ page import="net.xinshi.isone.commons.Util" %>
<%@ page import="net.xinshi.isone.modules.appmarket.Is1AppMarketEngine" %>
<%@ page import="java.util.List" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 13-4-17
  Time: 下午12:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
    String merchantId = request.getParameter("merchantId");
    List<App> apps = Is1AppMarketEngine.appMarketClientService.getMyApps(merchantId,App.AppType.independentApp, 0, -1);
    request.setAttribute("apps", apps);


%>
<c:set var="merchantId" value="${empty param.merchantId ? 'm_100' : param.merchantId}"/>
<c:set var="columnId" value="${empty param.columnId ? 'col_apps' : param.columnId}"/>
<html>
<head>
    <title>已经安装的应用</title>
    <link href="/OurHome/modules/frontEndTemplates/forward/style/myapp.css" rel="stylesheet">
</head>
<body>
<div style="width:920px;">
    <div class="container app_all" style="margin-top: 0px;">
        <div style="margin:15px">
            <form class="form-search">
                <input type="text" class="input-medium search-query" name="keywords" id="keywords" value="">
                <button id="search" class="btn btn-danger">搜索</button>
            </form>
        </div>
        <div class="list" id="eagle_container">

        </div>
        <div style="margin: 1px 5px 10px;width: 900px;">
            <div class="pagination pagination-right" style="margin: 0;height: auto;">
                <ul style="margin-right: 10px; color: #666;">
                    <li><span id="page_txt" style="border: none; *margin: 12px 0 0;"></span></li>
                    <li style="line-height: 32px;margin-left: 10px;">
                        <select id="page_num" style="width: 132px;height: 40px;/*margin: 0;*/margin: 0 0 32px;*margin-top:20px;padding: 10px 8px;border: none;">
                            <option value="4">每页显示4个</option>
                            <option value="8">每页显示8个</option>
                            <option value="12">每页显示12个</option>
                            <option value="16" selected="selected">每页显示16个</option>
                            <option value="32">每页显示32个</option>
                            <option value="48">每页显示48个</option>
                            <option value="64">每页显示64个</option>
                        </select>
                    </li>
                </ul>
                <ul id="eagle_nest" data-m='${merchantId}' data-c="${columnId}" data-n='16'></ul>
            </div>
        </div>

    </div>

</div>
<script type="text/javascript" src="/resources/modules/appMarkt/tmpl_list.js"/>
</body>
</html>