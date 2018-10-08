<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2015/3/5
  Time: 17:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="net.xinshi.isone.modules.IsoneModulesEngine" %>
<%@ page import="net.xinshi.isone.modules.user.LoginSessionUtils" %>
<%
  String  weChatId = request.getParameter("weChatId");
  if(StringUtils.isNotBlank(weChatId)){
    String userId = IsoneModulesEngine.memberService.judgeMemberField(weChatId,"weChat");
    if ("null".equals(userId)) {
      out.print("1");
    }else{
      LoginSessionUtils.loginFrontend(request, response, userId);
      out.print("0");
    }
  }

%>