
var ProductCreditApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules.credit
);

/**
 * 获取商品评价相关
 * @namespace
 * @type {Object}
 */
var ProductCreditService = {};

/**
 * 获得商品当前的评价等级数据
 *
 * @param productId
 * @return
 */
ProductCreditService.getCredit=function(productId){
    return ProductCreditApi.ProductCreditUtil.getCredit(productId);
}
/**
 *  总评价数量
 * @param jCredit
 * @returns {string}
 */
ProductCreditService.getDescAmount=function(jCredit){
    return ""+ProductCreditApi.ProductCreditUtil.getDescAmount(jCredit);
};
/**
 *  好评数量
 * @param jCredit
 * @returns {string}
 */
ProductCreditService.getPositiveCommentAmount=function(jCredit){
    return ""+ProductCreditApi.ProductCreditUtil.getPositiveCommentAmount(jCredit);
};
/**
 *  好评率
 * @param jCredit
 * @returns {string}
 */
ProductCreditService.getPositiveCommentRate=function(jCredit){
    return ""+ProductCreditApi.ProductCreditUtil.getPositiveCommentRate(jCredit);
};
/**
 *  中评数量
 * @param jCredit
 * @returns {string}
 */
ProductCreditService.getModerateCommentAmount=function(jCredit){
    return ""+ProductCreditApi.ProductCreditUtil.getModerateCommentAmount(jCredit);
};
/**
 *  中评率
 * @param jCredit
 * @returns {string}
 */
ProductCreditService.getModerateCommentRate=function(jCredit){
    return ""+ProductCreditApi.ProductCreditUtil.getModerateCommentRate(jCredit);
};
/**
 *  差评数量
 * @param jCredit
 * @returns {string}
 */
ProductCreditService.getNegativeCommentAmount=function(jCredit){
    return ""+ProductCreditApi.ProductCreditUtil.getNegativeCommentAmount(jCredit);
};
/**
 *  差评率
 * @param jCredit
 * @returns {string}
 */
ProductCreditService.getNegativeCommentRate=function(jCredit){
    return ""+ProductCreditApi.ProductCreditUtil.getNegativeCommentRate(jCredit);
};

/**
 *  描述相符 : 平均得分
 * @param jCredit
 * @returns {string}
 */
ProductCreditService.getAverageTotalDescStore=function(jCredit){
    return ""+ProductCreditApi.ProductCreditUtil.getAverageTotalDescStore(jCredit);
};

/**
 * 描述相符：星级评价的总数量，比如：1星的评价总数量
 *
 * @param jCredit
 * @param star    ：1,2,3,4,5
 * @return
 * @throws Exception
 */
ProductCreditService.getDescStarCommentAmount=function(jCredit,star){
    return ""+ProductCreditApi.ProductCreditUtil.getDescStarCommentAmount(jCredit,star);
};
/**
 * 描述相符：星级评价的百分比，比如：5星的评价的百分比
 * @param jCredit
 * @param star
 * @returns {string}
 */
ProductCreditService.getDescStarCommentRate=function(jCredit,star){
    return ""+ProductCreditApi.ProductCreditUtil.getDescStarCommentRate(jCredit,star);
};

/**
 * 商品的晒单总评价数
 * @param productId
 */
ProductCreditService.getTotalHasPicAmount=function(productId){
    return ProductCreditApi.ProductCreditUtil.getTotalHasPicAmount(productId);
};







