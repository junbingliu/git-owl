<%@ page import="net.xinshi.isone.modules.IsoneModulesEngine" %>
<%@ page import="net.xinshi.isone.modules.IsoneProductEngine" %>
<%@ page import="net.xinshi.isone.modules.freegroup.tools.FreeGroupValueUtil" %>
<%@ page import="net.xinshi.isone.modules.price.PriceUtil" %>
<%@ page import="net.xinshi.isone.modules.price.ProductPriceUtil" %>
<%@ page import="net.xinshi.isone.modules.product.ProductUtil" %>
<%@ page import="net.xinshi.isone.modules.product.tools.ProductValueUtil" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%

    JSONObject jRet = new JSONObject();
    try {
        String freeGroupId = request.getParameter("id");
        String json = request.getParameter("parts");
        String logoSize = request.getParameter("logoSize");
        if (StringUtils.isBlank(freeGroupId) || StringUtils.isBlank(json)) {
            jRet.put("state", "error");
            jRet.put("msg", "参数错误");
            out.print(jRet.toString());
            return;
        }

        JSONObject jFreeGroup = IsoneProductEngine.normalFreeGroupService.getFreeGroup(freeGroupId);
        if (jFreeGroup == null) {
            jRet.put("state", "error");
            jRet.put("msg", "套餐商品不存在");
            out.print(jRet.toString());
            return;
        }

        long totalPayPrice = FreeGroupValueUtil.getUnitPrice(jFreeGroup);

        String defaultPath = "/upload/nopic_60.gif";
        if (StringUtils.isBlank(logoSize)) {
            logoSize = "60X60";
        }

        long totalOriPrice = 0;
        JSONArray parts = new JSONArray(json);
        for (int i = 0; i < parts.length(); i++) {
            JSONObject jPart = parts.optJSONObject(i);
            JSONArray jSelectedProducts = jPart.optJSONArray("selectedProducts");
            if (jSelectedProducts == null || jSelectedProducts.length() == 0) {
                continue;
            }
            for (int j = 0; j < jSelectedProducts.length(); j++) {
                JSONObject jSelProduct = jSelectedProducts.optJSONObject(j);
                JSONObject jProduct = IsoneModulesEngine.productService.getProduct(jSelProduct.optString("id"));
                if (jProduct == null) {
                    continue;
                }
                String productId = ProductValueUtil.getProductId(jProduct);
                String skuId = jSelProduct.optString("skuId");
                List<JSONObject> priceValues = ProductPriceUtil.getProductPrices("-1", productId, skuId, "UGF");//普通会员价
                JSONObject jPriceValue = null;
                if (priceValues != null) {
                    jPriceValue = priceValues.get(0);
                }

                jSelProduct.put("name", ProductValueUtil.getProductName(jProduct));
                if (jPriceValue != null) {
                    long unitPrice = jPriceValue.optLong("unitPrice");
                    totalOriPrice += unitPrice;
                    jSelProduct.put("unitPrice", unitPrice);
                    jSelProduct.put("fUnitPrice", PriceUtil.getMoneyValue(jPriceValue));
                }
                jSelProduct.put("logo", ProductUtil.getProductLogo(jProduct, logoSize, defaultPath));
            }
        }

        long totalSavePrice = totalOriPrice - totalPayPrice;
        if (totalSavePrice < 0) {
            totalSavePrice = 0;
        }

        jRet.put("state", "ok");
        jRet.put("parts", parts);
        jRet.put("fTotalOriPrice", PriceUtil.getMoneyValue(totalOriPrice));//原价总价
        jRet.put("fTotalSavePrice", PriceUtil.getMoneyValue(totalSavePrice));//总优惠
        out.print(jRet.toString());
    } catch (Exception e) {
        e.printStackTrace();
        jRet.put("state", "error");
        jRet.put("msg", "加载商品数据异常");
        out.print(jRet.toString());
    }
%>