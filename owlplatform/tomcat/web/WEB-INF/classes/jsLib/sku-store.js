//#import Util.js

var SkuStoreApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.price
);

/**
 * @constructor
 * @type {Object}
 */
var SkuStoreService = {};

/**
 * 添加仓库
 * @param skuStore
 * @param merchantId
 * @param createUserId
 * @returns {string}
 */
SkuStoreService.addSkuStore = function (skuStore, merchantId, createUserId) {
    var jSkuStore = $.toJavaJSONObject(skuStore);
    var s = SkuStoreApi.IsoneProductEngine.normalPSkuStoreService.addSkuStore(jSkuStore, merchantId, createUserId);
    return s + "";
};

/**
 * 修改仓库
 * @param skuStore
 */
SkuStoreService.updateSkuStore = function (skuStore) {
    var jSkuStore = $.toJavaJSONObject(skuStore);
    return SkuStoreApi.IsoneProductEngine.normalPSkuStoreService.updateSkuStore(jSkuStore);
};

/**
 * 获得一个仓库
 * @param id
 * @returns {*}
 */
SkuStoreService.getSkuStore = function (id) {
    var json = SkuStoreApi.IsoneProductEngine.normalPSkuStoreService.getSkuStore(id);
    if (json) {
        return JSON.parse(json.toString());
    }
    return null;
};

/**
 * 删除仓库
 * @param id
 */
SkuStoreService.deleteSkuStore = function (id) {
    return SkuStoreApi.IsoneProductEngine.normalPSkuStoreService.deleteSkuStore(id);
};

/**
 * 获得仓库数量
 * @param merchantId
 */
SkuStoreService.getSkuStoreListSize = function (merchantId) {
    return SkuStoreApi.IsoneProductEngine.normalPSkuStoreService.getSkuStoreListSize(merchantId);
};

/**
 * 获得仓库列表
 * @param merchantId
 * @param start
 * @param limit
 * @returns {*}
 */
SkuStoreService.getSkuStores = function (merchantId, start, limit) {
    var json = SkuStoreApi.IsoneProductEngine.normalPSkuStoreService.getSkuStores(merchantId, start, limit);
    return JSON.parse(json);
};


