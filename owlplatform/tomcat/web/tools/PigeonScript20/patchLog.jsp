
<%@ page import="net.xinshi.patchmanager.bean.Patch" %>
<%@ page import="net.xinshi.patchmanager.PatchEngine" %>
<%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 12-11-26
  Time: 下午12:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%
    String patchId = request.getParameter("patchId");
    Patch patch = PatchEngine.mallPatchService.getPatch(patchId);
    request.setAttribute("patch",patch);

%>

<!DOCTYPE html>
<html>
<head>
    <title>执行pigeonScript</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="/resources/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="/resources/prettifier/prettify.css" rel="stylesheet">
    <style type="text/css" media="screen">
        #editor {
            position: absolute;
            width: 1000px;
            height:318px;
            border: 1px solid silver;
        }
        #console{
            position:absolute;
            width:1000px;
            height:300px;
            top:380px;
            border: 1px solid silver;
            overflow: auto;
            padding:3px;
        }
        body {
            padding-top: 50px; /* 60px to make the container go all the way to the bottom of the topbar */
        }
        .highlight{color:#f55}

    </style>

</head>
<body>
<div class="container-fluid">
    <div class="row-fluid">
        <div class="span2 well">
            <p>版本：${patch.version}</p>
            <p>${patch.comment}</p>
            <hr/>
            <table class="table table-striped" style="width:100%">
                <tr><td style="width:50px">id</td></tr>
                <tr><td><a href="patchLog.jsp?patchId=${param.patchId}">全部</a></td></tr>
                <c:forEach items="${patch.saasAccountIds}" var="account">
                    <tr><td><a href="patchLog.jsp?patchId=${param.patchId}&accountId=${account}">${account}</a></td></tr>
                </c:forEach>
            </table>
            <a href="listPatches.jsp" style="margin-left: 50px">Patch列表</a>
        </div>
        <div class="span10" style="margin-left: 10px">
            <div id="editor">${patch.script}</div>
            <div id="console"></div>
        </div>
    </div>

</div>

<script src="/resources/js/jquery-1.8.2.min.js"></script>
<script src="/resources/ace/ace.js" type="text/javascript" charset="utf-8"></script>
<script src="/resources/prettifier/prettify.js" type="text/javascript" charset="utf-8"></script>
<script>
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setMode("ace/mode/javascript");
</script>

<script>
    var patchId = "${param.patchId}";
    var curPos = 0;
    var accountId = "${param.accountId}"
    if(accountId==""){
        accountId="all";
    }
    function showMsgs(data){
        var logs = data.logs;
        if(!logs){
            return;
        }
        if(logs.length==0){
            return;
        }
        for(var i=0; i<logs.length; i++){
            var log = logs[i];
            $("#console").append("<p>正在执行：<span class='highlight'>" + log.saasAccountId + "</span>用时：<span class='highlight'>" + (log.endTime - log.beginTime) + "(ms)</span></p>");
            $("#console").append(log.out.join(""));
            $("#console").append("<hr/>");
        }
        curPos++;
        prettyPrint();
    }
    function getLogs(){
        if(!patchId){
            setTimeout(getLogs,10);
            return;
        }
        $.post("handler/getPatchExecutionLogs.jsp",{from:curPos,num:1,patchId:patchId,accountId:accountId},function(data){
            showMsgs(data);
        },"json");
    }
    getLogs();

</script>

</body>
</html>