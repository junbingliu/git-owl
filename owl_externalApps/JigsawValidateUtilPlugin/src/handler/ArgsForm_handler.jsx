//#import Util.js
//#import login.js
//#import file.js
//#import base64.js
//#import $JigsawValidateUtilPlugin:services/GlobalSysArgsService.jsx

(function () {
    var result = {};
    try {
        var jFileInfos = $.uploadFiles("png,jpg", 5 * 1024 * 1024 * 10);
        $.log("===jFileInfos======"+JSON.stringify(jFileInfos))

        for (var i = 0; i < jFileInfos.length; i++) {
            if (jFileInfos[i].fieldName == 'file') {
                var imgUrl = jFileInfos[i].fileId;
            }
        }

        if(!imgUrl){
            result.code = "102";
            result.msg = "上传失败";
            out.print(JSON.stringify(result));
            return;
        }

        var jArgs = GlobalSysArgsService.getArgs();
        if (!jArgs) {
            jArgs = {};
        }

        if (!jArgs.jigsawBgImages) {
            jArgs.jigsawBgImages = [];
        }

        if(jArgs.jigsawBgImages.length>0){
            for(var i=0;i<jArgs.jigsawBgImages.length;i++){
                if(imgUrl==jArgs.jigsawBgImages[i]){
                    result.code = "103";
                    result.msg = "该图片已上传";
                    out.print(JSON.stringify(result));
                    return;
                }
            }
        }

        jArgs.jigsawBgImages.push(imgUrl);

        $.log("=======jArgs=========="+JSON.stringify(jArgs))

        GlobalSysArgsService.saveArgs(jArgs);

        result.code = "ok";
        result.msg = "保存成功";
        result.imgUrl = FileService.getFullPath(imgUrl);
        out.print(JSON.stringify(result));
    }
    catch (e) {
        result.code = "100";
        result.msg = "操作出现异常，请稍后再试";
        out.print(JSON.stringify(result));
        return;
    }
})()
