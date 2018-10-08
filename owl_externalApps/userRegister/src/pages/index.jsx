//#import Util.js
//#import doT.min.js
//#import login.js
//#import user.js
//#import session.js

(function () {

    var userId = LoginApi.LoginSessionUtils.getFrontendLoginUserId(request);
    if(userId){
        var template = $.getProgram(appMd5, "pages/index.html");
        var pageFn = doT.template(template);
        out.print(pageFn());
    }else{
        response.sendRedirect("login.jsx");
    }

})()