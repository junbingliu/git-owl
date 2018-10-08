<%@ page import="net.xinshi.patchmanager.bean.Patch" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Date" %>
<%@ page import="org.apache.http.impl.cookie.DateUtils" %>
<%@ page import="net.xinshi.patchmanager.PatchEngine" %>
<%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 12-12-10
  Time: 下午12:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%
    String p = request.getParameter("p");
    int numPerPage = 50;
    int iPage = 1;
    try{
       iPage = Integer.parseInt(p);
    }
    catch(Exception e){

    }
    int start = (iPage - 1)*numPerPage;
    List<Patch> patches = PatchEngine.mallPatchService.getPatches(start,numPerPage);
    int totalPages = (PatchEngine.mallPatchService.getPatchesSize()-1) / numPerPage + 1;
    request.setAttribute("patches",patches);
%>

<html>
<head>
    <title>列出打过的patch</title>
    <link href="/resources/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="/resources/bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
    <link href="/resources/bootstrap/css/docs.css" rel="stylesheet">
    <link href="/resources/css/chart.css" rel="stylesheet">
    <link href="/resources/css/jqueryui_bootstrap/jquery-ui-1.9.0.custom.css" rel="stylesheet">

    <style>
        body {
            padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */
        }

        .bs-docs-sidenav {
            width: 208px;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="row">
        <div class="span12 well">
            <a href="executePigeonScript.jsp" style="margin-left: 50px">执行</a>
            <div class="navpage"></div>
            <table class="table table-striped table-bordered">
                <tr>
                    <td>patchId</td>
                    <td>时间</td>
                    <td>saasAccountIds</td>
                    <td>版本</td>
                    <td>comment</td>
                </tr>
                <c:forEach items="${patches}" var="patch">
                    <%
                        Patch patch = (Patch) pageContext.findAttribute("patch");
                        Date beginDate = new Date(patch.getBeginTime());
                        String dateString = DateUtils.formatDate(beginDate,"yyyy-MM-dd HH:mm:ss");
                    %>
                    <tr>
                        <td style="width:120px"><a href="patchLog.jsp?patchId=${patch.id}">${patch.id}</a></td>
                        <td style="width:120px"><%=dateString%></td>
                        <td style="width:200px;overflow: hidden;">${patch.saasAccountIds}</td>
                        <td>${patch.version}</td>
                        <td>${patch.comment}</td>
                    </tr>
                </c:forEach>
            </table>
            <div class="navpage"></div>
        </div>
    </div>
</div>
<script src="/resources/js/jquery-1.8.2.min.js"></script>
<script src="/resources/js/uri.js"></script>
<script src="/resources/component/pagination.js"></script>
<script>
    $(document).ready(function(){
        $(".navpage").html(pagination(<%=totalPages%>,<%=iPage%>,<%=numPerPage%>));
    })
</script>
</body>
</html>