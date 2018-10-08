//#import session.js
//#import doT.min.js
//#import pigeon.js
//#import Util.js
//#import cookie.js
(function () {
    var merchantId = $.params["m"];
    var shopId = (!$.params["s"] || $.params["s"] === "undefined") ? null : $.params["s"];
    var warehouseId = (!$.params["w"] || $.params["w"] === "undefined") ? null : $.params["w"];
    CookieService.removeCookie(request, response, CookieService.adminLoginKey);

    var sessionName = "visitType";
    var sessionValue = SessionService.getSessionValue(sessionName, request);
    SessionService.removeSessionValue(sessionName);
    if (!sessionValue) {
        response.sendRedirect("login/shopLogin.jsx");
        return;
    }
	sessionValue = JSON.parse(sessionValue);
    var visitId = sessionValue["shop"];
    if (visitId === shopId) {
        response.sendRedirect("login/shopLogin.jsx");
        return;
    }
    visitId = sessionValue["warehouse"];
    if (visitId === warehouseId) {
        response.sendRedirect("login/warehouseLogin.jsx");
        return;
    }
    response.sendRedirect("login/shopLogin.jsx");

}());



