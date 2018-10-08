//#import Util.js
//#import user.js
//#import login.js
//#import session.js
//#import $erp_warehouse:services/modelService.jsx
var selfApi = new JavaImporter(
    Packages.net.xinshi.isone.modules.user,
    Packages.net.xinshi.isone.commons
);
(function () {
    var result = {"code": "0"};
    var loginId = $.params["loginId"];
    var password = $.params["password"];
    var warehouseId = $.params.warehouseId;

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
    warehouseId = warehouseId && warehouseId.trim() || "";
    var warehouse = erp_warehouseService.get(warehouseId);
    //查找loginId
    var admins = warehouse.admins;
    var sessionName = "visitType";
    var value = {"warehouse":warehouseId};
    if(!admins || admins.length == 0){
        result.code = "10";
        result.msg = "仓库未设置管理员";
        out.print(JSON.stringify(result));
        return;
    }
    if(admins.some(function(admin){
            return admin.userId==user.id;
        })){
        LoginService.loginBackend(loginId, password, "");
        SessionService.addSessionValue(sessionName, JSON.stringify(value), request, response);
        result.msg = "登录成功";
        out.print(JSON.stringify(result));
    }
    else{
        result.code = "8";
        result.msg = "不是本仓库管理员";
    }
}());

function decrypt(data, request) {
    var backendLoginSessionId = SessionService.getSessionValue("backendLoginSessionId", request);
    var key = backendLoginSessionId.substring(0, 16);
    var iv = backendLoginSessionId.substring(backendLoginSessionId.length - 16);
    return selfApi.AESEncryptUtil.decrypt(data, key, iv);
}