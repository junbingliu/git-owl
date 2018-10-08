/**
 * Created by Administrator on 14-1-13.
 */

var AppEditor2Api = new JavaImporter(
    Packages.net.xinshi.isone.modules.appEditor,
    Packages.net.xinshi.isone.modules.appEditor.bean,
    Packages.net.xinshi.isone.modules.appEditor20.bean,
    Packages.java.util,
    Packages.net.xinshi.isone.commons,
    Packages.net.xinshi.isone.modules.appEditor20
);
var AppEditor2Service = {
    addPage : function(pageCollectionId,page){
        var bean = new AppEditor2Api.Page();
        var s = JSON.stringify(page);
        var pageBean = AppEditor2Api.Util.string2Bean(s,bean);
        AppEditor2Api.IsoneAppEditor2Engine.pageCollectionService.addPage(pageCollectionId,pageBean);
    },
    removePage : function(pageCollectionId,pageId){
        AppEditor2Api.IsoneAppEditor2Engine.pageCollectionService.removePage(pageCollectionId,pageId);
    },
    updatePage : function(page){
        var bean = new AppEditor2Api.Page();
        var s = JSON.stringify(page);
        var pageBean = AppEditor2Api.Util.string2Bean(s,bean);
        AppEditor2Api.IsoneAppEditor2Engine.pageCollectionService.updatePage(pageBean);
    },
    removePage : function(pageCollectionId,pageId){
        AppEditor2Api.IsoneAppEditor2Engine.pageCollectionService.removePage(pageCollectionId,pageId);
    },
    addCollection : function(m,collection){
        var bean = new AppEditor2Api.PageCollection();
        var s = JSON.stringify(collection);
        var collectionBean = AppEditor2Api.Util.string2Bean(s,bean);
        return "" + AppEditor2Api.IsoneAppEditor2Engine.pageCollectionService.addCollection(m,collectionBean);
    },
    updateCollection :function(pageCollection){
        var bean = new AppEditor2Api.PageCollection();
        var s = JSON.stringify(pageCollection);
        var collectionBean = AppEditor2Api.Util.string2Bean(s,bean);
        AppEditor2Api.IsoneAppEditor2Engine.pageCollectionService.updateCollection(collectionBean);
    },
    deleteCollection : function(id){
        AppEditor2Api.IsoneAppEditor2Engine.pageCollectionService.deleteCollection(id);
    },
    getCollection : function(id){
        var bean = AppEditor2Api.IsoneAppEditor2Engine.pageCollectionService.getCollection(id);
        if(bean==null){
            return null;
        }
        var s = AppEditor2Api.Util.bean2String(bean);
        return JSON.parse(s);
    },
    getCollections : function(m,from,number){
        var collections = AppEditor2Api.IsoneAppEditor2Engine.pageCollectionService.getCollections(m,from,number);
        var s = AppEditor2Api.Util.bean2String(collections);
        return JSON.parse(s);
    },

    addPublication:function(publication){
        var bean = new AppEditor2Api.Publication();
        var s = JSON.stringify(publication);
        var publicationBean = AppEditor2Api.Util.string2Bean(s,bean);
        return "" + AppEditor2Api.IsoneAppEditor2Engine.publicationService.addPublication(publicationBean);
    },
    getPublications:function(from,number){
        var publications = AppEditor2Api.IsoneAppEditor2Engine.publicationService.getPublications(from,number);
        var s = AppEditor2Api.Util.bean2String(publications);
        return JSON.parse(s);
    },
    getPublicationsByMerchant : function(m,from,number){
        var publications = AppEditor2Api.IsoneAppEditor2Engine.publicationService.getPublicationsByMerchant(m,from,number);
        var s = AppEditor2Api.Util.bean2String(publications);
        return JSON.parse(s);
    },
    updatePublication: function(publication){
        var bean = new AppEditor2Api.Publication();
        var s = JSON.stringify(publication);
        var publicationBean = AppEditor2Api.Util.string2Bean(s,bean);
        AppEditor2Api.IsoneAppEditor2Engine.publicationService.update(publicationBean);
    },
    deletePublication : function (id){
        AppEditor2Api.IsoneAppEditor2Engine.publicationService.delete(publicationBean);
    },
    getPublication : function(id){
        var bean = AppEditor2Api.IsoneAppEditor2Engine.publicationService.getPublication(id);
        var s = AppEditor2Api.Util.bean2String(bean);
        return JSON.parse(s);
    },
    getPageCollections : function(publicationId){
        var collections = AppEditor2Api.IsoneAppEditor2Engine.publicationService.getPublication(publicationId);
        var s = AppEditor2Api.Util.bean2String(collections);
        return JSON.parse(s);
    },
    setCurrentPublication: function(m,publicationId){
        AppEditor2Api.IsoneAppEditor2Engine.urlMappingService.setCurrentPublication(m,publicationId);
    },
    getCurrentPublication:function(m){
        var p = AppEditor2Api.IsoneAppEditor2Engine.urlMappingService.getCurrentPublication(m);
        var s = AppEditor2Api.Util.bean2String(p);
        return JSON.parse(s);
    },
    getPage : function(m,url){
        var pageBean = AppEditor2Api.IsoneAppEditor2Engine.urlMappingService.getPage(m,url);
        var s = AppEditor2Api.Util.bean2String(p);
        return JSON.parse(s);
    }
}