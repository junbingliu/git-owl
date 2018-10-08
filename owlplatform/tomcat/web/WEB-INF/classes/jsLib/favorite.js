
var FavoriteApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.user
);

/**
 * 收藏相关Api
 * @namespace
 * @type {Object}
 */
var FavoriteService = {};

/**
 * 判断是否收藏了某个对象
 * @return {*}
 */
FavoriteService.isExistFavorite = function (userId, objType, objId) {
    var isExist = FavoriteApi.FavoriteUtil.isExistFavorite(userId, objType, objId);
    return isExist;
};

/**
 * 添加收藏
 * @return {*}
 */
FavoriteService.addMemberFavorite = function (userId, objType, objId) {
    var isExist = FavoriteApi.IsoneModulesEngine.favoriteService.addMemberFavorite(userId, objType, objId);
    return isExist;
};

/**
 * 添加收藏
 * @return {*}
 */
FavoriteService.addFavorite = function (userId, objType, objId, jFavorite) {
    FavoriteApi.IsoneModulesEngine.favoriteService.addFavorite(userId, objType, objId, jFavorite);
};

/**
 * 返回收藏对象Id
 */
FavoriteService.getFavoriteId = function (objId,objType) {
    return "" + FavoriteApi.IsoneModulesEngine.favoriteService.getFavoriteId(objId, objType);
};

/**
 * 返回收藏数量
 * @param userId
 * @param objType
 * @returns {*}
 */
FavoriteService.getMemberFavoriteToTalCount = function(userId,objType){
    return FavoriteApi.IsoneModulesEngine.favoriteService.getMemberFavoriteToTalCount(userId,objType);
};







