var ErpApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.interaction.service
);

/**
 * @constructor
 * @type {Object}
 */
var ErpService = {};

/**
 * 根据b2c订单，整理为对接erp的订单数据
 * @param order
 * @returns {*}
 */
ErpService.addFieldIntoOrder = function (order) {
    if (typeof(order) === "undefined") {
        return null;
    }
    var jOrder = new ErpApi.JSONObject(JSON.stringify(order));
    var json = ErpApi.IsoneInteractionEngine.interactionService.addFieldIntoOrder(jOrder);
    if (typeof(json) === "undefined") {
        return null;
    }
    return JSON.parse(json.toString());
};

/**
 * 获取对接的售后退货单数据
 * @param returnOrder
 * @returns {*}
 */
ErpService.modifyReturnInfo = function (returnOrder) {
    if (typeof(returnOrder) === "undefined") {
        return null;
    }
    var jReturnOrder = new ErpApi.JSONObject(JSON.stringify(returnOrder));
    var json = ErpApi.IsoneInteractionEngine.interactionService.modifyReturnInfo(jReturnOrder);
    if (typeof(json) === "undefined") {
        return null;
    }
    return JSON.parse(json.toString());
};


/**
 * 获取对接的退款单数据
 * @param returnOrder
 * @returns {*}
 */
ErpService.modifyRefundDocInfo = function (refundOrder) {
    if (typeof(refundOrder) === "undefined") {
        return null;
    }
    var jRefundOrder = new ErpApi.JSONObject(JSON.stringify(refundOrder));
    var json = ErpApi.IsoneInteractionEngine.interactionService.modifyRefundDocInfo(jRefundOrder);
    if (typeof(json) === "undefined") {
        return null;
    }
    return JSON.parse(json.toString());
};

/**
 * 提交参数对接ERP系统，并返回JSON格式结果
 * @param url   对接的地址
 * @param exchangeOrders   对接的订单
 * @param acId   erp账套
 * @returns {*}
 */
ErpService.sendURL = function (url, exchangeOrders, acId, params) {
    if (!url || !exchangeOrders || !acId || !params) {
        return null;
    }
    exchangeOrders = new ErpApi.JSONArray(JSON.stringify(exchangeOrders));
    var sendResult = ErpApi.InteractionUtils.sendURL(url, exchangeOrders, acId, params);
    if (!sendResult) {
        return null;
    }
    sendResult = new ErpApi.JSONObject(sendResult);
    return JSON.parse(sendResult);
};