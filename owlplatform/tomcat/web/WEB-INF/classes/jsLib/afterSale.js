/**
 * Created by Administrator on 2014/12/4.
 */
var AfterSaleService = {}
var AfterApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.order.afterservice.tools,
    Packages.net.xinshi.isone.modules.order.afterservice,
    Packages.net.xinshi.isone.modules.orderrefund.tools
);

AfterSaleService.getOrder = function (afterOrderId) {
    if (!afterOrderId) {
        return null;
    }
    var jOrder = AfterApi.IsoneOrderEngine.afterService.getOrder(afterOrderId);
    if (!jOrder) {
        return null;
    }
    return JSON.parse(jOrder.toString());
};

AfterSaleService.getOrderByAliasCode = function (afterOrderAliasCode) {
    if (!afterOrderAliasCode) {
        return null;
    }
    var jOrder = AfterApi.IsoneOrderEngine.afterService.getOrderByAliasCode(afterOrderAliasCode);
    if (!jOrder) {
        return null;
    }
    return JSON.parse(jOrder.toString());
};

/**
 * 修改退货单审核状态
 * @param afterOrderId 退货单ID
 * @param userId 操作人ID
 * @param userName 操作人姓名
 * @returns {*}
 */
AfterSaleService.updateToCertifyPass = function (afterOrderId, userId, userName) {
    var jResult = AfterApi.ReturnOrderUpdateStateUtil.updateToCertifyPass(afterOrderId, userId, userName);
    var result = JSON.parse(jResult.toString());
    return result;
};

/**
 * 退货单的入库状态
 * @param afterOrderId
 * @param userId
 * @param userName
 * @returns {string}
 */
AfterSaleService.updateToInStorage = function (afterOrderId, userId, userName, desc) {
    var jResult = AfterApi.ReturnOrderUpdateInStorageStateUtil.updateToInStorage(afterOrderId, userId, userName, desc);
    var result = JSON.parse(jResult.toString());
    return result;
};

/**
 * 换货单的入库状态
 * @param afterOrderId
 * @param userId
 * @param userName
 * @returns {string}
 */
AfterSaleService.updateBarterOrderToInStorage = function (afterOrderId, userId, userName, desc) {
    var jResult = AfterApi.BarterOrderUpdateStateUtil.updateBarterOrderToInStorage(afterOrderId, userId, userName, desc);
    var result = JSON.parse(jResult.toString());
    return result;
};

/**
 * 换货单的出库状态
 * @param barterOrderId
 * @param userId
 * @param userName
 * @returns {string}
 */
AfterSaleService.updateToDelivered = function (barterOrderId, userId, userName) {
    var jResult = AfterApi.BarterOrderUpdateStateUtil.updateToDelivered(barterOrderId, userId, userName);
    var result = JSON.parse(jResult.toString());
    return result;
}

AfterSaleService.updateAfterSalesItems = function (returnOrderId, oldItems) {
    if (oldItems) {
        var jOldItems = new AfterApi.JSONObject(JSON.stringify(oldItems));
        AfterApi.IsoneOrderEngine.afterService.updateAfterSalesItems(returnOrderId, jOldItems);
    }

};

AfterSaleService.updateBarterOrderNewItems = function (returnOrderId, newItems) {
    if (newItems) {
        var jNewItems = new AfterApi.JSONArray(JSON.stringify(newItems));
        AfterApi.IsoneOrderEngine.afterService.updateBarterOrderNewItems(returnOrderId, jNewItems);
    }

};

AfterSaleService.getRefundOrder = function (refundOrderId) {
    var jRefundOrder = AfterApi.IsoneModulesEngine.refundService.getRefund(refundOrderId);       //获取 退款信息
    if (!jRefundOrder) {
        return null;
    }
    return JSON.parse(jRefundOrder.toString());
};

/**
 * 换货单的签、拒收状态
 * @param afterOrderId
 * @param state
 * @param reason
 * @param userName
 * @returns {string}
 */
AfterSaleService.updateBarterOrderToFinished = function (afterOrderId, state, reason, userName) {
    var jResult = AfterApi.BarterOrderUpdateStateUtil.updateBarterOrderToFinished(afterOrderId, state, reason, userName);
    var result = JSON.parse(jResult.toString());
    return result;
};

/**
 * 修改整个退款单为已退款
 * @param refundOrderId
 * @param operatorUserId
 * @returns {string}
 */
AfterSaleService.updateRefundOrderToRefunded = function (refundOrderId, operatorUserId) {
    var jResult = AfterApi.RefundOrderUpdateUtil.updateRefundOrderToRefunded(refundOrderId, operatorUserId);
    return JSON.parse(jResult.toString());
};

/**
 * 根据订单号和退货单号获取相应的退款单
 * @param orderId
 * @param returnOrderId
 * @returns {string}
 */
AfterSaleService.getRefundOrderByReturnOrderId = function (orderId, returnOrderId) {
    var jResult = AfterApi.ReturnOrderUtil.getRefundOrderByReturnOrderId(orderId, returnOrderId);
    if (jResult) {
        return JSON.parse(jResult.toString());
    }
    return null;
};

/**
 * 获得一个新的退货单外部编码
 * @returns {string}
 */
AfterSaleService.getRefundNumber = function () {
    var s = AfterApi.IsoneOrderEngine.afterService.getRefundNumber();
    return s + "";
};

/**
 * 修改换货单取消状态
 * @param afterOrderId
 * @param userId
 * @param desc
 * @returns {*}
 */
AfterSaleService.updateBarterOrderToCancel = function (afterOrderId, userId, desc) {
    var jResult = AfterApi.BarterOrderUpdateStateUtil.updateToCanceled(afterOrderId, desc, userId);
    var result = JSON.parse(jResult.toString());
    return result;
};


/**
 * 修改退货单取消状态
 * @param afterOrderId
 * @param userId
 * @param desc
 * @returns {*}
 */
AfterSaleService.updateReturnOrderToCancel = function (afterOrderId, userId, desc) {
    var jResult = AfterApi.ReturnOrderUpdateStateUtil.updateToCanceled(afterOrderId, desc, userId, "");
    var result = JSON.parse(jResult.toString());
    return result;
};

/**
 * 增加售后单据
 * @param jAfterOrder
 * @returns {*}
 */
AfterSaleService.addAfterOrder = function (jAfterOrder) {
    if (!jAfterOrder) {
        return null;
    }
    if (!jAfterOrder.orderId || !jAfterOrder.orderType || !jAfterOrder.merchantId || !jAfterOrder.buyerInfo.userId) {
        return null;
    }
    var javaJSON = $.toJavaJSONObject(jAfterOrder);
    //这个方法需要传售后单对象，原订单ID，售后单类型，商家ID，购买人ID
    return AfterApi.IsoneOrderEngine.afterService.addOrder(javaJSON, jAfterOrder.orderId, jAfterOrder.orderType, jAfterOrder.merchantId, jAfterOrder.buyerInfo.userId) + "";
};

/**
 * 修改退款单审核状态为审核通过
 * @param refundId 退款单ID
 * @param userId 操作人ID
 * @param operatorUserName 操作人姓名
 * @returns {*}
 */
AfterSaleService.updateRefundOrderToCertifyPass = function (refundId, userId, operatorUserName) {
    var jResult = AfterApi.RefundOrderUpdateStateUtil.updateToCertifyPass(refundId, userId, operatorUserName);
    var result = JSON.parse(jResult.toString());
    return result;
};