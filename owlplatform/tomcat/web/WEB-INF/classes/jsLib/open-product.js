var OpenProductApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.open.product,
    Packages.net.xinshi.isone.modules.product.tools
);

/**
 * @constructor
 * @type {Object}
 */
var OpenProductService = {};

/**
 * 添加商品
 * @param merchantId
 * @param productInfo
 * @returns {*}
 */
OpenProductService.addProduct = function (merchantId, productInfo) {
    var jProductInfo = $.JSONObject(productInfo);
    var json = OpenProductApi.ProductAdd.addProduct(merchantId, jProductInfo);
    return JSON.parse(json.toString());
};

/**
 * 修改商品
 * @param productId
 * @param productInfo
 * @returns {*}
 */
OpenProductService.updateProduct = function (productId, productInfo) {
    var jProductInfo = $.JSONObject(productInfo);
    var json = OpenProductApi.ProductUpdate.updateProduct(productId, jProductInfo);
    return JSON.parse(json.toString());
};

/**
 * 商品上架
 * @param productId
 * @returns {*}
 */
OpenProductService.updateProductToUp = function (productId) {
    var json = OpenProductApi.ProductPublishUp.updateProductToUp(productId);
    return JSON.parse(json.toString());
};

/**
 * 商品下架
 * @param productId
 * @returns {*}
 */
OpenProductService.updateProductToDown = function (productId) {
    var json = OpenProductApi.ProductPublishDown.updateProductToDown(productId);
    return JSON.parse(json.toString());
};

/**
 * 商品批量上架
 * @param productIds
 * @returns {*}
 */
OpenProductService.batchUpdateProductToUp = function (productIds) {
    var json = OpenProductApi.ProductBatchPublishUp.batchUpdateProductToUp(productIds);
    return JSON.parse(json.toString());
};

/**
 * 商品批量下架
 * @param productIds
 * @returns {*}
 */
OpenProductService.batchUpdateProductToDown = function (productIds) {
    var json = OpenProductApi.ProductPublishDown.batchUpdateProductToDown(productIds);
    return JSON.parse(json.toString());
};

/**
 * 根据SKU内部ID获得库存比例
 * @param skuId
 * @returns {*}
 */
OpenProductService.getSkuRatio = function (skuId) {
    var json = OpenProductApi.SkuRatioGet.getSkuRatio(skuId);
    return JSON.parse(json.toString());
};

/**
 * 根据SKU外部ID获得库存比例
 * @param merchantId
 * @param realSkuId
 * @returns {*}
 */
OpenProductService.getSkuRatioByRealSkuId = function (merchantId, realSkuId) {
    var json = OpenProductApi.SkuRatioGet.getSkuRatioByRealSkuId(merchantId, realSkuId);
    return JSON.parse(json.toString());
};

/**
 * 设置/修改SKU的数量比例
 * @param merchantId
 * @param curRealSkuId
 * @param baseRealSkuId
 * @param ratio
 * @returns {*}
 */
OpenProductService.updateSkuRatio = function (merchantId, curRealSkuId, baseRealSkuId, ratio) {
    var json = OpenProductApi.SkuRatioUpdate.updateSkuRatio(merchantId, curRealSkuId, baseRealSkuId, ratio);
    return JSON.parse(json.toString());
};

/**
 * 添加SKU的特价(方法命名错误，稍后会删除掉)
 * @param paramInfo
 * @returns {*}
 */
OpenProductService.updateSkuPrice = function (paramInfo) {
    var jParams = $.JSONObject(paramInfo);
    var json = OpenProductApi.SkuAddSpecialPrice.addSkuSpecialPrice(jParams);
    return JSON.parse(json.toString());
};

/**
 * 添加SKU的价格
 * @param paramInfo
 * @returns {*}
 */
OpenProductService.addSkuPrice = function (paramInfo) {
    var jParams = $.JSONObject(paramInfo);
    var json = OpenProductApi.SkuAddPrice.addSkuPrice(jParams);
    return JSON.parse(json.toString());
};

/**
 * 添加SKU的特价
 * @param paramInfo
 * @returns {*}
 */
OpenProductService.addSkuSpecialPrice = function (paramInfo) {
    var jParams = $.JSONObject(paramInfo);
    var json = OpenProductApi.SkuAddSpecialPrice.addSkuSpecialPrice(jParams);
    return JSON.parse(json.toString());
};

/**
 * 添加SKU的供货特价
 * @param paramInfo
 * @constructor
 */
OpenProductService.addSkuSpecialSupplyPrice = function (paramInfo) {
    var jParams = $.JSONObject(paramInfo);
    var json = OpenProductApi.SkuAddSpecialSupplyPrice.addSkuSpecialSupplyPrice(jParams);
    return JSON.parse(json.toString());
};


/**
 * 根据priceValueId或者erpPromotionId删除价格
 * @param paramInfo
 * @returns {*}
 */
OpenProductService.deleteSkuPrice = function (paramInfo) {
    var jParams = $.JSONObject(paramInfo);
    var json = OpenProductApi.SkuDeletePrice.deleteSkuPrice(jParams);
    return JSON.parse(json.toString());
};


/**
 * 根据priceValueId或者erpPromotionId删除特价
 * @param paramInfo
 * @returns {*}
 */
OpenProductService.deleteSkuSpecialPrice = function (paramInfo) {
    var jParams = $.JSONObject(paramInfo);
    var json = OpenProductApi.SkuDeleteSpecialPrice.deleteSkuSpecialPrice(jParams);
    return JSON.parse(json.toString());
};

/**
 * 修改SKU信息（包括SKU外部ID、条形码、库存、价格）
 * @param merchantId
 * @param skuInfo
 * @param userId
 * @param config
 * @returns {*}
 */
OpenProductService.updateSku = function (merchantId, skuInfo, userId, config) {
    var jSkuInfo = $.JSONObject(skuInfo);
    var jConfig = $.JSONObject(config);
    var json = OpenProductApi.ProductSkuUpdateUtil.updateSku(merchantId, jSkuInfo, userId, jConfig);
    return JSON.parse(json.toString());
};

/**
 * 添加SKU信息到指定的商品
 * @param sku
 * @param config
 * @returns {*}
 */
OpenProductService.addSku = function (sku, config) {
    var jSkuInfo = $.JSONObject(sku);
    var jConfig = $.JSONObject(config);
    var json = OpenProductApi.SkuAdd.addSku(jSkuInfo, jConfig);
    return JSON.parse(json.toString());
};

/**
 * 批量添加SKU
 * @param skus ：这里是一个string类型
 * @returns {*}
 */
OpenProductService.batchAddSku = function (skus) {
    var json = OpenProductApi.SkuBatchAdd.batchAddSku(skus);
    return JSON.parse(json.toString());
};

/**
 * 批量添加SKU
 * @param skus ：这里是一个json类型
 * @param config ：这里是一个json类型
 * @returns {*}
 */
OpenProductService.batchAddSkuByJSON = function (skus, config) {
    var jSkus = $.JSONArray(skus);
    var jConfig = $.JSONObject(config);
    var json = OpenProductApi.SkuBatchAdd.batchAddSku(jSkus, jConfig);
    return JSON.parse(json.toString());
};

/**
 * 批量添加或者修改SKU
 * @param skus ：这里是一个string类型
 * @returns {*}
 */
OpenProductService.batchAddOrUpdateSku = function (skus) {
    var json = OpenProductApi.SkuBatchAdd.batchAddOrUpdateSku(skus);
    return JSON.parse(json.toString());
};

/**
 * 修改SKU的可卖数
 * @param paramInfo
 * @returns {*}
 */
OpenProductService.updateSkuSellableCount = function (paramInfo) {
    var jParams = $.JSONObject(paramInfo);
    var json = OpenProductApi.SkuUpdateQuantity.updateSkuSellableCount(jParams);
    return JSON.parse(json.toString());
};

/**
 * 添加商品分类
 * @param paramInfo
 * @returns {*}
 */
OpenProductService.addCategory = function (paramInfo) {
    var jParams = $.JSONObject(paramInfo);
    var json = OpenProductApi.CategoryAdd.addCategory(jParams);
    return JSON.parse(json.toString());
};

