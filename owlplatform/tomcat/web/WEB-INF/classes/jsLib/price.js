//#import sysArgument.js
var PriceApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules.price,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.commons,
    Packages.net.xinshi.isone.modules.queue,
    Packages.net.xinshi.isone.modules.versionobject,
    Packages.net.xinshi.isone.modules.sysargument,
    Packages.net.xinshi.isone.modules.product
);

var priceService = {};

/**
 * 获取价格对象
 * @param id
 * @returns {*}
 */
priceService.getPrice = function (id) {
    var priceObj = PriceApi.IsoneModulesEngine.priceService.getPrice(id);
    if (!priceObj) {
        return null;
    }
    return JSON.parse(priceObj.toString());
};

priceService.getPriceByVersionId = function (id, vid) {
    var priceObj = PriceApi.IsoneModulesEngine.priceService.getPrice(id, vid);
    if (!priceObj) {
        return null;
    }
    return JSON.parse(priceObj.toString());
};

priceService.getPriceValue = function (price, skuId, entity_type, entity_id, moneyTypeId, direction) {
    var jPrice = $.toJavaJSONObject(price);
    var json = PriceApi.PriceUtil.getPriceValue(jPrice, skuId, entity_type, entity_id, moneyTypeId, direction);
    if (!json) {
        return null;
    }
    return JSON.parse(json.toString());
};

priceService.updatePrice = function (priceId, price, userId) {
    var jPrice = $.toJavaJSONObject(price);
    PriceApi.IsoneModulesEngine.priceService.updatePrice(priceId, jPrice, userId, "head_merchant", true);
};

/**
 * 根据priceValueId获得一个具体的价格
 * @param price
 * @param skuId
 * @param entity_type
 * @param entity_id
 * @param priceValueId
 * @returns {*}
 */
priceService.getPriceValueByPriceValueId = function (price, skuId, entity_type, entity_id, priceValueId) {
    var jPrice = $.toJavaJSONObject(price);
    var json = PriceApi.PriceUtil.getPriceValue(jPrice, skuId, entity_type, entity_id, priceValueId);
    if (!json) {
        return null;
    }
    return JSON.parse(json.toString());
};

priceService.setPriceValue = function (price, skuId, priceValue) {

    if (!price.values) {
        price.values = {};
    }
    var valueList = price.values[skuId];
    if (!valueList) {
        valueList = [];
        price.values[skuId] = valueList;
    }

    var update = false;

    for (var k in valueList) {
        var priceValueArray = valueList[k];
        for (var i = 0; i < priceValueArray.length; i++) {
            var pvalue = priceValueArray[i];

            if (priceValue.priceValueId) {
                if (pvalue.priceValueId == priceValue.priceValueId) {
                    $.copy(pvalue, priceValue);
                    update = true;
                    return price;
                }
            }
            else {
                var equal = (pvalue.entityTypeId === priceValue.entityTypeId) && (pvalue.entityId === priceValue.entityId) && (pvalue.direction === priceValue.direction) && (pvalue.payable === priceValue.payable)
                    && (pvalue.isSpecialPrice === priceValue.isSpecialPrice)
                    && (pvalue.moneyTypeId === priceValue.moneyTypeId);

                if (equal) {
                    if (priceValue.isSpecialPrice == 'Y' || priceValue.isSpecialPrice == 'y') {
                        equal = false;
                        //现在判断是否能增加
                        var bt1 = pvalue["beginDateTime"];
                        var et1 = pvalue["endDateTime"];
                        var bt2 = priceValue["beginDateTime"];
                        var et2 = priceValue["endDateTime"];
                        if (bt1 >= bt2 && bt1 <= et2) {
                            throw "特价区间重叠！"
                        }
                        if (et1 >= bt2 && et1 <= et2) {
                            throw "特价区间重叠！"
                        }
                        if (bt2 >= bt1 && bt2 <= et1) {
                            throw "特价区间重叠！"
                        }
                        if (et2 >= bt1 && et2 <= et1) {
                            throw "特价区间重叠！"
                        }
                    }
                    $.copy(pvalue, priceValue);
                    update = true;
                    return price;
                }
            }
        }
    }
    ;
    if (!update) {
        //不是update,那就是增加了
        var jPrice = $.toJavaJSONObject(price);
        var jPriceValue = $.toJavaJSONObject(priceValue);
        PriceApi.PriceUtil.setPriceValue(jPrice, jPriceValue, skuId, priceValue.entityTypeId, priceValue.entityId);
        var newPrice = JSON.parse("" + jPrice.toString());

        return newPrice;
    }
    else {
        return price;
    }

};

priceService.setPrice = function (productId, skuId, price, priceValue, merchantId, userId) {
    var newPrice = priceService.setPriceValue(price, skuId, priceValue);
    var jPrice = $.toJavaJSONObject(newPrice);
    var isPriceCertify = PriceApi.SysArgumentUtil.getSysArgumentBooleanValue("head_merchant", PriceApi.Global.COLUMNID_PRICE_ARGUMENT, "isEnablePriceCertify");
    if (isPriceCertify) {
        jPrice.put("certifyState", PriceApi.IProductService.CERTIFY_STATE_NOT);
        PriceApi.IsoneModulesEngine.priceService.updatePrice(price.objId, jPrice, userId, merchantId, true);
        PriceApi.IsoneModulesEngine.productService.add2PriceCertifyList(productId, PriceApi.Global.HEAD_MERCHANT);
    } else {
        PriceApi.IsoneModulesEngine.priceService.updatePrice(price.objId, jPrice, userId, merchantId, false);
        if (priceValue.isSpecialPrice == 'Y' || priceValue.isSpecialPrice == 'y') {
            var beginDate = priceValue.beginDateTime;
            var endDate = priceValue.endDateTime;
            var formatBeginDate = PriceApi.DateUtil.getStringDate(beginDate, PriceApi.DateUtil.FORMAT_LONGDATETIME_COMPACT);
            var formatEndDate = PriceApi.DateUtil.getStringDate(endDate, PriceApi.DateUtil.FORMAT_LONGDATETIME_COMPACT);
            PriceApi.IsoneModulesEngine.dateQueueService.addQueue(PriceApi.IDateQueueService.QUEUE_TYPE_SPECIAL, formatBeginDate, productId);
            PriceApi.IsoneModulesEngine.dateQueueService.addQueue(PriceApi.IDateQueueService.QUEUE_TYPE_SPECIAL, formatEndDate, productId);
        }
        //重建索引
        PriceApi.IsoneModulesEngine.productService.addIndexingQue(productId);
    }
};

/**
 * 检查价格在指定天数是涨还是跌
 * @param priceId
 * @param headSkuId
 * @param skuId
 * @param changeDay
 * @returns {string}
 */
priceService.checkProductPriceUpsAndDownsFlag = function (priceId, headSkuId, skuId, changeDay) {
    var result = PriceApi.ProductPriceUtil.checkProductPriceUpsAndDownsFlag(priceId, headSkuId, skuId, changeDay);
    return result + "";
};

priceService.checkProductPriceUpsAndDownsFlagEx = function (memberPriceResult, changeDay) {
    var jMemberPriceResult = $.toJavaJSONObject(memberPriceResult);
    var result = PriceApi.ProductPriceUtil.checkProductPriceUpsAndDownsFlag(jMemberPriceResult, changeDay);
    return result + "";
};

/**
 * 获得最近两次会员价格
 * @param priceId
 * @param headSkuId
 * @param skuId
 * @returns {*}
 */
priceService.getLatestMemberPrice = function (priceId, headSkuId, skuId) {
    var result = PriceApi.ProductPriceUtil.getLatestMemberPrice(priceId, headSkuId, skuId);
    return JSON.parse(result.toString());
};

/**
 * 获取商品物料的成本价格
 * @param userId
 * @param merchantId
 * @param productId
 * @param skuId
 */
priceService.getSupplyPrice = function (userId, merchantId, productId, skuId) {
    var result = PriceApi.ProductPriceUtil.getSupplyPrice(userId, merchantId, productId, skuId);
    return result;
};

/**
 * 获取商品的特价（当前特价或者未来的特价，即未结束的特价）
 * @param jProduct
 */
priceService.getSpecialPriceValue = function (jProduct) {
    if (!jProduct) {
        return null;
    }
    var priceId = jProduct.priceId;
    if (!priceId) {
        return null;
    }
    var jPrice = priceService.getPrice(priceId);
    if (!jPrice) {
        return null;
    }
    var values = jPrice.values;
    if (!values) {
        return null;
    }
    for (var key in values) {
        var skuPrices = values[key];

        var entityTypeId = "entitytype_usergroup";
        var entityId = "c_101";
        var priceKey = priceService.getPriceValueKey(entityTypeId, entityId);
        var priceValues = skuPrices[priceKey];
        if (priceValues == null) {
            continue;
        }

        var result = priceService.getMatchPriceValues(priceValues);
        if (result.length == 0) {
            continue;
        }

        var priceValue = result[0];
        var dfBeginTime = Number(priceValue["beginDateTime"] || 0);
        var dfEndTime = Number(priceValue["endDateTime"] || 0);
        for (var i = 1; i < result.length; i++) {
            var jTempPriceValue = result[i];
            var beginDateTime = jTempPriceValue["beginDateTime"] || 0;
            var endDateTime = jTempPriceValue["endDateTime"] || 0;
            if (beginDateTime == 0 && endDateTime == 0) {
                continue;
            }
            if (beginDateTime < dfBeginTime) {
                priceValue = jTempPriceValue;
            }
        }
    }

    return priceValue;
};

/**
 * 辅助方法：获取到所有未结束的特价
 * @param priceValues
 * @returns {Array}
 */
priceService.getMatchPriceValues = function (priceValues) {
    var result = [];
    var currentTime = new Date().getTime();

    var moneyTypeId = "moneytype_RMB";
    var direction = "0";//默认取扣
    var isSpecialPrice = "Y"; //默认取非特价
    for (var i = 0; i < priceValues.length; i++) {
        var tempPriceValue = priceValues[i];
        var tempMoneyTypeId = tempPriceValue["moneyTypeId"];
        if (tempMoneyTypeId != moneyTypeId) {
            continue;
        }

        var tempDirection = tempPriceValue["direction"];
        var tempIsSpecialPrice = tempPriceValue["isSpecialPrice"];
        if (tempDirection != direction || tempIsSpecialPrice != isSpecialPrice) {
            continue;
        }
        var beginDateTime = tempPriceValue["beginDateTime"] || 0;
        var endDateTime = tempPriceValue["endDateTime"] || 0;
        if (currentTime < endDateTime) {
            result.push(tempPriceValue);//未结束的特价
        }
    }
    return result;
};

priceService.getPriceValueKey = function (entityTypeId, entityId) {
    return entityTypeId + "_" + entityId;
};

priceService.getPriceValueId = function () {
    return "" + PriceApi.IsoneModulesEngine.priceService.getPriceValueId();
};