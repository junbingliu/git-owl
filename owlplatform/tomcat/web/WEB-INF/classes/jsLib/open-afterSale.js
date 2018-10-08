var OpenAfterSaleApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules.order.afterservice.tools,
    Packages.net.xinshi.isone.open.returnorder,
    Packages.net.xinshi.isone.open.refundorder
);

/**
 * @constructor
 * @type {Object}
 */
var OpenAfterSaleService = {};


/**
 * 售后订单搜索
 * @param searchArgs
 * @returns {*}
 */
OpenAfterSaleService.getOrders = function (searchArgs) {
    var jParams = $.JSONObject(searchArgs);
    var json = OpenAfterSaleApi.ReturnOrderSearch.getReturnOrders(jParams);
    return JSON.parse(json.toString());
};

/**
 * 添加退货单
 * @param merchantId
 * @param returnOrderInfo
 * @param config
 * @returns {*}
 */
OpenAfterSaleService.addReturnOrder = function (merchantId, returnOrderInfo, config) {
    var jReturnOrderInfo = $.JSONObject(returnOrderInfo);
    var jConfig = $.JSONObject(config);
    var json = OpenAfterSaleApi.ReturnOrderAdd.addReturnOrder(merchantId, jReturnOrderInfo, jConfig);
    return JSON.parse(json.toString());
};


/**
 * 添加退款单
 * @param merchantId
 * @param refundOrderInfo
 * @param config
 * @returns {*}
 */
OpenAfterSaleService.addRefundOrder = function (merchantId, refundOrderInfo, config) {
    var jRefundOrderInfo = $.JSONObject(refundOrderInfo);
    var jConfig = $.JSONObject(config);
    var json = OpenAfterSaleApi.RefundOrderAdd.addRefundOrder(merchantId, jRefundOrderInfo, jConfig);
    return JSON.parse(json.toString());
};

/**
 * 修改退货单的客户寄回配送单信息
 * @param returnOrderId
 * @param logisticName
 * @param waybill
 * @param modifyUserId
 * @returns {*}
 */
OpenAfterSaleService.updateReturnOrderReturnDeliveryInfo = function (returnOrderId, logisticName, waybill, modifyUserId) {
    var json = OpenAfterSaleApi.ReturnOrderUpdateUtil.updateReturnDeliveryInfo(returnOrderId, logisticName, waybill, modifyUserId);
    return JSON.parse(json.toString());
};

/**
 * 修改换货单的客户寄回配送单信息
 * @param returnOrderId
 * @param logisticName
 * @param waybill
 * @param modifyUserId
 * @returns {*}
 */
OpenAfterSaleService.updateBarterOrderReturnDeliveryInfo = function (returnOrderId, logisticName, waybill, modifyUserId) {
    var json = OpenAfterSaleApi.BarterOrderUpdateUtil.updateReturnDeliveryInfo(returnOrderId, logisticName, waybill, modifyUserId);
    return JSON.parse(json.toString());
};





