$(function(){
    $('#loginKey').blur(check)
    $("#nextStep").click(function(){
        if(check())gotoNext();
    })

})
function gotoNext(){
    var loginKey = $.trim($("#loginKey").val());
    $.post("../../handlers/forgetPassword/checkUser.jsx",{lk:loginKey},function(ret){
        if(ret.code=='0'){
            location.href = "../forgetPassword/reCheck.jsx"
        }else {
            $('#loginKey').next().html("<em class=\"ico\"></em>"+ret.msg);
        }
    },'json');
}

function check() {
    if($('#loginKey').val().length==0){
        $('#loginKey').next().html("<em class=\"ico\"></em>请输入用户名或手机号码");
        return false;
    }else{
        $('#loginKey').next().html("");
        return true;
    }
}


