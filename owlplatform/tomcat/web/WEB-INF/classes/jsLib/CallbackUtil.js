var CallbackUtilAPI = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.commons.CallbackUtil
);

var CallbackService = {

    getReturnDataInfo: function (request) {
        var result = CallbackUtilAPI.CallbackUtil.getReturnDataInfo(request);
        return result + "";
    }
};