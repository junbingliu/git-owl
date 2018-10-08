//#import Util.js
//#import column.js
//#import brand.js
//#import merchant.js

/**
 * 商品相关Api
 * @namespace
 */
var ProductService = {};

var ProductApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.functions.product,
    Packages.net.xinshi.isone.base,
    Packages.net.xinshi.isone.modules.price,
    Packages.net.xinshi.isone.modules.pricepolicy,
    Packages.net.xinshi.isone.lucene,
    Packages.net.xinshi.isone.lucene.search.product,
    Packages.java.util,
    Packages.net.xinshi.isone.lucene.util,
    Packages.net.xinshi.isone.modules.merchant,
    Packages.net.xinshi.isone.modules.businessrange,
    Packages.net.xinshi.isone.modules.log,
    Packages.net.xinshi.isone.modules.product,
    Packages.net.xinshi.isone.modules.product.tools,
    Packages.net.xinshi.isone.open.product,
    Packages.net.xinshi.isone.commgetons,
    Packages.net.xinshi.isone.base.dynaattr,
    Packages.net.xinshi.isone.modules.businessruleEx.plan,
    Packages.net.xinshi.isone.modules.price.impl
);

/**
 * 添加普通的商品，不考虑组合商品等复杂情况
 * @param product
 * @param merchantId
 * @param userId
 * @param columnId
 * @param price
 * @return {*}
 */
ProductService.add = function (product, merchantId, userId, columnId, price) {
//    var fields = ['title1','merchantId',"customColumnIds",'columnId','brandColumnId','otherBrandName',
//        'standardProductId','content','isVirtual','sellUnitName','weight','volume','tag','seo_title',
//        'seo_keywords','seo_description','sellPoint','DynaAttrs','publishState','validPublishDay','showDiscount',
//        'canBuy','showPrice','isErpProduct','buyFlow']

    var productString = JSON.stringify(product);
    var jsonProduct = new ProductApi.JSONObject(productString);
    var productId = ProductApi.IsoneModulesEngine.productService.getNewId() + "";
    var priceId = ProductApi.IsoneModulesEngine.priceService.getNewId() + "";

    jsonProduct.put("priceId", priceId);
    jsonProduct.put("id",productId);
    ProductApi.IsoneModulesEngine.productService.addProduct(jsonProduct, userId, columnId, merchantId);
    var priceString = JSON.stringify(price);

    var jsonBasePrice = new ProductApi.JSONObject(priceString);
    var jsonFinalPrice = ProductApi.PriceUtil.generatePrice(productId, merchantId, jsonBasePrice, jsonBasePrice, null);

    jsonFinalPrice.put("id",priceId);

    ProductApi.IsoneModulesEngine.priceService.addPrice(jsonFinalPrice, userId, merchantId, false);
    ProductApi.IsoneModulesEngine.productService.noversionUpdateValidPublishDay(productId, '-1');
    ProductApi.IsoneModulesEngine.productService.noversionUpdatePublishState(productId, '1', userId);

    return productId;
};


ProductService.updatePrice = function(priceId,priceObj,userId,merchantId){
    var jsonPriceObj = $.JSONObject(priceObj);
    ProductApi.IsoneModulesEngine.priceService.checkout(priceId,userId,merchantId,'hd');
    ProductApi.IsoneModulesEngine.priceService.updatePrice(priceId, jsonPriceObj, userId, merchantId, false);
}


/**
 * 搜索
 * @param searchArgs
 * @return {*}
 */
ProductService.searchProduct = function (searchArgs) {
    var jParams = $.toJavaJSONObject(searchArgs);
    var json = ProductApi.ProductSearch.getProducts(jParams);
    return JSON.parse(json.toString());
};

/**
 * 搜索
 * @param searchArgs
 * @return {*}
 */
ProductService.search = function (searchArgs) {
    var searchArgsString = JSON.stringify(searchArgs);
    var javaArgs = ProductApi.ProductSearchArgs.getFromJsonString(searchArgsString);
    var results = ProductApi.IsoneFulltextSearchEngine.searchServices.search(javaArgs);
    var ids = results.getLists();
    var productLists = ProductApi.IsoneModulesEngine.productService.getCheckoutOrHeadCopies(ids);
    return JSON.parse(productLists.toString());
};

/**
 * 搜索同款属性的商品
 * @param productId
 * @param imgSize
 * @return {*}
 */
ProductService.getProductListByProductId = function (productId, imgSize) {
    var javaArgs = ProductApi.ProductSearchUtil.getProductListByProductId(productId, imgSize, "/upload/nopic_40.gif");
    return JSON.parse(javaArgs.toString());
};

ProductService.getCount = function (searchArgs) {
    var searchArgsString = JSON.stringify(searchArgs);
    var javaArgs = ProductApi.ProductSearchArgs.getFromJsonString(searchArgsString);
    var results = ProductApi.IsoneFulltextSearchEngine.searchServices.search(javaArgs);
    return 0 + results.getTotal();
};

/**
 * 功能强大，但是性能稍微差些，看情况使用哪个搜索方法
 * @param searchArgs 搜索参数
 * @param spec 获取大小图尺寸
 * @param multi 是否获取多张图片
 * @returns {*}
 */
ProductService.searchWithPriceAndHighlight = function (searchArgs, spec, multi) {
    var searchArgsString = JSON.stringify(searchArgs);
    var javaArgs = ProductApi.ProductSearchArgs.getFromJsonString(searchArgsString);
    var results = ProductApi.IsoneFulltextSearchEngine.searchServices.search(javaArgs);
    var ids = results.getLists();

    var listOfJSON = ProductApi.IsoneModulesEngine.productService.getListDataByIds(ids, false);
    if (spec) {
        ProductApi.IsoneModulesEngine.productService.getLogoOfProducts(listOfJSON, spec);
        if (multi) {
            ProductApi.IsoneModulesEngine.productService.getLogosOfProducts(listOfJSON, spec);
        }
    }
    var s = listOfJSON.toString();
    var products = JSON.parse(s);
    var priceIds = new ProductApi.ArrayList();
    for (var i = 0; i < products.length; i++) {
        priceIds.add(products[i].priceId);
    }
    var jprices = ProductApi.IsoneModulesEngine.priceService.getListDataByIds(priceIds, true);
    var prices = JSON.parse(jprices.toString());
    for (var i = 0; i < products.length; i++) {
        products[i].price = prices[i];
    }
    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        var highlight = ProductApi.DiscoveryHelper.getHighLightText(results, javaArgs, product.objId, product.title1 && product.title1.value);
        product.title = "" + highlight;
    }
    var ret = {};
    ret.total = 0 + results.getTotal();
    ret.products = products;
    return ret;
};


/**
 * 给
 * @param products
 */
ProductService.setMerchantNames = function (products) {
    var merchants = {};
    products.forEach(function (product) {
        var merchantId = product.merchantId;
        if (merchants[merchantId]) {
            product.merchantName = merchants[merchantId];
        }
        else {
            var merchant = MerchantService.getMerchant(merchantId);
            if (merchant) {
                merchants[merchantId] = merchant.name_cn;
                product.merchantName = merchant.name_cn;
            }
        }
    })

}
/**
 * 获取价格的key值
 * @param entityTypeId
 * @param entityId
 * @returns {*}
 */
ProductService.getPriceValueKey = function (entityTypeId, entityId) {
    var id = entityTypeId + "_" + entityId;
    return id;
};
/**
 * 最简单的设置价格
 * @param productId
 * @param price
 * @param merchantId
 * @param userId
 */
ProductService.updateMemberPrice = function (productId, price, merchantId, userId) {
    var priceFen = price * 100;    //以分为单位的price
    //假设没有同一个productId，多个skuId的情况
    var skus = ProductService.getSkus(productId);
    if (!skus) {
        throw  "skus==null, productId=" + productId + "<br>";
        return;
    }
    if (skus.length > 1) {
        throw  "本函数只能处理只有一个商品一个sku的情况。";
    }
    var sku = skus[0];
    var skuId = sku["id"];
    var product = ProductService.getProduct(productId);
    var priceId = product["priceId"];
    var jPrice = ProductApi.IsoneModulesEngine.priceService.getPrice(priceId);

    var values = jPrice.optJSONObject("values");
    var prices = values.optJSONObject(skuId);
    if (prices == null) {
        throw  "prices==null, skuId=" + skuId + "<br>";
        return;
    }

    var key = ProductService.getPriceValueKey("entitytype_usergroup", "c_101");
    var entityPrices = prices.optJSONArray(key);
    if (entityPrices == null) {
        throw  "entityPrices==null for entityId=c_101" + "<br>";
        return;
    }

    for (var i = 0; i < entityPrices.length(); i++) {
        var entityPrice = entityPrices.optJSONObject(i);
        var tempIsSpecialPrice = entityPrice.optString("isSpecialPrice");
        var tempMoneyType = entityPrice.optString("moneyTypeId");
        //到这里已经可以确定是普通会员的价格，只要再确定不是属于特价，则就可以确定是我们要修改的普通会员价
        if (tempIsSpecialPrice == "N" && tempMoneyType == "moneytype_RMB") {
            entityPrice.put("unitPrice", priceFen);
        }
    }

    ProductApi.IsoneModulesEngine.priceService.updatePrice(priceId, jPrice, userId, merchantId, false);
    //重建索引
    ProductApi.IsoneModulesEngine.productService.addIndexingQue(productId);
};

//getProduct
//public JSONObject getProduct(String id) throws Exception

ProductService.getProductEx = function (productId,checkDeleteState){
  var jProduct = ProductApi.IsoneModulesEngine.productService.getProduct(productId,checkDeleteState);
  if (!jProduct) return null;
  var logo =  ProductApi.ProductUtil.getProductLogo(jProduct, "200X200","");
  var product = JSON.parse(jProduct.toString());
  product.logo = "" + logo;
  if (product.priceId) {
    var price = ProductApi.IsoneModulesEngine.priceService.getPrice(product.priceId);
    if (price) {
      product.price = JSON.parse(price);
    }
  }
  return product;
}

/**
 * 获取商品对象
 * @param productId
 * @return {*}
 */
ProductService.getProduct = function (productId) {
    return ProductService.getProductEx(productId,true);
};



/**
 * 获取商品对象(不包含商品价格)
 * @param productId
 * @return {*}
 */
ProductService.getProductWithoutPrice = function (productId) {
    var jProduct = ProductApi.IsoneModulesEngine.productService.getProduct(productId);
    if (!jProduct) return null;
    return JSON.parse(jProduct.toString());
};


/**
 * 更新商品对象
 * @param productId
 * @param product
 * @param userId
 * @param merchantId
 */
ProductService.updateProduct = function (productId, product, userId, merchantId) {
    var jVersionProduct = ProductApi.IsoneModulesEngine.productService.getProduct(productId);
    var oldProduct = JSON.parse("" + jVersionProduct.toString());
    var oldDynaAttrs = oldProduct.DynaAttrs;
    var newNoVersion = product.noversion;
    delete product.noversion;
    $.override(product, oldProduct);
    $.override(product.DynaAttrs, oldDynaAttrs);
    var origProductColumnId = product["columnId"];
    var jNewProduct = new ProductApi.JSONObject(JSON.stringify(product));
    var jNewNoVersion;
    if (newNoVersion) {
        jNewNoVersion = new ProductApi.JSONObject(JSON.stringify(newNoVersion));
    }
    else {
        jNewNoVersion = new ProductApi.JSONObject();
    }
    ProductApi.IsoneModulesEngine.productService.updateProduct(productId, "hd", jNewProduct, userId, origProductColumnId, merchantId);
    ProductApi.IsoneModulesEngine.productService.batchUpdateNoVersionValues(productId, jNewNoVersion);
};

/**
 * 获取商品列表并生成大小图
 * @param productIds 商品id列表[id1,id2,id3]
 * @param spec 大小图尺寸
 * @return {*}
 */
ProductService.getProducts = function (productIds, spec) {
    var idList = new ProductApi.ArrayList();
    for (var i = 0; i < productIds.length; i++) {
        idList.add(productIds[i]);
    }
    var listOfJSON = ProductApi.IsoneModulesEngine.productService.getListDataByIds(idList, false);
    if (spec) {
        ProductApi.IsoneModulesEngine.productService.getLogoOfProducts(listOfJSON, spec);
    }

    var products = JSON.parse(listOfJSON.toString());
    var priceIds = new ProductApi.ArrayList();
    for (var i = 0; i < products.length; i++) {
        priceIds.add(products[i].priceId);
    }
    var jprices = ProductApi.IsoneModulesEngine.priceService.getListDataByIds(priceIds, true);
    var prices = JSON.parse(jprices.toString());
    for (var i = 0; i < products.length; i++) {
        products[i].price = prices[i];
    }
    return products;
};


//只针对简单的商品，也就是没有库存属性的商品有效
/*
 price格式：

 price:{
 values:{
 skuId1:{...},          //每个sku对应一个对象
 skuId2:{
 entityTypeId_entityId:[
 {...},{...},{
 skuId:
 entityTypeId:
 entityId:
 direction:"0",          //代表向用户收钱
 payable: "Y",          //
 unitPrice: "1000",     //以分为单位
 isSpecialPrice: "N"
 moneyTypeId:"moneytype_RMB"
 }
 ]
 }

 }
 }

 */

/**
 *获取商品会员价(这个方法只能用于取默认SKU的价格，主要用于商品列表页)
 * @param product
 * @return {*}
 */
ProductService.getMemberPrice = function (product) {
    var price = product.price;
    if (!price) {
        return null;
    }
    for (k in price.values) {
        var skuValues = price.values[k];
        var key = ProductService.getPriceValueKey("entitytype_usergroup", "c_101");
        var memberPrices = skuValues[key];
        if (memberPrices) {
            //在多个prices中找到我们想要的
            for (var i = 0; i < memberPrices.length; i++) {
                var p = memberPrices[i];
                //如果是特价，那就continue,这个方法只取会员价，不是实际支付价格
                if (p.isSpecialPrice == "Y") {
                    continue;
                }
                if (p.payable == 'Y' && p.moneyTypeId == 'moneytype_RMB') {
                    return p.unitPrice / 100;
                }
            }
        }
    }
    return null;
};

ProductService.getRealPayPrice = function (product, userId, userGroups) {
    var price = product.price;
    if (!price) {
        return null;
    }
    var unitPrice = 0;
    var now = (new Date()).getTime();
    for (k in price.values) {
        var skuValues = price.values[k];
        if (userId) {
            var key = ProductSƒervice.getPriceValueKey("entitytype_user", userId);
            var prices = skuValues[key];
            for (var i = 0; i < prices.length; i++) {
                var p = prices[i];
                if (p.payable == 'Y' && p.moneyTypeId == 'moneytype_RMB' && p.direction == '0') {
                    if (p.isSpecialPrice == 'Y') {
                        var beginDateTime = p.beginDateTime;
                        var endDateTime = p.endDateTime;
                        if (now > beginDateTime && now < endDateTime) {
                            if (unitPrice > p.unitPrice / 100 || unitPrice == 0) {
                                unitPrice = p.unitPrice / 100;
                            }
                        }
                    }
                    else {
                        if (unitPrice > p.unitPrice / 100 || unitPrice == 0) {
                            unitPrice = p.unitPrice / 100;
                        }

                    }

                }
            }
        }
        if (userGroups) {
            userGroups.forEach(function (userGroup) {
                var key = ProductService.getPriceValueKey("entitytype_usergroup", userGroup.id);
                var prices = skuValues[key];
                for (var i = 0; i < prices.length; i++) {
                    var p = prices[i];
                    $.log(JSON.stringify(p));
                    $.log("\n\n");
                    if (p.payable == 'Y' && p.moneyTypeId == 'moneytype_RMB' && p.direction == '0') {
                        if (p.isSpecialPrice == 'Y') {
                            var beginDateTime = p.beginDateTime;
                            var endDateTime = p.endDateTime;
                            if (now > beginDateTime && now < endDateTime) {
                                if (unitPrice > p.unitPrice / 100 || unitPrice == 0) {
                                    unitPrice = p.unitPrice / 100;
                                }
                            }
                        }
                        else {
                            if (unitPrice > p.unitPrice / 100 || unitPrice == 0) {
                                unitPrice = p.unitPrice / 100;
                            }

                        }
                    }
                }
            });
        }

    }
    if (unitPrice == 0) {
        return "无价格";
    }
    return unitPrice;
};
/**
 * 获得商品价格列表
 * @param productId 商品Id
 * @param userId    用户id
 * @param merchantId   商家ID
 * @param amount
 * @param context
 * @param policyType
 * @return {*}
 */
ProductService.getPriceValueList = function (productId, userId, merchantId, amount, context, policyType) {
    var jctx = new ProductApi.JSONObject(context);
    var mapcxt = jctx.getObjectMap();
    var listOfJSON = ProductApi.PricePolicyHelper.getPriceValueList(productId, userId, merchantId, amount, mapcxt, policyType);
    return JSON.parse(listOfJSON.toString());
};

/**
 * 批量获得商品价格列表
 * @param productList   商品列表
 * @param userId
 * @param merchantId
 * @param context
 * @param policyType
 * @returns {*}
 */
ProductService.getPriceValueListBatch = function (productList, userId, merchantId, context, policyType) {
    var jctx = new ProductApi.JSONObject(context);
    var mapcxt = jctx.getObjectMap();

    var listOfJSON = ProductApi.PricePolicyHelper.getPriceValueList(productList, userId, merchantId, mapcxt, policyType);
    return JSON.parse(listOfJSON.toString());
};
/**
 * 根据商品ID获取会员价，如果有多个SKU，就取第一个价格
 * @param productId
 * @returns {*}
 */

ProductService.getMemberPriceByProductId = function (productId) {
    var product = ProductApi.IsoneModulesEngine.productService.getProduct(productId);
    var jProduct = JSON.parse(product);
    var price = ProductApi.IsoneModulesEngine.priceService.getPrice(jProduct && jProduct.priceId);
    var jPrice = JSON.parse(price);
    if (!jPrice) {
        return null;
    }
    jProduct.price = jPrice;
    return ProductService.getMemberPrice(jProduct);
};

/**
 * 获取指定sku商品会员价
 * @param productId
 * @param skuId
 * @returns {*}
 */
ProductService.getMemberPriceBySku = function (productId, skuId) {
    var product = ProductApi.IsoneModulesEngine.productService.getProduct(productId);
    var jProduct = JSON.parse(product);
    var price = ProductApi.IsoneModulesEngine.priceService.getPrice(jProduct && jProduct.priceId);
    var jPrice = JSON.parse(price);
    if (!jPrice) {
        return null;
    }
    jProduct.price = jPrice;
    var skuPrice = ProductService.getMemberPriceBySkuId(jProduct, skuId);
    return skuPrice && skuPrice.unitPrice / 100 || null;
};


/**
 * 获取商品市场价
 * @param product  商品对象
 * @returns {*}
 */
ProductService.getMarketPrice = function (product) {
    var price = product.price;
    if (!price) {
        return null;
    }
    for (k in price.values) {
        var skuValues = price.values[k];
        var key = ProductService.getPriceValueKey("entitytype_other", "entity_marketPrice");
        var prices = skuValues[key];
        //在多个prices中找到我们想要的
        if (prices) {
            for (var i = 0; i < prices.length; i++) {
                var p = prices[i];
                if (p.payable == 'N' && p.moneyTypeId == 'moneytype_RMB') {
                    return p.unitPrice / 100;
                }
            }
        }
    }
    return null;
};

/**
 * 获取商品分类对象
 * @param columnId 商品分类Id
 * @return {*}
 */
ProductService.getColumn = function (columnId) {
    var jcol = ProductApi.IsoneBaseEngine.columnService.getColumn(columnId);
    if (!jcol) {
        return null;
    }
    return JSON.parse(jcol.toString());
};

/**
 * 获取指定分类的子分类
 * @param columnId
 * @return {*}
 */
ProductService.getChildren = function (columnId) {
    var jlist = ProductApi.IsoneBaseEngine.columnService.getAllColumnChildren(columnId);
    if (!jlist) {
        return null;
    }
    return JSON.parse(jlist.toString());
};

/**
 * 判断分类是否存在子分类
 * @param columnId
 * @return {Boolean}
 */
ProductService.hasChildren = function (columnId) {
    var sortList = ProductApi.IsoneBaseEngine.columnService.getChildren(columnId);
    return (sortList.getSize() > 0);
};

ProductService.getProductGivePoint = function (productId, erchantId, userId) {
    var givePoint = ProductApi.ProductFunction.getProductGivePoint(productId, erchantId, userId);
    var jgivePoint = $.java2Javascript(givePoint);
    if (jgivePoint) {
        return JSON.parse(givePoint);
    } else {
        return 0;
    }
};
/**
 * 获取促销图标
 * @param productId
 * @returns {*}
 */
ProductService.getPromotionLogo = function (productId) {
    return JSON.parse(ProductApi.ProductFunction.getPromotionLogo(productId));
};
/**
 * 获取商品的促销图标，当超过两个以上的商品展示的时候，应该使用该方法
 * @param jProduct                      ： 商品对象
 * @param jSysArgument_allPromotionLogo : 所有可用的促销图标
 * @returns {*}
 */
ProductService.getProductPromotionLogo = function (jProduct, jSysArgument_allPromotionLogo) {
    return ProductApi.ProductFunction.getProductPromotionLogo(jProduct, jSysArgument_allPromotionLogo)
}

/**
 * 考虑了经营范围的获取子栏目
 */
ProductService.getChildrenWithBusinessRange = function (merchantId, columnId) {
    var children = ProductApi.IsoneBaseEngine.columnService.getAllColumnChildren(columnId);
    if (!children) {
        return null;
    }
    children = ProductApi.MerchantBusinessRangeUtil.filterByBusinessRange(merchantId, children);
    return JSON.parse(children.toString());
};
/**
 * 获取指定分类商品列表
 * @param columnId 商品分类Id
 * @param merchantId 商家Id
 * @param from 数据开始索引
 * @param num 数量
 * @returns {*}
 */
ProductService.getProductsOfColumn = function (columnId, merchantId, from, num) {
    var products = ProductApi.IsoneModulesEngine.productService.getProducts(columnId, merchantId, from, num);
    return JSON.parse(products.toString());
};
/**
 * 通过商品ids获取商品列表
 * @param ids
 * @returns {*}
 */
ProductService.getProductsByIdsWithoutPrice = function (ids) {
    var products = ProductApi.IsoneModulesEngine.productService.getListDataByIds(ids, false);
    return JSON.parse(products.toString());
};
/**
 * 获取商品图片列表
 * @param product 商品对象
 * @returns {*}
 */
ProductService.getPics = function (product) {
    var jProduct = new ProductApi.JSONObject(JSON.stringify(product));
    var pics = ProductApi.IsoneModulesEngine.productService.getPics(jProduct);
    return $.java2Javascript(pics);
};

/**
 * 获取商品已卖出数量
 * @param productId 商品id
 * @returns {*}
 */
ProductService.getSalesAmount = function (productId) {
    return ProductApi.IsoneModulesEngine.productSalesService.getProductTotalSalesAmount(productId, "confirm");
};
/**
 * 商品上架
 * @param productId
 * @param userId
 */
ProductService.publishUp = function (productId, userId) {
    ProductApi.IsoneModulesEngine.productService.noversionUpdatePublishState(productId, "1", "");
};
/**
 * 商品下架
 * @param productId
 * @param userId
 */
ProductService.publishDown = function (productId, userId) {
    ProductApi.IsoneModulesEngine.productService.noversionUpdatePublishState(productId, "0", "");
};
/**
 * 获取商品上架状态
 * @param product
 * @returns {string}
 */
ProductService.getPublishState = function (product) {
    return "" + ProductApi.ProductUtil.getPublishState(new ProductApi.JSONObject(JSON.stringify(product)));
};
/**
 * 获取商品的审核状态
 * @param product
 * @returns {string}
 */
ProductService.getCertifyState = function (product) {
    return "" + ProductApi.ProductUtil.getCertifyState(new ProductApi.JSONObject(JSON.stringify(product)));
};
/**
 * 检查是否可卖，true代表可卖，false代表不可卖
 * @param product
 * @returns {boolean}
 */
ProductService.isCanBeBuy = function (product) {
    return ProductApi.ProductUtil.isCanBeBuy(new ProductApi.JSONObject(JSON.stringify(product)));
};

/**
 * 检查是否可卖，空字符串代表可卖，否则返回不可卖的原因。
 * @param product
 * @returns {string}
 */
ProductService.checkBuyStatus = function (product) {
    return ProductApi.ProductUtil.checkBuyStatus(new ProductApi.JSONObject(JSON.stringify(product))) + "";
};
/**
 * 获取商品库存属性
 * @param product
 * @returns {*}
 */
ProductService.getInventoryAttrs = function (product) {
    var jProduct = new ProductApi.JSONObject(JSON.stringify(product));
    var jInventoryAttrs = ProductApi.DynaAttrUtil.getProductInventoryPropertyAttrs(jProduct);
    return JSON.parse("" + jInventoryAttrs.toString());
};
/**
 * 获取商品产品属性
 * @param product
 * @returns {Array}
 */
ProductService.getProductAttrs = function (product) {
    var displayAttrs = [];
    var attrTemplate = ProductApi.DynaAttrUtil.getCompleteAttrTemplateByColumnId(product.columnId);
    var productAttrGroups = ColumnService.getAttrGroups(attrTemplate);
    for (var i = 0; i < productAttrGroups.size(); i++) {
        var group = productAttrGroups.get(i);
        var jGroup = JSON.parse(group.toString());
        if (jGroup.id != 'attrgrp_10000' && jGroup.id != 'attrggetMemberPriceBySkurp_10010' && jGroup.id != 'attrgrp_10011' && jGroup.id != 'attrgrp_guarantee_001') {
            var attrs = jGroup.attrs;
            for (var j = 0; j < attrs.length; j++) {
                if (attrs[j].type != 'attrtype_pic' && attrs[j].userVisible) {
                    var displayAttr = {};
                    displayAttr.name = attrs[j].name;
                    displayAttr.id = attrs[j].id;
                    var DynaAttrs = product.DynaAttrs;
                    if (DynaAttrs[attrs[j].id]) {
                        if (DynaAttrs[attrs[j].id].value != null || DynaAttrs[attrs[j].id].value != "") {
                            displayAttr.value = DynaAttrs[attrs[j].id].value;
                        }
                        if (DynaAttrs[attrs[j].id].valueIds != null || DynaAttrs[attrs[j].id].valueIds != "") {
                            var value = DynaAttrs[attrs[j].id].valueIds;
                            var isInventoryProperty = attrs[j].isInventoryProperty;
                            if (value && !isInventoryProperty) {
                                var values = value.split(",");
                                var standardValues = attrs[j] && attrs[j].standardValues;

                                var strs = "";
                                for (var z = 0; z < standardValues.length; z++) {
                                    var isCheck = false;
                                    for (var k = 0; k < values.length; k++) {
                                        if (values[k].equals(standardValues[z].id)) {
                                            isCheck = true;
                                            break;
                                        }
                                    }

                                    if (isCheck) {
                                        if (strs.length > 0) {
                                            strs += "，";
                                        }
                                        strs += standardValues[z].name;
                                    }

                                }
                                if (value.indexOf("sv_other") >= 0) {
                                    var otherValue = DynaAttrs[attrs[j].id].otherValue;
                                    if (strs.length > 0) {
                                        strs += "，";
                                    }
                                    strs += otherValue;
                                }
                                displayAttr.value = (strs);
                            }
                        }
                        if (DynaAttrs[attrs[j].id].valueId != null || DynaAttrs[attrs[j].id].valueId != "") {
                            var value = DynaAttrs[attrs[j].id].valueId;
                            var isInventoryProperty = attrs[j].isInventoryProperty;
                            if (value && !isInventoryProperty) {
                                var values = value.split(",");
                                var standardValues = attrs[j] && attrs[j].standardValues;
                                var strs = "";
                                if (standardValues) {
                                    for (var z = 0; z < standardValues.length; z++) {
                                        var isCheck = false;
                                        for (var k = 0; k < values.length; k++) {
                                            if (values[k].equals(standardValues[z].id)) {
                                                isCheck = true;
                                                break;
                                            }
                                        }

                                        if (isCheck) {
                                            strs += standardValues[z].name;
                                        }

                                    }
                                }
                                if (value.indexOf("sv_other") >= 0) {
                                    var otherValue = DynaAttrs[attrs[j].id].otherValue;
                                    strs += otherValue;
                                }
                                displayAttr.value = (strs);
                            }
                        }

                    }
                    if (displayAttr.value != null && displayAttr.value != "") {
                        displayAttrs.push(displayAttr);
                    }
                }
            }
        }
    }

    return displayAttrs;
};


/**
 * 获得一个商品的属性，例如大码，红色
 */
ProductService.getAttrsString = function (productId, skuId) {
    var product = ProductService.getProduct(productId);
    var skus = ProductService.getSkus(productId);
    var inventoryAttrs = ProductService.getInventoryAttrs(product);
    if (!inventoryAttrs) {
        return "";
    }
    //找到sku
    var sku = null;
    for (var i = 0; i < skus.length; i++) {
        var tsku = skus[i];
        if (tsku.id == skuId) {
            sku = tsku;
            break;
        }
    }
    var valueNames = [];
    if (sku && sku.attrs) {
        for (var k in sku.attrs) {
            var v = sku.attrs[k];
            //从inventoryAttrs中搜索
            var inventoryAttr = null;
            for (var j = 0; j < inventoryAttrs.length; j++) {
                var tempAttr = inventoryAttrs[j];
                if (tempAttr.id == k && tempAttr.standardValues) {
                    tempAttr.standardValues.forEach(function (sv) {
                        if (sv.id == v) {
                            valueNames.push(sv.name);
                        }
                    });
                }
            }
        }
    }
    return valueNames.join(",");

};


ProductService.getFacets = function (facets, column_facetColumn) {
    var ret = {};
    var brandList = facets.get("brandId");
    var brandNameList = facets.get("brand");
    var column_facetColumn = facets.get(column_facetColumn || "column_facetColumn3");
    ret.brandList = JSON.parse(ProductService.getJSONFormList(brandList));
    ret.brandNameList = JSON.parse(ProductService.getJSONFormList(brandNameList));
    ret.column_facetColumn = JSON.parse(ProductService.getJSONFormList(column_facetColumn));
    if (ret.column_facetColumn) {
        for (var i = 0; i < ret.column_facetColumn.length; i++) {
            var column = ColumnService.getColumn(ret.column_facetColumn[i].name);
            if (column) {
                ret.column_facetColumn[i].displayName = column.name;
            } else {
                ret.column_facetColumn[i].displayName = "";
            }

        }
    }
    if (ret.brandList) {
        for (var i = 0; i < ret.brandList.length; i++) {
            var brand = BrandService.getBrand(ret.brandList[i].name);
            if (brand) {
                ret.brandList[i].displayName = brand.name;
            } else {
                ret.brandList[i].displayName = "";
            }
        }
    }
    if (ret.brandNameList) {
        for (var i = 0; i < ret.brandNameList.length; i++) {
            ret.brandNameList[i].displayName = ret.brandNameList[i].name;
        }
    }
    return ret;
};
/**
 * @private
 * @param list
 * @returns {string}
 */
ProductService.getJSONFormList = function (list) {
    if (list && list.size() > 0) {
        var result = new ProductApi.JSONArray();
        for (var i = 0; i < list.size(); i++) {
            jObject = new ProductApi.JSONObject();
            jObject.put("name", list.get(i).name);
            jObject.put("value", list.get(i).value);
            result.put(jObject);
        }
        return result.toString();
    } else {
        return "[]";
    }

};
/**
 * 获取浏览记录
 * @param request
 * @param num
 * @returns {*}
 */
ProductService.getProductViewHistory = function (request, num) {
    var list = ProductApi.ProductViewHistoryUtil.getProductViewHistory(request, num);
    return JSON.parse(list.toString());
};
/**
 * 获取商品得优惠信息
 * @param productId
 * @param merchantId
 * @param userId
 */
ProductService.getClassifiedPossibleRules = function (productId, merchantId, userId) {
    var rules = ProductApi.BusinessRuleUtil.getClassifiedPossibleRules(productId, merchantId, userId);
    var jRules = $.java2Javascript(rules);
    return jRules;
};


/**
 * 获得商品的真实购买价
 *
 * @param userId
 * @param merchantId
 * @param productId
 * @param skuId
 * @return
 * @throws Exception
 */
ProductService.getRealPayPrice = function (userId, merchantId, productId, skuId, scope) {
    return "" + ProductApi.ProductPriceUtil.getRealPayPrice(userId, merchantId, productId, skuId, scope || null);
};

/**
 * 获得商品的真实购买价
 * @param userId
 * @param merchantId
 * @param productId
 * @param skuId
 * @param scope
 * @returns {*}
 */
ProductService.getRealPayPriceValue = function (userId, merchantId, productId, skuId, scope) {
    var json = ProductApi.ProductPriceUtil.getRealPayPriceValue(userId, merchantId, productId, skuId, scope || null);
    if(json){
        return JSON.parse(json.toString());
    }
    return null;
};

/**
 *获得一个product的起订量
 *返回long
 * @param productId,skuId,
 * @return {*}
 */
ProductService.getOnceMustBuyCount = function (id, skuId) {
    var onceMustBuyCount = ProductApi.IsoneModulesEngine.pskuService.getOnceMustBuyCount(id, skuId);
    return onceMustBuyCount;
};

/**
 * 根据商品ID获得所有的SKU
 * @param productId
 * @return {*}
 */
ProductService.getSkus = function (productId) {
    var jskus = ProductApi.IsoneModulesEngine.pskuService.getAllList(productId);
    return JSON.parse(jskus.toString());
};

ProductService.getSkusAndAttrs = function (productId) {
    var jProduct = ProductApi.IsoneModulesEngine.productService.getProduct(productId);
    if (!jProduct) {
        return null;
    }
    var jskus = ProductApi.IsoneModulesEngine.pskuService.getAllList(productId);
    if (!jskus) {
        return [];
    }
    var skus = JSON.parse(jskus.toString());


    skus.forEach(function (sku) {
        if(!sku.v || sku.v<2){
            var attrs = sku.attrs;
            var fullAttrs = [];
            for (var attrId in attrs) {
                var valueId = attrs[attrId];
                var standardValue = ProductApi.ProductUtil.getStandardValue(jProduct, attrId, valueId);
                if (standardValue == null) {
                    standardValue = ProductApi.IsoneBaseEngine.standardValueService.getValue(valueId);
                }
                if (standardValue == null) {
                    var name = "-";
                }
                else {
                    var name = "" + standardValue.optString("name");
                }

                var attr = {
                    attrId: attrId,
                    valueId: valueId,
                    name: name,
                    value:name
                }
                fullAttrs.push(attr);
            }
            sku.fullAttrs = fullAttrs;
        }
        else{
            var attrs = sku.attrs;
            var fullAttrs = [];
            for (var attrName in attrs) {
                var attr = {
                    attrId:attrName,
                    valueId:attrs[attrName],
                    name:attrs[attrName],
                    value:attrs[attrName]
                }
                fullAttrs.push(attr);
            }
            sku.fullAttrs = fullAttrs;
        }

    });
    return skus;
};


/**
 * 根据商品ID获得默认SKU
 * @param productId
 * @returns {*}
 */
ProductService.getHeadSku = function (productId) {
    var sku = ProductApi.SkuUtil.getHeadSku(productId);
    if (!sku) {
        return null;
    }
    var s = "" + sku.toString();
    return JSON.parse(s);
};

/**
 * 根据productId 和 skuId获取物料对象
 * @param productId
 * @param skuId
 * @returns {*}
 */
ProductService.getSku = function (productId, skuId) {
    var jskus = ProductApi.IsoneModulesEngine.pskuService.getAllList(productId);
    var jSku = ProductApi.SkuUtil.getSkuBySkuId(jskus, skuId);
    if (!jSku) {
        return;
    }
    return JSON.parse(jSku.toString());
};

/**
 * 获得HeadSku
 * @param skus
 * @returns {*}
 */
ProductService.getHeadSkuByList = function (skus) {
    var jSkus = $.toJSONObjectList(skus);
    var jSku = ProductApi.SkuUtil.getHeadSku(jSkus);
    if (!jSku) {
        return;
    }
    return JSON.parse(jSku.toString());
};

/**
 * 获得sku
 * @param skus
 * @param skuId
 * @returns {*}
 */
ProductService.getSkuByList = function (skus, skuId) {
    var jSkus = $.toJSONObjectList(skus);
    var jSku = ProductApi.SkuUtil.getSkuBySkuId(jSkus, skuId);
    if (!jSku) {
        return;
    }
    return JSON.parse(jSku.toString());
};

/**
 * 内部辅助方法
 * @param jPrice
 * @param skuId
 * @param entityTypeId
 * @param entityId
 * @returns {*}
 */
ProductService.getPriceValueBySkuId = function (jPrice, skuId, entityTypeId, entityId, payable) {
    if (!jPrice) {
        return null;
    }
    for (var k in jPrice.values) {
        var skuValues = jPrice.values[k];
        var key = ProductService.getPriceValueKey(entityTypeId, entityId);
        var memberPrices = skuValues[key];
        if (memberPrices) {
            //在多个prices中找到我们想要的
            for (var i = 0; i < memberPrices.length; i++) {
                var p = memberPrices[i];
                if (p.skuId != skuId) {
                    continue;
                }
                if (p.isSpecialPrice == "Y") {
                    //特价不取
                    continue;
                }
                if (p.payable == payable && p.moneyTypeId == 'moneytype_RMB') {
                    return p;
                }
            }
        }
    }
    return null;
};

/**
 * 内部辅助方法
 * @param product
 * @param skuId
 * @param entityTypeId
 * @param entityId
 * @returns {*}
 */
ProductService.getPriceBySkuId = function (product, skuId, entityTypeId, entityId, payable) {
    var price = product.price;
    if (!price) {
        return null;
    }

    var skuPrice = ProductService.getPriceValueBySkuId(price, skuId, entityTypeId, entityId, payable);
    if (skuPrice) {
        return skuPrice;
    }
    var productId = product.objId;
    var skus = ProductService.getSkus(productId);

    var jSku = ProductService.getSkuByList(skus, skuId);
    if (jSku) {
        if (jSku.inheritDefault && jSku.inheritDefault == "1") {
            //只有继承默认价格的时候才取默认的价格
            var jHeadSku = ProductService.getHeadSkuByList(skus);
            if (jHeadSku) {
                skuPrice = ProductService.getPriceValueBySkuId(price, jHeadSku.id, entityTypeId, entityId, payable);
                if (skuPrice) {
                    return skuPrice;
                }
            }
        }
    }
    return null;
};

/**
 * 根据skuId获得相应的会员价
 * @param product
 * @param skuId
 * @returns {*}
 */
ProductService.getMemberPriceBySkuId = function (product, skuId) {
    var entityTypeId = "entitytype_usergroup";
    var entityId = "c_101";

    return ProductService.getPriceBySkuId(product, skuId, entityTypeId, entityId, "Y");
};

/**
 * 根据skuId获得相应的市场价
 * @param product
 * @param skuId
 * @returns {*}
 */
ProductService.getMarketPriceBySkuId = function (product, skuId) {
    var entityTypeId = "entitytype_other";
    var entityId = "entity_marketPrice";

    return ProductService.getPriceBySkuId(product, skuId, entityTypeId, entityId, "N");
};

/**
 * 获取商家的所有商品
 * @param columnId
 * @param merchantId
 * @param page
 * @param number
 * @returns {Array}
 */
ProductService.getProductIds = function (columnId, merchantId, page, number) {
    var iSortList = ProductApi.IsoneModulesEngine.productService.getList(columnId, merchantId);
    var size = iSortList.getSize();
    var pageCount = Math.floor((size + number - 1) / number);
    var start = page * number;
    var last = start + number > size ? size - start : number;
    var sortList = iSortList.getRange(start, last);
    var ids = [];
    for (var i = 0; i < sortList.size(); i++) {
        ids.push(sortList.get(i).getObjid() + "");
    }
    return ids;
};

/**
 * 获取商品实际库存
 * @param productId
 * @param productId
 * @returns {long}
 */
ProductService.getRealAmount = function (productId, skuId) {
    if (!productId || !skuId) {
        return -1;
    }
    var jProduct = ProductService.getProduct(productId);
    var jSku = ProductService.getSku(productId, skuId);
    if (!jProduct || !jSku) {
        return -1;
    }
    return ProductApi.IsoneModulesEngine.pskuService.getRealAmount($.toJavaJSONObject(jProduct), $.toJavaJSONObject(jSku));
};

/**
 * 获取商品可卖数
 * @param productId
 * @param skuId
 * @returns {long}
 */
ProductService.getSellableCount = function (productId, skuId) {
    if (!productId || !skuId) {
        return -1;
    }
    var jProduct = ProductService.getProduct(productId);
    var jSku = ProductService.getSku(productId, skuId);
    if (!jProduct || !jSku) {
        return -1;
    }
    return ProductApi.IsoneModulesEngine.pskuService.getSellableCount($.toJavaJSONObject(jProduct), $.toJavaJSONObject(jSku));
};

/**
 * 根据商品和SKU获取库存
 * @param product
 * @param sku
 * @returns {*}
 */
ProductService.getSellableCountBySku = function (product, sku) {
    if (!product || !sku) {
        return -1;
    }
    return ProductApi.IsoneModulesEngine.pskuService.getSellableCount($.toJavaJSONObject(product), $.toJavaJSONObject(sku));
};

/**
 * 获取商品安全可卖数
 * @param productId
 * @param skuId
 * @returns {long}
 */
ProductService.getSecuritySellableCount = function (productId, skuId) {
    if (!productId || !skuId) {
        return -1;
    }
    return ProductApi.IsoneModulesEngine.pskuService.getSecuritySellableCount(productId, skuId);
};

/**
 * 获取商品冻结库存
 * @param productId
 * @param skuId
 * @returns {long}
 */
ProductService.getFreezeAmount = function (productId, skuId) {
    if (!productId || !skuId) {
        return -1;
    }
    var jProduct = ProductService.getProduct(productId);
    var jSku = ProductService.getSku(productId, skuId);
    if (!jProduct || !jSku) {
        return -1;
    }
    return ProductApi.IsoneModulesEngine.pskuService.getFreezeAmount($.toJavaJSONObject(jProduct), $.toJavaJSONObject(jSku));
};

/**
 * 获得商品的第一张图片大小图
 * @param product
 * @param size
 * @param defaultPath
 */
ProductService.getProductLogo = function (product, size, defaultPath) {
    if (!product) {
        return defaultPath;
    }
    var jProduct = $.JSONObject(product);
    var logo = ProductApi.ProductUtil.getProductLogo(jProduct, size, defaultPath);
    if (!logo || logo == "") {
        return defaultPath;
    }
    return logo + "";
};

/**
 * 商品重建索引
 * @param productId
 */
ProductService.reBuildIndexing = function (productId) {
    if (!productId) {
        return null;
    }
    return ProductApi.IsoneModulesEngine.productService.addIndexingQue(productId);
};

/**
 * 添加商品经营的门店
 * @param productId
 * @param shopId
 */
ProductService.add2SalesShopList = function (productId, shopId) {
    if (!productId || !shopId) {
        return;
    }
    ProductApi.IsoneModulesEngine.productService.add2SalesShopList(productId, shopId);
};

/**
 * 从所有经营门店的中删除
 * @param productId
 * @param shopId
 */
ProductService.deleteFromSalesShopList = function (productId, shopId) {
    if (!productId || !shopId) {
        return;
    }
    ProductApi.IsoneModulesEngine.productService.deleteFromSalesShopList(productId, shopId);
};

/**
 * 从所有经营门店的中删除
 * @param productId
 */
ProductService.getSalesShopList = function (productId) {
    if (!productId) {
        return null;
    }
    return ProductApi.IsoneModulesEngine.productService.getSalesShopList(productId);
};

/**
 * 添加商品多分类
 * @param productId
 * @param columnId
 */
ProductService.add2MultiColumnList = function (productId, columnId) {
    if (!productId || !columnId) {
        return;
    }
    ProductApi.IsoneModulesEngine.productService.add2MultiColumnList(productId, columnId);
};


/**
 * 从多分类的中删除
 * @param productId
 * @param columnId
 */
ProductService.deleteFromMultiColumnList = function (productId, columnId) {
    if (!productId || !columnId) {
        return;
    }
    ProductApi.IsoneModulesEngine.productService.deleteFromMultiColumnList(productId, columnId);
};

/**
 * 为商品增加promotionLogo
 * @param productId
 * @param logs
 */
ProductService.addPromotionLog = function (productId, logs) {
    if (!productId || !logs) {
        return null;
    }
    var jLogs = $.JSONArray(logs);
    return ProductApi.ProductPromotionLogoUtil.addPromotionLogo(productId, jLogs);
};

ProductService.getMultiColumnIds = function (productId) {
    var cids = ProductApi.IsoneModulesEngine.productService.getMultiColumnIds(productId);
    var result = [];
    for (var i = 0; i < cids.size(); i++) {
        var cid = "" + cids.get(i);
        result.push(cid);
    }
    return result;
};

/**
 * 批量修改商品的无版本信息
 * @param productId
 * @param values
 */
ProductService.batchUpdateNoVersionValues = function (productId, values) {
    var jValues = $.JSONObject(values);
    ProductApi.IsoneModulesEngine.productService.batchUpdateNoVersionValues(productId, jValues);
};

ProductService.addSku = function(productId,sku){
  var jSku = $.JSONObject(sku);
  return "" + ProductApi.IsoneModulesEngine.pskuService.addSku(productId,jSku);
};

ProductService.updateSku = function(productId,skuId,sku){
    var jSku = $.JSONObject(sku);
    ProductApi.IsoneModulesEngine.pskuService.updateSku(productId,skuId,jSku);
};

ProductService.setRealAmount = function(productId,skuId,realAmount){
    ProductApi.IsoneModulesEngine.pskuService.setRealAmount(productId, skuId, realAmount);//实际库存
};

ProductService.getRealAmountFromMall = function(productId,skuId){
    return ProductApi.IsoneModulesEngine.pskuService.getRealAmountFromMall(productId, skuId);//实际库存
};

ProductService.deleteProduct = function(productId,userId){
  var jResult = ProductApi.IsoneModulesEngine.productService.deleteProduct(productId,userId,'null','null');
  return JSON.parse("" + jResult.toString());
};

/**
 * 获得款型代码对应的所有商品
 * @param merchantId
 * @param productNumber
 * @param brandNameHex
 * @returns {null}
 */
ProductService.getProductNumberRelation = function(merchantId, productNumber, brandNameHex){
    var json = ProductApi.ProductNumberUtil.getProductNumberRelation(merchantId, productNumber, brandNameHex);
    if(!json){
        return null;
    }
    return JSON.parse("" + json.toString());
};

/**
 * 获得完整的商品卖点信息（包括平台设置的公告和商家设置的公告）
 * @param product
 * @returns {string}
 */
ProductService.getCompleteSellingPoint = function(product){
    var jProduct = $.JSONObject(product);
    var s = ProductApi.ProductValueUtil.getCompleteSellingPoint(jProduct);
    return s + "";
};

