//#import Util.js

var FreeGroupServiceApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.freegroup
);

/**
 * @constructor
 * @type {Object}
 */
var FreeGroupService = {};

/**
 * 获得一个自由组合套餐
 * @param freeGroupId
 * @return {*}
 */
FreeGroupService.getFreeGroup = function (freeGroupId) {
    var json = FreeGroupServiceApi.IsoneProductEngine.normalFreeGroupService.getFreeGroup(freeGroupId);
    return JSON.parse(json.toString());
};





