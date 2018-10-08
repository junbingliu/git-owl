var OrderTrackingInfoApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.IsoneModulesEngine
);

/**
 * @constructor
 * @type {Object}
 */
var OrderTrackingInfoService = {
    getTrackingInfoByAliasCodeAndWayBillNo: function (aliasCode, wayBillNo) {
        if (!aliasCode || !wayBillNo) {
            return null;
        }
        var json = OrderTrackingInfoApi.IsoneModulesEngine.orderTrackingInfoService.getTrackingInfoByAliasCodeAndWayBillNo(aliasCode, wayBillNo);
        if (!json) {
            return null;
        }
        return JSON.parse(json.toString());
    },
    saveTrackingInfoByAliasCodeAndWayBillNo: function (orderId, wayBillNo, jLogisticsInfo) {
        OrderTrackingInfoApi.IsoneModulesEngine.orderTrackingInfoService.saveTrackingInfoByAliasCodeAndWayBillNo(orderId, wayBillNo, $.JSONObject(jLogisticsInfo));
    }

};


