//#import Util.js
//#import session.js
//#import DigestUtil.js
//#import $owl_u:services/modelService.jsx


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

    var pageData = {
        mobile:identityObj.mobile
    }

    var html = $.runArtTemplate(appId,appMd5,"pages/forgetPassword/reCheck.html",pageData);
    out.print(html);
})();

