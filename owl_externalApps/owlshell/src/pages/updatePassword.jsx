//#import login.js
//#import user.js
//#import session.js
//#import Util.js
//#import DigestUtil.js

(function () {
    var passwordhash = $.params["passwordhash"];
    var ran = String.valueOf(Math.random());
    var passran = passwordhash + ran;
    var passwordsha = DigestUtil.digestString(passran, "SHA");

    var backendUserId = LoginService.getBackEndLoginUserId();
    var userObject = UserService.getUser(backendUserId);
    userObject.passwordhash = passwordsha;
    $.log("userObject.passwordhash"+userObject.passwordhash);
    $.log("userObject.passwordhash======="+JSON.stringify(userObject))
}());
