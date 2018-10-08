//#import product.js
//#import login.js
//#import eventBus.js
var CartApi = new JavaImporter(
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.shoppingcart,
    Packages.net.xinshi.isone.commons,
    Packages.net.xinshi.isone.modules.order,
    Packages.org.json,
    Packages.net.xinshi.isone.modules.businessruleEx.plan,
    Packages.net.xinshi.isone.modules.businessruleEx,
    Packages.net.xinshi.isone.functions.shopping,
    Packages.net.xinshi.isone.modules.price,
    Packages.net.xinshi.isone.modules.price.impl
);
/**
 * @namespace
 * @type {{getCarts: getCarts, getProductsCount: getProductsCount, getSkuCount: getSkuCount, getCart: getCart, getCartByType: getCartByType, removeCart: removeCart, removeCartByType: removeCartByType, getOc: getOc}}
 */
var CartService = {
    /**
     * 获取大购物车，一个大购物车由多个小购物车组成，每个商家以及每个订单类型构成一个小购物车。
     * @return {*}
     */
    getCarts: function () {
        var carts = CartApi.ShoppingCartFunction.getAllShoppingCarts(request, response, false);
        return JSON.parse(carts.toString());
    },


    /**
     * 获得购物车中商品数
     * @return {int}
     */
    getProductsCount: function () {
        var carts = CartService.getCarts();
        var num = 0;
        carts.forEach(function (cart) {
            if (cart && cart.items) {
                for (var k in cart.items) {
                    var item = cart.items[k];
                    if (item.cartType == "common") {
                        num += new Number(item.amount);
                    }
                }
            }
        });
        return num;
    },
    /**
     * 获取指定skuId的数量
     * @param skuId 商品skuId
     * @return {int}
     */
    getSkuCount: function (skuId) {
        var carts = CartService.getCarts();
        var num = 0;
        carts.forEach(function (cart) {
            if (cart && cart.items) {
                for (var k in cart.items) {
                    var item = cart.items[k];
                    if (item.skuId == skuId) {
                        num += new Number(item.amount);
                    }
                }
            }
        });
        return num;
    },

    findItem : function(bigCart,productId,skuId){
        var carts = bigCart.carts;
        var result  = null;
        for(var k in carts) {
            var cart = carts[k];
            if (cart && cart.items) {
                for (var k in cart.items) {
                    var item = cart.items[k];
                    if ((item.skuId == skuId && item.productId == productId)||productId==item.combiProductId) {
                        result = item;
                    }
                }
            }
        }
        return result;
    },



    getBigCart: function () {
        var jcarts = CartApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, false);
        if (jcarts != null) {
            var s = "" + jcarts.toString();
            return JSON.parse(s);
        }
        else {
            return {};
        }
    },
    getNativeBigCart:function(createNew){
        var jcarts = CartApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, createNew);
        return jcarts;
    },

    updateBigCart: function (bigCart) {
        var jBigCart = $.JSONObject(bigCart);
        CartApi.IsoneOrderEngine.shoppingCart.updateShoppingCart(jBigCart);
    },

    setAllUnchecked:function(bigCart){
        for(cartId in bigCart.carts){
            var smallCart = bigCart.carts[cartId];
            for (var k in smallCart.items) {
                var item = smallCart.items[k];
                item.checked = false;
            }
        }
    },

    checkItems: function (bigCart, cartId, itemKeys) {
        var smallCart = bigCart.carts[cartId];
        if(!smallCart){
            return;
        }
        for (var k in smallCart.items) {
            var item = smallCart.items[k];
            item.checked = false;
        }
        if (smallCart && smallCart.items) {
            if (itemKeys) {
                itemKeys.forEach(function (k) {
                    var item = smallCart.items[k];
                    if (item) {
                        item.checked = true;
                    }
                });
            }
        }
    },

    setItemChecked:function(bigCart, cartId, itemId,checked){
        var smallCart = bigCart.carts[cartId];
        var item = smallCart.items[itemId];
        if (item) {
            item.checked = checked;
        }
    },

    removeCheckedItems: function (cartId) {
        var smallCart = CartService.getCart(cartId);
        var newItems = {};
        var hasItem = false;
        for (var k in smallCart.items) {
            var item = smallCart.items[k];
            if (item.checked == false) {
                newItems[k] = item;
                hasItem = true;
            }
        }
        smallCart.items = newItems;
        //如果购物车里没有商品，就删除这个购物车
        if (!hasItem) {
            CartService.removeCart(cartId);
        } else {
            CartService.updateCart(cartId, smallCart);
        }
    },

    checkAllCarts:function(bigCart,checked){
        for(var cartId in bigCart.carts){
            var cart = bigCart.carts[cartId];
            for(var itemId in cart.items){
                item = cart.items[itemId];
                item.checked = checked;
            }
        }
    },

    removeAllCheckedItems: function () {
        var jBigCart = CartApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, false);
        var jSmallCarts = CartApi.CommonCartUtil.getAllCarts(jBigCart)
        var cartIds = jSmallCarts.getNames(jSmallCarts);
        for(var i=0; i<cartIds.length; i++){
            var cartId = cartIds[i];
            CartService.removeCheckedItems(""+cartId);
        }
    },
    /**
     * 根据cartId,获得当前用户的小购物车
     * @param cartId 购物车Id
     * @return {*}
     */
    getCart: function (cartId) {
        var jcarts = CartApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, false);
        var jcart = CartApi.CommonCartUtil.getCart(CartApi.CommonCartUtil.getAllCarts(jcarts), cartId);
        return JSON.parse("" + jcart.toString());
    },
    /**
     * 根据购物车ID获得购物车
     * @param cartId
     * @returns {null}
     */
    getCartByCartId: function (cartId) {
        var jcarts = CartApi.IsoneOrderEngine.shoppingCart.getShoppingCart(cartId);
        if (jcarts) {
            return JSON.parse("" + jcarts.toString());
        }
        return null;
    },
    /**
     * 根据购物车ID删除购物车
     * @param cartId
     */
    deleteCartByCartId: function (cartId) {
        CartApi.IsoneOrderEngine.shoppingCart.deleteShoppingCart(cartId);
    },

    updateCart: function (cartId, cart) {
        var jCart = $.toJavaJSONObject(cart);
        var bigCart = CartApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, false);
        var smallCarts = bigCart.optJSONObject("carts");
        smallCarts.put(cartId, jCart);
        CartApi.IsoneOrderEngine.shoppingCart.updateShoppingCart(bigCart);
    },

    /**
     * 通过购物车类型获得购物车，carttype通常为'common'代表正常的订单，以后如果有多种不同的购物流程，每一种将对应一中购物车类型
     * @param merchantId 商家Id
     * @param cartType 购物车类型
     * @return {*}
     */
    getCartByType: function (merchantId, cartType) {
        var jcarts = CartApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, false);
        var jcart = CartApi.CommonCartUtil.getCart(jcarts, merchantId, cartType);
        if (!jcart) {
            return null;
        }
        return JSON.parse(jcart.toString());
    },

    /**
     * 根据商家ID和购物车类型获得小购物车
     * @param carts
     * @param merchantId
     * @param cartType
     * @returns {*}
     */
    getSmallCartByType: function (carts, merchantId, cartType) {
        if (!carts) {
            return null;
        }
        var jCarts = $.toJavaJSONObject(carts);
        var jcart = CartApi.CommonCartUtil.getCart(jCarts, merchantId, cartType);
        if (!jcart) {
            return null;
        }
        return JSON.parse(jcart.toString());
    },
    /**
     * 删除指定购物车
     * @param cartId 购物车Id
     * @return {*}
     */
    removeCart: function (cartId) {
        var jcarts = CartApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, false);
        CartApi.ShoppingCartUtil.removeCart(jcarts, cartId);
        CartApi.IsoneOrderEngine.shoppingCart.updateShoppingCart(jcarts);
    },

    setSkuId: function (cartId, itemId, skuId) {
        var jcarts = CartApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, false);
        var jcart = CartApi.CommonCartUtil.getCart(CartApi.CommonCartUtil.getAllCarts(jcarts), cartId);
        var jItem = jcart.optJSONObject("items").optJSONObject(itemId);
        jItem.put("skuId", skuId);
        CartApi.IsoneOrderEngine.shoppingCart.updateShoppingCart(jcarts);
    },
    /**
     * 删除指定购物车类型购物车
     * @param merchantId 商家Id
     * @param cartType 购物车类型
     * @return {*}
     */
    removeCartByType: function (merchantId, cartType) {
        var jcarts = CartApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, false);
        CartApi.ShoppingCartUtil.removeSmallCart(jcarts, merchantId, cartType);
        if (jcarts) {
            CartApi.IsoneOrderEngine.shoppingCart.updateShoppingCart(jcarts);
        }

    },
    /**
     * 删除整个购物车
     */
    deleteShoppingCart: function () {
        var jcarts = CartApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, false);
        if (jcarts) {
            CartApi.IsoneOrderEngine.shoppingCart.deleteShoppingCart(jcarts.optString("id"));
        }
    },


    /**
     * 获取购物车详细信息
     * @param cartId 购物车Id
     * @param userId 用户Id
     * @return {*}
     */
    getOc: function (cartId, userId) {
        var jcarts = CartApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, false);
        var jcart = CartApi.CommonCartUtil.getCart(CartApi.CommonCartUtil.getAllCarts(jcarts), cartId);
        var oc = CartApi.BusinessRuleUtil.getBuyOrderOrCart(jcart, userId, false);
        return JSON.parse("" + CartApi.Util.bean2String(oc));
    },

    getJavaOc: function (cartId, userId) {
        var jcarts = CartApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, false);
        var jcart = CartApi.CommonCartUtil.getCart(CartApi.CommonCartUtil.getAllCarts(jcarts), cartId);
        var oc = CartApi.BusinessRuleUtil.getBuyOrderOrCart(jcart, userId, false);
        return oc;
    },

    setBuyItemSelectedRules: function (cartId, itemId, selectedRuleIds, deniedRuleIds) {
        var jBigCart = CartApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, false);
        var bigCart = JSON.parse("" + jBigCart.toString());
        var cart = bigCart.carts[cartId];
        if (cart && cart.items) {
            for (var k in cart.items) {
                var item = cart.items[k];
                if (k == itemId) {
                    item.itemKey = k;
                    item.userSelectedRules = selectedRuleIds;
                    item.userDeniedRules = deniedRuleIds;
                }
            }
        }
        CartApi.IsoneOrderEngine.shoppingCart.updateShoppingCart($.JSONObject(bigCart));
        return;
    },
    setCartSelectedRules: function (cartId, selectedRuleIds, deniedRuleIds) {
        var jBigCart = CartApi.IsoneOrderEngine.shoppingCart.getShoppingCart(request, response, false);
        var bigCart = JSON.parse("" + jBigCart.toString());
        var cart = bigCart.carts[cartId];
        if (cart && cart) {
            cart.userSelectedRules = selectedRuleIds;
            cart.userDeniedRules = deniedRuleIds;
        }
        CartApi.IsoneOrderEngine.shoppingCart.updateShoppingCart($.JSONObject(bigCart));
        return;
    },
    /**
     * 简单的从cart里获得ocs
     * @param userId
     * @param bigCart
     */
    getOcsFromBigCart:function(userId,jBigCart,cartType,checkedOnly){
        if(cartType){
            var carts = jBigCart.optJSONObject("carts");
            var cartIds = jBigCart.getNames(carts);
            if(!cartIds || cartIds.length == 0){
                return null;
            }
            for(var i=0; i<cartIds.length; i++){
                var cart = carts.opt(cartIds[i]);
                var cartType = "" +cart.opt("cartType");
                if(cartType!=cartType){
                    carts.remove(cartIds[i]);
                }
            }
        }
        var ocs = CartApi.BusinessRuleUtil.getBuyOrderOrCarts(jBigCart,userId,checkedOnly);
        return ocs;

    },
    changeAmount:function(cartId,itemId,toNumber,userId){
        var jBigCart = CartService.getNativeBigCart(false);
        var jCarts = jBigCart.optJSONObject("carts");
        if(jCarts==null){
          return;
        }
        var jcart = jCarts.optJSONObject(cartId);
        $.log("*************jCarts=" + jCarts.toString() + "\n\n,++++++++++++cartId=" + cartId);
        if(jcart==null){
          $.log("*************jcart=null" + ",cartId="+ cartId);
          return;
        }
        var jItems = jcart.optJSONObject("items");
        if(jItems==null){
          return;
        }
        var jItem = jItems.optJSONObject(itemId);
        if(jItem==null){
          return;
        }
        var productId = jItem.optString("productId");
        var merchantId = jItem.optString("merchantId");
        var skuId = jItem.optString("skuId");
        var jSku = CartApi.SkuUtil.getSkuBySkuId(CartApi.IsoneModulesEngine.pskuService.getAllList(productId), skuId);
        var onceMustBuyCount = CartApi.IsoneModulesEngine.pskuService.getOnceMustBuyCount(productId,skuId);
        if(onceMustBuyCount>toNumber){
            throw "一次最少购买数量为:"+onceMustBuyCount +",目前购买数量:" + toNumber;
        }
        //var oldAmount = jItem.optLong("amount");
        //var changeAmount =  (toNumber - oldAmount);
        var changeAmount =  Number(toNumber);
        var merchantId = jcart.optString("merchantId");
        if(productId.indexOf("combiProduct")>-1){
            jItem.put("amount",toNumber);
        }else{
            var jState = CartApi.CommonCartUtil.getSellAbleInfo(productId, jSku, null, userId, merchantId, changeAmount, jcart, "common");
            if (jState.optInt("state") != 1 || !jState.optBoolean("sellAble")) {
                throw ("库存不足,该商品可销售库存为" + jState.optString("sellCount") + "。"+(Integer.parseInt(jState.optString("sellCount"))==0?"将从购物车中删除该商品。":""));
            }
            jItem.put("amount",toNumber);

        }
        CartApi.IsoneOrderEngine.shoppingCart.updateShoppingCart(jBigCart);
    },

    /**
     * 这个函数只是对内存里面的bigCart进行处理，并没有做其他的
     * @param cartId
     * @param itemId
     * @param toNumber
     * @param userId
     */
    changeCartAmount:function (jBigCart,cartId, itemId, toNumber, userId){
      $.error("changeCartAmount,begin.");
      var carts = jBigCart.optJSONObject("carts");
      if(carts==null){
        $.error("changeCartAmount,carts not found.");
        return;
      }
      var jcart = carts.optJSONObject(cartId);
      if(jcart==null){
        $.error("changeCartAmount,cartId not found,cartId=" + cartId);
        return;
      }
      var jItems = jcart.optJSONObject("items");
      if(jItems==null){
        $.error("changeCartAmount,jItems not found,cartId=" + cartId);
        return;
      }
      var jItem = jItems.optJSONObject( itemId );
      var productId = jItem.optString( "productId" );
      var merchantId = jItem.optString( "merchantId" );
      var skuId = jItem.optString( "skuId" );
      var jSku = CartApi.SkuUtil.getSkuBySkuId( CartApi.IsoneModulesEngine.pskuService.getAllList( productId ), skuId );
      var onceMustBuyCount = CartApi.IsoneModulesEngine.pskuService.getOnceMustBuyCount( productId, skuId );
      if (onceMustBuyCount > toNumber) {
        throw "一次最少购买数量为:" + onceMustBuyCount + ",目前购买数量:" + toNumber;
      }
      //var oldAmount = jItem.optLong( "amount" );
      //var changeAmount = (toNumber - oldAmount);
        var changeAmount =  Number(toNumber);
      var merchantId = jcart.optString( "merchantId" );
      if (productId.indexOf( "combiProduct" ) > -1) {
        jItem.put( "amount", toNumber );
      } else {
        var jState = CartApi.CommonCartUtil.getSellAbleInfo( productId, jSku, null, userId, merchantId, changeAmount, jcart, "common" );
        if (jState.optInt( "state" ) != 1 || !jState.optBoolean( "sellAble" )) {
          throw ("库存不足,该商品可销售库存为" + jState.optString( "sellCount" ) + "。" + (Integer.parseInt( jState.optString( "sellCount" ) ) == 0 ? "将从购物车中删除该商品。" : ""));
        }
        jItem.put( "amount", toNumber );
      }
    },

    removeItems:function(itemObjects){
        var bigCart = CartService.getBigCart();
        var carts = bigCart.carts;
        if(itemObjects){
            itemObjects.forEach(function(itemObject){
                var cart = carts[itemObject.cartId];
                if(cart && cart.items){
                    delete cart.items[itemObject.itemId];
                    if(Object.keys(cart.items).length==0){
                        delete carts[itemObject.cartId]
                    }
                }
            });
        }

        CartService.updateBigCart(bigCart);
    }
  ,
  executePlans: function (jbigcart, userId, checkRulesInterval, force){
    return CartApi.IsoneBusinessRuleEngineEx.buyFlowPlanExecutor.executePlans( jbigcart, userId, checkRulesInterval, force );
  },

  upgrade: function (jBigCart){
    CartApi.ShoppingCartUtil.upgradeShoppingCart( jBigCart );
  },

  calculateDeliveryRules:function(jSmallCart,userId){
    CartApi.ShoppingCartUtil.calculateDeliveryRules( jSmallCart,userId );
  },

  calculateDeliveryRulesForAll:function(jBigCart,userId){
    CartApi.ShoppingCartUtil.calculateDeliveryRulesForAll( jBigCart,userId );
  },

  populatePrices: function (jBigCart, userId, checkInterval, force){

    /**
     * 需要依赖于 ：//#import $SalesAgentProduct:services/SalesAgentProductService.jsx
     */
    var modified = CartApi.ShoppingCartUtil.populatePrices( jBigCart, userId, checkInterval, force );
    if (!modified) {
      return;
    }
    var jCarts = jBigCart.optJSONObject( "carts" );

    if (!jCarts) {
      return;
    }

    var cartIds = jCarts.getNames( jCarts );
    for ( var i = 0; i < cartIds.length; i++ ) {
      var cartId = cartIds[ i ];
      var jCart = jCarts.optJSONObject( cartId );
      if (!jCart) {
        continue;
      }
      var jItems = jCart.optJSONObject( "items" );
      if (!jItems) {
        continue;
      }
      var itemIds = jItems.getNames( jItems );
      if(!itemIds){
        continue;
      }
      for ( var j = 0; j < itemIds.length; j++ ) {
        var itemId = itemIds[ j ];
        var jItem = jItems.optJSONObject( itemId );
        if (!jItem) {
          continue;
        }
        var resellerId = "" + jItem.optString( "resellerId" );
        var productId = "" + jItem.optString( "productId" );
        if (resellerId && resellerId!="-1") {
          var resellerMerchantId = MerchantService.getMerchantIdByApplyUserId( resellerId );
          jItem.put( "resellerMerchantId", resellerMerchantId );
          var resellerPrice = {};
          if (resellerMerchantId) {
            var resellerPrices = SalesAgentProductService.getPrices( resellerMerchantId, [ productId ] );
            resellerPrice = resellerPrices[ 0 ];
            var defaultPrice = null;
            var defaultPrices = SalesAgentProductService.getPrices( resellerMerchantId, [ 'default' ] );
            if (defaultPrices && defaultPrices.length > 0) {
              defaultPrice = defaultPrices[ 0 ];
              defaultPrice.fixedRate = true;
              // resellerPrice = defaultPrice;
            }

            if (resellerPrice) {
              var unitPrice = Number( jItem.optString( "unitPrice" ) );
              var amount = jItem.optString("amount");
              if (resellerPrice.shopFixedRate && defaultPrice && defaultPrice.percent) {
                unitPrice = unitPrice * defaultPrice.percent / 100;
                jItem.put( "unitPrice", unitPrice );
                var totalPrice = unitPrice * amount;
                jItem.put("totalPrice",totalPrice);

              }
              else if (resellerPrice.fixedRate && resellerPrice.percent) {
                unitPrice = unitPrice * resellerPrice.percent / 100;
                jItem.put( "unitPrice", unitPrice );
                var totalPrice = unitPrice * amount;
                jItem.put("totalPrice",totalPrice);
              }
              else {
                var unitPrice = resellerPrice[ "" + jItem.optString("skuId") ];
                if (unitPrice) {
                  jItem.put( "unitPrice", unitPrice );
                  var totalPrice = unitPrice * amount;
                  jItem.put("totalPrice",totalPrice);
                }
              }
            }
          }
        }
      }
    }
  }
};