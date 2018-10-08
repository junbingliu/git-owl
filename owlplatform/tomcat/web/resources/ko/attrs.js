//与属性相关的类，方法等等
function StandardValue(sv){
    var self = this;
    self.id = ko.observable(sv.id);
    self.name = ko.observable(sv.name);
    self.value = ko.observable(sv.value);
    self.selected = ko.observable(false);
    self.enabled = ko.observable(false);
    self.isValid = ko.observable(sv.isValid);;
}

function InventoryAttr(inventoryAttr){
    var self = this;
    self.name = ko.observable(inventoryAttr.name);
    self.type = ko.observable(inventoryAttr.type);
    self.id = ko.observable(inventoryAttr.id);
    self.userOperation = ko.observable(inventoryAttr.userOperation);
    self.skuSelectListener = null;

    var validStandardValues = [];
    if(inventoryAttr.standardValues){
        $.each(inventoryAttr.standardValues,function(idx,sv){
            if(sv.isValid){
                validStandardValues.push(new StandardValue(sv));
            }
        });
    }


    self.standardValues = ko.observableArray(validStandardValues);
    self.getSelectedValue = function(){
        for(var i=0; i<self.standardValues().length; i++){
            var sv = self.standardValues()[i];
            if(sv.selected()){
                return sv.id();
            }
        }
        return null;
    }
    self.validStandardValues = ko.computed(function(){
        var result = [];
        $.each(self.standardValues(),function(idx,sv){
            if(sv.isValid){
                result.push(sv);
            }
        });
        return result;
    });
}


function Sku(sku){
    var self = this;
    self.id = ko.observable(sku.id);
    self.skuId = ko.observable(sku.skuId);
    self.isHead = ko.observable(sku.isHead);
    self.attrs =sku.attrs;
}

function SkuSelector(){
    var self = this;
    self.inventoryAttrs = ko.observableArray();
    self.skus = ko.observableArray();
    self.init = function(skus,inventoryAttrs){
        self.skus([]);
        if(skus){
            self.skus ($.map(skus,function(sku,idx){
                return new Sku(sku);
            }));
        }

        self.inventoryAttrs([]);
        if(inventoryAttrs){
            self.inventoryAttrs ($.map(inventoryAttrs,function(attr){
                //判断某个attr的standardValue是否是有效的，有效的定义是有一个sku包含这个standardValue
                if(attr.standardValues){
                    $.each(attr.standardValues,function(idx,sv){
                        //遍历每个sku,看看是否包含这个sv
                        sv.isValid = false;
                        $.each(skus,function(idx,sku){
                            if(sku.attrs){
                                var skuSv = sku.attrs[attr.id];
                                if(skuSv == sv.id){
                                    //其中有一个sku的sv与这个sv相同，表明这个sv是一个有效的sv
                                    sv.isValid=true;
                                }
                            }
                        });
                    });
                }
                return new InventoryAttr(attr);
            }));
        }
        self.enableAttrs();
    }

    self.getInventoryAttr = function(attrId){
        for(var i=0; i<self.inventoryAttrs().length; i++){
            var attr = self.inventoryAttrs()[i];
            if(attr.id()==attrId){
                return attr;
            }
        }
        return null;
    }

    self.selectedSkuId = function(){
        if(self.skus().length==1){
            return self.skus()[0].id();
        }
        for(var i=0; i<self.skus().length; i++){
            var sku = self.skus()[i];
            if(!sku.attrs || sku.isHead()){
                continue;
            }
            var isMatch = true;
            for(k in sku.attrs){
                var attrId = k;
                var attrValue = sku.attrs[k];
                var inventoryAttr = self.getInventoryAttr(attrId);
                if(!inventoryAttr){
                    isMatch = false;
                    break;
                }
                if(!inventoryAttr.getSelectedValue() ||  inventoryAttr.getSelectedValue()!=attrValue){
                    isMatch = false;
                    break;
                }
            }
            if(isMatch){
                return sku.id();
            }
        }
        return null;
    };

    /*private*/
    self.getValidSkus= function(curAttrId){
        //获得已经选过的属性以后，还能满足条件的所有 skus,排除curAttrId
        var leftSkus = self.skus();
        var validSkus = [];
        $.each(self.inventoryAttrs(),function(idx,inventoryAttr){
            if(inventoryAttr.id()==curAttrId){
                return;
            }
            var v = inventoryAttr.getSelectedValue();
            if(!v){return;}
            $.each(leftSkus,function(index,sku){
                if(sku.attrs && sku.attrs[inventoryAttr.id()] && sku.attrs[inventoryAttr.id()]==v){
                    validSkus.push(sku);
                }
            });
            leftSkus = validSkus;
            validSkus = [];
        });
        return leftSkus;
    }
    self.enableAttrs = function(){
        $.each(self.inventoryAttrs(),function(index,inventoryAttr){
            var curAttrId = inventoryAttr.id();
            var skus = self.getValidSkus(curAttrId);
            $.each(inventoryAttr.standardValues(),function(index,sv){
                //遍历每个剩下的sku,如果某个sku有这个属性，则这个属性可以enable
                sv.enabled(false);
                for(var i=skus.length-1; i>=0; i--){
                    var sku = skus[i];
                    if(!sku.attrs){
                        continue;  //这是 headSku
                    }
                    var v = skus[i].attrs[curAttrId];
                    if(sv.id() == v){
                        sv.enabled(true);
                    }
                }
            });
        });
    }
    self.selectValue = function(sv,attr){
        if(sv.enabled()==false){
            return;
        }
		
		if(sv.selected()){
			sv.selected(false);
			self.enableAttrs();
			return;
		}
		
        $.each(attr.standardValues(),function(index,curSv){
            curSv.selected(false);
        });
        sv.selected(true);
        self.enableAttrs();
        if(self.skuSelectListener){
            var selectedSkuId = self.selectedSkuId();
            if(selectedSkuId){
                self.skuSelectListener(selectedSkuId);
            }
        }
    }


    self.shouldChooseSku= ko.computed(function(){
        if(self.skus().length>1){
            return true;
        }
        else{
            return false;
        }
    });



}