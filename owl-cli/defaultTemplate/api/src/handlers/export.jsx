//#import Util.js
//#import login.js
//#import base64.js
//#import HttpUtil.js
//#import session.js
//#import user.js
//#import $@projectCode:services/modelService.jsx
function trim(s){
  if(s){
    return s.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  }
  return ""
}

var spec = @spec;

var backendUserId = LoginService.getBackEndLoginUserId();
var user = UserService.getUser( backendUserId );
var visitType = SessionService.getSessionValue( "visitType", request );
if (visitType) {
  visitType = JSON.parse( visitType );
}

var shopId = visitType.shop;
var warehouseId = visitType.warehouse;
m=shopId;
//为了显示数据，临时加上这个判断，现在很多数据都搜索不出来
if(!m){
  m = SessionService.getSessionValue("_loginMerId",request);
}



var now = new Date().getTime();
var u = {
  id: user.id,
  realName: user.realName,
  nickName: user.nickName
}

var visitType = SessionService.getSessionValue( "visitType", request );
if (visitType) {
  visitType = JSON.parse( visitType );
}

var shopId = visitType.shop;
var warehouseId = visitType.warehouse;


//判断是subplatform,还是shop,还是platform
var params = JSON.parse($body);
var searchArgs = params.searchArgs;
var keyword = searchArgs.keyword;
var pageSize = params.pageSize;
var exportKey = params.exportKey;

var env = {
  now: new Date().getTime(),
  loginId: backendUserId,
  loginUser: u,
  shopId:shopId,
  exportKey:exportKey,
  warehouseId:warehouseId
}


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
      term[k+".keyword"] = trim('' + v)
      filters.push({term:term})
    }

  }
  return filters;
}

var filters = getFilters();

if(m!=='0'){
    filters = filters.concat([
        {"term": { "_m.keyword": m }},
        {"term":{"_t":spec["_t"]}}
    ]);
}
else{
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
  "from" : 0, "size" : 1,
  sort:[{_createTime:{order:"desc"}}]
}


var taskInfoId = @projectCodeService.addExportTask(query,env);

var ret = {
  state:'ok',
  taskInfoId : taskInfoId
}

out.print(JSON.stringify(ret));





