//#import Util.js
//#import session.js
//#import file.js
//#import encryptUtil.js
//#import JigsawValidateUtil.js
//#import $JigsawValidateUtilPlugin:services/GlobalSysArgsService.jsx

(function () {

    var result = {};

        var bgImages = "";
        var jArgs = GlobalSysArgsService.getArgs();
        if (jArgs) {
            if (jArgs.jigsawBgImages) {
                bgImages = jArgs.jigsawBgImages.map(function(fileId){
                    return FileService.getInternalPath(fileId);
                });
            }
        }
        $.log(JSON.stringify(bgImages));
        var nowTime = new Date().getTime();

        var backgroundImageUrl = randomImageNumber(bgImages);
        if (!backgroundImageUrl) {
            result.code = "105";
            result.msg = "背景图参数未设置";
            out.print(JSON.stringify(result));
            return;
        }

        // var jigsawSessionValue = SessionService.getSessionValue("jigsawSessionValue", request);
        // var limitCount = 0;
        // if (jigsawSessionValue) {
        //     var jsv = jigsawSessionValue.split("|");
        //     var lastLimitTime = Number(jsv[2]);
        //     limitCount = Number(jsv[3]);
        //     if (nowTime - Number(lastLimitTime) < 1000 * 60 * 3) {
        //         //三分钟内最多5次
        //         if (limitCount >= 5) {
        //             result.code = "110";
        //             result.msg = "太频繁了，请稍后再试";
        //             out.print(JSON.stringify(result));
        //             return;
        //         }
        //     } else {
        //         //超过3分钟重置为0
        //         limitCount = 0;
        //     }
        //     limitCount++;
        // }


        var jResult;

        try{
            jResult = JigsawValidateUtil.drawImages(backgroundImageUrl);
        }catch (e) {
            result.code = "109";
            result.msg = "找不到JigsawValidateUtil的jar包";
            out.print(JSON.stringify(result));
            return;
        }
        // var jResult = JigsawValidateUtil.drawImages(backgroundImageUrl);
        if (!jResult) {
            result.code = "106";
            result.msg = "异常了，请稍后再试";
            out.print(JSON.stringify(result));
            return;
        }
        var realX = jResult.realX;
        var imageWidth = jResult.imageWidth;

        jigsawSessionValue = realX + "|" + imageWidth + "|" + nowTime + "|" + limitCount;
        SessionService.addSessionValue("jigsawSessionValue", jigsawSessionValue, request, response);

        SessionService.addSessionValue("JigsawValidateUtilCheckMove","false", request, response);

        result.code = "0";
        result.msg = "操作成功";
        result.bgFilePath = jResult.bgFilePath;
        result.mattingFilePath = jResult.mattingFilePath;
        out.print(JSON.stringify(result));


})();

function randomImageNumber(bgImages) {
    if (bgImages) {
        var max = bgImages.length;
        if (max > 0) {
            var n = parseInt(Math.random() * max);
            return bgImages[n];
        }
    }
    return "";
}

