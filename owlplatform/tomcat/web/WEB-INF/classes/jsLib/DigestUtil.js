
var DigestApi = new JavaImporter(
    Packages.net.xinshi.isone.commons,
    Packages.org.apache.commons.codec.digest,
    Packages.net.xinshi.isone.commons
);
/**
 * 工具类
 * @namespace
 */
var DigestUtil = {
    /**
     *
     * @param {string} pass
     * @param {string} algorithm
     */
    digestString: function (pass, algorithm) {
        return "" + DigestApi.DigestUtil.digestString(pass, algorithm);
    },
    /**
     * md5然后 hex
     * @param {string} s
     * @returns {string}
     */
    md5:function(s){
        return DigestApi.DigestUtils.md5Hex("" + s)+"";
    },

    sha1:function(s){
      return DigestApi.DigestUtils.sha1Hex("" + s)+"";
    },

    hex:function(s){
        return DigestApi.Util.hexString(s,'utf-8')
    }
};
