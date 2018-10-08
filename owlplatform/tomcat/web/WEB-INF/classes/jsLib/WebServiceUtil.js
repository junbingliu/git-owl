var WebServiceApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.commons
);

/**
 * @constructor
 * @type {Object}
 */
var WebServiceUtils = {};

/**
 *
 * @param address
 * @param namespaceURI
 * @param localPart
 * @param postData
 * @returns {*}
 */
WebServiceUtils.invokeBlocking = function (address, namespaceURI, localPart, postData) {
    var jPostData = new WebServiceApi.JSONObject(JSON.stringify(postData));
    var json = WebServiceApi.WebServiceUtil.invokeBlocking(address, namespaceURI, localPart, jPostData);
    if (json) {
        return json + "";
    }
    return "";
};
