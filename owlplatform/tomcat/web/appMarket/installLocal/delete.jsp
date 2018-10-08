<%@ page import="net.xinshi.isone.modules.user.LoginSessionUtils" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="net.xinshi.isone.modules.appmarket.Is1AppMarketEngine" %>
<%@ page import="net.xinshi.is1.appmarket.bean.App" %>
<%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 13-7-15
  Time: 下午4:53
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String userId = LoginSessionUtils.getBackendLoginUserId(request);
    if (userId == null) {
        out.print("没有登录！");
        return;
    }
    if (!StringUtils.equals("u_1", userId) && !StringUtils.equals("u_0", userId)) {
        out.print("没有权限！");
        return;
    }

    String m = request.getParameter("m");
    String appId = request.getParameter("appId");
    if(StringUtils.isBlank(m) || StringUtils.isBlank(appId)){
        out.print("参数不对！");
    }
    Is1AppMarketEngine.appMarketClientService.deleteMyApp(m,appId, App.AppType.independentApp);
    response.sendRedirect("listLocalApps.jsp?m=" + m);

%>