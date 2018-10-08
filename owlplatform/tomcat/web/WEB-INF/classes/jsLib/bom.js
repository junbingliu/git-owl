var BomApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.base,
    Packages.net.xinshi.isone.modules.bom

);

var bomService = {};

/**
 * 根据小商品获取所有组合套餐的集合（前台商品详细页使用）
 * @param columnId
 * @param merchantId
 * @param productId
 * @param count
 * @returns {*}
 */
bomService.getCBNListByProductId=function(columnId, merchantId, productId,count){
    var result=BomApi.BomUtil.getCBNListByProductId(columnId,merchantId,productId,count);
    return JSON.parse(result.toString());
};

/**
 * 获取某个套餐商品的子商品
 *
 * @param objid 组合套餐大商品的商品id(productid)
 * @return
 * @throws Exception
 */
bomService.getListByObjid=function(id){
    var result=BomApi.BomUtil.getListByObjid(id);
    return JSON.parse(result.toString());
};