//#import Util.js


var MessageUtilApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.message,
    Packages.net.xinshi.isone.modules.message.tools
);

/**
 * @constructor
 * @type {Object}
 */
var MessageUtilService = {};

/**
 * 获得发送人姓名
 * @param message
 * @return {*}
 */
MessageUtilService.getFromObjName = function (message) {
    var jMessage = $.toJavaJSONObject(message);
    var s = MessageUtilApi.CommonMessageValueUtil.getFromObjName(jMessage);
    if (!s) {
        return "";
    }

    return s + "";
};

/**
 * 获得接收人姓名
 * @param message
 * @return {*}
 */
MessageUtilService.getToObjName = function (message) {
    var jMessage = $.toJavaJSONObject(message);
    var s = MessageUtilApi.CommonMessageValueUtil.getToObjName(jMessage);
    if (!s) {
        return "";
    }

    return s + "";
};



