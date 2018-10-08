<%@ page import="net.xinshi.isone.modules.IsoneModulesEngine" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Arrays" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="net.xinshi.isone.modules.product.inventory.ProductInventoryHelper" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%--
  Created by IntelliJ IDEA.
  User: mk
  Date: 2014-12-11
  Time: 15:42
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String[] productIds = request.getParameterValues("productIds[]");
    String merchantId = request.getParameter("merchantId");
    if(StringUtils.isBlank(merchantId)){
        merchantId = "m_100";
    }
    List<String> idsList = Arrays.asList(productIds);
    if(productIds.length > 0){
        List<JSONObject> products = IsoneModulesEngine.productService.getListDataByIds(idsList,false);
        JSONObject jProductStock = ProductInventoryHelper.getProductTotalInventory(products, merchantId);
        out.print(jProductStock.toString());
    }
%>
