var accountLogApi = new JavaImporter(
    Packages.net.xinshi.isone.modules.account,
    Packages.org.json
);

var accountLogService = {};

accountLogService.getLogList = function (merchantId, accountTypeId, objTypeId, start, limit) {
    var result = accountLogApi.AccountLogUtils.getLogList(merchantId, accountTypeId, objTypeId, start, limit);
    return JSON.parse(result.toString());
};

accountLogService.getSearchLogList = function (searchArg, start, limit) {
    var s = JSON.stringify(searchArg);
    var args = new accountLogApi.JSONObject(s);
    var result = accountLogApi.AccountLogUtils.getSearchLogList(args, start, limit);
    return JSON.parse(result.toString());
};

accountLogService.getSearchMonthLog = function (searchArg, start, limit) {
    var s = JSON.stringify(searchArg);
    var args = new accountLogApi.JSONObject(s);
    var result = accountLogApi.AccountLogUtils.getSearchMonthLog(args, start, limit);
    return JSON.parse(result.toString());
};

accountLogService.getTheMonthLogReport = function (themonth, start, limit) {
    var result = accountLogApi.AccountLogUtils.getTheMonthLogReport(themonth, start, limit);
    return JSON.parse(result.toString());
};


