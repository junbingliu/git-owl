//发送短信
//#import eventBus.js

var SmsApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.base
);

var SmsService = {};

SmsService.sendSmsQue = function (param) {
    var param_ = JSON.stringify(param);
    var jMsg = new SmsApi.JSONObject(param_);
    var queId = SmsApi.IsoneModulesEngine.sms.sendSmsQue(jMsg);
    return queId;
};

/**
 *
 * @param phone
 * @param msg
 * @param merchantId
 * @param smsType   短信类型
 * @param receiver
 */
SmsService.send = function(phone,msg,merchantId,smsType,receiver){
    var param = {
        phone:phone,
        message:msg,
        merchantId:merchantId,
        smsType:smsType,
        receiver:receiver
    }
    //SmsService.sendSmsQue(param);
    EventBusService.fire("sendSms",param);
};
