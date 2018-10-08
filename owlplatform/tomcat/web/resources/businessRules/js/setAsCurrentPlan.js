(function ($) {
    $.validatePlanEffectiveTime = function () {
        var $validateError = $(".validateError");
        var $when = $("#when");
        $when.parent().parent().removeClass("error1");
        $validateError.hide();

        var errorField = [];
        var errorTips = [];

        var whenOK = true;
        var whenValue = $when.val();
        var shortDateReg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;//todo:这些正则表达式应该可以验证更严谨一点
        var longDateReg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;

        if (whenValue.length == 10) {
            if (!shortDateReg.test(whenValue)) {
                whenOK = false;
            }
        } else {
            if (!longDateReg.test(whenValue)) {
                whenOK = false;
            }
        }

        if (!whenOK) {
            $when.parent().parent().addClass("error1");
            $validateError.show();
            return false;
        }
        return true;
    }
})(jQuery);

$(document).ready(function () {
    $("#backToPlanListBtn").click(function () {
        parent.$.colorbox.close();
    });

    $("#defaultSetBtn").click(function () {
        var postData = {
            when:"now",
            planId:planId,
            columnId:columnId,
            merchantId:merchantId
        };
        $.post("setAsCurrentPlanOk.jsp", postData, function (data) {
            if (data.state == 'ok') {
                alert("成功设置当前方案");
                parent.$.colorbox.close();
            }
            else {
                alert(data.msg);
            }
        }, "json");
    });

    $("#planTimeSetBtn").click(function () {
        var validateResult = $.validatePlanEffectiveTime();
        if (!validateResult) {
            return;
        }

        var when = $("#when").val();
        var postData = {
            when:when,
            planId:planId,
            columnId:columnId,
            merchantId:merchantId
        };
        $.post("setAsCurrentPlanOk.jsp", postData, function (data) {
            if (data.state == 'ok') {
                alert("成功设置当前方案");
                parent.$.colorbox.close();
            }
            else {
                alert(data.msg);
            }
        }, "json");
    });

});
