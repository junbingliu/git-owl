//#import Util.js
var StoreCardApi = new JavaImporter(
    Packages.net.xinshi.thirdinterface.huarunwanjia.utils,
    Packages.net.xinshi.isone.modules.storedcard.service.utils
);

var StoreCardService = {
    getCashCardInfo: function (cardNo, password, safeCode) {
        var jsonInfo = StoreCardApi.StoredCardHandler.getStoredCardInfo(cardNo, password, safeCode);
        return JSON.parse("" + jsonInfo.toString());
    },
    useStoredCardPay: function (usedCards, merchantId, orderId, realPayRecId, ip, reason) {
        var jCards = $.JSONArray(usedCards);
        var jResult = StoreCardApi.StoredCardHandler.useStoredCardPay(jCards, merchantId, orderId, realPayRecId, ip, reason);
        return JSON.parse("" + jResult.toString());
    },
    /**
     * 获取用户绑定的卡
     * @param userId
     * @param curPage
     * @param limit
     * @returns {*}
     */
    getUserCardList: function (userId, curPage, limit) {
        var result = StoreCardApi.StoredCardHandler.getUserCardList(userId, curPage, limit);
        if (result == null) {
            result = "";
        }
        return JSON.parse(result.toString() + "");
    },
    /**
     * 绑定卡
     */
    bindCard: function (userId, cardNo, pwd) {
        var result = StoreCardApi.StoredCardHandler.bindCard(userId, cardNo, pwd);
        if (result == null) {
            result = "";
        }
        return JSON.parse(result.toString() + "");
    },
    /**
     * 根据卡号获取绑定用户Id
     * @param cardNo
     * @returns {*}
     */
    getUserIdByCardNo: function (cardNo) {
        var result = StoreCardApi.StoredCardHandler.getUserIdByCardNo(cardNo);
        if (result == null) {
            result = "";
        }
        return result + "";
    },

    /**
     * 修改卡密码
     * @param sCardNo
     * @param oldPwd
     * @param newPwd
     * @param safeCode
     * @param ip
     * @returns {string}
     */
    updateStoreCardPwd: function (sCardNo, oldPwd, newPwd, safeCode, ip) {
        var result = StoreCardApi.StoredCardHandler.reSetStoredCardPassword(sCardNo, oldPwd, newPwd, safeCode, ip);
        if (result == null) {
            result = "";
        }
        return JSON.parse(result.toString() + "");
    }

};