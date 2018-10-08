//#import Util.js
//#import user.js
//#import login.js
//#import session.js
//#import $owl_shop:services/modelService.jsx
var selfApi = new JavaImporter(
    Packages.net.xinshi.isone.modules.user,
    Packages.net.xinshi.isone.commons
);
(function () {
    var result = {"code": "0"};
    var loginId = $.params["loginId"];
    var password = $.params["password"];
    var shopId = $.params.shopId;

    var validateCode = $.params["validateCode"];
    var sessionValidateCode = SessionService.getSessionValue("ValidateCode", request);

    if (validateCode !== sessionValidateCode) {
        result.code = "5";
        result.msg = "您填写的验证码不一致，请重新填写您的验证码";
        out.print(JSON.stringify(result));
        return;
    }
    loginId = decrypt(loginId, request);
    password = decrypt(password, request);
    var user = UserService.getUserByKey(loginId);
    if (!user) {
        result.code = "6";
        result.msg = "用户名或密码错误";
        out.print(JSON.stringify(result));
        return;
    }
    var isEnable = selfApi.LoginUtil.isEnable($.toJavaJSONObject(user));
    if (isEnable != true) {
        result.code = "7";
        result.msg = "用户未激活";
        out.print(JSON.stringify(result));
        return;
    }
    shopId = shopId && shopId.trim() || "";
    if(shopId!=0){
        var shop = owl_shopService.get(shopId);
        //查找loginId
        var admins = shop.admins;
        if(!admins || admins.length == 0){
            result.code = "10";
            result.msg = "店铺未设置管理员";
            out.print(JSON.stringify(result));
            return;
        }
        if (admins.some(function (admin) {
            return admin.userId == user.id;
        })) {
            // var r = LoginService.loginBackend(loginId, password, "");
            if(LoginService.loginByKey(loginId,password)){
                SessionService.addSessionValue("_loginUserId",user.id, request,response);
                LoginService.loginBackendByUserId(user.id);
                var sessionName = "visitType";
                var value = {"shop": shopId};

                SessionService.addSessionValue(sessionName, JSON.stringify(value), request, response)
                result.msg = "登录成功";
                out.print(JSON.stringify(result));
                return;
            }
            else{
                result.code = "6";
                result.msg = "用户名或密码错误";
                out.print(JSON.stringify(result));
                return;
            }

        }
        else {
            result.code = "8";
            result.msg = "不是本店铺管理员";
            out.print(JSON.stringify(result));
            return;
        }
    } else{
        //shopId == '0' 代表平台登录
        if(loginId!='root'){
            result.code = "10";
            result.msg = "不是平台管理员";
            out.print(JSON.stringify(result));
            return;
        }
        var r = LoginService.loginByKey(loginId,password);
        if(r) {
            SessionService.addSessionValue("_loginUserId", "u_0", request, response);
            LoginService.loginBackendByUserId("u_0");
            var sessionName = "visitType";
            var value = {"shop": '0'};

            SessionService.addSessionValue(sessionName, JSON.stringify(value), request, response)
            result.msg = "登录成功";
            out.print(JSON.stringify(result));
            return;
        }
        else {
            result.code = "6";
            result.msg = "用户名或密码错误.loginId=" + loginId + ", passwd=" + password;
            out.print(JSON.stringify(result));
            return;
        }


    }

}());

function decrypt(data, request) {
    var backendLoginSessionId = SessionService.getSessionValue("backendLoginSessionId", request);
    var key = backendLoginSessionId.substring(0, 16);
    var iv = backendLoginSessionId.substring(backendLoginSessionId.length - 16);
    return selfApi.AESEncryptUtil.decrypt(data, key, iv);
}