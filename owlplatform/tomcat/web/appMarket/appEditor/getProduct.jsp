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
<%@ page import="org.json.JSONArray" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="net.xinshi.isone.modules.sysargument.SysArgumentUtil" %>
<%@ page import="net.xinshi.isone.commons.Global" %>
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
        JSONObject jArgument = IsoneModulesEngine.sysArgumentService.getSysArgument(Global.HEAD_MERCHANT, "col_sysargument");
        JSONObject jArgumentValues = SysArgumentUtil.getValues(jArgument);
        String webUrl = SysArgumentUtil.getSysArgumentStringValue(jArgumentValues, "webUrl");
        JSONObject product = ProductFunction.getProduct(productId);
        String name = product.optString("name");
        String merchantId = product.optString("merchantId");

        String combiType = product.optString("combiType");
        if(combiType =="true"){
            priceContext = "{isGetInventory:'true',isCombi:'true',attrs:{},factories:[{factory:RPF},{factory:UGF,isGroup:true,entityId:c_101},{factory:MF,isBasePrice:true},{factory:UGF,isGroup:true,entityId:c_102},{factory:UGF,isGroup:true,entityId:c_103}]}";
        }else{
            priceContext = "{isGetInventory:'true',attrs:{},factories:[{factory:RPF},{factory:UGF,isGroup:true,entityId:c_101},{factory:MF,isBasePrice:true},{factory:UGF,isGroup:true,entityId:c_102},{factory:UGF,isGroup:true,entityId:c_103}]}";
        }
        JSONObject jContext = new JSONObject(priceContext);
        Map cxt = jContext.getObjectMap();
        String defaultPath = "/upload/nopic_60.gif";
        String images = "";
        JSONObject dynaAttrs= product.optJSONObject("DynaAttrs");
        JSONObject attrValue = dynaAttrs.optJSONObject("attr_10000");
        if (attrValue != null) {
            JSONArray picList = attrValue.getJSONArray("value");
            List<String> oriFileIds = new ArrayList<String>();

                JSONObject jPic = picList.optJSONObject(0);
                if (jPic == null) {
                    oriFileIds.add(null);
                } else {
                    oriFileIds.add(jPic.optString("id"));
                }
            List<JSONObject> allOriFiles = IsoneBaseEngine.fileService.getListDataByIds(oriFileIds, true);
                JSONObject jFile = allOriFiles.get(0);
                String smallFullPath = defaultPath;
                if (jFile != null) {
                    String pigeonFileId = jFile.optString("fileId");
                    smallFullPath = IsoneBaseEngine.fileService.getRelatedUrl(pigeonFileId, "60X60", defaultPath);
                    if (!smallFullPath.contains("http")) {
                        smallFullPath = webUrl + smallFullPath;
                    }
                    if (StringUtils.isBlank(images)) {
                        images = smallFullPath;
                    } else {
                        images = images + "|" + smallFullPath;
                    }
                }
        }
        String userId = LoginSessionUtils.getFrontendLoginUserId(request);
        if (StringUtils.isBlank(userId)) {
            userId = "-1";
        }
        long marketPrice=0;
        List<JSONObject> priceValueList= PricePolicyHelper.getPriceValueList(productId,userId,merchantId,1,cxt, "normalPricePolicy");
        long memberprice = priceValueList.get(0).optLong("formatTotalPrice");
        if(null != priceValueList.get(2)){
             marketPrice = priceValueList.get(2).optLong("formatTotalPrice");
        }
        JSONObject list = new JSONObject();
        list.put("id",productId);
        list.put("name",name);
        list.put("img",images);
        list.put("memberPrice",memberprice);
        list.put("marketPrice",marketPrice);
        out.print(list);
    }catch (Exception e){
        e.printStackTrace();
    }
%>