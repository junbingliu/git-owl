//#import Util.js
//#import base64.js
//#import HttpUtil.js


var elasticSearchUrl = $.getEnv( "elasticSearchUrl" );

var headers = { "Content-Type": "application/json;charset=utf-8" };
var elasticSearchUser = $.getEnv("elasticSearchUser");
var elasticSearchPass = $.getEnv("elasticSearchPass");
if(elasticSearchUser && elasticSearchPass){
    var auth =Base64.encode(elasticSearchUser + ":" + elasticSearchPass);
    var basicAuth = "Basic " + auth;
    headers["Authorization"] = basicAuth;
}

var indexName = '@projectCode_v0';
var searchUrl = elasticSearchUrl+"/" + indexName;

var createIndex =  $.getProgram(appMd5, "init/indexConfigs/createIndex.json");

var s = HttpUtils.putRaw( searchUrl, createIndex, headers);
var result = JSON.parse(s);

$.log(s);
