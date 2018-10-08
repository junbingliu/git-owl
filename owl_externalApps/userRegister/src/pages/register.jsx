//#import Util.js
//#import doT.min.js
//#import login.js
//#import sysArgument.js
//#import DigestUtil.js
//#import session.js

(function () {
    var template = $.getProgram(appMd5, "pages/register.html");
    var pageFn = doT.template(template);
    out.print(pageFn());
})()