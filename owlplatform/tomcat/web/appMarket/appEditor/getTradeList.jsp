<%@ page import="net.xinshi.isone.base.ext.ConcurrentHashMapExt" %>
<%@ page import="net.xinshi.isone.functions.order.OrderFunction" %>
<%@ page import="java.util.List" %>
<%@ page import="net.xinshi.isone.lucene.search.order.OrderSearchArgs" %>
<%@ page import="net.xinshi.isone.modules.order.bean.OrderState" %>
<%@ page import="net.xinshi.isone.lucene.search.order.OrderStateType2OrderState" %>
<%@ page import="net.xinshi.isone.modules.order.bean.OrderStateType" %>
<%@ page import="java.util.Vector" %>
<%@ page import="net.xinshi.discovery.search.client.services.SearchResults" %>
<%@ page import="net.xinshi.isone.lucene.IsoneFulltextSearchEngine" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="net.xinshi.isone.modules.IsoneOrderEngine" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="net.xinshi.isone.modules.order.OrderUtil" %>
<%@ page import="net.xinshi.isone.modules.order.OrderItemUtil" %>
<%@ page import="net.xinshi.isone.modules.order.OrderPriceUtil" %>
<%@ page import="net.xinshi.isone.modules.order.bean.OrderItemPriceKey" %>
<%@ page import="net.xinshi.isone.modules.IsoneModulesEngine" %>
<%@ page import="net.xinshi.isone.modules.user.UserUtil" %>
<%@ page import="net.xinshi.isone.commons.DateUtil" %>
<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 14-10-24
  Time: 下午12:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    try{
        JSONObject list = new JSONObject();
        String productId = request.getParameter("productId");
        int currentPage = Integer.parseInt(request.getParameter("currentPage"));
        int number = Integer.parseInt(request.getParameter("num"));
        int rowCount = 0;
        List<String> ids;

        int start = (currentPage - 1) * number;
        OrderSearchArgs searchArgs = new OrderSearchArgs();

        //订单状态
        OrderState processStates = OrderState.p112;  //已签收
        OrderStateType2OrderState orderStateType2OrderState = new OrderStateType2OrderState();
        orderStateType2OrderState.setOrderStateType(OrderStateType.processState);
        orderStateType2OrderState.setOrderState(processStates);

        OrderState payStates = OrderState.p201;  //已支付
        OrderStateType2OrderState orderStateType2OrderState2 = new OrderStateType2OrderState();
        orderStateType2OrderState2.setOrderStateType(OrderStateType.payState);
        orderStateType2OrderState2.setOrderState(payStates);

        List<OrderStateType2OrderState> ost2osLists = new Vector<OrderStateType2OrderState>();
        ost2osLists.add(orderStateType2OrderState);
        ost2osLists.add(orderStateType2OrderState2);
        searchArgs.setOrderStateType2states(ost2osLists);


        searchArgs.setProductId(productId);
        searchArgs.setFetchCount(number);
        searchArgs.setFromPath(start);


        SearchResults searchResults = IsoneFulltextSearchEngine.searchServices.search(searchArgs);

        rowCount = searchResults.getTotal();
        ids = searchResults.getLists();

        List<JSONObject> result = IsoneOrderEngine.orderService.getListDataByIds(ids, false);
        int pageCount = (rowCount + number - 1) / number;
        List<JSONObject> recordList = new ArrayList<JSONObject>();
        for (JSONObject jOrder : result) {
            JSONArray orderItems = OrderUtil.getItems(jOrder);
            for (int i = 0; i < orderItems.length(); i++) {
                JSONObject jItem = orderItems.optJSONObject(i);
                String pid = OrderItemUtil.getProductId(jItem);
                String buyerId = OrderUtil.getBuyerId(jOrder);
                long orderPayTime = OrderUtil.getOrderCreateTimeMilli(jOrder);
                if (pid.equals(productId)) {
                    JSONObject jRecord = new JSONObject();

                    JSONObject jPriceInfo = OrderItemUtil.getItemPriceInfo(jItem);
                    String productUnitPrice = OrderPriceUtil.getPriceFormatValue(jPriceInfo, OrderItemPriceKey.unitPrice);

                    JSONObject jBuyer = IsoneModulesEngine.memberService.getUser(buyerId, false);
                    String buyerName = "-";
                    if (jBuyer != null) {
                        buyerName = UserUtil.getRealName(jBuyer, true);
                    }

                    jRecord.put("productId", pid);
                    jRecord.put("name", OrderItemUtil.getItemName(jItem));
                    jRecord.put("unitPrice", productUnitPrice); //成交价
                    jRecord.put("amount", OrderItemUtil.getItemAmount(jItem)); //数量
                    jRecord.put("attrValue", OrderItemUtil.getItemAttrValues(jItem)); //款式和型号
                    jRecord.put("payTime", DateUtil.getLongDate(orderPayTime)); //付款时间
                    jRecord.put("buyerName", buyerName); //买家

                    recordList.add(jRecord);
                }
            }
        }
        list.put("lists",recordList);
        list.put("count", rowCount);
        list.put("page", currentPage);
        list.put("pageCount", pageCount);
        out.print(list);
    }catch (Exception e){
        e.printStackTrace();
    }

%>