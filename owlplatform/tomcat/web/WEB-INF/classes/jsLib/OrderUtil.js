var OrderUtilApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.order,
    Packages.net.xinshi.isone.modules.order.afterservice,
    Packages.net.xinshi.isone.modules.product.tools
);

var OrderUtilService = {
    /**
     * 订单是否已确认(货单付款)
     * @param jOrder 订单对象(json格式)
     * @returns {boolean} true:已确认 false:未确认
     */
    isConfirm: function (jOrder) {
        jOrder = JSON.parse(JSON.stringify(jOrder));
        if (!jOrder || !jOrder.states || !jOrder.states.processState) {
            return false;
        }
        var processStateValue = jOrder.states.processState.state;
        return "p101" == processStateValue;
    },

    /**
     * 订单是否已出库
     * @param jOrder 订单对象(json格式)
     * @returns {boolean} true:已签收 false:未签收
     */
    isDelivery: function (jOrder) {
        jOrder = JSON.parse(JSON.stringify(jOrder));
        if (!jOrder || !jOrder.states || !jOrder.states.processState) {
            return false;
        }
        var processStateValue = jOrder.states.processState.state;
        return "p102" == processStateValue;
    },
    /**
     * 订单是否已签收
     * @param jOrder 订单对象(json格式)
     * @returns {boolean} true:已签收 false:未签收
     */
    isSigned: function (jOrder) {
        jOrder = JSON.parse(JSON.stringify(jOrder));
        if (!jOrder || !jOrder.states || !jOrder.states.processState) {
            return false;
        }
        var processStateValue = jOrder.states.processState.state;
        return "p112" == processStateValue;
    },
    /**
     * 订单是否已取消
     * @param jOrder 订单对象(json格式)
     * @returns {boolean} true:已签收 false:未签收
     */
    isCanceled: function (jOrder) {
        jOrder = JSON.parse(JSON.stringify(jOrder));
        if (!jOrder || !jOrder.states || !jOrder.states.processState) {
            return false;
        }
        var processStateValue = jOrder.states.processState.state;
        return "p111" == processStateValue;
    },
    /**
     * 订单是否已支付
     * @param jOrder 订单对象(json格式)
     * @returns {boolean} true:已签收 false:未签收
     */
    isPayed: function (jOrder) {
        jOrder = JSON.parse(JSON.stringify(jOrder));
        if (!jOrder || !jOrder.states || !jOrder.states.payState) {
            return false;
        }
        var payStateValue = jOrder.states.payState.state;
        return "p201" == payStateValue;
    },
    /**
     * 订单是否有拒收
     * @param jOrder 订单对象(json格式)
     * @returns {boolean} true:有拒收 false:没拒收
     */
    hasRejectedAmount: function (jOrder) {
        jOrder = JSON.parse(JSON.stringify(jOrder));
        if (!jOrder || !jOrder.items) {
            return false;
        }
        var jJavaOrder = $.JSONObject(jOrder);
        return OrderUtilApi.OrderItemHelper.hasOrderItemRejected(jJavaOrder);
    },
    /**
     * 订单是否有缺货
     * @param jOrder 订单对象(json格式)
     * @returns {boolean} true:有缺货 false:没缺货
     */
    hasShortAmount: function (jOrder) {
        jOrder = JSON.parse(JSON.stringify(jOrder));
        if (!jOrder || !jOrder.items) {
            return false;
        }
        var jJavaOrder = $.JSONObject(jOrder);
        return OrderUtilApi.OrderItemHelper.hasOrderItemShort(jJavaOrder);
    },
    /**
     * 获取处理状态名称
     * @param state
     * @returns {string}
     */
    getProcessStateName: function (state) {
        if (!state || state == "") {
            return "未知";
        }
        if (state == "p100") {
            return "待审核";
        } else if (state == "p101") {
            return "已确认";
        } else if (state == "p102") {
            return "已出库";
        } else if (state == "p112") {
            return "已签收";
        } else if (state == "p113") {
            return "已拒收";
        } else if (state == "p111") {
            return "已取消";
        } else {
            return "未知状态";
        }
    },
    /**
     * 获取支付状态名称
     * @param state
     * @returns {string}
     */
    getPayStateName: function (state) {
        if (!state || state == "") {
            return "未知";
        }
        if (state == "p200") {
            return "待支付";
        } else if (state == "p201") {
            return "已支付";
        } else {
            return "未知状态";
        }
    },
    /**
     * 获取订单的退款状态
     * @param orderId
     * @returns {string}
     */
    getRefundState: function (orderId) {
        var s = OrderUtilApi.OrderUtil.getRefundStateValue(orderId);
        return s + "";
    },
    /**
     * 获取订单的退货状态
     * @param orderId
     * @returns {string}
     */
    getReturnState: function (orderId) {
        var s = OrderUtilApi.OrderUtil.getReturnStateValue(orderId);
        return s + "";
    },
    /**
     * 获取订单大支付记录对象
     * @param jOrder
     * @returns {*}
     */
    getPayRecsInfo: function (jOrder) {
        if (!jOrder) {
            return "";
        }
        var jJavaOrder = $.JSONObject(jOrder);
        return JSON.parse(OrderUtilApi.OrderUtil.getPayRecsInfo(jJavaOrder) + "");
    },
    /**
     * 获取订单支付记录集合
     * @param jOrder
     * @returns {*}
     */
    getPayRecArrayInfo: function (jOrder) {
        if (!jOrder) {
            return "";
        }
        var jJavaOrder = $.JSONObject(jOrder);
        return JSON.parse(OrderUtilApi.OrderUtil.getPayRecArrayInfo(jJavaOrder) + "");
    },
    /**
     * 获取订单退款意向信息
     * @param jOrder
     * @returns {*}
     */
    getOrderRefundRecs: function (jOrder) {
        if (!jOrder) {
            return "";
        }
        var jJavaOrder = $.JSONObject(jOrder);
        return JSON.parse(OrderUtilApi.OrderRefundRecUtil.getOrderRefundRecs(jJavaOrder) + "");
    },
    /**
     * 获取订单退款意向列表信息
     * @param jOrder
     * @returns {*}
     */
    getOrderRefundRecArray: function (jOrder) {
        if (!jOrder) {
            return "";
        }
        var jJavaOrder = $.JSONObject(jOrder);
        return JSON.parse(OrderUtilApi.OrderRefundRecUtil.getOrderRefundRecArray(jJavaOrder) + "");
    },
    /**
     * 获取订单的所有状态
     * @param jOrder
     * @returns {*} 状态的JSON字符串
     */
    getStates: function (jOrder) {
        if (!jOrder) {
            return "";
        }
        var jJavaOrder = $.JSONObject(jOrder);
        return JSON.parse(OrderUtilApi.OrderUtil.getStates(jJavaOrder) + "");
    },
    /**
     * 获取支付状态
     * @param states
     * @returns {*} 支付状态的JSON字符串
     */
    getPayState: function (states) {
        if (!states) {
            return "";
        }
        var javaJSONObject = $.JSONObject(states);
        return JSON.parse(OrderUtilApi.OrderUtil.getPayState(javaJSONObject) + "");
    },
    /**
     * 获取处理状态
     * @param states
     * @returns {*} 处理状态的JSON字符串
     */
    getProcessState: function (states) {
        if (!states) {
            return "";
        }
        var javaJSONObject = $.JSONObject(states);
        return JSON.parse(OrderUtilApi.OrderUtil.getProcessState(javaJSONObject) + "");
    },
    /**
     * 设置订单处理状态
     * @param jOrder 订单对象
     * @param processState 处理状态对象
     * @param userId 修改人ID
     */
    setProcessState: function (jOrder, processState, userId) {
        if (!jOrder || !processState) {
            return;
        }
        var states = OrderUtilService.getStates(jOrder);
        processState.lastModifyUserId = userId;
        processState.lastModifyTime = new Date().getTime();
        states.processState = processState;
        jOrder.states = states;
    },
    /**
     * 设置订单支付状态
     * @param jOrder
     * @param payState
     * @param userId
     */
    setPayState: function (jOrder, payState, userId) {
        if (!jOrder || !payState) {
            return;
        }
        var states = OrderUtilService.getStates(jOrder);
        payState.lastModifyUserId = userId;
        payState.lastModifyTime = new Date().getTime();
        states.payState = payState;
        jOrder.states = states;
    },
    /**
     * 设置是否已退款信息
     * @param jOrder
     * @param refundState
     * @param userId
     */
    setRefundState: function (jOrder, refundState, userId) {
        if (!jOrder || !refundState) {
            return;
        }
        var states = OrderUtilService.getStates(jOrder);
        refundState.lastModifyUserId = userId;
        refundState.lastModifyTime = new Date().getTime();
        states.refundState = refundState;
        jOrder.states = states;
    },
    /**
     * 获取新的payRecId
     * @param jOrder
     * @returns {string}
     */
    generatorPayRecId: function (jOrder) {
        if (!jOrder) {
            return "";
        }
        var javaJSONObject = $.JSONObject(jOrder);
        return OrderUtilApi.OrderUtil.generatorPayRecId(javaJSONObject) + "";
    },
    /**
     * 增加一条退款记录信息
     * @param jOrder
     * @param jOneRefundRec
     * @returns {string}
     */
    addOneRefundRecInfo: function (jOrder, jOneRefundRec) {
        if (!jOrder) {
            return "";
        }
        var javaOrder = $.JSONObject(jOrder);
        var javaRefundRec = $.JSONObject(jOneRefundRec);
        OrderUtilApi.OrderRefundRecUtil.addOneRefundRecInfo(javaOrder, javaRefundRec);
    },
    /**
     * 获取订单的Items,jsonArray格式
     * @param jOrder
     * @returns {*}
     */
    getItems: function (jOrder) {
        if (!jOrder) {
            return "";
        }
        var javaJSONObject = $.JSONObject(jOrder);
        return JSON.parse(OrderUtilApi.OrderUtil.getItems(javaJSONObject) + "");
    },

    getBrandName: function (item) {
        if (!item) {
            return "";
        }
        var productId = item.productId;
        var productVersionId = item.productVersionId;
        var jVersionProduct = OrderUtilApi.IsoneModulesEngine.productService.getProduct(productId, productVersionId);
        if (!jVersionProduct) {
            return "";
        }
        var brandName = OrderUtilApi.ProductValueUtil.getBrandName(jVersionProduct);
        return brandName + "";
    },

    /**
     * 是否积分换购订单
     * @param jOrder
     * @returns {*}
     */
    isIntegralOrder: function (jOrder) {
        if (!jOrder) {
            return false;
        }
        var items = jOrder.items;
        for (var key in items) {
            var jItem = items[key];
            if (jItem.objType && jItem.objType == "integral") {
                return true;
            }
        }

        return false;
    },

    /**
     * 判断订单是否有售后单（包括退货单、换货单）
     * @param orderId
     * @returns {*}
     */
    hasAfterServiceOrder: function (orderId) {
        if (!orderId) {
            return false;
        }
        return OrderUtilApi.OrderUtil.hasAfterServiceOrder(orderId);
    },

    /**
     * 是否可以申请退换货
     * @param jOrder
     * @returns {*}
     * @deprecated 建议使用isCanReturnOrBarter方法代替
     */
    isCanApplyAfterService: function (jOrder) {
        if (!jOrder) {
            return false;
        }
        var javaOrder = $.JSONObject(jOrder);
        return OrderUtilApi.OrderUtil.isCanApplyAfterService(javaOrder);
    },

    /**
     * 是否可以申请退换货
     * @param jOrder
     * @returns {*}
     */
    isCanReturnOrBarter: function (jOrder) {
        if (!jOrder) {
            return false;
        }
        var javaOrder = $.JSONObject(jOrder);
        return OrderUtilApi.AfterReturnOrderHelper.canDoReturnOrBarter(javaOrder);
    },

    /**
     * 检查订单是否允许取消（会员专区用到的）
     * @param jOrder
     * @returns {*}
     */
    isCanCancelForUCenter: function (jOrder) {
        if (!jOrder) {
            return false;
        }
        var javaOrder = $.JSONObject(jOrder);
        return OrderUtilApi.OrderUtil.canCancelForUCenter(javaOrder);
    },

    /**
     * 检查订单是否已赠送积分给顾客
     * @param jOrder
     * @returns {*}
     */
    isGiveUserIntegralOfOrder: function (jOrder) {
        if (!jOrder) {
            return false;
        }
        var javaOrder = $.JSONObject(jOrder);
        return OrderUtilApi.OrderSignUtil.isGiveUserIntegralOfOrder(javaOrder);
    },

    /**
     * 将订单设置为已赠送积分给顾客
     * @param jOrder
     * @returns {*}
     */
    doGiveUserIntegralOfOrder: function (jOrder) {
        if (!jOrder) {
            return false;
        }
        var javaOrder = $.JSONObject(jOrder);
        return OrderUtilApi.OrderSignUtil.doGiveUserIntegralOfOrder(javaOrder);
    }
};