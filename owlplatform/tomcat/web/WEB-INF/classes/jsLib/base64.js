var Base64Api = new JavaImporter(
    Packages.net.xinshi.isone.commons.Base64Coder
);
/**
 * @namespace
 * @type {Object}
 */
var Base64 = {
    /**
     * 进行base64加密
     * @param str
     * @param charset
     * @returns {string}
     */
    encode: function (str,charset) {
        if(!str){
            return "";
        }
        if(!charset){
            charset = "utf-8";
        }
        return "" + Base64Api.Base64Coder.encode(str,charset);
    },
    /**
     * 进行base64解密
     * @param str
     * @param charset
     * @returns {string}
     */
    decode: function (str,charset) {
        if(!str){
            return "";
        }
        if(!charset){
            charset = "utf-8";
        }
        return "" + Base64Api.Base64Coder.decode(str,charset);
    },
    decodeToBytes:function(s){
        return Base64Api.Base64Coder.decodeToBytes(s);
    }

};
