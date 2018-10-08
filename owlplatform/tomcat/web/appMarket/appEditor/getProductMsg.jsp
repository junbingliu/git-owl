<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="java.util.Map" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="net.xinshi.isone.functions.product.ProductFunction" %>
<%@ page import="net.xinshi.isone.modules.product.ProductUtil" %>
<%@ page import="net.xinshi.isone.base.IsoneBaseEngine" %>
<%@ page import="net.xinshi.isone.base.dynaattr.DynaAttrUtil" %>
<%@ page import="net.xinshi.isone.modules.price.SkuUtil" %>
<%@ page import="net.xinshi.isone.modules.IsoneModulesEngine" %>
<%@ page import="net.xinshi.isone.modules.user.LoginSessionUtils" %>
<%@ page import="java.util.List" %>
<%@ page import="net.xinshi.isone.modules.merchant.MerchantUtil" %>
<%@ page import="net.xinshi.isone.functions.merchant.MerchantFunction" %>
<%@ page import="net.xinshi.isone.modules.pricepolicy.PricePolicyHelper" %>
<%--
  Created by IntelliJ IDEA.
  User: DQH
  Date: 13-12-3
  Time: 上午11:14
  To change this template use File | Settings | File Templates.
--%>

<%
    String productId = request.getParameter("productId");
    String priceContext ="";
    try{
        JSONObject product = ProductFunction.getProduct(productId);
        String merchantId = product.optString("merchantId");

        String combiType = product.optString("combiType");
        if(combiType =="true"){
            priceContext = "{isGetInventory:'true',isCombi:'true',attrs:{},factories:[{factory:RPF},{factory:UGF,isGroup:true,entityId:c_101},{factory:MF,isBasePrice:true},{factory:UGF,isGroup:true,entityId:c_102},{factory:UGF,isGroup:true,entityId:c_103}]}";
        }else{
            priceContext = "{isGetInventory:'true',attrs:{},factories:[{factory:RPF},{factory:UGF,isGroup:true,entityId:c_101},{factory:MF,isBasePrice:true},{factory:UGF,isGroup:true,entityId:c_102},{factory:UGF,isGroup:true,entityId:c_103}]}";
        }
        JSONObject jContext = new JSONObject(priceContext);
        Map cxt = jContext.getObjectMap();

        List<JSONObject> skus = IsoneModulesEngine.pskuService.getAllList(productId);

        JSONObject headSku = SkuUtil.getHeadSku(skus);
        String skuId = null;
        long onceMustBuyCount = 0;
        if (headSku != null) {
            skuId = headSku.optString("id");
            onceMustBuyCount = IsoneModulesEngine.pskuService.getOnceMustBuyCount(productId, skuId);
        }

        String userId = LoginSessionUtils.getFrontendLoginUserId(request);
        if (StringUtils.isBlank(userId)) {
            userId = "-1";
        }

        List<JSONObject> priceValueList= PricePolicyHelper.getPriceValueList(productId,userId,merchantId,1,cxt, "normalPricePolicy");

        long sellableCount = priceValueList.get(0).optLong("sellableCount");
        long securitySellableCount = priceValueList.get(0).optLong("securitySellableCount");
        JSONObject list = new JSONObject();
        list.put("skuId",skuId);
        list.put("sellableCount",sellableCount);
        list.put("securitySellableCount",securitySellableCount);
        list.put("onceMustBuyCount",onceMustBuyCount);
        out.print(list);
    }catch (Exception e){
        e.printStackTrace();
    }
%>