var LeftMenu = function () {
    var $rootTree = $(".rootTree");
    this.$rootSelector = $rootTree;
    this.childSelector = $rootTree.find(".use-item");
    this.$tbBGselector = $(".TB_overlayBG");
    this.$sideOption = $(".side-nav .side-option");
    this.$main = new parent.main.Main();
    this.idMap = {};

}
LeftMenu.prototype = {
    init: function () {
        this.childClick();
        this.grandchildClick();
        this.search();
        this.toHome();
        this.sideItemChange();
        this.sideOptionShow();
        this.menuShow();
        this.$main.closeTB();
        this.$main.tbPlayEvent();
    },
    toHome: function () {
        var self = this;
        $(".home-item").on("click", function () {
            var url = "index.jsx?m=" + m;
            if (s && s !== "undefined") {
                url += "&s=" + s;
            }
            if (w && w !== "undefined") {
                url += "&w=" + w;
            }
            window.parent.location = url;
        });
    },

    //搜索函数
    search: function () {
        var self = this;
        $(".side-search > .ico").on("click", function () {
            var keyword = $(this).next("input").val();
            var url = window.location.pathname + "?m=" + m;
            if (s && s !== "undefined") {
                url += "&s=" + s;
            }
            if (w && w !== "undefined") {
                url += "&w=" + w;
            }
            if (type && type !== "undefined") {
                url += "&type=" + type;
            }
            if (keyword) {
                url += "&keyword=" + keyword;
            }
            self.href("left", url);
        });
    },
    childClick: function () {
        var self = this;
        self.childSelector.on("click", function (event) {
            var index = self.$rootSelector.find(".use-item").index(this);
            var $childSelectors = self.$rootSelector.find(".use-item");
            $childSelectors.filter(function (index2) {
                return index2 != index;
            }).removeClass("active").children(".subclass").hide().find("li").removeClass("active");
            self.click(event);
        });
    },
    grandchildClick: function () {
        var self = this;
        self.childSelector.find(".subclass").on("click", "li", function (event) {
            var index = $(this).parent(".subclass").find("li").index(this);
            $(this).addClass("active").parent(".subclass").find("li").filter(function (index2) {
                return index2 != index;
            }).removeClass("active");
            self.mainHref(event);
            event.stopPropagation()
        });
    },

    click: function (event) {
        var self = this;
        var $selector = $(event.currentTarget);
        var hasChild = $selector.has(".subclass").length ? true : false;
        if (hasChild) {

            if (!$($selector).children(".subclass").is(":hidden")) {
                $($selector).children(".subclass").hide(300).removeClass("active");
            } else {
                $selector.addClass("active").children(".subclass").show(300);
            }
        } else {
            self.mainHref(event);
        }
    },
    mainHref: function (event) {
        var $selector = $(event.currentTarget);
        var url = $selector.addClass("active").attr("data-url");
        var appId = $selector.addClass("active").attr("data-appId");
        this.addHistory(appId);
        this.href("main", url, appId);
    },
    href: function (target, url, appId) {
        var self = this;
        if (target == "main") {

            var iframeLength = self.$main.$iframeSelector.find("#iframeDIV");
            //把主界面iframe隐藏
            self.$main.$iframeSelector.find("#subMain").hide();
            var id = appId;
            var $iframeSelectors = iframeLength.find("iframe");
            $iframeSelectors.each(function (index) {
                var $iframeSelector = $(this);
                var oldId = $iframeSelector.attr("id");
                if (oldId !== id) {
                    $iframeSelector.hide();
                }
            });
            var $newDiv = iframeLength.find("#" + id);
            if ($newDiv.length > 0) {
                var find = "#" + id;
                self.$main.$iframeSelector.find(find).show(300);
            } else {
                var src = url;
                var inserthtml = '<iframe id=' + id + ' ' + 'src=' + src + ' ' + 'style="border-style: none;width: 100%; height: 100%; display: block;" frameborder="0" cellspacing="0" scrolling="auto"  border="0"></iframe>'
                iframeLength.append(inserthtml);
            }

        } else {
            console.log("parent  location", window.parent[target].document.location.href);
            window.parent[target].document.location.href = url;
        }
    },
    addHistory: function (historyId) {
        var postData = {
            historyId: historyId
        }
        if (s && s !== "undefined") {
            postData.s = s;
        }
        if (w && w !== "undefined") {
            postData.w = w;
        }
        $.post("/" + appId + "/pages/addHistory.jsx", postData, function (ret) {
        }, "JSON");
    },

    sideItemChange: function () {
        var self = this;
        var $sideItems = $(".side-nav .side-item");
        $sideItems.on("click", function (event) {

            var subMainUrl = self.$main.$iframeSelector.find("#subMain").attr("src");
            //把#iframe DIV里面的缓存清空
            self.$main.$iframeSelector.find("#iframeDIV").html('');
            //new一个主界面的iframe
            var iframeLength = self.$main.$iframeSelector.find("#iframeDIV");
            var inserthtml = '<iframe id="subMain" name="subMain"' + ' ' + 'src=' + subMainUrl + ' ' + 'scrolling="auto" frameborder="0" border="0" cellspacing="0" style="border-style: none;width: 100%; height: 100%;"></iframe>'
            iframeLength.append(inserthtml);

            var $selector = $(event.currentTarget);
            var url = $selector.attr("data-url");
            var id = $selector.attr("id");

            if (m) {
                url += "?m=" + m;
            }
            if (s && s !== "undefined") {
                url += "&s=" + s;
            }
            if (w && w !== "undefined") {
                url += "&w=" + w;
            }
            if (id && id !== "undefined") {
                url += "&type=" + id;
            }
            self.href("left", url);
            //展现左侧边框
            parent.document.getElementById("main").cols = "240,*";
        });
    },
    sideOptionShow: function () {
        var self = this;
        self.$sideOption.on("click", "li", function () {
            self.$tbBGselector.show();
            var index = self.$sideOption.find("li").index(this);
            self.$main.$tbSelector.find(".tb_play").eq(index).show();
        });

    },
    //隐藏左侧边框
    menuShow: function () {
        //把frameset的cols设置为"40,*" , 把侧边菜单栏隐藏
        $(".shrink-ico").click(function () {

            //获取当前frameset的cols
            var colsArr = $(parent.document).find("#main").attr("cols").split(",")
            //获取当前菜单的cols
            var colsCount = colsArr[0];
            var interval = setInterval(function () {
                colsCount = colsCount - 5;
                //设置frameset的cols
                parent.document.getElementById("main").cols = colsCount + ",*";
                //console.log(colsCount);
                if (colsCount <= 40) {
                    //暂停setInterval
                    clearInterval(interval);
                }
            }, 5);

        });

    }

}

$(document).ready(function ($) {
    var self = this;
    var leftMenu = new LeftMenu();
    console.log("leftMenu");
    leftMenu.init();
});
//监听回车键事件触发搜索按钮
$(document).keydown(function (event) {
    if (event.keyCode == 13) {
        $(".side-search > .ico").click()
    }
});
