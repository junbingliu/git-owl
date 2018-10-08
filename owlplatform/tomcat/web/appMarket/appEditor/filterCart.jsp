<%@ page import="net.xinshi.isone.functions.shopping.ShoppingCartFunction" %>
<%@ page import="net.xinshi.isone.modules.IsoneOrderEngine" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="java.util.Map" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    JSONObject jResult = new JSONObject();
    try {

        String mode = request.getParameter("mode");
        if(mode != null && mode.equals("form")){
            jResult.put("code", "ok");
            out.print(jResult);
            return;
        }

        JSONObject jShoppingCart = (JSONObject) ShoppingCartFunction.getMyShoppingCart(request, response, false).get("shoppingCart");

        if (jShoppingCart == null || jShoppingCart.optJSONObject("carts") == null) {
            jResult.put("code", "ok");
            out.print(jResult);
            return;
        }

        JSONObject carts = jShoppingCart.optJSONObject("carts");
        if (carts == null) {
            jResult.put("code", "ok");
            out.print(jResult);
            return;
        }

        boolean isUpdated = false;
        for (Object o : carts.getObjectMap().entrySet()) {
            Map.Entry cartEntry = (Map.Entry) o;
            JSONObject jCart = (JSONObject) cartEntry.getValue();
            JSONObject jItems = jCart.optJSONObject("items");
            JSONObject newItems = new JSONObject();
            boolean isItemChanged = false;
            for (Object item : jItems.getObjectMap().entrySet()) {
                Map.Entry itemEntry = (Map.Entry) item;
                String itemKey = (String) itemEntry.getKey();
                JSONObject jItem = (JSONObject) itemEntry.getValue();

                String isCombiProduct = jItem.optString("combiProductId");
                if (StringUtils.isNotBlank(isCombiProduct)) {
                    jItem.put("checked", false);
                    isUpdated = true;
                    isItemChanged = true;
                } else {
                    newItems.put(itemKey, jItem);
                }
            }

            if(isItemChanged){
                jCart.put("items", newItems);
            }
        }

        if (isUpdated) {
            IsoneOrderEngine.shoppingCart.updateShoppingCart(jShoppingCart);
        }

        jResult.put("code", "ok");
        out.print(jResult);
    } catch (Exception e) {
        e.printStackTrace();
        jResult.put("code", "error");
        out.print(jResult);
    }
%>

