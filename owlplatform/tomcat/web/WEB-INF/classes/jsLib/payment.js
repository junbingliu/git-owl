//#import ps20.js
PaymentApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.base,
    Packages.net.xinshi.isone.modules.price,
    Packages.net.xinshi.isone.lucene,
    Packages.net.xinshi.isone.lucene.search.product,
    Packages.net.xinshi.isone.modules.payment,
    Packages.java.util
);

/**
 * 与支付相关的一些函数
 * @namespace
 */
var PaymentService = {
    /**
     * 获取商家支持的所有的支付方式列表
     * @param merchantId
     * @return {*}
     */
    getPayments: function (merchantId) {
        var jPayments = PaymentApi.IsoneModulesEngine.merchantPaymentService.getMerchantPayments(merchantId);
        return JSON.parse(jPayments.toString());
    },
    /**
     * 返回系统支持的所有支付方式。
     * @returns {*}
     */
    getPayInterfaces: function () {
        var jPayInterfaces = PaymentApi.IsoneModulesEngine.payInterfaceService.getAllPayInterfaces();
        return JSON.parse(jPayInterfaces.toString());
    },

    /**
     * 返回支持移动支付的支付方式
     * @param merchantId
     * @returns {Array}
     */
    getPaymentsForMobile: function (merchantId) {
        var payInterfaces = PaymentService.getPayInterfaces();
        var mobilePayInterfaceIds = [];
        var mobilePayInterfaces = [];
        var result = [];
        for (var i = 0; i < payInterfaces.length; i++) {
            var pi = payInterfaces[i];
            if (pi.isMobile == 'Y') {
                mobilePayInterfaceIds.push(pi.id);
                mobilePayInterfaces.push(pi);
            }
        }
        var payments = PaymentService.getPayments(merchantId);
        payments.forEach(function (payment) {
            var idx = mobilePayInterfaceIds.indexOf(payment.payInterfaceId);
            if (idx > -1) {
                payment.payInterface = mobilePayInterfaces[idx];
                result.push(payment);
            }
        });
        return result;
    },


    /**
     * 是否支持货到付款
     * @param merchantId
     * @returns {boolean}
     */
    isSupportCod: function (merchantId) {
        //是否支持货到付款
        var payInterfaces = PaymentService.getPayInterfaces();
        var mobilePayInterfaceIds = [];
        var mobilePayInterfaces = [];
        var result = [];
        for (var i = 0; i < payInterfaces.length; i++) {
            var pi = payInterfaces[i];
            if (pi.isPayOnLine != 'Y') {
                mobilePayInterfaceIds.push(pi.id);
                mobilePayInterfaces.push(pi);
            }
        }
        var payments = PaymentService.getPayments(merchantId);

        payments.forEach(function (payment) {
            var idx = mobilePayInterfaceIds.indexOf(payment.payInterfaceId);
            if (mobilePayInterfaceIds.indexOf(payment.payInterfaceId) > -1) {
                payment.payInterface = mobilePayInterfaces[idx];
                result.push(payment);
            }
        });
        if (result.length > 0) {
            return true;
        }
        return false;
    },
    /**
     * 移动端是否支持在线支付
     * @param merchantId
     * @returns {boolean}
     */
    isSupportPayOnlineForMobile: function (merchantId) {
        //是否支持货在线支付
        var payInterfaces = PaymentService.getPayInterfaces();
        var mobilePayInterfaceIds = [];
        var mobilePayInterfaces = [];
        var result = [];
        for (var i = 0; i < payInterfaces.length; i++) {
            var pi = payInterfaces[i];
            if (pi.isPayOnLine == 'Y' && pi.isMobile == 'Y') {
                mobilePayInterfaceIds.push(pi.id);
                mobilePayInterfaces.push(pi);
            }
        }
        var payments = PaymentService.getPayments(merchantId);
        payments.forEach(function (payment) {
            var idx = mobilePayInterfaceIds.indexOf(payment.payInterfaceId);
            if (mobilePayInterfaceIds.indexOf(payment.payInterfaceId) > -1) {
                payment.payInterface = mobilePayInterfaces[idx];
                result.push(payment);
            }
        });
        if (result.length > 0) {
            return true;
        }
        return false;
    },

    /**
     * 移动端是否支持在线支付
     * @param merchantId
     * @returns {boolean}
     */
    isSupportPayOnlineForPC: function (merchantId) {
        //是否支持货在线支付
        var payInterfaces = PaymentService.getPayInterfaces();
        var mobilePayInterfaceIds = [];
        var mobilePayInterfaces = [];
        var result = [];
        for (var i = 0; i < payInterfaces.length; i++) {
            var pi = payInterfaces[i];
            if (pi.isPayOnLine == 'Y' && !(pi.isMobile && pi.isMobile == 'Y')) {
                mobilePayInterfaceIds.push(pi.id);
                mobilePayInterfaces.push(pi);
            }
        }
        var payments = PaymentService.getPayments(merchantId);
        payments.forEach(function (payment) {
            var idx = mobilePayInterfaceIds.indexOf(payment.payInterfaceId);
            if (mobilePayInterfaceIds.indexOf(payment.payInterfaceId) > -1) {
                payment.payInterface = mobilePayInterfaces[idx];
                result.push(payment);
            }
        });
        if (result.length > 0) {
            return true;
        }
        return false;
    },

    /**
     * 获得货到付款的支付方式
     * @param merchantId
     * @returns {*}
     */
    getCodPayment: function (merchantId) {
        var payments = PaymentService.getPayments(merchantId);
        var result = null;
        payments.forEach(function (payment) {
            if (payment.payInterfaceId == 'payi_0') {
                result = payment;
            }
        });
        return result;
    },


    /**
     * 获得“在线支付”，那个具体的支付方式
     * @param merchantId
     * @returns {*}
     */
    getOnlinePayment: function (merchantId) {
        var payments = PaymentService.getPayments(merchantId);
        var result = null;
        payments.forEach(function (payment) {
            if (payment.payInterfaceId == 'payi_1') {
                result = payment;
            }
        });
        return result;
    },

    getMerchantThirdPartPaymentsByOrderType: function (merchantId, orderType) {
        var result = PaymentApi.PaymentHelper.getMerchantThirdPartPaymentsByOrderType(merchantId, orderType);
        return $.java2Javascript(result);
    },
    getMerchantAllPaymentsByOrderType: function (merchantId, orderType) {
        var result = PaymentApi.PaymentHelper.getMerchantAllPaymentsByOrderType(merchantId, orderType);
        return $.java2Javascript(result);
    },
    /**
     * 根据订单类型和商家ID获取商家的第三方支付方式
     * @param merchantId 商家ID
     * @param orderType 订单类型
     * @returns {*} 返回结果是javaScript对象
     */
    getMerchantThirdPartPaymentsByOrderTypeEx: function (merchantId, orderType) {
        var result = PaymentApi.PaymentHelper.getMerchantThirdPartPaymentsByOrderType(merchantId, orderType);
        return JSON.parse(result.toString());
    },
    /**
     * 根据订单类型和商家ID获取商家的支付方式
     * @param merchantId 商家ID
     * @param orderType 订单类型
     * @returns {*} 返回结果是javaScript对象
     */
    getMerchantAllPaymentsByOrderTypeEx: function (merchantId, orderType) {
        var result = PaymentApi.PaymentHelper.getMerchantAllPaymentsByOrderType(merchantId, orderType);
        return JSON.parse(result.toString());
    },
    /**
     * 设置默认的移动支付方式
     * @param userId
     * @param merchantId
     * @param paymentId
     */

    setDefaultMobilePayment: function (userId, merchantId, paymentId) {
        //检查paymentId是否合法
        var id = "defMPaymentID_" + userId + "_" + merchantId;

        var obj = {
            id: id,
            defPaymentId: paymentId
        }
        saveObject(id, obj);
    },
    /**
     * 获得默认的移动支付方式
     * @param userId
     * @param merchantId
     * @returns {*}
     */
    getDefaultMobilePayment: function (userId, merchantId) {
        var id = "defMPaymentID_" + userId + "_" + merchantId;
        var obj = getObject(id);
        if (!obj) {
            return null;
        }
        var defaultPaymentId = obj.defPaymentId;
        //检查defPaymentId,是否在合法支付方式范围内
        var payments = PaymentService.getPaymentsForMobile(merchantId);
        var isValid = false;
        var defaultPayment = null;
        payments.forEach(function (p) {
            if (p.id == defaultPaymentId) {
                isValid = true;
                defaultPayment = p;
            }
        });
        if (!isValid) {
            return null;
        }
        return defaultPayment;
    },
    getMerchantThirdPartPayments: function (merchantId) {
        var jPayments = PaymentApi.IsoneModulesEngine.merchantPaymentService.getMerchantThirdPartPayments(merchantId);
        return JSON.parse(jPayments.toString());
    },
    getPayHtml: function (realPayRecord) {
        var jsonRec = $.toJavaJSONObject(realPayRecord);
        var payInterface = PaymentApi.PaymentUtil.getPayInterfaceById(realPayRecord.payInterfaceId);
        var html = "" + payInterface.getPayHTML(jsonRec);
        return html;
    },

    getAppData: function (realPayRecord) {
        //针对微信支付等,不需要Html,需要一个json数据的支付方式调用本方法
        var jsonRec = $.toJavaJSONObject(realPayRecord);
        var payInterface = PaymentApi.PaymentUtil.getPayInterfaceById(realPayRecord.payInterfaceId);
        var appData = "" + payInterface.getAppPayData(jsonRec);
        return appData;
    },
    getPayInterface: function (payInterfaceId) {
        var payInterface = PaymentApi.IsoneModulesEngine.payInterfaceService.getPayInterface(payInterfaceId);
        var s = "" + payInterface.toString();
        return JSON.parse(s);
    },
    /**
     * 根据payInterfaceID和商家ID获取当前商家应用的paymentId
     * @param payInterfaceId
     * @param merchantId
     */
    getPaymentByPayInterface: function (payInterfaceId, merchantId) {
        var jPayments = PaymentApi.IsoneModulesEngine.merchantPaymentService.getPaymentByPayInterface(merchantId, payInterfaceId);
        if (jPayments == null) {
            return null;
        }
        return JSON.parse(jPayments.toString());
    },
    /**
     * 获取手续费下限
     * @param payInterface
     */
    getPaymentLowerLimit: function (payInterface) {
        if (!payInterface) {
            return null;
        }
        if (payInterface.values && payInterface.values.lowerLimit) {
            return payInterface.values.lowerLimit.defaultValue;
        }
        return null;
    },
    /**
     * 获取银行费用率（%）
     * @param payInterface
     */
    getExpenseRation: function (payInterface) {
        if (!payInterface) {
            return null;
        }
        if (payInterface.values && payInterface.values.expenseRation) {
            return payInterface.values.expenseRation.defaultValue;
        }
        return null;
    }
};