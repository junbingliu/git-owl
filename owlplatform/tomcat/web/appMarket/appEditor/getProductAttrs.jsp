<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="net.xinshi.isone.base.dynaattr.DynaAttrUtil" %>
<%@ page import="net.xinshi.isone.modules.IsoneModulesEngine" %>
<%@ page import="net.xinshi.isone.modules.price.IPSkuService" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Map" %>
<%
    JSONObject jResult = new JSONObject();
    try {
        String productId = request.getParameter("productId");
        if (StringUtils.isBlank(productId)) {
            jResult.put("state", "11");
            jResult.put("msg", "商品ID参数错误");
            out.print(jResult.toString());
            return;
        }

        JSONObject jProduct = IsoneModulesEngine.productService.getProduct(productId);
        if (jProduct == null) {
            jResult.put("state", "12");
            jResult.put("msg", "商品不存在");
            out.print(jResult.toString());
            return;
        }

        JSONArray resultAttrs = new JSONArray();
        List<JSONObject> skus = IsoneModulesEngine.pskuService.getAllList(productId);
        JSONArray jAttrs = DynaAttrUtil.getProductInventoryPropertyAttrs(jProduct);
        for (int i = 0; i < jAttrs.length(); i++) {
            JSONObject jAttr = jAttrs.optJSONObject(i);
            JSONArray standardValues = filterStandardValues(jAttr, skus);

            JSONObject smallAttr = new JSONObject();
            smallAttr.put("id", jAttr.optString("id"));
            smallAttr.put("name", jAttr.optString("name"));
            smallAttr.put("values", standardValues);
            resultAttrs.put(smallAttr);
        }
        JSONArray jAttrJesult = new JSONArray();
        if (skus != null) {
            for (JSONObject jSku : skus) {
                if (jSku == null) continue;

                String isShow = jSku.optString("isShow");
                if (!isShow.equals(IPSkuService.SHOW_Y)) {
                    continue;
                }

                String tempSkuId = jSku.optString("id");
                String realSkuId = jSku.optString("skuId");
                String isHead = jSku.optString("isHead");

                JSONObject attrs = jSku.optJSONObject("attrs");


                JSONObject smallSku = new JSONObject();
                smallSku.put("productId", productId);
                smallSku.put("id", tempSkuId);
                smallSku.put("realSkuId", realSkuId);
                smallSku.put("isHead", isHead);
                smallSku.put("attrs", attrs);
                jAttrJesult.put(smallSku);
            }
        }
        setRelStandardIds(resultAttrs, skus);


        jResult.put("state", "ok");
        jResult.put("attrs", resultAttrs);
        jResult.put("skus", jAttrJesult);
        jResult.put("productId", productId);
        out.print(jResult.toString());
    } catch (Exception e) {
        out.print("error");
        jResult.put("state", "error");
        jResult.put("msg", "数据加载失败，请稍后再试");
        out.print(jResult.toString());
    }
%>

<%!
    JSONArray filterStandardValues(JSONObject jAttr, List<JSONObject> skus) throws Exception {
        JSONArray result = new JSONArray();
        JSONArray standardValues = jAttr.optJSONArray("standardValues");
        if (standardValues != null) {
            for (int i = 0; i < standardValues.length(); i++) {
                JSONObject jStandardValue = standardValues.optJSONObject(i);
                String sdValueId = jStandardValue.optString("id");
                for (int k = 0; k < skus.size(); k++) {
                    JSONObject jSku = skus.get(k);
                    boolean isHead = jSku.optBoolean("isHead");
                    if (isHead) {
                        continue;
                    }
                    String isShow = jSku.optString("isShow");
                    if (!isShow.equals(IPSkuService.SHOW_Y)) {
                        continue;
                    }

                    boolean isExist = false;
                    JSONObject attrs = jSku.optJSONObject("attrs");
                    Map attrsMap = attrs.getObjectMap();
                    Iterator it = attrsMap.entrySet().iterator();
                    while (it.hasNext()) {
                        Map.Entry entry = (Map.Entry) it.next();
                        String value = (String) entry.getValue();
                        if (sdValueId.equals(value)) {
                            isExist = true;
                            break;
                        }
                    }
                    if (isExist) {
                        JSONObject jSmallStandardValue = new JSONObject();
                        jSmallStandardValue.put("id", jStandardValue.optString("id"));
                        jSmallStandardValue.put("name", jStandardValue.optString("name"));
                        result.put(jSmallStandardValue);
                        break;
                    }
                }
            }
        }
        return result;
    }

    void setRelStandardIds(JSONArray resultAttrs, List<JSONObject> skus) throws Exception {
        for (int i = 0; i < resultAttrs.length(); i++) {
            JSONObject jAttr = resultAttrs.optJSONObject(i);
            JSONArray standardValues = jAttr.optJSONArray("values");
            if (standardValues != null) {
                String attrId = jAttr.optString("id");
                for (int j = 0; j < standardValues.length(); j++) {
                    JSONObject jStandardValue = standardValues.optJSONObject(j);
                    String sdValueId = jStandardValue.optString("id");
                    for (int k = 0; k < skus.size(); k++) {
                        JSONObject jSku = skus.get(k);
                        boolean isHead = jSku.optBoolean("isHead");
                        if (isHead) {
                            continue;
                        }
                        String isShow = jSku.optString("isShow");
                        if (!isShow.equals(IPSkuService.SHOW_Y)) {
                            continue;
                        }

                        JSONObject attrs = jSku.optJSONObject("attrs");
                        String attrValueId = attrs.optString(attrId);
                        if (!sdValueId.equals(attrValueId)) {
                            continue;
                        }

                        Map attrsMap = attrs.getObjectMap();
                        Iterator it = attrsMap.entrySet().iterator();
                        while (it.hasNext()) {
                            Map.Entry entry = (Map.Entry) it.next();
                            String key = (String) entry.getKey();
                            String value = (String) entry.getValue();
                            if (sdValueId.equals(value)) {
                                continue;
                            }
                            String relKey = key + "_relIds";
                            String relIds = jStandardValue.optString(relKey);
                            if (relIds.equals("")) {
                                relIds = value;
                            } else {
                                relIds += "," + value;
                            }
                            jStandardValue.put(relKey, relIds);
                        }
                    }
                }
            }
        }
    }
%>