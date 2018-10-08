//#import product.js
//#import cart.js
//#import panicBuy.js
//#import ps20.js
var QiangBuyFlowApi = new JavaImporter(
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.shoppingcart,
    Packages.net.xinshi.isone.commons,
    Packages.net.xinshi.isone.modules.order,
    Packages.org.json,
    Packages.net.xinshi.isone.modules.businessruleEx.plan,
    Packages.net.xinshi.isone.functions.shopping,
    Packages.net.xinshi.isone.modules.businessruleEx.plan.bean.executeTimeBean,
    Packages.net.xinshi.isone.modules.order.bean,
    Packages.net.xinshi.isone.modules.sellCount,
    Packages.net.xinshi.isone.modules.panicbuy,
    Packages.net.xinshi.isone.functions.order,
    Packages.net.xinshi.isone.modules.order.bean
);

/**
 * @namespace
 * @type {{checkSellCount: Function, addToCart: Function, getOcForOrderForm: Function, addOrder: Function}}
 */
var QiangBuyFlowService = {
    /**
     * 检查商品是否可卖
     * @param userId
     * @param m
     * @param buyAmount 购买数
     * @param skuId
     * @param panicBuy 抢购商品对象
     * @returns {boolean}
     */
    checkSellCount : function(userId,m,buyAmount,skuId,panicBuy){
        var limitBuyTimes = panicBuy.limitBuyCount; //限购次数
        var limitProductAmount = panicBuy.limitBuyNumber; //  每次限购数量
        if(buyAmount > limitProductAmount){
            throw {state:'exceedLimitProductAmount',msg:"超过每次限购数。每次限购数为:" + limitProductAmount}
        }

        var sellCount = QiangBuyFlowApi.OrderItemHelper.getSkuInventoryAmount(panicBuy.productId, skuId);
        if(sellCount<buyAmount){
            throw {state:"noInventory",msg:"库存不足。"};
        }

        var countInCart = CartService.getSkuCount(skuId);
        if(sellCount<(buyAmount+countInCart)){
            throw {state:"noInventory",msg:"库存不足。"};
        }

        var remainCount = QiangBuyFlowApi.IsoneModulesEngine.sellCountService.getSellCount(m, panicBuy.id, "all", QiangBuyFlowApi.ISellCountService.PANICBUYCOUNT);
        $.log("remainCount=" + remainCount);
        if(remainCount<=0){
            //如果remainCount已经少于0，还要看看是否还有没有付款的订单，如果有则说明还有继续购买的机会
            var total = QiangBuyFlowApi.OrderFunction.getNotPayInTimeOrderSizeOfOneDay("panic", panicBuy.id, null);      //未支付的订单数量
            if(total>0){
                throw {state:"checkLater",msg:"暂时没有库存，如果有人取消订单，过一会可能还有机会。"}
            }
            else{
                throw {state:"noSellCount",msg:"已经被抢光了。"}
            }
        }
        var productNumber=ProductService.getSellableCount(panicBuy.productId, skuId);
        if(productNumber<buyAmount){
            throw {state:"noInventory",msg:"库存不足。"};
        }
        var buyTimes = QiangBuyFlowApi.UserPanicBuyHelper.getBuyTimes(userId,panicBuy.id);
        if(buyTimes >= limitBuyTimes){
            throw {state:'exceedBuyTimes',msg:"超过了每人限购的次数：" + limitBuyTimes}
        }
        return true;
    },
    /**
     * 检查商品是否可卖不报错
     * @param userId
     * @param m
     * @param buyAmount 购买数
     * @param skuId
     * @param panicBuy 抢购商品对象
     * @returns {boolean}
     */
    checkProductSellCount : function(userId,m,buyAmount,skuId,panicBuy){
        var limitBuyTimes = panicBuy.limitBuyCount; //限购次数
        var limitProductAmount = panicBuy.limitBuyNumber; //  每次限购数量
        if(buyAmount > limitProductAmount){
            //throw {state:'exceedLimitProductAmount',msg:"超过每次限购数。每次限购数为:" + limitProductAmount}
            return false;
        }

        var sellCount = QiangBuyFlowApi.OrderItemHelper.getSkuInventoryAmount(panicBuy.productId, skuId);
        if(sellCount<buyAmount){
            //throw {state:"noInventory",msg:"库存不足。"};
            return false;
        }

        var countInCart = CartService.getSkuCount(skuId);
        if(sellCount<(buyAmount+countInCart)){
            //throw {state:"noInventory",msg:"库存不足。"};
            return false;
        }

        var remainCount = QiangBuyFlowApi.IsoneModulesEngine.sellCountService.getSellCount(m, panicBuy.id, "all", QiangBuyFlowApi.ISellCountService.PANICBUYCOUNT);
        $.log("remainCount=" + remainCount);
        if(remainCount<=0){
            //如果remainCount已经少于0，还要看看是否还有没有付款的订单，如果有则说明还有继续购买的机会
            var total = QiangBuyFlowApi.OrderFunction.getNotPayInTimeOrderSizeOfOneDay("panic", panicBuy.id, null);      //未支付的订单数量
            if(total>0){
                //throw {state:"checkLater",msg:"暂时没有库存，如果有人取消订单，过一会可能还有机会。"}
                return false;
            }
            else{
                //throw {state:"noSellCount",msg:"已经被抢光了。"}
                return false;
            }
        }
        var productNumber=ProductService.getSellableCount(panicBuy.productId, skuId);
        if(productNumber<buyAmount){
            //throw {state:"noInventory",msg:"库存不足。"};
            return false;
        }
        var buyTimes = QiangBuyFlowApi.UserPanicBuyHelper.getBuyTimes(userId,panicBuy.id);
        if(buyTimes >= limitBuyTimes){
            //throw {state:'exceedBuyTimes',msg:"超过了每人限购的次数：" + limitBuyTimes}
            return false;
        }
        return true;
    },
    /**
     * 把抢购商品加入购物车
     * @param panicBuyId
     * @param skuId
     * @param buyAmount
     * @param buyerUserId
     * @returns {string}
     */
    addToCart:function(panicBuyId,skuId,buyAmount,buyerUserId){
        var panicBuy = PanicBuyService.getPanicBuy(panicBuyId);
        var merchantId = panicBuy.merchantId;
        var productId = panicBuy.productId;
        var product = ProductService.getProduct(productId);
        var productVersionId = product["_v"];
        //1.如果skuId == null,则检查productId是否是没有颜色尺码的区别的商品
        var realSkuId="";
        //TODO:注意！这里要对skuId做处理,获取realSkuId的值
        var skus = ProductService.getSkus(productId);
        if(!skuId){
            if(skus.length!=1){
                //下面有多款商品，需要选择一款具体的商品
                throw { state:"needSkuId",msg:"有多款子商品，需要选择一款具体的商品购买。"}
            }
            skuId = "" + skus[0].id;
            realSkuId = "" + skus[0].skuId;
        }
        else{
            skus.forEach(function(sku){
                if(sku.id == skuId){
                    realSkuId = "" + sku.skuId;
                }
            });
        }

        if(!QiangBuyFlowService.checkSellCount(buyerUserId,merchantId,buyAmount,skuId,panicBuy)){
            return;
        };

        CartService.removeCartByType(merchantId,"panic");

        var jShoppingCart = QiangBuyFlowApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, true);

        var jItem = new QiangBuyFlowApi.JSONObject();
        jItem.put("merchantId", merchantId);
        jItem.put("cartType", "panic");
        jItem.put("productId", productId);
        jItem.put("productVersionId", productVersionId);
        jItem.put("skuId", skuId);
        jItem.put("realSkuId", realSkuId);
        jItem.put("amount", buyAmount);
        jItem.put("checked", "true");
        jItem.put("cardBatchId", product["cardBatchId"]);
        jItem.put("isVirtual", product["isVirtual"]);
        jItem.put("objType","panic");
        jItem.put("objId",panicBuyId);
        jItem.put("objName",panicBuy.title);
        var cartId = QiangBuyFlowApi.ShoppingCartUtil.addItem(jShoppingCart, jItem);
        QiangBuyFlowApi.IsoneOrderEngine.shoppingCart.updateShoppingCart(jShoppingCart);
        return "" + cartId;
    },
    getOcForOrderForm : function(cartId,userId){
        var jcarts = QiangBuyFlowApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, false);
        var jcart = QiangBuyFlowApi.CommonCartUtil.getCart(QiangBuyFlowApi.CommonCartUtil.getAllCarts(jcarts), cartId);
        var oc = QiangBuyFlowApi.BusinessRuleUtil.getBuyOrderOrCartForOrderForm(jcart,userId);
        return JSON.parse("" +QiangBuyFlowApi.Util.bean2String(oc));
    },

    /**
     * 把抢购商品加入购物车 ， 触屏版老项目使用
     * @param panicBuyId
     * @param skuId
     * @param buyAmount
     * @param buyerUserId
     * @returns {string}
    */
    addToCartForMobile:function(panicBuyId,skuId,buyAmount,buyerUserId){
        var panicBuy = PanicBuyService.getPanicBuy(panicBuyId);
        var merchantId = panicBuy.merchantId;
        var productId = panicBuy.productId;
        var product = ProductService.getProduct(productId);
        var productVersionId = product["_v"];
        //1.如果skuId == null,则检查productId是否是没有颜色尺码的区别的商品
        var realSkuId="";
        //TODO:注意！这里要对skuId做处理,获取realSkuId的值
        var skus = ProductService.getSkus(productId);
        if(!skuId){
            if(skus.length!=1){
                //下面有多款商品，需要选择一款具体的商品
                throw { state:"needSkuId",msg:"有多款子商品，需要选择一款具体的商品购买。"}
            }
            skuId = "" + skus[0].id;
            realSkuId = "" + skus[0].skuId;
        }
        else{
            skus.forEach(function(sku){
                if(sku.id == skuId){
                    realSkuId = "" + sku.skuId;
                }
            });
        }

        if(!QiangBuyFlowService.checkSellCount(buyerUserId,merchantId,buyAmount,skuId,panicBuy)){
            return;
        };

        CartService.removeCartByType(merchantId,"panic");

        var jShoppingCart = QiangBuyFlowApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, true);

        var jItem = new QiangBuyFlowApi.JSONObject();
        jItem.put("merchantId", merchantId);
        jItem.put("cartType", "panic");
        jItem.put("productId", productId);
        jItem.put("productVersionId", productVersionId);
        jItem.put("skuId", skuId);
        jItem.put("realSkuId", realSkuId);
        jItem.put("amount", buyAmount);
        jItem.put("checked", "true");
        jItem.put("cardBatchId", product["cardBatchId"]);
        jItem.put("isVirtual", product["isVirtual"]);
        jItem.put("objType","panic");
        jItem.put("objId",panicBuyId);
        jItem.put("objName",panicBuy.title);
        var cartId = QiangBuyFlowApi.ShoppingCartUtil.addItemX(jShoppingCart, jItem);
        QiangBuyFlowApi.IsoneOrderEngine.shoppingCart.updateShoppingCart(jShoppingCart);
        return "" + cartId;
    },

    /**
     * 生成抢购订单
     * @param oc 订单对象
     * @param userId
     * @returns {*}
     */
    addOrder:function(oc,userId){
        oc.allUsedCards = null;
        assertSystem("mall");
        var lockId = "LockKey_/web/serverJsLib/jsLib/qiangBuyFlow_Js";
        lock(lockId);
        try {
            var addOk = true;
            var buyItems = oc.buyItems;
            buyItems.forEach(function (buyItem) {
                var panicBuy = PanicBuyApi.IsoneModulesEngine.panicBuyService.getPanicBuy(buyItem.objId);
                var intResult = QiangBuyFlowApi.UserPanicBuyHelper.addUserMovementInfo(userId, oc.merchantId, buyItem.number, panicBuy);
                if (intResult != 1) {
                    if(intResult==601){
                        throw {state:"error",msg:"最大购买次数不大于零"};
                    }
                    if(intResult==602){
                        throw {state:"error",msg:"每人每次购买最大数量配置有误"};
                    }
                    if(intResult==603){
                        throw {state:"error",msg:"当前用户购买数量超过每人每次购买最大数量配置"};
                    }
                    if(intResult==604){
                        throw {state:"error",msg:"当前商品的可抢购数量不大于零"};
                    }
                    if(intResult==606){
                        throw {state:"error",msg:"当前用户参与此活动的次数已超过上限"};
                    }
                    if(intResult==607){
                        throw {state:"error",msg:"扣减抢购可卖数失败"};
                    }else{
                        throw {state:"error",msg:"抢购失败，请联系管理员"};
                    }
                }
            });
            if (addOk) {
                var joc = QiangBuyFlowApi.Util.string2Bean(JSON.stringify(oc), new QiangBuyFlowApi.BuyOrderOrCart());
                var jOrder = QiangBuyFlowApi.BusinessRuleUtil.getOrderFrom(joc);
                jOrder.put("orderSource", QiangBuyFlowApi.OrderSource.phone.name());
                var orderId = QiangBuyFlowApi.IsoneOrderEngine.orderService.addOrder(jOrder, QiangBuyFlowApi.OrderType.panic, userId);
                return orderId;
            }

        } finally {
            assertSystem("mall");
            unlock(lockId);
        }
    },
    /**
     * 判断用户是否有购买资格,主要是判断用户是否属于团抢购里的会员组
     * @param panicId 活动ID
     * @param userId 购买人ID
     * @returns {*} true:有资格,false:没资格
     */
    isUserCanBuy : function(panicId,userId){
        return QiangBuyFlowApi.PanicBuyUtil.isUserCanBuy(panicId,userId);
    }
};
