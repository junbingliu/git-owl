var LotteryService = {};
var LotteryApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.commons,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.base,
    Packages.net.xinshi.isone.modules.lottery,
    Packages.net.xinshi.pigeon.list,
    Packages.net.xinshi.isone.modules.lottery.bean
);
LotteryService.getLotteryList = function (merchantId) {
    var iSortList = LotteryApi.IsoneModulesEngine.lotteryService.getLotteryList(merchantId || "head_merchant");
    var sortList = iSortList.getRange(0, -1);
    var jLotteryList = LotteryApi.IsoneModulesEngine.lotteryService.getListData(sortList, true);
    if (!jLotteryList) {
        return null;
    }
    return JSON.parse(jLotteryList.toString());
};
LotteryService.getLottery = function (lotteryId) {
    var lottery = LotteryApi.IsoneModulesEngine.lotteryService.getLottery(lotteryId);
    if (!lottery) {
        return null;
    }
    return JSON.parse("" + LotteryApi.Util.bean2String(lottery));
};
LotteryService.getHitAwardUserListWithJSON = function (lotteryId, start, limit) {
    return "" + LotteryApi.IsoneModulesEngine.lotteryService.getHitAwardUserListWithJSON(lotteryId, start, limit);
};

LotteryService.getHitAwardUserList = function (lotteryId, start, limit) {
    return "" + LotteryApi.IsoneModulesEngine.lotteryService.getHitAwardUserListWithJSON(lotteryId, start, limit);
};

/**
 * 验证用户是否有抽奖资格
 *
 * @param lotteryId
 * @param userId
 * @returns {string}
 */
LotteryService.isMatchLotteryRule = function (lotteryId, userId) {
    return "" + LotteryApi.LotteryUtil.isMatchLotteryRule(lotteryId, userId);

};

/**
 * 获得可抽奖次数
 * @param userId
 * @param lotteryId
 */
LotteryService.getHitAwardCount = function (userId, lotteryId) {
    return LotteryApi.LotteryUtil.getHitAwardCount(userId, lotteryId);
};

/**
 * 修改可抽奖次数
 * @param lotteryId 抽奖活动ID
 * @param userId 会员ID
 * @param count 修改的次数，正数是加抽奖机会，负数是减
 */
LotteryService.updateHitAwardCount = function (lotteryId, userId, count) {
    LotteryApi.LotteryUtil.updateHitAwardCount(lotteryId, userId, count);
};

/**
 * 用户在某次抽奖活动中的抽奖核心方法
 * @param lotteryId
 * @param userId
 * @returns {*}
 */
LotteryService.doAward = function (lotteryId, userId) {
    var award = LotteryApi.LotteryUtil.doAward(lotteryId, userId);
    if (!award) {
        return null;
    }
    var awardString = LotteryApi.Util.bean2String(award);
    return awardString;
};
/**
 * 添加抽奖活动
 * @param lottery
 * @param merchantId
 */
LotteryService.addLottery = function (lottery, merchantId) {
    var jLottery = new LotteryApi.JSONObject(lottery);
    LotteryApi.IsoneModulesEngine.lotteryService.addLotteryInfo(jLottery, merchantId);
};

LotteryService.deleteList = function (lotteryId, merchantId) {
    LotteryApi.IsoneModulesEngine.lotteryService.deleteList(lotteryId, merchantId);
};

//获取会员已抽奖的次数
LotteryService.getUserAwardCount = function (lotteryId, userId) {
    var iSortList = LotteryApi.IsoneModulesEngine.lotteryService.getUserHitAwardList(lotteryId, userId);
    return iSortList.getSize();
};

/**
 * 获取用户中奖记录
 * @param lotteryId 抽奖活动API
 * @param userId 用户ID
 * @param start 开始位置，不传就从第一条开始取
 * @param limit 取多少条,不传就取所有
 * @returns {*}
 */
LotteryService.getUserHitAwardList = function (lotteryId, userId, start, limit) {
    if (!start) {
        start = 0;
    }
    if (!start) {
        limit = -1;
    }
    var result = LotteryApi.LotteryUtil.getUserHitAwardList(lotteryId, userId, start, limit);
    if (!result) {
        return null;
    }
    return JSON.parse(result + "");
};

LotteryService.getHitAwardUserListSize = function (lotteryId) {
    return "" + LotteryApi.IsoneModulesEngine.lotteryService.getHitAwardUserListSize(lotteryId);
};

/**
 * 获得一个奖品
 * @param hitAwardId
 * @returns {*}
 */
LotteryService.getHitAward = function (hitAwardId) {
    var hitAward = LotteryApi.IsoneModulesEngine.lotteryService.getHitAward(hitAwardId);
    if (!hitAward) {
        return null;
    }
    return JSON.parse("" + LotteryApi.Util.bean2String(hitAward));
};

/**
 * 获取用户中奖记录
 * @param lotteryId 抽奖活动ID
 * @param hitAward 中奖记录
 * @returns {*}
 */
LotteryService.addHitAward = function (lotteryId, hitAward) {
    if (!lotteryId || !hitAward) {
        return null;
    }
    var jHitAward = new LotteryApi.JSONObject(hitAward);
    return LotteryApi.IsoneModulesEngine.lotteryService.addHitAwardJSON(lotteryId, jHitAward);
};
