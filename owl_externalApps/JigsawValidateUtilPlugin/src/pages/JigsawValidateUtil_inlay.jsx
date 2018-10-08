//#import doT.min.js
//#import Util.js

(function () {

    var template = $.getProgram(appMd5, "pages/JigsawValidateUtil_inlay.html");
    var pageFn = doT.template(template);
    out.print(pageFn());

})();