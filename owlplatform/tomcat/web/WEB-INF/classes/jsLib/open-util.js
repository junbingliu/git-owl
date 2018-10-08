var OpenUtilApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.commons,
    Packages.net.xinshi.isone.open.product,
    Packages.net.xinshi.isone.open.tools
);

/**
 * @constructor
 * @type {Object}
 */
var OpenUtilService = {};

/**
 * 排序
 * @param records
 * @param sortKey : 排序的字段
 * @param reverse : true 为倒序（从大到小），否则升序（从小到大）
 * @returns {*}
 */
OpenUtilService.sortList = function (records, sortKey, reverse) {
    var jRecords = $.toJSONObjectList(records);
    var json = OpenUtilApi.Util.sortList(jRecords, sortKey, reverse);
    return JSON.parse(json.toString());
};

/**
 * 根据图片URL转换成URL可识别的base64字符串
 * @param imageUrl
 * @returns {string}
 */
OpenUtilService.getImageBase64 = function (imageUrl) {
    var s = OpenUtilApi.Util.getImageBase64(imageUrl);
    return s + "";
};

/**
 * 分析html内容，上传图片并替换路径返回
 * @param merchantId
 * @param targetPlatform
 * @param htmlContent
 * @returns {string}
 */
OpenUtilService.uploadHtmlContentImages = function (merchantId, targetPlatform, htmlContent) {
    var s = OpenUtilApi.CommonUtil.uploadHtmlContentImages(merchantId, targetPlatform, htmlContent);
    return s + "";
};

/**
 * 把JSON按照key的字母先后顺序排序
 * @param paramInfo
 * @returns {string}
 */
OpenUtilService.getSortedParamJson = function (paramInfo) {
    var jParamInfo = $.JSONObject(paramInfo);
    var s = OpenUtilApi.SecureSignHelper.getSortedParamJson(jParamInfo);
    return s + "";
};

/**
 * 根据规范生成加密的签名
 * @param app_key
 * @param app_secret
 * @param format
 * @param method
 * @param param_json
 * @param timestamp
 * @param v
 * @returns {string}
 */
OpenUtilService.md5Sign = function (app_key, app_secret, format, method, param_json, timestamp, v) {
    var s = OpenUtilApi.SecureSignHelper.md5Sign(app_key, app_secret, format, method, param_json, timestamp, v);
    return s + "";
};




