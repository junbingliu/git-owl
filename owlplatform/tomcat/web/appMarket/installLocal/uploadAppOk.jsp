<%@ page import="net.xinshi.is1.appmarket.bean.App" %>
<%@ page import="net.xinshi.is1.appmarket.bean.FileInfo" %>
<%@ page import="net.xinshi.isone.commons.Util" %>
<%@ page import="net.xinshi.isone.modules.appmarket.Is1AppMarketEngine" %>
<%@ page import="net.xinshi.pigeon.adapter.StaticPigeonEngine" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="net.xinshi.isone.modules.user.LoginSessionUtils" %>
<%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 13-7-14
  Time: 上午8:14
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String userId = LoginSessionUtils.getBackendLoginUserId(request);
    if (userId == null) {
        out.print("没有登录！");
        return;
    }
    if(!StringUtils.equals("u_1",userId) && !StringUtils.equals("u_0",userId)){
        out.print("没有权限！");
        return;
    }
    try {
        FileInfo info = Is1AppMarketEngine.appMarketClientService.upload(request, "zip", 1024 * 1024 * 20);
        String name = (String) info.getParameters().get("appName");
        String merchantId = (String) info.getParameters().get("m");
        if (StringUtils.isBlank(merchantId)) {
            merchantId = "head_merchant";
        }
        Thread.sleep(2000);//等文件上传完
        App app = new App();
        app.setMd5(info.getMd5());
        app.setAppType(App.AppType.independentApp);
        app.setZipFileId(info.getFileId());
        app.setName(name);
        if(StringUtils.isBlank((String)info.getParameters().get("appId"))){
            app.setId("localApp_" + StaticPigeonEngine.pigeon.getIdGenerator().getId("localApp"));
        }
        else{
            app.setId((String) info.getParameters().get("appId"));
        }
        String saasAccountId = Util.getSaasId();
        Is1AppMarketEngine.installer.installApp(app, saasAccountId, merchantId);
        response.sendRedirect("installSuccess.jsp");
    } catch (Exception e) {
        e.printStackTrace();
        response.sendRedirect("installFailed.jsp");
    }


%>