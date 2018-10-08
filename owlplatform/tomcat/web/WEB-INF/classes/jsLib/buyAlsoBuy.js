var BuyAlsoBuyApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules.machineRecommend.IsoneMachineRecommendEngine
);

/**
 * 买过又买
 * @type {{}}
 */
var BuyAlsoBuyService={};

/**
 * 设置买过又买
 * @param productId 当前商品id
 * @param productIds 关联商品id
 */
BuyAlsoBuyService.setBuyAlsoBuy=function(productId,productIds){
    BuyAlsoBuyApi.IsoneMachineRecommendEngine.buyAlsoBuyService.setBuyAlsoBuy(productId,productIds);
};
/**
 * 获取买过又买
 * @param productId 商品id
 * @returns {JSON}
 */
BuyAlsoBuyService.getBuyAlsoBuy=function(productId){
    return BuyAlsoBuyApi.IsoneMachineRecommendEngine.buyAlsoBuyService.getBuyAlsoBuy(productId);
};