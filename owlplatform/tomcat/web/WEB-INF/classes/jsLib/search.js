var SearchApi =  new JavaImporter(
    Packages.net.xinshi.isone.lucene,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.commons,
    Packages.net.xinshi.isone.modules.jobs.search,
    Packages.net.xinshi.isone.lucene.util,
    Packages.java.util
);

var SearchService = {
    index : function(docs,ids,searchType){
        var docsString = JSON.stringify(docs);
        var idsString = ids;
        var docBuilder = new SearchApi.JavascriptDocBuilder();
        docBuilder.setDocs(docsString);
        docBuilder.setIds(idsString);
        if(searchType){
            docBuilder.setSearchType(searchType);
        }
        SearchApi.IsoneFulltextSearchEngine.searchServices.index(docBuilder);
    },

    indexToSolr:function(coreName,docs){
        SearchApi.DssUtil.indexToSolr(coreName, $.JSONArray(docs));
    },
    deleteSolr : function(coreName,id){
        SearchApi.DssUtil.deleteSolrById(coreName, id);
    },
    searchSolr:function(coreName,searchArgs){
        var ctxMap = new SearchApi.HashMap();
        for(var k in searchArgs){
            ctxMap.put(k,searchArgs[k]);
        }
        return SearchApi.DssUtil.search(coreName, ctxMap);
    },
    search:function(searchArgs){
        var javaArgs = $.getBean("net.xinshi.isone.modules.jobs.search.JavascriptSearchArgs",searchArgs);
        var searchResult = SearchApi.IsoneFulltextSearchEngine.searchServices.search(javaArgs);

        //返回的对象是java对象
        //本函数作为底层的工具类函数，是不用于最后用户使用的类，所以返回的是java类

        var result = {args:javaArgs,searchResult:searchResult}
        return result;
    },

    directSearch:function(searchType,searchArgs){
        var ctxMap = new SearchApi.HashMap();
        for(k in searchArgs){
            ctxMap.put(k,searchArgs[k]);
        }
        var result = SearchApi.SearchUtil.search(searchType,ctxMap);
        try{
            return JSON.parse(""+result);
        }
        catch(e){
            return {
                state:"err",
                msg:"" + result
            }
        }
    },

    getIndexName:function(searchName){
        return searchName + "_" + $.getSaasId();
    },

    highlight: function(results,javaArgs,id,defaultText){
        return "" + SearchApi.DiscoveryHelper.getHighLightText(results,javaArgs,id,defaultText);
    },
    autoSuggest:function(productSearchArgs){
        return SearchApi.IsoneFulltextSearchEngine.getRecommeder().autoSuggest(productSearchArgs);
    }
};