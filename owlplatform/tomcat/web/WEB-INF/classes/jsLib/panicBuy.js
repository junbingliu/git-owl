//#import search.js
//#import column.js
//#import brand.js

/**
 * @namespace
 */
var PanicBuyService = {};
var PanicBuyApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.base,
    Packages.net.xinshi.isone.lucene,
    Packages.net.xinshi.isone.lucene.search.panicBuy,
    Packages.net.xinshi.isone.modules.panicbuy,
    Packages.net.xinshi.isone.modules.pricepolicy,
    Packages.java.util,
    Packages.net.xinshi.isone.commons.DateUtil
);




/**
 * 获得指定商家团抢购列表
 * @param merchantId 商家Id
 * @param columnId 传入col_m_Promotional_001表示获取抢购，col_m_Promotional_002表示获取团购
 * @param from  用于分页，表示从第几条开始
 * @param number  用于分页，表示获取多少条
 * @return {JSONObject}
 */
PanicBuyService.getAllPanicBuys=function(merchantId,columnId,from,number){
    var results=PanicBuyApi.IsoneModulesEngine.panicBuyService.getAllPanicBuys(merchantId,columnId,from,number);
    var list = results.getList();
    var ret =  {};
    ret.total = 0 + results.getCount();
    ret.products = JSON.parse(list.toString());
    return ret;
}

/**
 * 获得指定商家未开始团抢购列表
 * @param merchantId 商家Id
 * @param columnId 传入col_m_Promotional_001表示获取抢购，col_m_Promotional_002表示获取团购
 * @param from  用于分页，表示从第几条开始
 * @param number  用于分页，表示获取多少条
 * @return {JSONObject}
 */
PanicBuyService.getFuturePanicBuys=function(merchantId,columnId,from,number){
    var results=PanicBuyApi.IsoneModulesEngine.panicBuyService.getFuturePanicBuys(merchantId,columnId,from,number);
    var list = results.getList();
    var ret =  {};
    ret.total = 0 + results.getCount();
    ret.products = JSON.parse(list.toString());
    return ret;
}
/**
 * 获得指定商家往期团抢购列表
 * @param merchantId 商家Id
 * @param columnId 传入col_m_Promotional_001表示获取抢购，col_m_Promotional_002表示获取团购
 * @param from  用于分页，表示从第几条开始
 * @param number  用于分页，表示获取多少条
 * @return {JSONObject}
 */
PanicBuyService.getExpiredPanicBuys=function(merchantId,columnId,from,number){
    var results=PanicBuyApi.IsoneModulesEngine.panicBuyService.getExpiredPanicBuys(merchantId,columnId,from,number);
    var list = results.getList();
    var ret =  {};
    ret.total = 0 + results.getCount();
    ret.products = JSON.parse(list.toString());
    return ret;
}


/**
 * 获得指定商家昨日团抢购列表
 * @param merchantId 商家Id
 * @param columnId 传入col_m_Promotional_001表示获取抢购，col_m_Promotional_002表示获取团购
 * @param from  用于分页，表示从第几条开始
 * @param number  用于分页，表示获取多少条
 * @return {JSONObject}
 */
PanicBuyService.getYesTodayPanicBuys=function(merchantId,columnId,from,number){
    var results=PanicBuyApi.IsoneModulesEngine.panicBuyService.getYesTodayPanicBuys(merchantId,columnId,from,number);
    var list = results.getList();
    var ret =  {};
    ret.total = 0 + results.getCount();
    ret.products = JSON.parse(list.toString());
    return ret;
}

/**
 * 获得指定商家进行中团抢购列表
 * @param merchantId 商家Id
 * @param columnId 传入col_m_Promotional_001表示获取抢购，col_m_Promotional_002表示获取团购
 * @param from  用于分页，表示从第几条开始
 * @param number  用于分页，表示获取多少条
 * @return {JSONObject}
 */
PanicBuyService.getCurrentPanicBuys=function(merchantId,columnId,from,number,brandId,productColumnId,isShowPhone,recommend){
    var results=PanicBuyApi.IsoneModulesEngine.panicBuyService.getCurrentPanicBuys(merchantId,columnId,from,number,brandId||null,productColumnId||null,isShowPhone||null,recommend||null);
    var list = results.getList();
    var ret =  {};
    var facets=results.getFacets();
    PanicBuyService.getFacets(ret,facets);
    ret.total = 0 + results.getCount();
    ret.products = JSON.parse(list.toString());
    return ret;
}


PanicBuyService.getFacets=function(ret,facets){
    var brandList=facets.get("brandId");
    var column_facetColumn=facets.get("column_facetColumn3");
    ret.brandList = JSON.parse(PanicBuyService.getJSONFormList(brandList));
    ret.column_facetColumn =JSON.parse(PanicBuyService.getJSONFormList(column_facetColumn));
    if(ret.column_facetColumn){
        for(var i=0;i<ret.column_facetColumn.length;i++){
            var column=ColumnService.getColumn(ret.column_facetColumn[i].name);
            ret.column_facetColumn[i].displayName=column.name;
        }
    }
    if(ret.brandList){
        for(var i=0;i<ret.brandList.length;i++){
            var brand=BrandService.getBrand(ret.brandList[i].name);
            if(brand){
                ret.brandList[i].displayName=brand.name;
            }
            else{
                ret.brandList[i].displayName = "其他";
            }
        }
    }
}
/**
 * 根据关键字搜索指定商家团抢购列表
 * @param merchantId 商家Id
 * @param columnId 传入col_m_Promotional_001表示获取抢购，col_m_Promotional_002表示获取团购
 * @param from  用于分页，表示从第几条开始
 * @param number  用于分页，表示获取多少条
 * @return {JSONObject}
 */
PanicBuyService.search=function(merchantId,keyword,columnId,from,number){
    var results=PanicBuyApi.IsoneModulesEngine.panicBuyService.search(merchantId,keyword,columnId,from,number);
    var list = results.getList();
    var ret =  {};

    ret.total = 0 + results.getCount();
    ret.products = JSON.parse(list.toString());
    return ret;
}

//工具方法，获得当前已开始且未过期的抢购的搜索条件
PanicBuyService.getCurrentQueryArgs = function(){
    var queryArgs = {}
    queryArgs.mode="advanced";
    q = [];
    var date=new Date();
    var nowString = "" + PanicBuyApi.DateUtil.getLongDate(date.getTime());
    q = [
        {mode:"simple",type:'range',n:'buyTimeBegin',low:null,high:nowString},
        {mode:"simple",type:'range',n:'buyTimeEnd',low:nowString,high:null}
    ]
    queryArgs.q =[];
    return queryArgs;
}


/**
 * 获得指定商家已上架团抢购列表
 * @param merchantId 商家Id
 * @param columnId 传入col_m_Promotional_001表示获取抢购，col_m_Promotional_002表示获取团购
 * @param from  用于分页，表示从第几条开始
 * @param number  用于分页，表示获取多少条
 * @param brandId  品牌Id
 * @param productColumnId  商品分类Id
 * @param isShowPhone  "1"表示手机专用，"0"表示不是,注意传进来必须是string类型
 * @param recommend  是否平台推荐,true表示只显示平台推荐，false表示显示所有
 * @return {JSONObject}
 */
PanicBuyService.getCurrentUpPanicBuys=function(merchantId,columnId,from,number,brandId,productColumnId,isShowPhone,recommend){
    var searchArgs={};
    searchArgs.type="PANICBUY";
    var queryArgs=PanicBuyService.getCurrentQueryArgs();
    var q = queryArgs.q;

    q.push({mode:"simple",type:'term',n:'columnId',v:columnId,op:"and"});
    q.push({mode:"simple",type:'term',n:'publishState',v:'1',op:"and"});
    if(brandId){
        q.push({mode:"simple",type:'term',n:'brandId',v:brandId+"",op:"and"});
    }
    if(productColumnId){
        var path = ""+PanicBuyApi.IsoneBaseEngine.columnService.getColumnIdPath(productColumnId+"", "rootcolumn", "/");
        q.push({mode:"simple",type:'term',n:'column_path',v:path,op:"and"});
    }
    if(merchantId!="head_merchant"){
        q.push({mode:"simple",type:'term',n:'merchantId',v:merchantId,op:"and"});
    }

    if(isShowPhone){
        q.push({mode:"simple",type:'term',n:'isShowPhone_multiValued',v:isShowPhone,op:"and"});
    }
    if(recommend){
        q.push({mode:"simple",type:'term',n:'recommend',v:recommend,op:"and"});
    }

    searchArgs.queryArgs=JSON.stringify(queryArgs);

    searchArgs.initialRecord=from;
    searchArgs.fetchCount=number;

    var sortFields=[{field:"buyTimeBegin",type:"STRING",reverse:true}];
    searchArgs.sortFields = sortFields;

    searchArgs.facetFields = ["brandId","column_facetColumn3"];
    var searchResults=SearchService.search(searchArgs);

    var ids = searchResults.searchResult.getLists();
    var listOfJSON = PanicBuyApi.IsoneModulesEngine.panicBuyService.getListDataByIds(ids,false);
    var panicBuyList = JSON.parse(listOfJSON.toString());
    var ret =  {};

    var facets=searchResults.searchResult.getFacets();
    PanicBuyService.getFacets(ret,facets);
    ret.total = 0 + searchResults.searchResult.getTotal();
    ret.products = panicBuyList;
    return ret;
}


/**
 * 获得指定抢购信息
 * @param id 抢购id
 * @return {JSONObject}
 */
PanicBuyService.getPanicBuy=function(id){
    var panicBuy=PanicBuyApi.IsoneModulesEngine.panicBuyService.getPanicBuy(id);
    if(panicBuy){
        return JSON.parse(panicBuy.toString());
    }
    return null;
}
/**
 * 更新抢购信息
 * @param jPanicBuy 抢购对象
 * @param userId 用户id
 * @param merchantId 商家id
 * @return {JSONObject}
 */
PanicBuyService.updatePanicBuy=function(panicBuy,userId, merchantId){
    var jPanicBuy=new PanicBuyApi.JSONObject(panicBuy)
    PanicBuyApi.IsoneModulesEngine.panicBuyService.updatePanicBuy(jPanicBuy,userId, merchantId);
}

/**
 * 一次取出所需的数据
 * @param ids
 * @return {JSONObject}
 */
PanicBuyService.getListDataByIds=function(ids){
    var idList = new PanicBuyApi.ArrayList();
    for(var i=0;i<ids.length; i++){
        idList.add(ids[i]);
    }
    var panicBuys=PanicBuyApi.IsoneModulesEngine.panicBuyService.getListDataByIds(idList,false);
    return JSON.parse(panicBuys.toString());
}
/**
 * 获得指定商家今日团抢购列表
 * @param merchantId 商家Id
 * @param columnId 传入col_m_Promotional_001表示获取抢购，col_m_Promotional_002表示获取团购
 * @param from  用于分页，表示从第几条开始
 * @param number  用于分页，表示获取多少条
 * @return {JSONObject}
 */
PanicBuyService.getTodayData=function(merchantId,columnId,from,number,brandId,productColumnId){
    var searchArgs={};
    searchArgs.type="PANICBUY";

    var queryArgs={};
    var q=[];
    queryArgs.mode="advanced";

    q.push({mode:"simple",type:'term',n:'columnId',v:columnId,op:"and"});

    //上架的才显示出来
    q.push({mode:"simple",type:'term',n:'publishState',v:'1',op:"and"});
    if(brandId){
        q.push({mode:"simple",type:'term',n:'brandId',v:brandId,op:"and"});
    }
    if(productColumnId){
        var path = ""+PanicBuyApi.IsoneBaseEngine.columnService.getColumnIdPath(productColumnId, "rootcolumn", "/");
        q.push({mode:"simple",type:'term',n:'column_path',v:path,op:"and"});
    }
    if(merchantId!="head_merchant"){
        q.push({mode:"simple",type:'term',n:'merchantId',v:merchantId,op:"and"});
    }
    var date=new Date;
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    month =(month<10 ? "0"+month:month);
    day = (day<10 ? "0"+day:"" + day);
    var currdateBegin = (year+"-"+month+"-"+day+" "+"00:00:00");
    var currdateEnd = (year+"-"+month+"-"+day+" "+"23:59:59");
    var buyTimeBegin={};
    buyTimeBegin.type="range";
    buyTimeBegin.mode="simple";
    buyTimeBegin.n="buyTimeBegin";
    buyTimeBegin.op="and";
    buyTimeBegin.low=currdateBegin;
    buyTimeBegin.high=currdateEnd;
    q.push(buyTimeBegin);
    queryArgs.q=q;
    searchArgs.queryArgs=JSON.stringify(queryArgs);
    searchArgs.initialRecord=from;
    searchArgs.fetchCount=number;
    var sortFields=[{field:"buyTimeBegin",type:"STRING",reverse:false}];
    searchArgs.sortFields = sortFields;

    searchArgs.facetFields = ["brandId","column_facetColumn3"];

    var searchResults=SearchService.search(searchArgs);
    var ids = searchResults.searchResult.getLists();
    var listOfJSON = PanicBuyApi.IsoneModulesEngine.panicBuyService.getListDataByIds(ids,false);


    var panicBuyList = JSON.parse(listOfJSON.toString());
    var ret =  {};
    var facets=searchResults.searchResult.getFacets();
    PanicBuyService.getFacets(ret,facets);
    ret.total = 0 + listOfJSON.size();
    ret.products = panicBuyList;
    return ret;
};


/**
 * @private
 * @param list
 * @returns {string}
 */
PanicBuyService.getJSONFormList=function(list){
    if(list&&list.size()>0){
        var result=new PanicBuyApi.JSONArray();
        for(var i=0;i<list.size();i++){
            jObject=new PanicBuyApi.JSONObject();
            jObject.put("name",list.get(i).name);
            jObject.put("value",list.get(i).value);
            result.put(jObject);
        }
        return result.toString();
    }else{
        return "[]";
    }

};
/**
 * 获得指定商家明天团抢购列表
 * @param merchantId 商家Id
 * @param columnId 传入col_m_Promotional_001表示获取抢购，col_m_Promotional_002表示获取团购
 * @param from  用于分页，表示从第几条开始
 * @param number  用于分页，表示获取多少条
 * @return {JSONObject}
 */
PanicBuyService.getTomorrowData=function(merchantId,columnId,from,number){
    var searchArgs={};
    if(columnId=="col_m_Promotional_001"){
        searchArgs.type="PANICBUY";
    }else if(columnId=="col_m_Promotional_002"){
        searchArgs.searchType="GROUPON";
    }
    var queryArgs={};
    var q=[];
    queryArgs.mode="advanced";

    q.push({mode:"simple",type:'term',n:'columnId',v:columnId,op:"and"});
    //上架的才显示出来
    q.push({mode:"simple",type:'term',n:'publishState',v:'1',op:"and"});
    if(merchantId!="head_merchant"){
        q.push({mode:"simple",type:'term',n:'merchantId',v:merchantId,op:"and"});
    }
     var date=(new Date()).getTime();
     date=date+24*60*60*1000;
    date=new Date(date);
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    month =(month<10 ? "0"+month:month);
    day = (day<10 ? "0"+day:"" + day);
    var currdateBegin = (year+"-"+month+"-"+day+" "+"00:00:00");
    var currdateEnd = (year+"-"+month+"-"+day+" "+"23:59:59");
    var buyTimeBegin={};
    buyTimeBegin.type="range";
    buyTimeBegin.mode="simple";
    buyTimeBegin.n="buyTimeBegin";
    buyTimeBegin.op="and";
    buyTimeBegin.low=currdateBegin;
    buyTimeBegin.high=currdateEnd;
    q.push(buyTimeBegin);
    queryArgs.q=q;
    searchArgs.queryArgs=JSON.stringify(queryArgs);
    searchArgs.initialRecord=from;
    searchArgs.fetchCount=number;
    var sortFields=[{field:"buyTimeBegin",type:"STRING",reverse:false}];
    searchArgs.sortFields = sortFields;
    var searchResults=SearchService.search(searchArgs);
    var ids = searchResults.searchResult.getLists();
    var total=searchResults.searchResult.getTotal();
    var listOfJSON = PanicBuyApi.IsoneModulesEngine.panicBuyService.getListDataByIds(ids,false);
    var panicBuyList =  JSON.parse(listOfJSON.toString());
    var ret =  {};
    ret.total = total;
    ret.products = panicBuyList;
    return ret;
};
/**
 * 获得指定商家今日以后团抢购列表
 * @param merchantId 商家Id
 * @param columnId 传入col_m_Promotional_001表示获取抢购，col_m_Promotional_002表示获取团购
 * @param from  用于分页，表示从第几条开始
 * @param number  用于分页，表示获取多少条
 * @return {JSONObject}
 */
PanicBuyService.getAfterTodayData=function(merchantId,columnId,from,number){
    var searchArgs={};
    if(columnId=="col_m_Promotional_001"){
        searchArgs.type="PANICBUY";
    }else if(columnId=="col_m_Promotional_002"){
        searchArgs.searchType="GROUPON";
    }
    var queryArgs={};
    var q=[];
    queryArgs.mode="advanced";

    q.push({mode:"simple",type:'term',n:'columnId',v:columnId,op:"and"});
    //上架的才显示出来
    q.push({mode:"simple",type:'term',n:'publishState',v:'1',op:"and"});
    if(merchantId!="head_merchant"){
        q.push({mode:"simple",type:'term',n:'merchantId',v:merchantId,op:"and"});
    }
    var date=new Date;
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate()+1;
    month =(month<10 ? "0"+month:month);
    day = (day<10 ? "0"+day:"" + day);
    var currdateBegin = (year+"-"+month+"-"+day+" "+"00:00:00");
    var buyTimeBegin={};
    buyTimeBegin.type="range";
    buyTimeBegin.mode="simple";
    buyTimeBegin.n="buyTimeBegin";
    buyTimeBegin.op="and";
    buyTimeBegin.low=currdateBegin;
    q.push(buyTimeBegin);
    queryArgs.q=q;
    searchArgs.queryArgs=JSON.stringify(queryArgs);
    searchArgs.initialRecord=from;
    searchArgs.fetchCount=number;
    var sortFields=[{field:"buyTimeBegin",type:"STRING",reverse:false}];
    searchArgs.sortFields = sortFields;
    var searchResults=SearchService.search(searchArgs);
    var ids = searchResults.searchResult.getLists();
    var total=searchResults.searchResult.getTotal();
    var listOfJSON = PanicBuyApi.IsoneModulesEngine.panicBuyService.getListDataByIds(ids,false);
    var panicBuyList =  JSON.parse(listOfJSON.toString());
    var ret =  {};
    ret.total = total;
    ret.products = panicBuyList;
    return ret;
};


/**
 * @private
 * @param panicbuy
 * @param userId
 * @param merchantId
 * @param amount
 * @param context
 * @param policyType
 * @returns {*}
 */
PanicBuyService.getPriceValueList=function(panicbuy,userId, merchantId,amount,context,policyType){
    var jPanicbuy=new PanicBuyApi.JSONObject(JSON.stringify(panicbuy));
    var jctx = new PanicBuyApi.JSONObject(context);
    var mapcxt=jctx.getObjectMap();
    var listOfJSON = PanicBuyApi.PanicBuyPricePolicyHelper.getPriceValueList(jPanicbuy,userId, merchantId,amount,mapcxt,policyType);
    var priceValueList =  JSON.parse(listOfJSON.toString());
    return  priceValueList;
};


/**
 * 获得商品市场价
 * @param product 商品对象
 * @returns {*}
 */
PanicBuyService.getMarketPrice = function(product){
    var prices = product.priceValueList;
    if(!prices){
        return null;

    }
    //在多个prices中找到我们想要的
    for(var i =0 ; i < prices.length; i++){
        var p = prices[i];
        if(p.entityId == 'entity_marketPrice' && p.moneyTypeId=='moneytype_RMB'){
            return p.unitPrice/100;
        }
    }
    return null;
};
/**
 * 获取可卖数
 * @param merchantId 商家Id
 * @param panicbuyId 抢购商品Id
 * @param skuId      商品skuId
 * @returns {long}
 */
PanicBuyService.getSellCount =function(merchantId, panicbuyId, skuId){
    var sellCount=PanicBuyApi.IsoneModulesEngine.sellCountService.getSellCount(merchantId, panicbuyId, skuId,"panicbuyCount");
    return sellCount;
};
/**
 * 获取商品价格列表
 * @param productId
 * @param userId
 * @param merchantId
 * @param amount
 * @param context  价格规则
 * @param policyType
 * @returns {*}
 */
PanicBuyService.getProductPriceValueList=function(productId, userId,merchantId,amount,context,policyType){
    var jctx = new PanicBuyApi.JSONObject(context);
    var mapcxt=jctx.getObjectMap();
    var jlist=PanicBuyApi.PricePolicyHelper.getPriceValueList(productId, userId,merchantId,amount,mapcxt,policyType);
    if(!jlist){
        return null;
    }
    return JSON.parse(jlist.toString());
};

PanicBuyService.getPanicBuysEx = function (merchantId, productId, skuId, from, number) {
    var searchArgs = {};
    searchArgs.type = "PANICBUY";

    var queryArgs = {};
    var q = [];
    queryArgs.mode = "advanced";
    if (merchantId != "head_merchant") {
        q.push({mode: "simple", type: 'term', n: 'merchantId', v: merchantId, op: "and"});
    }

    if (productId) {
        q.push({mode: "simple", type: 'term', n: 'productId', v: productId, op: "and"});
    }
    if (skuId) {
        q.push({mode: "simple", type: 'term', n: 'skuId', v: skuId, op: "and"});
    }
    queryArgs.q = q;
    searchArgs.queryArgs = JSON.stringify(queryArgs);
    searchArgs.initialRecord = from;
    searchArgs.fetchCount = number;
    var sortFields = [{field: "buyTimeBegin", type: "STRING", reverse: false}];
    searchArgs.sortFields = sortFields;
    var searchResults = SearchService.search(searchArgs);
    var ids = searchResults.searchResult.getLists();
    var total = searchResults.searchResult.getTotal();
    var listOfJSON = PanicBuyApi.IsoneModulesEngine.panicBuyService.getListDataByIds(ids, false);
    var panicBuyList = JSON.parse(listOfJSON.toString());
    var ret = {};
    ret.total = total;
    ret.products = panicBuyList;
    return ret;
};

