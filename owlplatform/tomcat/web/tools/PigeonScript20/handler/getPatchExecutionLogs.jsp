<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="net.xinshi.patchmanager.bean.ExecutionLog" %>
<%@ page import="java.util.List" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="net.xinshi.saasadmin.util.Util" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="net.xinshi.patchmanager.PatchEngine" %>
<%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 12-12-9
  Time: 上午11:16
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    try {
        String patchId = request.getParameter("patchId");
        String accountId = request.getParameter("accountId");
        if(StringUtils.isBlank(accountId)){
            String from = request.getParameter("from");
            String num = request.getParameter("num");

            int iFrom = 0;
            int iNum = 1;
            if(StringUtils.isNotBlank(from)){
                iFrom = Integer.parseInt(from);
            }
            if(StringUtils.isNotBlank(num)){
                iNum = Integer.parseInt(num);
            }
            List<ExecutionLog> logs = PatchEngine.mallPatchService.getPatchExecutionLog(patchId,iFrom,iNum);

            JSONObject jResult = new JSONObject();
            String s =new String(Util.beanToJson(logs),"utf-8");
            JSONArray jLogs = new JSONArray(s);
            jResult.put("state","ok");
            jResult.put("logs",jLogs);
            out.print(jResult.toString());
        }
        else{
           int iFrom = 0;
           int iNum = 100;
            List<ExecutionLog> result = new ArrayList<ExecutionLog>();
           while(true){
               boolean found = false;
               List<ExecutionLog> logs = PatchEngine.mallPatchService.getPatchExecutionLog(patchId,iFrom,iNum);
               for(ExecutionLog log : logs){
                   if(StringUtils.equals(log.getSaasAccountId(), accountId)){
                       found = true;
                       result.add(log);
                       break;
                   }
                   if(StringUtils.equals(accountId,"all")){
                       result.add(log);
                   }
               }
               if(found){
                   break;
               }
               if(logs.size()<iNum){
                   break;
               }
               iFrom += iNum;
           }
            JSONObject jResult = new JSONObject();
            String s =new String(Util.beanToJson(result),"utf-8");
            JSONArray jLogs = new JSONArray(s);
            jResult.put("state","ok");
            jResult.put("logs",jLogs);
            out.print(jResult.toString());
        }
    } catch (Exception e) {
        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        JSONObject jResult = new JSONObject();
        jResult.put("state","err");
        jResult.put("msg",e.getMessage());
        out.print(jResult.toString());
    }


%>