//#import Util.js



var MessageApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.message,
    Packages.net.xinshi.isone.modules.message.tools
);

/**
 * @constructor
 * @type {Object}
 */
var MessageService = {};

/**
 * 所有消息(包括投诉、建议、站内,商品咨询)
 * @param messageType
 * @param searchArgs
 * @return {*}
 */
MessageService.getInboxAllMessage = function (messageType, searchArgs) {
    var jParams = $.toJavaJSONObject(searchArgs);
    var json = MessageApi.MessageSearchUtil.getInboxAllMessage(messageType, jParams);
    return JSON.parse(json.toString());
};
/**
 * 根据商品咨询类型，获得某个商品的商品咨询
 * @param productId
 * @param enquiryType
 * @param jSearchArgs
 * @returns {*}
 */
MessageService.getProductEnquiry = function (productId, enquiryType, searchArgs) {
    var jParams = $.toJavaJSONObject(searchArgs);
    var json = MessageApi.MessageSearchUtil.getProductEnquiry(productId, enquiryType, jParams);
    return JSON.parse(json.toString());
};

/**
 * 获得某个商品预定登记信息
 * @param productId
 * @param searchArgs
 * @returns {*}
 */
MessageService.getProductBooking = function (productId, searchArgs) {
    var jParams = $.toJavaJSONObject(searchArgs);
    var json = MessageApi.MessageSearchUtil.getProductBooking(productId, jParams);
    return JSON.parse(json.toString());
};

/**
 * 所有消息(包括投诉、建议、站内信等)（未读总数量）
 * @param messageType
 * @return {*}
 */
MessageService.getInboxUnReadAllMessage = function (messageType) {
    var json = MessageApi.MessageSearchUtil.getInboxUnReadAllMessage(messageType);
    return JSON.parse(json.toString());
};

/**
 * 添加投诉
 * @param messageInfo
 * @returns {*}
 */
MessageService.addComplain = function (messageInfo) {
    var jMessageInfo = $.toJavaJSONObject(messageInfo);
    var json = MessageApi.MessageAddUtil.addComplain(jMessageInfo);
    return JSON.parse(json.toString());
};

/**
 * 会员或者其他对象给平台发送的投诉
 * @param fromObjId
 * @param searchArgs
 * @returns {*}
 */
MessageService.getOutboxComplain = function (fromObjId, searchArgs) {
    var jParams = $.toJavaJSONObject(searchArgs);
    var json = MessageApi.MessageSearchUtil.getOutboxComplain(fromObjId, jParams);
    return JSON.parse(json.toString());
};

/**
 * 个人投诉后，有回复的未读总数量
 * @param fromObjId
 * @returns {*}
 */
MessageService.getOutboxUnReadComplain = function (fromObjId) {
    var json = MessageApi.MessageSearchUtil.getOutboxUnReadComplain(fromObjId);
    return JSON.parse(json.toString());
};

/**
 * 获取平台收到的投诉
 * @param searchArgs
 * @return {*}
 */
MessageService.getInboxComplain = function (searchArgs) {
    var jParams = $.toJavaJSONObject(searchArgs);
    var json = MessageApi.MessageSearchUtil.getInboxComplain(jParams);
    return JSON.parse(json.toString());
};

/**
 * 获取平台收到的投诉（未读总数量）
 * @return {*}
 */
MessageService.getInboxUnReadComplain = function () {
    var json = MessageApi.MessageSearchUtil.getInboxUnReadComplain();
    return JSON.parse(json.toString());
};

/**
 * 添加建议
 * @param messageInfo
 * @returns {*}
 */
MessageService.addSuggestionMessage = function (messageInfo) {
    var jMessageInfo = $.toJavaJSONObject(messageInfo);
    var json = MessageApi.MessageAddUtil.addSuggestionMessage(jMessageInfo);
    return JSON.parse(json.toString());
};

/**
 * 会员或者其他对象给平台发送的建议
 * @param fromObjId
 * @param searchArgs
 * @returns {*}
 */
MessageService.getOutboxSuggestion = function (fromObjId, searchArgs) {
    var jParams = $.toJavaJSONObject(searchArgs);
    var json = MessageApi.MessageSearchUtil.getOutboxSuggestion(fromObjId, jParams);
    return JSON.parse(json.toString());
};

/**
 * 获取平台收到的建议
 * @param searchArgs
 * @return {*}
 */
MessageService.getInboxSuggestion = function (searchArgs) {
    var jParams = $.toJavaJSONObject(searchArgs);
    var json = MessageApi.MessageSearchUtil.getInboxSuggestion(jParams);
    return JSON.parse(json.toString());
};

/**
 * 获取平台收到的建议（未读总数量）
 * @return {*}
 */
MessageService.getInboxUnReadSuggestion = function () {
    var json = MessageApi.MessageSearchUtil.getInboxUnReadSuggestion();
    return JSON.parse(json.toString());
};

/**
 * 添加站内信
 * @param messageInfo
 * @returns {*}
 */
MessageService.addLetterMessage = function (messageInfo) {
    var jMessageInfo = $.toJavaJSONObject(messageInfo);
    var json = MessageApi.MessageAddUtil.addLetterMessage(jMessageInfo);
    return JSON.parse(json.toString());
};

/**
 * 平台、商家、个人收到的站内信
 * @param toObjId ：收件人
 * @param searchArgs
 * @returns {*}
 */
MessageService.getInboxLetter = function (toObjId, searchArgs) {
    var jParams = $.toJavaJSONObject(searchArgs);
    var json = MessageApi.MessageSearchUtil.getInboxLetter(toObjId, jParams);
    return JSON.parse(json.toString());
};

/**
 * 平台、商家、个人收到的站内信（未读总数量）
 * @param toObjId ：收件人
 * @returns {*}
 */
MessageService.getInboxUnReadLetter = function (toObjId) {
    var json = MessageApi.MessageSearchUtil.getInboxUnReadLetter(toObjId);
    return JSON.parse(json.toString());
};

/**
 * 平台、商家、个人发送的站内信
 * @param fromObjId ：发件人
 * @param searchArgs
 * @returns {*}
 */
MessageService.getOutboxLetter = function (fromObjId, searchArgs) {
    var jParams = $.toJavaJSONObject(searchArgs);
    var json = MessageApi.MessageSearchUtil.getOutboxLetter(fromObjId, jParams);
    return JSON.parse(json.toString());
};

/**
 * 平台、商家、个人发送的站内信（有回复未读总数量）
 * @param fromObjId
 * @returns {*}
 */
MessageService.getOutboxUnReadLetter = function (fromObjId) {
    var json = MessageApi.MessageSearchUtil.getOutboxUnReadLetter(fromObjId);
    return JSON.parse(json.toString());
};

/**
 * 添加商品咨询
 * @param messageInfo
 * @returns {*}
 */
MessageService.addProductEnquiryMessage = function (messageInfo) {
    var jMessageInfo = $.toJavaJSONObject(messageInfo);
    var json = MessageApi.MessageAddUtil.addProductEnquiryMessage(jMessageInfo);
    return JSON.parse(json.toString());
};


/**
 * 商家收到的商品咨询
 * @param toObjId ：接收人
 * @param searchArgs
 * @returns {*}
 */
MessageService.getInboxProductEnquiry = function (toObjId, searchArgs) {
    var jParams = $.toJavaJSONObject(searchArgs);
    var json = MessageApi.MessageSearchUtil.getInboxProductEnquiry(toObjId, jParams);
    return JSON.parse(json.toString());
};

/**
 * 个人发送的商品咨询
 * @param fromObjId
 * @param searchArgs
 * @returns {*}
 */
MessageService.getOutboxProductEnquiry = function (fromObjId, searchArgs) {
    var jParams = $.toJavaJSONObject(searchArgs);
    var json = MessageApi.MessageSearchUtil.getOutboxProductEnquiry(fromObjId, jParams);
    return JSON.parse(json.toString());
};

/**
 * 添加商品预定登记
 * @param messageInfo
 * @returns {*}
 */
MessageService.addProductBookingMessage = function (messageInfo) {
    var jMessageInfo = $.toJavaJSONObject(messageInfo);
    var json = MessageApi.MessageAddUtil.addProductBookingMessage(jMessageInfo);
    return JSON.parse(json.toString());
};

/**
 * 商家收到的商品预定登记信息
 * @param toObjId ：接收人
 * @param searchArgs
 * @returns {*}
 */
MessageService.getInboxProductBooking = function (toObjId, searchArgs) {
    var jParams = $.toJavaJSONObject(searchArgs);
    var json = MessageApi.MessageSearchUtil.getInboxProductBooking(toObjId, jParams);
    return JSON.parse(json.toString());
};

/**
 * 回复消息
 * @param messId
 * @param userId
 * @param jReply
 * @return {*}
 */
MessageService.addMessageReply = function (messId, userId, jReply) {
    var jParams = new MessageApi.JSONObject();
    if (jReply.content) {
        jParams.put("content", jReply.content);
    }
    var json = MessageApi.IsoneModulesEngine.exMessageService.addMessageReply(messId, userId, jParams);
    return JSON.parse(json.toString());
};

/**
 * 删除回复
 * @param messId
 * @param userId
 * @param replyId
 * @returns {*}
 */
MessageService.deleteMessageReply = function (messId, userId, replyId) {
    var json = MessageApi.IsoneModulesEngine.exMessageService.deleteMessageReply(messId, userId, replyId);
    return JSON.parse(json.toString());
};

/**
 * 修改消息的审核状态
 * @param messId
 * @param userId
 * @param toCertifySate
 * @param reason
 * @return {*}
 */
MessageService.updateMessageCertifyState = function (messId, userId, toCertifySate, reason) {
    var json = MessageApi.IsoneModulesEngine.exMessageService.updateMessageCertifyState(messId, userId, toCertifySate, reason);
    return JSON.parse(json.toString());
};

/**
 * 修改消息回复的审核状态
 * @param messId
 * @param userId
 * @param replyId
 * @param toCertifySate
 * @param reason
 * @return {*}
 */
MessageService.updateMessageReplyCertifyState = function (messId, userId, replyId, toCertifySate, reason) {
    var json = MessageApi.IsoneModulesEngine.exMessageService.updateMessageReplyCertifyState(messId, userId, replyId, toCertifySate, reason);
    return JSON.parse(json.toString());
};

/**
 * 修改消息的备注
 * @param messId
 * @param userId
 * @param remark
 * @returns {*}
 */
MessageService.updateMessageRemark = function (messId, userId, remark) {
    var json = MessageApi.IsoneModulesEngine.exMessageService.updateMessageRemark(messId, userId, remark);
    return JSON.parse(json.toString());
};

/**
 * 获得一个消息
 * @param messId
 * @returns {*}
 */
MessageService.getMessage = function (messId) {
    var jMessage = MessageApi.IsoneModulesEngine.exMessageService.getMessage(messId);
    if (!jMessage) return null;
    return JSON.parse(jMessage.toString());
};

/**
 * 获得一个加载了相关信息的消息（比如发送人、接收人姓名等）
 * @param objId : 查看人
 * @param messId : 消息ID
 * @returns {*}
 */
MessageService.getCompleteMessage = function (objId, messId) {
    var jMessage = MessageApi.MessageUtil.getCompleteMessage(objId, messId);
    if (!jMessage) return null;
    return JSON.parse(jMessage.toString());
};

/**
 * 设置消息为已读
 * @param objId
 * @param messId
 * @returns {*}
 */
MessageService.updateToHaveRead = function (objId, messId) {
    MessageApi.MessageStateUtil.updateToHaveRead(objId, messId);
};

/**
 * 设置消息为未读
 * @param objId
 * @param messId
 * @returns {*}
 */
MessageService.updateToUnRead = function (objId, messId) {
    MessageApi.MessageStateUtil.updateToUnRead(objId, messId);
};

/**
 * 添加站内信
 * @param jMessageInfo  ：JSON(fromObjId：发送人ID，toObjId：接收人， title:标题，content:内容)
 * @returns {*}
 */
MessageService.addLetterMessage = function (jMessageInfo) {
    var jParams = $.toJavaJSONObject(jMessageInfo);
    var json = MessageApi.MessageAddUtil.addLetterMessage(jParams);
    return JSON.parse(json.toString());
};

/**
 * 添加站内信
 * @param jMessageInfo  ：JSON(fromObjId：发送人ID，toObjId：接收人， title:标题，content:内容，messageSubType:站内信类型，targetObjId:可以是订单外部ID、商品ID等)
 * @returns {*}
 */
MessageService.addLetterMessageEx = function (jMessageInfo) {
    var jParams = $.toJavaJSONObject(jMessageInfo);
    var json = MessageApi.MessageAddUtil.addLetterMessageEx(jParams);
    return JSON.parse(json.toString());
};

/**
 * 批量添加站内信
 * @param fromObjId ：发送人ID
 * @param toObjType : 批量接收人类型，商家（merchant），会员（user）
 * @param toObjIds : 批量接收人ID
 * @param jMessageInfo ：JSON(fromObjId：发送人ID，title:标题，content:内容)
 * @returns {*}
 */
MessageService.batchAddLetterMessage = function (fromObjId, toObjType, toObjIds, jMessageInfo) {
    var jParams = $.toJavaJSONObject(jMessageInfo);
    var json = MessageApi.MessageAddUtil.batchAddLetterMessage(fromObjId, toObjType, toObjIds, jParams);
    return JSON.parse(json.toString());
};

/**
 * 添加商品咨询
 * @param jMessageInfo  ：JSON(messageSubType：咨询分类，fromObjId：发送人ID，toObjId：接收人，targetObjId：咨询的商品ID，title:标题，content:内容)
 * @returns {*}
 */
MessageService.addProductEnquiryMessage = function (jMessageInfo) {
    var jParams = $.toJavaJSONObject(jMessageInfo);
    var json = MessageApi.MessageAddUtil.addProductEnquiryMessage(jParams);
    return JSON.parse(json.toString());
};

/**
 * 添加商品预定登记
 * @param jMessageInfo  ：JSON(messageSubType：咨询分类，fromObjId：发送人ID（可为空），toObjId：接收人（一般为商品所属商家ID），targetObjId：预定的商品ID，title:标题（可为空），content:内容， bookingAmount：预定数量，realName：姓名，mobile：手机)
 * @returns {*}
 */
MessageService.addProductBookingMessage = function (jMessageInfo) {
    var jParams = $.toJavaJSONObject(jMessageInfo);
    var json = MessageApi.MessageAddUtil.addProductBookingMessage(jParams);
    return JSON.parse(json.toString());
};





