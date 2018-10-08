//#import Util.js
//#import user.js

(function () {
    var username = $.params.userName;
    var user = UserService.getUserByKey(username);
    if(user){
        var ret = {
            state:"err",
            msg:"用户已存在"
        }
        out.print(JSON.stringify(ret));
    }
    else{
        var ret = {
            state:"ok"
        }
        out.print(JSON.stringify(ret));
    }
})();

