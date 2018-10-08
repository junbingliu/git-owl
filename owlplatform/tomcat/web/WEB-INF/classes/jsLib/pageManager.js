var pageManagerApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.functions.pagemanager
);

var PageManagerService = {};

PageManagerService.getPageManagerList = function (columnId, merchantId, number) {
    var json = pageManagerApi.PageManagerFunction.getPageManagerList(columnId, merchantId,number);
    return JSON.parse(json.toString());
};
