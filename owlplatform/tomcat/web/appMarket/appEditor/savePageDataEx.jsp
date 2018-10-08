<%@ page import="net.xinshi.isone.commons.ELUtil" %>
<%@ page import="net.xinshi.isone.modules.IsoneModulesEngine" %>
<%@ page import="net.xinshi.isone.modules.appmarket.Is1AppMarketEngine" %>
<%@ page import="net.xinshi.isone.modules.user.LoginSessionUtils" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.*" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    try {
        String appId = request.getParameter("appId");
        String pageId = request.getParameter("pageId");
        String m = request.getParameter("m");
        String dataId = request.getParameter("dataId");
        String dataValue = request.getParameter("dataValue");
        String dataType = request.getParameter("dataType");

        String type = request.getParameter("type"); //appEditor对应的editor,例如fancyCategory等
        String subType = request.getParameter("subType"); //appEditor对应的subType

        Object value;
        if (StringUtils.equals(dataType, "json")) {
            value = new JSONObject(dataValue);
        } else if (StringUtils.equals(dataType, "jsonArray")) {
            value = new JSONArray(dataValue);
        } else {
            value = dataValue;
        }

        Map map = request.getParameterMap();
        JSONObject jPageData = null;

        if (StringUtils.isBlank(m)) {
            jPageData = Is1AppMarketEngine.appMarketClientService.getPageData(appId, pageId);
        } else {
            jPageData = Is1AppMarketEngine.appMarketClientService.getPageData(m, appId, pageId);
        }


        /******将data的描述数据，假如_all************/
        JSONArray jAll = jPageData.optJSONArray("_all");
        if (jAll == null) {
            jAll = new JSONArray();
            jPageData.put("_all", jAll);
        }
        //检查本数据是否已经保存过，如果是，直接采用，否则添加新的
        boolean found = false;
        for (int i = 0; i < jAll.length(); i++) {
            JSONObject jrec = jAll.optJSONObject(i);
            if (jrec == null) {
                continue;
            }
            if (StringUtils.equals(jrec.optString("id"), dataId)) {
                found = true;
                jrec.put("type", type);
                jrec.put("subType", subType);
                break;
            }
        }
        if (!found) {
            JSONObject dataRec = new JSONObject();
            dataRec.put("id", dataId);
            dataRec.put("type", type);
            if (subType != null) {
                dataRec.put("subType", subType);
            }
            jAll.put(dataRec);
        }


        Map<String, JSONObject> pages = new HashMap();
        if (dataId.indexOf(":") > 0) {
            //有page
            String[] parts = dataId.split(":");
            String effectivePageId = parts[0];
            JSONObject jp = pages.get(effectivePageId);
            if (jp == null) {
                if (StringUtils.isBlank(m)) {
                    jp = Is1AppMarketEngine.appMarketClientService.getPageData(appId, effectivePageId);
                } else {
                    jp = Is1AppMarketEngine.appMarketClientService.getPageData(m, appId, effectivePageId);
                }
                pages.put(effectivePageId, jp);
            }
            ELUtil.setProperty(jp, parts[1], value);
        } else {
            //jPageData.put(name,value);
            ELUtil.setProperty(jPageData, dataId, value);
        }
        JSONArray dependsOn = jPageData.optJSONArray("_dependsOn");
        Set dependsSet = new HashSet<String>();
        if (dependsOn != null) {
            for (int i = 0; i < dependsOn.length(); i++) {
                String dpageId = dependsOn.getString(i);
                dependsSet.add(dpageId);
            }
        }


        for (Map.Entry<String, JSONObject> entry : pages.entrySet()) {
            String n = entry.getKey();
            dependsSet.add(n);
            JSONObject p = entry.getValue();
            if (StringUtils.isBlank(m)) {
                Is1AppMarketEngine.appMarketClientService.setPageData(appId, n, p);
            } else {
                Is1AppMarketEngine.appMarketClientService.setPageData(m, appId, n, p);
            }
        }

        dependsOn = new JSONArray(dependsSet);
        jPageData.put("_dependsOn", dependsOn);
        if (StringUtils.isBlank(m)) {
            Is1AppMarketEngine.appMarketClientService.setPageData(appId, pageId, jPageData);
        } else {
            Is1AppMarketEngine.appMarketClientService.setPageData(m, appId, pageId, jPageData);
        }

        JSONObject jresult = new JSONObject();
        jresult.put("state", "ok");
        out.print(jresult.toString());

        //纪录操作日志
        JSONObject jAppLog = new JSONObject();
        String loginUserId = LoginSessionUtils.getBackendLoginUserId(request);
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if (loginUserId != null || !loginUserId.equals("u_0")) {
            jAppLog.put("time", df.format(new Date()));
            jAppLog.put("dataId", dataId);
            jAppLog.put("dataValue", dataValue);

            //不把整个会员对象保存到日志里，只保留ID，登录ID和真实姓名信息
            JSONObject userInfo = IsoneModulesEngine.userService.getUser(loginUserId);
            JSONObject jUser = new JSONObject();
            if (userInfo != null) {
                jUser.put("id", userInfo.optString("id"));
                jUser.put("loginId", userInfo.optString("loginId"));
                jUser.put("realName", userInfo.optString("realName"));
            }
            jAppLog.put("userInfo", jUser);
        }
        Is1AppMarketEngine.appMarketClientService.addAppLog(m, appId, pageId, jAppLog);
    } catch (Exception e) {
        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
    }
%>