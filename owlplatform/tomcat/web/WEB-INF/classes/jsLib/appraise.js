//#import Util.js


var AppraiseApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.credit,
    Packages.net.xinshi.isone.modules.credit.appraise
);

/**
 * @constructor
 * @type {Object}
 */
var AppraiseService = {};


/**
 * 获取商品评论
 * @param searchArgs
 * @return {*}
 */
AppraiseService.getProductAppraiseList = function (searchArgs) {
    var jParams = $.toJavaJSONObject(searchArgs);
    var json = AppraiseApi.AppraiseSearchUtil.getProductAppraiseList(jParams);
    return JSON.parse(json.toString());
};

/**
 * 获取商品售后服务评论
 * @param searchArgs
 * @return {*}
 */
AppraiseService.getProductAfterServiceAppraiseList = function (searchArgs) {
    var jParams = $.toJavaJSONObject(searchArgs);
    var json = AppraiseApi.AppraiseSearchUtil.getProductAfterServiceAppraiseList(jParams);
    return JSON.parse(json.toString());
};

/**
 * 添加商品评价(无需下单对商品的评价)
 * @param buyerUserId
 * @param productId
 * @param comment
 * @return {*}
 */
AppraiseService.addProductAppraise = function (buyerUserId, productId, comment) {
    var jComment = $.toJavaJSONObject(comment);
    var json = AppraiseApi.IsoneCreditEngine.productAppraiseService.addAppraise(buyerUserId, productId, jComment);
    return JSON.parse(json.toString());
};

/**
 * 添加商品评价(订单完成后对商品的评价)
 * @param orderId
 * @param buyerUserId
 * @param productId
 * @param skuId
 * @param comment
 * @return {*}
 */
AppraiseService.addProductAppraiseByOrderId = function (orderId, buyerUserId, productId, skuId, comment) {
    var jComment = $.toJavaJSONObject(comment);
    var json = AppraiseApi.IsoneCreditEngine.productAppraiseService.addAppraise(orderId, buyerUserId, productId, skuId, jComment);
    return JSON.parse(json.toString());
};

/**
 * 追加评论
 * @param apprId
 * @param buyerUserId
 * @param comment
 * @returns {*}
 */
AppraiseService.addProductRelAppraise = function (apprId, buyerUserId, comment) {
    var jComment = $.toJavaJSONObject(comment);
    var json = AppraiseApi.IsoneCreditEngine.productAppraiseService.addRelAppraise(apprId, buyerUserId, jComment);
    return JSON.parse(json.toString());
};

/**
 * 回复评价
 * @param appId
 * @param userId
 * @param jReply
 * @return {*}
 */
AppraiseService.addAppraiseReply = function (appId, userId, jReply) {
    var jParams = new AppraiseApi.JSONObject();
    if (jReply.comment) {
        jParams.put("comment", jReply.comment);
    }
    if (jReply.isAnonymity) {
        jParams.put("isAnonymity", jReply.isAnonymity);
    }
    var json = AppraiseApi.IsoneCreditEngine.productAppraiseService.addAppraiseReply(appId, userId, jParams);
    return JSON.parse(json.toString());
};

/**
 * 删除回复
 * @return {*}
 */
AppraiseService.deleteAppraiseReply = function (appId, userId, replyId) {
    var json = AppraiseApi.IsoneCreditEngine.productAppraiseService.deleteAppraiseReply(appId, userId, replyId);
    return JSON.parse(json.toString());
};

/**
 * 获得一个评价
 * @param appId
 * @return {*}
 */
AppraiseService.getAppraise = function (appId) {
    var json = AppraiseApi.IsoneCreditEngine.productAppraiseService.getAppraise(appId);
    if (!json) {
        return null;
    }
    return JSON.parse(json.toString());
};

/**
 * 获得一个追加评价
 * @param appId
 * @return {*}
 */
AppraiseService.getRelAppraise = function (appId) {
    var json = AppraiseApi.IsoneCreditEngine.productAppraiseService.getRelAppraise(appId);
    if (!json) {
        return null;
    }
    return JSON.parse(json.toString());
};

/**
 * 获得一个商品评价
 * @param productId
 * @param userId
 * @return {*}
 */
AppraiseService.getProductAppraise = function (productId, userId) {
    var json = AppraiseApi.IsoneCreditEngine.productAppraiseService.getAppraise(productId, userId);
    if (!json) {
        return null;
    }
    return JSON.parse(json.toString());
};

/**
 * 获得一个订单商品评价
 * @param orderId
 * @param productId
 * @param skuId
 * @return {*}
 */
AppraiseService.getOrderAppraise = function (orderId, productId, skuId) {
    var json = AppraiseApi.IsoneCreditEngine.productAppraiseService.getAppraise(orderId, productId, skuId);
    if (!json) {
        return null;
    }
    return JSON.parse(json.toString());
};

/**
 * 修改评价的审核状态
 * @param apprId
 * @param userId
 * @param toCertifySate
 * @param reason
 * @return {*}
 */
AppraiseService.updateAppraiseCertifyState = function (apprId, userId, toCertifySate, reason) {
    var json = AppraiseApi.CertifyAppraiseUtil.updateAppraiseCertifyState(apprId, userId, toCertifySate, reason);
    return JSON.parse(json.toString());
};

/**
 * 修改评价回复的审核状态
 * @param apprId
 * @param userId
 * @param replyId
 * @param toCertifySate
 * @param reason
 * @return {*}
 */
AppraiseService.updateAppraiseReplyCertifyState = function (apprId, userId, replyId, toCertifySate, reason) {
    var json = AppraiseApi.CertifyAppraiseUtil.updateAppraiseReplyCertifyState(apprId, userId, replyId, toCertifySate, reason);
    return JSON.parse(json.toString());
};


/**
 * 自动好评默认显示的评价内容
 * @return {string}
 */
AppraiseService.getAutoPositiveCommentContent = function () {
    var value = AppraiseApi.CreditAppraiseArgumentsUtil.getAutoPositiveCommentContent();
    return value + "";
};

/**
 * 增加商家评价
 * @param orderId 订单ID
 * @param buyerUserId 会员ID
 * @param merchantId 商家ID
 * @param jAppraise 商家评价对象
 * @returns {*}
 */
AppraiseService.addMerchantAppraise = function (orderId, buyerUserId, merchantId, jAppraise) {
    if(!jAppraise || !merchantId || !orderId || !buyerUserId){
        return null;
    }
    jAppraise = $.toJavaJSONObject(jAppraise);
    var value = AppraiseApi.IsoneCreditEngine.merchantAppraiseService.addAppraise(orderId, buyerUserId, merchantId, jAppraise);
    return JSON.parse(value + "");
};

/**
 * 获得商家评价
 * @param orderId
 * @param sellerId
 * @returns {*}
 */
AppraiseService.getMerchantAppraise = function (orderId, sellerId) {
    if(!orderId || !sellerId){
        return null;
    }
    var json = AppraiseApi.IsoneCreditEngine.merchantAppraiseService.getAppraise(orderId, sellerId);
    if(!json){
        return null;
    }
    return JSON.parse(json.toString());
};
/**
 * 获得评论的id
 * @param orderId
 * @param productId
 * @param skuId
 * @returns {*}
 */
AppraiseService.getAppraiseId = function (orderId, productId, skuId) {
    var apprId = AppraiseApi.IsoneCreditEngine.productAppraiseService.getAppraiseId(orderId, productId, skuId);
    if(!apprId){
        return null;
    }
    return apprId + "";
};

