//#import session.js
//#import doT.min.js
//#import pigeon.js
//#import Util.js
(function(){
    var merchantId = $.params["m"];
    var shopId = (!$.params["s"] || $.params["s"] === "undefined") ? null : $.params["s"];
    var warehouseId = (!$.params["w"] || $.params["w"] === "undefined") ? null : $.params["w"];
    var sessionName = "visitType";
    var sessionValue = SessionService.getSessionValue(sessionName, request);
    if (!sessionValue) {
        response.sendRedirect("login/shopLogin.jsx");
        return;
    }
    sessionValue = JSON.parse(sessionValue);
    var sessionShopId = sessionValue.shop;
    if (shopId !== sessionShopId) {
        response.sendRedirect("login/shopLogin.jsx");
    }

    var sessionWarehouseId = sessionValue.warehouse;
    if (warehouseId!==null  && warehouseId !== sessionWarehouseId) {
        response.sendRedirect("login/warehouseLogin.jsx");
    }

    var template = $.getProgram(appMd5, "pages/index.jsxp");

    var pageData = {"appId": appId, "m": merchantId};
    if (shopId!==null) {
        pageData.s = shopId;
    }
    if (warehouseId!==null) {
        pageData.w = warehouseId;
    }
    // out.print(template);
    var pageFn = doT.template(template);
    out.print(pageFn(pageData));
})();

