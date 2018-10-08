var CommendApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.base,
    Packages.net.xinshi.isone.functions.commend,
    Packages.net.xinshi.isone.commons
);

var commendService = {};

/**
 * 获取过该商品的用户还购买过的商品列表
 * @param merchantId
 * @param objId
 * @param objType
 * @param number
 * @returns {*}
 */
commendService.getCommendObjectList = function (merchantId, objId, objType, number) {
    var commentList = CommendApi.CommendFunctions.getCommendObjectList(merchantId, objId, objType, number);
    return JSON.parse(commentList.toString());
};

/**
 * 获取推荐的商品
 * @param merchantId
 * @param objId
 * @param objType
 * @param number
 * @returns {*}
 */
commendService.getCommendObjectListByPage = function (merchantId, objId, objType, offSet, number) {
    var commentList = CommendApi.CommendFunctions.getCommendObjectListByPage(merchantId, objId, objType, offSet, number);
    if (commentList.size() > 0) commentList = CommendApi.Util.toJSONArray(commentList);
    return JSON.parse(commentList.toString());
};
/**
 * 获取推荐的商品,有备注
 * @param merchantId
 * @param objId
 * @param objType
 * @param number
 * @returns {*}
 */
commendService.getCommendLists = function (merchantId, objId, objType, start,number) {
    var commentList = CommendApi.CommendFunctions.getCommendLists(merchantId, objId, objType,start ,number);
    if (commentList.size() > 0) commentList = CommendApi.Util.toJSONArray(commentList);
    return JSON.parse(commentList.toString());
};