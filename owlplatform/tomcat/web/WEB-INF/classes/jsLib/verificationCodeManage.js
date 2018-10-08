//#import Util.js

var codeManage = {};
var codeManageApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.lucene,
    Packages.net.xinshi.isone.lucene.search.orderVerificationCode,
    Packages.net.xinshi.isone.modules.orderVerificationCode,
    Packages.net.xinshi.isone.commons,
    Packages.java.util,
    Packages.net.xinshi.isone.commons.Util,
    Packages.net.xinshi.isone.lucene.util
);

codeManage.searchCodeBySearch = function (searchArgs,pageLimit,currentPage) {
    var javaArgs = new codeManageApi.VerificationCodeSearchArgs();
    if(searchArgs.aliasCode && searchArgs.aliasCode != "undefined"){
        javaArgs.setAliasCode(searchArgs.aliasCode);
    }
    if(searchArgs.validateCode && searchArgs.validateCode != "undefined"){
        javaArgs.setValidateCodeValue(searchArgs.validateCode);
    }
    if(searchArgs.searchPhone && searchArgs.searchPhone != "undefined"){
        javaArgs.setPhone(searchArgs.searchPhone);
    }
    if(searchArgs.searchState && searchArgs.searchState != "undefined") {
        javaArgs.setWhetherHaveUsed(searchArgs.searchState);
    }
    javaArgs.setFetchCount(pageLimit);
    javaArgs.setFromPath(currentPage);
    var slist = codeManageApi.IsoneFulltextSearchEngine.searchServices.search(javaArgs);
    var ids = slist.getLists();
    var codeList = codeManageApi.IsoneModulesEngine.verificationCodeService.getListDataByIds(ids, false);
    return JSON.parse(codeList.toString());
};
codeManage.getInfoTotal = function (type,mId) {
    var slist = codeManageApi.IsoneModulesEngine.verificationCodeService.getList(type, mId);
    var list = slist.getRange(0, -1);
    var ids = codeManageApi.Util.getIds(list);
    return ids.size();
};
codeManage.searchCodePaging = function (type,mId,pageLimit,currentPage) {
    var slist = codeManageApi.IsoneModulesEngine.verificationCodeService.getList(type, mId);
    var list = slist.getRange(currentPage, pageLimit);
    var ids = codeManageApi.Util.getIds(list);
    var codeList = codeManageApi.IsoneModulesEngine.verificationCodeService.getListDataByIds(ids, false);
    return JSON.parse(codeList.toString());
};

codeManage.doUpdateWhetherHaveUsed = function (merchantId, id, userId, ip) {
    var json = codeManageApi.VerificationCodeUtil.updateWhetherHaveUsed(merchantId, id, userId, ip);
    return JSON.parse(json.toString());
};

codeManage.getVerificationCodeById = function (id) {
    var json = codeManageApi.IsoneModulesEngine.verificationCodeService.getVerificationCode(id);
    if(!json){
        return null;
    }
    return JSON.parse(json.toString());
};

