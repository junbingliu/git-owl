//#import Util.js

var VerificationCodeService = {};
var verificationCodeApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.open.verificationcode,
    Packages.net.xinshi.isone.modules.orderVerificationCode
);

/**
 * 搜索验证码列表
 * @param searchArgs
 * @returns {*}
 */
VerificationCodeService.getVerificationCodes = function (searchArgs) {
    var jParams = $.JSONObject(searchArgs);
    var codeList = verificationCodeApi.VerificationCodeSearch.getVerificationCodes(jParams);
    return JSON.parse(codeList.toString());
};

/**
 * 修改验证码为已使用
 * @param id
 * @param operatorUserId
 * @returns {*}
 */
VerificationCodeService.updateToUsed = function (id, operatorUserId) {
    var json = verificationCodeApi.VerificationCodeUpdateToUsed.updateToUsed(id, operatorUserId);
    return JSON.parse(json.toString());
};

/**
 * 根据ID获得验证码对象
 * @param id
 * @returns {*}
 */
VerificationCodeService.getVerificationCodeById = function (id) {
    var json = verificationCodeApi.IsoneModulesEngine.verificationCodeService.getVerificationCode(id);
    if (!json) {
        return null;
    }
    return JSON.parse(json.toString());
};

