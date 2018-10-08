$(document).ready(function () {
    new $.IsonePagination(".pagination");
    $("input.date-input").datetimepicker({
        showSecond: true,
        timeFormat: 'HH:mm:ss',
        stepHour: 1,
        stepMinute: 1,
        stepSecond: 1,
        dateFormat: "yy-mm-dd", maxDate: new Date()
    });
    $("#buyer").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/OurHome/modules/orderfinancial/loadBuyer.jsp",
                dataType: "json",
                data: {
                    merchantId: $.urlParam("merchantId"),
                    columnId: $.query.get('columnId'),
                    query: request.term
                },
                success: function (data) {
                    response($.map(data.records, function (item) {
                        return {
                            label: item.loginId + (item.realName ? "(" + item.realName + ")" : ""),
                            value: item.loginId + (item.realName ? "(" + item.realName + ")" : ""),
                            id: item.id
                        }
                    }));
                }
            });
        },
        minLength: 2,

        select: function (event, ui) {
            $('#buyerId').val(ui.item.id);
        }
    });

    $("#seller").bind("keyDown", $.keyDown).autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/OurHome/modules/orderfinancial/loadMerchant.jsp",
                dataType: "json",
                data: {
                    merchantId: $.urlParam("merchantId"),
                    columnId: $.urlParam("columnId"),
                    query: request.term
                },
                success: function (data) {
                    response($.map(data.records, function (item) {
                        return {
                            label: item.name_cn,
                            value: item.name_cn,
                            settlementServiceMode: item.settlementServiceMode,
                            id: item.id
                        }
                    }));
                }
            });
        },
        minLength: 1,
        select: function (event, ui) {
            $('#sellerId').val(ui.item.id);
            $('#settlementServiceMode').val(ui.item.settlementServiceMode);
        }
    });

    $("#createFinancialSettlements").bind("click", function (event) {

        var beginPayDate = $("#beginPayDate").val();
        var endPayDate = $("#endPayDate").val();
        var sellerId = $("#sellerId").val();
        var seller = $("#seller").val();
        var settlementServiceMode = $('#settlementServiceMode').val() ? $('#settlementServiceMode').val() : "";
        var settlementServiceVal;
        if (!beginPayDate || !endPayDate) {
            alert("请完善支付开始和结束时间,以此区间作为结算单的结算周期!");
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        if (!sellerId || (sellerId && sellerId == '-1')) {
            alert("请选择需结算的卖家!");
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        var feeRate = $.feeRate(settlementServiceMode);
        if (feeRate.msg) {
            alert(feeRate.msg);
            return;
        }
        var settlementServiceVal = feeRate.value ? feeRate.value : "";
        var postData = {
            merchantId: $.urlParam("merchantId"),
            sellerId: sellerId,
            columnId: $.urlParam("columnId"),
            beginPayDate: beginPayDate,
            endPayDate: endPayDate,
            settlementServiceMode: settlementServiceMode,
            settlementServiceVal: settlementServiceVal
        };
        var result = $.ajax({
            url: "CreateFinancialSettlements.jsp",
            data: postData,
            async: false,
            cache: false,
            type: "post",
            dataType: "text"
        }).responseText;
        try {
            if (eval(result))
                alert("数据处理成功!");
        } catch (err) {
            alert("数据处理失败:" + result)
        }
        event.preventDefault();
        event.stopPropagation();
    });

    $("#seller").blur(function (event) {
        if (!$(this).val()) {
            $("#sellerId").val("");
        }
    });



});



(function ($) {
    $.keyDown = function (event) {
        if ((event.keyCode === $.ui.keyCode.TAB || event.keyCode === $.ui.keyCode.SPACE) && $(this).data("autocomplete").menu.active) {
            event.preventDefault();
        }
    }

    $.urlParam = function (name) {
        var regexp = new RegExp('[\?&]' + name + '=([^&#]*)');
        var results = regexp.exec(window.location.href);
        if (results == null) {
            return null;
        }
        else {
            return results[1] || "";
        }
    }

    $.feeRate = function (settlementServiceMode) {
        var value, result = {};
        if (settlementServiceMode && settlementServiceMode == "isFeeRate") {
            value = prompt("请输入订单服务费率(%)");
            if (!value) {
                result.msg = "请输入订单服务费率!";
                return result;
            }
            if (isNaN(value)) {
                result.msg = "服务费率必须为数字!";
                return result;
            }
        } else {
            value = "0";
        }

        result.value = value;
        return result;
    }

})(jQuery);