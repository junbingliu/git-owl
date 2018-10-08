var UserDomainApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.domainU
);

var UserDomainService = {};
UserDomainService.addDomains = function (obj) {
    var s = JSON.stringify(obj);
    var domain = new UserDomainApi.JSONObject(s);
    UserDomainApi.IsoneModulesEngine.userDomainService.addDomains(domain);
};
UserDomainService.fixedNumber = function (amount, pos) {
    if (isNaN(amount))return 0;
    var amountN = Number(amount);
    return amountN.toFixed(pos);
};
UserDomainService.getRelationDomain = function (userId) {
    var jRelationDomain = UserDomainApi.UserDomainUtils.getRelationDomain(userId);
    if (jRelationDomain == null) return null;
    return JSON.parse("" + jRelationDomain);

};

