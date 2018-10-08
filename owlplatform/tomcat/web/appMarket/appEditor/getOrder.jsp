<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="net.xinshi.isone.functions.order.OrderFunction" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="net.xinshi.isone.functions.product.ProductFunction" %>
<%@ page import="net.xinshi.isone.functions.CommonFunctions" %>

<%
    try{
    List<JSONObject> listrecord = OrderFunction.getLatestProductTransaction(600, 20);
    String productId = null;
    for (JSONObject list : listrecord) { 
       productId = list.optString("productId");
        String pic = CommonFunctions.getPicListSizeImage( ProductFunction.getProduct(productId),"attr_10000","40X40","/upload/nopic_40.gif",0);
        list.put("pic",pic);
    }

    out.print(listrecord);
    }catch (Exception e){
        e.printStackTrace();
        out.print("error");
    }
%>