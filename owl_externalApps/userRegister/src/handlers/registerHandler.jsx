//#import Util.js
//#import session.js
//#import DigestUtil.js
//#import json2.js
//#import address.js
//#import search.js
//#import NoticeTrigger.js
//#import DateUtil.js
//#import pageService.js
//#import sysArgument.js
//#import encryptUtil.js
//#import $owl_u:services/modelService.jsx

(function () {
    var errorCode = "";
    var needCaptcha = false;
    var ret = {
        state: '',
        errorCode: errorCode
    }

    var loginId = $.params.un;    //用户名
    var password = $.params.pa;  //登录密码
    var mobilePhone = $.params.p;  //手机
    var realName = $.params.rn;  //真实姓名
    var mobileValidateCode = $.params.mc;  //短信验证码

    if (!loginId) {
        errorCode = "empty_username";
    }else if(!password){
        errorCode="empty_password";
    }else if(!mobilePhone){
        errorCode="empty_mobilePhone";
    }/*else if(!realName){
        errorCode="empty_realName"
    }*/

    if (errorCode != "") {
        ret.errorCode = errorCode;
        out.print(JSON.stringify(ret));
        return;
    }

    var hasCheckMobilePhone = false;

    //加解密密钥...................begin
    /*var md5LoginSessionIdValue = SessionService.getSessionValue("md5LoginSessionId", request);
    var md5Value = md5LoginSessionIdValue.split("|");
    var md5LoginSessionId = md5Value[0];
    var key = md5LoginSessionId.substring(0, 16);
    var iv = md5LoginSessionId.substring(md5LoginSessionId.length - 16);*/
    //加解密密钥...................end

    /*loginId = EncryptUtil.decryptData(loginId, key, iv);
    password = EncryptUtil.decryptData(password, key, iv);
    mobilePhone = EncryptUtil.decryptData(mobilePhone, key, iv);
    realName = EncryptUtil.decryptData(realName, key, iv);
    mobileValidateCode = EncryptUtil.decryptData(mobileValidateCode, key, iv);*/

    if (!/^[a-zA-Z]([a-zA-Z0-9(_)(\-)]+)$/.test(loginId)) {
        errorCode = "username_unlawful:" + loginId;
    } else if (!(loginId.length > 3 && loginId.length < 21)) {
        errorCode = "username_length_error";
    }else if (mobilePhone) {
        var mobileRegex = new RegExp(SysArgumentService.getSysArgumentStringValue("head_merchant", "col_sysargument", "regex_Mobile"));
        if (!mobileRegex.test(mobilePhone)) {
            errorCode = "mobile_error";
        }
    }else if (needCaptcha && !mobileValidateCode) {
        errorCode = "empty_captcha";
    }

    if (errorCode != "") {
        ret.errorCode = errorCode;
        out.print(JSON.stringify(ret));
        return;
    }

    if(owl_uService.isDuplicated(null,"loginId",loginId)){
        ret.errorCode = "loginId_exist";
        out.print(JSON.stringify(ret));
        return;
    }

    if(owl_uService.isDuplicated(null,"mobile",mobilePhone)){
        ret.errorCode = "mobilePhone_exist";
        out.print(JSON.stringify(ret));
        return;
    }



    var mobileCaptchaSessionName = "mobileCaptchaObj";
    //验证短信验证码
    if (needCaptcha) {
        var validTime = 5;//分钟，短信验证码有效时间
        var mobileCaptchaObj = SessionService.getSessionValue(mobileCaptchaSessionName, request);
        if (!mobileCaptchaObj) {
            ret.errorCode = "phone_validate_code_empty";
            out.print(JSON.stringify(ret));
            return;
        }
        mobileCaptchaObj = JSON.parse(mobileCaptchaObj);
        $.log(mobileCaptchaObj["captcha"])
        var timeOut = validTime * 60 * 1000;
        var currTime = new Date().getTime();
        if (currTime - mobileCaptchaObj["lastTime"] >= timeOut) {
            //超时
            ret.errorCode = "phone_validate_code_overdue";
            out.print(JSON.stringify(ret));
            return;
        }

        if (mobileCaptchaObj["captcha"] != mobileValidateCode) {
            //验证码错误
            ret.errorCode = "phone_validate_code_error";
            out.print(JSON.stringify(ret));
            return;
        }

        if (mobileCaptchaObj["mobile"] != mobilePhone) {
            //注册手机和短信验证手机不一致
            ret.errorCode = "mobilePhone_error";
            out.print(JSON.stringify(ret));
            return;
        }
    }



    var ran = Math.random() + "";
    var passran = password + ran;
    var passwordsha = DigestUtil.digestString(passran, "SHA");

    var jUser = {};
    jUser["loginId"] = loginId;
    jUser["passwordhash"] = passwordsha;
    jUser["random"] = ran;
    jUser["name"] = realName;
    jUser["mobile"] = mobilePhone;
    jUser["isEnable"] = "1";//1表示激活
    jUser["mobile_verified"] = true;

    SessionService.removeSessionValue(mobileCaptchaSessionName);
    var userId = owl_uService.add(jUser);

    ret.state = 'ok';
    ret.userId = userId;
    out.print(JSON.stringify(ret));
})();

