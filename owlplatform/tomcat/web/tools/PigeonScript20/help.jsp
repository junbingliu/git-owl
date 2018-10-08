<%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 12-12-11
  Time: 下午10:17
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<html>
<head>
    <link href="/resources/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="/resources/bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
    <link href="/resources/bootstrap/css/docs.css" rel="stylesheet">
    <link href="/resources/css/chart.css" rel="stylesheet">
    <link href="/resources/prettifier/prettify.css" rel="stylesheet">
    <link href="/resources/css/jqueryui_bootstrap/jquery-ui-1.9.0.custom.css" rel="stylesheet">
    <style>
        body {
            padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */
        }
    </style>
    <title>PigeonScript20 帮组</title>
</head>
<body>
<div class="container">
    <div class="row">
        <div class="span12">
            <section id="overview">
                <div class="page-header">
                    <h1>概述</h1>
                </div>
                <p>pigeon script V2.0就是扩展的javascript，所有javascript的语法以及内置函数都可以使用， 再加上import一个文件的支持，以及增加了内置的一些处理pigeon对象的函数。</p>
                例如：
                <pre class="prettyprint linenums">//#import json2.js
//#import C:\work\isonev45new\product-1.0-develop_community_discovery\initscript2\ISONEV45_single\single_core\all.jsx
                </pre>
                <p>其中"//#import"是关键字并且必须顶格，代表引入一个javascript写的库。</p>
            </section>

            <section id="api">
                <div class="page-header">
                    <h1>内置函数</h1>
                </div>
                <p>内置函数包含在ps20.js中,要使用必须先import ps20.js</p>
                例如：
                <pre class="prettyprint linenums">//#import  ps20.js</pre>
                <p>其中ps20.js的内容如下</p>
                <pre class="prettyprint linenums">//#import json2.js
/*
获得一个对象
 */
function getObject(name){
    var content = ps20.getContent(name);
    return eval("(" + content + ")");
}

function saveObject(name,obj){
    ps20.saveContent(name,JSON.stringify(obj));
}

function addToList(listname,key,objId){
    ps20.addToList(listname,key,objId);
}

function clearList(listname){
    ps20.clearList(listname);
}

function deleteFromList(listname,key,objId){
    ps20.deleteFromList(listname,key,objId);
}

function print(msg){
    ps20.putMsg(msg);
}

function getAtom(name){
    return ps20.getAtom(name);
}

function setAtom(name,value){
    ps20.setAtom(name,value);
}

function getList(name,from,num){
    return ps20.getList(name,from,num);
}

function printList(name,from,num){
    ps20.printList(name,from,num);
}

function printObjects(listId,from,num){
    ps20.printObjects(listId,from,num);
}</pre>
            </section>

            <section id="patchSpec">
                <div class="page-header">
                    <h1>写patch的规范</h1>
                </div>
                <p>Pigeon Script 2.0 是一个功能强大而完整的编程语言，因此我们在写patch的时候有了更多选择。普遍的原则如下：</p>
                <ul>
                    <li>在文件头写上备注，说明本patch的时间，作用，作者等</li>
                    <li>检查本patch依赖的patch是否已经打上，如果本patch依赖的没有打，应该print出错误信息，然后退出。</li>
                    <li></li>
                </ul>
            </section>


        </div>
    </div>
</div>
<script src="/resources/bootstrap/js/jquery.js"></script>
<script src="/resources/prettifier/prettify.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    $(document).ready(function(){
        prettyPrint();
    })
</script>

</body>
</html>