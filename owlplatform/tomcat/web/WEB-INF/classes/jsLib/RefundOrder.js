var RefundOrderApi = new JavaImporter(
    Packages.net.xinshi.isone.modules.IsoneModulesEngine,
    Packages.net.xinshi.isone.modules.orderrefund,
    Packages.net.xinshi.isone.modules.orderrefund.tools
);

var RefundOrderService = {
    /**
     * 增加退款单
     * @param refundOrder 退款单对象
     * @param userId 操作人ID
     * @param type 退款单类型
     * @returns {*}
     */
    addRefundOrder: function (refundOrder, userId, type) {
        if (!refundOrder || !userId || !type) {
            return null;
        }
        refundOrder = $.toJavaJSONObject(refundOrder);
        return RefundOrderApi.IsoneModulesEngine.refundService.addRefund(refundOrder, userId, type);
    },
    /**
     * 修改退款单
     * @param id 退款单ID
     * @param refundOrder 退款单对象
     * @param userId 修改人
     * @returns {*}
     */
    updateRefundOrder: function (id, refundOrder, userId) {
        if (!refundOrder || !userId || !id) {
            return null;
        }
        refundOrder = $.toJavaJSONObject(refundOrder);
        RefundOrderApi.IsoneModulesEngine.refundService.updateRefundOrder(id, refundOrder, userId);
    },
    /**
     * 获取退款单
     * @param id
     * @returns {*}
     */
    getRefundOrder: function (id) {
        if (!id) {
            return null;
        }
        var json = RefundOrderApi.IsoneModulesEngine.refundService.getRefund(id);
        return JSON.parse(json + "");
    },
    /**
     * 搜索退款单
     * @param searchArgs 搜索参数
     * @param start 从多少开始取
     * @param limit 取多少条 不传默认取10条
     */
    searchRefundOrder: function (searchArgs, start, limit) {
        if (!searchArgs) {
            return null;
        }
        var jSearchArgs = $.JSONObject(searchArgs);
        var json = RefundOrderApi.RefundOrderSearchUtil.searchRefundOrder(jSearchArgs, start, limit);
        return JSON.parse(json + "");
    },
    /**
     * 获取退款单列表
     * @param refundType 退款单类型
     * @param merchantId 商家ID
     * @param start 从多少条开始
     * @param limit 取多少条,-1表示取所有
     */
    getRefundOrderList: function (refundType, merchantId, start, limit) {
        if (!refundType || !merchantId) {
            return null;
        }
        var json = RefundOrderApi.RefundOrderSearchUtil.getRefundOrderList(refundType, merchantId, start, limit);
        return JSON.parse(json + "");
    },
    /**
     * 根据获取退款记录号获取退款单对象
     * @param refundRecId 退款记录ID
     */
    getRefundOrderByRefundRecId: function (refundRecId) {
        if (!refundRecId) {
            return null;
        }
        var refundDocId = RefundOrderApi.RefundRecUtil.getRefundDocIdByRefundRecId(refundRecId) + "";
        if (!refundDocId) {
            return null;
        }
        return RefundOrderService.getRefundOrder(refundDocId);
    },
    /**
     * 根据获取退款记录号获取退款单对象
     * @param refundOrder 退款单对象
     * @param refundRecId 退款记录ID
     */
    getRefundRec: function (refundOrder, refundRecId) {
        if (!refundOrder || !refundRecId) {
            return null;
        }
        var refundInfo = refundOrder.refundInfo;
        if (!refundInfo || refundInfo.length == 0) {
            return null;
        }
        for (var i = 0; i < refundInfo.length; i++) {
            var refundRec = refundInfo[i];
            if (refundRecId == refundRec.id) {
                return refundRec;
            }
        }
        return null;
    },
    /**
     * 根据获取退款记录号获取退款记录对象
     * @param refundRecId 退款记录ID
     */
    getRefundRecByRefundRecId: function (refundRecId) {
        if (!refundRecId) {
            return null;
        }
        var refundOrder = RefundOrderService.getRefundOrderByRefundRecId(refundRecId);
        return RefundOrderService.getRefundRec(refundOrder, refundRecId);
    },
    /**
     * 搜索退款记录
     * @param searchArgs 搜索参数
     * @param start 从多少开始取
     * @param limit 取多少条 不传默认取10条
     */
    searchRefundRec: function (searchArgs, start, limit) {
        if (!searchArgs) {
            return null;
        }
        var jSearchArgs = $.JSONObject(searchArgs);
        var json = RefundOrderApi.RefundOrderSearchUtil.searchRefundRec(jSearchArgs, start, limit);
        return JSON.parse(json + "");
    },
    /**
     * 修改退款单信息
     * @param refundOrderId
     * @param jRefundOrderInfo
     * @param jConfig
     * @param operatorUserId
     * @returns {*}
     */
    updateRefundOrderByUtil: function (refundOrderId, refundOrderInfo, operatorUserId) {
        var jRefundOrderInfo = $.JSONObject(refundOrderInfo);
        var jConfig = $.JSONObject({});
        var json = RefundOrderApi.RefundOrderUpdateUtil.updateRefundOrder(refundOrderId, jRefundOrderInfo, jConfig, operatorUserId);
        return JSON.parse(json + "");
    }
};