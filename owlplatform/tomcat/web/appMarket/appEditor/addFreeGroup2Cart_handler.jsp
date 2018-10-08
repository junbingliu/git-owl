<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="net.xinshi.isone.modules.IsoneModulesEngine" %>
<%@ page import="net.xinshi.isone.modules.IsoneOrderEngine" %>
<%@ page import="net.xinshi.isone.modules.IsoneProductEngine" %>
<%@ page import="net.xinshi.isone.modules.freegroup.tools.FreeGroupUtil" %>
<%@ page import="net.xinshi.isone.modules.freegroup.tools.FreeGroupValueUtil" %>
<%@ page import="net.xinshi.isone.modules.product.ProductUtil" %>
<%@ page import="net.xinshi.isone.modules.product.tools.ProductValueUtil" %>
<%@ page import="net.xinshi.isone.modules.shoppingcart.CommonCartUtil" %>
<%@ page import="net.xinshi.isone.modules.shoppingcart.bean.CartType" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.List" %>
<%
    JSONObject jResult = new JSONObject();
    try {
        String s = request.getParameter("json");
        if (StringUtils.isBlank(s)) {
            jResult.put("state", "10");
            jResult.put("msg", "参数错误");
            out.print(jResult.toString());
            return;
        }

        JSONObject jTempFreeGroup = new JSONObject(s);
        String buyUserId = jTempFreeGroup.optString("buyUserId");
        String freeGroupId = jTempFreeGroup.optString("id");

        JSONObject jFreeGroup = IsoneProductEngine.normalFreeGroupService.getFreeGroup(freeGroupId);
        if (jFreeGroup == null) {
            jResult.put("state", "11");
            jResult.put("msg", "操作被终止，原因是套餐商品不存在");
            out.print(jResult.toString());
            return;
        }

        int buyAmount = 1;
        JSONObject jSellAbleInfo = FreeGroupUtil.getSellAbleInfo(buyUserId, buyAmount, jFreeGroup, jTempFreeGroup);
        if (!jSellAbleInfo.optString("state").equals("ok")) {
            jResult.put("state", "err");
            jResult.put("msg", jSellAbleInfo.optString("msg"));
            out.print(jResult.toString());
            return;
        }

        JSONArray parts = jTempFreeGroup.optJSONArray("parts");
        JSONArray subProducts = FreeGroupUtil.getAllSelectedSubProducts(parts, true);
        if (subProducts.length() == 0) {
            jResult.put("state", "14");
            jResult.put("msg", "操作被终止，原因是没有选择相应的套餐子商品");
            out.print(jResult.toString());
            return;
        }

        JSONObject checkResult = checkSelectedProducts(subProducts);
        if (!checkResult.optString("code").equals("0")) {
            jResult.put("state", "15");
            jResult.put("msg", "操作被终止，原因是:" + checkResult.optString("msg"));
            out.print(jResult.toString());
            return;
        }

        String fgMerchantId = FreeGroupValueUtil.getMerchantId(jFreeGroup);
        String freeGroupVersionId = FreeGroupValueUtil.getFreeGroupVersionId(jFreeGroup);
        String freeGroupSkuId = IsoneProductEngine.normalFreeGroupService.getFreeGroupSkuId(freeGroupId);//生成一个自由组合商品skuId


        JSONObject item = new JSONObject();

        item.put("isFreeGroup", "true");
        item.put("merchantId", fgMerchantId);
        item.put("cartType", CartType.common.name());
        item.put("productId", freeGroupId);//这里是为了和购物车结构一致
        item.put("productVersionId", freeGroupVersionId);
        item.put("skuId", freeGroupSkuId);
        item.put("freeGroupId", freeGroupId);
        item.put("freeGroupVersionId", freeGroupVersionId);
        item.put("checked", "true");
        item.put("amount", String.valueOf(buyAmount));
        item.put("freeGroupSubProducts", subProducts);

        JSONObject shoppingCart = IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, true);
        boolean addOk = CommonCartUtil.addItem(shoppingCart, item);
        if (!addOk) {
            jResult.put("state", "21");
            jResult.put("msg", "操作被终止，原因是套餐商品添加到购物车失败");
            out.print(jResult.toString());
            return;
        }
        IsoneOrderEngine.shoppingCart.updateShoppingCart(shoppingCart);

        jResult.put("state", "0");
        jResult.put("msg", "添加成功");
        out.print(jResult.toString());
    } catch (Exception e) {
        e.printStackTrace();
        jResult.put("state", "100");
        jResult.put("msg", "操作出现异常:" + e.getMessage());
        out.print(jResult.toString());
    }
%>

<%!
    public JSONObject checkSelectedProducts(JSONArray selectedSubProducts) throws Exception {
        JSONObject jResult = new JSONObject();
        if (selectedSubProducts == null) {
            jResult.put("code", "10");
            jResult.put("msg", "所选子商品为空");
            return jResult;
        }
        List<String> productIds = new ArrayList<String>();
        for (int i = 0; i < selectedSubProducts.length(); i++) {
            JSONObject jSubProduct = selectedSubProducts.optJSONObject(i);
            productIds.add(jSubProduct.optString("id"));
        }
        List<JSONObject> products = IsoneModulesEngine.productService.getListDataByIds(productIds, true);
        for (JSONObject jProduct : products) {
            String checkMsg = ProductUtil.checkBuyStatus(jProduct);
            if (StringUtils.isNotBlank(checkMsg)) {
                String productName = ProductValueUtil.getProductName(jProduct);
                jResult.put("code", "110");
                jResult.put("msg", "【" + productName + "】" + checkMsg);
                return jResult;
            }
        }
        jResult.put("code", "0");
        jResult.put("msg", "验证成功");
        return jResult;
    }
%>


