$(function(){
    clickable();
    $('#pwd1').blur(checkPwd)
    $('#pwd2').blur(checkPwd2)
    $('#mobilePhone').blur(checkPhone)
    $('#mobileValidateCode').blur(checkCode)
    $("#submit").click(function(){
        if(checkPhone()&& checkCode()&& checkPwd()&& checkPwd2())gotoNext();
    })

    var buttonState = "clickable";

    $("#sendCode").click(function () {
        if (checkPhone() && buttonState=='clickable')sendCode(buttonState);
    })


})



function sendCode(buttonState) {
    $.post('../../handlers/forgetPassword/getCaptcha.jsx',{p:$.trim($("#mobilePhone").val())},function (ret) {
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

function clickable() {
    $("#sendCode").css('background-color','#377ffd');
    $("#sendCode").css('color','#fff');
}

function clickWait() {
    $("#sendCode").css('background-color','#eee');
    $("#sendCode").css('color','#888');
}

function gotoNext(){
    var pwd2 = $.trim($("#pwd2").val());
    var mobilePhone = $.trim($("#mobilePhone").val());
    var mobileValidateCode = $.trim($("#mobileValidateCode").val());
    $.post("../../handlers/forgetPassword/resetPasswordHandler.jsx",{pa:pwd2,p:mobilePhone ,code:mobileValidateCode},function(ret){
        if(ret.code=='0'){
            location.href = "../forgetPassword/done.jsx"
        }else {
            alert(ret.msg)
        }
    },'json');
}


function checkPwd() {
    if($('#pwd1').val().length==0){
        $('#pwd1').next("div").html("<em class=\"ico\"></em>请输入密码");
        return false
    }else if($('#pwd1').val().length>0 && $('#pwd1').val().length<6){
        $('#pwd1').next("div").html("<em class=\"ico\"></em>长度只能在6-20个字符之间");
        return false
    }else{
        $('#pwd1').next("div").html("");
        return true
    }
}
function checkPwd2() {
    if($('#pwd2').val().length==0){
        $('#pwd2').next("div").html("<em class=\"ico\"></em>请再次输入密码");
        return false
    }else if($('#pwd2').val()!=$('#pwd1').val()){
        $('#pwd2').next("div").html("<em class=\"ico\"></em>两次密码不匹配");
        return false
    }else{
        $('#pwd2').next("div").html("");
        return true
    }
}

function checkPhone() {
    if($('#mobilePhone').val().length==0){
        $('#mobilePhone').next("div").html("<em class=\"ico\"></em>请输入11位手机号码");
        return false
    }else{
        $('#mobilePhone').next("div").html("");
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
