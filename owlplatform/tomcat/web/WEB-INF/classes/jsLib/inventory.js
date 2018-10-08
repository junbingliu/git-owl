//#import Util.js
var InventoryApi = new JavaImporter(
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.product.inventory,
    Packages.net.xinshi.isone.modules.price.SkuUtil
);

var InventoryService = {
    /**
     * 获取物料库存
     * @param productId
     * @param skuId
     * @returns {*}
     */
    getSkuInventory: function (productId, skuId) {
        var product = {objId: productId};
        var jProduct = $.toJavaJSONObject(product);
        var jSku = InventoryApi.SkuUtil.getSkuById(productId, skuId);
        if (jSku == null) {
            return null;
        }
        var jInventory = InventoryApi.ProductInventoryHelper.getSkuInventory(jProduct, jSku);
        var ret = {
            zeroSellable: "" + jInventory.getString("zeroSellable"),
            sellableCount: jInventory.getLong("sellableCount") - (jInventory.getLong("securitySellableCount") > 0 ? jInventory.getLong("securitySellableCount") : 0),
            zeroSellCount: jInventory.getLong("zeroSellCount"),
            securitySellableCount: jInventory.getLong("securitySellableCount")
        };
        return ret;
    },
    /**
     * 获取物料可卖数库存
     * @param productId 商品ID
     * @param skuId 物料ID
     * @returns {*} 真实的可卖数，减去了安全可卖数和零负可卖数,如果物料是不显示的，那库存就是0
     */
    getSkuSellableCount: function (productId, skuId) {
        var product = {objId: productId};
        var jProduct = $.toJavaJSONObject(product);
        var jSku = InventoryApi.SkuUtil.getSkuById(productId, skuId);
        if (jSku == null) {
            return null;
        }
        return InventoryApi.ProductInventoryHelper.getSkuSellableCount(jProduct, jSku);
    },
    /**
     * 获取物料冻结库存
     * @param productId 商品ID
     * @param skuId 物料ID
     * @returns {*} 物料冻结库存
     */
    getSkuFreezeAmount: function (productId, skuId) {
        if(!productId || !skuId){
            return 0;
        }
        return InventoryApi.IsoneModulesEngine.pskuService.getFreezeAmountFromMall(productId, skuId);
    },
    /**
     * 获取一个商品所有物料可卖数
     * @param product 商品对象
     * @returns {*}
     */
    getProductSellableCount: function (product) {
        if (!product) {
            return 0;
        }
        var javaObj = $.toJavaJSONObject(product);
        return InventoryApi.ProductInventoryHelper.getOneProductSellableCount(javaObj, product.merchantId);
    },
    /**
     * 获取物料零可卖数
     * @param productId 商品ID
     * @param skuId 物料ID
     * @returns {*} 零负可卖数
     */
    getSkuZeroSellCount: function (productId, skuId) {
        if(!productId || !skuId){
            return 0;
        }
        return InventoryApi.IsoneModulesEngine.pskuService.getZeroSellCount(productId, skuId);
    },
    /**
     * 修改物料零可卖数
     * @param productId 商品ID
     * @param skuId 物料ID
     * @param zeroSellCount 零负可卖数
     * @returns {*} 零负可卖数
     */
    setZeroSellCount: function (productId, skuId,zeroSellCount) {
        if(!productId || !skuId || !zeroSellCount){
            return;
        }
        InventoryApi.IsoneModulesEngine.pskuService.setZeroSellCount(productId, skuId,zeroSellCount);
    },
    /**
     * 获取物料安全可卖数
     * @param productId 商品ID
     * @param skuId 物料ID
     * @returns {*} 零负可卖数
     */
    getSecuritySellableCount: function (productId, skuId) {
        if(!productId || !skuId){
            return 0;
        }
        return InventoryApi.IsoneModulesEngine.pskuService.getSecuritySellableCount(productId, skuId);
    }
};