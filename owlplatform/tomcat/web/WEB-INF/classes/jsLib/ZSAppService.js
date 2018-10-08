var ZSAppServiceAPI = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.thirdinterface.zhaoshang.utils.ZSAppUtil
);

//招商订单接口
var ZSAppService = {

    doPost: function (postUrl, postData, contentType) {
        var result = ZSAppServiceAPI.ZSAppUtil.doPost(postUrl, postData, contentType);
        return result + "";
    },

    doSoapPost: function (postUrl, postData) {
        var result = ZSAppServiceAPI.ZSAppUtil.doSoapPost(postUrl, postData);
        return result + "";
    },

    doReturnDataXMLParse: function (subNode, xmlData) {
        var result = ZSAppServiceAPI.ZSAppUtil.doReturnDataXMLParse(subNode, xmlData);
        if (!result) {
            return null;
        }
        return JSON.parse(result.toString());
    },

    selectNodes: function (xmlData, xPath) {
        var result = ZSAppServiceAPI.ZSAppUtil.selectNodes(xmlData, xPath);
        if (!result) {
            return null;
        }
        return JSON.parse(result.toString());
    },

    parseXmlToJson: function (xmlData) {
        var result = ZSAppServiceAPI.ZSAppUtil.parseXmlToJson(xmlData);
        if (!result) {
            return null;
        }
        return JSON.parse(result.toString());
    }
};