var OpenApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.open.product
);

/**
 * @constructor
 * @type {Object}
 */
var OpenService = {};

/**
 * 批量添加SKU
 * @param skus
 * @returns {*}
 */
OpenService.batchAddSku = function (skus) {
    var json = OpenApi.SkuBatchAdd.batchAddSku(skus);
    return JSON.parse(json.toString());
};

/**
 * 批量添加或者修改SKU
 * @param skus
 * @returns {*}
 */
OpenService.batchAddOrUpdateSku = function (skus) {
    var json = OpenApi.SkuBatchAdd.batchAddOrUpdateSku(skus);
    return JSON.parse(json.toString());
};

/**
 * 修改SKU的可卖数
 * @param paramInfo
 * @returns {*}
 */
OpenService.updateSkuSellableCount = function (paramInfo) {
    var jParams = $.JSONObject(paramInfo);
    var json = OpenApi.SkuUpdateQuantity.updateSkuSellableCount(jParams);
    return JSON.parse(json.toString());
};

/**
 * 修改SKU的价格
 * @param paramInfo
 * @returns {*}
 */
OpenService.updateSkuPrice = function (paramInfo) {
    var jParams = $.JSONObject(paramInfo);
    var json = OpenApi.SkuUpdatePrice.updateSkuPrice(jParams);
    return JSON.parse(json.toString());
};



