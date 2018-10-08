var MerchantApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.merchant,
    Packages.net.xinshi.isone.modules.merchant.tools,
    Packages.net.xinshi.isone.lucene.search.merchant,
    Packages.net.xinshi.isone.lucene,
    Packages.java.lang,
    Packages.java.util,
    Packages.net.xinshi.isone.commons
);

/**
 * @namespace
 */
var MerchantService = {};

/**
 * 获得一个商家对象
 * @param merchantId
 * @return {*}
 */
MerchantService.getMerchant = function (merchantId) {
    var jMerchant = MerchantApi.IsoneModulesEngine.merchantService.getMerchant(merchantId);
    if (!jMerchant) return null;
    return JSON.parse(jMerchant.toString());
};

/**
 * 一次保存多个商家状态
 * @param merchantId
 * @param jNoVersionMerchant
 * @return {*}
 */
MerchantService.noversionBatchUpdateMerchantStates = function (merchantId,jNoVersionMerchant) {
    var jJavaNoVersionMerchant = $.toJavaJSONObject(jNoVersionMerchant);
    MerchantApi.IsoneModulesEngine.merchantService.noversionBatchUpdateMerchantStates(merchantId,jJavaNoVersionMerchant);
};
/**
 * 返回这个商家信息是否已经被删除的标记
 * @param merchant
 * @returns {*}
 */
MerchantService.isDeleted = function (merchant) {
    var jMerchant = new MerchantApi.JSONObject(JSON.stringify(merchant));
    var isDel = MerchantApi.MerchantUtil.isDeleted(jMerchant);
    if (isDel) return "0";
    return "1";
};

/**
 * 获得商家对接的一个checkout版本
 * @param merchantId
 * @returns {*}
 */
MerchantService.getCheckoutCopy = function (merchantId) {
    var jMerchant = MerchantApi.IsoneModulesEngine.merchantService.getCheckoutCopy(merchantId);
    if (!jMerchant) return null;
    return JSON.parse(jMerchant.toString());
};

/**
 * 平台商家的服务支持初始化参数
 * @return {*}
 */
MerchantService.getMerchantSupportServices = function () {
    var services = MerchantApi.MerchantSysArgumentUtil.getMerchantSupportServices();
    return JSON.parse(services.toString());
};

/**
 * 获得商家的母帐号
 * @return {string}
 */
MerchantService.getRootAdmin = function (merchantId) {
    var jMerchant = MerchantApi.IsoneModulesEngine.merchantService.getMerchant(merchantId);
    if (jMerchant == null) return "";
    var adminUserId = MerchantApi.MerchantUtil.getRootAdmin(jMerchant);
    return "" + adminUserId;
}

MerchantService.search = function (start, limit, keyword, orgId, merchantTypeId, gradeId, regionId, mainColumnId, sCertifyState, sEnableState, sPublishState, sMerchantGrade) {
    var searchArgs = new MerchantApi.MerchantSearchArgs();
    if (keyword) {
        searchArgs.setKeyword(keyword);
    }
    if (regionId) {
        searchArgs.setRegion(regionId);
    }
    if (merchantTypeId) {
        searchArgs.setColumnId(merchantTypeId);
    }
    if (sCertifyState) {
        searchArgs.setCertifyState(sCertifyState);
    }
    if (sEnableState) {
        searchArgs.setEnableState(sEnableState);
    }
    if (sPublishState) {
        searchArgs.setPublishState(sPublishState);
    }
    if (sMerchantGrade) {
        searchArgs.setMerchantGradeId(sMerchantGrade);
    }
    if (mainColumnId) {
        searchArgs.setMainColumnId(mainColumnId);
    }

    if (orgId) {
        searchArgs.setPath(orgId);
    }

    searchArgs.setFetchCount(limit);
    searchArgs.setFromPath(start);
    var searchResult = MerchantApi.IsoneFulltextSearchEngine.searchServices.search(searchArgs);
    var rowsCount = searchResult.getTotal();
    var ids = searchResult.getLists();
    var result = MerchantApi.IsoneModulesEngine.merchantService.getCheckoutOrHeadCopies(ids);
    var s = MerchantApi.Util.bean2String(result);
    var merchants = JSON.parse(s);
    merchants = merchants.map(function (merchant) {
        return merchant.objectMap;
    });
    return {
        total: rowsCount,
        merchants: merchants
    };
};

/**
 * 添加商家
 * @param jMerchantInfo
 * @param userId
 * @param isDoCheckin : false 只会生成一个checkout版本
 * @return {*}
 */
MerchantService.addSimpleMerchant = function (jMerchantInfo, userId, isDoCheckin) {
    var jJavaMerchantInfo = $.toJavaJSONObject(jMerchantInfo);
    var json = MerchantApi.MerchantAddUtil.addMerchant(jJavaMerchantInfo, userId, isDoCheckin);
    return JSON.parse(json.toString());
};

/**
 * 修改商家
 * @param merchantId
 * @param jMerchant
 * @param userId
 * @return {*}
 */
MerchantService.updateMerchantAndCheckin = function (merchantId, jMerchant, userId) {
    var jJavaMerchant = $.toJavaJSONObject(jMerchant);
    var json = MerchantApi.MerchantUpdateUtil.updateMerchant(merchantId, jJavaMerchant, userId, true);
    return JSON.parse(json.toString());
};

/**
 * 修改商家
 * @param merchantId
 * @param jMerchant
 * @param userId
 * @param isDoCheckin : false 只会生成一个checkout版本
 * @return {*}
 */
MerchantService.updateMerchant = function (merchantId, jMerchant, userId, isDoCheckin) {
    var jJavaMerchant = $.toJavaJSONObject(jMerchant);
    var json = MerchantApi.MerchantUpdateUtil.updateMerchant(merchantId, jJavaMerchant, userId, isDoCheckin);
    return JSON.parse(json.toString());
};

/**
 * 直接修改商家
 * @param merchantId
 * @param jMerchant
 * @param userId
 */
MerchantService.updateMerchantEx = function (merchantId, jMerchant, userId) {
    var jJavaMerchant = $.toJavaJSONObject(jMerchant);
    MerchantApi.IsoneModulesEngine.merchantService.updateMerchant(merchantId, jJavaMerchant, userId);
};

/**
 * 商家入驻流程中的辅助API
 * @param jMerchant    : 1(信息提交阶段)、2(入驻审核阶段)、3(审核通过阶段)、4(开店完成)
 * @return {*}
 */
MerchantService.getApplyProcessState = function (jMerchant) {
    var jJavaMerchant = $.toJavaJSONObject(jMerchant);
    var s = MerchantApi.MerchantUtil.getApplyProcessState(jJavaMerchant);
    return "" + s;
};

/**
 * 根据商家入驻注册的用户ID获得关联的商家ID
 * @param userId
 * @return {*}
 */
MerchantService.getMerchantIdByApplyUserId = function (userId) {
    var merchantId = MerchantApi.IsoneModulesEngine.code2MerchantService.getMerchantIdByApplyUserId(userId);
    return "" + merchantId;
};

MerchantService.getApplyUserIdByMerchantId = function(merchantId){
    var userId = MerchantApi.IsoneModulesEngine.code2MerchantService.getApplyUserIdByMerchantId(merchantId);
    return "" + userId;
};

/**
 * 保存商家入驻注册的用户ID与商家的关联关系
 * @param merchantId
 * @param userId
 * @return {*}
 */
MerchantService.saveApplyUserId2MerchantId = function (merchantId, userId) {
    MerchantApi.IsoneModulesEngine.code2MerchantService.saveApplyUserId2MerchantId(merchantId, userId);
};

/**
 * 设置商家的母帐号
 * @param merchantId
 * @param userId
 * @return {*}
 */
MerchantService.saveMerchantRootAdmin = function (merchantId, userId) {
    MerchantApi.IsoneModulesEngine.merchantAdminService.addAdmin(merchantId, userId);
    MerchantApi.IsoneModulesEngine.merchantService.noversionUpdateMerchantRootAdmin(merchantId, userId);

    var jUser = MerchantApi.IsoneModulesEngine.memberService.getUser(userId);
    if (jUser && jUser.isNull("rootMerchant")) {
        jUser.put("rootMerchant", merchantId);
        MerchantApi.IsoneModulesEngine.memberService.updateUser(jUser, userId);
    }
};
MerchantService.getAllEnableMerchantByAdmin = function (userId) {
    var merchantList = MerchantApi.IsoneModulesEngine.merchantAdminService.getAllEnableMerchantByAdmin(userId);
    return merchantList;
};

MerchantService.getMerchants = function (search) {
    var searchArgs = $.toJavaJSONObject(search);
    var merchantList = MerchantApi.MerchantSearchUtil.getMerchants(searchArgs);
    return JSON.parse(merchantList.toString());
};

/**
 * 根据商家编码获得商家ID
 * @param merchantCode
 * @returns {string}
 */
MerchantService.getMerchantIdByMerchantCode = function (merchantCode) {
    var merchantId = MerchantApi.IsoneModulesEngine.code2MerchantService.getMerchantIdByMerchantCode(merchantCode);
    if (merchantId) {
        return merchantId + "";
    }
    return "";
};

/**
 * 根据商家ID获得商家的地理位置
 * @param merchantId
 * @returns []
 */
MerchantService.getBaiduLocation = function (merchantId) {
    var json = MerchantApi.IsoneModulesEngine.baiduMapService.getLocation(merchantId);
    if (!json) {
        json = [];
    }
    return json;
};

/**
 * 根据商家ID获得商家的地理位置(为了兼容旧的，所以保留了上面的api)
 * @param merchantId
 * @returns {*}
 */
MerchantService.getBaiduLocationEx = function (merchantId) {
    var json = MerchantApi.IsoneModulesEngine.baiduMapService.getLocation(merchantId);
    if (!json) {
        return [];
    }
    return JSON.parse(json.toString());
};

/**
 * 获取某个组织机构下所有的商家
 * @param columnId 组织机构ID
 * @param start 从多少开始
 * @param limit 取多少条
 * @returns []
 */
MerchantService.getMerchantsByColumnId = function (columnId, start, limit) {
    if (!columnId) {
        return null;
    }
    if (!start) {
        start = 0;
    }
    if (!limit) {
        limit = -1;
    }
    return JSON.parse(MerchantApi.IsoneModulesEngine.merchantService.getMerchantsByColumnId(columnId, start, limit) + "");
};

MerchantService.getMerchantsByIds = function(merchantIds){
    var ids = new MerchantApi.ArrayList();
    merchantIds.forEach(function(id){ids.add(id)});
    var merchants = MerchantApi.IsoneModulesEngine.merchantService.getListDataByIds(ids,false);
    return JSON.parse(merchants.toString());
};

MerchantService.getMerchantIds = function (columnId, page, number) {
    var iSortList = MerchantApi.IsoneModulesEngine.merchantService.getList(columnId);
    var size = iSortList.getSize();
    var pageCount = Math.floor((size + number - 1) / number);
    var start = page * number;
    var last = start + number > size ? size - start : number;
    var sortList = iSortList.getRange(start, last);
    var ids = [];
    for (var i = 0; i < sortList.size(); i++) {
        ids.push(sortList.get(i).getObjid() + "");
    }
    return ids;
};

/**
 * 重建商家索引
 * @param merchantId
 */
MerchantService.reBuildIndex = function (merchantId) {
    if (!merchantId) {
        return;
    }
    MerchantApi.IsoneModulesEngine.merchantService.addIndexingQue(merchantId);
};