//#import doT.min.js
//#import pigeon.js
//#import Util.js

var template = $.getProgram(appMd5,"pages/common/include_head.jsxp");
var pageData = {};
var pageFn = doT.template(template);
out.print(pageFn(pageData));
