//#import Util.js
//#import session.js
//#import $owl_u:services/modelService.jsx
//#import HttpUtil.js

(function () {

    var ret = {
        code:"",
        errorCode:""
    };

    var mobilePhone = $.params.p
    if(!mobilePhone){
        ret.errorCode = "请填写您的手机号码";
        out.print(JSON.stringify(ret));
        return;
    }

    var user =  owl_uService.getUniqueObj("mobile",mobilePhone);
    if (!user ||user=='') {
        ret.errorCode = "手机号码不存在";
        out.print(JSON.stringify(ret));
        return;
    }

    var validTime = 120;//秒，短信验证码有效时间

    //生成验证码
    var mobileCaptchaSessionName = "forgetPasswordMobileCaptchaObj";
    var clientIp = $.getClientIp();
    var currTime = new Date().getTime();
    var mobileCaptchaSessionValue = SessionService.getSessionValue(mobileCaptchaSessionName,request);
    var mobileCaptchaObj;
    if(mobileCaptchaSessionValue){
        mobileCaptchaObj = JSON.parse(mobileCaptchaSessionValue);
        var lastTime = mobileCaptchaObj["lastTime"];
        if(lastTime + (validTime * 1000) >= currTime){
            //在有效期内
            ret.errorCode = "短信验证码还在有效期内";
            out.print(JSON.stringify(ret));
            return;
        }
    }

    mobileCaptchaObj = {};
    var captcha = parseInt(Math.random() * 900000 + 100000);
    mobileCaptchaObj["mobile"] = mobilePhone;
    mobileCaptchaObj["captcha"] = captcha;
    mobileCaptchaObj["lastTime"] = currTime;
    mobileCaptchaObj["clientIp"] = clientIp;
    SessionService.addSessionValue(mobileCaptchaSessionName,JSON.stringify(mobileCaptchaObj),request,response);

    var phoneValidateCode = captcha + "-" + currTime;
    SessionService.addSessionValue("phoneValidatePhone",mobilePhone,request,response);
    SessionService.addSessionValue("phoneValidateCode",phoneValidateCode,request,response);

    var templateParams={
        code:captcha+"",
        address:"美国华盛顿白宫总统办公室",
        phone:"020-66668888"
    }
    templateParams = JSON.stringify(templateParams);
    var postData={
        templateId:"INFOSCAPE_TMPID_00001",
        phoneNumber:mobilePhone,
        nationCode:"86",
        templateParams:templateParams
    }
    var postUrl = $.getEnv("SMS_API_URL");
    var resData = sendNotice(postUrl,postData);
    $.log(resData)
    if(resData.state==0){
        ret.code = "0";
        ret.data = resData.data;
        ret.msg = "短信发送成功";
    }else{
        ret.errorCode = "短信验证码发送失败";
        ret.data = resData.data;
        ret.msg = "短信发送失败";
        SessionService.removeSessionValue(mobileCaptchaSessionName);
    }
    out.print(JSON.stringify(ret));
})();

function sendNotice(url,postData) {
    return HttpUtils.postData(url,postData);
}
