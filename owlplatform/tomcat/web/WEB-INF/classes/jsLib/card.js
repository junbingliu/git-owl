var CardApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.open.card,
    Packages.net.xinshi.isone.modules.card,
    Packages.net.xinshi.isone.functions.card.CardFunction,
    Packages.net.xinshi.isone.commons,
    Packages.net.xinshi.isone.modules.businessruleEx.plan
);

var CardService = {
    /**
     * 获得会员卡列表
     * @param objId
     * @param accountTypeId
     * @param start
     * @param limit
     * @returns {*}
     */
    getUserCardList: function (userId, accountTypeId, start, limit) {
        var cardList = CardApi.CardHandler.getUserCardList(userId, accountTypeId, start, limit);
        return JSON.parse(cardList.toString());
    },


    /**
     * 修改卡状态
     * @param cardId
     * @param stateName
     * @param stateVal
     * @returns {*}
     */
    updateCashCard: function (cardId, stateName, stateVal) {
        return CardApi.CardHandler.updateCashCard(cardId, stateName, stateVal);
    },
    /**
     * 根据条件搜索卡信息
     * @param searchArgs
     * @returns {*}
     */
    searchCards: function (searchArgs) {
        var jParams = $.toJavaJSONObject(searchArgs);
        var json = CardApi.CardSearch.getCards(jParams);
        return JSON.parse(json.toString());
    },
    /**
     * 根据卡ID获取卡对象
     * @param cardId
     * @returns {*}
     */
    getCard: function (cardId) {
        var jCard = CardApi.CardHandler.getCard(cardId);
        if (!jCard) {
            return null;
        }
        return JSON.parse(jCard.toString());
    },
    /**
     * 根据卡号获取卡对象
     * @param innerTypeId : 卡类型（cardType_coupons:购物券，cardType_integralRecharge：积分充值卡，cardType_preDepositRecharge：预存款充值卡）
     * @param cardNumber : 卡号
     * @returns {*}
     */
    getCardByNumber: function (innerTypeId, cardNumber) {
        var jCard = CardApi.CardHandler.getCard(innerTypeId, cardNumber);
        if (!jCard) {
            return null;
        }
        return JSON.parse(jCard.toString());
    },
    /**
     * 给会员批量绑定卡
     * @param userId 会员ID
     * @param cardBatchId 卡批次ID
     * @param count 绑定数量
     * @param reason 绑定原因
     * @returns {*}
     */
    batchBindCards2UserNoPwd: function (userId, cardBatchId, count, reason) {
        if (userId && cardBatchId && count) {
            var result = CardApi.CardFunction.batchBindCards2UserNoPwd(userId, cardBatchId, count, reason);
            return JSON.parse(result.toString());
        }
        return {"code": "100", "msg": "参数错误"};
    },

    /**
     * 获取购物券发放明细表字段
     * @param innerTypeId
     * @param merchantId
     * @param start
     * @param limit
     * @returns {*}
     */
    getStatisticalCardList: function (innerTypeId, merchantId, start, limit) {
        var result = CardApi.CardHandler.getStatisticalCardList(innerTypeId, merchantId, start, limit);
        return JSON.parse(result.toString());
    },

    /**
     * 搜索购物券发放明细表字段
     * @param searchArg
     * @param start
     * @param limit
     * @returns {*}
     */
    getSearchStatisticalCardList: function (searchArg, start, limit) {
        var s = JSON.stringify(searchArg);
        var args = new CardApi.JSONObject(s);
        var result = CardApi.CardHandler.getSearchStatisticalCardList(args, start, limit);
        return JSON.parse(result.toString());
    },

    /**
     * 获取购物券消费明细表字段
     * @param innerTypeId
     * @param merchantId
     * @param start
     * @param limit
     * @returns {*}
     */
    getConsumeLogsList: function (innerTypeId, start, limit) {
        var result = CardApi.CardHandler.getConsumeLogsList(innerTypeId, start, limit);
        return JSON.parse(result.toString());
    },

    /**
     * 搜索购物券消费明细表字段
     * @param searchArg
     * @param start
     * @param limit
     * @returns {*}
     */
    getSearchConsumeLogList: function (searchArg, start, limit) {
        var s = JSON.stringify(searchArg);
        var args = new CardApi.JSONObject(s);
        var result = CardApi.CardHandler.getSearchConsumeLogList(args, start, limit);
        return JSON.parse(result.toString());
    },

    /**
     * 验证卡密码
     * @param jCard 卡对象
     * @param password 密码
     * @returns {boolean} true 正确,false 失败
     */
    checkCardPassword: function (jCard, password) {
        if (!jCard || !password) {
            return false;
        }
        var javaObj = $.toJavaJSONObject(jCard);
        return CardApi.CardHandler.checkCardPassword(javaObj, password);
    },
    /**
     * 给会员绑定卡
     * @param cardId 卡ID
     * @param userId 会员ID
     * @returns {*}
     */
    bindCard2User: function (cardId, userId) {
        if (!cardId || !userId) {
            return null;
        }
        return JSON.parse(CardApi.CardHandler.bindCard2User(cardId, userId) + "");
    },

    /**
     * 获取某个商家下的批次
     * @param merchantId
     * @returns {*}
     */
    getCardBatchList: function (merchantId) {
        var batchList = CardApi.CardHandler.getCardBatchList(merchantId);
        return JSON.parse(batchList.toString());
    },
    /**
     * 根据卡批次ID,获取卡批次对象
     * @param cardBatchId
     * @returns {*}
     */
    getCardBatch: function (cardBatchId) {
        if (!cardBatchId) {
            return null;
        }
        var json = CardApi.CardFunction.getCardBatchById(cardBatchId);
        if(!json){
            return null;
        }
        return JSON.parse(json.toString());
    },
    /**
     * 根据卡批次ID,获取卡批次已派发的数量
     * @param cardBatchId
     * @returns {*}
     */
    getCardBatchUseQuantity: function (cardBatchId) {
        if (!cardBatchId) {
            return 0;
        }
        var list = CardApi.IsoneModulesEngine.cardService.getCardStatusList(cardBatchId, "N");
        if (!list) {
            return 0;
        }
        return list.getSize();
    },
    /**
     * 获取指定用户所有可使用的卡总数量
     * @param userId 用户ID
     * @param innerTypeId 券类型（cardType_coupons）
     */
    getUserAvailableCardCount: function (userId, innerTypeId) {
        if (!userId || !innerTypeId) {
            return -1;
        }
        return CardApi.CardFunction.getUserAvailableCardCount(userId, innerTypeId);
    },
    getUserCardBatches:function(userId){
      var myCardBatches = CardApi.BusinessRuleUtil.getUserCardBatches(userId);
      return JSON.parse("" + NormalBuyFlowApi.Util.bean2String(myCardBatches));
    },
    /**
     * 会员可使用的券
     * @param userId
     * @returns {null}
     */
    getUserAvailableCards:function(userId){
        var myCards = CardApi.CardFunction.getUserAvailableCards(userId, "cardType_coupons");
        if(!myCards){
            return null;
        }
        return JSON.parse(myCards.toString());

    },
    /**
     * 获取券类型名称
     * @param cardTypeId
     * @returns {null}
     */
    getCardType:function(cardTypeId){
        var cardType = CardApi.IsoneModulesEngine.cardTypeService.getCardType(cardTypeId);
        if(!cardType){
            return null;
        }
        return JSON.parse(cardType.toString());

    }
};