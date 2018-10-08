/**
 * Created by admin on 2015/5/6.
 * 对账管理
 */
var balanceAccountApi = new JavaImporter(
    Packages.net.xinshi.isone.modules.payment.tradequerytask.utils,
    Packages.org.json
);

var balanceAccountService = {

    /**
     * 根据退款单号获取关联的支付单号，若不存在时，则返回空
     * @param refundId
     */
    getPayRecIdByRefundId: function (refundId) {
        var prefix = "relStoredCardHR_r2o";// RelationIdPrefix.java 定义
        var result = balanceAccountApi.RelationUtil.getRefundRecId(prefix, refundId);
        return result;
    }
};
