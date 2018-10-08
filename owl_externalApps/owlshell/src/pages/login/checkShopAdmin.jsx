//#import Util.js
//#import user.js
//#import session.js
//#import $owl_shop:services/modelService.jsx
var selfApi = new JavaImporter(
    Packages.net.xinshi.isone.modules.user,
    Packages.net.xinshi.isone.commons
);
(function () {
    var result = {"code": "0"};
    var shopId = $.params["shopId"];
    var loginId = $.params["loginId"];

    if(shopId!='0'){
        var shop = owl_shopService.get(shopId);
        if (!shop) {
            result.code = "300";
            result.msg = "系统不存在【" + shopId + "】的店铺信息";
            out.print(JSON.stringify(result));
            return;
        }
    }

    loginId = decrypt(loginId, request);
    var user = UserService.getUserByKey(loginId);
    if (!user) {
        result.code = "301";
        result.msg = "登录账户不存在";
        out.print(JSON.stringify(result));
        return;
    }
    var isEnable = selfApi.LoginUtil.isEnable($.toJavaJSONObject(user));
    if (isEnable != true) {
        result.code = "302";
        result.msg = "用户未激活";
        out.print(JSON.stringify(result));
        return;
    }
    if (user.id !== "u_0") {
        var admins = shop.admins;
        if (!admins) {
            result.code = "303";
            result.msg = "店铺未设置管理员";
            out.print(JSON.stringify(result));
            return;
        }
        if (!verifyAdmin(admins, user.id)) {
            result.code = "304";
            result.msg = "账号【" + loginId + "】不存在店铺【" + shopId + "】中";
            out.print(JSON.stringify(result));
            return;
        }
    }

    out.print(JSON.stringify(result));
}());

function verifyAdmin(admins, userId) {
    return admins.some(function (admin) {
        return userId === admin.userId;
    });
}

function decrypt(data, request) {
    var backendLoginSessionId = SessionService.getSessionValue("backendLoginSessionId", request);
    var key = backendLoginSessionId.substring(0, 16);
    var iv = backendLoginSessionId.substring(backendLoginSessionId.length - 16);
    return selfApi.AESEncryptUtil.decrypt(data, key, iv);
}
