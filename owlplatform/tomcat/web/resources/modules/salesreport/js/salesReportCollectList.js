jQuery(document).ready(function () {
    jQuery("#hrefReport li").children("a").bind("click", function () {
        var tag = $(this).attr("tag");
        var $form = $(this).parents().siblings("form");
        $form.attr("action", tag + ".jsp");
        $form.submit();
    });

    var tagVal = "", attr = "";
    $("#exportReport a").bind("click", function (e) {
        tagVal = ($(this).attr("tag"));
        attr = ($(this).attr("attr"));
        if (!jQuery.isEmptyObject(attr)) {
            $("#selectDateDiv").show();
        } else {
            $("#selectDateDiv").hide();
        }
        $(".modal-header h3").html($(this).html().replace("导出", ""));
    });

    $('#upload_file_smt').button('reset');
    $("#upload_file_smt").bind("click", function () {
        $(this).button('loading');
        var reqJSP = "";
        if (tagVal != null) {
            reqJSP = tagVal.replace(tagVal.split("_")[1], tagVal.split("_")[1] + ".jsp");
        }
        var export_fileName = $("#export_fileName").val();
        var beginDate = $("#beginDate").val();
        var endDate = $("#endDate").val();
        var beginPayDate = $("#beginPayDate").val();
        var endPayDate = $("#endPayDate").val();
        var selectDate = $("#selectDate").val();
        var orderShippingBeginDate = $("#orderShippingBeginDate").val();
        var orderShippingEndDate = $("#orderShippingEndDate").val();
        var sellerId = $("#sellerId").val();
        var seller = $("#seller").val();
        if ((attr !== "undefined" && attr !== undefined && attr !== null && attr !== "") && (selectDate === null || selectDate === "")) {
            alert("请选择销售时间!");
            $('#upload_file_smt').button('reset');
            return;
        }
        sellerId = (!sellerId || sellerId == "-1") ? "" : sellerId;
        seller = !seller ? "" : seller;
        var postData = {
            export_fileName: export_fileName,
            merchantId: $.urlParam("merchantId"),
            sellerId: sellerId,
            seller: seller,
            payInterfaceId: $.urlParam("payInterfaceId"),
            columnId: $.urlParam("columnId"),
            orderCreateBeginDate: beginDate,
            orderCreateEndDate: endDate,
            beginPayDate: beginPayDate,
            endPayDate: endPayDate,
            selectDate: selectDate,
            orderShippingBeginDate: orderShippingBeginDate,
            orderShippingEndDate: orderShippingEndDate
        };

        $.post(reqJSP, postData, function (data) {
            if (data.state == "ok") {
                alert(data.msg + "　您可以在【导出历史】中查看并下载。");
            } else {
                alert(data.msg);
            }
            $('#upload_file_smt').button('reset');
        }, "json");
    });

    $("#excelListHistory").bind("click", function () {
        tagVal = tagVal.indexOf("handler") > -1 ? tagVal.replace("handler", "xls") : tagVal;
        $.ajax({
                url: "load_export_histories.jsp",
                type: "post",
                data: {
                    t: tagVal,
                    merchantId: $.urlParam("merchantId"),
                    columnId: $.urlParam("columnId")
                },
                success: function (data) {
                    var divShow = $("#excelListHistoryDiv");
                    divShow.html("");
                    divShow.append(data);
                }
            }
        );
    });

});