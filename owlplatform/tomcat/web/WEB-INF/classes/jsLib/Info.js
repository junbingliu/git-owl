var InfoApi = new JavaImporter(
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.simpleinfo,
    Packages.net.xinshi.isone.modules.info,
    net.xinshi.isone.commons, net.xinshi.isone.functions.info,
    Packages.org.json
);


/**
 * 与信息相关的函数
 * @namespace
 */
var InfoService = {
    /**
     * 获取一个简单信息 ，比如QQ客服，访问量统计等
     * @param columnId   栏目ID
     * @param merchantId   商家ID
     * @return {*}
     */
    getSimpleInfo: function (columnId, merchantId) {
        var jSimpleInfo = InfoApi.IsoneModulesEngine.simpleInfoService.getSimpleInfo(columnId, merchantId);
        if (!jSimpleInfo) {
            return null;
        }
        return JSON.parse(jSimpleInfo.toString());
    },

    /**
     * 取出某个栏目下分商家的信息，不分页
     * @param userId
     * @param columnId
     * @param merchantId
     * @param number  取出多少条
     * @returns {*}
     */
    getInfoListFirstPage: function (userId, columnId, merchantId, number) {
        var map = InfoApi.InfoFunction.getInfoListFirstPage(userId, columnId, merchantId, number);
        if (!map) {
            return null;
        }
        return $.java2Javascript(map);
    },
    /**
     * 取出某个栏目下分商家的信息，分页
     * @param userId
     * @param columnId
     * @param merchantId
     * @param number  取出多少条
     * @param page 页数
     * @returns {*}
     */
    getInfoListByPage: function (userId, columnId, merchantId, page, number) {
        var map = InfoApi.InfoFunction.getInfoListByPage(userId, columnId, merchantId, page, number);
        if (!map) {
            return null;
        }
        return $.java2Javascript(map);
    },
    /**
     * 根据ID获取信息
     * @param id
     * @returns {*}
     */
    getInfo: function (id) {
        if (!id) {
            return null;
        }
        var jInfo = InfoApi.IsoneModulesEngine.infoService.getInfo(id);
        if (jInfo) {
            return JSON.parse(jInfo.toString());
        }
        return null;
    },
    /**
     * 搜索信息
     * @param jSearchArgs 搜索参数
     * @param start 开始
     * @param limit 取多少条
     * @returns {*}
     */
    searchInfo: function (jSearchArgs, start, limit) {
        if (!jSearchArgs) {
            return null;
        }
        jSearchArgs = $.toJavaJSONObject(jSearchArgs);
        var jInfo = InfoApi.InfoSearchUtil.searchInfo(jSearchArgs, start, limit);
        if (jInfo) {
            return JSON.parse(jInfo.toString());
        }
        return null;
    }
};

