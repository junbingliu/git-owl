//#import jobs.js

var AppEditorApi = new JavaImporter(
    Packages.net.xinshi.isone.modules.appEditor,
    Packages.net.xinshi.isone.modules.appEditor.bean,
    Packages.java.util,
    Packages.net.xinshi.isone.commons
);

/**
 * @constant
 * @type {string}
 */
var page_version_task_pageId = "tasks/publishPage.jsx";

/**
 * <p>
 * 页面模版其中一类特殊的app，页面模版由很多组件构成，每个组件用于后台的编辑以及前台的显示。
 * 页面模版通常需要考虑搜索引擎优化，因此不能用太复杂的javascript实现，而应该采用考虑了seo问题的页面组件实现
 * 页面模版支持预览（彩排）机制，也就是可以先定义好一个页面的多个版本，然后指定不同的时间上不同的版本。<p>
 * 此功能可以用于例如：某个促销指定在凌晨才发布，那么我们可以先定义好页面并且设置好凌晨发布。
 * 页面摸版可以使用appEditor进行编辑和管理，本文件定义了appEditor的功能
 * <p>
 * @namespace
 * @type {{getEffectiveTemplates: getEffectiveTemplates, reOrder: reOrder, addToEffectiveTemplates: addToEffectiveTemplates, removeFromEffectiveTemplate: removeFromEffectiveTemplate, getPage: getPage, getPages: getPages, getPageById: getPageById, deletePage: deletePage, getMapping: getMapping, savePage: savePage, addPageVersion: addPageVersion, getPageVersions: getPageVersions, getPageVersion: getPageVersion, deletePageVersion: deletePageVersion, savePageVersion: savePageVersion, publishPageVersion: publishPageVersion}}
 */
var AppEditorService = {
    /**
     * 返回一个商家当前生效的页面模版列表。
     * 一个商家可以安装多个页面模版，但是可以只选择某些模版是有效的。
     * 无效模版对应的页面前台不可见。
     * @param m
     * @returns {Array}
     */
    getEffectiveTemplates : function(m){
        var templates = AppEditorApi.IsoneAppEditorEngine.appEditorService.getEffectiveTemplates(m);
        if(templates==null){
            return null;
        }
        else{
            var s = AppEditorApi.Util.bean2String(templates);
            return JSON.parse("" + s);
        }
    },
    /**
     * 不建议直接使用
     * @private
     * @param m
     * @param appIds
     */
    reOrder:function(m,appIds){
        var javaAppIds = new AppEditorApi.ArrayList();
        for(var i=0; i<appIds.length; i++){
            var appId = appIds[i];
            javaAppIds.add(appId);
        }
        AppEditorApi.IsoneAppEditorEngine.appEditorService.reOrder(m,appIds);
    } ,
    /**
     * 将某个页面模版设为有效的页面模版
     * @param m
     * @param appId
     */
    addToEffectiveTemplates:function(m,appId){
        var result = AppEditorApi.IsoneAppEditorEngine.appEditorService.addToEffectiveTemplates(m,appId);
        if(result){
            return JSON.parse(result + "");
        }
        return null;
    },

    /**
     * 将某个页面模版设为无效的页面模版
     * @param m
     * @param appId
     */
    removeFromEffectiveTemplate:function(m,appId){
        AppEditorApi.IsoneAppEditorEngine.appEditorService.removeFromEffectiveTemplate(m,appId);
    },

    /**
     * 返回一个url对应的页面
     * @param m
     * @param url
     * @returns {Page}
     */
    getPage:function(m,url){
        var page = AppEditorApi.IsoneAppEditorEngine.appEditorService.getPage(m,url);
        var s = "" + AppEditorApi.Util.bean2String(page);
        return JSON.parse(s);
    },

    /**
     * 返回app对应的所有页面
     * @param m
     * @param appId
     * @returns {Array}
     */
    getPages : function(m,appId){
        var pages = AppEditorApi.IsoneAppEditorEngine.appEditorService.getPages(m,appId);
        var s = "" + AppEditorApi.Util.bean2String(pages);
        return JSON.parse(s);
    },

    /**
     * 根据pageId,返回对应的页面对象
     * @param m
     * @param appId
     * @param pageId
     * @returns {*}
     */
    getPageById : function(m,appId,pageId){
        var page = AppEditorApi.IsoneAppEditorEngine.appEditorService.getPageByPageId(m,appId,pageId);
        if(!page){
            return null;
        }
        var s = "" + AppEditorApi.Util.bean2String(page);
        return JSON.parse(s);
    },

    /**
     * 删除某个页面
     * @param m
     * @param appId
     * @param pageId
     */
    deletePage:function(m,appId,pageId){
        AppEditorApi.IsoneAppEditorEngine.appEditorService.deletePage(m,appId,pageId);
    },
    /**
     * 返回完整的url -> page的对应关系
     * @param m
     * @returns {string}
     */
    getMapping : function(m){
        return "" + AppEditorApi.IsoneAppEditorEngine.appEditorService.getMapping(m);
    },

    /**
     * 保存一个页面
     * @param m
     * @param appId
     * @param page
     */
    savePage:function(m,appId,page){
        var pageBean = new AppEditorApi.Page();
        var s = JSON.stringify(page);
        var pageBean1 = AppEditorApi.Util.string2Bean(s,pageBean);
        AppEditorApi.IsoneAppEditorEngine.appEditorService.savePage(m,appId,pageBean1);
    },
    /**
     * 从哪个个页面，或者预览页复制出一个预览页，这个复制的预览页与原来的页面有一样的数据
     * @param m
     * @param rappId
     * @param origId 可以是pageId,也可以是pageVersionId
     * @param page
     * @returns {string}
     */
    addPageVersion:function(m,rappId,origId, page){
        var pageBean = new AppEditorApi.Page();
        var s = JSON.stringify(page);
        var pageBean1 = AppEditorApi.Util.string2Bean(s,pageBean);
        var pageVersionId =  "" + AppEditorApi.IsoneAppEditorEngine.appEditorService.addPageVersion(m,rappId,origId,pageBean1);
        var taskId = "" + JobsService.submitTask(appId,page_version_task_pageId,{mid:m,rappId:page.appId,pageVersionId:pageVersionId},page.publishDate);
        pageBean1.setTaskId(taskId);
        AppEditorApi.IsoneAppEditorEngine.appEditorService.savePageVersion(pageVersionId,pageBean1);
        return pageVersionId;
    },
    /**
     * 返回一个页面的预览页的列表
     * @param mid
     * @param appId
     * @param origId
     * @param from
     * @param number
     * @returns {Array}
     */
    getPageVersions : function(mid,appId,origId, from, number){
        var versions = AppEditorApi.IsoneAppEditorEngine.appEditorService.getPageVersions(mid,appId,origId,from,number);
        var s = "" + AppEditorApi.Util.bean2String(versions);
        return JSON.parse(s);
    },
    /**
     * 获取一个预览页
     * @param pageVersionId
     * @returns {Page}
     */
    getPageVersion : function(pageVersionId){
        var pageVersion = AppEditorApi.IsoneAppEditorEngine.appEditorService.getPageVersionString(pageVersionId);
        if(!pageVersion){
            return null;
        }
        return JSON.parse("" + pageVersion);
    },
    /**
     * 删除一个页面的一个预览页
     * @param mid
     * @param appId
     * @param pageId
     * @param pageVersionId
     */
    deletePageVersion:function( mid, appId,pageId, pageVersionId){
        AppEditorApi.IsoneAppEditorEngine.appEditorService.deletePageVersion(mid,appId,pageId,pageVersionId);
    },
    /**
     * 保存一个预览页
     * @param pageVersionId
     * @param page
     */
    savePageVersion:function( pageVersionId,page){
        var s = JSON.stringify(page);
        var origPageVersion = AppEditorService.getPageVersion(pageVersionId);
        if(!origPageVersion){
            throw "此彩排页已经被删除，不能再修改！";
        }

        if(origPageVersion.taskId){
            JobsService.deleteTask(origPageVersion.taskId);
        }
        var taskId = "" + JobsService.submitTask(appId,page_version_task_pageId,{mid:page.merchantId,rappId:page.appId,pageVersionId:pageVersionId},page.publishDate);
        page.taskId = taskId;
        var pageBean = new AppEditorApi.Page();

        var pageBean1 = AppEditorApi.Util.string2Bean(s,pageBean);
        AppEditorApi.IsoneAppEditorEngine.appEditorService.savePageVersion(pageVersionId,pageBean1);
    },

    /**
     * 立即发布一个预览页
     * @param m
     * @param appId
     * @param pageVersionId
     */
    publishPageVersion:function(m,appId,pageVersionId){
        var page = AppEditorService.getPageVersion(pageVersionId);
        var newPageData = pageService.getMerchantPageData(m, appId,pageVersionId);
        var pageId = page.origPageId;
        pageService.setMerchantPageData(m, appId, pageId, newPageData);
        page.pageId = page.origPageId;
        page.origPageId = pageVersionId;
        AppEditorService.savePage(m,appId,page);

        //更新最后发布时间
        var now = (new Date()).getTime();
        page.origPageId = page.pageId;
        page.published = true;
        page.lastPublishedDate = now;
        var s = JSON.stringify(page);
        var pageBean = new AppEditorApi.Page();
        var pageBean1 = AppEditorApi.Util.string2Bean(s,pageBean);
        AppEditorApi.IsoneAppEditorEngine.appEditorService.savePageVersion(pageVersionId,pageBean1);
        //最后不删除pageVersion
        //AppEditorService.deletePageVersion(m,appId,pageId,pageVersionId);
    }
};