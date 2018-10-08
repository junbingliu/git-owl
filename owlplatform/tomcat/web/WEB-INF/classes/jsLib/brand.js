var BrandApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.brand.tools,
    Packages.net.xinshi.isone.open.brand,
    Packages.net.xinshi.isone.base,
    Packages.net.xinshi.pigeon.list,
    Packages.java.util
);
/**
 *处理品牌相关函数
 * @namespace
 * @type {{getBrandList:getBrandList,getBrand:getBrand}}
 */


/**
 * 处理品牌相关函数 <br>
 * @namespace
 * @author <a href="">郑国榕</a>
 * @version 1.0
 *
 */
var BrandService = {};

BrandService.Brand = function (data) {
    var data = data || {};
    this.logo = data.logo;
    this.name = data.name;
    this.description = data.description;
    this.tags = data.tags;
    this.columnIds = data.columnIds;
};

/**
 * 获得品牌列表
 * @param columnId
 * @param merchantId
 * @return {JSONObject}
 */
BrandService.getBrandList = function (columnId, merchantId) {
    var iSortList = BrandApi.IsoneModulesEngine.brandService.getBrandList(columnId, merchantId);
    var sortList = iSortList.getRange(0, -1);
    var listData = BrandApi.IsoneModulesEngine.brandService.getListData(sortList, true);
    if (!listData) {
        return null;
    }
    return JSON.parse(listData.toString());
};

/**
 * 根据品牌Id获取品牌对象
 * @param brandId
 * @return {JSONObject}
 */
BrandService.getBrand = function (brandId) {
    var brand = BrandApi.IsoneModulesEngine.brandService.getBrand(brandId);
    if (!brand) {
        return null;
    } else {
        return JSON.parse(brand.toString());
    }
};

/**
 * 添加品牌
 * @param brandInfo
 * @param operatorId
 * @param config
 * @returns {*}
 */
BrandService.addBrand = function (brandInfo, operatorId, config) {
    var jBrandInfo = $.JSONObject(brandInfo);
    var jConfig = $.JSONObject(config);
    var brand = BrandApi.BrandAddUtil.addBrand(jBrandInfo, operatorId, jConfig);
    if (!brand) {
        return {code: "99", msg: "操作出现异常"};
    } else {
        return JSON.parse(brand.toString());
    }
};

/**
 * 修改品牌
 * @param brandId
 * @param brandInfo
 * @param operatorId
 * @param config
 * @returns {*}
 */
BrandService.updateBrand = function (brandId, brandInfo, operatorId, config) {
    var jBrandInfo = $.JSONObject(brandInfo);
    var jConfig = $.JSONObject(config);
    var brand = BrandApi.BrandUpdateUtil.updateBrand(brandId, jBrandInfo, operatorId, jConfig);
    if (!brand) {
        return {code: "99", msg: "操作出现异常"};
    } else {
        return JSON.parse(brand.toString());
    }
};

/**
 * 删除品牌
 * @param brandId
 * @param operatorId
 * @returns {*}
 */
BrandService.deleteBrand = function (brandId, operatorId) {
    var brand = BrandApi.BrandDelete.deleteBrand(brandId, operatorId);
    if (!brand) {
        return {code: "99", msg: "操作出现异常"};
    } else {
        return JSON.parse(brand.toString());
    }
};
