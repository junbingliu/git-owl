//#import Util.js
PaymentUtilApi = new JavaImporter(
    Packages.net.xinshi.isone.modules.payment.PaymentUtil,
    Packages.java.util
);

var PaymentUtilService = {
    /**
     * 获取对账文件对象
     * @param payInterfaceId 支付方式ID
     * @param date 日期 如:20150101
     * @param type 对账文件类型 1:清算文件,0:结算文件(传空默认取清算文件)
     * @param merchantId 商家ID
     */
    getAccountFile: function (payInterfaceId, date, type, merchantId) {
        if (!payInterfaceId || !date || !merchantId) {
            return null;
        }
        var result = PaymentUtilApi.PaymentUtil.getAccountFile(payInterfaceId, date, type, merchantId);
        return JSON.parse(result + "");
    },
    /**
     * 获取对账文件txt内容
     * @param payInterfaceId 支付方式ID
     * @param date 日期 如:20150101
     * @param type 对账文件类型 1:清算文件,0:结算文件(传空默认取清算文件)
     * @param merchantId 商家ID
     * @param encoding 文件编码方式(传空默认UTF-8)
     */
    getAccountFileContent: function (payInterfaceId, date, type, merchantId, encoding) {
        if (!payInterfaceId || !date || !merchantId) {
            return null;
        }
        var result = PaymentUtilApi.PaymentUtil.getAccountFileContent(payInterfaceId, date, type, merchantId, encoding);
        return $.java2Javascript(result);
    },
    /**
     * 验证数据是否合法
     * @param payInterfaceId 支付方式ID
     * @param plainData 要验证的数据
     * @param checkValue 密文
     * @param merchantId 商家ID
     * @returns {*}
     */
    verifyAuthToken: function (payInterfaceId, plainData, checkValue,merchantId) {
        if (!payInterfaceId || !plainData || !checkValue) {
            return false;
        }
        if(!merchantId){
            merchantId = 'head_merchant';
        }
        return PaymentUtilApi.PaymentUtil.verifyAuthToken(payInterfaceId, plainData, checkValue,merchantId);
    },
    /**
     * 搜索对账文件
     * @param searchArgs
     * @returns {*}
     */
    searchAccountFile:function(searchArgs){
        if(!searchArgs){
            return null;
        }
        var jSearchArgs = $.JSONObject(searchArgs);
        var json = PaymentUtilApi.PaymentUtil.searchAccountFile(jSearchArgs);
        return JSON.parse(json + "");
    },
    /**
     * 删除对账文件对象
     * @param id
     * @returns {*}
     */
    deleteAccountFile:function(id){
        if(!id){
            return null;
        }
        PaymentUtilApi.PaymentUtil.deleteAccountFile(id);
    },
    /**
     * 下载对账文件
     * @param payInterfaceId 支付方式ID
     * @param merchantId 商家ID
     * @param date 日期 yyyy-MM-dd
     * @returns {null}
     */
    downloadAccountFile:function(payInterfaceId,merchantId,date){
        if(!payInterfaceId || !merchantId || !date){
            return null;
        }
        PaymentUtilApi.PaymentUtil.downloadAccountFile(payInterfaceId,merchantId,date);
    }
};