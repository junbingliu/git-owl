//#import Util.js

var ViewHistoryApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.product
);

/**
 * @constructor
 * @type {Object}
 */
var ViewHistoryService = {};

/**
 * 添加最近商品浏览记录
 */
ViewHistoryService.addProductViewHistory = function () {
    ViewHistoryApi.ProductViewHistoryUtil.addProductViewHistory(request, response);
};

/**
 * 清空最近的商品浏览记录
 */
ViewHistoryService.removeProductViewHistory = function () {
    ViewHistoryApi.ProductViewHistoryUtil.removeProductViewHistory(request, response);
};

/**
 * 获得商品的最近浏览记录
 * @param number : 显示商品数量（最大为10）
 */
ViewHistoryService.getProductViewHistory = function (number) {
    var json = ViewHistoryApi.ProductViewHistoryUtil.getProductViewHistory(request, number);
    return JSON.parse(json.toString());
};





