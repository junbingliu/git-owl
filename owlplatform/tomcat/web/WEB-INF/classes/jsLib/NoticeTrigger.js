var NoticeTriggerApi = new JavaImporter(
    Packages.net.xinshi.isone.modules,
    Packages.org.json
);

/**
 * @namespace
 */
var NoticeTriggerService = {

    /**
     * 发送手机号码验证码
     * @return {String}
     */
    sendNotice: function (userId, sendObj, noticeId, merchantId, label) {
        var jLabel = new NoticeTriggerApi.JSONObject(JSON.stringify(label));
        return NoticeTriggerApi.IsoneModulesEngine.noticeTrigger.sendNotice(userId, sendObj, noticeId, merchantId, jLabel);
    },
    /**
     * 发送手机号码验证码
     * @return {String}
     */
    sendNoticeEx: function (userId, sendObj, noticeId, merchantId, label) {
        var jLabel = new NoticeTriggerApi.JSONObject(JSON.stringify(label));
        return JSON.parse(NoticeTriggerApi.IsoneModulesEngine.noticeTrigger.sendNoticeEx(userId, sendObj, noticeId, merchantId, jLabel) + "");
    },
    /**
     * 发送短信通知商家
     * @returns {*}
     */
    sendNoticeToMerchant: function (merchantId, noticeId, label) {
        var jLabel = new NoticeTriggerApi.JSONObject(JSON.stringify(label));
        return NoticeTriggerApi.IsoneModulesEngine.noticeTrigger.sendNoticeToMerchant(merchantId, noticeId, jLabel);
    },
    /**
     * 获取订单Items,以表格形式发送
     * @param jItems
     */
    getOrderItems: function (jItems) {
        if (!jItems) {
            return;
        }
        var javaJSONObject = NoticeTriggerApi.JSONArray(JSON.stringify(jItems));
        return NoticeTriggerApi.IsoneModulesEngine.noticeTrigger.getOrderItems(javaJSONObject) + "";
    }
};