var HttpMallHandlerApi = new JavaImporter(
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.deliveryticket.httputils,
    Packages.java.util,
    Packages.org.json
);

/**
 * @constructor
 * @type {Object}
 */
var HttpMallHandlerService = {

    /**
     * 激活酒卡
     * @return {JSON}
     */
    activatedDeliveryTicket: function (cardNos, userId, reason) {
        var idList = new HttpMallHandlerApi.ArrayList();
        for (var i = 0; i < cardNos.length; i++) {
            idList.add(cardNos[i]);
        }
        var json = HttpMallHandlerApi.HttpMallHandler.activatedDeliveryTicket(idList, userId, reason);
        return JSON.parse(json.toString());
    },

    /**
     * 根据卡类型获取指定数据的可用酒卡
     * @param typeId
     * @param count
     * @return {JSONArray}
     * */
    getAbleTicketsByTypeId:function(typeId,count){
        var tickets = HttpMallHandlerApi.HttpMallHandler.getAbleTicketsByTypeId(typeId,count);
        return JSON.parse(tickets.toString());
    },

    /**
     * 根据类型Id查询可使用的酒卡数量
     * @param typeId
     * @return {int}
     * */
    getAbleTicketCount:function(typeId){
        var count = HttpMallHandlerApi.HttpMallHandler.getAbleTicketCount(typeId);
        return count;
    },
    /**
     * 根据条件搜索酒卡
     * @return {JSON}
     */
    getTicketIdList: function (searchArgs) {
        var jParams = new HttpMallHandlerApi.JSONObject();
        if (searchArgs.page) {
            jParams.put("page", searchArgs.page);
        }
        if (searchArgs.pageLimit) {
            jParams.put("limit", searchArgs.pageLimit);
        }
        if (searchArgs.bankCode) {
            jParams.put("sellSiteId", searchArgs.bankCode);
        }
        if (searchArgs.shopId) {
            jParams.put("takeSiteId", searchArgs.shopId);
        }
        if (searchArgs.clientId) {
            jParams.put("customerId", searchArgs.clientId);
        }
        if (searchArgs.cardNo) {
            jParams.put("ticketNumber", searchArgs.cardNo);
        }
        if (searchArgs.activated) {
            jParams.put("activated", searchArgs.activated);
        }
        if (searchArgs.frozen) {
            jParams.put("frozen", searchArgs.frozen);
        }
        if (searchArgs.invalid) {
            jParams.put("invalid", searchArgs.invalid);
        }
        if (searchArgs.exchange) {
            jParams.put("exchange", searchArgs.exchange);
        }
        if (searchArgs.distribution) {
            jParams.put("distribution", searchArgs.distribution);
        }
        if (searchArgs.delivery) {
            jParams.put("delivery", searchArgs.delivery);
        }


        var json = HttpMallHandlerApi.HttpMallHandler.searchTicketIds(jParams);
        return JSON.parse(json.toString());
    },
    /**
     * 根据条件搜索酒卡
     * @return {JSON}
     */
    getTicketList: function (searchArgs) {
        var jParams = new HttpMallHandlerApi.JSONObject();
        if (searchArgs.page) {
            jParams.put("page", searchArgs.page);
        }
        if (searchArgs.pageLimit) {
            jParams.put("limit", searchArgs.pageLimit);
        }
        if (searchArgs.bankCode) {
            jParams.put("sellSiteId", searchArgs.bankCode);
        }
        if (searchArgs.shopId) {
            jParams.put("takeSiteId", searchArgs.shopId);
        }
        if (searchArgs.clientId) {
            jParams.put("customerId", searchArgs.clientId);
        }
        if (searchArgs.cardNo) {
            jParams.put("ticketNumber", searchArgs.cardNo);
        }
        if (searchArgs.activated) {
            jParams.put("activated", searchArgs.activated);
        }
        if (searchArgs.frozen) {
            jParams.put("frozen", searchArgs.frozen);
        }
        if (searchArgs.invalid) {
            jParams.put("invalid", searchArgs.invalid);
        }
        if (searchArgs.exchange) {
            jParams.put("exchange", searchArgs.exchange);
        }
        if (searchArgs.distribution) {
            jParams.put("distribution", searchArgs.distribution);
        }
        if (searchArgs.delivery) {
            jParams.put("delivery", searchArgs.delivery);
        }


        var json = HttpMallHandlerApi.HttpMallHandler.searchTicket(jParams);
        return JSON.parse(json.toString());
    },
    /**
     * 根据卡号获取酒卡信息
     * @return {JSON}
     */
    getTicketInfo: function (cardNumber) {
        var json = HttpMallHandlerApi.HttpMallHandler.getTicketInfo(cardNumber);
        return   JSON.parse(json.toString());
    },
    /**
     * 根据卡号获取酒卡信息
     * @return {JSON}
     */
    getTicketInfoById: function (cardId) {
        var json = HttpMallHandlerApi.HttpMallHandler.getTicketInfoById(cardId);
        return   JSON.parse(json.toString());
    },
    /**
     * 先验证是否激活再修改酒卡的兑换状态及作废状态,  单个进行
     * @return {JSON}
     */
    exchangeOneTicket: function (cardId, rootShopId, shopId, reason) {
        var json = HttpMallHandlerApi.HttpMallHandler.exchangeOneTicket(cardId, rootShopId, shopId, reason);
        return JSON.parse(json.toString());
    },

    getTicketInfoByIds:function(ids){
        var idList = new HttpMallHandlerApi.ArrayList();
        for (var i = 0; i < ids.length; i++) {
            idList.add(ids[i]);
        }
        var ticketList = HttpMallHandlerApi.HttpMallHandler.getTicketInfoByIds(idList);
        return JSON.parse(ticketList.toString());

    },

    setTicketSalesInfo:function(ids,rootBandId,bankId,clientId){
        var idList = new HttpMallHandlerApi.ArrayList();
        for (var i = 0; i < ids.length; i++) {
            idList.add(ids[i]);
        }
        var jResult = HttpMallHandlerApi.HttpMallHandler.setTicketSalesInfo(idList,rootBandId,bankId,clientId);
        return JSON.parse(jResult.toString());

    },

    /**
     * 根据酒卡批次Id批量获取酒卡类型信息
     * @param ids
     * @return {*}
     */
    getTicketTypeInfos:function(ids){
        var idList = new HttpMallHandlerApi.ArrayList();
        for (var i = 0; i < ids.length; i++) {
            idList.add(ids[i]);
        }
        var ticketTypeList = HttpMallHandlerApi.HttpMallHandler.getTicketTypeInfos(idList);
        return JSON.parse(ticketTypeList.toString());

    },


    /**
     * 删除导入的酒卡时，要移除分配状态、销售网点和客户Id
     * @param ids
     * @param operatorId
     * @param reason
     * @return {JSON}
     */
    removeTicketStatus:function(ids,operatorId,reason){
        var idList = new HttpMallHandlerApi.ArrayList();
        for (var i = 0; i < ids.length; i++) {
            idList.add(ids[i]);
        }
        var jResult = HttpMallHandlerApi.HttpMallHandler.removeTicketStatus(idList,operatorId,reason);
        return JSON.parse(jResult.toString());
    },


    /**
     * 更换酒卡
     * @param cardNumber
     * @return {JSON}
     */
    replaceTicket:function(cardNumber){
        var jResult = HttpMallHandlerApi.HttpMallHandler.replaceTicket(cardNumber);
        return JSON.parse(jResult.toString());
    },


    /**
     * 更换酒卡时，旧的酒卡作废掉，旧的信息更新到新的酒卡
     * @param oldCardNum
     * @param newCardNum
     * @return {JSON}
     */
    cloneTicket:function(oldCardNum,newCardNum){
        var jResult = HttpMallHandlerApi.HttpMallHandler.cloneTicket(oldCardNum,newCardNum);
        return JSON.parse(jResult.toString());
    }

};