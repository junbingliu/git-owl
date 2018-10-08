<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page import="org.apache.commons.codec.binary.Hex" %>
<%@ page import="net.xinshi.encryption.EncryptUtils" %>
<%@ page import="net.xinshi.isone.modules.appmarket.bean.Config" %>
<%@ page import="net.xinshi.isone.modules.appmarket.Is1AppMarketEngine" %>
<%@ page import="net.xinshi.is1.appmarket.bean.BuyNotify" %>
<%@ page import="net.xinshi.pigeon.util.CommonTools" %>
<%@ page import="net.xinshi.pigeon.adapter.StaticPigeonEngine" %>
<%@ page import="net.xinshi.pigeon.saas.SaasPigeonEngine" %>
<%@ page import="net.xinshi.isone.modules.appmarket.bean.QueEntry" %>
<%@ page import="java.util.List" %>
<%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 13-4-5
  Time: 下午10:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    try {
        String code = request.getParameter("code");
        String iv = request.getParameter("iv");
        byte[] codeBytes = Hex.decodeHex(code.toCharArray());
        Config appMarketConfig = Is1AppMarketEngine.appMarketClientService.getConfig();
        byte[] notifyBytes = EncryptUtils.decryptDes3(appMarketConfig.getKey().getBytes("utf-8"),codeBytes,iv.getBytes("utf-8"));
        BuyNotify notify = (BuyNotify) CommonTools.bytesToBean(notifyBytes, BuyNotify.class);
        request.setAttribute("notify",notify);
        if(!Is1AppMarketEngine.appMarketClientService.isDownloading(notify.getMerchantId(),notify.getAppId())){
            Is1AppMarketEngine.installer.que(notify.getAppId(),notify.getAppIconUrl(),notify.getAppName(), ((SaasPigeonEngine)StaticPigeonEngine.pigeon).getCurrentMerchantId(),notify.getMerchantId());
            Is1AppMarketEngine.appMarketClientService.addToDownloadList(notify.getMerchantId(),notify.getAppId(),notify.getAppIconUrl(),notify.getAppName());
        }
        List<QueEntry> downloadingApps = Is1AppMarketEngine.appMarketClientService.getDownloadList(notify.getMerchantId());
        request.setAttribute("merchantId",notify.getMerchantId());
        request.setAttribute("downloadingApps",downloadingApps);

    } catch (Exception e) {
        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
    }
%>


<html>
<head>
    <title></title>
    <link href="./style/header.css" rel="stylesheet">
    <link href="./style/down_install.css" rel="stylesheet">
</head>
<body>

<div class="down_install w1000 clearfix">
	<div class="insleft fl">
    	<h2>下载管理</h2>
        <div class="manageList">
        	<ul>
            	<li class="cur"><a href="#">正在安装（${fn:length(downloadingApps)}）</a></li>
                <%--<li><a href="#">已下载</a></li>--%>
            </ul>
        </div>
    </div>
    <div id="downloading" class="insright fl">
        <c:forEach items="${downloadingApps}" var="entry">
            <dl>
                <dd><img src="${entry.iconUrl}" />${entry.appName}</dd>
                <dt>
                    <span class="load">Loading，模板安装中，请耐心等待</span>
                </dt>
            </dl>
        </c:forEach>
    	<%--<dl>
        	<dd><img src="case/pic2.jpg" />高端精品模板系列--浅金色</dd>
            <dt>
            	<span class="load">Loading，模板安装中，请耐心等待</span>
            </dt>
        </dl>
        <dl>
        	<dd><img src="case/pic2.jpg" />高端精品模板系列--浅金色</dd>
            <dt>
            	<span class="true">Loading，模板安装中，请耐心等待</span>
            </dt>
        </dl>
        <dl>
        	<dd><img src="case/pic2.jpg" />高端精品模板系列--浅金色</dd>
            <dt>
            	<span class="fail">Loading，模板安装中，请耐心等待</span>
            </dt>
        </dl>--%>
    </div>
</div>


    <%--<div class="container" id="downloading">
        <table class="table table-striped">
            <c:forEach items="${downloadingApps}" var="entry">
                <tr>
                    <td><img src="${entry.iconUrl}"></td>
                    <td>${entry.appName}</td>
                    <td>正在排队等待安装</td>
                </tr>
            </c:forEach>
        </table>
    </div>--%>

    <script src="/resources/doT.min.js"></script>

    <script id="pagetmpl" type="text/x-dot-template">
        <table class="table table-striped" width="85%">
            {{for( var i=0; i<it.length; i++){ }}
                <dl>
                    <dd><img src="{{=it[i].iconUrl}}" />{{!it[i].appName}}</dd>
                    <dt>
                        <span class="load">Loading，模板安装中，请耐心等待</span>
                    </dt>
                </dl>
           {{ } }}
        </table>
    </script>
<%--<tr>
                    <td><img src="{{=it[i].iconUrl}}"></td>
                    <td>{{!it[i].appName}}</td>
                    <td>正在排队等待安装</td>
                </tr>--%>

    <script>
        var e = document.getElementById('pagetmpl');
        t = e.text;
        var template = doT.template(t)
        function checkDownloading(){
            $.post("handler/getDownloading.jsp",{merchantId:'${merchantId}'},function(data){
                /*if(data.msg =='empty.'){
                    $("#downloading").html('');
                }else{
                    $("#downloading").html(template(data));
                    setTimeout(checkDownloading,3000);
                }*/
                if(data.length==0){
                    alert('安装完成');
                    $("#downloading").html('');
                    //top.goToList(top.gwt_eventbus,'workspace_m_FrontEnd','col_m_FrontEnd_Favorite','decorateTemplate','我的模板');
                }else{
                    $("#downloading").html(template(data));
                    setTimeout(checkDownloading,3000);
                }
            },"json")
        }
        setTimeout(checkDownloading,3000);
    </script>
</body>


</html>