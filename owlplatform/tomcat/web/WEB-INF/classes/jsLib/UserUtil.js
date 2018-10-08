var UserUtilApi = new JavaImporter(
    Packages.net.xinshi.isone.modules.user,
    Packages.net.xinshi.isone.modules.user.tools,
    Packages.org.json
);

/**
 * @constructor
 * @type {Object}
 */
var UserUtilService = {};

UserUtilService.getRealName = function (user) {
    var s = JSON.stringify(user);
    var jUser = new UserUtilApi.JSONObject(s);
    return UserUtilApi.UserUtil.getRealName(jUser) + "";
};

UserUtilService.getFilterRealName = function (user) {
    var s = JSON.stringify(user);
    var jUser = new UserUtilApi.JSONObject(s);
    return UserUtilApi.UserUtil.getFilterRealName(jUser) + "";
};

UserUtilService.getNickName = function (user) {
    var s = JSON.stringify(user);
    var jUser = new UserUtilApi.JSONObject(s);
    return UserUtilApi.UserUtil.getNickName(jUser) + "";
};

UserUtilService.getFilterNickName = function (user) {
    var s = JSON.stringify(user);
    var jUser = new UserUtilApi.JSONObject(s);
    return UserUtilApi.UserUtil.getFilterNickName(jUser) + "";
};

UserUtilService.getLoginId = function (user) {
    var s = JSON.stringify(user);
    var jUser = new UserUtilApi.JSONObject(s);
    return UserUtilApi.UserUtil.getLoginId(jUser) + "";
};

UserUtilService.collectUserByParentId = function (searchArgs) {
    var s = JSON.stringify(searchArgs);
    var args = new UserUtilApi.JSONObject(s);
    return UserUtilApi.UserSearchUtil.collectUserByParentId(args) + "";
};

UserUtilService.searchUser = function (searchArgs) {
    var s = JSON.stringify(searchArgs);
    var args = new UserUtilApi.JSONObject(s);
    return UserUtilApi.UserSearchUtil.searchUser(args) + "";
};

UserUtilService.doSearchUser = function (searchArgs) {
    var s = JSON.stringify(searchArgs);
    var args = new UserUtilApi.JSONObject(s);
    return UserUtilApi.UserSearchUtil.doSearchUser(args);
};

UserUtilService.reindexUser = function (id) {
    UserUtilApi.UserSearchUtil.reindexUser(id);
};

/**
 * 根据userId获取会员有购买关系的商家ID列表，最多返回100个
 * @param userId
 * @returns {*}
 */
UserUtilService.getHasBuyRelatedMerchantListByUserId = function (userId) {
    var json = UserUtilApi.UserUtil.getHasBuyRelatedMerchantList(userId);
    return JSON.parse(json.toString());
};