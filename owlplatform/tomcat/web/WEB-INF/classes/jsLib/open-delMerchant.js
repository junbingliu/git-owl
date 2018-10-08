var OpenDelMerchantApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.open.logistics
);

/**
 * @constructor
 * @type {Object}
 */
var OpenDelMerchantService = {};

/**
 * 获取平台的配送商
 * @param searchArgs
 * @returns {*}
 */
OpenDelMerchantService.getPlatformDelMerchants = function (searchArgs) {
    var jParams = $.JSONObject(searchArgs);
    var json = OpenDelMerchantApi.PlatformDelMerchantSearch.getPlatformDelMerchants(jParams);
    return JSON.parse(json.toString());
};

/**
 * 添加商家配送商
 * @param jParamInfo
 * @returns {*}
 */
OpenDelMerchantService.addDelMerchant = function (jParamInfo) {
    var jParams = $.JSONObject(jParamInfo);
    var json = OpenDelMerchantApi.DelMerchantAdd.addDelMerchant(jParams);
    return JSON.parse(json.toString());
};

/**
 * 删除商家配送商
 * @param jParamInfo
 * @returns {*}
 */
OpenDelMerchantService.deleteDelMerchant = function (jParamInfo) {
    var jParams = $.JSONObject(jParamInfo);
    var json = OpenDelMerchantApi.DelMerchantDelete.deleteDelMerchant(jParams);
    return JSON.parse(json.toString());
};

