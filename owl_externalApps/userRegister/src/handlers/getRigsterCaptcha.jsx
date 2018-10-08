//#import Util.js
//#import login.js
//#import sysArgument.js
//#import session.js
//#import user.js
//#import DateUtil.js
//#import NoticeTrigger.js
//#import encryptUtil.js
//#import JigsawValidateUtil.js
//#import HttpUtil.js

(function () {

    var ret = {
        code:"",
        errorCode:""
    };

    //校验滑块位移是否正确-------begin
    var isCheck = SessionService.getSessionValue("JigsawValidateUtilCheckMove", request);
    if(!isCheck||isCheck!="true"){
        ret.errorCode = "未通过图片验证码验证";
        out.print(JSON.stringify(ret));
        return;
    }
    //校验滑块位移是否正确-------end

    var mobilePhone = $.params.p;
    if(!mobilePhone){
        ret.errorCode = "请填写您的手机号码";
        out.print(JSON.stringify(ret));
        return;
    }

    $.log("\n.............................mobilePhone=" + mobilePhone);

    var checkResult = LoginService.judgeMemberField(mobilePhone);
    if (checkResult && checkResult != "null") {
        ret.errorCode = "对不起，此手机已注册，请换一个";
        out.print(JSON.stringify(ret));
        return;
    }

    var intervalTime = 120;//秒，发送间隔时间
    var validTime = 120;//秒，短信验证码有效时间

    //生成验证码
    var mobileCaptchaSessionName = "mobileCaptchaObj";
    var clientIp = $.getClientIp();
    var currTime = new Date().getTime();
    var timeOut = intervalTime * 1000;
    var mobileCaptchaSessionValue = SessionService.getSessionValue(mobileCaptchaSessionName,request);
    var mobileCaptchaObj;
    // if(mobileCaptchaSessionValue){
    //     mobileCaptchaObj = JSON.parse(mobileCaptchaSessionValue);
    //     var lastTime = mobileCaptchaObj["lastTime"];
    //     if(lastTime + timeOut >= currTime){
    //         //检查2分钟只能发一次
    //         ret.errorCode = "发送太频繁，请稍后再试";
    //         out.print(JSON.stringify(ret));
    //         return;
    //     }
    //     if(lastTime + (validTime * 1000) >= currTime){
    //         //在有效期内
    //         ret.errorCode = "短信验证码还在有效期";
    //         out.print(JSON.stringify(ret));
    //         return;
    //     }
    // }



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
    var jLabel = new NoticeTriggerApi.JSONObject();
    jLabel.put("\\[validateCode\\]", captcha + "");

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
        SessionService.removeSessionValue('JigsawValidateUtilCheckMove');//调用接口成功后一定要remove掉才安全
    }else{
        ret.errorCode = "短信验证码发送失败";
        ret.data = resData.data;
        ret.msg = "短信发送失败";
    }
    out.print(JSON.stringify(ret));
})();

function sendNotice(url,postData) {
   return HttpUtils.postData(url,postData);
}
