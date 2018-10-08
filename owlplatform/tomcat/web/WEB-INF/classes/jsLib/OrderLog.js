var OrderLogApi = new JavaImporter(
    Packages.org.json,
    net.xinshi.isone.modules.order.OrderUpdateLogHelper
);

var OrderLogService = {
    addOrderLog: function (orderId, jLog, logTypeName) {
        if (!orderId || !jLog || !logTypeName) {
            return;
        }
        var javaObj = $.JSONObject(jLog);
        OrderLogApi.OrderUpdateLogHelper.addOrderLog(orderId, javaObj, logTypeName);
    },
    /**
     * 增加订单错误日志
     * @param orderId 订单内部ID
     * @param userId 修改人
     * @param logDesc 日志描述
     */
    addErrorLog: function (orderId, userId, logDesc) {
        if (!orderId && !userId && !logDesc) {
            return;
        }
        OrderLogApi.OrderUpdateLogHelper.addErrorLog(orderId, userId, logDesc);
    },
    /**
     * 获取订单日志
     * @param orderId 订单内部ID
     * @param logTypeName 日志类型名称
     * @param start 开始数量
     * @param limit 取多少条,-1表示取所有
     * @returns {*}
     */
    getOrderLog: function (orderId, logTypeName,start,limit) {
        if (!orderId || !logTypeName ) {
            return;
        }
        return JSON.parse(OrderLogApi.OrderUpdateLogHelper.getOrderLog(orderId, logTypeName,start,limit) + "");
    }
};