var ProductAttrApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.base,
    Packages.net.xinshi.isone.functions.dynaattr,
    Packages.net.xinshi.isone.base.dynaattr,
    Packages.net.xinshi.pigeon.adapter
);

var ProductAttrService = {};


/**
 * 批量修改商品信息
 * @param merchantId 商家Id
 * @param userId 会员Id
 * @param jProductInfo 商品信息
 * @param jConfig 配置信息
 */
ProductAttrService.doUpdateProduct = function (merchantId, userId, jProductInfo, jConfig) {
    if (!merchantId || !userId || !jProductInfo || !jConfig) {
        return;
    }
    jProductInfo = $.toJavaJSONObject(jProductInfo);
    jConfig = $.toJavaJSONObject(jConfig);
    var result = ProductAttrApi.IsoneProductEngine.normalProductImportExecutor.doUpdateProduct(merchantId, userId, jProductInfo, jConfig);
    return JSON.parse(result + "");
};

ProductAttrService.getAllAttrDics = function(){
    var s = "" + ProductAttrApi.StaticPigeonEngine.pigeon.getFlexObjectFactory().getContent("allAttrDics");
    return JSON.parse(s);
};

ProductAttrService.addAttrDic = function(name){
    var attr = {name:name};
    var jattr = $.JSONObject(attr);
    var id = "" +ProductAttrApi.IsoneBaseEngine.dynaAttrService.addAttr(jattr);
    var attrDics = ProductAttrService.getAllAttrDics();
    if(!attrDics){
        attrDics = {};
    }
    attrDics[name] = id;
    ProductAttrApi.StaticPigeonEngine.pigeon.getFlexObjectFactory().saveContent("allAttrDics",JSON.stringify(attrDics));
    return id;
};