
pageServiceApi = new JavaImporter(
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.appmarket,
    Packages.net.net.xinshi.isone.commons,
    Packages.org.json
);

/**
 * 处理与页面相关的数据
 * @namespace
 */
var pageService = {
    /**
     * 获得页面的配置信息
     * @deprecated
     * @param appId
     * @param pageId
     * @return {*}
     */
    getPageData : function(appId,pageId){
        var jData = pageServiceApi.Is1AppMarketEngine.appMarketClientService.getPageData(appId,pageId);
        return JSON.parse(jData.toString());
    },
    /**
     * 设置页面的配置信息
     * @deprecated
     * @param appId
     * @param pageId
     * @param pageData
     */
    setPageData : function(appId,pageId,pageData){
        var jData = new  pageServiceApi.JSONObject(JSON.stringify(pageData));
        pageServiceApi.Is1AppMarketEngine.appMarketClientService.setPageData(appId,pageId,jData);
    },

    /**
     * 获得页面的配置信息
     * @param merId
     * @param appId
     * @param pageId
     * @returns {*}
     */
    getMerchantPageData : function(merId,appId,pageId){
        var jData = pageServiceApi.Is1AppMarketEngine.appMarketClientService.getPageData(merId,appId,pageId);
        return JSON.parse(jData.toString());
    },
    /**
     * 设置页面的配置信息
     * @param merId
     * @param appId
     * @param pageId
     * @param pageData
     */
    setMerchantPageData : function(merId,appId,pageId,pageData){
        var jData = new  pageServiceApi.JSONObject(JSON.stringify(pageData));
        pageServiceApi.Is1AppMarketEngine.appMarketClientService.setPageData(merId,appId,pageId,jData);
    }

};
