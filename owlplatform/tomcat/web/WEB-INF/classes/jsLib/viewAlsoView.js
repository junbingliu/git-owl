var ViewAlsoViewApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules.machineRecommend.IsoneMachineRecommendEngine
);

/**
 * 看过又看
 * @type {{}}
 */
var ViewAlsoViewService={};

/**
 * 设置看过又看
 * @param productId 当前商品id
 * @param productIds 关联商品id
 */
ViewAlsoViewService.setViewAlsoView=function(productId,productIds){
    ViewAlsoViewApi.IsoneMachineRecommendEngine.viewAlsoViewService.setViewAlsoView(productId,productIds);
};
/**
 * 获取看过又看
 * @param productId 商品id
 * @returns {JSON}
 */
ViewAlsoViewService.getViewAlsoView=function(productId){
    return ViewAlsoViewApi.IsoneMachineRecommendEngine.viewAlsoViewService.getViewAlsoView(productId);
};