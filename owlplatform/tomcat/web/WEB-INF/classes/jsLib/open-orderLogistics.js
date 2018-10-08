var OpenOrderLogisticsApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules.orderlogistics
);

/**
 * @constructor
 * @type {Object}
 */
var OpenOrderLogisticsService = {};

/**
 * 保存订单的物流信息（以订单为单位）
 * @param orderId
 * @param log
 * @returns {*}
 */
OpenOrderLogisticsService.updateOrderLogistics = function (orderId, log) {
    var jLog = $.JSONObject(log);
    OpenOrderLogisticsApi.OrderLogisticUtil.updateOrderLogistics(orderId, jLog);
};

/**
 * 保留订单对应商品行的物流信息（以商品行为单位）
 * @param orderId
 * @param itemId
 * @param log
 */
OpenOrderLogisticsService.updateItemLogistics = function (orderId, itemId, log) {
    var jLog = $.JSONObject(log);
    OpenOrderLogisticsApi.OrderLogisticUtil.updateItemLogistics(orderId, itemId, jLog);
};

/**
 * 获得订单的所有物流信息，包括商品行的
 * @param orderId
 * @returns {*}
 */
OpenOrderLogisticsService.getLogistics = function (orderId) {
    var json = OpenOrderLogisticsApi.OrderLogisticUtil.getLogistics(orderId);
    if(json){
        return JSON.parse(json);
    }
    return null;
};

