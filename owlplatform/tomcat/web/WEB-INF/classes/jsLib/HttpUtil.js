var HttpApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.commons,
    Packages.org.apache.commons.codec.digest,
    Packages.org.apache.commons.lang,
    Packages.net.xinshi.isone.open.tools,
    Packages.net.xinshi.isone.open.tools
);

/**
 * @constructor
 * @type {Object}
 */
var HttpUtils = {};

/**
 *
 * @param url
 * @param xmlData
 * @returns {{code: string}}
 */
HttpUtils.soapPost = function (url, xmlData) {
    var result = {isSuccess: "false", code: "0"};
    if (!xmlData) {
        result.message = "报文信息不能为空";
        return result;
    }
    if (!url) {
        result.message = "接口地址不能为空";
        return result;
    }
    var returnResult = HttpApi.HttpUtil.soapPost(url, xmlData);
    if (!returnResult || ( returnResult && returnResult == "")) {
        result.message = "返回的报文数据为空";
    } else {
        result = returnResult + "";
    }
    return result;
};

/**
 * json排序
 * @param param
 * @returns {string}
 */
HttpUtils.sortMessage = function (param, privateKey) {
    if (!param) {
        return;
    }
    var jParam = new HttpApi.JSONObject(JSON.stringify(param));
    return HttpApi.SecureSignHelper.sortMessage(jParam, privateKey) + "";
};

/**
 * 加密参数
 * @param param
 * @returns {string}
 */
HttpUtils.md5Hex = function (param) {
    if (!param) {
        return "";
    }
    return HttpApi.DigestUtils.md5Hex(param) + "";
};

/**
 *
 * @param count
 * @param randomArgs
 * @returns {string}
 */
HttpUtils.randomStr = function (count, randomArgs) {
    return HttpApi.RandomStringUtils.random(count, randomArgs) + "";
};

/**
 * 返回JSON格式（有局限性）
 * @param url
 * @param postData
 * @returns {*}
 */
HttpUtils.postData = function (url, postData) {
    var result = {isSuccess: "false", code: "0"};
    if (!postData) {
        result.message = "报文信息不能为空";
        return result;
    }
    if (!url) {
        result.message = "接口地址不能为空";
        return result;
    }
    var jPostData = new HttpApi.JSONObject(JSON.stringify(postData));
    var returnDataStr = HttpApi.HttpUtil.post(url, jPostData);
    if (!returnDataStr || (returnDataStr && returnDataStr == "")) {
        result.message = "没有接收到返回信息";
        return result;
    } else {
        return JSON.parse(returnDataStr.toString());
    }
};

/**
 * 返回String格式
 * @param url
 * @param postData
 * @returns {string}
 */
HttpUtils.post = function (url, postData) {
    var jPostData = new HttpApi.JSONObject(JSON.stringify(postData));
    var s = HttpApi.HttpUtil.post(url, jPostData);
    if (s) {
        return s + "";
    }
    return "";
};

/**
 * 返回String格式,这个方法是上面post方法的扩展，postData参数支持多层JSON对象
 * @param url
 * @param postData
 * @returns {string}
 */
HttpUtils.postEx = function (url, postData) {
    var jPostData = new HttpApi.JSONObject(JSON.stringify(postData));
    var s = HttpApi.HttpUtil.postEx(url, jPostData);
    if (s) {
        return s + "";
    }
    return "";
};

/***
 * 增加timeout参数，允许在范围内对接
 * @param url
 * @param xmlData
 * @param timeout
 * @returns {{isSuccess: string, code: string}}
 */
HttpUtils.soapPostByTimeout = function (url, xmlData, timeout) {
    var result = {isSuccess: "false", code: "0"};
    if (typeof(xmlData) === "undefined") {
        result.message = "报文信息不能为空";
        return result;
    }
    if (!url) {
        result.message = "接口地址不能为空";
        return result;
    }
    if (!timeout) {
        timeout = 30000;
    }
    var returnResult = HttpApi.HttpUtil.soapPostByTimeout(url, xmlData, timeout);
    if (!returnResult || ( returnResult && returnResult == "")) {
        result.message = "返回的报文数据为空";
    } else {
        result = returnResult + "";
    }
    return result;
};

HttpUtils.postRaw = function (url, content, headers) {
    var jHeaders = new HttpApi.JSONObject(JSON.stringify(headers));
    return "" + HttpApi.HttpUtil.postRaw(url, content, jHeaders);
};

HttpUtils.putRaw = function (url, content, headers) {
    var jHeaders = new HttpApi.JSONObject(JSON.stringify(headers));
    return "" + HttpApi.HttpUtil.putRaw(url, content, jHeaders);
};

/**
 * 返回String格式
 * @param url
 * @param postData
 * @param timeout
 * @returns {string}
 */
HttpUtils.postByTimeout = function (url, postData, timeout) {
    if (!timeout) {
        timeout = 30000;
    }
    var jPostData = new HttpApi.JSONObject(JSON.stringify(postData));
    var s = HttpApi.HttpUtil.postByTimeout(url, jPostData, timeout);
    if (s) {
        return s + "";
    }
    return "";
};

/**
 * 返回String格式
 * @param url
 * @param postData
 * @param timeout
 * @returns {string}
 */
HttpUtils.postByTimeoutEx = function (url, postData, timeout) {
    if (!timeout) {
        timeout = 30000;
    }
    var jPostData = new HttpApi.JSONObject(JSON.stringify(postData));
    var s = HttpApi.HttpUtil.postByTimeoutEx(url, jPostData, timeout);
    if (s) {
        return s + "";
    }
    return "";
};


HttpUtils.get = function (url) {
    return "" + HttpApi.HttpUtil.get(url);
};

HttpUtils.doDelete = function (url,headers) {
  var jHeaders = new HttpApi.JSONObject(JSON.stringify(headers));
  return "" + HttpApi.HttpUtil.doDeleteEx(url,jHeaders);
};

HttpUtils.getEx = function (url) {
    return "" + HttpApi.HttpUtil.getEx(url);
};

HttpUtils.getWithHeader = function (url, headers) {
    var jHeaders = new HttpApi.JSONObject(JSON.stringify(headers));
    return "" + HttpApi.HttpUtil.getWithHeader(url, jHeaders);
};

HttpUtils.aseEncrypt = function (key, srcstring) {
    return HttpApi.AesUtils.encrypt(key, srcstring) + "";
};

HttpUtils.aseDecrypt = function (key, srcstring) {
    return HttpApi.AesUtils.decrypt(key, srcstring) + "";
};

//发送json数据
HttpUtils.doPostJson = function (url, postData) {
    return HttpApi.HttpUtil.doPostJson(url, postData) + "";
};