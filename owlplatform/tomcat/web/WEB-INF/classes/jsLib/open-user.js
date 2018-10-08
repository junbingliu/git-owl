var OpenUserApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.open.user,
    Packages.net.xinshi.isone.modules.user.tools
);

/**
 * @constructor
 * @type {Object}
 */
var OpenUserService = {};

/**
 * 订单搜索
 * @param searchArgs
 * @returns {*}
 */
OpenUserService.getUsers = function (searchArgs) {
    var jParams = $.JSONObject(searchArgs);
    var json = OpenUserApi.UserSearch.getUsers(jParams);
    return JSON.parse(json.toString());
};

/**
 * 修改会员信息
 * @param userId
 * @param jUserInfo
 * @param operatorUserId
 * @param config
 * @returns {*}
 */
OpenUserService.updateUser = function (userId, jUserInfo, operatorUserId, config) {
    var jUser = $.toJavaJSONObject(jUserInfo);
    var jConfig = $.toJavaJSONObject(config);
    var json = OpenUserApi.UserUpdateUtil.updateUser(userId, jUser, operatorUserId, jConfig);
    return JSON.parse(json.toString());
};

