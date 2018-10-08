var OpenBusinessRuleApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.open.businessrule
);

/**
 * @constructor
 * @type {Object}
 */
var OpenBusinessRuleService = {};

/**
 * 添加优惠规则到当前方案
 * @param paramInfo
 * @returns {*}
 */
OpenBusinessRuleService.addRule = function (paramInfo) {
    var jParams = $.JSONObject(paramInfo);
    var json = OpenBusinessRuleApi.BusinessRuleAdd.addRule(jParams);
    return JSON.parse(json.toString());
};

/**
 * 从当前应用的方案中删除规则
 * @param paramInfo
 * @returns {*}
 */
OpenBusinessRuleService.deleteRule = function (paramInfo) {
    var jParams = $.JSONObject(paramInfo);
    var json = OpenBusinessRuleApi.BusinessRuleDelete.deleteRule(jParams);
    return JSON.parse(json.toString());
};

/**
 * 检查ERP促销调价单的应用状态
 * @param paramInfo
 * @returns {*}
 */
OpenBusinessRuleService.checkErpPromotionUseState = function (paramInfo) {
    var jParams = $.JSONObject(paramInfo);
    var json = OpenBusinessRuleApi.ErpPromotionUseStateCheck.checkUseState(jParams);
    return JSON.parse(json.toString());
};


