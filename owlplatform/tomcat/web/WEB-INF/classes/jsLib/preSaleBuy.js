//#import eventBus.js
//#import product.js
//#import cart.js

var PreSaleBuyFlowApi = new JavaImporter(
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.shoppingcart,
    Packages.net.xinshi.isone.commons,
    Packages.net.xinshi.isone.modules.order,
    Packages.org.json,
    Packages.net.xinshi.isone.modules.businessruleEx.plan,
    Packages.net.xinshi.isone.functions.shopping,
    Packages.net.xinshi.isone.modules.businessruleEx.plan.bean.executeTimeBean,
    Packages.net.xinshi.isone.modules.order.bean,
    Packages.net.xinshi.isone.modules.payment
);
/**
 * 预售购买流程相关函数
 * @namespace
 * @type {{addToCart: addToCart, getOcForOrderForm: getOcForOrderForm, addOrder: addOrder}}
 */
var PreSaleBuyFlowService = {
    /**
     * 加入购物车
     * @param jProduct
     * @param preSaleRule
     * @param merchantId
     * @param productId
     * @param skuId
     * @param buyAmount
     * @returns
     */
    addToCart: function (jProduct, preSaleRule, merchantId, productId, skuId, buyAmount) {
        var jResult = {};
        var skus = SkuService.getProductSkuList(productId);
        var jSku = SkuService.getSkuBySkuId(skus, skuId);

        var preSaleRuleId = preSaleRule.id;

        var jShoppingCart = PreSaleBuyFlowApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, true);
        //先将原来的预售购物车清空.
        PreSaleBuyFlowApi.ShoppingCartUtil.removeSmallCart(jShoppingCart, merchantId, "preSale");

        var jItem = new PreSaleBuyFlowApi.JSONObject();
        jItem.put("merchantId", merchantId);
        jItem.put("cartType", "preSale");
        jItem.put("productId", productId);
        jItem.put("productVersionId", jProduct._v);
        jItem.put("skuId", skuId);
        jItem.put("realSkuId", jSku.skuId);
        jItem.put("attrs", new PreSaleBuyFlowApi.JSONObject());
        jItem.put("attrsValue", SkuService.getAttrsValueBySku(jSku));
        jItem.put("amount", buyAmount);
        jItem.put("checked", "true");

        jItem.put("objType", "preSale");
        jItem.put("objId", preSaleRuleId);//规则ID
        jItem.put("objName", preSaleRule.name);//规则名称

        PreSaleBuyFlowApi.ShoppingCartUtil.addItem(jShoppingCart, jItem);
        PreSaleBuyFlowApi.IsoneOrderEngine.shoppingCart.updateShoppingCart(jShoppingCart);

        jResult.code = "0";
        jResult.msg = "操作成功";
        return jResult;
    },

    /**
     * 获得某个商家的预售oc
     * @param merchantId
     * @param buyerUserId
     * @param checkedOnly
     * @returns {*}
     */
    getOc: function (merchantId, buyerUserId, checkedOnly) {
        var shoppingCart = PreSaleBuyFlowApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, true);
        var carts = PreSaleBuyFlowApi.CommonCartUtil.getAllCarts(shoppingCart);
        var jCart = PreSaleBuyFlowApi.ShoppingCartUtil.getCart(carts, merchantId, "preSale");
        if(!jCart){
            return null;
        }
        //var userCardBatches = PreSaleBuyFlowApi.BusinessRuleUtil.getUserCardBatches(buyerUserId);
        var userCardBatches = null;//预售流程暂时不支持用券规则
        var oc = PreSaleBuyFlowApi.BusinessRuleUtil.getBuyOrderOrCartFast(jCart, buyerUserId, checkedOnly, userCardBatches);

        return JSON.parse("" + PreSaleBuyFlowApi.Util.bean2String(oc));
    },

    /**
     * 生成一个订单
     * @param oc
     * @param userId
     * @returns {*}
     */
    addOrder: function (oc, userId, extra) {
        oc.allGiveCards = null;
        oc.allUsedCards = null;
        oc.allPayments = null;
        var joc = NormalBuyFlowApi.Util.string2Bean(JSON.stringify(oc), new NormalBuyFlowApi.BuyOrderOrCart());
        var jOrder = NormalBuyFlowApi.BusinessRuleUtil.getOrderFrom(joc);
        jOrder.put("orderSource", NormalBuyFlowApi.OrderSource.phone.name());
        if (extra) {
            for (var k in extra) {
                jOrder.put(k, extra[k]);
            }
        }
        var orderId = NormalBuyFlowApi.IsoneOrderEngine.orderService.addOrder(jOrder, NormalBuyFlowApi.OrderType.common, userId);
        return orderId;
    }
};
