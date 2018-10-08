/**
 * Created by Administrator on 14-1-20.
 */
//#import eventBus.js
//#import product.js
//#import cart.js

var NormalBuyFlowApi = new JavaImporter(
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
 * 普通购买流程相关函数
 * @namespace
 * @type {{addToCart: addToCart, getOcForOrderForm: getOcForOrderForm, addOrder: addOrder}}
 */
var NormalBuyFlowService = {
    /**
     * 加入购物车
     * @param productId
     * @param skuId
     * @param buyAmount
     * @param buyerUserId
     * @param merchantId
     * @returns {boolean}
     */
    addToCart: function (productId, skuId, buyAmount, buyerUserId, merchantId, isCombiProduct, combiProductId, unitPrice, resellerId, objType) {
        if(Number(buyAmount) <= 0){
            throw {state: "noInventory", msg: "参数异常。"};
        }

        //1.如果skuId == null,则检查productId是否是没有颜色尺码的区别的商品
        var realSkuId = "";
        var skus = ProductService.getSkus(productId);
        if (!skuId) {
            if (skus.length != 1) {
                //下面有多款商品，需要选择一款具体的商品
                throw {state: "needSkuId", msg: "有多款子商品，需要选择一款具体的商品购买。"}
            }
            skuId = "" + skus[0].id;
            realSkuId = "" + skus[0].skuId;
        }
        else {
            skus.forEach(function (sku) {
                if (sku.id == skuId) {
                    realSkuId = "" + sku.skuId;
                }
            });
        }

        //2.检查库存
        var sellCount = NormalBuyFlowApi.OrderItemHelper.getSkuInventoryAmount(productId, skuId);
        if (Number(sellCount) < Number(buyAmount)) {
            throw {state: "noInventory", msg: "库存不足。"};
        }

        var countInCart = CartService.getSkuCount(skuId);
        var totalBuyCount = Number(buyAmount) + Number(countInCart);
        if (Number(sellCount) < totalBuyCount) {
            throw {state: "noInventory", msg: "库存不足。"};
        }

        var onceMustBuyCount = ProductService.getOnceMustBuyCount(productId, skuId);
        if (Number(onceMustBuyCount) > totalBuyCount) {
            throw {state: "onceMustBuyCountError", msg: "商品起订量不得少于"+onceMustBuyCount};
        }

        var product = ProductService.getProduct(productId);
        if (!isCombiProduct) {
            var productVersionId = product["_v"];
            var publishState = ProductService.getPublishState(product);
            var isCanBeBuy = "" + ProductService.checkBuyStatus(product);
            if (isCanBeBuy != "") {
                throw {state: "canNotBuy", msg: "商品不可买。" + isCanBeBuy};
            }
            if (publishState == '0') {
                throw {state: "unPublished", msg: "商品已下架。"};
            }
            //3.检查是否有价格,新的api可以考虑不检查是否有价格
            // var hasPrice = NormalBuyFlowApi.ShoppingCartUtil.hasProductRealPrice(productId, buyerUserId, merchantId, buyAmount, skuId);
            // if (!hasPrice) {
            //     throw  {state: "noPrice", msg: "没有设置价格。"};
            // }
        }

        var unitWeight = 0;
        if(!isNaN(product.weight)){
            unitWeight = Number(product.weight)*1000;
        }

        var unitVolume = 0;
        if(!isNaN(product.volume)){
            unitVolume = Number(product.volume)*1000;
        }

        var icon = ProductService.getProductLogo(product,"120X120","");

        //TODO:检查购物车中的数量，看看加起来是否有库存
        var jShoppingCart = NormalBuyFlowApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, true);
        var jItem = new NormalBuyFlowApi.JSONObject();
        jItem.put("merchantId", merchantId);
        jItem.put("cartType", "common");
        jItem.put("productId", productId);
        jItem.put("productVersionId", productVersionId);
        jItem.put("skuId", skuId);
        jItem.put("realSkuId", realSkuId);
        jItem.put("amount", buyAmount);
        jItem.put("checked", "true");
        jItem.put("cardBatchId", product["cardBatchId"]);
        jItem.put("isVirtual", product["isVirtual"]);
        jItem.put("productName",product["name"]);
        jItem.put("unitWeight",unitWeight);
        jItem.put("unitVolume",unitVolume);
        jItem.put("icon",icon);
        if(objType){
            jItem.put("objType",objType);
        }

        if (resellerId) {
            jItem.put("resellerId", resellerId);
        }

        if (isCombiProduct) {
            jItem.put("isCombiProduct", true);
            jItem.put("combiProductId", combiProductId);
            jItem.put("unitPrice", unitPrice);
        }
        NormalBuyFlowApi.ShoppingCartUtil.addItem(jShoppingCart, jItem);
        NormalBuyFlowApi.IsoneOrderEngine.shoppingCart.updateShoppingCart(jShoppingCart);
        return jShoppingCart;
    },

    /**
     * 批量添加购物车
     * @param productIds ：格式为productIds=p_50001,sku_001|p_50002,sku_002
     * @param buyerUserId
     * @returns {*}
     */
    batchAddToCart: function (productIds, buyerUserId) {
        if (!productIds) {
            return {code: "11", msg: "productIds参数为空"};
        }
        var jShoppingCart = NormalBuyFlowApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, true);
        var ids = productIds.split(";");
        for (var i = 0; i < ids.length; i++) {
            if(!ids[i] || ids[i] == ""){
                continue;
            }
            var objectIds = ids[i].split(",");
            var productId, skuId;
            if (objectIds.length == 2) {
                productId = objectIds[0];
                skuId = objectIds[1];
            } else {
                productId = objectIds[0];
            }
            var buyAmount = 1;//批量添加默认数量是1

            //1.如果skuId == null,则检查productId是否是没有颜色尺码的区别的商品
            var product = ProductService.getProduct(productId);
            var realSkuId = "";
            var skus = ProductService.getSkus(productId);
            if (!skuId) {
                if (skus.length != 1) {
                    //下面有多款商品，需要选择一款具体的商品
                    return {code: "12", msg: "商品【" + product.name + "】有多款子商品，需要选择一款具体的商品购买"};
                }
                skuId = "" + skus[0].id;
                realSkuId = "" + skus[0].skuId;
            } else {
                skus.forEach(function (sku) {
                    if (sku.id == skuId) {
                        realSkuId = "" + sku.skuId;
                    }
                });
            }

            //2.检查库存
            var sellCount = NormalBuyFlowApi.OrderItemHelper.getSkuInventoryAmount(productId, skuId);
            if (Number(sellCount) < Number(buyAmount)) {
                return {code: "13", msg: "商品【" + product.name + "】库存不足sellCount="+sellCount+"....buyAmount="+buyAmount+"...productId="+productId+"...skuId="+skuId};
            }

            var countInCart = CartService.getSkuCount(skuId);
            if (Number(sellCount) < (Number(buyAmount) + Number(countInCart))) {
                return {code: "14", msg: "商品【" + product.name + "】库存不足1"};
            }


            var merchantId = product["merchantId"];
            var productVersionId = product["_v"];
            var publishState = ProductService.getPublishState(product);
            var isCanBeBuy = "" + ProductService.checkBuyStatus(product);
            if (isCanBeBuy != "") {
                return {code: "15", msg: "商品【" + product.name + "】不可买"};
            }
            if (publishState == '0') {
                return {code: "16", msg: "商品【" + product.name + "】已下架"};
            }
            //3.检查是否有价格,新的api可以考虑不检查是否有价格
            // var hasPrice = NormalBuyFlowApi.ShoppingCartUtil.hasProductRealPrice(productId, buyerUserId, merchantId, buyAmount, skuId);
            // if (!hasPrice) {
            //     throw  {state: "noPrice", msg: "没有设置价格。"};
            // }

            var unitWeight = 0;
            if (!isNaN(product.weight)) {
                unitWeight = Number(product.weight) * 1000;
            }

            var unitVolume = 0;
            if (!isNaN(product.volume)) {
                unitVolume = Number(product.volume) * 1000;
            }

            var icon = ProductService.getProductLogo(product, "120X120", "");

            //TODO:检查购物车中的数量，看看加起来是否有库存
            var jItem = new NormalBuyFlowApi.JSONObject();
            jItem.put("merchantId", merchantId);
            jItem.put("cartType", "common");
            jItem.put("productId", productId);
            jItem.put("productVersionId", productVersionId);
            jItem.put("skuId", skuId);
            jItem.put("realSkuId", realSkuId);
            jItem.put("amount", buyAmount);
            jItem.put("checked", "true");
            jItem.put("cardBatchId", product["cardBatchId"]);
            jItem.put("isVirtual", product["isVirtual"]);
            jItem.put("productName", product["name"]);
            jItem.put("unitWeight", unitWeight);
            jItem.put("unitVolume", unitVolume);
            jItem.put("icon", icon);

            NormalBuyFlowApi.ShoppingCartUtil.addItem(jShoppingCart, jItem);
        }

        NormalBuyFlowApi.IsoneOrderEngine.shoppingCart.updateShoppingCart(jShoppingCart);
        return {code: "0", msg: "添加成功"};
    },

    /**
     * 恒大加入购物车
     * @param productId
     * @param skuId
     * @param buyAmount
     * @param buyerUserId
     * @param merchantId
     * @returns {boolean}
     */
    addToCart_hd: function (productId, skuId, buyAmount, buyerUserId, merchantId, isCombiProduct, combiProductId, unitPrice, resellerId) {
        if(Number(buyAmount) <= 0){
            throw {state: "noInventory", msg: "参数异常。"};
        }
        //1.如果skuId == null,则检查productId是否是没有颜色尺码的区别的商品
        var realSkuId = "";
        var skus = ProductService.getSkus(productId);
        if (!skuId) {
            if (skus.length != 1) {
                //下面有多款商品，需要选择一款具体的商品
                throw {state: "needSkuId", msg: "有多款子商品，需要选择一款具体的商品购买。"}
            }
            skuId = "" + skus[0].id;
            realSkuId = "" + skus[0].skuId;
        }
        else {
            skus.forEach(function (sku) {
                if (sku.id == skuId) {
                    realSkuId = "" + sku.skuId;
                }
            });
        }

        //2.检查库存
        var sellCount = NormalBuyFlowApi.OrderItemHelper.getSkuInventoryAmount(productId, skuId);
        if (sellCount < buyAmount) {
            throw {state: "noInventory", msg: "库存不足。"};
        }

        //var countInCart = CartService.getSkuCount(skuId);
        //if(sellCount<(buyAmount+countInCart)){
        //    throw {state:"noInventory",msg:"库存不足。"};
        //}
        /*
         var  priceContext = "{attrs:{},factories:[{factory:RPF},{factory:MF,isBasePrice:true}]}";
         var  jPriceContext = new NormalBuyFlowApi.JSONObject(priceContext);
         //检查特价商品是否超出购买限制
         var priceList=ProductService.getPriceValueList(productId,buyerUserId,merchantId,buyAmount,jPriceContext.getObjectMap(),"normalPricePolicy");

         if(priceList&&priceList.length>0){
         if(priceList[0].isSpecialPrice=="Y"){
         if(priceList[0].limitCount<buyAmount+countInCart){
         throw "该商品每人最多购买"+priceList[0].limitCount+"件";
         }
         }
         }
         */
        var product = ProductService.getProduct(productId);
        if (!isCombiProduct) {
            var productVersionId = product["_v"];
            var publishState = ProductService.getPublishState(product);
            var isCanBeBuy = "" + ProductService.checkBuyStatus(product);
            if (isCanBeBuy != "") {
                throw {state: "canNotBuy", msg: "商品不可买。" + isCanBeBuy};
            }
            if (publishState == '0') {
                throw {state: "unPublished", msg: "商品已下架。"};
            }
            //3.检查是否有价格
            var hasPrice = NormalBuyFlowApi.ShoppingCartUtil.hasProductRealPrice(productId, buyerUserId, merchantId, buyAmount, skuId);
            if (!hasPrice) {
                throw  {state: "noPrice", msg: "没有设置价格。"};
            }
        }

        //TODO:检查购物车中的数量，看看加起来是否有库存
        var jShoppingCart = NormalBuyFlowApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, true);
        var jItem = new NormalBuyFlowApi.JSONObject();
        jItem.put("merchantId", merchantId);
        jItem.put("cartType", "common");
        jItem.put("productId", productId);
        jItem.put("productVersionId", productVersionId);
        jItem.put("skuId", skuId);
        jItem.put("realSkuId", realSkuId);
        jItem.put("amount", buyAmount);
        jItem.put("checked", "true");
        jItem.put("cardBatchId", product["cardBatchId"]);
        jItem.put("isVirtual", product["isVirtual"]);
        if (resellerId) {
            jItem.put("resellerId", resellerId);
        }

        if (isCombiProduct) {
            jItem.put("isCombiProduct", true);
            jItem.put("combiProductId", combiProductId);
            jItem.put("unitPrice", unitPrice);
        }
        NormalBuyFlowApi.ShoppingCartUtil.addItem(jShoppingCart, jItem);
        NormalBuyFlowApi.IsoneOrderEngine.shoppingCart.updateShoppingCart(jShoppingCart);
        $.log("after add to cart......");
        return true;
    },
    /**
     * 计算所有的业务规则,返回计算的结果
     * @param cartId
     * @param userId
     * @returns {oc}
     * oc就是一个cart，运用了所有的业务规则后的结果
     */
    getOcForOrderForm: function (cartId, userId, buyingDevice) {
        var jcarts = NormalBuyFlowApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, false);
        var jcart = NormalBuyFlowApi.CommonCartUtil.getCart(NormalBuyFlowApi.CommonCartUtil.getAllCarts(jcarts), cartId);
        if (buyingDevice) {
            jcart.put("buyingDevice", buyingDevice);
        }
        var oc = NormalBuyFlowApi.BusinessRuleUtil.getBuyOrderOrCartForOrderForm(jcart, userId);
        return JSON.parse("" + NormalBuyFlowApi.Util.bean2String(oc));
    },


    /**
     * 获得所有的ocs,包含所有商家的
     * @param userId
     * @returns {*}
     */
    getOcs: function (userId, buyingDevice, requiredCartType) {
        var ocs = NormalBuyFlowService.getOcsEx(userId, buyingDevice, requiredCartType, true, null);
        if (!ocs) {
            return [];
        }
        return JSON.parse("" + NormalBuyFlowApi.Util.bean2String(ocs));
    },
    getOcsWithGift: function (userId, buyingDevice, requiredCartType, checkedOnly, spec, isGift, giftRegionId) {
        var ocs = NormalBuyFlowService.getOcsEx(userId, buyingDevice, requiredCartType, checkedOnly, spec, isGift, giftRegionId);
        if (!ocs) {
            return [];
        }
        return JSON.parse("" + NormalBuyFlowApi.Util.bean2String(ocs));
    },
    getOcsEx: function (userId, buyingDevice, requiredCartType, checkedOnly, spec, isGift, giftRegionId) {

        var jBigCart = NormalBuyFlowApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, false);
        if (!jBigCart) {
            return null;
        }
        if (buyingDevice) {
            jBigCart.put("buyingDevice", buyingDevice);
        }
        if (spec) {
            jBigCart.put("spec", spec);
        }

        if (isGift) {
            jBigCart.put("isGift", true);
            jBigCart.put("giftRegionId", giftRegionId);
        }
        else {
            jBigCart.put("isGift", false);
        }

        if (requiredCartType) {
            var carts = jBigCart.optJSONObject("carts");
            var cartIds = jBigCart.getNames(carts);
            if (!cartIds || cartIds.length == 0) {
                return null;
            }
            for (var i = 0; i < cartIds.length; i++) {
                var cart = carts.opt(cartIds[i]);
                var cartType = "" + cart.opt("cartType");
                if (cartType != requiredCartType) {
                    carts.remove(cartIds[i]);
                }
            }
        }
        var ctx = {};
        ctx["carts"] = jBigCart;
        ctx["userId"] = userId;
        ctx["request"] = request;
        EventBusService.fire("beforeGetOcs", ctx);

        var ocs = NormalBuyFlowApi.BusinessRuleUtil.getBuyOrderOrCarts(jBigCart, userId, checkedOnly);
        return ocs;
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
    },

    convertOcToOrder: function (oc) {
        oc.allGiveCards = null;
        oc.allUsedCards = null;
        oc.allPayments = null;
        // $.log("++++++++convertOcToOrder++++++++++" + JSON.stringify(oc));
        var joc = NormalBuyFlowApi.Util.string2Bean(JSON.stringify(oc), new NormalBuyFlowApi.BuyOrderOrCart());
        var jOrder = NormalBuyFlowApi.BusinessRuleUtil.getOrderFrom(joc);
        var s = "" + jOrder.toString();
        return JSON.parse(s);
    },

    addRealOrder: function (order, orderType, userId) {
        var jOrder = $.toJavaJSONObject(order);
        var ctx = {};
        ctx["order"] = jOrder;
        var req = null;
        var res = null;
        if (typeof request != 'undefined') {
            req = request;
        }
        if (typeof response != 'undefined') {
            res = response;
        }
        ctx["request"] = req;
        ctx["response"] = res;
        EventBusService.fire("onBeforeAddOrder", ctx);
        var orderId = NormalBuyFlowApi.IsoneOrderEngine.orderService.addOrder(jOrder, orderType, userId);
        return orderId;
    },

    getBuyItem:function(ocs,itemId){
        var resultItem = null;
        ocs.forEach(function (oc) {
             oc.buyItems.forEach(function (item) {
                 if(item.itemKey == itemId){
                     resultItem = item;
                     item.cartKey = oc.cartKey;
                 }
             });
        });
        return resultItem;
    },

    distributeCards: function (ocs, selectedCardBatches,crossMerchantRules) {
        var ruleResults = [];
        ocs.forEach(function (oc) {
            oc.availableRuleResults.forEach(function (ruleResult) {
                if (ruleResult.type != "OUC" && ruleResult.type != "OURC") {
                    return;
                }
                ruleResult.availableCardRules.forEach(function (cardRule) {
                    if (cardRule.recommend) {
                        return;
                    }
                    var availableBatches = [];
                    cardRule.availableBatches.forEach(function (availableBatch) {
                        selectedCardBatches.forEach(function (selectedBatch) {
                            if (availableBatch.id == selectedBatch.cardBatchId) {
                                availableBatches.push(availableBatch);
                            }
                        });
                    });
                    var rule = {
                        ruleType: ruleResult.type,
                        ruleId: ruleResult.ruleId,
                        ruleVid: ruleResult.ruleVid,
                        availableBatches: availableBatches,
                        amount: cardRule.amount,
                        itemIds: ruleResult.itemIds.join(","),
                        usedAmount: 0,
                        usedCardBatches: [],
                        cartKey: oc.cartKey
                    };
                    ruleResults.push(rule);
                });
            });

            oc.buyItems.forEach(function (item) {
                if (item.availableRuleResults) {
                    item.availableRuleResults.forEach(function (ruleResult) {
                        if (ruleResult.type != "puc") {
                            return;
                        }
                        ruleResult.availableCardRules.forEach(function (cardRule) {
                            if (cardRule.recommend) {
                                return;
                            }
                            var availableBatches = [];
                            cardRule.availableBatches.forEach(function (availableBatch) {
                                selectedCardBatches.forEach(function (selectedBatch) {
                                    if (availableBatch.id == selectedBatch.cardBatchId) {
                                        availableBatches.push(availableBatch);
                                    }
                                });
                            });
                            var rule = {
                                type: ruleResult.type,
                                ruleId: ruleResult.ruleId,
                                ruleVid: ruleResult.ruleVid,
                                availableBatches: availableBatches,
                                amount: cardRule.amount,
                                itemIds: [item.itemId],
                                usedCardBatches: [],
                                itemId: item.itemId,
                                cartKey: oc.cartKey
                            };
                            ruleResults.push(rule);
                        });
                    });
                }
            });
        });

        if(crossMerchantRules){
            crossMerchantRules.forEach(function (ruleResult) {
            if (ruleResult.type != "OUC" && ruleResult.type != "OURC") {
                return;
            }
            ruleResult.availableCardRules.forEach(function (cardRule) {
                if (cardRule.recommend) {
                    return;
                }
                var availableBatches = [];
                cardRule.availableBatches.forEach(function (availableBatch) {
                    selectedCardBatches.forEach(function (selectedBatch) {
                        if (availableBatch.id == selectedBatch.cardBatchId) {
                            availableBatches.push(availableBatch);
                        }
                    });
                });
                var rule = {
                    ruleType: ruleResult.type,
                    ruleId: ruleResult.ruleId,
                    ruleVid: ruleResult.ruleVid,
                    availableBatches: availableBatches,
                    amount: cardRule.amount,
                    itemIds: ruleResult.itemIds.join(","),
                    usedAmount: 0,
                    usedCardBatches: [],
                    cartKey: "crossMerchant"
                };
                ruleResults.push(rule);

                var items = [];
                ruleResult.itemIds.forEach(function(itemId){
                    var buyItem = NormalBuyFlowService.getBuyItem(ocs,itemId);
                    if(buyItem){
                        items.push(buyItem);
                    }
                });
                var totalPayPrice = 0;
                //汇总每个oc的份额
                var ocPayPrices = {};
                var itemPayPrices = {};
                items.forEach(function(buyItem){
                    totalPayPrice += Number(buyItem.totalDealPrice);
                    var cartKey = buyItem.cartKey;
                    var itemId = buyItem.itemId;
                    var ocPayPrice = ocPayPrices[cartKey];
                    if(!ocPayPrice){
                        ocPayPrice = Number(buyItem.totalDealPrice);
                    }
                    else{
                        ocPayPrice += Number(buyItem.totalDealPrice);
                    }
                    ocPayPrices[cartKey] = ocPayPrice;

                    var itemPayPrice = itemPayPrices[itemId];
                    if(!itemPayPrice){
                        itemPayPrice = Number(buyItem.totalDealPrice);
                    }
                    else{
                        itemPayPrice += Number(buyItem.totalDealPrice);
                    }
                    itemPayPrices[itemId] = itemPayPrice;
                });
                rule.ocPayPrices = ocPayPrices;
                rule.itemPayPrices = itemPayPrices;
                rule.totalPayPrice = totalPayPrice;
            });
        });

        //排序
        ruleResults.sort(function (r1, r2) {
            return r1.availableBatches.length - r2.availableBatches.length;
        });

        //分配到rule里面
        selectedCardBatches.forEach(function (selectedBatch) {
            var leftAmount = selectedBatch.selectedNumber * selectedBatch.faceValue;
            ruleResults.forEach(function (ruleResult) {
                var found = false;
                ruleResult.availableBatches.forEach(function (availableBatch) {
                    if (availableBatch.id == selectedBatch.cardBatchId) {
                        found = true;
                    }
                });
                if (!found) {
                    return;
                }
                if (!ruleResult.usedAmount) {
                    ruleResult.usedAmount = 0;
                }
                var ruleLeftAmount = ruleResult.amount - ruleResult.usedAmount;
                var useAmount = leftAmount;
                if (ruleResult.ruleType == "OURC") {
                    var cardNumber = Math.floor(useAmount / selectedBatch.faceValue + 0.0001);
                    if (ruleLeftAmount < leftAmount) {
                        useAmount = cardNumber;
                    }
                    ruleResult.usedAmount += useAmount;
                    leftAmount = leftAmount - useAmount * selectedBatch.faceValue;
                    if (!ruleResult.usedCardBatches) {
                        ruleResult.usedCardBatches = [];
                    }
                    ruleResult.usedCardBatches.push([selectedBatch.cardBatchId, useAmount]);
                } else {
                    if (ruleLeftAmount < leftAmount) {
                        useAmount = ruleLeftAmount;
                    }
                    var useNumber = Math.floor(useAmount / selectedBatch.faceValue + 0.0001);
                    ruleResult.usedAmount += useNumber * selectedBatch.faceValue;
                    leftAmount = leftAmount - useNumber * selectedBatch.faceValue;
                    if (!ruleResult.usedCardBatches) {
                        ruleResult.usedCardBatches = [];
                    }
                    ruleResult.usedCardBatches.push([selectedBatch.cardBatchId, useNumber]);
                }
            });
        });
        }
        return ruleResults;
    },

    getShowDepositAndPoint: function (merchantId, orderType) {
        var allPayments = NormalBuyFlowApi.PaymentHelper.getMerchantAllPaymentsByOrderType(merchantId, orderType);
        var jShowDepositAndPoint = NormalBuyFlowApi.BusinessRuleHelper.getShowDepositAndPoint(allPayments);
        if (jShowDepositAndPoint != null) {
            return JSON.parse("" + new NormalBuyFlowApi.JSONObject(jShowDepositAndPoint));
        } else {
            return null;
        }

    }
};
