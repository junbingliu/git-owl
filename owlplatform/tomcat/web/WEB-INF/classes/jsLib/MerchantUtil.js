var MerchantUtilApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules.merchant
);

/**
 * @namespace
 */
var MerchantUtilService = {};

/**
 * 保存商家商品全局公告
 * @param merchantId
 * @param content
 * @return {*}
 */
MerchantUtilService.saveGlobalProductNotice = function (merchantId, content) {
    MerchantUtilApi.MerchantSysArgumentUtil.saveGlobalProductNotice(merchantId, content);
};

/**
 * 获得商家商品全局公告
 * @param merchantId
 * @returns {string}
 */
MerchantUtilService.getGlobalProductNotice = function (merchantId) {
    var s = MerchantUtilApi.MerchantSysArgumentUtil.getGlobalProductNotice(merchantId);
    return s + "";
};

/**
 * 商家是否可在前台被搜索到，
 * 这个状态是由审核状态、发布状态、冻结状态、删除状态决定的
 * @param merchant
 * @returns {string}
 */
MerchantUtilService.isCanBePublish = function (merchant) {
    var jMerchant = $.toJavaJSONObject(merchant);
    return MerchantUtilApi.MerchantUtil.isCanBePublish(jMerchant);
};

/**
 * 是否跨境商家
 * @param merchant
 */
MerchantUtilService.isCrossBorder = function (merchant) {
    var jMerchant = $.toJavaJSONObject(merchant);
    return MerchantUtilApi.MerchantUtil.isCrossBorder(jMerchant);
};

/**
 * 是否跨境直邮商家
 * @param merchant
 */
MerchantUtilService.isCrossDirectMail = function (merchant) {
    var jMerchant = $.toJavaJSONObject(merchant);
    return MerchantUtilApi.MerchantUtil.isCrossDirectMail(jMerchant);
};


/**
 * 获取商家经营的所有二级分类
 * @param merchantId
 * @returns {*}
 */
MerchantUtilService.getBusinessSecondColumnList = function (merchantId) {
    var json = MerchantUtilApi.MerchantUtil.getBusinessSecondColumnList(merchantId);
    return JSON.parse(json.toString());
};

/**
 * 复制用户的所有角色到目标用户中
 * @param merchantId
 * @param userId
 * @param objUserId
 */
MerchantUtilService.copyUserRolesToUser = function (merchantId, userId, objUserId) {
    return MerchantUtilApi.MerchantGradeRoleUtil.copyUserRolesToUser(merchantId, userId, objUserId);
};



