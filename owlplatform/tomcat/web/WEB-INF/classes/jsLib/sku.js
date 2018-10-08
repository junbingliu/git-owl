//#import Util.js

var SkuApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.price
);

/**
 * @constructor
 * @type {Object}
 */
var SkuService = {};


/**
 * 根据ERP编码获取商品ID
 * @param merchantId
 * @param realSkuId
 * @return {*}
 */
SkuService.getProductIdByRealSkuId = function (merchantId, realSkuId) {
    var s = SkuApi.IsoneModulesEngine.pskuService.getProductId(merchantId, realSkuId);
    return s + "";
};

/**
 * 根据SKU内部ID获取商品ID
 * @param skuId
 * @return {*}
 */
SkuService.getProductIdBySkuId = function (skuId) {
    var s = SkuApi.IsoneModulesEngine.pskuService.getProductId(skuId);
    return s + "";
};

/**
 * 根据商品ID获取默认SKU
 * @param productId
 * @returns {string}
 */
SkuService.getHeadSkuByProductId = function (productId) {
    var json = SkuApi.SkuUtil.getHeadSku(productId);
    return JSON.parse(json);
};

/**
 * 根据商品所有SKU获取默认SKU
 * @param skus
 * @returns {*}
 */
SkuService.getHeadSku = function (skus) {
    var json = SkuApi.SkuUtil.getHeadSku(skus);
    return JSON.parse(json);
};

SkuService.add = function(productId,sku){
    var json = $.toJavaJSONObject(sku);
    SkuApi.IsoneModulesEngine.pskuService.addSku(productId,sku);
}
/**
 * 根据ERP编码获取SKU
 * @param skus
 * @param realSkuId
 * @returns {*}
 */
SkuService.getSkuByRealSkuId = function (skus, realSkuId) {
    var json = SkuApi.SkuUtil.getSkuByRealSkuId(skus, realSkuId);
    return JSON.parse(json);
};

/**
 * 根据ERP编码获取SKU
 * @param productId 商品ID
 * @param realSkuId SKU编码
 * @returns {*}
 */
SkuService.getSkuByRealSkuIdEx = function (productId, realSkuId) {
    var skus = SkuApi.IsoneModulesEngine.pskuService.getAllList(productId);
    return SkuService.getSkuByRealSkuId(skus, realSkuId);
};

/**
 * 根据SKU内部ID获取SKU
 * @param skus
 * @param skuId
 * @returns {*}
 */
SkuService.getSkuBySkuId = function (skus, skuId) {
    var json = SkuApi.SkuUtil.getSkuBySkuId(skus, skuId);
    return JSON.parse(json);
};

/**
 * 根据打包skuId和外部编码获取Sku对象
 * @param skuId sku内部Id
 * @returns {*} SKU对象
 */
SkuService.getSkuBySkuIdEx = function (skuId) {
    if (!skuId) {
        return null;
    }
    var productId = SkuService.getProductIdBySkuId(skuId);
    if (!productId) {
        return null;
    }
    var skus = SkuApi.IsoneModulesEngine.pskuService.getAllList(productId);
    return SkuService.getSkuBySkuId(skus, skuId);
};

/**
 * 根据商品ID获取商品的所有SKU（注意：这里返回的是java对象的List）
 * @param productId
 * @returns {*}
 */
SkuService.getProductSkuList = function (productId) {
    return SkuApi.IsoneModulesEngine.pskuService.getAllList(productId);
};

/**
 * 根据商品ID获取商品的所有SKU（注意：这里返回的是JS对象的数组）
 * @param productId
 * @returns {*}
 */
SkuService.getAllList = function (productId) {
    var r = [];
    var dataList = SkuApi.IsoneModulesEngine.pskuService.getAllList(productId);
    for (var i = 0; i < dataList.size(); i++) {
        r.push(JSON.parse(dataList.get(i).toString() + ""));
    }
    return r;
};

/**
 * 根据SKU获得SKU的库存属性，如：颜色：红色，尺码：大码
 * @param sku
 * @returns {string}
 */
SkuService.getAttrsValueBySku = function (sku) {
    var jParams = $.toJavaJSONObject(sku);
    var s = SkuApi.SkuUtil.getAttrsValueBySku(jParams);
    return s + "";
};

/**
 * 获取SKU的库存属性，返回格式为【attr_101:sv_201,attr_102:sv_202】
 * @param sku
 * @returns {string}
 */
SkuService.getSkuAttrs = function (sku) {
    var jParams = $.toJavaJSONObject(sku);
    var s = SkuApi.SkuUtil.getSkuAttrs(jParams);
    return s + "";
};

/**
 * 获取SKU的库存属性，返回格式为【颜色:红色,尺码:大码】
 * @param product
 * @param sku
 * @returns {string}
 */
SkuService.getSkuAttrNames = function (product,sku) {
    var jProduct = $.toJavaJSONObject(product);
    var jSku = $.toJavaJSONObject(sku);
    var s = SkuApi.SkuUtil.getSkuAttrNames(jProduct,jSku);
    return s + "";
};

/**
 * 根据条形码获得sku对象
 * @param skus
 * @param barcode
 * @returns {*}
 */
SkuService.getSkuByBarcode = function (skus, barcode) {
    var json = SkuApi.SkuUtil.getSkuByBarcode(skus, barcode);
    return JSON.parse(json);
};
/**
 * 根据条形码获得sku比例对象
 * @param skuId
 * @returns {*}
 */
SkuService.getRatio = function (skuId) {
    if (!skuId) {
        return null;
    }
    var json = SkuApi.IsoneModulesEngine.pskuService.getSkuRatio(skuId);
    if (json == null) {
        return null;
    }
    return JSON.parse(json + "");
};

/**
 * 根据商品ID和SKU内部ID获取SKU
 * @param productId 商品ID
 * @param skuId 物料ID
 * @returns {*} 对象
 */
SkuService.getSkuById = function (productId, skuId) {
    var json = SkuApi.SkuUtil.getSkuById(productId, skuId);
    if (!json) {
        return null;
    }
    return JSON.parse(json + "");
};

/**
 * 获得sku所有仓库的实际库存
 * @param skuId
 */
SkuService.getSkuAllQuantity = function (skuId) {
    var json = SkuApi.IsoneProductEngine.normalPSkuQuantityService.getSkuAllQuantity(skuId);
    if (!json) {
        return null;
    }
    return JSON.parse(json.toString());
};

/**
 * 根据仓库ID获得sku在该仓库的实际库存
 * @param skuId
 * @param storeId
 */
SkuService.getSkuQuantityByStoreId = function (skuId, storeId) {
    return SkuApi.IsoneProductEngine.normalPSkuQuantityService.getSkuQuantityByStoreId(skuId, storeId);
};

/**
 * 根据skuId和仓库ID增减库存
 * @param skuId
 * @param storeId
 * @param quantity
 */
SkuService.increaseSkuQuantity = function (skuId, storeId, quantity) {
    SkuApi.IsoneProductEngine.normalPSkuQuantityService.increaseSkuQuantity(skuId, storeId, quantity);
};

/**
 * 根据skuId和仓库ID修改库存
 * @param skuId
 * @param storeId
 * @param quantity
 */
SkuService.updateSkuQuantity = function (skuId, storeId, quantity) {
    SkuApi.IsoneProductEngine.normalPSkuQuantityService.updateSkuQuantity(skuId, storeId, quantity);
};

/**
 * 根据打包skuId和外部编码获取基准SKU编码,如果没有配置数量比例，则返回SKU本身
 * @param skuId sku内部Id
 * @param realSkuId sku外部编码
 * @returns {*} 基准sku编码
 */
SkuService.getBaseRealSkuId = function (skuId, realSkuId) {
    if (!skuId || !realSkuId) {
        return realSkuId;
    }

    return SkuApi.SkuRatioUtil.getBaseRealSkuId(skuId, realSkuId) + "";
};

/**
 * 获得基准SKU对应的所有关联skuIds
 * @param baseSkuId
 * @returns {*}
 */
SkuService.getAllBaseSkuRelativeSkuIds = function (baseSkuId) {
    var json =  SkuApi.SkuRatioUtil.getAllBaseSkuRelativeSkuIds(baseSkuId);
    if(json){
        return JSON.parse(json);
    }
    return null;
};

/**
 * 修改商品的SKU信息
 * @param productId
 * @param skuId
 * @param jSku
 * @returns {*}
 */
SkuService.updateSku = function (productId,skuId,jSku) {
    if(!productId || !jSku){
        return false;
    }
    if(!skuId){
        skuId = jSku.id;
    }
    if(!skuId){
        return false;
    }
    SkuApi.IsoneModulesEngine.pskuService.updateSku(productId,skuId, $.toJavaJSONObject(jSku));
    return true;
};


SkuService.saveSkuId2ProductId = function(productId, skuId){
  SkuApi.IsoneModulesEngine.code2ProductService.saveSkuId2ProductId(productId, skuId);
}

SkuService.saveRealSkuId2ProductId = function(merchantId, productId, skuId, realSkuId){
  SkuApi.IsoneModulesEngine.code2ProductService.saveRealSkuId2ProductId(merchantId, productId, skuId, realSkuId);
}


SkuService.getNewId = function(){
  return "" + SkuApi.IsoneModulesEngine.pskuService.getNewId();
}

SkuService.getRealSkuId = function(merchantId){
  return "" + SkuApi.IsoneModulesEngine.pskuService.getRealSkuId(merchantId);
}
