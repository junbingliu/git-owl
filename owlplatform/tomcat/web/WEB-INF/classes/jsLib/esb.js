//#import Util.js

var EsbApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.thirdinterface.crc
);

/**
 * @constructor
 * @type {Object}
 */
var EsbService = {};

/**
 * 提交xml格式报文，并根据返回的xml格式数据转换成JSON返回
 * @param url
 * @param xmlData
 * @returns {*}
 */
EsbService.soapPostToESB = function (xmlData) {
    var json = EsbApi.ESBUtil.soapPostToESB(xmlData);
    if (!json) {
        return null;
    }
    return JSON.parse(json.toString());
};

/**
 * 提交xml格式报文，并根据返回的xml格式数据转换成JSON返回
 * @param url
 * @param xmlData
 * @returns {*}
 */
EsbService.soapPost = function (url, xmlData) {
    if (!url || !xmlData) {
        return null;
    }
    var json = EsbApi.ESBUtil.soapPost(xmlData, url);
    if (!json) {
        return null;
    }
    return JSON.parse(json.toString());
};
/**
 * 根据参数生成请求xml
 * @param sn
 * @param mac
 * @param serviceId
 * @param requestData
 * @returns {string}
 */
EsbService.getRequestXml = function (sn, mac, serviceId, requestData) {
    var json = EsbApi.ESBUtil.getRequestXml(sn, mac, serviceId, requestData);
    return json + "";
};

/**
 * 根据参数生成请求xml(含扩展参数)
 * @param sn
 * @param mac
 * @param serviceId
 * @param requestData
 * @param arg1
 * @param arg2
 * @param arg3
 * @param arg4
 * @param arg5
 * @returns {string}
 */
EsbService.getExtRequestXml = function (sn, mac, serviceId, requestData, arg1, arg2, arg3, arg4, arg5) {
    var json = EsbApi.ESBUtil.getExtRequestXml(sn, mac, serviceId, requestData, arg1, arg2, arg3, arg4, arg5);
    if (!json) {
        return "";
    }
    return json + "";
};

/**
 * 根据参数生成相应xml
 * @param returnCode
 * @param returnDesc
 * @param returnData
 * @returns {string}
 */
EsbService.getResponseXml = function (returnCode, returnDesc, returnData) {
    var json = EsbApi.ESBUtil.getResponseXml(returnCode, returnDesc, returnData);
    if (!json) {
        return "";
    }
    return json + "";
};

/**
 * 辅助方法：分析xml转换的对象，直接返回REQUEST_DATA对象(以JSON的方式返回)
 * @param jRequest
 * @returns {*}
 */
EsbService.getEsbRequestDataJSON = function (jRequest) {
    var jParams = $.JSONObject(jRequest);
    var json = EsbApi.ESBUtil.getEsbRequestDataJSON(jParams);
    if (!json) {
        return null;
    }
    return JSON.parse(json.toString());
};

/**
 * 辅助方法：分析xml转换的对象，直接返回REQUEST_DATA对象(以String的方式返回)
 * @param jRequest
 * @returns {string}
 */
EsbService.getEsbRequestData = function (jRequest) {
    var jParams = $.toJavaJSONObject(jRequest);
    var json = EsbApi.ESBUtil.getEsbRequestData(jParams);
    if (!json) {
        return "";
    }
    return json + "";
};

/**
 * 辅助方法：分析xml转换的对象，根据key把Body中的数据以JSON格式返回，比如ESB_ATTRS
 * @param jRequest
 * @param dataKey
 * @returns {*}
 */
EsbService.getEsbRequestDataJsonByKey = function (jRequest, dataKey) {
    var jParams = $.JSONObject(jRequest);
    var json = EsbApi.ESBUtil.getEsbRequestDataJsonByKey(jParams, dataKey);
    if (!json) {
        return null;
    }
    return JSON.parse(json.toString());
};

/**
 * 辅助方法：分析xml转换的对象，根据key把Body中的数据以String格式返回，比如ESB_ATTRS
 * @param jRequest
 * @param dataKey
 * @returns {string}
 */
EsbService.getEsbRequestDataByKey = function (jRequest, dataKey) {
    var jParams = $.JSONObject(jRequest);
    var json = EsbApi.ESBUtil.getEsbRequestDataByKey(jParams, dataKey);
    if (!json) {
        return "";
    }
    return json + "";
};

/**
 * 辅助方法：分析xml转换的对象，直接返回RESPONSE对象
 * @param jResponse
 * @returns {*}
 */
EsbService.getEsbResponse = function (jResponse) {
    var jParams = $.JSONObject(jResponse);
    var json = EsbApi.ESBUtil.getEsbResponse(jParams);
    if (!json) {
        return null;
    }
    return JSON.parse(json.toString());
};

/**
 * 生成请求流水号
 * @returns {string}
 */
EsbService.getSerialNumber = function () {
    var json = EsbApi.ESBUtil.getSerialNumber();
    if (!json) {
        return "";
    }
    return json + "";
};
/**
 * 生成请求流水号
 * @param sid : 请求系统编码
 * @returns {string}
 */
EsbService.getSerialNumberBySid = function (sid) {
    var json = EsbApi.ESBUtil.getSerialNumberBySid(sid);
    if (!json) {
        return "";
    }
    return json + "";
};

/**
 * 根据对象生成翻译表
 * @param oriObject
 * @returns {*}
 */
EsbService.generateTranslateTableJSON = function (oriObject) {
    var jParams = $.JSONObject(oriObject);
    var json = EsbApi.ESBTranslateTableUtil.generateTranslateTableJSON(jParams);
    if (!json) {
        return null;
    }
    return JSON.parse(json.toString());
};

/**
 * 把JSON对象中的key全部转换成小写
 * @param oriObject
 * @returns {*}
 */
EsbService.translateToLowerCaseJSON = function (oriObject) {
    var jParams = $.JSONObject(oriObject);
    var json = EsbApi.ESBTranslateTableUtil.translateToLowerCaseJSON(jParams);
    if (!json) {
        return null;
    }
    return JSON.parse(json.toString());
};

/**
 * 根据翻译表，把对象中的key翻译成大小写区分的正常key
 * @param oriObject
 * @param translateTable
 * @returns {*}
 */
EsbService.translateToUpperCaseJSON = function (oriObject, translateTable) {
    var jOriObject = $.JSONObject(oriObject);
    var jTranslateTable = $.JSONObject(translateTable);
    var json = EsbApi.ESBTranslateTableUtil.translateToUpperCaseJSON(jOriObject, jTranslateTable);
    if (!json) {
        return null;
    }
    return JSON.parse(json.toString());
};

/**
 * 将XML转换成JSONObject
 * @param xml
 * @returns {*}
 */
EsbService.xml2JSONObject = function (xml) {
    if (!xml) {
        return null;
    }
    try {
        var json = EsbApi.ESBUtil.xml2JSONObject(xml);
        if (!json) {
            return null;
        }
        return JSON.parse(json.toString());
    } catch (e) {
        return null;
    }
};
