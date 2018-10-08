var DESEncryptApi = new JavaImporter(
    Packages.net.xinshi.isone.commons,
    Packages.org.json
);

var DESEncryptUtil = {
    /**
     * 加密
     */
    encSign: function (key, iv, data) {
        var result = DESEncryptApi.DESEncryptUtil.encSign(key, iv, data);
        return result;
    },

    /**
     * 解密
     */
    decSign: function (key, iv, data) {
        var result = DESEncryptApi.DESEncryptUtil.decSign(key, iv, data);
        return result;
    }
};

