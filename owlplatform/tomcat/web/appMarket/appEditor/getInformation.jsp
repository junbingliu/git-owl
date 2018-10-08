<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="net.xinshi.isone.functions.info.InfoFunction" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="net.xinshi.isone.commons.DateUtil" %>
<%
    try {
        String id = request.getParameter("infoId");
        JSONObject info = InfoFunction.getInfoDetail(id);
        String createTime = info.optString("createTime");
        String lastModifyTime = info.optString("dateTime", info.optString("lastModifyTime"));
        String createTimeform =  DateUtil.getLongDate(createTime,"","yyyy年MM月dd日 HH:mm");
        String lastModifyTimeForm =  DateUtil.getLongDate(lastModifyTime,"","yyyy年MM月dd日 HH:mm");
        info.put("timeform",lastModifyTimeForm);
        info.put("createTimeform",createTimeform);
        out.print(info);
    } catch (Exception e) {
        e.printStackTrace();
        out.print("error");
    }
%>