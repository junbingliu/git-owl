$(document).ready(function () {
    $("#addRemarkLayer").content()
    $("#comSub").click(function(){
        var options = {
            beforeSubmit:checkComment,
            success:successCom
        };
        $("#commentform").ajaxSubmit(options);
    });
});
(function ($) {
    $.fn.content = function () {
        $(".comment_button").click(function(){
            var obj=$(this).parents("li").find(".title");
            $("#pname").html(obj.html());
            $("#objId").val(obj.attr("pid"));
            center("#addRemarkLayer");
        });
        $("#isClose").click(function(){
            $("#addRemarkLayer").hide();
        });
    }
})(jQuery);
function center(i){
    var _scrollHeight = $(document).scrollTop(),//获取当前窗口距离页面顶部高度
        _windowHeight = $(window).height(),//获取当前窗口高度
        _windowWidth = $(window).width(),//获取当前窗口宽度
        _popupHeight = $(i).height(),//获取弹出层高度
        _popupWeight = $(i).width();//获取弹出层宽度
    _posiTop = (_windowHeight - _popupHeight)/2;
    _posiTop2 = (_windowHeight - _popupHeight)/2-_scrollHeight;
    _posiLeft = (_windowWidth - _popupWeight)/2;
    $(i).css({"left": "240px","top":_posiTop + "px","display":"block","position":"fixed","z-index":"30003"});
    var isIE=!!window.ActiveXObject;
    var isIE6=isIE&&!window.XMLHttpRequest;
    if(isIE){if(isIE6){
        $(i).css({"left": _posiLeft + "px","display":"block","position":"absolute","bottom":"0"});
        $("html, body").animate({ scrollTop: 0 }, 120);
    }}

}
function chStarleve(Value) {
    for (var i = 1; i <= Value; i++) {
        $("#img"+i).attr("class","stars1");
    }
    for (var i = 0; i < 5 - Value; i++) {
        $("#img"+(5 - i)).attr("class","stars2");
    }
    $("#grade").val(Value);
}
function checkComment() {
    var theForm = document.getElementById("commentform");
    var title = theForm.title.value;

    var str = $.trim(theForm.content.value);
    var name = $.trim(theForm.account.value);
    if (str == "") {
        $("#commentErr").addClass("box_error").html("请填写评论内容！");
        return false;
    }
    if (name == "") {
        $("#commentErr").addClass("box_error").html("用户名！");
        return false;
    }
    if (str.length >300) {
        $("#commentErr").addClass("box_error").html("请限制字数在300字内！");
        return false;
    }
}
function successCom(responseText, statusText){
    if (statusText == "success") {
        var data = $.trim(responseText);
        if (data == "ok") {
            alert("评论成功， 请耐心等待管理员的审核！");
            $("#addRemarkLayer").hide();
        }
        else {
            if (data == 9) {
                $("#commentErr").addClass("box_error").html("购买过该商品的用户才能评论！");
                refreshValidateCode();
                return;
            }
            if (data == 2) {
                $("#commentErr").addClass("box_error").html("评论标题不能够为空！");
            }
            if (data == 3) {
                $("#commentErr").addClass("box_error").html("评论内容不能够为空！");
            }
            if (data == 4) {
                $("#commentErr").addClass("box_error").html("验证码错误！");
                refreshValidateCode();
            }
            if (data == 5) {
                $("#commentErr").addClass("box_error").html("填写用户名！");
                refreshValidateCode();
            }
            if (data == 1) {
                loginBlock('c',0)
            }
            if (data.length > 10) {
                $("#commentErr").addClass("box_error").html("系统繁忙请稍后重试！");
            }
        }
    }
}


