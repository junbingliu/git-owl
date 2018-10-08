//#import Util.js
//#import login.js
//#import sysArgument.js
//#import session.js
//#import user.js
//#import DateUtil.js
//#import NoticeTrigger.js
//#import encryptUtil.js
//#import JigsawValidateUtil.js

(function () {

    var ret = {
        code:"",
        msg:""
    };
    var nowTime = new Date().getTime();

    var moveX = $.params["mx"];
    var boxWidth = $.params["iw"];
    if (!moveX || !boxWidth) {
        ret.code = "202";
        ret.msg = "参数错误";
        out.print(JSON.stringify(ret));
        return;
    }
    moveX = Number(moveX);
    boxWidth = Number(boxWidth);

    var realX = "";
    var imageWidth = "";
    var jigsawSessionValue = SessionService.getSessionValue("jigsawSessionValue", request);
    SessionService.removeSessionValue('jigsawSessionValue');
    if (jigsawSessionValue) {
        var jsv = jigsawSessionValue.split("|");
        realX = jsv[0];
        imageWidth = jsv[1];
    }
    if (!realX || !imageWidth) {
        ret.code = '203';
        ret.msg = '参数非法';
        out.print(JSON.stringify(ret));
        return;
    }
    var isSuccess = JigsawValidateUtil.checkMove(Number(realX), Number(imageWidth), Number(moveX), Number(boxWidth));
    if (!isSuccess) {
        SessionService.addSessionValue("JigsawValidateUtilCheckMove", "false", request, response);
        ret.code = '204';
        ret.msg = '参数非法';
        out.print(JSON.stringify(ret));
        return;
    }
    ret.code='S0A00000';
    ret.msg='ok';
    SessionService.addSessionValue("JigsawValidateUtilCheckMove", "true", request, response);
    out.print(JSON.stringify(ret));
})();
