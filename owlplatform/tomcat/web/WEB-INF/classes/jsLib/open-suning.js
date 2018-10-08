var SuNingOrderUtilApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.open.order,
    Packages.net.xinshi.thirdinterface.suning
);

/**
 * @constructor
 * @type {Object}
 */
var SuNingOrderUtilService = {};

/**
 * 同步出库状态到苏宁
 * @param orderAliasCode
 * @returns {*}
 */
SuNingOrderUtilService.doUploadOrderShipped = function (appKey,appSecret,orderAliasCode,expressCompanyCode,deliveryPerName,deliveryPerPhone) {
    var json = SuNingOrderUtilApi.SuNingOrderUtil.doUploadOrderShipped(appKey,appSecret,orderAliasCode,expressCompanyCode,deliveryPerName,deliveryPerPhone);
    return JSON.parse(json.toString());
};

