//#import Util.js


var AuthorizeAppApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.openapi,
    Packages.net.xinshi.isone.openapi.app.tools
);

/**
 * @constructor
 * @type {Object}
 */
var AuthorizeAppService = {};


/**
 * 获得所有的授权应用
 * @param merchantId
 * @param searchArgs
 * @return {*}
 */
AuthorizeAppService.getAppList = function (merchantId, searchArgs) {
    var jParams = $.toJavaJSONObject(searchArgs);
    var json = AuthorizeAppApi.AuthAppSearchUtil.getAppList(merchantId, jParams);
    return JSON.parse(json.toString());
};

/**
 * 添加应用
 * @param appType
 * @param jAppInfo
 * @param userId
 * @returns {string}
 */
AuthorizeAppService.addApp = function (appType, jAppInfo, userId) {
    var jApp = $.toJavaJSONObject(jAppInfo);
    var appId = AuthorizeAppApi.IsoneOpenApiEngine.authAppService.addApp(appType, jApp, userId);
    return appId + "";
};

/**
 * 修改应用
 * @param jAppInfo
 */
AuthorizeAppService.updateApp = function (jAppInfo) {
    var jApp = $.toJavaJSONObject(jAppInfo);
    AuthorizeAppApi.IsoneOpenApiEngine.authAppService.updateApp(jApp);
};
/**
 * 修改应用
 * @param jAppInfo
 */
AuthorizeAppService.resetAppKey = function (appId) {
    var json = AuthorizeAppApi.IsoneOpenApiEngine.authAppService.resetAppKey(appId);
    if (!json) return null;
    return JSON.parse(json.toString());
};

/**
 * 根据appKey获得应用
 * @param appKey
 * @returns {*}
 */
AuthorizeAppService.getAppByKey = function (appKey) {
    var json = AuthorizeAppApi.IsoneOpenApiEngine.authAppService.getAppByKey(appKey);
    if (!json) return null;
    return JSON.parse(json.toString());
};

/**
 * 根据ID获得应用
 * @param appId
 * @returns {*}
 */
AuthorizeAppService.getAppById = function (appId) {
    var json = AuthorizeAppApi.IsoneOpenApiEngine.authAppService.getAppById(appId);
    if (!json) return null;
    return JSON.parse(json.toString());
};

/**
 * 删除应用
 * @param appId
 * @returns {*}
 */
AuthorizeAppService.deleteApp = function (appId) {
    return AuthorizeAppApi.IsoneOpenApiEngine.authAppService.deleteApp(appId);
};

/**
 * 根据应用appKey获得当天的访问统计
 * @param appKey
 * @returns {*}
 */
AuthorizeAppService.getTodayAccessStat = function (appKey) {
    var json = AuthorizeAppApi.AppAccessStatUtil.getTodayAccessStat(appKey);
    if (!json) return null;
    return JSON.parse(json.toString());
};
/**
 * 生成或者刷新access_token
 * @param auth_mid
 * @param jApp
 * @returns {string}
 */
AuthorizeAppService.authRefreshAccessToken = function (auth_mid, jApp) {
    var javaApp = $.toJavaJSONObject(jApp);
    var accessTokenId = AuthorizeAppApi.AuthAppUtil.authRefreshAccessToken(auth_mid, javaApp);
    return accessTokenId + "";
};

AuthorizeAppService.getAccessTokenIdByAppId = function (appId, auth_mid) {
    var accessTokenId = AuthorizeAppApi.IsoneOpenApiEngine.code2AuthAppService.getAccessTokenIdByAppId(appId, auth_mid);
    return accessTokenId + "";
};

AuthorizeAppService.getAccessToken = function (accessTokenId) {
    var json = AuthorizeAppApi.IsoneOpenApiEngine.accessTokenService.getAccessToken(accessTokenId);
    if(!json){
        return null;
    }
    return JSON.parse(json.toString());
};




