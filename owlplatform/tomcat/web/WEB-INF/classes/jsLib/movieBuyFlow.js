var MovieBuyFlowApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules.buyflow.movie
);

/**
 * @namespace
 * @type {{addOrder: addOrder}}
 */
var MovieBuyFlowService = {

    /**
     * 生成一个订单,request中作为form表单提交，必须要有的参数,payment：支付方式ID，mobile：取票人手机号码，mpid：排期ID， sitseat：座次（格式为：9:01;9:02;9:03），description：订单备注
     * @param merchantId ：影院商家ID
     * @param userId ：当前登录用户ID
     * @returns code,orderId, msg : 当code为0时表示添加订单成功，否则失败，msg为相应的错误信息提示
     */
    addOrder: function (merchantId, userId) {
        var json = MovieBuyFlowApi.MovieOrderBuyFlowHelper.addOrder(merchantId, userId, request, response);
        return JSON.parse(json.toString());
    }
};
