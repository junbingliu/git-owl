var Main = function () {
    this.$mainSelector = $("#subMain");
    this.$tbSelector = $(".TB_BG");
    this.$iframeSelector = $("#iframeContainer");
    this.leftFrameSelsector = $(window.parent["left"].document);
}
Main.prototype = {
    init: function () {
        this.loadFrame();
        this.resizeFrame();

    },
    resizeFrame: function () {
        var self = this;
        $(window).resize(function () {
            self.changeFrameHeight();
        });
    },
    loadFrame: function () {
        var self = this;
        self.$mainSelector.load(function () {
            self.changeFrameHeight();
        });
    },
    changeFrameHeight: function () {
        var self = this;
        var mainheight = document.documentElement.clientHeight;
        self.$mainSelector.height(mainheight);
    },
    closeTB: function () {
        var self = this;
        self.$tbSelector.find("a.ico.fr").on("click", function () {
            self.leftFrameSelsector.find(".TB_overlayBG").hide();
            $(this).parents(".tb_play").hide();
        });
    },
    tbPlayEvent: function () {
        var self = this;
        var tbPlays = self.$tbSelector.find(".tb_play");
        for (var i = 0; i < tbPlays.length; i++) {
            var tbPlaySelector = tbPlays[i];
            if (tbPlaySelector) {
                $(tbPlaySelector).on("click", "a", function (event) {
                    var modifyPassIndex = $(this).parents(".modifyPass").find("a").index(this);
                    var logoutIndex = $(this).parents(".logout").find("a").index(this);
                    return
                });
            }
        }
        this.modifyPass();
        this.logout();
    },
    modifyPass: function () {
        var self = this;
        //确定更改密码
        document.getElementById("updatePassword").onclick=function(){
            //点击确定按钮，密码不能为空
            //判断新密码和确定密码是否一致
            var oldPassword = document.getElementById("oldPass").value;
            var newPassword = document.getElementById("newPass").value;
            var passwordhash = document.getElementById("confirmPass").value;
            var postData = {
            }
            if(oldPassword == ""){
                alert("原密码不能为空");
            }
            if(newPassword ==""){
              alert("新密码不能为空");
            }
            if(passwordhash==""){
                alert("确定密码不能为空");
            }
            if(newPassword !== passwordhash){
                alert("新密码与确定密码不一致");
            }
            else {
                postData.passwordhash = passwordhash;
            }
            console.log("passwordhash",postData.passwordhash);
            $.post("/" + appId + "/pages/updatePassword.jsx", postData, function (ret) {
            }, "JSON");
            //隐藏弹出框
            self.leftFrameSelsector.find(".TB_overlayBG").hide();
            $(this).parents(".tb_play").hide();
        }
        //取消更改密码
        document.getElementById("cancelUpdate").onclick=function(){
            self.leftFrameSelsector.find(".TB_overlayBG").hide();
            $(this).parents(".tb_play").hide();
        }
    },
    logout: function (that, index) {
        var self = this;
        //登出事件
        document.getElementById("loginout").onclick=function(){
            var url = "logOut.jsx?m=" + m;
            if (s && s !== "undefined") {
                url += "&s=" + s;
            }
            if (w && w !== "undefined") {
                url += "&w=" + w;
            }
            //alert(url);
            window.parent.location = url;
            //top.location="logOut.jsx"
        }
        //取消登出事件
        document.getElementById("cancelLoginout").onclick=function(){
            self.leftFrameSelsector.find(".TB_overlayBG").hide();
            $(this).parents(".tb_play").hide();
        }
    },

}


$(document).ready(function ($) {
    var main = new Main();
    main.init();
});