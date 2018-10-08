//#import Util.js
//#import doT.min.js

(function () {
    var template = $.getProgram(appMd5, "pages/registerSuccess.html");
    var pageFn = doT.template(template);
    out.print(pageFn());
})()