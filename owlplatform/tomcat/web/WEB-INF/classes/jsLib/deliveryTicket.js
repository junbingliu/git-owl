var DeliveryTicketApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.commons,
    Packages.net.xinshi.isone.modules.deliveryticket.service,
    Packages.java.util,
    Packages.net.xinshi.isone.modules.deliveryticket.bean,
    Packages.net.xinshi.isone.functions.deliveryVouchers
);

var DeliveryTicketService = {};
/**
 * 根据券号和类型获取一张券
 * @param objType
 * @param ticketNumber
 * @returns {*}
 */
DeliveryTicketService.getTicketByTicketNumber = function(objType,ticketNumber){
    if(!objType || !ticketNumber)return null;
    var ticket = DeliveryTicketApi.DeliveryTicketHelper.getTicketByTicketNumber(objType,ticketNumber);
    if(!ticket)return null;
    return JSON.parse(""+DeliveryTicketApi.Util.bean2String(ticket));
};
/**
 * 根据类型、券号和密码检查提货券的有效性
 * @param id
 * @returns {*}
 */
DeliveryTicketService.checkDeliveryTicketValid = function(objType,ticketNumber,pwd){
    if(!objType || !ticketNumber || !pwd)return "";
    var state = DeliveryTicketApi.DeliveryTicketHelper.checkDeliveryTicketValid(objType,ticketNumber,pwd);
    return state;
};
/**
 * 检查提货券批次有效性,只验证激活、冻结和作废状态   有效：true  无效：false
 * @param id
 * @returns {*}
 */
DeliveryTicketService.checkDeliveryTicketBatchValid = function(id){
    if(!id)return "";
    var state = DeliveryTicketApi.DeliveryTicketHelper.checkDeliveryTicketBatchValid(id);
    return state;
};
/**
 * 获得提货券类型
 * @param typeId
 * @returns {*}
 */
DeliveryTicketService.getDeliveryTicketType = function(typeId){
    if(!typeId)return "";
    var type = DeliveryTicketApi.DeliveryTicketHelper.getDeliveryTicketType(typeId);
    if(!type)return null;
    return JSON.parse(""+DeliveryTicketApi.Util.bean2String(type));
};
/**
 * 酒卡兑换时，如果用户没有登录则根据卡号生成一个用户并自动登录
 * @param request
 * @param response
 * @param merId
 * @param loginId
 * @returns {string}返回生成的用户ID
 */
DeliveryTicketService.createUserAndLogin = function(request,response,merId,loginId){
    if(!request || !response || merId == "" || loginId == ""){
        return "";
    }
    return "" + DeliveryTicketApi.DeliveryTicketHelper.createUserAndLogin(request,response,merId,loginId);
};
/**
 * 获取提货券购物车信息
 * @param request
 * @param response
 * @param merId
 * @returns {*}
 */
DeliveryTicketService.getDelVouchersCart = function(request,response,merId){
    if(!request || !response || merId == ""){
        return "";
    }
    return JSON.parse("" + DeliveryTicketApi.DeliveryVouchersFunction.getDelVouchersCart(request,response,merId));
};
/**
 * 获取提货券购物车信息
 * @param userId
 * @param merId
 * @returns {*}
 */
DeliveryTicketService.getDelVouchersCartByUser = function(userId,merId){
    if(!userId || userId == "" || merId == ""){
        return "";
    }
    return JSON.parse("" + DeliveryTicketApi.DeliveryVouchersFunction.getDelVouchersCart(userId,merId));
};
/**
 * 获取提货券购物车中的提货券信息
 * @param jDelVouchersCartInfo
 * @returns {*}
 */
DeliveryTicketService.getDelVouchers = function(jDelVouchersCartInfo){
    if(!jDelVouchersCartInfo || jDelVouchersCartInfo == ""){
        return "";
    }
    var s = JSON.stringify(jDelVouchersCartInfo);
    var args = new DeliveryTicketApi.JSONObject(s);
    return JSON.parse("" + DeliveryTicketApi.DeliveryVouchersFunction.getDelVouchers(args));
};
/**
 * 设置提货券购物车
 * @param jVouchersCart
 * @returns {string}
 */
DeliveryTicketService.setDelVouchersCart = function(jVouchersCart){
    if(!jVouchersCart || jVouchersCart == ""){
        return "";
    }
    var args = new DeliveryTicketApi.JSONObject(jVouchersCart);
    return "" + DeliveryTicketApi.DeliveryVouchersFunction.setDelVouchersCart(args);
};
/**
 * 获取提货券里的商品集合
 * @param jVouchersCart
 * @returns {string}
 */
DeliveryTicketService.getDeliveryTicketsInfo = function(voucherNO,vouchers){
    if(!vouchers || vouchers == "" || !voucherNO || voucherNO == ""){
        return "";
    }
    var s = JSON.stringify(vouchers);
    var args = new DeliveryTicketApi.JSONObject(s);
    return JSON.parse("" + DeliveryTicketApi.DeliveryVouchersFunction.getDeliveryTicketsInfo(voucherNO,args));
};

/**
 * 获取酒卡列表
 * @param jVouchersCart
 * @returns {string}
 */
DeliveryTicketService.getDeliveryTickets = function(listName,from,limit){
    if(!listName || listName == ""){
        return "";
    }
    return JSON.parse("" + DeliveryTicketApi.DeliveryVouchersFunction.getDeliveryTicketsInfo(voucherNO,args));
};
