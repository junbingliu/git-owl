var MerchantAccountApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.merchant,
    Packages.net.xinshi.isone.lucene.search.merchant,
    Packages.net.xinshi.isone.lucene,
    Packages.net.xinshi.isone.commons
);

/**
 * @constructor
 * @type {Object}
 */
var MerchantAccountService = {};

/**
 * 让一个用户和一个商家关联起来，成为商家的管理员
 * @param merId
 * @param userId
 * @return {*}
 */
MerchantAccountService.addAdmin2Merchant = function (merId,userId) {
    MerchantAccountApi.IsoneModulesEngine.merchantAccountService.addAdmin2Merchant(merId,userId);
};

/**
 * 删除一个商家的管理员
 * @param merId
 * @param userId
 * @return {*}
 */
MerchantAccountService.deleteAdmin2Merchant = function (merId,userId) {
    MerchantAccountApi.IsoneModulesEngine.merchantAccountService.deleteAdmin2Merchant(merId,userId);
};

/**
 * 获得一个商家的所有账号（管理员）
 * 返回的是所有的user对象
 * @param merId
 * @param userId
 * @return {*}
 */
MerchantAccountService.getAdminsOfMerchant = function (merId) {
   var admins = MerchantAccountApi.IsoneModulesEngine.merchantAccountService.getAdmin2MerchantsList(merId);
   return JSON.parse(admins.toString());
};

/**
 * 获得一个管理员的所有商家
 * 返回的是所有的商家对象
 * @param merId
 * @param userId
 * @return {*}
 */
MerchantAccountService.getMerchantsOfAdmin = function (userId) {
    var merchants = MerchantAccountApi.IsoneModulesEngine.merchantAdminService.getAllMerchantByAdmin(userId);
    var result = [];
    for(var i=0; i<merchants.size(); i++){
        var o = merchants.get(i);
        var s = "" + o.toString();
        result.push(JSON.parse(s));
    }
    return result;
};










