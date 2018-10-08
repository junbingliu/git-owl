<%@ page import="net.xinshi.isone.functions.shopping.ShoppingCartFunction" %>
<%@ page import="net.xinshi.isone.modules.shoppingcart.CommonCartUtil" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="java.util.*" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    JSONObject jResult = new JSONObject();
    try {
        String merchantId = request.getParameter("merchantId");//要结算的商家ID
        String exMerchantId = request.getParameter("exMerchantId");//不参与结算的商家ID
        JSONObject jShoppingCart = (JSONObject) ShoppingCartFunction.getMyShoppingCart(request, response, false).get("shoppingCart");
        if (jShoppingCart != null) {
            JSONObject jCarts = jShoppingCart.optJSONObject("carts");
            if (jCarts != null && jCarts.length() > 0 && (StringUtils.isNotBlank(merchantId) || StringUtils.isNotBlank(exMerchantId))) {
                List<String> merchantIdArray = StringUtils.isBlank(merchantId) ? new ArrayList<String>() : Arrays.asList(merchantId.split(","));
                List<String> exMerchantIdArray = StringUtils.isBlank(exMerchantId) ? new ArrayList<String>() : Arrays.asList(exMerchantId.split(","));

                Map cartsMap = jCarts.getObjectMap();
                Iterator cartsIt = cartsMap.entrySet().iterator();
                while (cartsIt.hasNext()) {
                    Map.Entry cartsEntry = (Map.Entry) cartsIt.next();
                    JSONObject jCart = (JSONObject) cartsEntry.getValue();
                    String cartMid = jCart.optString("merchantId");
                    //如果该商家不包含在要结算的商家里，就不参与计算
                    if (StringUtils.isNotBlank(merchantId) && !merchantIdArray.contains(cartMid)) {
                        cartsIt.remove();
                    }
                    //如果该商家包含在不要结算的商家里，就不参与计算
                    if (StringUtils.isNotBlank(exMerchantId) && exMerchantIdArray.contains(cartMid)) {
                        cartsIt.remove();
                    }
                }
            }
            int count = CommonCartUtil.statShoppingCart(jShoppingCart).optInt("productAmount");
            jResult.put("count", count);
        } else {
            jResult.put("count", 0);
        }
        out.print(jResult);
    } catch (Exception e) {
        e.printStackTrace();
        jResult.put("count", 0);
        out.print(jResult);
    }
%>