//#import ps20.js

var ProductImportOrExportApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules.product.productimport,
    Packages.net.xinshi.isone.modules.product.productexport,
    Packages.net.xinshi.isone.modules.product.tools
);

/**
 * @constructor
 * @type {Object}
 */
var ProductImportOrExportService = {};

/**
 * 商品zip数据包导入
 * @param merchantId
 * @param userId
 * @param config
 * @param zipUrl
 */
ProductImportOrExportService.doImportProductsFromZip = function (merchantId, userId, config, zipUrl) {
    var jConfig = $.JSONObject(config);
    ProductImportOrExportApi.ImportProductFromZipUtil.doImportProducts(merchantId, userId, jConfig, zipUrl);
};
/**
 * 商品zip数据包导入
 * @param merchantId
 * @param userId
 * @param config
 * @param excelUrl
 */
ProductImportOrExportService.doImportProductsFromExcel = function (merchantId, userId, config, excelUrl) {
    var jConfig = $.JSONObject(config);
    ProductImportOrExportApi.ImportProductFromExcelUtil.doImportProducts(merchantId, userId, jConfig, excelUrl);
};

/**
 * 批量上传存放在web服务器中的商品图片并保存到商品中
 * @param merchantId
 * @param userId
 * @param config
 * @param excelUrl
 */
ProductImportOrExportService.doBatchUploadProductImage = function (merchantId, userId, config, excelUrl) {
    var jConfig = $.JSONObject(config);
    ProductImportOrExportApi.ProductBatchUpdateUtil.doBatchUploadProductImage(merchantId, userId, jConfig, excelUrl);
};

/**
 * 批量上传存放在web服务器中的商品描述图片并保存到商品描述中
 * @param merchantId
 * @param userId
 * @param config
 * @param excelUrl
 */
ProductImportOrExportService.doBatchUpdateProductDesc = function (merchantId, userId, config, excelUrl) {
    var jConfig = $.JSONObject(config);
    ProductImportOrExportApi.ProductBatchUpdateUtil.doBatchUpdateProductDesc(merchantId, userId, jConfig, excelUrl);
};

/**
 * 批量修改商品上下架状态
 * @param merchantId
 * @param userId
 * @param config
 * @param excelUrl
 */
ProductImportOrExportService.doBatchUpdateProductPublishState = function (merchantId, userId, config, excelUrl) {
    var jConfig = $.JSONObject(config);
    ProductImportOrExportApi.ProductBatchUpdateUtil.doBatchUpdateProductPublishState(merchantId, userId, jConfig, excelUrl);
};

/**
 * 批量修改特价
 * @param merchantId
 * @param userId
 * @param config
 * @param excelUrl
 */
ProductImportOrExportService.doBatchUpdateSkuSpecialPrice = function (merchantId, userId, config, excelUrl) {
    var jConfig = $.JSONObject(config);
    ProductImportOrExportApi.ProductSkuUpdateUtil.doBatchUpdateSkuSpecialPrice(merchantId, userId, jConfig, excelUrl);
};

/**
 * 批量修改商品主分类
 * @param merchantId
 * @param userId
 * @param config
 * @param excelUrl
 */
ProductImportOrExportService.doBatchUpdateProductMainColumn = function (merchantId, userId, config, excelUrl) {
    var jConfig = $.JSONObject(config);
    ProductImportOrExportApi.ProductBatchUpdateUtil.doBatchUpdateProductMainColumn(merchantId, userId, jConfig, excelUrl);
};

/**
 * 批量修改商品多分类
 * @param merchantId
 * @param userId
 * @param config
 * @param excelUrl
 */
ProductImportOrExportService.doBatchUpdateProductMultiColumn = function (merchantId, userId, config, excelUrl) {
    var jConfig = $.JSONObject(config);
    ProductImportOrExportApi.ProductBatchUpdateUtil.doBatchUpdateProductMultiColumn(merchantId, userId, jConfig, excelUrl);
};

/**
 * 获得批量导入商品title匹配模板
 * @returns {*}
 */
ProductImportOrExportService.getProductImportAutoMathTemplate = function () {
    return getObject("ProductImportAutoMathTemplate_100");
};

/**
 * 导入平台商品主分类
 * @returns {*}
 */
ProductImportOrExportService.doImportMainCategory = function (userId, categoryInfo, config) {
    var jCategoryInfo = $.JSONObject(categoryInfo);
    var jConfig = $.JSONObject(config);
    var jAddResult = ProductImportOrExportApi.IsoneProductEngine.normalProductCategoryImportExecutor.doImportMainCategory(userId, jCategoryInfo, jConfig);
    return JSON.parse(jAddResult.toString());
};



