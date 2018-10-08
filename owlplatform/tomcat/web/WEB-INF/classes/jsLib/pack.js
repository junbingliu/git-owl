/**
 * @namespace
 */
var PackService = {};
var PackApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules.order
);


/**
 * 根据订单id获取包裹单列表
 * @param orderId
 * @returns {*}
 */
PackService.getPackOrderListByOrderId = function (orderId) {
    var result = PackApi.PackOrderUtil.getPackOrderListByOrderId(orderId);
    return JSON.parse(result.toString());
}

/**
 * 根据订单对象获取包裹单列表
 * @param order
 * @returns {*}
 */
PackService.getPackOrderListByOrder = function (order) {
    var jOrder = new PackApi.JSONObject(order)
    var result = PackApi.PackOrderUtil.getPackOrderListByOrder(jOrder);
    return JSON.parse(result.toString());
}