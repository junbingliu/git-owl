var MapApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.commons.BaiduLocationUtil
);

/**
 * @constructor
 * @type {Object}
 */
var MapService = {};

/**
 * 获取地址对应的地理位置
 * @param address 具体地址
 * @returns {null} {state:'状态码:ok',lat:'经度',lng:'纬度'}
 */
MapService.getLocation = function (address) {
    if (!address) {
        return null;
    }
    return JSON.parse(MapApi.BaiduLocationUtil.getLocation(address) + "");
};
/**
 * 获取IP地址对应的地理位置
 * @param ip 具体IP
 * @returns {null} {state:'状态码:ok',province:'',city:'',district:''}
 */
MapService.getIPLocation = function (ip) {
    if (!ip) {
        return null;
    }
    return JSON.parse(MapApi.BaiduLocationUtil.getIPLocation(ip) + "");
};

MapService.saveLocation = function (merchantId, mapObject) {
    var jMapObject = new MapApi.JSONArray(JSON.stringify(mapObject));
    MapApi.IsoneModulesEngine.baiduMapService.save(jMapObject, merchantId);
};

/**
 * 自动生成一个坐标
 * @returns {string}
 */
MapService.getLocationKey = function () {
    return "" + MapApi.IsoneModulesEngine.baiduMapService.getLocationKey();
};

