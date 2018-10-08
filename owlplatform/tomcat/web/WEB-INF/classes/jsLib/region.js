var RegionApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules.region
);


var RegionService = {};


RegionService.getRegionCity = function (regionId) {
    if (!regionId) {
        return "";
    }
    var name = RegionApi.RegionUtil.getRegionCity(regionId);
    return name + "";
};
/**
 * 获取regionId所对应的省份
 * @param regionId
 * @returns {*}
 */
RegionService.getRegionProvince = function (regionId) {
    if (!regionId) {
        return "";
    }
    var name = RegionApi.RegionUtil.getRegionProvince(regionId);
    return name + "";
};

/**
 * 根据excel格式导入地区
 * @param userId
 * @param config
 * @param excelUrl
 */
RegionService.doImportRegion = function (userId, config, excelUrl) {
    var jConfig = $.JSONObject(config);
    RegionApi.RegionImportUtil.doImportRegion(userId, jConfig, excelUrl);
};

/**
 * 根据地区全路径获取地址ID
 * @param regionFullPath
 * @returns {*}
 */
RegionService.getRegionIdByFullPath = function (regionFullPath) {
    if (!regionFullPath) {
        return "";
    }
    var s = RegionApi.RegionUtil.getRegionIdByFullPath(regionFullPath);
    return s + "";
};

/**
 * 根据地区名称获取地区对象
 * @param regionName 地区名称，必填
 */
RegionService.getRegionByName = function (regionName) {
    if(!regionName){
        return null;
    }
    var result = RegionApi.RegionUtil.getRegionByName(null, regionName);
    if(result){
        return JSON.parse(result + "");
    }
    return null;
};