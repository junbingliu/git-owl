$(document).ready(function () {
    $('#authBtn').bind('click', function () {
        doShopAuth();
    });
    $('#addShopOk').bind('click', function () {
        doAddShop();
    });
    $('.updateShop').live('click', function () {
        var $this = $(this);
        var shopId = $this.attr("shopId");
        doViewShop(shopId);
    });
    $('#updateShopOk').bind('click', function () {
        doUpdateShop();
    });

    $('.deleteShop').live('click', function () {
        var $this = $(this);
        var shopId = $this.attr("shopId");
        var shopName = $this.attr("shopName");

        if (!confirm("确定要删除【" + shopName + "】吗？")) {
            return;
        }

        doDeleteShop(shopId);
    });

    $('.refreshToken').live('click', function () {
        var $this = $(this);
        var shopId = $this.attr("shopId");
        var shopName = $this.attr("shopName");

        if (!confirm("确定要删除【" + shopName + "】的Token吗？")) {
            return;
        }

        doRefreshToken(shopId);
    });
    $('.reAuthShop').live('click', function () {
        var $this = $(this);
        var shopId = $this.attr("shopId");
        var shopName = $this.attr("shopName");

        if (!confirm("确定要给【" + shopName + "】重新授权吗？")) {
            return;
        }
        var applyType = "default";
        doAuth(applyType, shopId);
    });
});

function doAddShop() {
    var $addShopModal = $("#addShopModal");
    var shopName = $(".shopName", $addShopModal).val();
    var shopCode = $(".shopCode", $addShopModal).val();
    var deliveryRuleId = $(".deliveryRuleId", $addShopModal).val();
    var shopDescription = $(".shopDescription", $addShopModal).val();
    var applyType = $("[name='applyType']:checked").val();

    var postData = {};
    postData.columnId = columnId;
    postData.merchantId = merchantId;
    postData.shopName = shopName;
    postData.shopCode = shopCode;
    postData.deliveryRuleId = deliveryRuleId;
    postData.shopDescription = shopDescription;
    postData.applyType = applyType;
    $.ajax({
        url: 'ShopAdd_handler.jsp',
        data: postData,
        type: "post",
        cache: false,
        dataType: "json",
        error: function () {
            alert("系统操作异常，请联系管理员！");
        },
        success: function (data) {
            if (data.state == 'ok') {
                alert("添加成功");
                $addShopModal.modal('hide');
                window.location.href = "ShopList.jsp?columnId=" + columnId + "&merchantId=" + merchantId;
            } else {
                alert(data.msg);
            }
        }
    });
}

function doDeleteShop(shopId) {
    var postData = {columnId: columnId, merchantId: merchantId, shopId: shopId};
    $.ajax({
        url: 'ShopDelete_handler.jsp',
        data: postData,
        type: "post",
        cache: false,
        dataType: "json",
        error: function () {
            alert("系统操作异常，请联系管理员！");
        },
        success: function (data) {
            if (data.state == 'ok') {
                alert("删除成功");
                window.location.href = "ShopList.jsp?columnId=" + columnId + "&merchantId=" + merchantId;
            } else {
                alert(data.msg);
            }
        }
    });
}

function doRefreshToken(shopId) {
    var postData = {columnId: columnId, merchantId: merchantId, shopId: shopId};
    $.ajax({
        url: 'RefreshToken.jsp',
        data: postData,
        type: "post",
        cache: false,
        dataType: "json",
        error: function () {
            alert("系统操作异常，请联系管理员！");
        },
        success: function (data) {
            if (data.state == 'ok') {
                alert("刷新成功");
            } else {
                alert(data.msg);
            }
        }
    });
}

function doShopAuth() {
    var applyType = $('#addShopForm input:radio[name="applyType"]:checked').val();
    var redirectUri;        //最终的回调地址
    if (applyType == "default") {
        $("#shopAuthBindSpan").css('display', 'none');
        $("#shopAuthBindBtn").css('display', 'none');
    } else {
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
    doAuth(applyType, "");
}

function doAuth(authType, shopId) {
//    var redirectUri = webDomain + "/open/AuthBind.jsp?authType=" + authType + "&shopId=" + shopId;
    var w = window.screen.width * 0.8;
    var h = window.screen.height;
    window.open(webDomain + "/open/AuthAction.jsp" + "?authType=" + authType + "&shopId=" + shopId
        , '_blank', 'height=' + h + ',width=' + w + ',top=0,left=' + w * 0.1 + ',toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
}

function doViewShop(shopId) {
    var postData = {columnId: columnId, merchantId: merchantId, shopId: shopId};
    $.ajax({
            url: "GetShop.jsp",
            type: "post",
            async: false,
            data: postData,
            dataType: "json",
            success: function (data) {
                if (data.state == 'ok') {
                    showShop(data.jShop);
                } else {
                    alert(data.msg);
                }
            }
        }
    );
}

function showShop(jShop) {
    if (!jShop) {
        alert("获取店铺错误");
        return;
    }

    var $updateShopForm = $("#updateShopForm");
    $("#shopId").val(jShop.id);
    $(".shopName", $updateShopForm).val(jShop.shopName);
    $(".shopCode", $updateShopForm).val(jShop.shopCode);
    $(".deliveryRuleId", $updateShopForm).val(jShop.deliveryRuleId);
    $(".shopDescription", $updateShopForm).val(jShop.shopDescription);

    $('#updateShopModal').modal('show');
}

function doUpdateShop() {
    var $updateShopForm = $("#updateShopForm");
    var shopId = $("#shopId").val();
    var shopName = $(".shopName", $updateShopForm).val();
    var deliveryRuleId = $(".deliveryRuleId", $updateShopForm).val();
    var shopDescription = $(".shopDescription", $updateShopForm).val();

    var postData = {};
    postData.columnId = columnId;
    postData.merchantId = merchantId;
    postData.shopId = shopId;
    postData.shopName = shopName;
    postData.deliveryRuleId = deliveryRuleId;
    postData.shopDescription = shopDescription;
    $.ajax({
        url: 'ShopUpdate_handler.jsp',
        data: postData,
        type: "post",
        cache: false,
        dataType: "json",
        error: function () {
            alert("系统操作异常，请联系管理员！");
        },
        success: function (data) {
            if (data.state == 'ok') {
                alert("修改成功");
                $updateShopForm.modal('hide');
                window.location.href = "ShopList.jsp?columnId=" + columnId + "&merchantId=" + merchantId;
            } else {
                alert(data.msg);
            }
        }
    });
}
