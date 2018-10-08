var Md5Api = new JavaImporter(
    Packages.net.xinshi.isone.security,
    Packages.org.json
);

var Md5Service = {
    /**
     * 加密
     * @param data : 待加密字符串
     * @param key : 秘钥
     * @returns {*}
     */
    encString: function (data, key) {
        var result = Md5Api.Md5Service.encString(data, key);
        if (result) {
            return result + ""
        }
        return result;
    },

    /**
     * 解密
     * @param data : 待解密字符串
     * @param key : 秘钥
     * @returns {*}
     */
    decString: function (data, key) {
        var result = Md5Api.Md5Service.decString(data, key);
        if (result) {
            return result + ""
        }
        return result;
    },
    md5Hex: function (str) {
        return Md5Api.Md5Service.md5Hex(str);
    }
};
