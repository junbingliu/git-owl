//#import Util.js
//#import login.js
//#import base64.js
//#import HttpUtil.js
//#import session.js
//#import $@projectCode:services/modelService.jsx
function trim(s){
  if(s){
    return s.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  }
  return ""
}
var spec = @spec;

var backendUserId = LoginService.getBackEndLoginUserId();

var visitType = SessionService.getSessionValue( "visitType", request );
if (visitType) {
  visitType = JSON.parse( visitType );
}

var shopId = visitType.shop;
var warehouseId = visitType.warehouse;
m = shopId;

//判断是subplatform,还是shop,还是platform
var params = JSON.parse($body);
var searchArgs = params.searchArgs;
var keyword = searchArgs.keyword;
var pageSize = params.pageSize;
var page = params.page;
if(!page){
  page = 1;
}
if(!pageSize){
  pageSize=15;
}
pageSize = Number(pageSize);
var from = page * pageSize-pageSize;

function getKeywordQuery(){
  if(keyword && trim(keyword).length>0){
    return "\"" + trim(keyword) + "\""
  }
  else{
    return "*"
  }
}

function getFilters(){
  delete searchArgs.keyword;
  var filters = [];
  for(var k in searchArgs){
    var v = searchArgs[k];
    if(typeof(v)=='object' && Array.isArray(v)){
      var range={}
      range[k] = {
        'gte':v[0],
        'lte':v[1]
      }
      filters.push({range:range});
    }
    else{
      var term = {};
      if(v){
          term[k+".keyword"] = trim('' + v)
          filters.push({term:term})
      }

    }

  }
  return filters;
}

var filters = getFilters();

if(m !== '0'){
    filters = filters.concat([
        {"term": { "_m.keyword": m }},
        {"term":{"_t":spec["_t"]}}
    ]);
}
else{
  //如果m === '0'，代表是平台
    filters = filters.concat([
        {"term":{"_t":spec["_t"]}}
    ]);
}


var query = {
  "query": {
    "bool": {
      "must": {
        "query_string": {
          "query":getKeywordQuery()
        }
      },
      "must_not": {
        "match": {
          "del": "T"
        }
      },
      "filter": filters
    }
  },
  "from" : from, "size" : pageSize,
  sort:[{_createTime:{order:"desc"}}]
}

var elasticSearchUrl = $.getEnv( "elasticSearchUrl" );

var headers = { "Content-Type": "application/json;charset=utf-8" };
var elasticSearchUser = $.getEnv("elasticSearchUser");
var elasticSearchPass = $.getEnv("elasticSearchPass");
if(elasticSearchUser && elasticSearchPass){
  var auth =Base64.encode(elasticSearchUser + ":" + elasticSearchPass);
  var basicAuth = "Basic " + auth;
  headers["Authorization"] = basicAuth;
}
var searchUrl = elasticSearchUrl+"/@projectCode/_search";

var sndTxt = JSON.stringify(query);
$.log(sndTxt);


var s = HttpUtils.postRaw( searchUrl, sndTxt, headers);
var result = JSON.parse(s);

var hits = result.hits.hits;
var total = result.hits.total;

var objs = hits.map(function(hit){return hit._source});

//这里重新从pigeon取了一次数据，做了删除的判断
// var ids = hits.map(function(hit){return hit._source.id});
// var list = @projectCodeService.getObjects(ids);
// var objs  = list.filter(function(value){
//   return value.del != "T";
// });
var ret = {
  state:'ok',
  list:objs,
  total:total
}
out.print(JSON.stringify(ret));


