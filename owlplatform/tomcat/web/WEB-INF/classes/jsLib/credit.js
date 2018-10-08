
var CreditApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules.credit
);

/**
 * 商家信用相关api,从评论获取信息，计算出商家的信用得分。
 * @namespace
 * @type {Object}
 */
var CreditService = {};

/**
 * 获得商家当前的信用等级数据
 * @param merchantId
 * @return {*}
 */
CreditService.getCredit = function (merchantId) {
    var json = CreditApi.MerchantCreditUtil.getCredit(merchantId);
    return JSON.parse(json.toString());
};

/**
 * 好评数
 * @param jCredit
 * @return {*}
 */
CreditService.getPositiveCommentAmount = function (jCredit) {
    if (!jCredit) {
        return 0;
    }
    return jCredit.positiveAmount;
};

/**
 * 好评率
 * @param jCredit
 * @return {Number}
 */
CreditService.getPositiveCommentRate = function (jCredit) {
    var value = CreditApi.MerchantCreditUtil.getPositiveCommentRate(jCredit);
    return value + "";
};

/**
 * 中评数
 * @param jCredit
 * @return {*}
 */
CreditService.getModerateCommentAmount = function (jCredit) {
    if (!jCredit) {
        return 0;
    }
    return jCredit.moderateAmount;
};

/**
 * 总差评数
 * @param jCredit
 * @return {*}
 */
CreditService.getNegativeCommentAmount = function (jCredit) {
    if (!jCredit) {
        return 0;
    }
    return jCredit.negativeAmount;
};

/**
 * 获得商家按时间统计的好评、中评、差评数量
 * @param merchantId
 * @return {*}
 */
CreditService.getStatAppraise = function (merchantId) {
    var json = CreditApi.AppraiseSearchUtil.getStatAppraise(merchantId);
    return JSON.parse(json.toString());
};

/**
 * 描述相符 : 平均得分
 * @param jCredit
 * @return {string}
 */
CreditService.getAverageDescStore = function (jCredit) {
    var value = CreditApi.MerchantCreditUtil.getAverageDescStore(jCredit);
    return value + "";
};

/**
 * 描述相符 : 总评价人数
 * @param jCredit
 * @return {string}
 */
CreditService.getDescAmount = function (jCredit) {
    var value = CreditApi.MerchantCreditUtil.getDescAmount(jCredit);
    return value + "";
};

/**
 * 服务态度 : 平均得分
 * @param jCredit
 * @return {string}
 */
CreditService.getAverageServiceStore = function (jCredit) {
    var value = CreditApi.MerchantCreditUtil.getAverageServiceStore(jCredit);
    return value + "";
};

/**
 * 服务态度 : 总评价人数
 * @param jCredit
 * @return {string}
 */
CreditService.getServiceAmount = function (jCredit) {
    var value = CreditApi.MerchantCreditUtil.getServiceAmount(jCredit);
    return value + "";
};

/**
 * 发货速度 : 平均得分
 * @param jCredit
 * @return {string}
 */
CreditService.getAverageRateStore = function (jCredit) {
    var value = CreditApi.MerchantCreditUtil.getAverageRateStore(jCredit);
    return value + "";
};

/**
 * 发货速度 : 总评价人数
 * @param jCredit
 * @return {string}
 */
CreditService.getRateAmount = function (jCredit) {
    var value = CreditApi.MerchantCreditUtil.getRateAmount(jCredit);
    return value + "";
};

/**
 * 商品质量 : 平均得分
 * @param jCredit
 * @return {string}
 */
CreditService.getAverageQualityStore = function (jCredit) {
    var value = CreditApi.MerchantCreditUtil.getAverageQualityStore(jCredit);
    return value + "";
};

/**
 * 商品质量 : 总评价人数
 * @param jCredit
 * @return {string}
 */
CreditService.getQualityAmount = function (jCredit) {
    var value = CreditApi.MerchantCreditUtil.getQualityAmount(jCredit);
    return value + "";
};

/**
 * 售后服务 : 平均得分
 * @param jCredit
 * @return {string}
 */
CreditService.getAverageAfterServiceStore = function (jCredit) {
    var value = CreditApi.MerchantCreditUtil.getAverageAfterServiceStore(jCredit);
    return value + "";
};

/**
 * 售后服务 : 总评价人数
 * @param jCredit
 * @return {string}
 */
CreditService.getAfterServiceAmount = function (jCredit) {
    var value = CreditApi.MerchantCreditUtil.getAfterServiceAmount(jCredit);
    return value + "";
};

/**
 * 描述相符：星级评价的总数量，比如：1星的评价总数量
 * @param jCredit
 * @param star
 * @return {string}
 */
CreditService.getDescStarCommentAmount = function (jCredit, star) {
    var value = CreditApi.MerchantCreditUtil.getDescStarCommentAmount(jCredit, star);
    return value + "";
};

/**
 * 服务态度：星级评价的总数量，比如：1星的评价总数量
 * @param jCredit
 * @param star
 * @return {string}
 */
CreditService.getServiceStarCommentAmount = function (jCredit, star) {
    var value = CreditApi.MerchantCreditUtil.getServiceStarCommentAmount(jCredit, star);
    return value + "";
};

/**
 * 发货速度：星级评价的总数量，比如：1星的评价总数量
 * @param jCredit
 * @param star
 * @return {string}
 */
CreditService.getRateStarCommentAmount = function (jCredit, star) {
    var value = CreditApi.MerchantCreditUtil.getRateStarCommentAmount(jCredit, star);
    return value + "";
};

/**
 * 商品质量：星级评价的总数量，比如：1星的评价总数量
 * @param jCredit
 * @param star
 * @return {string}
 */
CreditService.getQualityStarCommentAmount = function (jCredit, star) {
    var value = CreditApi.MerchantCreditUtil.getQualityStarCommentAmount(jCredit, star);
    return value + "";
};

/**
 * 售后服务：星级评价的总数量，比如：1星的评价总数量
 * @param jCredit
 * @param star
 * @return {string}
 */
CreditService.getAfterServiceStarCommentAmount = function (jCredit, star) {
    var value = CreditApi.MerchantCreditUtil.getAfterServiceStarCommentAmount(jCredit, star);
    return value + "";
};

/**
 * 描述相符：星级评价的百分比，比如：5星的评价的百分比
 * @param jCredit
 * @param star
 * @return {string}
 */
CreditService.getDescStarCommentRate = function (jCredit, star) {
    var value = CreditApi.MerchantCreditUtil.getDescStarCommentRate(jCredit, star);
    return value + "";
};

/**
 * 服务态度：星级评价的百分比，比如：5星的评价的百分比
 * @param jCredit
 * @param star
 * @return {string}
 */
CreditService.getServiceStarCommentRate = function (jCredit, star) {
    var value = CreditApi.MerchantCreditUtil.getServiceStarCommentRate(jCredit, star);
    return value + "";
};

/**
 * 发货速度：星级评价的百分比，比如：5星的评价的百分比
 * @param jCredit
 * @param star
 * @return {string}
 */
CreditService.getRateStarCommentRate = function (jCredit, star) {
    var value = CreditApi.MerchantCreditUtil.getRateStarCommentRate(jCredit, star);
    return value + "";
};

/**
 * 商品质量：星级评价的百分比，比如：5星的评价的百分比
 * @param jCredit
 * @param star
 * @return {string}
 */
CreditService.getQualityStarCommentRate = function (jCredit, star) {
    var value = CreditApi.MerchantCreditUtil.getQualityStarCommentRate(jCredit, star);
    return value + "";
};

/**
 * 售后服务：星级评价的百分比，比如：5星的评价的百分比
 * @param jCredit
 * @param star
 * @return {string}
 */
CreditService.getAfterServiceStarCommentRate = function (jCredit, star) {
    var value = CreditApi.MerchantCreditUtil.getAfterServiceStarCommentRate(jCredit, star);
    return value + "";
};

/**
 * 计算平均得分的百分比
 * @param averageStore : 平均得分
 * @param baseScore    : 基础分
 * @return {string}
 */
CreditService.calcAverageStoreRate = function (averageStore, baseScore) {
    var value = CreditApi.MerchantCreditUtil.calcAverageStoreRate(averageStore, baseScore);
    return value + "";
};





