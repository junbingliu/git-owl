
<%@ page import="net.xinshi.is1.appmarket.bean.FileInfo" %>
<%@ page import="net.xinshi.isone.modules.appmarket.Is1AppMarketEngine" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="net.xinshi.is1.appmarket.bean.App" %>
<%@ page import="net.xinshi.pigeon.adapter.StaticPigeonEngine" %>
<%@ page import="net.xinshi.isone.commons.Util" %>
<%@ page import="net.xinshi.isone.modules.user.LoginUtil" %>
<%@ page import="net.xinshi.isone.modules.user.IUserService" %>
<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 13-8-11
  Time: 下午6:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    try {
        FileInfo info = Is1AppMarketEngine.appMarketClientService.upload(request, "zip", 1024 * 1024 * 10);
        String name = (String) info.getParameters().get("appName");
        String merchantId = (String) info.getParameters().get("m");
        String deployPass = (String) info.getParameters().get("password");

        //安装APP增加password验证
        if(StringUtils.isBlank(deployPass)){
            out.print("no deployPass");
            return;
        }

        //用root来验证，如果密码不等于root的密码，则不能安装
        int result = LoginUtil.loginByKey("root", deployPass, LoginUtil.TARGET_BACKEND);
        if (result != IUserService.LOGIN_SUCCESSFUL) {
            out.print("password error");
            return;
        }

        if(StringUtils.isBlank(merchantId)){
            merchantId = "head_merchant";
        }

        String sysType = StaticPigeonEngine.pigeon.getFlexObjectFactory().getContent("_sysType_");
        if(StringUtils.equals(sysType,"single")){
            if (StringUtils.isBlank(merchantId)) {
                merchantId = "m_100";
            }
        }
        else if(StringUtils.equals(sysType,"community")){
            if (StringUtils.isBlank(merchantId)) {
                merchantId = "head_merchant";
            }
        }
        System.out.println("merchantId:" + merchantId);
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
       out.print("ok");
    } catch (Exception e) {
        e.printStackTrace();
        out.print("Failed." + e.getMessage());
    }

%>