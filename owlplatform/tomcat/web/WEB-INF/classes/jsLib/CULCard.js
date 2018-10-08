/**
 * Created by admin on 2015/4/10.
 * 银商卡绑定、支付
 */
var CULCardApi = new JavaImporter(
    Packages.net.xinshi.thirdinterface.huarunwanjia.utils,
    Packages.org.json
);

var CULCardService = {
    /**
     * 绑定卡
     */
    bindCard: function (userId, cardNo, pwd) {
        var result = CULCardApi.BoundCardService.bindCard(userId, cardNo, pwd);
        return JSON.parse(result.toString());
    },

    /**
     * 获取用户绑定的卡
     * @param userId
     * @param curPage
     * @param limit
     * @returns {*}
     */
    getUserCULCardList: function (userId, curPage, limit) {
        var result = CULCardApi.BoundCardService.getUserCULCardList(userId, curPage, limit);
        return JSON.parse(result.toString());
    },

    /**
     * 根据卡号获取绑定用户Id
     * @param cardNo
     * @returns {*}
     */
    getUserIdByCardNo: function (cardNo) {
        var result = CULCardApi.BoundCardService.getUserIdByCardNo(cardNo);
        return result;
    },

    /**
     * 根据卡号获取卡信息
     * @param cardNo
     * @returns {status:0,msg:{remainAmount:余额,expiredDate:有效期,cardStatus:卡状态,cardNumber:卡号,id:系统给出的卡Id}}
     */
    getCashCardInfoNoPwd: function (cardNo) {
        var result = CULCardApi.CashCardHandlerWSHR.getCashCardInfoNoPwd(cardNo);
        return JSON.parse(result.toString());
    },

    /**
     * 银商卡查询
     * @param key
     * @param iv
     * @param data
     * @returns {*}
     */
    queryCulCard: function (key, iv, data) {
        var result = CULCardApi.CULCardTrading.queryCulCard(key, iv, data);
        return JSON.parse(result.toString());
    },

    /**
     * 银商卡支付
     * @param key
     * @param iv
     * @param data
     * @param ip
     * @returns {*}
     */
    culCardPay: function (key, iv, data,ip) {
        var result = CULCardApi.CULCardTrading.culCardPay(key, iv, data,ip);
        return JSON.parse(result.toString());
    },

    /**
     * 银商卡退款
     *
     * @param key
     * @param iv
     * @param data
     * @param ip
     * @returns {*}
     */
    culCardRefund: function (key, iv, data,ip) {
        var result = CULCardApi.CULCardTrading.culCardRefund(key, iv, data,ip);
        return JSON.parse(result.toString());
    }
};
