<%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 13-5-22
  Time: 下午2:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String appId = request.getParameter("appId");
    String merchantId = request.getParameter("m");
    response.sendRedirect("/" + appId + "/pages/home.jsx?m="+merchantId);
%>