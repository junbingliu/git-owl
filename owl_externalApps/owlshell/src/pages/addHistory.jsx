//#import session.js
//#import Util.js
(function () {

    var merchantId = $.params["m"];
    var shopId = $.params["s"];
    var warehouseId = $.params["w"];
    var historyId = $.params["historyId"];
    if (!historyId) {
        return;
    }
    var sessionName = "appHistory";
    var sessionValue = SessionService.getSessionValue(sessionName, request);
    var appHistory = null;
    if (!sessionValue) {
        appHistory = {};
    } else {
        appHistory = JSON.parse(sessionValue);
    }
    var viewTime = new Date().getTime();
    appHistory[historyId] = {
        historyId: historyId,
        merchantId: merchantId,
        viewTime: viewTime
    }
    if (shopId && shopId !== "") {
        appHistory[historyId].shopId = shopId;
    }
    if (warehouseId && warehouseId !== "") {
        appHistory[historyId].warehouseId = warehouseId;
    }
    SessionService.addSessionValue(sessionName, JSON.stringify(appHistory), request, response);
}());
