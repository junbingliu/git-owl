var Login = function () {
    var $root = $(".enter-cont");
    this.$root = $root;
    this.appId = $root.find(".appId").val();
}

Login.prototype = {
    refresh: function () {
        document.getElementById("validateCodeImg").src = "/ValidateCode?dumy=" + Math.random();
    },
    postData: function () {
        var self = this;
        var loginId = self.$root.find("#loginId").val();
        var password = self.$root.find("#password").val();
        var warehouseId = self.$root.find("#warehouseId").val();
        var validateCode = self.$root.find("#validateCode").val();
        var key = self.$root.find(".key").val();
        var iv = self.$root.find(".iv").val();
        return {
            loginId: encrypt(loginId, key, iv),
            password: encrypt(password, key, iv),
            warehouseId: warehouseId,
            validateCode: validateCode
        };
    },
    check: function () {
        var self = this;
        var loginId = self.$root.find("#loginId").val();
        var password = self.$root.find("#password").val();
        var warehouseId = self.$root.find("#warehouseId").val();
        var validateCode = self.$root.find("#validateCode").val();
        if (!loginId) {
            self.alterMessage("请输入账号！")
            return false;
        }
        if (!password) {
            self.alterMessage("请输入密码！")
            return false;
        }
        if (!warehouseId) {
            self.alterMessage("请输入仓库id！")
            return false;
        }
        if (!validateCode) {
            self.alterMessage("请输入验证码！")
            return false;
        }
        var postData = self.postData();
        var checkIsAdminResult = $.ajax({
            type: "POST",
            url: "/" + self.appId + "/pages/login/checkWarehouseAdmin.jsx",
            data: postData,
            async: false
        }).responseText;
        if (checkIsAdminResult) {
            checkIsAdminResult = JSON.parse(checkIsAdminResult);
            if (checkIsAdminResult.code !== "0") {
                self.alterMessage(checkIsAdminResult.msg);
                return false;
            }
        }
        return true;
    },
    submit: function () {
        var self = this;
        if (!self.check()) {
            self.refresh();
            return;
        }
        var postData = self.postData();
        $.post("/" + self.appId + "/pages/login/warehouseLoginOk.jsx", postData, function (ret) {
            if (ret.code == "0") {
                window.location.href = "/" + self.appId + "/pages/index.jsx?m=head_merchant&w=" + postData.warehouseId;
            } else {
                self.alterMessage(ret.msg);
            }
        }, "JSON");
    },
    alterMessage: function (msg) {
        $(".msgLayer").show().find(".errMsg").html(msg);
        setTimeout(function () {
            $(".msgLayer").hide(300).find(".errMsg").html("");
        }, 1300);
    }
}

$(document).ready(function ($) {
    $("#validateCodeImg").on("dblclick", function () {
        login.refresh();
    });

    $(".enter-bnt").on("click", function () {
        login.submit();
    });
    document.onkeydown=keyDown;
    function keyDown(e) {
        // 兼容FF和IE和Opera
        var theEvent = e || window.event;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13) {

            login.submit();
        }
    }
    var login = new Login();
});

