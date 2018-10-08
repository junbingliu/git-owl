var BankcommApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules.payment.applyimpl.encrypt.bankcommShortcutUtil.CreditCardService,
    Packages.net.xinshi.isone.modules.payment.applyimpl.encrypt.bankcommShortcutUtil.util.CreditCardHelper
);

var CreditCardService = {

    getMobileVerifyCode: function (param) {
        var paramStr = JSON.stringify(param);
        var jParam = new BankcommApi.JSONObject(paramStr);
        var jResult = BankcommApi.CreditCardService.getMobileVerifyCode(jParam);
        return JSON.parse(jResult.toString());
    },

    goToPay: function (param) {
        var paramStr = JSON.stringify(param);
        var jParam = new BankcommApi.JSONObject(paramStr);
        var jResult = BankcommApi.CreditCardService.goToPay(jParam);
        return JSON.parse(jResult.toString());
    },

    isAgainPay: function (userId) {
        var bool = BankcommApi.CreditCardHelper.isAgainPay("" + userId);
        return "" + bool;
    },

    getCreditCardInfo: function (userId) {
        var jResult = BankcommApi.CreditCardHelper.getCreditCardInfo("" + userId);
        if (!jResult) {
            return "";
        }
        return JSON.parse(jResult.toString());
    },

    signIn: function (param) {
        var paramStr = JSON.stringify(param);
        var jParam = new BankcommApi.JSONObject(paramStr);
        var jResult = BankcommApi.CreditCardService.signIn(jParam);
        return JSON.parse(jResult.toString());
    },

    signOut: function (param) {
        var paramStr = JSON.stringify(param);
        var jParam = new BankcommApi.JSONObject(paramStr);
        var jResult = BankcommApi.CreditCardService.signOut(jParam);
        return JSON.parse(jResult.toString());
    }
};