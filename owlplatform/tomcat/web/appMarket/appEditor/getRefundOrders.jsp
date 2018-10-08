<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="net.xinshi.isone.modules.order.IOrderService" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="net.xinshi.isone.modules.user.LoginSessionUtils" %>
<%@ page import="net.xinshi.isone.modules.IsoneModulesEngine" %>
<%@ page import="net.xinshi.isone.functions.order.OrderFunction" %>
<%@ page import="net.xinshi.isone.base.ext.ConcurrentHashMapExt" %>

<%
try{
    String userId = LoginSessionUtils.getFrontendLoginUserId(request);
    if (StringUtils.isBlank(userId)) {
        out.print("0");
        return;
    }

    JSONObject jUser = IsoneModulesEngine.userService.getUser(userId);
    if (jUser == null) {
        out.print("1");
        return;
    }
    String columnId=IOrderService.U_ORDER_LIST_COLUMN_ID_ALL;
    String orderType=IOrderService.ORDER_LIST_TYPE_SUCCESS;
    int pages=1;
    ConcurrentHashMapExt refundMap= OrderFunction.getRefundOrderList(userId, columnId, orderType, pages, 50, "");
    JSONObject map = new JSONObject();
    map.put("list",refundMap);
	map.put("columnId",columnId);
    out.print(map);
} catch (Exception e) {
    e.printStackTrace();
    out.print("error");
    }

%>