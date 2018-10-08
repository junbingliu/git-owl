<%@ page import="net.xinshi.isone.modules.IsoneProductEngine" %>
<%@ page import="net.xinshi.isone.modules.freegroup.tools.FreeGroupValueUtil" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="net.xinshi.isone.modules.price.PriceUtil" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%

    JSONObject jRet = new JSONObject();
    try {
        String freeGroupId = request.getParameter("id");
        if (StringUtils.isBlank(freeGroupId)) {
            jRet.put("state", "error");
            jRet.put("msg", "参数错误");
            out.print(jRet.toString());
            return;
        }
        JSONObject jFreeGroup = IsoneProductEngine.normalFreeGroupService.getFreeGroup(freeGroupId);
        JSONArray parts = FreeGroupValueUtil.getParts(jFreeGroup);
        long unitPrice = FreeGroupValueUtil.getUnitPrice(jFreeGroup);

        jRet.put("state", "ok");
        jRet.put("fUnitPrice", PriceUtil.getMoneyValue(unitPrice));//套餐价
        jRet.put("parts", parts);
        out.print(jRet.toString());
    } catch (Exception e) {
        e.printStackTrace();
        jRet.put("state", "error");
        jRet.put("msg", "加载组合商品数据异常");
        out.print(jRet.toString());
    }
%>