var OpenOrderApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.open.order
);

/**
 * @constructor
 * @type {Object}
 */
var OpenOrderService = {};

/**
 * 添加订单
 * @param merchantId
 * @param orderInfo
 * @param config
 * @returns {*}
 */
OpenOrderService.addOrder = function (merchantId, orderInfo, config) {
    var jOrderInfo = $.JSONObject(orderInfo);
    var jConfig = $.JSONObject(config);
    var json = OpenOrderApi.OrderAdd.addOrder(null, jOrderInfo, jConfig);
    return JSON.parse(json.toString());
};
/**
 * 获得订单信息
 * @param paramInfo
 * @returns {*}
 */
OpenOrderService.getOrder = function (paramInfo) {
    var jParams = $.JSONObject(paramInfo);
    var json = OpenOrderApi.OrderGet.getOrder(jParams);
    return JSON.parse(json.toString());
};

/**
 * 订单搜索
 * @param searchArgs
 * @returns {*}
 */
OpenOrderService.getOrders = function (searchArgs) {
    var jParams = $.JSONObject(searchArgs);
    var json = OpenOrderApi.OrderSearch.getOrders(jParams);
    return JSON.parse(json.toString());
};


/**
 * 修改订单的运单信息
 * @param paramInfo
 * @returns {*}
 */
OpenOrderService.updateOrderLogisticsInfo = function (paramInfo) {
    var jParams = $.JSONObject(paramInfo);
    var json = OpenOrderApi.OrderUpdateLogisticsInfo.updateOrderLogisticsInfo(jParams);
    return JSON.parse(json.toString());
};

/**
 * 取消订单
 * @param orderId
 * @param orderAliasCode
 * @returns {*}
 */
OpenOrderService.cancelOrder = function (orderId, orderAliasCode) {
    var json = OpenOrderApi.OrderUpdateToCancel.cancelOrder(orderId, orderAliasCode);
    return JSON.parse(json.toString());
};

/**
 * 取消订单
 * @param orderId
 * @param orderAliasCode
 * @param config
 * @returns {*}
 */
OpenOrderService.cancelOrderEx = function (orderId, orderAliasCode, config) {
    var jConfig = $.JSONObject(config);
    var json = OpenOrderApi.OrderUpdateToCancel.cancelOrder(orderId, orderAliasCode, jConfig);
    return JSON.parse(json.toString());
};


/**
 * 订单确认(orderId和orderAliasCode参数不能同时为空)
 * @param orderId
 * @param orderAliasCode
 * @returns {*}
 */
OpenOrderService.confirmOrder = function (orderId, orderAliasCode) {
    var json = OpenOrderApi.OrderUpdateToConfirm.confirmOrder(orderId, orderAliasCode);
    return JSON.parse(json.toString());
};

/**
 * 订单确认收款
 * @param orderId
 * @param orderAliasCode
 * @param payInterfaceId
 * @param amount
 * @param tradeNo
 * @returns {*}
 */
OpenOrderService.payOrder = function (orderId, orderAliasCode, payRecs) {
    var jPayRecs = new OpenOrderApi.JSONArray(JSON.stringify(payRecs));
    var json = OpenOrderApi.OrderUpdateToPayed.doPayOrder(orderId, orderAliasCode, jPayRecs);
    return JSON.parse(json.toString());
};

/**
 * 订单确认收款
 * @param orderId
 * @param orderAliasCode
 * @param payRecs
 * @param config
 * @returns {*}
 */
OpenOrderService.payOrderEx = function (orderId, orderAliasCode, payRecs, config) {
    var jConfig = $.JSONObject(config);
    var jPayRecs = new OpenOrderApi.JSONArray(JSON.stringify(payRecs));
    var json = OpenOrderApi.OrderUpdateToPayed.doPayOrder(orderId, orderAliasCode, jPayRecs, jConfig);
    return JSON.parse(json.toString());
};

/**
 * 订单出库
 * @param orderId
 * @param orderAliasCode
 * @param logisticsId
 * @param waybill
 * @returns {*}
 */
OpenOrderService.shippedOrder = function (orderId, orderAliasCode, logisticsId, waybill) {
    var json = OpenOrderApi.OrderUpdateToShipped.shippedOrder(orderId, orderAliasCode, logisticsId, waybill);
    return JSON.parse(json.toString());
};

OpenOrderService.shippedOrderEx = function (orderId, orderAliasCode, logisticsId, waybill, config) {
    var jConfig = $.JSONObject(config);
    var json = OpenOrderApi.OrderUpdateToShipped.shippedOrder(orderId, orderAliasCode, logisticsId, waybill, jConfig);
    return JSON.parse(json.toString());
};

/**
 * 订单出库(无物流信息)
 * @param orderId
 * @param orderAliasCode
 * @returns {*}
 */
OpenOrderService.shippedOrderNoLogistics = function (orderId, orderAliasCode) {
    var json = OpenOrderApi.OrderUpdateToShipped.shippedOrder(orderId, orderAliasCode);
    return JSON.parse(json.toString());
};

OpenOrderService.shippedOrderNoLogisticsEx = function (orderId, orderAliasCode, config) {
    var jConfig = $.JSONObject(config);
    var json = OpenOrderApi.OrderUpdateToShipped.shippedOrder(orderId, orderAliasCode, jConfig);
    return JSON.parse(json.toString());
};

/**
 * 订单签收
 * @param orderId
 * @param orderAliasCode
 * @returns {*}
 */
OpenOrderService.signOrder = function (orderId, orderAliasCode) {
    var json = OpenOrderApi.OrderUpdateToSigned.signOrder(orderId, orderAliasCode);
    return JSON.parse(json.toString());
};

/**
 * 订单签收
 * @param orderId
 * @param orderAliasCode
 * @param config
 * @returns {*}
 */
OpenOrderService.signOrderEx = function (orderId, orderAliasCode, config) {
    var jConfig = $.JSONObject(config);
    var json = OpenOrderApi.OrderUpdateToSigned.signOrder(orderId, orderAliasCode, jConfig);
    return JSON.parse(json.toString());
};

/**
 * 修改订单为缺货状态,并设置item 缺货数量
 * @param orderId 订单内部号
 * @param orderAliasCode 订单外部号
 * @param items 缺货商品行
 * @returns {*}
 */
OpenOrderService.OrderUpdateToOutOfStock = function (orderId, orderAliasCode, items) {
    var jItems = new OpenOrderApi.JSONArray(JSON.stringify(items));
    var json = OpenOrderApi.OrderUpdateOutOfStock.updateOrderToOutOfStock(orderId, orderAliasCode, jItems);
    return JSON.parse(json.toString());
};

/**
 * 订单拒收
 * @param orderId 订单内部号
 * @param orderAliasCode 订单外部号
 * @returns {*}
 */
OpenOrderService.rejectedOrder = function (orderId, orderAliasCode, desc) {
    var json = OpenOrderApi.OrderUpdateToRejected.rejectedAllOrderItems(orderId, orderAliasCode, desc);
    return JSON.parse(json.toString());
};

/**
 * 订单拒收
 * @param order 原销售订单
 * @param rejectOrder 拒收订单
 * @returns {*}
 */
OpenOrderService.doRejectOrder = function (order, rejectOrder, desc) {
    if (!order || !rejectOrder) {
        return;
    }
    var jOrder = new OpenOrderApi.JSONObject(JSON.stringify(order));
    var jRejectOrder = new OpenOrderApi.JSONObject(JSON.stringify(rejectOrder));
    var json = OpenOrderApi.OrderUpdateToRejected.doRejectOrder(null, jOrder, jRejectOrder, desc);
    return JSON.parse(json.toString());
};

/**
 * 给订单加上一个不允许取消的标记（包括前台和后台取消）
 * @param orderId
 * @param orderAliasCode
 * @param operatorUserId
 * @returns {*}
 */
OpenOrderService.doUpdateCancelFlag = function (orderId, orderAliasCode, operatorUserId) {
    var json = OpenOrderApi.OrderUpdateToForbidCancel.doUpdateCancelFlag(orderId, orderAliasCode, operatorUserId);
    return JSON.parse(json.toString());
};




