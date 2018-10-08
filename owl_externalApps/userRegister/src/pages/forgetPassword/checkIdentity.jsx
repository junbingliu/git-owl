//#import Util.js
//#import doT.min.js

(function () {
    var template = $.getProgram(appMd5, "pages/forgetPassword/checkIdentity.html");
    var pageFn = doT.template(template);
    out.print(pageFn());
})()