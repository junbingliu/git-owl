
var SoapApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.open.soap
);

/**
 * @constructor
 * @type {Object}
 */
var SoapService = {};

/**
 * 提交xml格式报文，并根据返回的xml格式数据转换成JSON返回
 * @param url
 * @param xmlData
 * @returns {*}
 */
SoapService.soapPost = function (url, xmlData) {
    var json = SoapApi.SoapUtil.soapPost(url, xmlData);
    if(!json){
        return null;
    }
    return JSON.parse(json.toString());
};

/**
 * 提交JSON格式报文
 * @param url
 * @param jsonData
 * @returns {*}
 */
SoapService.soapJsonPost = function (url, jsonData) {
    var json = SoapApi.SoapUtil.soapPost(url, jsonData);
    if(!json){
        return null;
    }
    return JSON.parse(json.toString());
};

/**
 * 获取soap报文数据，以xml格式的字符串方式返回
 * @param request
 * @returns {string}
 */
SoapService.soapXmlRequest = function (request) {
    var json = SoapApi.SoapUtil.soapXmlRequest(request);
    if(!json){
        return "";
    }
    return json + "";
};

/**
 * 获取soap报文数据，以JSON格式的字符串方式返回
 * @param request
 * @returns {*}
 */
SoapService.soapJsonRequest = function (request) {
    var json = SoapApi.SoapUtil.soapJsonRequest(request);
    if(!json){
        return null;
    }
    return JSON.parse(json.toString());
};




