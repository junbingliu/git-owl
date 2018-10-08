//#import Util.js
//#import user.js
//#import session.js
//#import encryptUtil.js
//#import $owl_u:services/modelService.jsx

(function () {
        var errorCode = "";
        var ret = {
            state: 'error',
            errorCode: errorCode
        }

        //校验滑块位移是否正确-------begin
        var isCheck = SessionService.getSessionValue("JigsawValidateUtilCheckMove", request);
        if(!isCheck || isCheck!='true'){
            ret.errorCode = "未通过图片验证码验证";
            out.print(JSON.stringify(ret));
            return;
        }
        //校验滑块位移是否正确-------end

        var loginKey = $.params.lk;    //登录Id，可以是loginId,mobilePhone
        var password = $.params.pa;  //登录密码

        if (!loginKey) {
            errorCode = "用户名为空";
        }  else if (!password) {
            errorCode = "密码为空";
        }  else {
            var resultCode = {
                100: "success",
                101: "data_error",
                102: "data_error",
                103: "用户名或密码错误",
                104: "用户名或密码错误",
                105: "not_enabled",
                106: "password_null"
            };

            var user = owl_uService.getUniqueObj("loginId",loginKey);
            if(user==null){
                user = owl_uService.getUniqueObj("mobile",loginKey);
            }
            if (!user ||user=='') {
                ret["state"] = false;
                ret.errorCode =  resultCode["103"];
                ret.msg = "user is null"
                out.print(JSON.stringify(ret));
                return;
            }
            var passwordhash = user["passwordhash"];
            var ran = user.random;

            var passran = password + ran;
            var passwordsha = DigestUtil.digestString(passran, "SHA");
            if(passwordsha !== passwordhash){
                ret["state"] = false;
                ret.errorCode =  resultCode["103"];
                ret.msg = "password is not right :" + passwordsha + ":" + passwordhash;
                out.print(JSON.stringify(ret));
                return;
            }

            SessionService.addSessionValue("_loginUserId",user.id, request,response);
            SessionService.removeSessionValue('JigsawValidateUtilCheckMove');//调用接口成功后一定要remove掉才安全
            errorCode = resultCode["100"];
        }
        ret.state = 'ok';
        ret.errorCode = errorCode;
        out.print(JSON.stringify(ret));

})();