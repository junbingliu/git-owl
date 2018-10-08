//#import Util.js
//#import session.js
//#import $owl_u:services/modelService.jsx


(function () {
    var ret = {
        code:'1',
        msg:''
    }

    //校验滑块位移是否正确-------begin
    var isCheck = SessionService.getSessionValue("JigsawValidateUtilCheckMove", request);
    if(!isCheck||isCheck!="true"){
        ret.msg = "未通过图片验证码验证";
        out.print(JSON.stringify(ret));
        return;
    }
    //校验滑块位移是否正确-------end

    var loginKey = $.params["lk"];

    if(!loginKey){
        ret.msg = "用户名或手机号码为空";
        out.print(JSON.stringify(ret));
        return;
    }

    var user =  owl_uService.getUniqueObj("mobile",loginKey);
    if (!user || user=='') {
        ret.msg = "用户不存在";
        out.print(JSON.stringify(ret));
        return;
    }

    var identityObj={
        lastTime:new Date().getTime(),
        isCheck:"true",
        mobile:loginKey
    }

    SessionService.addSessionValue("checkIdentityToResetPwd", JSON.stringify(identityObj), request, response);

    ret.code='0';
    ret.msg="ok"
    out.print(JSON.stringify(ret));
})();

