
var UserHelperApi = new JavaImporter(
    Packages.net.xinshi.isone.modules.user,
    Packages.net.xinshi.isone.modules.user.tools,
    Packages.org.json
);

/**
 * @constructor
 * @type {Object}
 */
var UserHelperService = {};

/**
 * 聚分享积分商城电信用户登录
 * @param strParam
 * @returns {string}
 */
UserHelperService.jfUserLogin = function (strParam) {
    return UserHelperApi.UserHelper.jfUserLogin(strParam,request,response) + "";
};