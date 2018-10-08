var CookieApi = new JavaImporter(
    Packages.net.xinshi.isone.modules.user.cookie.CookieService
);
/**
 * @namespace
 * @type {Object}
 */
var CookieService = {
    /**
     * 增加cookie
     * @param cookieName
     * @param cookieValue
     */
    addCookie: function (cookieName, cookieValue) {
        if (!cookieName || !cookieValue) {
            return;
        }
        CookieApi.CookieService.addCookie(cookieName, cookieValue, response);
    },

    addCookieWithAge : function(cookieName,cookieValue,maxAge){
        CookieApi.CookieService.addCookie(cookieName, cookieValue, maxAge, response);
    },
    /**
     * 获取cookie
     * @param cookieName
     * @returns {string}
     */
    getCookieValueByName: function (cookieName) {
        if (!cookieName) {
            return;
        }
        return CookieApi.CookieService.getCookieValueByName(request, cookieName) + "";
    },
    /**
     * 删除cookie
     * @param cookieName
     */
    removeCookie: function (cookieName) {
        if (!cookieName) {
            return;
        }
        CookieApi.CookieService.removeCookie(request, response, cookieName);
    }
};
