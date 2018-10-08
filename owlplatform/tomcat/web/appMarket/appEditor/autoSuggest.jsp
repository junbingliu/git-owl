<%@ page import="net.xinshi.discovery.search.client.reco.SuggestItem" %>
<%@ page import="net.xinshi.isone.lucene.IsoneFulltextSearchEngine" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="java.util.List" %>
<%@ page import="net.xinshi.isone.lucene.search.product.ProductSearchArgs" %>
<%@ page import="net.xinshi.isone.base.IsoneBaseEngine" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    out.clearBuffer();
    String keyword = request.getParameter("keyword");
    String callback = request.getParameter("callback");
    int index = 0;
    try {
        if (keyword != null && !"".equals(keyword.trim())) {
            JSONArray jrecords = new JSONArray();
            ProductSearchArgs productSearchArgs = new ProductSearchArgs();
            productSearchArgs.setComplete(keyword.trim());
            List<SuggestItem> items = IsoneFulltextSearchEngine.getRecommeder().autoComplete(productSearchArgs);

            //
            if (items.size() > 0) {
                String name = items.get(0).getName();
                productSearchArgs = new ProductSearchArgs();
                productSearchArgs.setKeyword_category(name);
                List<String> tips = IsoneFulltextSearchEngine.getRecommeder().searchKeywordCategory(productSearchArgs);
                try {
                    for (int i = 0; i < tips.size(); i++) {
                        JSONObject obj = new JSONObject();
                        JSONObject columnObj = IsoneBaseEngine.columnService.getColumn(tips.get(i));
                        if (null != columnObj) {
                            obj.put("name", columnObj.optString("name"));
                            obj.put("id", tips.get(i));
                            obj.put("keyword", name);
                            jrecords.put(obj);
                        }
                    }
                    if (tips != null && tips.size() > 0) {
                        index = 1;
                    }

                    for (int i = index; i < items.size(); i++) {
                        JSONObject obj = new JSONObject();
                        obj.put("name", items.get(i).getName());
                        obj.put("num", items.get(i).getNum());
                        jrecords.put(obj);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            response.setContentType("text/html;charset=utf-8");
            response.setHeader("Cache-Control", "no-cache");

            out.print(callback + "(" + jrecords.toString() + ")");
        }
    } catch (Exception e) {
        e.printStackTrace();
        out.print(callback + "()");
    }
%>