/**
 * Created with IntelliJ IDEA.
 * User: mac
 * Date: 13-5-29
 * Time: 下午3:40
 * To change this template use File | Settings | File Templates.
 */

function Tile(param) {
    this.name = ko.observable(param.name);
    this.id = ko.observable(param.id);
    this.icon = ko.observable(param.icon);
}

function ViewModel() {
    var self = this;
    self.tiles = ko.observableArray([]);

    self.searchText = ko.observable("");

    self.search = function () {
        $("body").scrollTop(0);
        var q = self.searchText();
        self.searchText("");
        $.post("/shell20/server/searchApp.jsx", {q: q, m: merchantId}, function (result) {
            if (result.status == 'ok') {
                var mappedTiles = $.map(result.list, function (item) {
                    return new Tile(item)
                });
                self.tiles(mappedTiles);
            }
        }, "json");
    };

    self.searchAll = function(){
        self.searchText("");
        self.search();
    };

    self.keyUpFun = function (data, event) {
        //如果按回车
        if (event.keyCode == 13) {
            var text = $("#searchText").val();
            self.searchText(text);
            self.search();
        } else {
            return true;
        }
    };

    self.search();
}

$(document).ready(function () {
    var viewModel = new ViewModel();
    ko.applyBindings(viewModel);
    $("body").on("click", ".tile", function () {
        var e = $(this);
        var appId = e.attr("appId");
        var name = e.attr("appName");
        top.openTab(name, "/appMarket/goApp.jsp?appId=" + appId + "&m=" + merchantId);
    });
    $("#uploadApp").click(function () {
        top.openTab("本地安装app", "/appMarket/installLocal/uploadApp.jsp?m=" + merchantId);
        return false;
    });
});

