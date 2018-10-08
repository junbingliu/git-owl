var PreSaleServiceApi = new JavaImporter(
    Packages.org.json,
    net.xinshi.isone.modules.price.PreSalePriceUtil
);

var PreSaleService = {};

/**
 * 根据商品ID获取预售规则
 * @param ruleId
 * @returns {*}
 */
PreSaleService.getPreSaleRuleById = function (ruleId) {
    if (!ruleId) {
        return null;
    }
    var jRule = PreSaleServiceApi.PreSalePriceUtil.getPreSaleRuleById(ruleId);
    if (jRule) {
        return JSON.parse(jRule + "");
    } else {
        return null;
    }
};

/**
 * 根据商品ID获取预售规则
 * @param productId
 * @returns {*}
 */
PreSaleService.getProductPreSaleRule = function (productId) {
    if (!productId) {
        return null;
    }
    var jRule = PreSaleServiceApi.PreSalePriceUtil.getPreSaleRule(productId);
    if (jRule) {
        return JSON.parse(jRule + "");
    } else {
        return null;
    }
};
/**
 *  取定金
 * @param jRule
 * @returns {*}
 */
PreSaleService.getDepositPrice = function (jRule) {
    if (!jRule) {
        return null;
    }
    var javaObj = $.JSONObject(jRule);
    return PreSaleServiceApi.PreSalePriceUtil.getDepositPrice(javaObj) + "";
};
/**
 * 取尾款
 * @param jRule
 * @param productId
 * @returns {*}
 */
PreSaleService.getBalancePrice = function (jRule, productId) {
    if (!jRule || !productId) {
        return null;
    }
    var javaObj = $.JSONObject(jRule);
    return PreSaleServiceApi.PreSalePriceUtil.getBalancePrice(javaObj, productId) + "";
};
/**
 * 取预售价(定金+尾款)
 * @param jRule
 * @param productId
 * @returns {*}
 */
PreSaleService.getTotalPrice = function (jRule, productId) {
    if (!jRule || !productId) {
        return null;
    }
    var javaObj = $.JSONObject(jRule);
    return PreSaleServiceApi.PreSalePriceUtil.getTotalPrice(javaObj, productId) + "";
};
/**
 * 获取尾款范围
 * @param bookAmount
 * @param scopes
 * @returns {*}
 */
PreSaleService.getCurrentScope = function (bookAmount, scopes) {
    if (!bookAmount || !scopes) {
        return null;
    }
    var javaObj = PreSaleServiceApi.JSONArray(JSON.stringify(scopes));
    return $.java2Javascript(PreSaleServiceApi.PreSalePriceUtil.getCurrentScope(bookAmount, javaObj));
};
/**
 * 获取预定人数
 * @param productId
 * @returns {*}
 */
PreSaleService.getBookAmount = function (productId) {
    if (!productId) {
        return null;
    }
    return PreSaleServiceApi.PreSalePriceUtil.getBookAmount(productId) + "";
};
/**
 * 获取支付状态
 * @param orderAliasCode
 * @returns {*}
 */
PreSaleService.getPreSalePayState = function (orderAliasCode) {
    if (!orderAliasCode) {
        return null;
    }
    return PreSaleServiceApi.PreSalePriceUtil.getPreSalePayState(orderAliasCode) + "";
};
/**
 * 是否已付定金
 * @param orderAliasCode
 * @returns {*}
 */
PreSaleService.isPayDeposit = function (orderAliasCode) {
    if (!orderAliasCode) {
        return null;
    }
    return PreSaleServiceApi.PreSalePriceUtil.isPayDeposit(orderAliasCode);
};
/**
 * 是否已付尾款
 * @param orderAliasCode
 * @returns {*}
 */
PreSaleService.isPayBalance = function (orderAliasCode) {
    if (!orderAliasCode) {
        return null;
    }
    return PreSaleServiceApi.PreSalePriceUtil.isPayBalance(orderAliasCode);
};