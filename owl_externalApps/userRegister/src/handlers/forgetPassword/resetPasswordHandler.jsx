//#import Util.js
//#import session.js
//#import $owl_u:services/modelService.jsx
//#import DigestUtil.js

(function () {
    var ret = {
        code:"1",
        msg:''
    }

    var identityObj = SessionService.getSessionValue("checkIdentityToResetPwd", request);
    identityObj = JSON.parse(identityObj);

    if(!identityObj || identityObj=={}){
        ret.msg = "未通过身份验证";
        out.print(JSON.stringify(ret));
        return;
    }

    var validTime = 5;//分钟，session值过期时间
    var timeOut = validTime * 60 * 1000;
    var currTime = new Date().getTime();
    if (currTime - identityObj["lastTime"] >= timeOut) {
        //session值过期
        ret.msg = "身份验证已过期请重新验证身份";
        out.print(JSON.stringify(ret));
        return;
    }

    var isCheck = identityObj['isCheck'];

    if(!isCheck || isCheck!='true'){
        ret.msg = "未通过身份验证";
        out.print(JSON.stringify(ret));
        return;
    }

    var password = $.params.pa;  //新密码
    var mobilePhone = $.params.p;
    var mobileValidateCode = $.params.code;

    if(!mobilePhone || mobilePhone==''){
        ret.msg = "手机号码为空";
        out.print(JSON.stringify(ret));
        return;
    }
    if(!mobileValidateCode || mobileValidateCode==''){
        ret.msg = "验证码为空";
        out.print(JSON.stringify(ret));
        return;
    }

    if(!password || password==''){
        ret.msg = "密码为空";
        out.print(JSON.stringify(ret));
        return;
    }

    var user =  owl_uService.getUniqueObj("mobile",mobilePhone);

    if(!user ||user==''){
        ret.msg = "手机号码没注册";
        out.print(JSON.stringify(ret));
        return;
    }

    var mobileCaptchaSessionName = "forgetPasswordMobileCaptchaObj";
    var validTime = 5;//分钟，短信验证码有效时间
    var mobileCaptchaObj = SessionService.getSessionValue(mobileCaptchaSessionName, request);
    if (!mobileCaptchaObj) {
        ret.msg = "短信验证码不存在";
        out.print(JSON.stringify(ret));
        return;
    }
    mobileCaptchaObj = JSON.parse(mobileCaptchaObj);

    var timeOut = validTime * 60 * 1000;
    var currTime = new Date().getTime();
    if (currTime - mobileCaptchaObj["lastTime"] >= timeOut) {
        //session值过期
        ret.msg = "短信验证码已过期";
        out.print(JSON.stringify(ret));
        return;
    }

    if (mobileCaptchaObj["captcha"] != mobileValidateCode) {
        //验证码错误
        ret.msg = "短信验证码错误";
        out.print(JSON.stringify(ret));
        return;
    }

    if (mobileCaptchaObj["mobile"] != mobilePhone) {
        //注册手机和短信验证手机不一致
        ret.msg = "验证手机号码不一致";
        out.print(JSON.stringify(ret));
        return;
    }

    var ran = Math.random() + "";
    var passran = password + ran;
    var passwordsha = DigestUtil.digestString(passran, "SHA");


    user["passwordhash"] = passwordsha;
    user["random"] = ran;
    try{
        owl_uService.update(user,null);
        ret.code = '0';
        ret.msg = "ok";
        SessionService.removeSessionValue('checkIdentityToResetPwd');
        out.print(JSON.stringify(ret));
    }
    catch(e){
        ret.msg = "重置密码失败:" + e;
        out.print(JSON.stringify(ret));
    }


})();

