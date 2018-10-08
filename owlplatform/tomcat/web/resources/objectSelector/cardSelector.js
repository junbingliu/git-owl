/**
 * Created with IntelliJ IDEA.
 * User: zsl
 * Date: 12-6-7
 * Time: 下午5:05
 * To change this template use File | Settings | File Templates.
 */

(function ($) {
    "use strict"; // jshint ;_;


    var CardContainer = function (e, params) {
        this.elem = $(e); //cardSelectedDiv
        this.objects = [];
        this.params = params || {};
        var $that = this;
        var cardSelectedId = this.elem.attr("id");

        window[cardSelectedId] = $that;

        if (this.params.addUrl) {
            var $addElem = $('<a href="javascript:void(0)" class="selector_add" >添加</a>');
        }
        var $delElem = $('<a href="javascript:void(0)" class="selector_del">删除</a>');
        var $selectAllElem = $('<a href="javascript:void(0)" class="selector_select_all">全选</a>');
        var $unselectAllElem = $('<a href="javascript:void(0)" class="selector_unselect_all">全不选</a>');

        var pElem = $("<p></p>");

        if (this.params.addUrl) {
            pElem.append($addElem);
        }
        pElem.append($delElem);
        pElem.append($selectAllElem);
        pElem.append($unselectAllElem);
        this.elem.parent().append(pElem);

        $addElem.click(function () {
            var addHref = $that.params.addUrl + "?p=" + cardSelectedId + "&columnId=" + $that.params.columnId + "&merchantId=" + $that.params.merchantId;
            $.colorbox({href:addHref, iframe:true, width:"100%", height:"100%"});
        });

        this.addCardBatches = function (objectArray) {
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

        this.show = function () {
            var i = 0;
            var html = "";
            for (i = 0; i < this.objects.length; i++) {
                var p = this.objects[i];
                if (!p.selected) {
                    html += "<span class='selector' data='" + p.id + "'><a href='javascript:void(0)'><span class='innerTxt' title='" + p.id + "'>&lt;" + p.name + "&gt;</span>;</a></span>";
                }
                else {
                    html += "<span class='selector selected' data='" + p.id + "'><a href='javascript:void(0)'><span class='innerTxt' title='" + p.id + "'>&lt;" + p.name + "&gt;</span></a>;</span>";
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

        this.deleteProduct = function (productId) {
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
                $that.deleteProduct(pid);
            });
            $("span.selected", this.elem).remove();
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
            $("span.selected", this.elem).each(function () {
                $(this).removeClass("selected");
                var pid = $(this).attr("data");
                $that.unselect(pid);
            });
        }

        this.selectAll = function () {
            $("span.selector", this.elem).each(function () {
                $(this).addClass("selected");
                var pid = $(this).attr("data");
                $that.select(pid);
            });
        }

        this.getObjects = function () {
            return this.objects;
        }

        this.setObjects = function(theObjects) {
            this.objects = theObjects
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
        $(".selector_del", this.elem.parent()).click(function () {
            $that.deleteSelected();
        });
        $(".selector_unselect_all", this.elem.parent()).click(function () {
            $that.clearSelected();
        });

        $("#" + cardSelectedId + " span.selector").live("click", function (event) {
            $(this).toggleClass("selected");
            var pid = $(this).attr("data");
            $that.toggle(pid);
        });
    }
    $.CardSelector = CardContainer;

})(window.jQuery);


function getCardRules() {
    var $ops_elem = $(".snd_cards_ops");
    var $sections = $(".sections", $ops_elem);
    var $ranges = [];
    $(".section", $ops_elem).each(function () {
        var $this = $(this);
        var cardSelectedDiv = $(".cardSelected_txt", $this);
        var cardSelectedId = cardSelectedDiv.attr("id");
        var cardContainer = window[cardSelectedId];

        var $beginAmount = $(".beginAmount", $this).val();
        var $endAmount = $(".endAmount", $this).val();
        var cardbatch = cardContainer.getObjects();
        var $amount = $(".amount", $this).val();
        var $range = {
            beginAmount:$beginAmount,
            endAmount:$endAmount,
            cardBatches:cardbatch,
            amount:$amount
        };
        $ranges.push($range);
    });

    $(".final-section", $ops_elem).each(function () {
        var $this = $(this);
        var cardSelectedDiv = $(".cardSelected_txt", $this);
        var cardSelectedId = cardSelectedDiv.attr("id");
        var cardContainer = window[cardSelectedId];

        var $everyAmount = $(".everyAmount", $this).val();
        if ($everyAmount) {
            var cardbatch = cardContainer.getObjects();
            var $amount = $(".amount", $this).val();
            var $range = {
                everyAmount:$everyAmount,
                cardBatches:cardbatch,
                amount:$amount
            };
            $ranges.push($range);
        }
    });
    return $ranges;
}

function setCardRules(cardRanges) {
    if (!cardRanges) {
        return;
    }
    if (cardRanges.length == 0) {
        return;
    }
    var $ops_elem = $(".snd_cards_ops");
    var $sections = $(".sections", $ops_elem);

    var cardRange = cardRanges[0];
    var $section = $(".section", $sections);
    $(".beginAmount", $section).val(cardRange.beginAmount);
    $(".endAmount", $section).val(cardRange.endAmount);
    $(".amount", $section).val(cardRange.amount);

    var cardContainer = window["cardSelectedCards"];
    cardContainer.setObjects(cardRange.cardBatches);
    cardContainer.show();

    window["_curCardSectionNumber"] = cardRanges.length;
    for (var i = 1; i < cardRanges.length - 1; i++) {
        cardRange = cardRanges[i];
        $section = $(".section:last", $sections).clone();

        var cardSelectedId = "cardSelectedCards" + i;
        var cardSelectedDiv = $(".cardSelected_txt", $section);
        cardSelectedDiv.attr("id", cardSelectedId);
        $("p", $section).remove();

        cardContainer = new $.CardSelector(cardSelectedDiv, {addUrl:"../common/cardBatchSelector.jsp", columnId:columnId, merchantId:merchantId});
        cardContainer.setObjects(cardRange.cardBatches);
        cardContainer.show();

        $(".beginAmount", $section).val(cardRange.beginAmount);
        $(".endAmount", $section).val(cardRange.endAmount);
        $(".amount", $section).val(cardRange.amount);
        $section.appendTo($sections);
    }
    if (cardRanges.length > 1) {
        var curNum = cardRanges.length - 1;
        cardRange = cardRanges[curNum];
        if (typeof cardRange.everyAmount == 'undefined' || cardRange.everyAmount == null) {
            $section = $(".section:last", $sections).clone();

            var cardSelectedId = "cardSelectedCards" + curNum;
            var cardSelectedDiv = $(".cardSelected_txt", $section);
            cardSelectedDiv.attr("id", cardSelectedId);
            $("p", $section).remove();

            cardContainer = new $.CardSelector(cardSelectedDiv, {addUrl:"../common/cardBatchSelector.jsp", columnId:columnId, merchantId:merchantId});
            cardContainer.setObjects(cardRange.cardBatches);
            cardContainer.show();

            $(".beginAmount", $section).val(cardRange.beginAmount);
            $(".endAmount", $section).val(cardRange.endAmount);
            $(".amount", $section).val(cardRange.amount);
            $section.appendTo($sections);
        }
        else {
            $section = $(".final-section", $ops_elem);

            var cardContainer = window["finalCardSelectedCards"];
            cardContainer.setObjects(cardRange.cardBatches);
            cardContainer.show();

            $(".everyAmount", $section).val(cardRange.everyAmount);
            $(".amount", $section).val(cardRange.amount);
        }
    }

    if ($(".range-delete", $ops_elem).size() > 1) {
        $(".range-delete", $ops_elem).show();
    }
}