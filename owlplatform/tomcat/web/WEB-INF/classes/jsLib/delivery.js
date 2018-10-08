var DeliveryApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.delivery,
    Packages.net.xinshi.isone.base,
    Packages.net.xinshi.isone.modules.price,
    Packages.net.xinshi.isone.modules.deliveryPoint,
    Packages.java.util,
    net.xinshi.isone.modules.businessruleEx.plan,
    net.xinshi.isone.modules.order.bean
);

/**
 * 配送方式的相关方法
 * @namespace
 * @type {Object}
 */
var DeliveryService = {

    /**
     * 获得某个商家的所有配送规则
     * @param mid
     */
    getDeliveryRules: function (mid) {
        var deliveryRules = DeliveryApi.IsoneModulesEngine.deliveryService.listDeliveryRules(mid, 0, -1);
        return JSON.parse("" + deliveryRules.toString());
    },

    addDeliveryRule: function (deliveryRuleToSave, mid) {
        var jRule = $.JSONObject(deliveryRuleToSave);
        return "" + DeliveryApi.IsoneModulesEngine.deliveryService.addDeliveryRule(jRule, mid);
    },

    updateDeliveryRule: function (rule) {
        var jRule = $.JSONObject(rule);
        return "" + DeliveryApi.IsoneModulesEngine.deliveryService.updateDeliveryRule(jRule);
    },

    /**
     * 获得某个商家在某个地区的所有的支持的配送方式。
     * 返回deliveryRules代表的是已经通过配送规则计算后得到的最后的配送费用。
     * @param merchantId
     * @param regionId
     * @param orderType
     * @param totalProductPrice
     * @param totalWeight
     * @param totalVolume
     * @return [rules]
     */
    getAllValidDeliveryRuleByOrderType: function (merchantId, regionId, orderType, totalProductPrice, totalWeight, totalVolume) {
        var ctx = {
            totalProductPrice: totalProductPrice,
            totalWeight: totalWeight,
            totalVolume: totalVolume
        };

        var jctx = new DeliveryApi.JSONObject(JSON.stringify(ctx));
        var deliveryRules = DeliveryApi.DeliveryUtil.getAllValidDeliveryRuleByOrderType(merchantId, regionId, orderType, jctx);
        return JSON.parse("" + deliveryRules.toString());
    },
    getAllValidDeliveryRuleByProductsAndOrderTypeV3: function (merchantId, regionId, orderType, productIds, totalProductPrice, totalWeight, totalVolume) {
        var productIdList = new DeliveryApi.ArrayList();
        if (productIds && productIds.length > 0) {
            for (var i = 0; i < productIds.length; i++) {
                productIdList.add(productIds[i]);
            }
        }
        var deliveryRules = DeliveryApi.DeliveryUtil.getAllValidDeliveryRuleByProductsAndOrderTypeV3(merchantId, regionId, orderType, productIdList, totalWeight, totalVolume, totalProductPrice);
        return JSON.parse("" + deliveryRules.toString());
    },
    /**
     * 获得所有的配送方式，只应该在总部调用这个方法。
     * @returns {*}
     */
    getAllDeliveryWays: function () {
        var deliveryWays = DeliveryApi.IsoneModulesEngine.deliveryService.getDeliveryWayObjects();
        return JSON.parse("" + deliveryWays.toString());
    },


    /**
     * 获得某个地区的的自提点
     *@param columnId 自提点栏目ID
     *@param merchantId  商家Id
     *@return [json]
     */
    getDeliveryPointList: function (columnId, merchantId) {
        var iSortList = DeliveryApi.IsoneModulesEngine.deliveryPointService.getDeliveryPointList(columnId, merchantId);
        var sortList = iSortList.getRange(0, -1);
        var jDeliveryPointList = DeliveryApi.IsoneModulesEngine.deliveryPointService.getListData(sortList, true);
        if (!jDeliveryPointList) {
            return null;
        }
        return JSON.parse(jDeliveryPointList.toString());
    },

    /**
     * 获得自提点
     * @param deliveryPointId
     * @returns {null}
     */
    getDeliveryPoint: function (deliveryPointId) {
        var json = DeliveryApi.IsoneModulesEngine.deliveryPointService.getDeliveryPoint(deliveryPointId);
        if(!json){
            return null;
        }
        return JSON.parse(json.toString());
    },

    /**
     * 获取某个地区的自提点（有做自提点的相关状态验证的）
     * @param merchantId
     * @param regionId
     * @returns {json}
     */
    getDeliveryPointByRegionId: function (merchantId, regionId) {
        var pointList = DeliveryApi.DeliveryPointUtil.getDeliveryPointByRegionId(merchantId, regionId);
        if(!pointList){
            return [];
        }
        return JSON.parse(pointList.toString());
    },
    /**
     * 获得某个商家的可用的配送商
     *@param merchantId  商家Id
     *@return [json]
     */
    getDelMerchants: function (merchantId) {
        var recordList = DeliveryApi.IsoneModulesEngine.delMerchantService.getDelMerchants(merchantId);
        if (!recordList) {
            return null;
        }
        return JSON.parse(recordList.toString());
    },
    /**
     * 根据配送方式获取所有的配送规则
     *@param merchantId  商家Id
     *@param regionId  商家Id
     *@param delMerchantId  商家Id
     *@return [json]
     */
    getDeliveryRuleByDelMerchant: function (merchantId, regionId, delMerchantId) {
        var recordList = DeliveryApi.DeliveryUtil.getDeliveryRuleByDelMerchant(merchantId, regionId, delMerchantId);
        if (!recordList) {
            return null;
        }
        return JSON.parse(recordList.toString());
    },
    /**
     * 根据配送规则ID获得配送规则
     * @param deliveryRuleId
     * @returns {*}
     */
    getDeliveryRule: function (deliveryRuleId) {
        var json = DeliveryApi.IsoneModulesEngine.deliveryService.getDeliveryRule(deliveryRuleId);
        if (!json) {
            return null;
        }
        return JSON.parse(json.toString());
    },
    /**
     * 判断商品分类是不是包含在配送规则里
     *@param columns  商品分类列表
     *@param jDeliveryRule  配送规则
     *@return boolean
     */
    checkForIncludedCategories: function (columns, jDeliveryRule) {
        if (!columns || !jDeliveryRule) {
            return false;
        }
        jDeliveryRule = new DeliveryApi.JSONObject(JSON.stringify(jDeliveryRule));
        var result = new DeliveryApi.ArrayList();
        if (columns && columns.length > 0) {
            for (var i = 0; i < columns.length; i++) {
                result.add(columns[i]);
            }
        }
        return DeliveryApi.DeliveryUtil.checkForIncludedCategories(result, jDeliveryRule) + "";
    },
    /**
     * 判断商品分类是不是在配送规则不本着的规则里
     *@param columns  商品分类列表
     *@param jDeliveryRule  配送规则
     *@return boolean
     */
    checkForExcludedCategories: function (columns, jDeliveryRule) {
        if (!columns || !jDeliveryRule) {
            return false;
        }
        jDeliveryRule = new DeliveryApi.JSONObject(JSON.stringify(jDeliveryRule));
        var result = new DeliveryApi.ArrayList();
        if (columns && columns.length > 0) {
            for (var i = 0; i < columns.length; i++) {
                result.add(columns[i]);
            }
        }
        return DeliveryApi.DeliveryUtil.checkForExcludedCategories(columns, jDeliveryRule) + "";
    },
    /**
     * 根据商品对象获得适用于该商品的最低价的配送规则
     * @param product
     * @param regionId
     * @param includeDP
     * @returns {*}
     */
    getDeliveryRuleByProduct: function (product, regionId, includeDP) {
        var jProduct = $.JSONObject(product);
        var json = DeliveryApi.DeliveryUtil.getDeliveryRuleByProduct(jProduct, regionId, includeDP);
        if (!json) {
            return null;
        }
        return JSON.parse(json.toString());
    }
};