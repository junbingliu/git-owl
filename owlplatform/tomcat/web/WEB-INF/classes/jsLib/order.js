var OrderApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.base,
    Packages.net.xinshi.isone.modules.price,
    Packages.net.xinshi.isone.lucene,
    Packages.net.xinshi.isone.lucene.search.product,
    Packages.net.xinshi.pigeon.list,
    Packages.java.util,
    Packages.net.xinshi.isone.modules.businessruleEx.plan,
    Packages.net.xinshi.isone.modules.order,
    Packages.net.xinshi.isone.modules.order.bean,
    Packages.net.xinshi.isone.modules.order.orderrule,
    Packages.net.xinshi.isone.modules.order.OrderSearchUtil,
    Packages.net.xinshi.isone.modules.order.OrderListDispatchUtils,
    Packages.net.xinshi.isone.modules.order.task,
    Packages.net.xinshi.isone.modules.merchant.bean
);

/**
 * @constructor
 * @type {Object}
 */
var OrderService = {};

/**
 * 最简单的添加商品函数
 * @param productIds
 * @param amounts
 * @param userId
 * @param orderType
 * @param merchantId
 * @param deliveryRuleId
 * @return {*}
 */
OrderService.addOrderSimple = function (productIds, amounts, userId, orderType, merchantId, deliveryRuleId, description) {
    if (productIds.length != amounts.length) {
        throw "productIds的长度与amounts的长度必须一致!";
        return;
    }

    var items = {};
    var products = ProductService.getProducts(productIds);
    if (products.length != productIds.length) {
        throw "productIds中有无效的id。products.length!=productIds.length";
        return;
    }
    for (var i = 0; i < productIds.length; i++) {
        var product = products[i];
        var productId = productIds[i];
        var amount = amounts[i];
        var skus = ProductService.getSkus(productId);
        if (!skus) {
            throw  "skus==null, productId=" + productId + "<br>";
            return;
        }
        var sku = skus[skus.length - 1];
        var skuId = "" + sku["id"];
        var realSkuId = "" + sku["realSkuId"];
        var productVersionId = product["_v"];

        var item = {
            productId: productId,
            skuId: skuId,
            realSkuId: realSkuId,
            productVersionId: productVersionId,
            amount: amount
        };
        items["item" + i] = item;
    }
    var cart = {
        cartType: orderType,
        merchant: merchantId,
        key: "dummy",
        selectedDeliveryRuleId: deliveryRuleId,
        merchantId: merchantId,
        items: items
    };
    var jCart = new OrderApi.JSONObject(JSON.stringify(cart));
    var oc = OrderApi.BusinessRuleUtil.getBuyOrderOrCartForOrderForm(jCart, userId);
    if (description && description != '') {
        oc.setDescription(description);
    }
    var jOrder = OrderApi.BusinessRuleUtil.getOrderFrom(oc);
    var orderId = OrderApi.IsoneOrderEngine.orderService.addOrder(jOrder, OrderApi.OrderType.common, userId);

    jOrder = OrderApi.IsoneOrderEngine.orderService.getOrder(orderId);
    return JSON.parse("" + jOrder.toString());
};
/**
 * 增加订单接口
 * @param jOrder 订单对象
 * @param orderType 订单类型
 * @param userId 操作人ID
 * @returns {*}
 */
OrderService.addOrder = function (jOrder, orderType, userId) {
    if (!jOrder || !orderType || !userId) {
        return null;
    }
    jOrder = $.toJavaJSONObject(jOrder);
    return OrderApi.IsoneOrderEngine.orderService.addOrder(jOrder, orderType, userId) + "";
};

/**
 * 获得我的订单，在用户专区使用
 * @param userId
 * @param columnId
 * @param type
 * @param page
 * @param number
 * @returns {*}
 * @Deprecated 这个方法返回的数据格式不一致，建议使用OrderService.getUserOrderList代替
 */
OrderService.getMyOrderList = function (userId, columnId, type, page, number) {
    /*try {*/
    if (!userId || userId == '') {
        return {state: 'error', msg: 'user is is none.'};
    }
    if (!columnId || columnId == '') {
        return {state: 'error', msg: 'columnId is is none.'};
    }
    if (!type || type == '') {
        type = 'all';
    }
    page = page > 0 ? page - 1 : 1;
    number = number ? number : 10;

    var iSortList = OrderApi.IsoneOrderEngine.orderService.getList(userId, columnId, type);
    var size = iSortList.getSize();
    var pageCount = Math.floor((size + number - 1) / number);
    var start = page * number;
    var last = start + number > size ? size - start : number;
    var sortList = iSortList.getRange(start, last);
    var listOfJSON = OrderApi.IsoneOrderEngine.orderService.getListData(sortList, false);
    var orders = JSON.parse(listOfJSON.toString());
    var result = {
        list: orders,
        count: size,
        pageCount: pageCount,
        page: page + 1,
        number: number
    };
    return result;
    /*} catch (e) {
     return {state:'error',msg:'exception.'};
     }*/
};

/**
 * 获得我的订单，在用户专区使用
 * @param userId
 * @param columnId
 * @param type
 * @param page
 * @param number
 * @returns {*}
 */
OrderService.getUserOrderList = function (userId, columnId, type, page, number) {
    try {
        if (!userId || userId == '') {
            return {state: 'error', msg: 'user is is none.'};
        }
        if (!columnId || columnId == '') {
            return {state: 'error', msg: 'columnId is is none.'};
        }
        type = type ? type : "all";
        page = page ? page : 1;
        number = number ? number : 10;

        var iSortList = OrderApi.IsoneOrderEngine.orderService.getList(userId, columnId, type);
        var size = iSortList.getSize();
        var pageCount = Math.floor((size + number - 1) / number);
        var start = (page-1) * number;
        var last = start + number > size ? size - start : number;
        var sortList = iSortList.getRange(start, last);
        var listOfJSON = OrderApi.IsoneOrderEngine.orderService.getListData(sortList, false);
        var orders = JSON.parse(listOfJSON.toString());
        var result = {
            state: "ok",
            lists: orders,
            count: size,
            pageCount: pageCount,
            page: page,
            number: number
        };
        return result;
    } catch (e) {
        return {state: 'error', msg: 'exception...e='+e};
    }
};

/**
 * 重建索引，只建立最新的number个订单
 * @param merchantId
 * @param number
 */
OrderService.reBuildIndex = function (merchantId, number) {
    if (merchantId == 'head_merchant') {
        var column = 'c_o_1000';
    }
    else {
        var column = 'c_o_m_1000';
    }
    var allOrderList = OrderApi.IsoneOrderEngine.orderService.getList(merchantId, column + "_all");
    if (allOrderList == null || allOrderList.getSize() == 0) {
        return;
    }
    var sloList = allOrderList.getRange(0, number);
    for (var i = sloList.size() - 1; i >= 0; i--) {
        var slo = sloList.get(i);
        OrderApi.IsoneOrderEngine.orderService.addIndexingQue(slo.getObjid());
    }
};

OrderService.getOrder = function (orderId) {
    var jOrder = OrderApi.IsoneOrderEngine.orderService.getOrder(orderId);
    if (!jOrder) {
        return null;
    }
    return JSON.parse("" + jOrder.toString());
};

OrderService.updateOrderState = function (orderId, stateType, state, userId, userName, description, merchantType) {
    var jOrder = OrderApi.IsoneOrderEngine.orderService.getOrder(orderId);
    var javaStateType = OrderApi.OrderStateType.valueOf(stateType);
    var javaOrderState = OrderApi.OrderState.valueOf(state);
    var javaMerchantType = OrderApi.MerchantType.valueOf(merchantType);
    OrderApi.IsoneOrderEngine.orderService.updateOrderState(jOrder, javaStateType, javaOrderState, userId, javaMerchantType, request);
    var log = {};
    if (typeof request != 'undefined') {
        log.ip = "" + request.getRemoteAddr();
    }
    log.userId = "" + userId;
    log.realName = "" + userName;
    log.time = (new Date()).getTime();
    log.description = "" + description;
    var jStates = jOrder.opt("states");
    var jProcessState = jStates.opt("processState");
    if (jProcessState) {
        var oldState = "" + jProcessState.optString("state");
    }
    else {
        var oldState = "p100";
    }

    log.oldValueId = oldState;
    var oldState = OrderApi.OrderState.valueOf(oldState);
    log.oldValue = "" + oldState.getDesc();
    log.newValueId = "" + state;
    log.newValue = "" + javaOrderState.getDesc();
    var jLog = $.JSONObject(log);
    OrderApi.IsoneOrderEngine.orderLogService.addLog(orderId, OrderApi.OrderLogType.OLT107, jLog);
};

OrderService.updateOrder = function (orderId, order, userId) {
    var result = false;
    if (!order) return result;
    var jOrder = new OrderApi.JSONObject(JSON.stringify(order));
    result = OrderApi.IsoneOrderEngine.orderService.updateOrder(orderId, jOrder, userId);
    return result;
};

OrderService.doOrderStateAutoDeal = function (request, order, userId, remark) {
    var jOrder = new OrderApi.JSONObject(JSON.stringify(order));
    OrderApi.OrderStateAutoDealHelper.doOrderStateAutoDeal(request, jOrder, userId, "后台修改订单信息。");
};

/**
 * 订单搜索（返回字符串格式）
 * @param searchArgs
 * @returns {string}
 */
OrderService.searchOrder = function (searchArgs) {
    var jParams = $.toJavaJSONObject(searchArgs);
    return OrderApi.OrderSearchUtil.searchOrder(jParams) + "";
};

/**
 * 订单搜索（返回JSON格式）
 * @param searchArgs
 * @returns {*}
 */
OrderService.searchOrderEx = function (searchArgs) {
    var jParams = $.toJavaJSONObject(searchArgs);
    var json = OrderApi.OrderSearchUtil.searchOrder(jParams);
    return JSON.parse(json.toString());
};

/*获取用户待处理订单数量(待处理且待支付)*/
OrderService.getWaitingProcessOrderCount = function (orderType, userId, targetColumnId) {
    return OrderApi.OrderFunction.getWaitingProcessOrderCount(orderType, userId, targetColumnId);
};
/**
 * 根据订单外部号获取订单对象
 * @param aliasCode
 * @returns {*}
 */
OrderService.getOrderByAliasCode = function (aliasCode) {
    if (!aliasCode) {
        return null;
    }
    var jOrder = OrderApi.IsoneOrderEngine.orderService.getOrderByAliasCode(aliasCode);
    if (!jOrder) {
        return null;
    }
    return JSON.parse(jOrder.toString());
};

OrderService.getOrderIdByOrderPayRecId = function (payRecId) {
    return "" + OrderApi.IsoneOrderEngine.orderService.getOrderIdByOrderPayRecId(payRecId);
};

//订单栏目分发
OrderService.orderListDispatchForUpdateOrder = function (orderId, userId) {
    var order = this.getOrder(orderId);
    var jOrder = new OrderApi.JSONObject(JSON.stringify(order));
    OrderApi.OrderListDispatchUtils.orderListDispatchForUpdateOrder(jOrder, userId);
};

/**
 * 获取订单自动取消时间
 * @param order
 */
OrderService.getOrderAutoCloseTime = function (order) {
    var jOrder = new OrderApi.JSONObject(JSON.stringify(order));
    var v = OrderApi.OrderSystemArgusUtil.getOrderAutoCloseTime(jOrder);
    return v;
};
/**
 * 获取订单某个商家自动签收时间（单位：秒）
 * @param merchantId
 */
OrderService.getOrderAutoCompletedTime = function (merchantId) {
    var v = OrderApi.OrderSystemArgusUtil.getOrderAutoCompletedTime(merchantId);
    return v;
};
/**
 * 添加自动签收task
 * @param orderId
 * @returns {*}
 */
OrderService.addAutoCompletedTask = function (orderId) {
    var v = OrderApi.OrderAutoCompletedTask.addTaskQueue(orderId);
    return v;
};

//获取订单对象集
OrderService.getListDataByIds = function (ids) {
    if (!ids || ids.length == 0) {
        return null;
    }
    var orderIds = new OrderApi.ArrayList();
    for (var i = 0; i < ids.length; i++) {
        orderIds.add(ids[i]);
    }
    var lists = OrderApi.IsoneOrderEngine.orderService.getListDataByIds(orderIds, false);
    return JSON.parse(lists.toString());
};

/**
 * 将订单加到某个列表里
 * @param objId 订单ID
 * @param createTime 订单创建时间，长整型
 * @param merchantId 商家ID
 * @param columnId 栏目ID
 * @param listType 列表类型
 */
OrderService.add2List = function (objId, createTime, merchantId, columnId, listType) {
    if (!objId || !createTime || !merchantId || !columnId || !listType) {
        return;
    }
    OrderApi.IsoneOrderEngine.orderService.add2List(objId, createTime, merchantId, columnId, listType);
};

/**
 * 根据订单内部号或外部号获取订单对象
 * @param key 订单内部号或外部号
 * @returns {return} 订单对象
 */
OrderService.getOrderByKey = function (key) {
    if (!key) {
        return null;
    }
    var jOrder = null;
    if (key.indexOf("o_") == -1) {
        jOrder = OrderService.getOrderByAliasCode(key);
    } else {
        jOrder = OrderService.getOrder(key);
    }
    return jOrder;
};

/**
 * 根据创建时间来生成订单外部号（格式为：20160725145350）
 * @param createTime
 * @returns {string}
 */
OrderService.getNewOrderAliasCode = function (createTime) {
    return OrderApi.OrderUtil.getNewOrderAliasCode(createTime) + "";
};

/**
 * 根据订单内部ID获取订单的关联对象
 * @param orderId
 */
OrderService.getRefInfo = function (orderId) {
    if (!orderId) {
        return null;
    }
    return JSON.parse(OrderApi.OrderRefInfoUtils.getOrderRefInfoByOrderId(orderId) + "");
};

/**
 * 根据订单关联的退款单信息，重新计算订单对应的总退款状态
 * @param order
 * @param isOrderUpdated
 */
OrderService.reCalcOrderTotalRefundState = function (order, isOrderUpdated) {
    var jOrder = new OrderApi.JSONObject(JSON.stringify(order));
    return OrderApi.OrderRefInfoUtils.reCalcOrderTotalRefundState(jOrder, isOrderUpdated);
};

/**
 * 根据订单关联的退款单信息，重新计算订单对应的总退款状态
 * @param orderId
 * @param isOrderUpdated
 */
OrderService.reCalcOrderTotalRefundStateByOrderId = function (orderId, isOrderUpdated) {
    return OrderApi.OrderRefInfoUtils.reCalcOrderTotalRefundState(orderId, isOrderUpdated);
};

/**
 * 把订单删除到回收站
 * @param orderId
 * @param userId
 * @param ip
 */
OrderService.deleteToMyOrderRecycle = function (orderId, userId, ip) {
    OrderApi.OrderUtil.deleteToMyOrderRecycle(orderId, userId, ip);
};

/**
 * 把订单从回收站中恢复
 * @param orderId
 * @param userId
 * @param ip
 */
OrderService.recoverFromMyOrderRecycle = function (orderId, userId, ip) {
    OrderApi.OrderUtil.recoverFromMyOrderRecycle(orderId, userId, ip);
};

/**
 * 通过订单ＩＤ批量追加订单对象的关联信息
 * @param orderId
 * @param relInfoValues
 * @param refOrderType
 */
OrderService.batchAppendOrderRefInfoByOrderId = function (orderId, relInfoValues, refOrderType) {
    var javaRelInfoValues = new OrderApi.JSONArray(JSON.stringify(relInfoValues));
    OrderApi.OrderRefInfoUtils.batchAppendOrderRefInfoByOrderId(orderId, javaRelInfoValues, refOrderType);
};

/**
 * 获得订单来源配置
 * @returns {*}
 */
OrderService.getOrderSourceConfig = function (){
    var jConfig = OrderApi.IsoneOrderEngine.orderService.getOrderSourceConfig();
    if (!jConfig) {
        return null;
    }
    return JSON.parse( jConfig.toString() );
};
/**
 * 修改订单来源配置
 * @param config
 */
OrderService.updateOrderSourceConfig = function (config){
    var jConfig = $.toJavaJSONObject( config );
    OrderApi.IsoneOrderEngine.orderService.updateOrderSourceConfig( jConfig );
};