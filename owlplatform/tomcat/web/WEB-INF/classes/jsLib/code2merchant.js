//#import Util.js

/**
 * 编码与商家关联关系的相关Api
 * @namespace
 */
var Code2MerchantApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules
);

var Code2MerchantService = {};

/**
 * 根据编码获取商家ID
 * @param code
 * @returns {*}
 */
Code2MerchantService.getMerchantIdByMerchantCode = function (code) {
    if(!code){
        return null;
    }
    var s = Code2MerchantApi.IsoneModulesEngine.code2MerchantService.getMerchantIdByMerchantCode(code);
    if (!s) {
        return null;
    }
    return s + "";
};

/**
 * 保存编码与商家ID的关联关系
 * @param merchantId
 * @param code
 * @returns {*}
 */
Code2MerchantService.saveMerchantCode2MerchantId = function (merchantId, code) {
    if(!merchantId || !code){
        return;
    }
    Code2MerchantApi.IsoneModulesEngine.code2MerchantService.saveMerchantCode2MerchantId(merchantId, code);
};

/**
 * 删除编码与商家的关联关系
 * @param merchantId
 * @param code
 * @returns {*}
 */
Code2MerchantService.resetMerchantCode2MerchantId = function (merchantId, code) {
    var s = Code2MerchantApi.IsoneModulesEngine.code2MerchantService.resetMerchantCode2MerchantId(merchantId, code);
    if (!s) {
        return null;
    }
    return s + "";
};
/**
 * 根据商家名称获取商家ID
 * @param merchantName
 * @returns {*}
 */
Code2MerchantService.getMerchantIdByMerchantName= function (merchantName) {
    if(!merchantName){
        return null;
    }
    var s = Code2MerchantApi.IsoneModulesEngine.code2MerchantService.getMerchantIdByNameCn(merchantName);
    if (!s) {
        return null;
    }
    return s + "";
};
