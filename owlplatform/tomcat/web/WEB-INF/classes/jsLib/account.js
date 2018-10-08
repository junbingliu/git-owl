//#import sysArgument.js

var AccountApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.merchant,
    Packages.net.xinshi.isone.modules.account,
    Packages.net.xinshi.isone.functions.account,
    Packages.net.xinshi.isone.functions.card,
    Packages.net.xinshi.thirdinterface.crv.account,
    Packages.java.util
);

var AccountService = {};
AccountService.getAccount = function (obj) {
    if (obj == null)return null;
    var s = JSON.stringify(obj);
    var params = new AccountApi.JSONObject(s);
    var accountRecords = AccountApi.AccountFunction.getAccountRecordsByParams(params);
    if (!accountRecords) return null;
    var list = accountRecords.get("lists");
    var page = accountRecords.get("page");
    var rowCount = accountRecords.get("rowCount");
    var pageCount = accountRecords.get("pageCount");
    if (!list)return null;
    list = JSON.parse("" + list.toString());
    var result = {}, totalTransactionAmount = 0;
    for (var i = 0; i < list.length; i++) {
        var account = list[i];
        if (account) {
            totalTransactionAmount = totalTransactionAmount + Number(account.transactionAmount);
        }
    }
    result.list = list;
    if (rowCount) {
        result.rowCount = JSON.parse("" + rowCount.toString());
    }
    if (page) {
        result.page = JSON.parse("" + page.toString());
    }
    if (pageCount) {
        result.pageCount = JSON.parse("" + pageCount.toString());
    }

    result.totalTransactionAmount = totalTransactionAmount;
    return result;
};


AccountService.getCardBatch = function (cardBatchId) {
    if (!cardBatchId) return;
    var jCardBatch = AccountApi.IsoneModulesEngine.cardBatchService.getCardBatch(cardBatchId);
    if (!jCardBatch) return;
    return JSON.parse(jCardBatch);
};

AccountService.checkCardBatch = function (cardBatch) {
    if (!cardBatch) return false;
    var jCardBatch = new OrderUtilApi.JSONObject(JSON.stringify(cardBatch));
    return AccountApi.CardUtils.checkCardBatch(jCardBatch);
};

AccountService.getAbleUseCardIds = function (cardBatchId, amount) {
    if (!cardBatchId) return;
    return AccountApi.CardFunction.getAbleUseCardIds(cardBatchId, amount);
};

AccountService.getCard = function (cardId) {
    if (!cardId) return;
    var jCard = AccountApi.IsoneModulesEngine.cardService.getCard(cardId);
    if (!jCard) return;
    return JSON.parse(jCard.toString());
};

AccountService.getListDataByIds = function (jCardIds, keepNull) {
    if (!jCardIds) return;
    return AccountApi.IsoneModulesEngine.cardService.getListDataByIds(jCardIds, keepNull);
};

AccountService.getUserBalance = function (objId, merchantId, accountType) {
    if (!objId) {
        return '0';
    }
    return AccountApi.AccountUtils.getUserBalance(objId, merchantId, accountType);
};

AccountService.updateUserBalance = function (objId, merchantId, accountType, amount, reason, transType) {
    var result = AccountApi.AccountUtils.updateUserBalance(objId, merchantId, accountType, amount, reason, transType);
    return JSON.parse(result.toString());
};

/**
 * 给会员帐户充值或扣除金额时，使用此方法
 */
AccountService.updateAccount = function (objId, merchantId, accountType, amount, transactionReason, operateUserId, objTypeId, transactionType) {
    return AccountApi.IsoneModulesEngine.accountService.updateAccount(objId, merchantId, accountType, amount, transactionReason, operateUserId, objTypeId, transactionType);
};

AccountService.updateAccountEx = function (objId, merchantId, accountType, amount, transactionReason, operateUserId, objTypeId, transactionType, orderId, allowNegative, realAmount, discountRate) {
    var json = AccountApi.IsoneModulesEngine.accountService.updateAccount(objId, merchantId, accountType, amount, transactionReason, operateUserId, objTypeId, transactionType, orderId, allowNegative, realAmount, discountRate);
    if(json){
        return JSON.parse(json.toString());
    }
    return null;
};

AccountService.getIntegralMoneyRatio = function () {
    var v = SysArgumentService.getSysArgumentStringValue("head_merchant", "col_sysargument", "RateOfRmb2IntegralExchange");
    if (!v) {
        return 1;
    }
    return Number(v);
};

AccountService.setIntegralMoneyRatio = function (v) {
    SysArgumentService.setSysArgumentStringValue("head_merchant", "col_sysargument", "RateOfRmb2IntegralExchange", v);
};

//商家是否支持负积分
AccountService.getAllowMerchantNegativeIntegral = function () {
    return AccountApi.MerchantSysArgumentUtil.merchantAccountIsAllowNegative();
};

//ewj线下积分交易接口
AccountService.ewjThirdPointsTrading = function (userId, longAmount) {
    return AccountApi.CRVAccountUtil.pointsTrading(userId, longAmount);
};

/**
 * 获得交易记录详情
 * @param accountLogId
 */
AccountService.getAccountLog = function (accountLogId) {
    var json =  AccountApi.IsoneModulesEngine.accountLogsService.getAccountLog(accountLogId);
    if(json){
        return JSON.parse(json.toString());
    }
    return null;
};