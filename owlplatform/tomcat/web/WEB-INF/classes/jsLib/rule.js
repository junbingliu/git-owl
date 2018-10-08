var RuleApi = new JavaImporter(
    Packages.org.json,
    Packages.java.util,
    Packages.net.xinshi.isone.modules.businessruleEx.RuleUtil,
    Packages.net.xinshi.isone.modules.businessruleEx.IsoneBusinessRuleEngineEx,
    Packages.net.xinshi.isone.modules.product
);

var RuleService = {

    saveRule: function (merchantId, sheetId, ruleValue, ruleType) {
        var ruleValueStr = JSON.stringify(ruleValue);
        var jResult = RuleApi.RuleUtil.saveRule(merchantId, sheetId, ruleValueStr, ruleType);
        return JSON.parse(jResult.toString());
    },
    /**
     * 根据ID获取优惠规则
     * @param ruleId
     * @returns {null}
     */
    getRule: function (ruleId) {
        if (!ruleId) {
            return null;
        }
        return $.java2Javascript(RuleApi.IsoneBusinessRuleEngineEx.ruleService.getRule(ruleId));
    },
    /**
     * 商品所属分类是否属于某个规则内
     * @param productId
     * @param rule
     * @returns {null}
     */
    checkForIncludedCategories: function (productId, rule) {
        if (!productId || !rule) {
            return false;
        }
        productId = productId + "";
        var includedCategories = rule.includedCategories;
        if (includedCategories == null || includedCategories.length == 0) {
            return false;
        }
        var jColIds = RuleApi.ProductUtil.getColumnIds(productId);
        if (!jColIds) {
            return false;
        }
        var colIds = $.java2Javascript(jColIds);

        for (var i = 0; i < includedCategories.length; i++) {
            var isOk = true;
            var cols = includedCategories[i];
            if (!cols) {
                continue;
            }
            for (var j = 0; j < cols.length; j++) {
                var c = cols[j];
                if (colIds.indexOf(c.id) == -1) {
                    isOk = false;
                    break;
                }
            }
            if (isOk) return true;
        }
        return false;
    },
    /**
     * 商品是否属于某个规则内
     * @param productId
     * @param rule
     * @returns {boolean}
     */
    checkForIncludedProducts: function (productId, rule) {
        if (!productId || !rule) {
            return false;
        }
        var includedProducts = rule.includedProducts;
        for (var i = 0; i < includedProducts.length; i++) {
            var product = includedProducts[i];
            if (product.id === productId) {
                return true;
            }
        }
        return false;
    }
};