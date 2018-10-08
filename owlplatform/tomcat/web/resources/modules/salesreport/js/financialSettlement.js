$(document).ready(function () {
    //自动获取长度
    var $parentDiv = $(".container-fluid .row-fluid"), url = "FinancialSettlements.jsp";
    $parentDiv.children(".span12").css("width", $(".container-fluid .span12:nth-child(2)").width());
    //初始化dropdown事件
    $('.dropdown-toggle').dropdown()

    $("#hrefReport li").children("a").bind("click", function () {
        var tag = $(this).attr("tag");
        var $form = $(this).parents().siblings("form");
        $form.attr("action", tag + ".jsp");
        $form.submit();
    });

    var $subBox = $($parentDiv.children(".span12:nth-child(2)").find("input[name='subBox']")), $checkAll = $("#checkAll");
    $checkAll.bind("click", function () {
        if (this.checked) {
            $subBox.each(function () {
                $(this)[0].checked = true;
            });
        } else {
            $subBox.removeAttr("checked");
        }

    });

    $subBox.bind("click", function () {
        var $subBoxChecked = $($parentDiv.children(".span12:nth-child(2)").find("input[name='subBox']:checked"));
        if (($subBox.length === $subBoxChecked.length)) {
            $checkAll[0].checked = true;
        } else {
            $checkAll.removeAttr("checked");
        }
    });

    $($parentDiv.children(".span12:not(:nth-child(1))").find("a")).bind("click", function (event) {
        var ids = "";
        var actionType, params, param;
        var element = event.target || event.srcElement;
        params = $(element).attr("tag");
        var excludeUrl = new RegExp("^[(Export)|(Upload)|(Calculate)]", "g");
        var regUrl = new RegExp("([^?]*)", "g");
        var paramUrl = new RegExp("([^=]*)", "g");
        var isExclude = excludeUrl.test(params);
        if (!params || isExclude) return;
        actionType = ((params.match(regUrl)) ? (params.match(regUrl)[0]) : null);
        param = ((params.match(paramUrl)) ? (params.match(paramUrl)[2]) : null);
        if (actionType === undefined || actionType === null) return;
        if (param === undefined || param === null) {
            $subBox.each(function () {
                if ($(this).is(":checked")) {
                    var checkboxVal = $(this).attr("value");
                    ids = ids.concat(checkboxVal, "-");
                }
            });
        } else {
            ids = ids.concat(param);
        }
        if (ids === undefined || ids === '' || ids.length === 0) {
            alert("请选择需通知单据");
            return;
        }
        var sellerId = $("#sellerId").val() ? $("#sellerId").val() : "";
        var postData = {
            merchantId: $.urlParam("merchantId"),
            sellerId: sellerId,
            columnId: $.urlParam("columnId"),
            ids: ids
        };

        var result = $.ajax({
            url: actionType + url,
            data: postData,
            async: false,
            cache: false,
            type: "post",
            dataType: "text"
        }).responseText;
        try {
            if (eval($.trim(result))) {
                $parentDiv.find("input:checked").removeAttr("checked");
                alert("数据处理成功!");
                window.location.reload();
            }
            else alert("数据处理失败:" + result)
        } catch (err) {
            alert("数据处理失败:" + result)
        }
    });

    var tagVal = "", attr = "", param, export_file_type;
    var reqJSPArray = new Array();
    $($parentDiv.children(".span12:nth-child(2)").find("a")).bind("click", function (e) {
        tagVal = ($(this).attr("tag"));
        if (!tagVal) return;
        $.setFsId(tagVal)
        export_file_type = $.getExportFileType(tagVal);
        attr = ($(this).attr("attr"));
        if (!jQuery.isEmptyObject(attr)) {
            $("#selectDateDiv").show();
        } else {
            $("#selectDateDiv").hide();
        }
        $(".modal-header h3").html($(this).html().replace("导出", ""));
        if (export_file_type) {
            setTimeout($.exportHistoryLoad(export_file_type), 1000);
        }
    });

    var $exportFileBtn = $('#export_file_smt'), $uploadFileBtn = $('#upload_file_smt');
    $exportFileBtn.button("reset");
    $uploadFileBtn.button("reset");
    $exportFileBtn.bind("click", function () {
        $(this).button('loading');
        var reqJSP = "", param = "", params = [];
//		var reqPattern = /_(Handler|xls)(?= ?)/i;//匹配在?前相应的关键字
        var reqPattern = /([^?]*)/g;
        var replacePattern = /xls/g;
        if (tagVal != null) {
            reqJSPArray = tagVal.match(reqPattern);
            reqJSP = reqJSPArray[0].replace(replacePattern, "handler").concat(".jsp");
            params = reqJSPArray[2].split("=");
        }
        var postParam = {
            fsId: params[1],
            merchantId: $.urlParam("merchantId"),
            columnId: $.urlParam("columnId")
        };
        var postData;
        var export_fileName = $("#export_fileName").val();
        var result = $.ajax({
            url: "GetFinancialSettlement.jsp",
            data: postParam,
            async: false,
            cache: false,
            type: "post",
            dataType: "text"
        }).responseText;
        if (result !== "null") {
            try {
                postData = jQuery.parseJSON(result);
            } catch (err) {
                alert("数据处理异常");
                $exportFileBtn.button('reset');
            }
        } else {
            alert("数据处理异常");
            $exportFileBtn.button('reset');
        }

        if ((attr !== "undefined" && attr !== undefined && attr !== null && attr !== "") && (selectDate === null || selectDate === "")) {
            alert("请选择销售时间!");
            $exportFileBtn.button('reset');
            return;
        }
        postData['export_fileName'] = export_fileName;
        postData['merchantId'] = $.urlParam("merchantId");
        postData['columnId'] = $.urlParam("columnId"),
            /*
             var postData = {
             export_fileName: export_fileName,
             merchantId: $.urlParam("merchantId"),
             sellerId: sellerId,
             seller: '${param.seller}',
             payInterfaceId: '${param.payInterfaceId}',
             columnId: $.urlParam("columnId"),
             orderCreateBeginDate: beginDate,
             orderCreateEndDate: endDate,
             beginPayDate: beginPayDate,
             endPayDate: endPayDate,
             selectDate: selectDate
             };
             */
            $.post(reqJSP, postData, function (data) {
                if (data.state == "ok") {
                    alert(data.msg + "　您可以在【导出历史】中查看并下载。");
                } else {
                    alert(data.msg);
                }
                $exportFileBtn.button('reset');
            }, "json");
    });

    $("#excelListHistory").bind("click", function () {
        if (!tagVal) return;
        var exportFileType = $.getExportFileType(tagVal);
        if (!exportFileType) return;
        $.exportHistoryLoad(exportFileType);
    });


    $uploadFileBtn.bind("click", function () {
        $(this).button('loading');

    });

    $("#uploadexcelListHistory").bind("click", function () {
        var reqPattern = /([^?]*)/g;
        if (tagVal != null) {
            reqJSPArray = tagVal.match(reqPattern);
        }
        var postData = {
            t: tagVal,
            fsId: $("input[name=fsId]").val(),
            merchantId: $.urlParam("merchantId"),
            columnId: $.urlParam("columnId")
        }
        var result = $.ajax({
            url: "load_export_histories.jsp",
            data: postData,
            async: false,
            cache: false,
            type: "post",
            dataType: "text/html"
        }).responseText;
        var divShow = $("#uploadExcelListHistoryDiv");
        divShow.html("");
        divShow.append(result);

    });

    $("#downloadExcelListHistory").bind("click", function () {
        var reqPattern = /([^?]*)/g;
        if (tagVal != null) {
            reqJSPArray = tagVal.match(reqPattern);
        }
        tagVal = reqJSPArray[0];
        tagVal = tagVal.indexOf("handler") > -1 ? tagVal.replace("handler", "xls") : tagVal;
        $.ajax({
                url: "load_export_histories.jsp",
                type: "post",
                data: {
                    t: tagVal,
                    fsId: $("input[name=fsId]").val(),
                    merchantId: $.urlParam("merchantId"),
                    columnId: $.urlParam("columnId")
                },
                success: function (data) {
                    var divShow = $("#downloadExcelListHistoryDiv");
                    divShow.html("");
                    divShow.append(data);
                }
            }
        );
    });

    $("#modifyPrice").blur(function (event) {
        setTimeout(function () {
            var previousPrice = $("#priceResult").val();
            var price = $("#modifyPrice").val();
            if (!price || isNaN(price)) return;
            var priceView = (Number(previousPrice) + Number(price)).toFixed(2);
            $("label[class='endPrice']").html(price >= 0 ? ("+" + price) : price);
            $("label[class='priceView']").html("=" + priceView);
            event.preventDefault();
            event.stopPropagation();
            return;
        }, 100);
    });

    $("#confirmPrice").bind("click", function (event) {
        var price = $("#modifyPrice").val();
        var remark = $("#remark").val() || "";
        var fsId = $("input[name=fsId]").val()
        if (!price) {
            alert("请输入需要修改的金额")
            return;
        }
        if (isNaN(price)) {
            alert("输入的金额必须为数字")
            return;
        }
        if (!remark) {
            alert("输入修改价格的备注信息")
            return;
        }
        if (confirm("你确定修改该价格?")) {
            var postData = {
                fsId: fsId,
                merchantId: $.urlParam("merchantId"),
                columnId: $.urlParam("columnId"),
                price: price,
                remark: remark
            }
            var result = $.ajax({
                url: "ModifyFinancialSettlementPrice.jsp",
                data: postData,
                async: false,
                cache: false,
                type: "post",
                dataType: "text/html"
            }, 1000).responseText;
            try {
                if (eval($.trim(result))) {
                    alert("数据处理成功!");
                    window.location.reload();
                }
            } catch (err) {
                alert("数据处理失败:" + result)
            }
        }
    });

    $("#settlement_fileName").uploadify({
        'script': "/OurHome/modules/noprivilege/UploadFinancialSettlements_xls.jsp",
        'scriptData': {
            's': $.urlParam("columnId") + '|' + $.urlParam("merchantId") + '|' + $("input[name=fsId]").val() + '|' + export_file_type,
            'action': 'uploadify'
        },
        'method': 'get',
        'uploader': '/js/jquery.uploadify-v2.1.0/uploadify.swf',
        'cancelImg': '/js/jquery.uploadify-v2.1.0/cancel.png',
        'folder': 'uploads',
        'queueID': 'settlement_fileName-queue',
        'auto': true,
        'multi': true,
        wmode: 'transparent',
        height: 23, // The height of the flash button
        width: 70, //
        'fileDesc': '<%out.print(fileDesc);%>',
        'fileExt': '<%out.print(fileExt);%>',
        'sizeLimit': 100 * 1024 * 1024,
        displayData: 'speed',
        onInit: function () {
            lastUploadedFiles = [];
        },
        onSelect: function (event, queueID, fileObj) {
            $("#settlement_fileName").uploadifySettings("scriptData", {"s": $.urlParam("columnId") + '|' + $.urlParam("merchantId") + '|' + $("input[name=fsId]").val() + '|' + export_file_type}); //动态更新配(执行此处时可获得值)
        },
        onComplete: function (event, ID, fileObj, response, data) {
            var tempUploadFile = eval('(' + response + ')');  //每个文件上传返回的信息
            var state = tempUploadFile.state;
            if (tempUploadFile.state == "ok") {
                $(".fileOnlyId").val(tempUploadFile.id);
                $(".fileId").val(tempUploadFile.fileId);
                /*$("#fileName").html(tempUploadFile.fileName);
                 lastUploadedFiles.push(tempUploadFile);*/
                alert("上传文件成功");
                /*window.location.reload();*/
            }
        },
        onAllComplete: function (event, data) {
            onUploadComplete();
        }
    });

    $("#upload_fileName").uploadify({
        'script': "/OurHome/modules/noprivilege/UploadFinancialSettlements_xls.jsp",
        'scriptData': {
            's': $.urlParam("columnId") + '|' + $.urlParam("merchantId") + '|' + $("input[name=fsId]").val(),
            'action': 'uploadify'
        },
        'method': 'get',
        'uploader': '/js/jquery.uploadify-v2.1.0/uploadify.swf',
        'cancelImg': '/js/jquery.uploadify-v2.1.0/cancel.png',
        'folder': 'uploads',
        'queueID': 'upload_fileName-queue',
        'auto': true,
        'multi': true,
        wmode: 'transparent',
        height: 23, // The height of the flash button
        width: 70, //
        'fileDesc': '<%out.print(fileDesc);%>',
        'fileExt': '<%out.print(fileExt);%>',
        'sizeLimit': 100 * 1024 * 1024,
        displayData: 'speed',
        onInit: function () {
            lastUploadedFiles = [];
        },
        onSelect: function (event, queueID, fileObj) {
            $("#upload_fileName").uploadifySettings("scriptData", {"s": $.urlParam("columnId") + '|' + $.urlParam("merchantId") + '|' + $("input[name=fsId]").val()}); //动态更新配(执行此处时可获得值)
        },
        onComplete: function (event, ID, fileObj, response, data) {
            var tempUploadFile = eval('(' + response + ')');  //每个文件上传返回的信息
            var state = tempUploadFile.state;
            if (tempUploadFile.state == "ok") {
                $("#fileOnlyId").val(tempUploadFile.id);
                $("#fileId").val(tempUploadFile.fileId);
                /*$("#fileName").html(tempUploadFile.fileName);
                 lastUploadedFiles.push(tempUploadFile);*/
                alert("上传文件成功");
                /*window.location.reload();*/
            }
        },
        onAllComplete: function (event, data) {
            onUploadComplete();
        }
    });

    /* $("#setSettlementServiceMode").bind("click", function () {
     var reqPattern = /([^?]*)/g;
     if (tagVal != null) {
     reqJSPArray = tagVal.match(reqPattern);
     }
     var postData = {
     t: tagVal,
     fsId: $("input[name=fsId]").val(),
     merchantId: $.urlParam("merchantId"),
     columnId: $.urlParam("columnId")
     }
     var result = $.ajax({
     url: "/OurHome/modules/orderfinancial/financialSettlementLoadMerchants.jsp",
     data: postData,
     async: false,
     cache: false,
     type: "post",
     dataType: "text/html"
     }).responseText;
     var divShow = $("#setSettlementServiceModePage");
     divShow.html("");
     divShow.append(result);

     });*/

    $("#setSettlementServiceMode").on("click", function () {

        var params = "merchantId=" + $.urlParam("merchantId") + "&columnId=" + $.urlParam("columnId");
        $.layer({
            type: 2,
            shadeClose: false,
            title: "设置商家佣金结算类型",
            closeBtn: [0, true],
            shade: [0.8, '#000'],
            border: [0],
            offset: ['20px', ''],
            area: ['590px', '500px'],
            iframe: {
                src: '/OurHome/modules/orderfinancial/financialSettlementLoadMerchants.jsp?' + params,
                scrolling: 'no'
            }
        });

    });


});


function onUploadComplete() {
    var relatedFiles = [];
    var size = lastUploadedFiles.length;
    for (var i = 0; i < size; i++) {
        var oriFile = lastUploadedFiles[i];
        if (oriFile != undefined) {
            var tempRelFile = getRelatedFile(oriFile);
            if (tempRelFile != null) {
                var relFile = {
                    id: tempRelFile.id,
                    fileId: tempRelFile.fileId
                }
                oriFile.relFile = relFile;
                relatedFiles.push(oriFile);
            }
        }
    }
    if (relatedFiles.length > 0) {
        var postData = {
            relatedFiles: $.toJSON(relatedFiles),
            columnId: $(".columnId").val(),
            merchantId: $(".merchantId").val()
        };
        $.post("${frontPath}/OurHome/modules/filemanager/UpdateRelatedFiles.jsp", postData, function (data) {
            if (data.state == 'ok') {

            }
            else {
                alert(data.msg);
            }
        }, "json");
    }
}


function getRelatedFile(oriFile) {
    var size = lastUploadedFiles.length;
    var oriFileName = oriFile.fileName;
    var waterMarkName = oriFileName.substring(0, oriFileName.lastIndexOf(".")) + "_wm" + oriFileName.substring(oriFileName.lastIndexOf("."), oriFileName.length);
//            alert("oriFileName="+oriFileName +"....waterMarkName="+waterMarkName);
    for (var i = 0; i < size; i++) {
        if (lastUploadedFiles[i].fileName == waterMarkName) {
            return lastUploadedFiles[i];
        }
    }
    return null;
}
;

(function ($) {
    $.setFsId = function (tagVal) {
        var urlPattern = /^(Export|Upload)/g;
        if (!tagVal || tagVal.match(urlPattern) === false) return;
        var reqPattern = /([^?]*)/g;
        var paramPattern = /([^&]*)/g;
        var fsId = tagVal.match(reqPattern)[2].split("=")[1];
        var price;
        if (fsId) {
            if (fsId.indexOf("&") > 0) {
                if (isNaN(fsId.split("&")[1])) {
                    var showDiv = $("#" + fsId.split("&")[1]);
                    showDiv.load();
                } else {
                    price = fsId.split("&")[1];
                }
                fsId = fsId.split("&")[0];
            }
            $("input[name=fsId]").val(fsId);
            $("label[class=previousPrice]").html(price);
            $("#priceResult").val(price);
        }
    };
    $.getReqJSPArray = function (tagVal) {
        var reqPattern = /([^?]*)/g, reqJSPArray;
        if (tagVal) {
            reqJSPArray = []
            reqJSPArray = tagVal.match(reqPattern);
        }
        return reqJSPArray;
    };
    $.getExportFileType = function (tagVal) {
        var reqJSPArray = $.getReqJSPArray(tagVal);
        if (!reqJSPArray) return;
        var exportFileType = reqJSPArray[0];
        var excludeUrl = new RegExp("^[^(Notification)|(Calculate)]", "g");
        var isExclude = excludeUrl.test(exportFileType);
        return exportFileType.indexOf("handler") > -1 ? (exportFileType.replace("handler", "xls")) : (isExclude ? exportFileType : undefined );
    };
    $.exportHistoryLoad = function (exportFileType) {
        if (!exportFileType) return;
        var fsId = $("input[name=fsId]").val();
        if (!fsId) return;
        /*  $.ajax({
         url: "load_export_histories.jsp",
         type: "post",
         data: {
         t: exportFileType,
         fsId: fsId,
         merchantId: $.urlParam("merchantId"),
         columnId: $.urlParam("columnId")
         },
         success: function (data) {
         var divShow = $("#excelListHistoryDiv");
         divShow.html("");
         divShow.append(data);
         }
         }, 1000);*/
        var postData = {
            t: exportFileType,
            fsId: fsId,
            merchantId: $.urlParam("merchantId"),
            columnId: $.urlParam("columnId")
        }
        var result = $.ajax({
            url: "load_export_histories.jsp",
            data: postData,
            async: false,
            cache: false,
            type: "post",
            dataType: "text/html"
        }, 1000).responseText;
        var divShow = $("#excelListHistoryDiv");
        divShow.html("");
        divShow.append(result);
    };


})(jQuery);