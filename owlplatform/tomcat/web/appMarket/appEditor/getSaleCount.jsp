<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="net.xinshi.isone.functions.info.InfoFunction" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="net.xinshi.isone.commons.DateUtil" %>
<%@ page import="net.xinshi.isone.modules.IsoneModulesEngine" %>
<%
    try {
        String id = request.getParameter("panicId");
        JSONObject panicBuy = IsoneModulesEngine.panicBuyService.getPanicBuy(id);
        out.print(panicBuy);
    } catch (Exception e) {
        e.printStackTrace();
        out.print("error");
    }
%>