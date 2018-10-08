/*!
 * isOnev45 百度地图插件
 * version: 1.00 (2012-11-09)
 * @requires jQuery v1.5 or later
 * @author hujin
 */
;
(function ($) {
    /*定义空间命名,用于闭包之间能获取参数*/
    isoneMap = {};
    isoneMap.baidu = {};
    isoneMap.baidu.targetList = [];
    isoneMap.baidu.tempList = [];
    isoneMap.baidu.isLoadeScript = false;

    $.fn.baiduMap = function (options) {
        var defaultOptions = {
            showMarker: true,
            centerAndZoom: 'default',
            markerInfoWindowData: '<div style="border-bottom: 1px solid #EEEEEE;font-size: 14px;font-weight: bold;padding-bottom: 4px;margin-bottom: 4px">店铺基本信息</div><p>店铺名称：<span style="color: #B94A48">#name#</span></p><p>商铺地址：<span style="color: #B94A48">#address#</span></p><p>联系电话：<span style="color: #B94A48">#tel#</span></p><p>交通信息：<span style="color: #B94A48">#traffic#</span></p>'
        };
        isoneMap.baidu.options = $.extend(true, defaultOptions, options);

        $(this).each(function (index, item) {
            var id;
            if (typeof($(item).attr("id")) == "undefined") {
                id = $(item).attr("map-key");
                $(this).attr("id", id);
            } else {
                id = $(item).attr("id");
            }
            isoneMap.baidu.tempList[isoneMap.baidu.tempList.length] = id;
        });

        if (isoneMap.baidu.loadJs) {
            isoneMap.baidu.loadJs = false;
            isoneMap.baidu.loadBaiduScript();
            if($(this.length<2)){
                isoneMap.baidu.initialize();
            }
        } else {
            isoneMap.baidu.initialize();
        }
    }


    isoneMap.baidu.initialize = function () {
        if (isoneMap.baidu.isLoadedScript) {
            $(isoneMap.baidu.tempList).each(function (index, id) {
                var map = new BMap.Map(id);
                var $item = $("#" + id);
                var X = $item.attr("X");
                var Y = $item.attr("Y");
                if (typeof(X) == "undefined" || typeof(Y) == "undefined") {
                    $item.text("请填写经纬度（X、Y）！");
                    return;
                }

                map.centerAndZoom(new BMap.Point(X, Y), 12);
                map.enableScrollWheelZoom();                            //启用滚轮放大缩小

                var marker = new BMap.Marker(new BMap.Point(X, Y));
                map.addOverlay(marker);
                if (isoneMap.baidu.options.showMarker) {
                    var name = $item.attr("name");
                    var tel = $item.attr("tel");
                    var address = $item.attr("address");
                    var traffic = $item.attr("traffic");
                    var markerInfo = isoneMap.baidu.replaceMarkerInfoWithParam(name, tel, address, traffic);
                    var infoWindow = new BMap.InfoWindow(markerInfo);
                    marker.openInfoWindow(infoWindow);
                    marker.addEventListener("click", function () {
                        this.openInfoWindow(infoWindow);
                    });
                }
            });
        }
    }

    isoneMap.baidu.loadedScripts = function () {
        isoneMap.baidu.isLoadedScript = true;
        isoneMap.baidu.initialize();
        //TODO 加载一次
    }

    isoneMap.baidu.loadBaiduScript = function () {
        var script = document.createElement("script");
        script.src = "http://api.map.baidu.com/api?v=1.3&callback=isoneMap.baidu.loadedScripts";
        if (!document.body) {
            alert("请当页面加载完后再调用isone.map.js的方法!");
            return;
        }
        document.body.appendChild(script);
    }

    isoneMap.baidu.replaceMarkerInfoWithParam = function (name, tel, address, traffic) {
        var result = isoneMap.baidu.options.markerInfoWindowData;
        return result.replaceAll("#name#", name).replaceAll("#tel#", tel).replaceAll("#address#", address).replaceAll("#traffic#", traffic);
    }

    //判断是否需要加载js
    isoneMap.baidu.loadJs = true;
})(jQuery);

/*需要暴露的函数*/


String.prototype.replaceAll = function (s1, s2) {
    var r = new RegExp(s1.replace(/([\(\)\[\]\{\}\^\￥\+\-\*\？\.\"\""\|\/\\])/g, "\\￥1"), "ig");
    return this.replace(r, s2);
}