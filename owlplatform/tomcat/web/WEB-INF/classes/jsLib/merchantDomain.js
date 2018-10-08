var MerchantDomainApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.merchant,
    Packages.net.xinshi.isone.modules.merchant.tools,
    Packages.net.xinshi.isone.lucene.search.merchant,
    Packages.net.xinshi.isone.lucene,
    Packages.net.xinshi.isone.commons
);

var MerchantDomainService = {};
MerchantDomainService.setDomains = function(merId,domains){
    MerchantDomainApi.IsoneModulesEngine.merchantDomainService.setDomains(merId,domains);
};

MerchantDomainService.getDomains = function(merId){
    return "" + MerchantDomainApi.IsoneModulesEngine.merchantDomainService.getDomains(merId);
};

MerchantDomainService.getMerchantByDomain = function(domain){
    return "" + MerchantDomainApi.IsoneModulesEngine.merchantDomainService.getMerchantByDomain(domain);
};