<%@ page import="java.util.List" %>
<%@ page import="net.xinshi.isone.modules.appmarket.bean.QueEntry" %>
<%@ page import="net.xinshi.isone.modules.appmarket.Is1AppMarketEngine" %>
<%@ page import="net.xinshi.pigeon.util.CommonTools" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 13-4-27
  Time: 下午8:43
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String merchantId = request.getParameter("merchantId");
    if(StringUtils.isBlank(merchantId)){
        out.print("{status:'error',msg:'merchantId is none.'}");
        return;
    }
    List<QueEntry> downloadingApps = Is1AppMarketEngine.appMarketClientService.getDownloadList(merchantId);
    /*if(downloadingApps.size()==0){
        out.print("{'status':'ok','msg':'empty.'}");
        out.print("empty");
        return;
    }*/
    String s = new String(CommonTools.beanToJson(downloadingApps),"utf-8");
    out.print(s);
%>