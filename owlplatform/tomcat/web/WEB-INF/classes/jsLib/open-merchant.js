var OpenMerchantApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.open.merchant
);

/**
 * @constructor
 * @type {Object}
 */
var OpenMerchantService = {};

/**
 * 添加商家
 * @param merchantInfo
 * @param config
 * @returns {*}
 * @constructor
 */
OpenMerchantService.addMerchant = function (merchantInfo, config) {
    var jMerchantInfo = $.JSONObject(merchantInfo);
    var jConfig = null;
    if (config) {
        jConfig = $.JSONObject(config);
    }
    var json = OpenMerchantApi.MerchantAdd.addMerchant(jMerchantInfo, jConfig);
    return JSON.parse(json.toString());
};

/**
 * 检索商家信息
 * @param searchArgs
 * @returns {*}
 */
OpenMerchantService.getMerchants = function (searchArgs) {
    var jParams = $.JSONObject(searchArgs);
    var json = OpenMerchantApi.MerchantSearch.getMerchants(jParams);
    return JSON.parse(json.toString());
};







