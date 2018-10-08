/**
 * Created with IntelliJ IDEA.
 * User: zxy
 * Date: 12-5-19
 * Time: 上午1:05
 * To change this template use File | Settings | File Templates.
 */


(function ($) {
    "use strict"; // jshint ;_;


    var ObjectContainer = function (e, params) {
        this.elem = $(e);
        this.objects = [];
        this.params = params || {};
        var $that = this;
        var elemId = this.elem.attr("id");
        window[elemId] = $that;

        if (this.params.addUrl) {
            var addHref = this.params.addUrl + "&columnId=" + this.params.columnId + "&merchantId=" + this.params.merchantId;
            var $addElem = $('<a href="' + addHref + '" class="colorbox selector_add" >添加</a>');
        }
        if ($that.params.editUrl) {
            var $editElem = $('<a href="javascript:void(0)" class="selector_edit">编辑</a>');
        }

        var $delElem = $('<a href="javascript:void(0)" class="selector_del">删除</a>');
        var $selectAllElem = $('<a href="javascript:void(0)" class="selector_select_all">全选</a>');
        var $unselectAllElem = $('<a href="javascript:void(0)" class="selector_unselect_all">全不选</a>');
        var $multiElem = $('<a href="javascript:void(0)" class="selector_multi_line">多行</a>');
        var $singleElem = $('<a href="javascript:void(0)" class="selector_single_line">单行</a>');


        var pElem = $("<p></p>");
        if (this.params.addUrl) {
            pElem.append($addElem);
        }
        if(this.params.editUrl){
            pElem.append($editElem);
        }
        pElem.append($delElem);
        pElem.append($selectAllElem);
        pElem.append($unselectAllElem);
        pElem.append($multiElem);
        pElem.append($singleElem);
        //pElem.insertAfter(this.elem);
        this.elem.parent().append(pElem);
        this.pElem = pElem;
        this.customMenuCount = 0;


//        $delElem.click($that.deleteSelected);
//        $selectAllElem.click($that.selectAll);
//        $unselectAllElem.click($that.clearSelected);
//        $multiElem.click($that.useMultiLine);
//        $singleElem.click($that.useSingleLine);


        this.addMenu = function (name, action) {
            var className = 'customMenu' + this.customMenuCount++;
            var html = "<a href='javascript:void(0)' class='" + className + "'>" + name + "</a>";
            //var $menu = $(html);
            //this.pElem.append($menu);
            $(".selector_unselect_all", this.pElem).after(html);

            $("." + className, this.elem.parent()).click(function () {
                action($that.getSelectedObjects(), $that.getObjects());
            });

        }

        this.addObjects = function (objectArray) {
            if (!objectArray) return;
            for (var i = 0; i < objectArray.length; i++) {
                var p1 = objectArray[i];
                var found = false;
                for (var j = 0; j < this.objects.length; j++) {
                    var p = this.objects[j];
                    if (p1.id == p.id) {
                        found = true;
                        this.objects[j] = p1;
                        break;
                    }
                }
                if (!found) {
                    this.objects.push(p1);
                }
            }
            this.show();
        }

        this.useMultiLine = function () {
            this.elem.addClass("multiline");
        }

        this.useSingleLine = function () {
            this.elem.removeClass("multiline");
        }

        this.show = function () {
            if ($that.params.checkRuleUrl) {
                $that.doShow();
            } else {
                $that.showContent(this.objects);
            }
        }

        this.doShow = function () {
            var postData = {};
            postData.merchantId = $that.params.merchantId;
            postData.columnId = $that.params.columnId;
            postData.objects = $.toJSON(this.objects);
            $.ajax({
                    url: $that.params.checkRuleUrl,
                    type: "post",
                    data: postData,
                    dataType: 'json',
                    success: function (data) {
                        if(data.state == "0"){
                            var showObjects = data.showObjects;
                            if (showObjects) {
                                $that.showContent(showObjects);
                            }
                        }else{
                            alert(data.msg);
                        }
                    }
                }
            );
        }

        this.showContent = function (objects) {
            var i = 0;
            var html = "";
            var titleTips = "按住【Ctrl】再点击可查看详细";
            for (i = 0; i < objects.length; i++) {
                var p = objects[i];
                var name;
                if(p.nameTips){
                    name = "<span class='nameTips'>["+p.nameTips+"]</span>"+ p.name;
                } else{
                    name = p.name;
                }
                if (!p.selected) {
                    html += "<span class='selector' data='" + p.id + "'><a href='javascript:void(0)'><span class='innerTxt' title='" + titleTips + "'>&lt;" + name + "&gt;</span>;</a></span>";
                }
                else {
                    html += "<span class='selector selected' data='" + p.id + "'><a href='javascript:void(0)'><span class='innerTxt' title='" + titleTips + "'>&lt;" + name + "&gt;</span></a>;</span>";
                }
            }
            this.elem.html(html);
        }

        $(this.elem).keydown(function (event) {
            if (event.keyCode == 8) {
                //Backspace
                event.stopPropagation();
                event.preventDefault();
                $that.deleteSelected();
            }
        });

        this.deleteObject = function (productId) {
            for (var i = 0; i < this.objects.length; i++) {
                var p = this.objects[i];
                if (p.id == productId) {
                    this.objects.splice(i, 1);
                    break;
                }
            }
        }

        this.deleteSelected = function () {
            $("span.selected", this.elem).each(function () {
                var pid = $(this).attr("data");
                $that.deleteObject(pid);
            });
            $("span.selected", this.elem).remove();
        }

        this.editSelected = function () {
            var pid = $("span.selected:first", this.elem).attr("data");
            if (pid) {
                if ($that.params.editUrl) {
                    var editHref = $that.params.editUrl + "?id=" + pid + "&columnId=" + $that.params.columnId + "&merchantId=" + $that.params.merchantId;
                    $.colorbox({href:editHref, iframe:true, width:"100%", height:"100%"})
                }
            } else {
                alert("请选择要编辑的规则");
            }
        }

        this.getSelectedObjects = function () {
            var result = [];
            for (var i = 0; i < this.objects.length; i++) {
                var p = this.objects[i];
                if (p.selected == true) {
                    result.push(p);
                }
            }
            return result;
        }

        this.select = function (productId) {
            for (var i = 0; i < this.objects.length; i++) {
                var p = this.objects[i];
                if (p.id == productId) {
                    p.selected = true;
                    break;
                }
            }
        }

        this.toggle = function (productId) {
            for (var i = 0; i < this.objects.length; i++) {
                var p = this.objects[i];
                if (p.id == productId) {
                    if (p.selected != true) {
                        p.selected = true;
                    }
                    else {
                        p.selected = false;
                    }
                    break;
                }
            }
        }

        this.unselect = function (productId) {
            for (var i = 0; i < this.objects.length; i++) {
                var p = this.objects[i];
                if (p.id == productId) {
                    p.selected = false;
                    break;
                }
            }
        }

        this.clearSelected = function () {
            $("span.selected", $that.elem).each(function () {
                $(this).removeClass("selected");
                var pid = $(this).attr("data");
                $that.unselect(pid);
            });
        }

        this.selectAll = function () {
            $("span.selector", $that.elem).each(function () {
                $(this).addClass("selected");
                var pid = $(this).attr("data");
                $that.select(pid);
            });
        }

        this.getObjects = function () {
            return this.objects;
        }

        this.equals = function (theObjects) {
            var objs1 = this.objects || {};
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
        }

        $(".selector_select_all", this.elem.parent()).click(function () {
            $that.selectAll();
        });
        $(".selector_edit", this.elem.parent()).click(function () {
            $that.editSelected();
        });
        $(".selector_del", this.elem.parent()).click(function () {
            $that.deleteSelected();
        });
        $(".selector_unselect_all", this.elem.parent()).click(function () {
            $that.clearSelected();
        });
        $(".selector_multi_line", this.elem.parent()).click(function () {
            $that.useMultiLine();
        });
        $(".selector_single_line", this.elem.parent()).click(function () {
            $that.useSingleLine();
        });

        $("span.selector", this.elem).live("click", function (event) {
            if (!event.ctrlKey) {
                $(this).toggleClass("selected");
                var pid = $(this).attr("data");
                $that.toggle(pid);
            }
            else {
                var pid = $(this).attr("data");
                if ($that.params.editUrl) {
                    var editHref = $that.params.editUrl + "?id=" + pid + "&columnId=" + $that.params.columnId + "&merchantId=" + $that.params.merchantId;
                    $.colorbox({href:editHref, iframe:true, width:"100%", height:"100%"})
                }
            }
        });
    }
    $.ObjectSelector = ObjectContainer;

})(window.jQuery);