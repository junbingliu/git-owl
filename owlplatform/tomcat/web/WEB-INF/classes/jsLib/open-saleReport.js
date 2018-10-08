var OpenSaleReportApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.open.salereport
);

/**
 * @constructor
 * @type {Object}
 */
var SaleReportService = {};

/**
 * 订单搜索
 * @param searchArgs
 * @returns {*}
 */
SaleReportService.getSaleReports = function (searchArgs) {
    var jParams = $.JSONObject(searchArgs);
    var json = OpenSaleReportApi.SaleReportSearch.getSaleReports(jParams);
    return JSON.parse(json.toString());
};


