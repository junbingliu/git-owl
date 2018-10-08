(function ($) {
    $.validateRuleBasic = function(){
        var $validateError = $(".validateError");
        var $name = $("#name");
        var $priority = $("#priority");
        var $beginDate = $("#beginDate");
        var $beginTime = $("#beginTime");
        var $endDate = $("#endDate");
        var $endTime = $("#endTime");
        $name.parent().parent().removeClass("error1");
        $beginDate.parent().parent().removeClass("error1");
        $validateError.hide();

        var errorField = [];
        var errorTips = [];
        if ($.trim($name.val()).length == 0) {
            errorField.push("name");
            errorTips.push("名称不能为空");
        }

        var beginDateValue = $beginDate.val();
        var beginTimeValue = $beginTime.val();
        var endDateValue = $endDate.val();
        var endTimeValue = $endTime.val();
        //验证生效起始时间
        checkValidDateTime(errorField, errorTips, beginDateValue, beginTimeValue, endDateValue, endTimeValue);

        var priorityValue = $priority.val();
        if ($.trim(priorityValue).length == 0) {
            errorField.push("priority");
            errorTips.push("优先级不能为空");
        }

        var priorityReg = /^(-?\d+)(\d+)?$/;
        if(!priorityReg.test(priorityValue)){
            errorField.push("priority");
            errorTips.push("优先级必须为非小数的数字");
        }

        if (errorField.length > 0) {
            var s = "";
            for (var i = 0; i < errorTips.length; i++) {
                if (s != "") {
                    s += "<br>";
                }
                s += (i + 1) + ". " + errorTips[i];
                var fieldName = errorField[i];
                $("#"+fieldName).parent().parent().addClass("error1");
            }
            var $showErrorTips = $(".errorTips", $validateError);
            $showErrorTips.html(s);
            $validateError.show();
            $('html, body').scrollTop(0);

            return false;
        }
        return true;
    };

    $.getRuleBasic = function () {
        var name = $("#name").val();
        var tips = $("#tips").val();
        var recommend = $("#recommend").val();
        var beginDate = $("#beginDate").val();
        var beginTime = $("#beginTime").val();
        var endDate = $("#endDate").val();
        var endTime = $("#endTime").val();
        var priority = $("#priority").val();
        var description = $("#description").val();
        var enabled = $("[name='isEnabled']:checked").val();
        var scopes = [];
        $("input[name='scope']").each(function() {
            var $value = $(this);
            if ($value.attr("checked") == "checked") {
                var scope = {id:$value.val(),name:$value.attr('valueName')};
                scopes.push(scope);
            }
        });

        var beginDateTime = beginDate + " " + beginTime;
        var endDateTime = endDate + " " + endTime;

        beginDate = new Date(Date.parse(beginDateTime.replace(/-/g, '/')));
        endDate = new Date(Date.parse(endDateTime.replace(/-/g, '/')));

        return {
            name: name,
            beginDate: beginDate,
            endDate: endDate,
            priority: priority,
            description: description,
            enabled: enabled,
            tips: tips,
            recommend: recommend,
            scope: scopes
        };
    };

    $.showRuleHead = function(rule){
        $("#name").val(rule.name);
        $("#tips").val(rule.tips);
        $("#recommend").val(rule.recommend);
        var beginDate = new Date();
        beginDate.setTime(rule.beginDate);
        $("#beginDate").val(dateFormat(beginDate, "yyyy-mm-dd"));
        $("#beginTime").val(dateFormat(beginDate, "HH:MM:ss"));
        var endDate = new Date();
        endDate.setTime(rule.endDate);
        $("#endDate").val(dateFormat(endDate, "yyyy-mm-dd"));
        $("#endTime").val(dateFormat(endDate, "HH:MM:ss"));

        $("#priority").val(rule.priority);
        $("#description").val(rule.description);
        if(rule.enabled){
            $("[name='isEnabled'][value='false']").removeAttr("checked");
            $("[name='isEnabled'][value='true']").attr("checked",true);
        }
        else{
            $("[name='isEnabled'][value='true']").removeAttr("checked");
            $("[name='isEnabled'][value='false']").attr("checked",true);
        }
        var scopes = rule.scope;
        if (scopes) {
            $.each(scopes, function (index, value) {
                $("#scope_" + value.id).attr("checked", "checked");
            });
        }
    }
})(jQuery);


function checkValidDateTime(errorField, errorTips, beginDateValue, beginTimeValue, endDateValue, endTimeValue) {
    var beginDateTimeOK = true;
    var endDateTimeOK = true;
    var shortDateReg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
    var shortTimeReg = /^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/;

    var matchBeginDate = beginDateValue.match(shortDateReg);
    var matchBeginTime = beginTimeValue.match(shortTimeReg);
    var matchEndDate = endDateValue.match(shortDateReg);
    var matchEndTime = endTimeValue.match(shortTimeReg);

    var errorMsg = "";
    if (matchBeginDate == null || matchBeginDate[1] < 1970 || matchBeginDate[3] > 12 || matchBeginDate[4] > 31) {
        beginDateTimeOK = false;
        errorMsg += "生效开始日期格式不能为空，且格式必须为：2008-08-08";
    }

    if (matchBeginTime == null || matchBeginTime[1] > 24 || matchBeginTime[3] > 60 || matchBeginTime[4] > 60) {
        beginDateTimeOK = false;
        if(errorMsg != ""){
            errorMsg += "<br>&nbsp;&nbsp;&nbsp;&nbsp;";
        }
        errorMsg += "生效开始时间格式不能为空，且格式必须为：10:30:00";
    }

    if (matchEndDate == null || matchEndDate[1] < 1970 || matchEndDate[3] > 12 || matchEndDate[4] > 31) {
        endDateTimeOK = false;
        if(errorMsg != ""){
            errorMsg += "<br>&nbsp;&nbsp;&nbsp;&nbsp;";
        }
        errorMsg += "生效结束日期格式不能为空，且格式必须为：2008-08-08";
    }

    if (matchEndTime == null || matchEndTime[1] > 24 || matchEndTime[3] > 60 || matchEndTime[4] > 60) {
        endDateTimeOK = false;
        if(errorMsg != ""){
            errorMsg += "<br>&nbsp;&nbsp;&nbsp;&nbsp;";
        }
        errorMsg += "生效结束时间格式不能为空，且格式必须为：10:30:00";
    }

    if (!beginDateTimeOK || !endDateTimeOK) {
        errorField.push("beginDate");     //多个field只要设置其中一个就好
        errorTips.push(errorMsg);
    }else{
        var beginDateTimeValue = beginDateValue + " " + beginTimeValue;
        var endDateTimeValue = endDateValue + " " + endTimeValue;
        var beginDate = new Date(Date.parse(beginDateTimeValue.replace(/-/g, '/')));
        var endDate = new Date(Date.parse(endDateTimeValue.replace(/-/g, '/')));
        if (beginDate.getTime() > endDate.getTime()) {
            errorField.push("beginDate");
            errorTips.push("生效开始时间不能大于生效结束时间");
        }
    }
}
