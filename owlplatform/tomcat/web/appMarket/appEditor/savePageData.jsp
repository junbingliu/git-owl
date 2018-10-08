<%@ page import="java.util.Map" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="net.xinshi.isone.modules.appmarket.Is1AppMarketEngine" %>
<%@ page import="net.xinshi.isone.commons.ELUtil" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="java.util.Set" %>
<%@ page import="java.util.HashSet" %>
<%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 13-5-1
  Time: 下午11:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String appId = request.getParameter("appId");
    String id = request.getParameter("id");
    String m = request.getParameter("m");
    Map map = request.getParameterMap();
    JSONObject jPageData = null;
    if(StringUtils.isBlank(m)){
        jPageData = Is1AppMarketEngine.appMarketClientService.getPageData(appId,id);
    }
    else{
        jPageData = Is1AppMarketEngine.appMarketClientService.getPageData(m,appId,id);
    }
    Map<String,JSONObject> pages = new HashMap();
    for(Object o : map.entrySet()){
        Map.Entry entry = (Map.Entry) o;
        String name = (String) entry.getKey();
        String value= request.getParameter(name);
        if(name.indexOf(":")>0){
            //有page
            String[] parts = name.split(":");
            String effectivePageId = parts[0];
            JSONObject jp = pages.get(effectivePageId);
            if(jp == null){
                if(StringUtils.isBlank(m)){
                    jp = Is1AppMarketEngine.appMarketClientService.getPageData(appId,effectivePageId);
                }
                else{
                    jp = Is1AppMarketEngine.appMarketClientService.getPageData(m,appId,effectivePageId);
                }
                pages.put(effectivePageId,jp);
            }
            ELUtil.setProperty(jp,parts[1],value);
        }
        else{
            //jPageData.put(name,value);
            ELUtil.setProperty(jPageData,name,value);
        }

    }
    JSONArray dependsOn = jPageData.optJSONArray("_dependsOn");
    Set dependsSet = new HashSet<String>();
    if(dependsOn!=null){
        for(int i=0; i<dependsOn.length();i++){
            String dpageId = dependsOn.getString(i);
            dependsSet.add(dpageId);
        }
    }

    for(Map.Entry<String,JSONObject> entry  : pages.entrySet()){
        String n = entry.getKey();
        dependsSet.add(n);
        JSONObject p = entry.getValue();
        if(StringUtils.isBlank(m)){
            Is1AppMarketEngine.appMarketClientService.setPageData(appId,n,p);
        }
        else{
            Is1AppMarketEngine.appMarketClientService.setPageData(m,appId,n,p);
        }
    }

    dependsOn = new JSONArray(dependsSet);
    jPageData.put("_dependsOn",dependsOn);
    if(StringUtils.isBlank(m)){
        Is1AppMarketEngine.appMarketClientService.setPageData(appId,id,jPageData);
    }
    else{
        Is1AppMarketEngine.appMarketClientService.setPageData(m,appId,id,jPageData);
    }
    JSONObject jresult = new JSONObject();
    jresult.put("state","ok");
    out.print(jresult.toString());
%>