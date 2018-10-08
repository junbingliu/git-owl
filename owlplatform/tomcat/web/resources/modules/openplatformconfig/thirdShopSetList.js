$(document).ready(function () {
//----------------------------  shop modal show ---------------------//
    $('#addShopModal').on('show', function () {
        $("div#shopAuthHiddenDiv").css("display", "none");   //隐藏自定义应用
        getRegions();
        var defaultType = "defaultType";
        changeApplyType(defaultType);
        $("input[name=applyType]:eq(0)").attr("checked", 'checked');   //默认载入则选择系统应用
    });
//----------------------------  clear any form item when close modal  -----------//
//    $('#addShopModal').on('hidden', function () {
//        location.reload(true);
//    });
});//------------------------------ready function end ---------------- //
function getRegions() {
    var columnId = $("#columnId").val();
    var merchantId = $("#merchantId").val();
    var locationState = $("#locationState");
    var locationCityAppend;
    var parentId = "c_taobao_region_root";
    $.ajax({
        type: "post",
        url: "LoadRegion.jsp",
        data: "columnId=" + columnId + "&merchantId=" + merchantId + "&parentId=" + parentId,
        error: function () {
            alert("系统操作异常，请联系管理员！");
        },
        success: function (data) {
            var regionData = eval("(" + data + ")");
            var regionLength = regionData.length;
            if (regionLength > 0) {
                for (var i = 0; i < regionLength; i++) {
                    var jRegion = regionData[i];
                    locationCityAppend += "<option value=" + jRegion.id + ">" + jRegion.name + "</option>";
                }
                locationState.append(locationCityAppend);
            } else {
                alert("加载地区出错，请联系管理员！");
            }
        }
    });
}
//-----------------  add shopModel chooseRegionSelect change  ------------//
function addChangeSelect(optionValue) {
    var locationCity = $("#locationCity");
    if (optionValue == 0) {
        locationCity.empty();
        locationCity.hide();
    } else {
        var cid = $("#columnId").val();
        var mid = $("#merchantId").val();
        var parentId = optionValue;
        var appendCity = "";
        locationCity.show();
        locationCity.empty();
        $.ajax({
            type: "post",
            url: "LoadRegion.jsp",
            data: "columnId=" + cid + "&merchantId=" + mid + "&parentId=" + parentId,
            error: function () {
                alert("系统操作异常，请联系管理员！");
            },
            success: function (data) {
                var regionData = eval("(" + data + ")");
                for (var i = 0; i < regionData.length; i++) {
                    var jRegion = regionData[i];
                    appendCity += "<option value=" + jRegion.id + ">" + jRegion.name + "</option>";
                }
                locationCity.append(appendCity);
            }
        });
    }
}
//-----------------  delete shop  ------------//
function deleteShopFunction(shopId, n) {
    var formId = "#updateShopForm" + n;
    var isDefault = $(formId).find("input[id='isDefault']").val();
//    var topAppkey=$(formId).find("input[id='topAppkey']").val();
    var cid = $("#columnId").val();
    var mid = $("#merchantId").val();
    if (confirm('确定删除吗？')) {
        $.ajax({
            type: "post",
            url: "ShopDelete.jsp",
            data: "columnId=" + cid + "&merchantId=" + mid + "&shopId=" + shopId + "&isDefault=" + isDefault,
            error: function () {
                alert("系统操作异常，请联系管理员！");
            },
            success: function (data) {
                if (data.state = 'ok') {
                    parent.showAlert("<div style='color: #0000ff'>店铺删除成功！</div>");
                    location.reload(true);
                } else {
                    parent.showAlert("<div style='color: #ff0000'>店铺删除失败！</div>");
                    return false;
                }
                return true;
            }
        });
    }
    else {
        return false;
    }
}
function updateShopFunction(num) {
    $("#updateShopModal" + num).modal('show');
    var isDefault = $("#updateShopForm" + num).find("input[name='isDefault']").val();
    var locationState = $("#updateShopForm" + num).find("input[name='updateProv']").val();
    var locationCity = $("#updateShopForm" + num).find("input[name='updateCity']").val();
    updateApplyType(num, isDefault);
    getUpdateStateRegions(locationState, locationCity, num);
}
function getUpdateStateRegions(locationStateId, locationCityId, num) {
    var updateProv = $("#updateProv" + num);
    var columnId = $("#columnId").val();
    var merchantId = $("#merchantId").val();
    var parentId = "c_taobao_region_root";
    $.ajax({
        type: "post",
        url: "LoadRegion.jsp",
        data: "columnId=" + columnId + "&merchantId=" + merchantId + "&parentId=" + parentId,
        error: function () {
            alert("系统操作异常，请联系管理员！");
        },
        success: function (data) {
            var regionData = eval("(" + data + ")");
            var regionLength = regionData.length;
            var appendUpdateState;
            if (regionLength > 0) {
                for (var i = 0; i < regionLength; i++) {
                    var jRegion = regionData[i];
                    if (locationStateId == jRegion.id) {
                        appendUpdateState += "<option value=" + jRegion.id + " selected='selected'>" + jRegion.name + "</option>";
                        $("#shopForm" + num).find("input[id='shopProv']").attr("value", jRegion.name);
                    } else {
                        appendUpdateState += "<option value=" + jRegion.id + ">" + jRegion.name + "</option>";
                    }
                }
                updateProv.append(appendUpdateState);
                getUpdateCityRegions(locationStateId, locationCityId, num);
            } else {
                alert("加载地区出错，请联系管理员！");
            }
        }
    });
}
function getUpdateCityRegions(locationStateId, locationCityId, num) {
    var updateCity = $("#updateCity" + num);
    var columnId = $("#columnId").val();
    var merchantId = $("#merchantId").val();
    var appendUpdateCity;
    $.ajax({
        type: "post",
        url: "LoadRegion.jsp",
        data: "columnId=" + columnId + "&merchantId=" + merchantId + "&parentId=" + locationStateId,
        error: function () {
            alert("系统操作异常，请联系管理员！");
        },
        success: function (data) {
            var regionData = eval("(" + data + ")");
            var regionLength = regionData.length;
            if (regionLength > 0) {
                for (var i = 0; i < regionLength; i++) {
                    var jRegion = regionData[i];
                    if (locationCityId == jRegion.id) {
                        appendUpdateCity += "<option value=" + jRegion.id + " selected='selected'>" + jRegion.name + "</option>";
                    } else {
                        appendUpdateCity += "<option value=" + jRegion.id + ">" + jRegion.name + "</option>";
                    }
                }
                updateCity.append(appendUpdateCity);
            } else {
                alert("加载地区出错，请联系管理员！");
            }
        }
    });
}
//修改选择地区改变--------------------------------------------------------------------//
function updateChangeSelect(merchantId, columnId, optionValue, num) {
    var columnId = columnId;
    var merchantId = merchantId;
    var parentId = optionValue;
    var appendCity;
    var updateCity = $("#updateCity" + num);
    updateCity.empty();
    $.ajax({
        type: "post",
        url: "LoadRegion.jsp",
        data: "columnId=" + columnId + "&merchantId=" + merchantId + "&parentId=" + parentId,
        error: function () {
            alert("系统操作异常，请联系管理员！");
        },
        success: function (data) {
            var regionData = eval("(" + data + ")");
            var regionDataLength = regionData.length;
            if (regionDataLength < 0) {
                alert("地区加载异常，请联系管理员！");
                return false;
            }
            for (var i = 0; i < regionDataLength; i++) {
                var jRegion = regionData[i];
                appendCity += "<option value=" + jRegion.id + ">" + jRegion.name + "</option>";
            }
            updateCity.append(appendCity);
        }
    });
}
//店铺修改 save
function updateShopSaveFunction(shopId, num) {
    var locationState = $("#updateProv" + num).val();
    var locationCity = $("#updateCity" + num).val();
    var locationStateText = $("#updateProv" + num).find("option:selected").text();
    var locationCityText = $("#updateCity" + num).find("option:selected").text();
    var shopRegions = locationStateText + "." + locationCityText;
    var formId = "#updateShopForm" + num;
    var updateData = $(formId).serialize();
    var checkFlag = checkUpdateShopForm(formId);
    if (checkFlag) {
        $.ajax({
            type: "post",
            url: "ShopUpdate.jsp",
            data: "shopId=" + shopId + "&locationState=" + locationState + "&locationCity=" + locationCity + "&" + updateData + "&shopRegions=" + shopRegions,
            cache: false,
            error: function () {
                alert("系统操作异常，请联系管理员！");
            },
            success: function (data) {
                var jData = JSON.parse(data);
                if (jData.state == 'ok' && jData != "") {
                    $("#updateShopModal" + num).modal('hide');
                    parent.showAlert("<div style='color: #0000ff'>" + jData.msg + "</div>");
                    location.reload(true);
                } else {
                    alert(jData.msg);
                }
            }
        });
    }
    else {
        $(formId).find("input[required!='true']").each(function () {
            if ($(this).val().length < 1) {
                $(this).next().parents(".control-group").addClass("error");
            }
        });
    }
}
//---------------  check AddShopForm  ---------------
function checkAddShopForm(formId) {
    return $(formId).validate({
        rules: {
            locationState: "required",
            locationCity: "required",
//            topUrl:"required",
            topAppkey: "required",
            topSecret: "required",
//            topSessionkey:"required",
//            topParameters:"required",
            shopName: "required"
        },
        messages: {
            locationState: "<span style='display: inline;color: #ff0000;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请选择店铺所在地</span>&nbsp;&nbsp;&nbsp;" +
                "<strong style='display: inline;color: #ff0000;'>X</strong>",
            locationCity: "<strong style='display: inline;color: #ff0000;'>X</strong>",
//            topUrl:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            topAppkey: "<strong style='display: inline;color: #ff0000;'>X</strong>",
            topSecret: "<strong style='display: inline;color: #ff0000;'>X</strong>",
//            topSessionkey:"<strong style='display: inline;color: #ff0000;'>X</strong>",
//            topParameters:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            shopName: "<strong style='display: inline;color: #ff0000;'>X</strong>"
        }
    }).form();
}
//---------------  check AddShopForm  ---------------
function checkUpdateShopForm(formId) {
    return $(formId).validate({
        rules: {
//            topUrl:"required",
            topAppkey: "required",
            topSecret: "required",
            topSessionkey: "required",
            topParameters: "required",
            updateShopName: "required"
        },
        messages: {
//            topUrl:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            topAppkey: "<strong style='display: inline;color: #ff0000;'>X</strong>",
            topSecret: "<strong style='display: inline;color: #ff0000;'>X</strong>",
            topSessionkey: "<strong style='display: inline;color: #ff0000;'>X</strong>",
            topParameters: "<strong style='display: inline;color: #ff0000;'>X</strong>",
            updateShopName: "<strong style='display: inline;color: #ff0000;'>X</strong>"
        }
    }).form();
}
//look up the point item of addHelp model -----------------------------------//
function GetOpenItemNum(num) {
    $(".accordion-body").removeClass("in");
    $("#" + num).addClass("in");
}
//get sessionkey -----------------------------------------------//
function getSessionKey(num, code) {
    var updateShopForm = "#updateShopForm" + num;
    var topAppkey;
    var redirectUri = authCallBackDomain + "/open/TaobaoSessionkey.jsp";

    if (num == 0) {
        topAppkey = $.trim($("#addShopForm input[name='topAppkey']").val());
    } else {
        topAppkey = $.trim($(updateShopForm).find("input[name='topAppkey']").val());
    }
    if (isNaN(topAppkey)) {
        alert("topAppkey是长度为8的数字字符串，请更改!");
        return false;
    }
    if (topAppkey == null || topAppkey == "") {
        if (code == "p") {
            alert("获取topParameters,参数topAppkey不可为空!");
        } else if (code == "shopAuth") {
            alert("进行应用授权,参数topAppkey不可为空!");
        } else {
            alert("获取topSessionkey,参数topAppkey不可为空!");
        }
        return false;
    } else if (topAppkey.length != 8) {
        alert("请检查topAppkey长度是否为8的数字字符串!");
        return false;
    }
    var postUrl = "http://container.open.taobao.com/container?appkey=" + topAppkey + "&redirect_uri=" + redirectUri + "&encode=utf-8";
    window.open(postUrl);
}
function shopAuthBind() {
    var applyType = $('#addShopForm input:radio[name="applyType"]:checked').val();
    var defaultAppKey = $.trim($("#addShopForm input[name='topAppkey']").val());
    var redirectUri;        //最终的回调地址
    if (applyType == "defaultType") {
        $("#shopAuthBindSpan").css('display', 'none');
        $("#shopAuthBindBtn").css('display', 'none');
        redirectUri = webDomain + "/open/SysTaobaoAuthBind.jsp";
//        redirectUri = webDomain+"/test/openSystem/ShopAuthOK.jsp";
    } else {
        redirectUri = webDomain + "/open/MyTaobaoAuthBind.jsp";
        var topAppkey = $.trim($("#addShopForm input[name='topAppkey']").val());
        if (topAppkey == "") {
            alert("topAppkey不可为空!请重新输入。");
            $("#addShopForm").find("input[name='topAppkey']").focus();
            $("#myAppBindSpan").css('display', 'inline');
            $("#myAppBindBtn").css('display', 'inline');
            return;
        } else {
            $("#myAppBindSpan").css('display', 'none');
            $("#myAppBindBtn").css('display', 'none');
        }
        defaultAppKey = topAppkey;
    }
    $("#addShopSubmit").css('display', 'inline');
    var w = window.screen.width * 0.8;
    var h = window.screen.height;
    window.open(authCallBackDomain + "/open/SysTaobaoAuthAction.jsp" + "?returnUrl=" + redirectUri + "&defaultAppKey=" + defaultAppKey
        , '_blank', 'height=' + h + ',width=' + w + ',top=0,left=' + w * 0.1 + ',toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');

}
function checkShopCode(str) {
    var reg = new RegExp("^[A-Za-z0-9]+$"); //数字或字母或两者组合
//    var reg=new RegExp("[A-Za-z].*[0-9]|[0-9].*[A-Za-z]");   //数字、字母两者组合
    return (reg.test(str));
}
//-------------------------------   shop add ---------------------//
function addShop() {
    var formId = "#addShopForm";
    var shopCodeStr = $(formId).find("input[name='shopCode']").val();
    var prov = $("#locationState").find("option:selected").text();
    var ci = $("#locationCity").find("option:selected").text();
    var shopRegions = prov + "." + ci;
    var addShopFormData = $(formId).serialize();
    if (shopCodeStr == "" || shopCodeStr == null) {
    }
    else {
        var shopCodeCheckFlag = checkShopCode(shopCodeStr);
        if (!shopCodeCheckFlag) {
            alert("店铺编码只能由字母或数字组成！");
            $(formId).find("input[name='shopCode']").parents(".control-group").addClass("error")
            $(formId).find("input[name='shopCode']").select();
            return false;
        }
    }
    var applyType = $('input[name="applyType"]:checked').val();
    var checkFlag;
    checkFlag = checkAddShopForm(formId);
    if (checkFlag) {
        $.ajax({
            url: 'ShopAdd.jsp',
            data: addShopFormData + "&shopRegions=" + shopRegions,
            type: "post",
            cache: false,
            error: function () {
                alert("系统操作异常，请联系管理员！");
            },
            success: function (data) {
                var jData = JSON.parse(data);
                if (jData.state == 'ok') {
                    parent.showAlert("<div style='color: #0000ff'>店铺添加成功！</div>");
                    location.reload(true);
                } else {
                    if (jData.errorCause == 'isExistShopCode') {
                        alert(jData.msg);
                        $(formId).find("input[name='shopCode']").select();
                    } else if (jData.authState == 'N') {
//                        alert(jData.msg);
                        $("#notAuthSpan").html(jData.msg + "&nbsp;");
                        $("#notAuthSpan").css({'display': 'inline', 'color': 'red'});
                        $("#addShopSubmit").css('display', 'none');
                        if (applyType == "defaultType") {
                            $("#shopAuthBindBtn").css('display', 'inline');
                        } else {
                            $("#myAppBindBtn").css('display', 'inline');
                        }
                    } else {
                        parent.showAlert("<div style='color: #ff0000'>店铺添加失败！</div>");
                        location.reload(true);
                    }
                }
            }
        });
    } else {
        $(formId).find("input[required!='true']").each(function () {
            if ($(this).val().length < 1) {
                $(this).next().parents(".control-group").addClass("error");
            }
        });
    }
}
//show some object when change appType --------------------------------------
function changeApplyType(value) {
    if (value == "defaultType") {
//        $("#showAndHideApplyDiv").children(":lt(3)").hide();
        $("#showAndHideApplyDiv").children().hide();
        $("#notAuthSpan").css('display', 'none');
        $("#addShopSubmit").css('display', 'none');
        $("#myAppBindSpan").css('display', 'none');
        $("#myAppBindBtn").css('display', 'none');
        $("#shopAuthBindSpan").css('display', 'inline');
        $("#shopAuthBindBtn").css('display', 'inline');
        getDefaultApplyParams();
    } else {
        $("#showAndHideApplyDiv").children(":eq(0),:eq(2),:eq(3)").show();
//        $("#showAndHideApplyDiv").children().show();
//        $("#showAndHideApplyDiv").children(":eq(0)").hide();
        $("#notAuthSpan").css('display', 'none');
        $("#addShopSubmit").css('display', 'none');
        $("#shopAuthBindSpan").css('display', 'none');
        $("#shopAuthBindBtn").css('display', 'none');
        $("#myAppBindSpan").css('display', 'inline');
        $("#myAppBindBtn").css('display', 'inline');
        resetApplyParamsValue();
    }
}
//click update modal choice show some inputs----------------
function updateApplyType(num, isDefault) {
    if (isDefault == "N") {            //自定义应用类型
//        $("#updateApplyDiv" + num).children(":eq(1)").hide();
        $("#updateLineHidden" + num).hide();
        $("#updateApplyDiv" + num).children().hide();
    } else {                           //系统默认类型
//        $("#updateApplyDiv" + num).children(":lt(4)").hide();
        $("#updateLineHidden" + num).hide();
        $("#updateApplyDiv" + num).children().hide();
    }
}
//--------获取到默认APP参数 -----------
function getDefaultApplyParams() {
    var columnId = $("#columnId").val();
    var merchantId = $("#merchantId").val();
    $.ajax({
        url: 'GetSysDefaultApp.jsp',
        data: "merchantId=" + merchantId + "&columnId=" + columnId,
        type: "post",
        cache: false,
        error: function () {
            alert("系统默认应用异常，请联系管理员！");
        },
        success: function (data) {
            var jData = JSON.parse(data);
            if (jData.flag == 'N' || jData == "") {
                alert(jData.msg);
                $("#addShopModal").modal('hide');
                return;
            } else {
//                alert("loaded ! "+jData.defaultAppKey+" | "+jData.defaultAppSecret+"| "+jData.defaultTopUrl);
                $("#addShopForm").find("input[name='topUrl']").val(jData.defaultTopUrl);
                $("#addShopForm").find("input[name='topAppkey']").val(jData.defaultAppKey);
                $("#addShopForm").find("input[name='topSecret']").val(jData.defaultAppSecret);
            }
        }
    });
}
function resetApplyParamsValue() {
    $("#showAndHideApplyDiv").find("input[type='text']").each(function () {
        $(this).attr("value", '');
    });
}
//refreshSessionKey or auth again------------------------------------------------------//
function refreshSessionKey(shopId, n) {
    var columnId = $("#columnId").val();
    var merchantId = $("#merchantId").val();
    var updateForm = "#updateShopForm" + n;
    var topAppkey = $.trim($(updateForm).find("input[name='topAppkey']").val());
    var topSecret = $.trim($(updateForm).find("input[name='topSecret']").val());
    var topSessionkey = $.trim($(updateForm).find("input[name='topSessionkey']").val());
    var topParameters = Trim($(updateForm).find("input[name='topParameters']").val(), "g");
    $.ajax({
        type: "post",
        url: "RefreshSessionKey.jsp",
        data: "columnId=" + columnId + "&merchantId=" + merchantId + "&topAppkey=" + topAppkey + "&topSecret=" + topSecret + "&topSessionkey=" + topSessionkey + "&topParameters=" + topParameters, //提交表单，相当于CheckCorpID.ashx?ID=XXX
        error: function () {
            alert("系统操作异常，请联系管理员！");
        },
        success: function (data) {
            var jData = JSON.parse(data);
            if (jData.state == 'ok' && jData != "") {
                parent.showAlert("<div style='color: #0000ff;'>应用刷新成功，可正常使用！</div>");
                location.reload(true);
            } else {
                if (jData.msg == "407" || jData.msg == "470") {
                    var shopAuthFlag = confirm('应用刷新已失效，是否进行应用授权?');
                    if (shopAuthFlag) {
                        shopAuthAgain(updateForm, shopId);
                    }
                } else if (jData.msg == "409") {
                    alert("24小时内最多只能刷新60次!");
                } else {
                    alert("系统应用刷新失败,请联系管理员!");
                }
                return false;
            }
            return true;
        }
    });
}
//去除字符串空格(前中后)
function Trim(str, is_global) {
    var resultStr;
    resultStr = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global.toLowerCase() == "g")
        resultStr = resultStr.replace(/\s/g, "");
    return resultStr;
}
//-----agree auth again-------------------------------
function shopAuthAgain(Form, shopId) {
    var w = window.screen.width * 0.8;
    var h = window.screen.height;
    var topAppkey = $.trim($(Form).find("input[name='topAppkey']").val());
    var redirectUri = webDomain + "/open/TaobaoDefaultAPPAuth.jsp";           //webDomain商家域名
    var sysWebsite = authCallBackDomain + "/open/SysTaobaoAuthAction.jsp";    //authCallBackDomain : system website
    // 窗口加大小等属性约束，可以限制更改地址栏信息
    window.open(sysWebsite + "?returnUrl=" + redirectUri + "&defaultAppKey=" + topAppkey + "&shopId=" + shopId
        , '_blank', 'height=' + h + ',width=' + w + ',top=0,left=' + w * 0.1 + ',toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
}
