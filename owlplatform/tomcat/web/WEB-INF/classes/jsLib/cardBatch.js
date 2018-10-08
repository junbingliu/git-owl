var CardBatchApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules.card.CardBatchUtils,
    Packages.net.xinshi.isone.modules.IsoneModulesEngine
);

var CardBatchService = {

    //根据第三方卡类型获取关联的批次Id
    getCardBatchIdByCouponsType: function (couponsType,merchantId) {
        var result = CardBatchApi.CardBatchUtils.getCardBatchIdByCouponsType(couponsType,merchantId);
        return result + "";
    },

    getCardBatchById: function (cardBatchId) {
        var jCardBatch = CardBatchApi.IsoneModulesEngine.cardBatchService.getCardBatch(cardBatchId);
        if (!jCardBatch) {
            return null;
        }
        return JSON.parse(jCardBatch.toString());
    },

    getCardBatchByCouponsType: function (couponsType,merchantId) {
        var cardBatchId = this.getCardBatchIdByCouponsType(couponsType,merchantId);
        return this.getCardBatchById(cardBatchId);
    },

    //创建批次
    createBatch: function (name, cardType, amount, merchantId, effectBegin, effectEnd) {
        var id = CardBatchApi.CardBatchUtils.createBatch(name, cardType, amount, merchantId, effectBegin, effectEnd);
        return "" + id;
    },

    //修改批次有效期
    updateBatchEffectTime: function (batchId, effectBegin, effectEnd) {
        CardBatchApi.CardBatchUtils.updateBatchEffectTime(batchId, effectBegin, effectEnd);
    }

};