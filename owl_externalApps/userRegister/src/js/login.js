$(function(){
    $('#username').blur(checkName)
    $('#password').blur(checkPwd)
    $("#submit_btn").click(function(){
        if(checkName() && checkPwd())login();
    })

})
function login(){
    var username = $.trim($("#username").val());
    var password = $.trim($("#password").val());
    $.post("../handlers/loginHandler.jsx",{lk:username,pa:password},function(ret){
        if(ret.state == 'ok'){
            location.href = "/usercenter/home.jsx"
        }else {
            $('#error_hint').css('display','block')
            $('#error_hint').html("<em class=\"ico-error\"></em>"+ret.errorCode);
        }
    },'json');
}

function checkName() {
    if($('#username').val().length==0){
        $('#error_hint').css('display','block')
        $('#error_hint').html("<em class=\"ico-error\"></em>请输入用户名或手机号");
        return false;
    }else{
        $('#error_hint').css('display','none')
        $('#error_hint').html("");
        return true;
    }
}
function checkPwd() {
    if($('#password').val().length==0){
        $('#error_hint').css('display','block')
        $('#error_hint').html("<em class=\"ico-error\"></em>请输入密码");
        return false;
    }else{
        $('#error_hint').css('display','none')
        $('#error_hint').html("");
        return true;
    }
}

