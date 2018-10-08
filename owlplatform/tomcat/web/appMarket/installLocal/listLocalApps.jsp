<%@ page import="net.xinshi.is1.appmarket.bean.App" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="java.util.List" %>
<%@ page import="net.xinshi.isone.modules.appmarket.Is1AppMarketEngine" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="net.xinshi.isone.commons.Util" %>
<%@ page import="net.xinshi.isone.modules.user.LoginSessionUtils" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    try {
        String merchantId = request.getParameter("m");
        if(StringUtils.isBlank(merchantId)){
            merchantId = Util.getDefaultMerchantId();
        }
        String userId = LoginSessionUtils.getBackendLoginUserId(request);
        if(!StringUtils.equals("u_1",userId) && !StringUtils.equals("u_0",userId)){
            out.print("没有权限！");
            return;
        }

        List<App> allApps = Is1AppMarketEngine.appMarketClientService.getMyApps(merchantId,App.AppType.independentApp, 0, -1);
        //查找所有以local开头的apps
        List<App> result = new ArrayList();
        for(App app:allApps){
            if(app.getId().startsWith("localApp")){
                result.add(app);
            }
            else{
                result.add(app);
            }
        }
        request.setAttribute("apps",result);
        request.setAttribute("m",merchantId);
    } catch (Exception e) {
        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
    }
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>本地应用</title>
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

   <table class="table table-striped table-hover table-bordered" width="90%">
       <caption>本地应用列表</caption>
       <thead>
            <tr>
                <th width="15%">id</th>
                <th>名称</th>
                <th width="15%">操作</th>
            </tr>
       </thead>
       <tbody>
             <c:forEach items="${apps}" var="app" varStatus="status">
                 <tr>
                     <td><a href="${app.zipFileUrl}">${app.id}</a></td>
                     <td><a href="${app.zipFileId}">${app.name}</a></td>
                     <td><a href="uploadApp.jsp?m=${m}&appId=${app.id}" class="btn btn-success">更新</a>&nbsp;<a  href="delete.jsp?m=${m}&appId=${app.id}" class="del btn btn-danger">卸载</a></td>
                 </tr>
             </c:forEach>
       </tbody>
   </table>


</div>
<!-- /container -->

<!-- Placed at the end of the document so the pages load faster -->
<script src="/resources/bootstrap/js/jquery.js"></script>
<script src="/resources/bootstrap/js/bootstrap.min.js"></script>
 <script>
     $(document).ready(function(){
        $(".del").click(function(){
            if(confirm("您确定要删除应用程序吗？")){
                 return true;
            }
            else{
                return false;
            }
        });
     });
 </script>

</body>
</html>