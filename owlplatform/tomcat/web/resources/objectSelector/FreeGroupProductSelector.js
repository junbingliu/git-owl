/**
 * Created with IntelliJ IDEA.
 * User: zsl
 * Date: 14-1-5
 * Time: 下午3:20
 * To change this template use File | Settings | File Templates.
 */


(function ($) {
    "use strict"; // jshint ;_;


    var FreeGroupProductSelector = function (initconfigs) {
        var $that = this;
        $that.objects = [];
        if (initconfigs) {
            $that.freeGroupId = initconfigs.freeGroupId ? initconfigs.freeGroupId : undefined;
            $that.root_container_id = initconfigs.root_container_id ? initconfigs.root_container_id : undefined;
            $that.addUrl = initconfigs.addUrl ? initconfigs.addUrl : undefined;
            $that.loadProductsUrl = initconfigs.loadProductsUrl ? initconfigs.loadProductsUrl : undefined;
            $that.columnId = initconfigs.columnId ? initconfigs.columnId : undefined;
            $that.merchantId = initconfigs.merchantId ? initconfigs.merchantId : undefined;
        }
        if ($that.root_container_id) {
            $that.root_container = $("#" + $that.root_container_id);
        }
        if (!$that.root_container) {
            throw "root_container is undefined";
        }
        window[$that.root_container_id] = $that;
        $that.data_container = $(".includeProducts", $that.root_container);

        if ($that.addUrl) {
            var addHref = $that.addUrl + "?p=" + $that.root_container_id + "&columnId=" + $that.columnId + "&merchantId=" + $that.merchantId;
            var $addElem = $('<a href="' + addHref + '" class="colorbox selector_add" >添加</a>');
        }

        var $delElem = $('<a href="javascript:;" class="selector_del">删除</a>');
        var $reSortElem = $('<a href="javascript:;" class="partProduct_sort">排序</a>');
        var $selectAllElem = $('<a href="javascript:;" class="selector_select_all">全选</a>');
        var $unselectAllElem = $('<a href="javascript:;" class="selector_unselect_all">全不选</a>');

        var pElem = $("<p></p>");
        if ($that.addUrl) {
            pElem.append($addElem);
        }
        pElem.append($delElem);
        pElem.append($reSortElem);
        pElem.append($selectAllElem);
        pElem.append($unselectAllElem);
        $that.data_container.parent().append(pElem);

        $that.addObjects = function (objectArray) {
            if (!objectArray) return;
            for (var i = 0; i < objectArray.length; i++) {
                var p1 = objectArray[i];
                var found = false;
                for (var j = 0; j < $that.objects.length; j++) {
                    var p = $that.objects[j];
                    if (p1.id == p.id && p1.skuId == p.skuId) {
                        found = true;
                        $that.objects[j] = p1;
                        break;
                    }
                }
                if (!found) {
                    $that.objects.push(p1);
                }
            }
            $that.show();
        };

        $that.doShow = function (objects) {
            var html = "<table class='table table-bordered table-striped' style='margin-bottom: 5px;'>";
            var objectLength = objects.length;
            if (objectLength > 0) {
                html += "<thead><tr><th style='width: 30px;text-align: center;'><input type='checkbox' class='chk_select_all'></th><th style='width: 60px;text-align: center;'>排序</th><th style='width: 50px;'>图片</th><th>商品名称 / ERP编码</th></tr></thead><tbody>";
                for (var i = 0; i < objectLength; i++) {
                    var p = objects[i];
                    html += "<tr>";
                    html += "<td style='text-align: center;'><input type='checkbox' name='chk_productList' proId='" + p.id + "' skuId='" + p.skuId + "'></td>";
                    html += "<td><div class='posInputDiv'><input class='posInput form-control input-sm' type='text' name='pos' value='" + p.pos + "' proId='" + p.id + "' skuId='" + p.skuId + "'></div></td>";
                    html += "<td><img src='" + p.logo + "'></td>";
                    html += "<td title='" + p.id + "'>" + p.name + "<br><span style='color: #a9a9a9;'>" + p.skuId + "【" + p.realSkuId + "】</span></td>";
                    html += "</tr>";
                }
            } else {
                html += "<tbody><tr>";
                html += "<td><span class='mutedTip'>您尚未添加部件商品</span></td>";
                html += "</tr>";
            }
            html += "</tbody></table>";
            $that.data_container.html(html);
        };

        $that.show = function () {
            if (!$that.loadProductsUrl) {
                throw "loadProductsUrl is undefined";
            }
            var postData = {};
            postData.merchantId = $that.merchantId;
            postData.columnId = $that.columnId;
            postData.objects = $.toJSON($that.objects);
            $.ajax({
                url: $that.loadProductsUrl,
                type: "post",
                data: postData,
                dataType: 'json',
                success: function (data) {
                    if (data.state == "0") {
                        var showObjects = data.showObjects;
                        if (showObjects) {
                            $that.doShow(showObjects);
                        }
                    } else {
                        alert(data.msg);
                    }
                }
            });
        };

        $that.reSort = function () {
            $that.objects.sort(function (a, b) {
                if (isNaN(a.pos) || isNaN(b.pos)) {
                    return -1;
                }
                return parseInt(a.pos) > parseInt(b.pos) ? 1 : -1
            });
            $that.show();
        };

        $that.deleteObject = function (productId, skuId) {
            for (var i = 0; i < $that.objects.length; i++) {
                var p = $that.objects[i];
                if (p.id == productId && p.skuId == skuId) {
                    $that.objects.splice(i, 1);
                    break;
                }
            }
        };

        $that.deleteSelected = function () {
            var arrChk = $("input[name='chk_productList']:checked", $that.data_container);
            $(arrChk).each(function () {
                var $this = $(this);
                $that.deleteObject($this.attr("proId"), $this.attr("skuId"));
            });
            $that.show();
        };

        $that.clearSelected = function () {
            $("input[name='chk_productList']", $that.data_container).attr("checked", false);
        };

        $that.selectAll = function () {
            $("input[name='chk_productList']", $that.data_container).attr("checked", true);
        };

        $that.getObjects = function () {
            return $that.objects;
        };

        $that.equals = function (theObjects) {
            var objs1 = $that.objects || {};
            var objs2 = theObjects || {};
            if (objs1.length != objs2.length) {
                return false;
            }
            for (var i = 0; i < objs1.length; i++) {
                var obj1 = objs1[i];
                var found = false;
                for (var j = 0; j < objs2.length; j++) {
                    var obj2 = objs2[j];
                    if (obj1.id == obj2.id && obj1.name == obj2.name) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    return false;
                }
            }
            return true;
        };

        $(".partProduct_sort", $that.data_container.parent()).click(function () {
            $that.reSort();
        });

        $(".chk_select_all", $that.data_container).live("click", function () {
            if ($(this).attr("checked") == "checked") {
                $that.selectAll();
            } else {
                $that.clearSelected();
            }
        });

        $(".posInput", $that.data_container).live("blur", function () {
            var $this = $(this);
            var skuId = $this.attr("skuId");
            var proId = $this.attr("proId");
            var pos = $this.val();
            for (var i = 0; i < $that.objects.length; i++) {
                var p = $that.objects[i];
                if (proId == p.id && skuId == p.skuId) {
                    p.pos = pos;
                    $that.objects[i] = p;
                    break;
                }
            }
        });

        $(".selector_select_all", $that.data_container.parent()).click(function () {
            $that.selectAll();
        });
        $(".selector_del", $that.data_container.parent()).click(function () {
            $that.deleteSelected();
        });
        $(".selector_unselect_all", $that.data_container.parent()).click(function () {
            $that.clearSelected();
        });

    };
    $.FreeGroupProductSelector = FreeGroupProductSelector;

})(window.jQuery);