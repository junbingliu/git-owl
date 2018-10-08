/**
 * Created by Administrator on 2014/12/4.
 */
var SaleReportService = {}
var SaleReportApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules.financials.sales.salesreport.utils
);

SaleReportService.getSearchList = function (searchArg, start, pageLimit) {
    var s = JSON.stringify(searchArg);
    var args = new SaleReportApi.JSONObject(s);
    var result = SaleReportApi.SalesReportUtil.getSaleReportList(args, start, pageLimit);
    return JSON.parse(result.toString());
};

