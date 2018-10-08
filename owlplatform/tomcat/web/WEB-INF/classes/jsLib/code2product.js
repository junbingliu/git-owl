//#import Util.js

/**
 * 编码与商品关联关系的相关Api
 * @namespace
 */
var Code2ProductApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules
);

var Code2ProductService = {};

/**
 * 根据SKU的内部ID获取商品Id
 * @param skuId
 * @returns {*}
 */
Code2ProductService.getProductIdBySkuId = function (skuId) {
    var s = Code2ProductApi.IsoneModulesEngine.code2ProductService.getProductIdBySkuId(skuId);
    if (!s) {
        return null;
    }
    return s + "";
};

/**
 * 根据商家ID和SKU的外部编码获取商品Id
 * @param merchantId
 * @param realSkuId
 * @returns {*}
 */
Code2ProductService.getProductIdByRealSkuId = function (merchantId, realSkuId) {
    var s = Code2ProductApi.IsoneModulesEngine.code2ProductService.getProductIdByRealSkuId(merchantId, realSkuId);
    if (!s) {
        return null;
    }
    return s + "";
};

/**
 * 根据商家ID和SKU的条形码获取商品Id
 * @param merchantId
 * @param barcode
 * @returns {*}
 */
Code2ProductService.getProductIdByBarcode = function (merchantId, barcode) {
    var s = Code2ProductApi.IsoneModulesEngine.code2ProductService.getProductIdByBarcode(merchantId, barcode);
    if (!s) {
        return null;
    }
    return s + "";
};

/**
 * 根据商家ID和SKU的外部编码获取已删除的商品Id
 * @param merchantId
 * @param realSkuId
 * @returns {*}
 */
Code2ProductService.getDeletedProductIdByRealSkuId = function (merchantId, realSkuId) {
    var s = Code2ProductApi.IsoneProductEngine.normalCode2DeletedProductService.getProductIdByRealSkuId(merchantId, realSkuId);
    if (!s) {
        return null;
    }
    return s + "";
};

/**
 * 根据商家ID和SKU的条形码获取已删除的商品Id
 * @param merchantId
 * @param barcode
 * @returns {*}
 */
Code2ProductService.getDeletedProductIdByBarcode = function (merchantId, barcode) {
    var s = Code2ProductApi.IsoneProductEngine.normalCode2DeletedProductService.getProductIdByBarcode(merchantId, barcode);
    if (!s) {
        return null;
    }
    return s + "";
};
