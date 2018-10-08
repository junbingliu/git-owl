//#import doT.min.js
//#import Util.js
//#import file.js
//#import $JigsawValidateUtilPlugin:services/GlobalSysArgsService.jsx

(function () {
    var jigsawBgImages = [];

    var jArgs = GlobalSysArgsService.getArgs();
    if (jArgs) {
        if (jArgs.jigsawBgImages) {
            jigsawBgImages = jArgs.jigsawBgImages.map(function(fileId){
                return FileService.getFullPath(fileId);
            });
        }
    }

    var template = $.getProgram(appMd5, "pages/home.jsxp");
    var pageData = {
        jigsawBgImages: jigsawBgImages
    };
    var pageFn = doT.template(template);
    out.print(pageFn(pageData));
})();

