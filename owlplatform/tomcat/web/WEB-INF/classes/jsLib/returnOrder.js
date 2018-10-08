//#import Util.js
//#import product.js
//#import file.js
//#import DateUtil.js

//退换货API
var ReturnOrderApi = new JavaImporter(
    Packages.net.xinshi.isone.functions.order.OrderFunction,
    Packages.net.xinshi.isone.modules.order.OrderUtil,
    Packages.net.xinshi.isone.modules.order.OrderHelper,
    Packages.net.xinshi.isone.modules.order.IOrderService,
    Packages.net.xinshi.isone.modules.order.OrderItemUtil,
    Packages.net.xinshi.isone.modules.order.bean.OrderState,
    Packages.net.xinshi.isone.modules.order.afterservice.AfterOrderSearchUtil,
    Packages.java.util.HashMap,
    Packages.org.json.JSONObject,
    Packages.org.json.JSONArray
);

var ReturnOrderService = {

    //可申请退换货订单列表
    getAbleReturnOrderList: function (userId, page, count, keyword) {
        var columnId = ReturnOrderApi.IOrderService.U_ORDER_LIST_COLUMN_ID_ALL;
        var orderType = ReturnOrderApi.IOrderService.ORDER_LIST_TYPE_SUCCESS;
        var ReturnOrderMap = ReturnOrderApi.OrderFunction.getRefundOrderList(userId, columnId, orderType, page, count, keyword);

        var page = 0, pageCount = 0, count = 0;
        var returnMap = [];
        if (ReturnOrderMap != null) {
            var jReturnOrderMap = JSON.parse(new ReturnOrderApi.JSONObject(ReturnOrderMap).toString());
            if (jReturnOrderMap.count > 0) {
                for (var i = 0; i < jReturnOrderMap.lists.length; i++) {
                    var refundOrder = jReturnOrderMap.lists[i];

                    var jItems = [];
                    var itemList = ReturnOrderApi.OrderHelper.getNewItemsWithChildItemsWithPresent($.toJavaJSONObject(refundOrder));
                    var jItemList = JSON.parse(itemList.toString());
                    for (var j = 0; j < jItemList.length; j++) {
                        var item = jItemList[j];
                        var jOrderProduct = ProductService.getProduct(item.productId);
                        var pics = ProductService.getPics(jOrderProduct);
                        var relatedUrl = "";
                        if (pics && pics.length > 0) {
                            relatedUrl = FileService.getRelatedUrl(pics[0].fileId, "80X80");
                        }

                        var jItemTemp = {
                            productId: item.productId,
                            productName: item.name,
                            merchantId: jOrderProduct.merchantId,
                            skuId: item.skuId,
                            realSkuId: item.realSkuId,
                            pic: relatedUrl
                        };
                        jItems.push(jItemTemp);
                    }
                    var jRecord = {};
                    jRecord.itemList = jItems;
                    jRecord.aliasCode = refundOrder.aliasCode;
                    jRecord.orderId = refundOrder.id;
                    jRecord.createTime = DateUtil.getLongDate(parseInt(refundOrder.createTime));
                    returnMap.push(jRecord);
                }
                page = jReturnOrderMap.page;
                pageCount = jReturnOrderMap.pageCount;
                count = jReturnOrderMap.count;
            }
        }
        return {
            lists: returnMap,
            count: count,
            pageCount: pageCount,
            page: page
        };
    },

    //可申请退换货订单详情接口
    getAbleReturnOrderDetail: function (orderId) {
        var jOrder = ReturnOrderApi.OrderFunction.getOrder(orderId);
        var jItems = this.getNewItemsWithChildItems(jOrder);
        var jItemsTemp = [];
        for (var i = 0; i < jItems.length; i++) {
            var item = jItems[i];
            var jOrderProduct = ProductService.getProduct(item.productId);
            var pics = ProductService.getPics(jOrderProduct);
            var relatedUrl = "";
            if (pics && pics.length > 0) {
                relatedUrl = FileService.getRelatedUrl(pics[0].fileId, "80X80");
            }
            var needAmount = item.chooseAmount;
            if (!needAmount && needAmount != 0) {
                needAmount = item.amount;
            }
            item.needAmount = needAmount;

            var jItemTemp = {
                itemId: item.itemId,
                productId: item.productId,
                productName: item.name,
                merchantId: jOrderProduct.merchantId,
                skuId: item.skuId,
                realSkuId: item.realSkuId,
                attrsValue: item.attrsValue,
                amount: item.amount,
                needAmount: item.needAmount,
                price: item.priceInfo.fUnitPrice,
                pic: relatedUrl
            };
            jItemsTemp.push(jItemTemp);
        }
        return jItemsTemp;
    },

    getNewItemsWithChildItems: function (jOrder) {
        var itemMap = new ReturnOrderApi.HashMap();
        var childrenItemMap = new ReturnOrderApi.HashMap();
        var jItems = ReturnOrderApi.OrderUtil.getItems(jOrder);
        for (var i = 0; i < jItems.length(); i++) {
            var jItem = jItems.optJSONObject(i);


            if (ReturnOrderApi.OrderItemUtil.checkItemIsPresent(jItem)) {
                var parentItemId = jItem.optString("parentItemId");
                var childrenItemValue = childrenItemMap.get(parentItemId);
                if (childrenItemValue == null) {
                    childrenItemValue = new ReturnOrderApi.JSONArray();
                }
                childrenItemValue.put(jItem);
                childrenItemMap.put(parentItemId, childrenItemValue);
            } else {
                itemMap.put(jItem.optString("itemId"), jItem);
            }
        }
        var itemRecord = new ReturnOrderApi.JSONArray();
        for (var it = itemMap.entrySet().iterator(); it.hasNext();) {
            var entry = it.next();
            var key = entry.getKey();
            var jItemTemp = entry.getValue();
            if (ReturnOrderApi.OrderItemUtil.checkItemIsVirtual(jItemTemp)) {
                continue;
            }
            var childrenItem = childrenItemMap.get(key);
            if (childrenItem == null) {
                childrenItem = new ReturnOrderApi.JSONArray();
            }
            jItemTemp.put("childrenItems", childrenItem);
            itemRecord.put(jItemTemp);
        }

        return JSON.parse(itemRecord.toString());
    },

    //已申请退换货记录列表
    getHasReturnOrderList: function (userId, startDay, page, limit) {
        var jSearchArgs = new ReturnOrderApi.JSONObject();
        jSearchArgs.put("buyerUserId", userId);
        jSearchArgs.put("page", page);
        jSearchArgs.put("limit", 15);
        if (startDay != "-1") {
            var curTime = new Date().getTime();
            var beginTime = curTime - (parseInt(startDay) * 1000 * 60 * 60 * 24);
            jSearchArgs.put("beginCreateTime", beginTime + "");
        }
        var jSearchResult = ReturnOrderApi.AfterOrderSearchUtil.getRefundOrders(jSearchArgs);

        return jSearchResult;
    }
};
