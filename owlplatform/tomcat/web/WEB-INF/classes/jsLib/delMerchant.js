var DelMerchantApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.delivery,
    Packages.net.xinshi.isone.base,
    Packages.java.util
);

/**
 * 配送商的相关方法
 * @namespace
 * @type {Object}
 */
var DelMerchantService = {
    /**
     * 根据ID获取平台配送商对象
     * @param id
     * @returns {*}
     */
    getPlatformDelMerchant: function (id) {
        if (!id) {
            return null;
        }
        var javaResult = DelMerchantApi.IsoneModulesEngine.flatformDelMerchantService.getDeliveryMerchant(id);
        if (!javaResult) {
            return null;
        }
        return JSON.parse(javaResult + "");
    },
    /**
     * 根据商家配送商ID获取商家配送商对象
     * @param delMerchantId
     * @returns {*}
     */
    getDelMerchant: function (delMerchantId) {
        if (!delMerchantId) {
            return null;
        }
        var javaResult = DelMerchantApi.IsoneModulesEngine.delMerchantService.getDelMerchant(delMerchantId);
        if (!javaResult) {
            return null;
        }
        return JSON.parse(javaResult + "");
    },
    /**
     * 获取商家所有的配送商对象
     * @param merchantId 商家ID
     */
    getDelMerchants: function (merchantId) {
        if (!merchantId) {
            return null;
        }
        return JSON.parse(DelMerchantApi.IsoneModulesEngine.delMerchantService.getDelMerchants(merchantId) + "");
    },
    /**
     * 根据商家配送商ID获取商家配送商对象
     * @param delMerchantCode 配送商编码
     * @param merchantId 商家ID
     * @returns {*}
     */
    getDelMerchantByDeliveryCode: function (delMerchantCode, merchantId) {
        if (!delMerchantCode || !merchantId) {
            return null;
        }
        var logisticsId = DelMerchantApi.IsoneModulesEngine.code2DelMerchantService.getDelMerchantIdByDelMerchantCode(merchantId, delMerchantCode);
        if (!logisticsId) {
            return null;
        }
        return DelMerchantService.getDelMerchant(logisticsId);
    },
    /**
     * 通过订单配送商ID、运单号、验证码、sessionId，获取商品运送信息
     *
     * @param delMerchantId
     * @param orderId
     * @param waybillId
     * @param verifyCode
     * @param sessionId
     * @returns {*}
     */
    getDeliveryInfoByBill: function (delMerchantId, orderId, waybillId, verifyCode, sessionId) {
        if (!delMerchantId || !orderId || !waybillId) {
            return null;
        }
        var javaResult = DelMerchantApi.IsoneModulesEngine.delMerchantService.getDeliveryInfoByBill(delMerchantId, orderId, waybillId, verifyCode, sessionId);
        if (!javaResult) {
            return null;
        }
        return JSON.parse(javaResult.toString());
    },
    /**
     * 通过商家id和平台的配送商id获取商家的配送商对象
     * @param merchantId
     * @param deliveryMerchantId
     * @returns {*}
     */
    getMerchantHasUseDeliveryMerchant:function(merchantId,deliveryMerchantId){
        if (!merchantId || !deliveryMerchantId ) {
            return null;
        }
        var javaResult = DelMerchantApi.IsoneModulesEngine.delMerchantService.getMerchantHasUseDeliveryMerchant(merchantId,deliveryMerchantId);
        if (!javaResult) {
            return null;
        }
        return JSON.parse(javaResult.toString());
    }

};