<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="net.xinshi.isone.base.ext.ConcurrentHashMapExt" %>
<%@ page import="net.xinshi.isone.functions.info.InfoFunction" %>
<%
    try {
        String columnId = request.getParameter("columnId");
        String mid = request.getParameter("merchantId");
       ConcurrentHashMapExt model = InfoFunction.getInfoListByLucene(columnId,mid,1,10000,request);
       Object list = model.get("lists");
       out.print(list);
    } catch (Exception e) {
        e.printStackTrace();
        out.print("error");
    }
%>