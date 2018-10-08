$(function(){
	$('#username').blur(checkName)
	$('#passwd').blur(checkPwd)
	$('#passwd2').blur(checkPwd2)
	$('#phoneNum').blur(checkPhone)
    $('#mobileValidateCode').blur(checkCode)
    $('#xieyi').blur(checkTicked)

    $("#submit_btn").click(register)

    var buttonState = "unable";

    JigsawValidateUtil.success(function () {
        buttonState="clickable";
        clickable();
    })

    $("#sendCode").click(function () {
        if (checkPhone() && buttonState=='clickable') {
            sendCode();
        }
    })

    function register(){
        if(!checkPhone()||!checkCode()||!checkName()||!checkPwd()||!checkPwd2()||!checkTicked())return
        var username = $.trim($('#username').val());
        var password = $.trim($('#passwd').val());
        var phoneNum = $.trim($('#phoneNum').val());
        var mobileValidateCode = $.trim($('#mobileValidateCode').val());
        $.post("../handlers/registerHandler.jsx",{un:username,pa:password,p:phoneNum,mc:mobileValidateCode},function(ret){
            if(ret.state == 'ok'){
                location.href = "registerSuccess.jsx"
            }else {
                alert(ret.errorCode)
            }
        },'json');
    }

    function sendCode() {
        $.post('../handlers/getRigsterCaptcha.jsx',{p:$.trim($("#phoneNum").val())},function (ret) {
            if(ret.code=="0"){
                $('#mobileValidateCode').next().next("div").html("<em class=\"ico\"></em>短信验证码发送成功");
                buttonState = "unable";
                clickWait();
                var timeOut = Number(120);
                var timer = setInterval(function () {
                    timeOut--;
                    $("#sendCode").text(timeOut + " 秒后再发送");
                    if (timeOut <= 0) {
                        clearInterval(timer);
                        $("#sendCode").text("获取验证码");
                        clickable();
                        buttonState = "clickable";
                    }
                }, 1000);
            }else{
                alert(ret.errorCode);
            }
        },'json')
    }
})

function clickable() {
    $("#sendCode").css('background-color','#377ffd');
    $("#sendCode").css('color','#fff');
}

function clickWait() {
    $("#sendCode").css('background-color','#eee');
    $("#sendCode").css('color','#888');
}

function checkUsername(){
    $.post("../handlers/checkUserName.jsx",{userName:$.trim($('#username').val())},function (ret) {
        if(ret.state=='err'){
            $('#username').next("div").html("<em class=\"ico\"></em>用户名已存在");
        }
    },'json')
}

function checkName() {
    if($('#username').val().length==0){
        $('#username').next("div").html("<em class=\"ico\"></em>请输入用户名");
        return false
    }else if($('#username').val().length>0 && $('#username').val().length<4){
        $('#username').next("div").html("<em class=\"ico\"></em>长度只能在4-20个字符之间");
        return false
    }else if($('#username').val().length>=4&& !isNaN($('#username').val())){
        $('#username').next("div").html("<em class=\"ico\"></em>用户名不能为纯数字");
        return false
    }else{
        checkUsername();
        $('#username').next("div").html("");
        return true;
    }
}

function checkTicked() {
    if(!$("#xieyi")[0].checked){
        $("#xieyi").next().next().text("请勾选协议");
        return false;
    }else {
        $("#xieyi").next().next().text("");
        return true;
    }
}
function checkPwd() {
    if($('#passwd').val().length==0){
        $('#passwd').next("div").html("<em class=\"ico\"></em>请输入密码");
        return false
    }else if($('#passwd').val().length>0 && $('#passwd').val().length<6){
        $('#passwd').next("div").html("<em class=\"ico\"></em>长度只能在6-20个字符之间");
        return false
    }else{
        $('#passwd').next("div").html("");
        return true
    }
}
function checkPwd2() {
    if($('#passwd2').val().length==0){
        $('#passwd2').next("div").html("<em class=\"ico\"></em>请再次输入密码");
        return false
    }else if($('#passwd2').val()!=$('#passwd').val()){
        $('#passwd2').next("div").html("<em class=\"ico\"></em>两次密码不匹配");
        return false
    }else{
        $('#passwd2').next("div").html("");
        return true
    }
}

function checkPhone() {
    if($('#phoneNum').val().length==0){
        $('#phoneNum').next("div").html("<em class=\"ico\"></em>请输入11位手机号码");
        return false
    }else{
        $('#phoneNum').next("div").html("");
        return true
    }
}
function checkCode() {
    if($('#mobileValidateCode').val().length==0){
        $('#mobileValidateCode').next().next("div").html("<em class=\"ico\"></em>请输入短信验证码");
        return false
    }else{
        $('#mobileValidateCode').next().next("div").html("");
        return true
    }
}

