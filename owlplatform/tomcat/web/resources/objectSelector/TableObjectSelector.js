/**
 * Created with IntelliJ IDEA.
 * User: zsl
 * Date: 12-7-14
 * Time: 上午11:20
 * To change this template use File | Settings | File Templates.
 */


(function ($) {
    "use strict"; // jshint ;_;


    var TableObjectContainer = function (e, params) {
        this.elem = $(e);
        this.objects = [];
        this.params = params || {};
        var $that = this;
        var elemId = $that.elem.attr("id");
        window[elemId] = $that;
        var amountUnit = "件";
        if($that.params.amountUnit){
            amountUnit = $that.params.amountUnit;
        }

        if ($that.params.addUrl) {
            var addHref = $that.params.addUrl + "&columnId=" + $that.params.columnId + "&merchantId=" + $that.params.merchantId;
            var $addElem = $('<a href="' + addHref + '" class="colorbox selector_add" >添加</a>');
        }

        var $delElem = $('<a href="javascript:void(0)" class="selector_del">删除</a>');
        var $selectAllElem = $('<a href="javascript:void(0)" class="selector_select_all">全选</a>');
        var $unselectAllElem = $('<a href="javascript:void(0)" class="selector_unselect_all">全不选</a>');

        var pElem = $("<p></p>");
        if ($that.params.addUrl) {
            pElem.append($addElem);
        }
        pElem.append($delElem);
        pElem.append($selectAllElem);
        pElem.append($unselectAllElem);
        $that.elem.parent().append(pElem);
        $that.pElem = pElem;
        $that.customMenuCount = 0;


        $that.addMenu = function (name, action) {
            var className = 'customMenu' + $that.customMenuCount++;
            var html = "<a href='javascript:void(0)' class='" + className + "'>" + name + "</a>";
            $(".selector_unselect_all", $that.pElem).after(html);

            $("." + className, $that.elem.parent()).click(function () {
                action($that.getSelectedObjects(), $that.getObjects());
            });

        };

        $that.addObjects = function (objectArray) {
            if (!objectArray) return;
            for (var i = 0; i < objectArray.length; i++) {
                var p1 = objectArray[i];
                var found = false;
                for (var j = 0; j < $that.objects.length; j++) {
                    var p = $that.objects[j];
                    if (p1.id == p.id) {
                        found = true;
                        if (!p1.amount) {
                            p1.amount = p.amount;
                        }
                        $that.objects[j] = p1;
                        break;
                    }
                }
                if (!found) {
                    if (!p1.amount) {
                        p1.amount = 1;
                    }
                    $that.objects.push(p1);
                }
            }
            $that.show();
        };

        $that.show = function () {
            var html = "<table class='table table-bordered table-striped' style='margin-bottom: 5px;'><tbody>";
            var objectLength = $that.objects.length;
            if (objectLength > 0) {
                for (var i = 0; i < objectLength; i++) {
                    var p = $that.objects[i];
                    html += "<tr>";
                    html += "<td width='16'><input type='checkbox' name='chk_productPresentList' value='" + p.id + "'></td>";
                    html += "<td width='560' title='" + p.id + "'>" + p.name + (p.skuIds && p.skuIds.length > 0 ? "<font color='red'>[" + p.skuIds + "]</font>" : "") + "</td>";
                    html += "<td><div class='input-append'><input type='text' class='amount presentAmount' data='" + p.id + "' value='" + p.amount + "' style='width:40px'/><span class='add-on amountUnitTitle'>" + amountUnit + "</span><div></td>";
                    html += "</tr>";
                }
            }else{
                html += "<tr>";
                html += "<td><span class='mutedTip'>您尚未添加赠品</span></td>";
                html += "</tr>";
            }
            html += "</tbody></table>";
            $that.elem.html(html);
        };

        $that.deleteObject = function (productId) {
            for (var i = 0; i < $that.objects.length; i++) {
                var p = $that.objects[i];
                if (p.id == productId) {
                    $that.objects.splice(i, 1);
                    break;
                }
            }
        };

        $that.deleteSelected = function () {
            var arrChk = $("input[name='chk_productPresentList']:checked", $that.elem);
            $(arrChk).each(function () {
                var $this = $(this);
                $that.deleteObject($this.val());
            });
            $that.show();
        };

        $that.clearSelected = function () {
            $("input[name='chk_productPresentList']", $that.elem).attr("checked", false);
        };

        $that.selectAll = function () {
            $("input[name='chk_productPresentList']", $that.elem).attr("checked", true);
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

        $(".selector_select_all", $that.elem.parent()).click(function () {
            $that.selectAll();
        });
        $(".selector_del", $that.elem.parent()).click(function () {
            $that.deleteSelected();
        });
        $(".selector_unselect_all", $that.elem.parent()).click(function () {
            $that.clearSelected();
        });
        $(".presentAmount", this.elem).live("blur", function () {
            var $this = $(this);
            var id = $this.attr("data");
            var value = $this.val();
            $that.updateAmount(id, value);
        });

        $that.updateAmount = function (id, amount) {
            var objectLength = $that.objects.length;
            var newObjects = [];
            for (var i = 0; i < objectLength; i++) {
                var p = $that.objects[i];
                if (id == p.id) {
                    p.amount = amount;
                }
                newObjects.push(p);
            }
            $that.objects = newObjects;
            $that.show();
        };

       $that.setUnitTitle = function(unitTitle) {
           amountUnit = unitTitle;
           $(".amountUnitTitle").html(unitTitle);
       }

    };
    $.TableObjectSelector = TableObjectContainer;

})(window.jQuery);