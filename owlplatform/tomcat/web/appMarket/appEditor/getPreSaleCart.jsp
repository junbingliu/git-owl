<%@ page import="net.xinshi.isone.commons.Util" %>
<%@ page import="net.xinshi.isone.functions.shopping.ShoppingCartFunction" %>
<%@ page import="net.xinshi.isone.modules.IsoneModulesEngine" %>
<%@ page import="net.xinshi.isone.modules.businessruleEx.plan.BusinessRuleUtil" %>
<%@ page import="net.xinshi.isone.modules.businessruleEx.plan.bean.executeTimeBean.BuyOrderOrCart" %>
<%@ page import="net.xinshi.isone.modules.order.ordereventbus.impl.AdvancedEventBus" %>
<%@ page import="net.xinshi.isone.modules.payment.applyimpl.AlipayMobile.util.StringUtil" %>
<%@ page import="net.xinshi.isone.modules.shoppingcart.ShoppingCartUtil" %>
<%@ page import="net.xinshi.isone.modules.shoppingcart.bean.CartType" %>
<%@ page import="net.xinshi.isone.modules.user.LoginSessionUtils" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Map" %>
<%@ page import="net.xinshi.isone.modules.merchant.tools.MerchantValueUtil" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    JSONObject jResult = new JSONObject();
    try {
        long begin = System.currentTimeMillis();
        long totalBegin = System.currentTimeMillis();
        String userId = LoginSessionUtils.getFrontendLoginUserId(request);

        String merchantId = request.getParameter("m");
        String exMerchantId = request.getParameter("exm");

        long end = System.currentTimeMillis();
        System.out.print("getFrontendLoginUserId takes:" + (end - begin) + "ms\n");
        begin = end;

        JSONObject jShoppingCart = (JSONObject) ShoppingCartFunction.getMyShoppingCart(request, response, false).get("shoppingCart");

        if (jShoppingCart != null && jShoppingCart.optJSONObject("carts") != null) {
            String imgSpec = request.getParameter("spec");
            if (StringUtils.isNotBlank(imgSpec)) {
                jShoppingCart.put("spec", imgSpec);
            }
            //子商品的图片规格,目前是组合套餐用到,不传默认40X40
            String subSpec = request.getParameter("subSpec");
            if (StringUtils.isNotBlank(subSpec)) {
                jShoppingCart.put("subSpec", subSpec);
            }
            JSONObject carts = jShoppingCart.optJSONObject("carts");
            Map cartsMap = carts.getObjectMap();
            Iterator cartsIt = cartsMap.entrySet().iterator();
            while (cartsIt.hasNext()) {
                Map.Entry cartsEntry = (Map.Entry) cartsIt.next();
                JSONObject cart = (JSONObject) cartsEntry.getValue();
                if (!cart.optString("cartType").equals(CartType.preSale.name())) {
                    cartsIt.remove();
                    continue;
                }
                if (StringUtil.isNotBlank(merchantId)) {
                    if (!cart.optString("merchantId").equals(merchantId)) {
                        cartsIt.remove();
                        continue;
                    }
                }
                if (StringUtil.isNotBlank(exMerchantId)) {
                    String[] exMids = exMerchantId.split(",");
                    for (int i = 0; i < exMids.length; i++) {
                        if (cart.optString("merchantId").equals(exMids[i])) {
                            cartsIt.remove();
                            continue;
                        }
                    }
                }

                cart.remove("selectedCardBatchUseAmount");
            }
            end = System.currentTimeMillis();
            System.out.print("filter carts takes:" + (end - begin) + "ms\n");
            begin = end;

            HashMap ctx = new HashMap();
            ctx.put("carts", jShoppingCart);
            ctx.put("userId", userId);
            ctx.put("request", request);
            ctx.put("result", jResult);
            AdvancedEventBus.fire("beforeGetOcs", ctx);

            String buyingDevice = request.getParameter("buyingDevice");
            if (BuyOrderOrCart.BuyingDevice_Mobile.equals(buyingDevice)) {
                jShoppingCart.put("buyingDevice", BuyOrderOrCart.BuyingDevice_Mobile);
            }
            List<BuyOrderOrCart> ocs = BusinessRuleUtil.getBuyOrderOrCarts(jShoppingCart, userId);
            end = System.currentTimeMillis();
            System.out.print("getBuyOrderOrCarts:" + (end - begin) + "ms\n");
            begin = end;


            byte[] ocsBytes = Util.beanToJson(ocs);
            end = System.currentTimeMillis();
            System.out.print("beanToJson:" + (end - begin) + "ms\n");
            begin = end;

            String ocsString = new String(ocsBytes, "utf-8");

            JSONArray ocArray = new JSONArray(ocsString);
            for (int i = 0; i < ocArray.length(); i++) {
                JSONObject jOc = ocArray.optJSONObject(i);
                String cartMerchantId = jOc.optString("merchantId");
                JSONObject jMerchant = IsoneModulesEngine.merchantService.getMerchant(cartMerchantId);
                jOc.put("merchantName", MerchantValueUtil.getMerchantShowName(jMerchant));//在前台显示商家别名，如果没有设置别名，就显示中文名称
                jOc.put("merchantMainColumnId", jMerchant.optString("mainColumnId"));

            }
            jResult.put("oc", ocArray);
            jResult.put("state", "ok");
            jResult.put("userId", userId);
            jResult.put("count", ShoppingCartUtil.getCountInCart(jShoppingCart));

            AdvancedEventBus.fire("afterGetCart", ctx);

            out.print(jResult);
            long totalEnd = System.currentTimeMillis();
            System.out.println("total times:" + (totalEnd - totalBegin) + "ms");
        } else {
            jResult.put("count", 0);
            jResult.put("userId", userId);
            jResult.put("state", "emptyCar");
            jResult.put("msg", "购物车为空");
            out.print(jResult);
            return;
        }
    } catch (Exception e) {
        e.printStackTrace();
        jResult.put("count", 0);
        jResult.put("state", "error");
        jResult.put("msg", "出现异常,异常信息：" + e.getMessage());
        out.print(jResult);
        return;
    }
%>
