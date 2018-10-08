/**
 * 辅助工具方法，腾讯信鸽推送的接口
 * @namespace
 */
var xgPushApi = {};
xgPushApi = new JavaImporter(
    Packages.java.util.ArrayList,
    Packages.java.util.HashMap,
    Packages.java.util.List,
    Packages.java.util.Map,
    Packages.org.json.JSONObject,
    Packages.com.tencent.xinge.ClickAction,
    Packages.com.tencent.xinge.Message,
    Packages.com.tencent.xinge.MessageIOS,
    Packages.com.tencent.xinge.Style,
    Packages.com.tencent.xinge.TimeInterval,
    Packages.com.tencent.xinge,
    Packages.com.tencent.xinge.TagTokenPair
);

var xgPush = {
    pushAccountAndroid : function(accessId,secretKey,title,content,account){
        xgPushApi.XingeApp.pushAccountAndroid(accessId,secretKey,title,content,account);
    },
    pushAccountIos : function(accessId,secretKey,content,account,env){
        xgPushApi.XingeApp.pushAccountIos(accessId,secretKey,content,account,env);
    },
    pushAccountBoth:function(accessId,secretKey,title,content,account,env){
        xgPushApi.XingeApp.pushAccountAndroid(accessId,secretKey,title,content,account);
        xgPushApi.XingeApp.pushAccountIos(accessId,secretKey,content,account,env);
    }
}