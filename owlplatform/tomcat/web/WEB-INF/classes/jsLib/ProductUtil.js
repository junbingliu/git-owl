//#import column.js

var ProductUtilApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.product,
    Packages.net.xinshi.isone.modules.product.tools
);

var ProductUtilService = {};

/**
 * 获得商品的所有营销分类
 * @param productId
 * @returns {Array}
 */
ProductUtilService.getCustomColumnIds = function (productId) {
    var cList = ProductUtilApi.IsoneModulesEngine.productService.getMultiColumnList(productId);
    var list = cList.getRange(0, -1);
    var ids = [];
    for (var i = 0; i < list.size(); i++) {
        var columnId = list.get(i).getObjid() + "";
        var jColumn = ColumnService.getColumn(columnId);
        if (!jColumn) {
            continue;
        }
        if (jColumn.columntype && jColumn.columntype == "coltype_m_productList") {
            ids.push(columnId);
        }
    }

    return ids;
};
/**
 * 判断商品是否属于某个分类下
 * @param productId 商品ID
 * @param columnId 分类ID
 * @returns {boolean} true 是,false 否
 */
ProductUtilService.checkProductBelongCategory = function (productId, columnId) {
    if (!productId || !columnId) {
        return false;
    }
    return ProductUtilApi.ProductUtil.checkProductBelongCategory(productId, columnId);
};

/**
 * 获得商品的品牌名称
 * @param product
 * @returns {string}
 */
ProductUtilService.getBrandName = function (product) {
    var jProduct = $.toJavaJSONObject(product);
    var brandName = ProductUtilApi.ProductValueUtil.getBrandName(jProduct);
    return brandName + "";
};

/**
 * 商品是否可发布
 * @param productId
 * @param product
 * @returns {string}
 */
ProductUtilService.isCanPublish = function (productId, product) {
    var jProduct = $.toJavaJSONObject(product);
    return ProductUtilApi.ProductUtil.isCanPublish(productId, jProduct);
};
/**
 * 获取商品所有的分类
 * @param productId
 * @returns {string}
 */
ProductUtilService.getStringColumnIds = function (productId) {
    if(!productId){
        return null;
    }
    return ProductUtilApi.ProductUtil.getStringColumnIds(productId) + "";
};

/**
 * 添加到营销分类
 * @param productId
 * @param columnId
 * @param merchantId
 */
ProductUtilService.add2CustomColumns = function (productId, columnId, merchantId) {
    if(!productId || !columnId || !merchantId){
        return;
    }
    ProductUtilApi.IsoneModulesEngine.productService.add2CustomColumns(productId, columnId, merchantId, false);
};

/**
 * 把商品从自定义分类中删除
 * @param productId
 * @param columnId
 * @param merchantId
 */
ProductUtilService.deleteFromCustomColumns = function (productId, columnId, merchantId) {
    if(!productId || !columnId || !merchantId){
        return;
    }
    ProductUtilApi.IsoneModulesEngine.productService.deleteFromCustomColumns(productId, columnId, merchantId, false);
};
