<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="net.xinshi.isone.modules.user.LoginSessionUtils" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%--
  Created by IntelliJ IDEA.
  User: DQH
  Date: 13-12-3
  Time: 上午9:31
  To change this template use File | Settings | File Templates.
--%>
<%
    String userId = LoginSessionUtils.getFrontendLoginUserId(request);
    if(userId ==""|| userId==null){
        userId = "-1";
    }
    out.print(userId);
%>