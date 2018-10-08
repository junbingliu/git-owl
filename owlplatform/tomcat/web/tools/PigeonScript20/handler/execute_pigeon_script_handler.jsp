<%@ page import="net.xinshi.saasadmin.SaasEngine" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.List" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="net.xinshi.pigeon.util.ClientTools" %>
<%@ page import="net.xinshi.pigeon.adapter.StaticPigeonEngine" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="net.xinshi.isone.modules.user.IUserService" %>
<%@ page import="net.xinshi.isone.modules.user.LoginSessionUtils" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="net.xinshi.isone.base.IsoneBaseEngine" %>
<%@ page import="net.xinshi.isone.modules.IsoneModulesEngine" %>
<%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 12-12-6
  Time: 上午8:57
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    List<String> serverLibs = new ArrayList<String>();
    String path = request.getRealPath("/serverJsLib");
    serverLibs.add(path);
    try {
        //加上root权限验证
        String rootUserId = "u_0";
        JSONObject jRootUser = IsoneModulesEngine.userService.getUser(rootUserId);
        String userId = LoginSessionUtils.getBackendLoginUserId(request);

        if (jRootUser != null && (userId == null || !userId.equals(IUserService.ADMIN_ROOT_ID))) {
            out.print("no privilege");
            return;
        }

        String theScript = request.getParameter("theScript");
        String saasAccountIds = request.getParameter("saasAccountIds");
        String comment = request.getParameter("comment");
        String version = request.getParameter("version");
        String[] idArray = saasAccountIds.split(",");
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
        jret.put("state","ok");
        jret.put("msgs",jmsgs);
        out.print(jret.toString());
    } catch (Exception e) {
        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        JSONObject jret = new JSONObject();
        jret.put("state","err");
        jret.put("msg",e.getMessage());
        out.print(jret.toString());
    }

%>