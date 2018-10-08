/**
 * Created with IntelliJ IDEA.
 * User: zsl
 * Date: 14-3-2
 * Time: 下午22:20
 * To change this template use File | Settings | File Templates.
 */
(function ($) {
    "use strict"; // jshint ;_;
    var FreeGroupCart = function (initconfigs) {
        if (!initconfigs) {
            throw "initconfigs is undefined";
        }
        var $that = this;
        $that.freeGroupId = initconfigs.freeGroupId ? initconfigs.freeGroupId : undefined;
        $that.getFreeGroupUrl = initconfigs.getFreeGroupUrl ? initconfigs.getFreeGroupUrl : undefined;
        $that.getSelectedProductsUrl = initconfigs.getSelectedProductsUrl ? initconfigs.getSelectedProductsUrl : undefined;
        $that.reLoadSelectedProductsAfterEvent = initconfigs.reLoadSelectedProductsAfterEvent ? initconfigs.reLoadSelectedProductsAfterEvent : undefined;

        $that.freeGroup = {};
        $that.freeGroup.id = $that.freeGroupId;
        $that.freeGroup.fUnitPrice = "0.00"; //套餐价
        $that.freeGroup.fTotalOriPrice = "0.00"; //子商品原总价
        $that.freeGroup.fTotalSavePrice = "0.00"; //总优惠
//        $that.freeGroup.parts = parts; //[]

        $that.addPartProduct = function (partId, productId, skuId) {
            if (!partId || !productId || !skuId) {
                return false;
            }
            if (!$that.isCanAddProduct) {
                return false;
            }
            for (var i = 0; i < $that.freeGroup.parts.length; i++) {
                var part = $that.freeGroup.parts[i];
                if (part.id == partId) {
                    var selectedProducts = part.selectedProducts;
                    if (!selectedProducts) {
                        selectedProducts = [];
                    }
                    if (selectedProducts.length < part.amount) {
                        var found = false;
                        for (var j = 0; j < selectedProducts.length; j++) {
                            var p = selectedProducts[j];
                            if (productId == p.id && skuId == p.skuId) {
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            var product = {};
                            product.id = productId;
                            product.skuId = skuId;
                            product.amount = "1";//默认是一件
                            selectedProducts.push(product);
                        }
                    } else {
                        alert(part.partName + "只能选择" + part.amount + "件");
                        return false;
                    }
                    part.selectedProducts = selectedProducts;
                    $that.freeGroup.parts[i] = part;
                    break;
                }
            }
            return true;
        };
        $that.deletePartProduct = function (partId, productId, skuId) {
            if (!partId || !productId || !skuId) {
                return false;
            }
            for (var i = 0; i < $that.freeGroup.parts.length; i++) {
                var part = $that.freeGroup.parts[i];
                if (part.id == partId) {
                    var selectedProducts = part.selectedProducts;
                    if (!selectedProducts) {
                        selectedProducts = [];
                    }
                    for (var j = 0; j < selectedProducts.length; j++) {
                        var p = selectedProducts[j];
                        if (productId == p.id && skuId == p.skuId) {
                            selectedProducts.splice(j, 1);
                            break;
                        }
                    }
                    break;
                }
            }
            return true;
        };
        $that.isCanAddProduct = function (partId) {
            var part = $that.getPart(partId);
            if (!part) {
                return false;
            }
            var selectedProducts = part.selectedProducts;
            if (!selectedProducts) {
                selectedProducts = [];
            }
            if (selectedProducts.length >= part.amount) {
                return false;
            }
            return true;
        };

        $that.isFull = function () {
            var msgObj = {};
            for (var i = 0; i < $that.freeGroup.parts.length; i++) {
                var part = $that.freeGroup.parts[i];
                if (!part) {
                    return false;
                }
                var selectedProducts = part.selectedProducts;
                if (!selectedProducts) {
                    selectedProducts = [];
                }
                var remainderCount = part.amount - selectedProducts.length;
                if (selectedProducts.length != part.amount) {
                    msgObj.remainderCount = remainderCount;
                    msgObj.partName = part.partName;
                    msgObj.state = 0;
                    return msgObj;
                }
            }
            msgObj.remainderCount = 0;
            msgObj.partName = "";
            msgObj.state = 2;
            return msgObj;
        };
        $that.getPart = function (partId) {
            for (var i = 0; i < $that.freeGroup.parts.length; i++) {
                var part = $that.freeGroup.parts[i];
                if (part.id == partId) {
                    return part;
                }
            }
            return undefined;
        };

        $that.getFreeGroup = function () {
            return $that.freeGroup;
        };

        $that.getParts = function () {
            return $that.freeGroup.parts;
        };

        $that.slimSelectedProducts = function () {
            for (var i = 0; i < $that.freeGroup.parts.length; i++) {
                var part = $that.freeGroup.parts[i];
                if (!part) {
                    return false;
                }
                var selectedProducts = part.selectedProducts;
                if (!selectedProducts) {
                    selectedProducts = [];
                }
                for (var j = 0; j < selectedProducts.length; j++) {
                    var product = {};
                    product.id = selectedProducts[j].id;
                    product.skuId = selectedProducts[j].skuId;
                    product.amount = selectedProducts[j].amount;
                    selectedProducts[j] = product;
                }
                $that.freeGroup.parts[i] = part;
            }
        };

        $that.reLoadSelectedProducts = function () {
            if (!$that.getSelectedProductsUrl) {
                throw "getSelectedProductsUrl is undefined";
            }
            $that.slimSelectedProducts();
            var parts = $.toJSON($that.freeGroup.parts);
            $.ajax({
                    url: $that.getSelectedProductsUrl,
                    type: "post",
                    data: {id:$that.freeGroup.id, parts: parts},
                    dataType: 'json',
                    success: function (data) {
                        if (data.state == "ok") {
                            $that.freeGroup.fTotalOriPrice = data.fTotalOriPrice;
                            $that.freeGroup.fTotalSavePrice = data.fTotalSavePrice;
                            $that.freeGroup.parts = data.parts;
                            if ($that.reLoadSelectedProductsAfterEvent) {
                                $that.reLoadSelectedProductsAfterEvent.fireEvent();
                            }
                        } else {
                            alert(data.msg);
                        }
                    }
                }
            );
        };

        $that.init = function () {
            if (!$that.getFreeGroupUrl) {
                throw "getFreeGroupUrl is undefined";
            }
            $.ajax({
                    url: $that.getFreeGroupUrl,
                    type: "post",
                    data: {id: $that.freeGroup.id},
                    dataType: 'json',
                    success: function (data) {
                        if (data.state == "ok") {
                            $that.freeGroup.fUnitPrice = data.fUnitPrice;
                            $that.freeGroup.parts = data.parts;
                        } else {
                            throw "init load FreeGroup Object error";
                        }
                    }
                }
            );
        };
        $that.init();
    };
    $.FreeGroupCart = FreeGroupCart;
})(window.jQuery);