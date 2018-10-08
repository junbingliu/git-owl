var icbcApi = new JavaImporter(
    Packages.net.xinshi.thirdinterface.icbc.security
);
var ICBCService = {
    getSign: function (content, appSecret) {
        return icbcApi.SecretUtils.encode(content, appSecret) + "";
    }
};