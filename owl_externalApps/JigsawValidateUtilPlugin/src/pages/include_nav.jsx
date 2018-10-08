//#import doT.min.js
//#import Util.js

(function () {
    var template = $.getProgram(appMd5, "pages/include_nav.jsxp");
    var pageFn = doT.template(template);
    out.print(pageFn());
})();

