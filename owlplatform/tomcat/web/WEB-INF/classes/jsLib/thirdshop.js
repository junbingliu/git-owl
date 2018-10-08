//#import Util.js


var ThirdShopApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules
);

/**
 * @constructor
 * @type {Object}
 */
var ThirdShopService = {};

/**
 * 获得所有的店铺
 * @param merchantId
 * @param platformType
 * @returns {*}
 */
ThirdShopService.getAllShopList = function (merchantId, platformType) {
    var shops = ThirdShopApi.IsoneModulesEngine.openPlatformShopService.getAllShopList(merchantId, platformType);
    return JSON.parse(shops.toString());
};

/**
 * 验证店铺编码是否已经存在
 * @param merchantId
 * @param shopCode
 * @returns {*}
 */
ThirdShopService.isExistShopCode = function (merchantId, shopCode) {
    return ThirdShopApi.IsoneModulesEngine.openPlatformShopCodeService.isExistShopCode(merchantId, shopCode);
};

/**
 * 自动生成一个店铺编码
 * @param merchantId
 * @returns {string}
 */
ThirdShopService.getAutoShopCode = function (merchantId) {
    var shopCode = ThirdShopApi.IsoneModulesEngine.openPlatformShopCodeService.getAutoShopCode(merchantId);
    return shopCode + "";
};

/**
 * 添加店铺
 * @param merchantId
 * @param platformType
 * @param jShopInfo
 * @param userId
 * @returns {string}
 */
ThirdShopService.addShop = function (merchantId, platformType, jShopInfo, userId) {
    var jShop = $.toJavaJSONObject(jShopInfo);
    var shopId = ThirdShopApi.IsoneModulesEngine.openPlatformShopService.addShop(merchantId, platformType, jShop, userId);
    return shopId + "";
};

/**
 * 获得一个店铺
 * @param shopId
 * @returns {*}
 */
ThirdShopService.getShop = function (shopId) {
    var json = ThirdShopApi.IsoneModulesEngine.openPlatformShopService.getShop(shopId);
    return JSON.parse(json.toString());
};

/**
 * 修改店铺
 * @param jShopInfo
 * @returns {*}
 */
ThirdShopService.updateShop = function (jShopInfo) {
    var jShop = $.toJavaJSONObject(jShopInfo);
    ThirdShopApi.IsoneModulesEngine.openPlatformShopService.updateShop(jShop);
};

/**
 * 删除店铺
 * @param merchantId
 * @param platformType
 * @param shopId
 * @returns {*}
 */
ThirdShopService.deleteShop = function (merchantId, platformType, shopId) {
    ThirdShopApi.IsoneModulesEngine.openPlatformShopService.deleteShop(merchantId, platformType, shopId);
};









