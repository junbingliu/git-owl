//#import session.js
//#import doT.min.js
//#import pigeon.js
//#import Util.js

//#import login.js
//#import user.js
(function () {
    var backendUserId = SessionService.getSessionValue("_loginUserId",request);
    var userObject = UserService.getUser(backendUserId);


    var merchantId = $.params["m"];
    var shopId = (!$.params["s"] || $.params["s"] === "undefined") ? null : $.params["s"];
    var warehouseId = (!$.params["w"] || $.params["w"] === "undefined") ? null : $.params["w"];
    var loginId = userObject.loginId;
    var name = userObject.nickName?userObject.nickName:userObject.realName?userObject.realName:userObject.loginId;
    var template = $.getProgram(appMd5, "pages/main.jsxp");
    var pageData = {"appId": appId, "m": merchantId};
    if (shopId) {
        pageData.s = shopId;
    }
    if (warehouseId) {
        pageData.w = warehouseId;
    }
    if (loginId) {
        pageData.loginId = loginId;
    }
    if(name){
        pageData.name = name;
    }
    var pageFn = doT.template(template);
    out.print(pageFn(pageData));
}());
