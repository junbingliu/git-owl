(function($){
    "use strict"; // jshint ;_;


    var CategoryContainer = function(e,params){
        this.elem = $(e);
        this.categories = [];
        this.params =  params || {};
        var $that = this;
        var elemId = this.elem.attr("id");
        window[elemId] = $that;

        if(this.params.addUrl){
            var addHref = this.params.addUrl + "&columnId=" + this.params.columnId + "&merchantId=" + this.params.merchantId;
            var $addElem = $('<a href="' + addHref + '" class="colorbox selector_add" >添加</a>');
        }

        var $delElem = $('<a href="javascript:void(0)" class="selector_del">删除</a>');
        var $selectAllElem = $('<a href="javascript:void(0)" class="selector_select_all">全选</a>');
        var $unselectAllElem = $('<a href="javascript:void(0)" class="selector_unselect_all">全不选</a>');
        var $multiElem = $('<a href="javascript:void(0)" class="selector_multi_line">多行</a>');
        var $singleElem = $('<a href="javascript:void(0)" class="selector_single_line">单行</a>');


        var pElem = $("<p></p>");
        if(this.params.addUrl){
            pElem.append($addElem);
        }
        pElem.append($delElem);
        pElem.append($selectAllElem);
        pElem.append($unselectAllElem);
        pElem.append($multiElem);
        pElem.append($singleElem);
        this.elem.parent().append(pElem);

        this.equal = function(c1,c2){
            if(c1.length!=c2.length){
                return false;
            }
            for(var i=0; i<c1.length; i++){
                var cc1 = c1[i] ;
                var found = false;
                for(var j=0; j<c2.length; j++){
                    var cc2 = c2[j];
                    if(cc1.id==cc2.id){
                        found = true;
                        break;
                    }
                }
                if(!found){
                    return false;
                }
            }
            return true;
        }

        this.addCategories = function(catArray){
            if(!catArray) return;
            for(var i=0; i<catArray.length;i++){
                var r1 =  catArray[i]; //
                var found = false;
                for(var j=0; j<this.categories.length; j++){
                    var r = this.categories[j];
                    if(this.equal(r1,r)){
                        found = true;
                        this.categories[j] = r1;
                        break;
                    }
                }
                if(!found){
                    this.categories.push(r1);
                }
            }
            this.show();
        }

        this.show = function(){
            var i = 0;
            var html = "";
            for(i=0; i<this.categories.length; i++){
                var p = this.categories[i];
                if(i>0){
                    html += "<span class='interTxt'>或者</span>";
                }
                if(!p.selected){
                    html+= "<span class='selector' data='" + i + "'><a href='javascript:void(0)'>";
                }
                else{
                    html+= "<span class='selector selected' data='" + i + "'><a href='javascript:void(0)'>";
                }

                for(var j=0; j< p.length; j++){
                    var c = p[j];
                    if(j>0){
                        html += "<span class='innerTxt'>且</span>";
                    }
                    html+="" + c.name ;
                }
                html += "</a></span>";


            }
            this.elem.html(html);


        }

        $(this.elem).keydown(function(event){
            if(event.keyCode == 8) {
                //Backspace
                event.stopPropagation();
                event.preventDefault();
                $that.deleteSelected();
            }
        });

        this.deleteRule = function(idx){
             if(this.categories.length>idx){
                this.categories.splice(idx,1);
             }

        }

        this.deleteSelected = function(){
            var n = 0;
            $("span.selected",this.elem).each(function(){
                var idx = $(this).attr("data");
                $that.deleteRule(idx - n);
                n++;
            });
            $that.show();
        }

        this.select = function(idx){
            if(this.categories.length>idx){
                this.categories[idx].selected = true;
            }
        }

        this.unselect = function(idx){
            if(this.categories.length>idx){
                this.categories[idx].selected = false;
            }
        }

        this.clearSelected = function(){
            $("span.selected",this.elem).each(function(){
                $(this).removeClass("selected");
                var idx = $(this).attr("data");
                $that.unselect(idx);
            });
        }

        this.selectAll = function(){
            $("span.selector",this.elem).each(function(){
                $(this).addClass("selected");
                var idx = $(this).attr("data");
                $that.select(idx);
            });
        }

        this.useMultiLine = function(){
            this.elem.addClass("multiline");
        }

        this.useSingleLine = function(){
            this.elem.removeClass("multiline");
        }

        this.getCategories = function(){
            return this.categories;
        }

        $(".selector_select_all",this.elem.parent()).click(function(){$that.selectAll();});
        $(".selector_del",this.elem.parent()).click(function(){$that.deleteSelected();});
        $(".selector_unselect_all",this.elem.parent()).click(function(){$that.clearSelected();});
        $(".selector_multi_line",this.elem.parent()).click(function(){$that.useMultiLine();});
        $(".selector_single_line",this.elem.parent()).click(function(){$that.useSingleLine();});

        $("span.selector",this.elem).live("click",function(){
            $(this).toggleClass("selected");
            var idx = $(this).attr("data");
            $that.select(idx);
        });
    }


    $.CategorySelector = CategoryContainer;

})(window.jQuery);