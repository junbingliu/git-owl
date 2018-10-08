(function($){
    "use strict"; // jshint ;_;


    var ProductContainer = function(e){
        this.elem = $(e);
        this.products = [];
        var $this = this;
        this.addProducts = function(productArray){
            if(!productArray) return;
            for(var i=0; i<productArray.length;i++){
                var p1 =  productArray[i];
                var found = false;
                for(var j=0; j<this.products.length; j++){
                    var p = this.products[j];
                    if(p1.id== p.id){
                        found = true;
                        break;
                    }
                }
                if(!found){
                    this.products.push(p1);
                }
            }
            this.show();
        }

        this.show = function(){
            var i = 0;
            var html = "";
            for(i=0; i<this.products.length; i++){
                var p = this.products[i];
                if(!p.selected){
                    html+= "<span class='selector' data='" + p.id + "'><a href='javascript:void(0)'>" + p.id + "<span class='innerTxt'>&lt;" + p.name + "&gt;</span>;</a></span>";
                }
                else{
                    html+= "<span class='selector selected' data='" + p.id + "'><a href='javascript:void(0)'>" + p.id + "<span class='innerTxt'>&lt;" + p.name + "&gt;</span></a>;</span>";
                }
            }
            this.elem.html(html);

        }

        $(this.elem).keydown(function(event){
            if(event.keyCode == 8) {
                //Backspace
                event.stopPropagation();
                event.preventDefault();
                $this.deleteObject();
            }
        });

        this.deleteProduct = function(productId){
            for(var i=0; i<this.products.length; i++){
                var p = this.products[i];
                if(p.id == productId){
                    this.products.splice(i,1);
                    break;
                }
            }
        }

        this.deleteObject = function(){
            $("span.selected",this.elem).each(function(){
                var pid = $(this).attr("data");
                $this.deleteProduct(pid);
            });
            $("span.selected",this.elem).remove();
        }

        this.select = function(productId){
            for(var i=0; i<this.products.length; i++){
                var p = this.products[i];
                if(p.id == productId){
                    p.selected =true;
                    break;
                }
            }
        }

        this.unselect = function(productId){
            for(var i=0; i<this.products.length; i++){
                var p = this.products[i];
                if(p.id == productId){
                    p.selected = false;
                    break;
                }
            }
        }

        this.clearSelected = function(){
            $("span.selected",this.elem).each(function(){
                $(this).removeClass("selected");
                var pid = $(this).attr("data");
                $this.unselect(pid);
            });
        }

        this.selectAll = function(){
            $("span.selector",this.elem).each(function(){
                $(this).addClass("selected");
                var pid = $(this).attr("data");
                $this.select(pid);
            });
        }

        $("span.selector",this.elem).live("click",function(){
            $(this).toggleClass("selected");
            var pid = $(this).attr("data");
            $this.select(pid);
        });
    }


    $.ProductSelector = ProductContainer;

})(window.jQuery);