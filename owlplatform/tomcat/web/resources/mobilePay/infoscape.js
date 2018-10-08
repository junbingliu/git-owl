/**
 * Created by apple on 15/3/30.
 */
var infoscape = {};
infoscape.goAlipay = function (orderInfo, payRecId) {
    var jResult = {};
    jResult.msg = "支付成功";
    jResult.result = "success";
    jResult.payRecId = payRecId;
    var successUrl = "#/payResultPage/" + JSON.stringify(jResult);
    parent.native.goAlipay(orderInfo, successUrl);
};

infoscape.goWxAppPay = function (orderInfo, payRecId) {
    var jResult = {};
    jResult.msg = "支付成功";
    jResult.result = "success";
    jResult.payRecId = payRecId;
    var successUrl = "#/payResultPage/" + JSON.stringify(jResult);
    parent.native.goWxAppPay(orderInfo, successUrl);
};