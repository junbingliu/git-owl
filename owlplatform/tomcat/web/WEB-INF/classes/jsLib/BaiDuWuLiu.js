var BaiDuWuLiuApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.thirdinterface.baidu.BaiDuWuLiu
);

var BaiDuWuLiuService = {

    getSign: function (jParams, appId, appKey) {
        var s = JSON.stringify(jParams);
        var json = new BaiDuWuLiuApi.JSONObject(s);
        var result = BaiDuWuLiuApi.BaiDuWuLiu.getSign(json, appId, appKey);
        return result + "";
    },

    getReturnDataInfo: function (request) {
        var result = BaiDuWuLiuApi.BaiDuWuLiu.getReturnDataInfo(request);
        return result + "";
    },

    requestPost: function (postUrl,postData) {
        var result = BaiDuWuLiuApi.BaiDuWuLiu.requestPost(postUrl,postData);
        return result + "";
    }
};