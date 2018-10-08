//#import Util.js

var ProductNotifyApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.product.impl
);

/**
 * @constructor
 * @type {Object}
 */
var ProductNotifyService = {};


/**
 * 获得到货通知
 * @param objId
 * @param start
 * @param limit
 * @returns {*}
 */
ProductNotifyService.getProductNotifyList = function (objId, start, limit) {
    var iSortList = ProductNotifyApi.IsoneProductEngine.productNotifyService.getList(objId);
    var size = iSortList.getSize();
    var sortList = iSortList.getRange(start, limit);

    var recordList = ProductNotifyApi.IsoneProductEngine.productNotifyService.getListData(sortList, false);
    var result = {};
    result.total = size;
    result.recordList = JSON.parse(recordList.toString());
    return result;
};

/**
 * 删除到货通知
 * @param notifyId
 */
ProductNotifyService.deleteProductNotify = function (notifyId) {
    ProductNotifyApi.IsoneProductEngine.productNotifyService.deleteProductNotify(notifyId);
};

/**
 * 获得到货通知
 * @param notifyId
 * @returns {*}
 */
ProductNotifyService.getProductNotify = function (notifyId) {
    if (!notifyId) {
        return null;
    }
    var json = ProductNotifyApi.IsoneProductEngine.productNotifyService.getProductNotify(notifyId);
    if (!json) {
        return null;
    }
    return JSON.parse(json.toString());
};
