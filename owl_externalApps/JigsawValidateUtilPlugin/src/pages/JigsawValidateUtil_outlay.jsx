//#import doT.min.js
//#import Util.js

(function () {
    var template = $.getProgram(appMd5, "pages/JigsawValidateUtil_outlay.html");
    var pageFn = doT.template(template);
    out.print(pageFn());
})();