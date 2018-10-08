//#import Util.js

var FreeGroupValueUtilServiceApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.freegroup,
    Packages.net.xinshi.isone.modules.freegroup.tools
);

/**
 * @constructor
 * @type {Object}
 */
var FreeGroupValueUtilService = {};

/**
 * 获得套餐部件所有商品
 * @param jPart
 * @param picSize
 * @param defaultPicPath
 * @return {*}
 */
FreeGroupValueUtilService.getPartIncludeProducts = function (jPart, picSize, defaultPicPath) {
    var json = FreeGroupValueUtilServiceApi.FreeGroupPartValueUtil.getPartIncludeProducts(jPart, picSize, defaultPicPath);
    return JSON.parse(json.toString());
};






