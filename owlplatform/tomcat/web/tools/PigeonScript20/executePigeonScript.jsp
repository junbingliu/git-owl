<%@ page import="net.xinshi.isone.modules.user.LoginSessionUtils" %>
<%@ page import="net.xinshi.isone.modules.user.IUserService" %>
<%@ page import="net.xinshi.pigeon.adapter.StaticPigeonEngine" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="org.json.JSONObject" %>
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
    //加上root权限验证
    try {
        String userId = LoginSessionUtils.getBackendLoginUserId(request);
        if (userId == null || !userId.equals(IUserService.ADMIN_ROOT_ID)) {
            //saveObject('LoginExecuteJSUserId', {"id":"u_0"}); //特别指定
            String value= StaticPigeonEngine.pigeon.getFlexObjectFactory().getContent("LoginExecuteJSUserId");
            if(StringUtils.isBlank(value)){
                out.print("请先以root身份登录后再试");
                return;
            }
            JSONObject jsonObject=new JSONObject(value);
            String objId=jsonObject.optString("id");
            if(!StringUtils.equals(userId,objId)){
                out.print("请先以root身份登录后再试");
                return;
            }
        }
    } catch (Exception e) {
        out.print("请先以root身份登录后再试");
        return;
    }
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
        <div class="span3 well">

                <label>版本：</label>
                <input type="text" value="" id="version">
                <label>备注：</label>
                <textarea rows="3" cols="40" id="comment" style="width:350px"></textarea>
                <div>
                    <button class="btn btn-primary" style="margin-left: 40px;margin-top:10px;margin-bottom: 5px" id="execute">执行</button>
                    <button class="btn btn-info" style="margin-left: 40px;margin-top:10px;margin-bottom: 5px" id="clearConsole">清空Console</button>
                    <a href="help.jsp" style="margin-left: 50px">帮助</a>
                    <a href="listPatches.jsp" style="margin-left: 50px">Patch列表</a>
                </div>

            <hr/>
        </div>


        <div class="span9" style="margin-left:10px">
            <div id="editor">assertSystem("mall");
//#import ps20.js
</div>
            <div id="console" ></div>
        </div>
    </div>

</div>

<script src="/resources/ace/ace.js" type="text/javascript" charset="utf-8"></script>
<script src="/resources/jquery-1.7.2.min.js" type="text/javascript" charset="utf-8"></script>
<script src="/resources/prettifier/prettify.js" type="text/javascript" charset="utf-8"></script>
<script>
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setMode("ace/mode/javascript");
</script>

<script>
    var saasAccountIds = ['default']
    var patchId = null;
    var curPos = 0;
    function showMsgs(data){
        var msgs = data.msgs;
        if(!msgs){
            return;
        }
        if(msgs.length==0){
            return;
        }
        $("#console").append(msgs.join(""));
        $("#console").append("<hr/>");
        curPos++;
        prettyPrint();
    }


    function execute(theScript,version,comment){
        curPos = 0;
        $.post("handler/execute_pigeon_script_handler.jsp",{theScript:theScript,saasAccountIds:saasAccountIds.join(","),version:version,comment:comment},function(data){
            if(data.state=='ok'){
                showMsgs(data);
            }
            else{
                alert(data.msg);
            }
        },"json");
    }
    $("#execute").on("click",function(){
        var theScript = editor.getSession().getValue() ;
        var comment = $("#comment").val();
        var version = $("#version").val();
        execute(theScript,version,comment);
        return false;
    })
    $("#clearConsole").on("click",function(){
        $("#console").html("");
    });
</script>

</body>
</html>