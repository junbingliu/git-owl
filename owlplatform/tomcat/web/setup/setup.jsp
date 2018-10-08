<%@ page import="org.json.JSONObject" %>
<%@ page import="net.xinshi.isone.modules.IsoneModulesEngine" %>
<%@ page import="net.xinshi.isone.modules.user.LoginSessionUtils" %>
<%@ page import="net.xinshi.isone.modules.user.IUserService" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="net.xinshi.pigeon.util.ClientTools" %>
<%@ page import="net.xinshi.pigeon.adapter.StaticPigeonEngine" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="java.io.FileInputStream" %>
<%@ page import="java.io.File" %>
<%@ page import="net.xinshi.is1.appmarket.bean.App" %>
<%@ page import="net.xinshi.isone.commons.Util" %>
<%@ page import="net.xinshi.isone.modules.appmarket.Is1AppMarketEngine" %>
<%@ page import="java.net.URL" %>
<%@ page import="java.io.InputStream" %>
<%@ page import="org.apache.commons.codec.digest.DigestUtils" %>
<%@ page import="org.apache.commons.codec.binary.Hex" %><%--
  Created by IntelliJ IDEA.
  User: zhengxiangyang
  Date: 2018/8/21
  Time: 上午10:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    //1.首先检查是否已经初始化过
    String rootUserId = "u_0";
    JSONObject jRootUser = IsoneModulesEngine.userService.getUser(rootUserId);
    String userId = LoginSessionUtils.getBackendLoginUserId(request);

    if (jRootUser != null && (userId == null || !userId.equals(IUserService.ADMIN_ROOT_ID))) {
        JSONObject jret = new JSONObject();
        jret.put("state","error");
        jret.put("msgs","owl已经执行过初始化程序");
//        return;
    }

    String setupDir = System.getenv("SETUP_DIR");


    File f = new File(setupDir,"init.jsx");
    FileInputStream fis = new FileInputStream(f);
    byte[] buf = new byte[(int) f.length()];
    fis.read(buf);
    fis.close();



    String theScript = new String(buf,"utf-8");
    String saasAccountIds = "saas_50000";
    String[] idArray = saasAccountIds.split(",");

    List<String> serverLibs = new ArrayList<String>();
    {
        URL url = getClass().getClassLoader().getResource("jsLib");
        String path = url.getFile();
        serverLibs.add(path);
    }

    List<String> idList = new ArrayList<String>();
    for(String id : idArray){
        idList.add(id);
    }

    HashMap extra = new HashMap();
    extra.put("system","mall");
//        String patchId =PatchEngine.mallPatchService.execPatchWithExtra(theScript,comment,version,idList,serverLibs,extra);
    List<String> errs = new ArrayList<String>();
    List<String> outMsg = ClientTools.executePigeonScript20(theScript,errs,serverLibs, StaticPigeonEngine.pigeon,extra);
    JSONObject jret = new JSONObject();
    JSONArray jmsgs = new JSONArray();
    for(String s : outMsg){
        jmsgs.put(s);
    }

    //安装默认的apps
    File installConfig =  new File(setupDir,"init.json");
    buf = new byte[(int) installConfig.length()];
    FileInputStream fisInstallConfig = new FileInputStream(installConfig);
    fisInstallConfig.read(buf);


    String sInstallConfig = new String(buf,"utf-8");
    sInstallConfig = Util.expandEnvVars(sInstallConfig);
    JSONObject jsonConfig = new JSONObject(sInstallConfig);

    JSONArray apps = jsonConfig.getJSONArray("apps");
    for(int i=0; i<apps.length(); i++){
        JSONObject japp = apps.getJSONObject(i);
        App app = new App();

        app.setZipFileId(japp.getString("file"));
        URL url = new URL(app.getZipFileId());
        InputStream is = url.openStream();

        String md5 = Hex.encodeHexString(DigestUtils.md5(is));
        is.close();
        app.setMd5(md5);
        app.setAppType(App.AppType.independentApp);
        app.setName(japp.getString("name"));
        app.setId(japp.getString("id"));
        String saasAccountId = Util.getSaasId();
        Is1AppMarketEngine.installer.installApp(app, saasAccountId, "head_merchant");
        jmsgs.put(app.getId() + " installed");
    }

    jret.put("state","ok");
    jret.put("msgs",jmsgs);
    out.print(jret.toString());


%>
