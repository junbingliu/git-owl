<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="net.xinshi.isone.session.ISessionService" %>
<%@ page import="net.xinshi.isone.base.IsoneBaseEngine" %>
<%--
  Created by IntelliJ IDEA.
  User: DQH
  Date: 13-12-3
  Time: 上午9:31
  To change this template use File | Settings | File Templates.
--%>

<%
    long curTime = System.nanoTime();
    String sessionId = session.getId();
    String tokenValue = sessionId + curTime;
    IsoneBaseEngine.sessionService.addSessionValue(ISessionService.ORDER_FORM_TOKEN, tokenValue, request, response);
    request.setAttribute("tokenValue", tokenValue);
    out.print(tokenValue);
%>