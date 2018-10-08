//#import session.js
//#import doT.min.js
//#import pigeon.js
//#import Util.js
(function () {
    var merchantId = $.params["m"];
    var shopId = (!$.params["s"] || $.params["s"] === "undefined") ? null : $.params["s"];
    var warehouseId = (!$.params["w"] || $.params["w"] === "undefined") ? null : $.params["w"];
    var template = $.getProgram(appMd5, "pages/subMain.jsxp");
    var pageData = {"appId": appId, "m": merchantId};
    var currentTime = new Date();
    if (shopId) {
        pageData.s = shopId;
    }
    if (warehouseId) {
        pageData.w = warehouseId;
    }
    if (currentTime) {
        pageData.currentTime = currentTime.getTime();
    }
    var pageFn = doT.template(template);
    out.print(pageFn(pageData));
}());
