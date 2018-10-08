var EncryptUtilApi = new JavaImporter(
    Packages.net.xinshi.isone.commons.AESEncryptUtil,
    Packages.org.apache.commons.codec.digest.DigestUtils
);
/**这个是一加解密算法JS API，包含aes sha1,其他的md5也应该放到这里来
 * @namespace
 * @type {Object}
 */
var EncryptUtil = {
    /**
     * 进行aes加密
     * @param str 要加密的字符串
     * @param keyword 加密的key
     * @returns {string}
     */
    aesEncrypt: function (str, keyword) {
        if (!str || !keyword) {
            return "";
        }
        return "" + EncryptUtilApi.AESEncryptUtil.encrypt(str, keyword);
    },
    /**
     * 进行aes解密
     * @param str 要解密的字段串
     * @param keyword 解密的key
     * @returns {string}
     */
    aesDecrypt: function (str, keyword) {
        if (!str || !keyword) {
            return "";
        }
        return "" + EncryptUtilApi.AESEncryptUtil.decrypt(str, keyword);
    },
    /**
     * 加密数据
     * @param sSrc
     * @param sKey
     * @param sIv
     * @returns {string}
     */
    encryptData: function (sSrc, sKey, sIv) {
        if (!sSrc || !sKey || !sIv) {
            return "";
        }
        return "" + EncryptUtilApi.AESEncryptUtil.encrypt(sSrc, sKey, sIv);
    },
    /**
     * 解密
     * @param sSrc
     * @param sKey
     * @param sIv
     * @returns {string}
     */
    decryptData: function (sSrc, sKey, sIv) {
        if (!sSrc || !sKey || !sIv) {
            return "";
        }
        return "" + EncryptUtilApi.AESEncryptUtil.decrypt(sSrc, sKey, sIv);
    },
    /**
     * 进行sha1加密
     * @param str 要加密的字符串
     * @returns {string}
     */
    sha1Encrypt:function(str){
        if(!str){
            return "";
        }
        return EncryptUtilApi.DigestUtils.shaHex(str) + "";
    },
    /**
     * 进行sha256加密
     * @param str 要加密的字符串
     * @returns {string}
     */
    sha256Encrypt:function(str){
        if(!str){
            return "";
        }
        return EncryptUtilApi.DigestUtils.sha256Hex(str) + "";
    }
};
