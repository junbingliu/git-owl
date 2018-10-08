<%@ page import="net.xinshi.is1.appmarket.bean.App" %>
<%@ page import="net.xinshi.isone.commons.Util" %>
<%@ page import="net.xinshi.isone.modules.appmarket.Is1AppMarketEngine" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="net.xinshi.isone.modules.user.LoginSessionUtils" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="net.xinshi.pigeon.list.ISortList" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="java.util.regex.Pattern" %>
<%@ page import="java.util.regex.Matcher" %>
<%@ page import="net.xinshi.isone.modules.merchant.impl.NormalMerchantRightsService" %>
<%@ page import="java.util.*" %>
<%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 13-4-17
  Time: 下午12:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%

    String userId = LoginSessionUtils.getBackendLoginUserId(request);
    if (userId == null) {
        out.print("{\"status\":\"none\"}");
        return;
    }

    String merchantId = request.getParameter("m");
    String sPage = request.getParameter("page");
    String sNum = request.getParameter("num");
    String keyword = request.getParameter("q");
    if(StringUtils.isBlank(merchantId)){
       merchantId = "head_merchant";
    }

    try {

        int size;
        boolean search = false;

        List<App> allApps;
        List<App> matcherApps = new Vector<App>();
        List<App> apps;

        keyword = StringUtils.trimToNull(keyword);
        if(StringUtils.isNotBlank(keyword)){
            search = true;
        }
        allApps = Is1AppMarketEngine.appMarketClientService.getMyApps(merchantId,App.AppType.independentApp,0,-1);
        Collection<String> assignedAppIds =  NormalMerchantRightsService.getAvailableApps(merchantId);
        ArrayList<String> ids = new ArrayList();
        ids.addAll(assignedAppIds);
        Collection<App> assignedApps = Is1AppMarketEngine.appPages.getApps(ids);
        allApps.addAll(assignedApps);
        if(search){

            keyword = keyword.replace(" ","|");
            Pattern pattern = Pattern.compile(keyword,Pattern.CASE_INSENSITIVE);
            for(App app  : allApps){
                Matcher matcher = pattern.matcher(app.getName());
                if(matcher.find()){
                    matcherApps.add(app);
                }
            }
            size = matcherApps.size();
        }else {
            matcherApps = allApps;
            size = matcherApps.size();
        }


        apps = matcherApps;

        JSONArray jsonArray = new JSONArray();
        for(App app  : apps){
            JSONObject jRecord = new JSONObject();
            jRecord.put("id",app.getId());
            jRecord.put("merchantId",merchantId);
            jRecord.put("name",app.getName());
            jRecord.put("icon",Util.getUrlFromFileId(app.getIconFileId(), "100X100"));
            jsonArray.put(jRecord);
        }
        JSONObject jResult = new JSONObject();
        jResult.put("list",jsonArray);
        jResult.put("count",size);
        jResult.put("status","ok");
        out.print(jResult);
    } catch (NumberFormatException nfe){
        out.print("{\"status\":\"error\",\"msg\":\"number format exception.\"}");
    }catch (Exception e) {
        out.print("{\"status\":\"error\",\"msg\":\"exception.\"}");
        e.printStackTrace();
    }
%>