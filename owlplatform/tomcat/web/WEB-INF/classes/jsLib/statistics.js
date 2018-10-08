var StatisticsApi = new JavaImporter(
    Packages.net.xinshi.isone.statistics
);
/**
 * 工具类
 * @namespace
 */
var StatisticsUtil = {
    /**
     * 统计数据API
     * @param id 数据的ID
     * @param eventName 事件名
     * @param properties 属性
     */
    track: function (id, eventName, properties) {
        if (!id || !eventName) {
            return null;
        }
        if (properties) {
            properties = $.toJavaJSONObject(properties);
        }
        return JSON.parse(StatisticsApi.StatisticsUtil.track(id, eventName, properties, request) + "");
    },
    /**
     * 将注册后的会员ID与注册前的sessionId关联起来
     * @param registerUserId 会员ID
     * @param sessionId sessionId
     * @param jProperties 统计的属性 可以不传
     * @returns {string}
     */
    trackSignUp: function (registerUserId, sessionId, jProperties) {
        if (!registerUserId || !sessionId) {
            return null;
        }
        if (jProperties) {
            jProperties = $.toJavaJSONObject(jProperties);
        }
        return JSON.parse(StatisticsApi.StatisticsUtil.trackSignUp(registerUserId, sessionId, jProperties, request) + "");
    },
    /**
     * 记录登录事件
     * @param userId 会员ID
     * @returns {string}
     */
    trackSignIn: function (userId) {
        if (!userId) {
            return null;
        }
        return JSON.parse(StatisticsApi.StatisticsUtil.trackSignIn(userId, request) + "");
    },
    /**
     * 会员修改个人资料
     * @param userId 会员ID
     * @param jProfiles 个人资料
     * @returns {string}
     */
    profileSet: function (userId, jProfiles) {
        if (!userId || !jProfiles) {
            return null;
        }
        jProfiles = $.toJavaJSONObject(jProfiles);
        return JSON.parse(StatisticsApi.StatisticsUtil.profileSet(userId, jProfiles, request) + "");
    },
    /**
     * 收藏商品
     * @param userId 会员ID
     * @param productId 商口ID
     * @param jProfiles 统计字段
     * @returns {string}
     */
    favorProduct: function (userId, productId, jProfiles) {
        if (!userId || !productId || !jProfiles) {
            return null;
        }
        jProfiles = $.toJavaJSONObject(jProfiles);
        return JSON.parse(StatisticsApi.StatisticsUtil.favorProduct(userId, productId, jProfiles, request) + "");
    },
    /**
     * 提交订单
     * @param orderId 订单ID
     * @param jProfiles 统计字段
     * @returns {*}
     */
    submitOrder: function (orderId, jProfiles) {
        if (!orderId) {
            return null;
        }
        if (jProfiles) {
            jProfiles = $.toJavaJSONObject(jProfiles);
        } else {
            jProfiles = null;
        }
        return JSON.parse(StatisticsApi.StatisticsUtil.submitOrder(orderId, jProfiles, request) + "");
    },
    /**
     * 统计订单点击的支付方式
     * @param realPayRecId 支付记录ID
     * @param jProfiles 统计字段
     * @returns {*}
     */
    toPayOrder: function (realPayRecId, jProfiles) {
        if (!realPayRecId) {
            return null;
        }
        if (jProfiles) {
            jProfiles = $.toJavaJSONObject(jProfiles);
        } else {
            jProfiles = null;
        }
        return JSON.parse(StatisticsApi.StatisticsUtil.toPayOrder(realPayRecId, jProfiles, request) + "");
    },
    /**
     * 订单支付成功统计
     * @param orderId 订单ID
     * @param jProfiles 统计字段
     * @returns {*}
     */
    orderPaid: function (orderId, jProfiles) {
        if (!orderId) {
            return null;
        }
        if (jProfiles) {
            jProfiles = $.toJavaJSONObject(jProfiles);
        } else {
            jProfiles = null;
        }
        return JSON.parse(StatisticsApi.StatisticsUtil.orderPaid(orderId, jProfiles) + "");
    },
    /**
     * 取消订单
     * @param orderId 订单ID
     * @param jProfiles 统计字段
     * @returns {*}
     */
    cancelOrder: function (orderId, jProfiles) {
        if (!orderId) {
            return null;
        }
        if (jProfiles) {
            jProfiles = $.toJavaJSONObject(jProfiles);
        } else {
            jProfiles = null;
        }
        return JSON.parse(StatisticsApi.StatisticsUtil.cancelOrder(orderId, jProfiles, request) + "");
    },
    /**
     * 售后申请
     * @param returnDocId 退换货ID
     * @param jProfiles 统计字段
     * @returns {*}
     */
    applyAfterService: function (returnDocId, jProfiles) {
        if (!returnDocId) {
            return null;
        }
        if (jProfiles) {
            jProfiles = $.toJavaJSONObject(jProfiles);
        } else {
            jProfiles = null;
        }
        return JSON.parse(StatisticsApi.StatisticsUtil.applyAfterService(returnDocId, jProfiles, request) + "");
    },
    /**
     * 搜索商品
     * @param userId 会员ID
     * @param jProperties 统计字段
     * @returns {*}
     */
    searchProduct: function (userId, jProperties) {
        if (!userId || !jProperties) {
            return null;
        }
        jProperties = $.toJavaJSONObject(jProperties);
        return JSON.parse(StatisticsApi.StatisticsUtil.searchProduct(userId, jProperties, request) + "");
    },
    /**
     * 商品评论
     * @param productId 商品ID
     * @param skuId SKU ID
     * @param userId 会员ID
     * @param jProperties 统计字段
     * @returns {*}
     */
    productAppraise: function (productId, skuId, userId, jProperties) {
        if (!productId || !jProperties || !userId || !skuId) {
            return null;
        }
        jProperties = $.toJavaJSONObject(jProperties);
        return JSON.parse(StatisticsApi.StatisticsUtil.productAppraise(productId, skuId, userId, jProperties, request) + "");
    }
};
