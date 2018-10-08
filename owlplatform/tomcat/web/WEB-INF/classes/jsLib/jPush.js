//#import base64.js
//#import HttpUtil.js
var jPush = {
    sendAlert : function(appKey,secret,alias,alert){
        var push = {
            platform : "all",
            audience : {"alias":[alias]},
            notification:{
                android:{
                    "alert":alert,
                    title:"通知",
                    "builder_id":1
                },
                ios:{
                    "alert":alert,
                    sound:'default',
                    badge:"+1"
                }
            }
        }

        headers = {
            Authorization:"Basic " + Base64.encode(appKey + ":" + secret),
            "Content-Type": "application/json"
        }
        var responseString = HttpUtils.postRaw("https://api.jpush.cn/v3/push",JSON.stringify(push),headers);
        $.log(responseString + ",alias:" + alias+",alert:" + alert  );
    }
}