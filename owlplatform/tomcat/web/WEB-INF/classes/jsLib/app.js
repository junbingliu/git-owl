//#import Util.js
var AppApi = new JavaImporter(
  Packages.net.xinshi.isone.modules.appmarket,
  Packages.net.xinshi.is1.appmarket.bean,
  Packages.java.util
);

/**
 * 管理与一个商家安装了的app
 * @namespace
 * @type {{getApps: getApps, getIndependentApps: getIndependentApps, getAppsSize: getAppsSize, getAppsByIds: getAppsByIds, getApp: getApp, getAppMeta: getAppMeta}}
 */

var AppService = {
  /**
   * 返回某个商家app,这里只返回由这个商家直接安装的app,由平台分配过来的app不在此列
   * @param merchantId
   * @param start
   * @param limit
   * @returns {Array}
   */
  getApps: function (merchantId, start, limit){
    var apps = AppApi.Is1AppMarketEngine.appMarketClientService.getMyApps( merchantId, start, limit );
    return $.java2Javascript( apps );
  },

  /**
   * 返回某个商家的apps,其中一种类型叫independentApps,目前只有这种类型的app,因此和getApps是一样的
   * @param merchantId
   * @param start
   * @param limit
   * @returns {Array}
   */
  getIndependentApps: function (merchantId, start, limit){
    var apps = AppApi.Is1AppMarketEngine.appMarketClientService.getMyApps( merchantId, AppApi.App.AppType.independentApp, start, limit );
    return $.java2Javascript( apps );
  },

  deleteMyApp: function (m, appId){
    var apps = AppApi.Is1AppMarketEngine.appMarketClientService.deleteMyApp( m, appId, AppApi.App.AppType.independentApp );
  },

  /**
   * 返回某个商家安装的app的数量,如果是平台，则merchantId为'head_merchant'
   * @param merchantId
   * @returns {number}
   */
  getAppsSize: function (merchantId){
    var size = AppApi.Is1AppMarketEngine.appMarketClientService.getMyAppsSize( merchantId );
    return size;
  },

  /**
   * 根据一个appId数组，返回对应的app
   * @param appIds
   * @returns {Array}
   */
  getAppsByIds: function (appIds){
    var list = new AppApi.ArrayList();
    for ( var i = 0; i < appIds.length; i++ ) {
      list.add( appIds[ i ] );
    }
    var apps = AppApi.Is1AppMarketEngine.appPages.getApps( list );
    return $.java2Javascript( apps );
  },

  /**
   * 返回一个app
   * @param appId
   * @returns {App}
   */
  getApp: function (appId){
    var app = AppApi.Is1AppMarketEngine.appPages.getApp( appId );
    if (!app) {
      return null;
    }
    return $.java2Javascript( app );
  },

  /**
   * 返回一个app里面meta.json的内容
   * @param appId
   * @returns {*}
   */
  getAppMeta: function (appId){
    var app = AppService.getApp( appId );
    return AppService.getAppMetaByAppMd5(app.md5);
  },

  loadAppMeta: function (app){
    // var app = AppService.getApp(appId);
    var metaString = $.getProgram( app.md5, "meta.json" );
    if (!metaString) {
      app.meta = {};
    }
    else {
      try {
        var meta = JSON.parse( metaString );
        app.meta = meta;
      }
      catch ( e ) {
        $.log( appId + " meta.json is invalid:" + metaString );
        return {};
      }
    }
  },

  getAppMetaByAppMd5:function(appMd5){
    var metaString = $.getProgram( appMd5, "meta.json" );
    if (!metaString) {
      return {};
    }
    else {
      try {
        return JSON.parse( metaString );
      }
      catch ( e ) {
        $.log( appId + " meta.json is invalid:" + metaString );
        return {};
      }
    }
  },

  getAppLog: function (m, appId, pageId){
    var appLogList = AppApi.Is1AppMarketEngine.appMarketClientService.getAppLogList( m, appId, pageId );
    if (!appLogList) {
      return null;
    } else {
      return JSON.parse( appLogList.toString() );
    }
  },
  /**
   * 根据在文件APP的相对路径，找到fileId
   * @param appMd5
   * @param resourceUrl
   * @returns {*}
   */
  getResFileId: function (appMd5, resourceUrl){
    if (!resourceUrl) {
      return null;
    }
    return AppApi.Is1AppMarketEngine.appPages.getResFileId( appMd5, resourceUrl );
  },
  /**
   * 根据fileId获取文件实际的URL
   * @param fileId
   * @param spec
   * @returns {*}
   */
  getUrlFromFileId: function (fileId, spec){
    if (!fileId) {
      return null;
    }
    return AppApi.Is1AppMarketEngine.appPages.getUrlFromFileId( fileId, spec );
  }

};