(function($){
    "use strict"; // jshint ;_;


    var ObjectListContainer = function(e,params){
        this.elem = $(e);
        this.params =  params || {};
        var $that = this;

        /*
         [
         [{id:catId, name:fullpath},{id:catId, name:fullpath},{id:catId, name:fullpath}],
         [{id:catId, name:fullpath},{id:catId, name:fullpath},{id:catId, name:fullpath}]
         ]
         */
        this.objectLists = [];
        var $this = this;
        if(this.params.addUrl){
            var $addElem = $('<a href="' + this.params.addUrl +'" class="colorbox selector_add" >添加</a>');
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
        //pElem.insertAfter(this.elem);
        this.elem.parent().append(pElem);

        $(".selector_select_all",this.elem.parent()).click(function(){$that.selectAll();});
        $(".selector_del",this.elem.parent()).click(function(){$that.deleteSelected();});
        $(".selector_unselect_all",this.elem.parent()).click(function(){$that.clearSelected();});
        $(".selector_multi_line",this.elem.parent()).click(function(){$that.useMultiLine();});
        $(".selector_single_line",this.elem.parent()).click(function(){$that.useSingleLine();});

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
        };

        this.addObjectLists = function(catArray){
            if(!catArray) return;
            for(var i=0; i<catArray.length;i++){
                var r1 =  catArray[i]; //
                var found = false;
                for(var j=0; j<this.objectLists.length; j++){
                    var r = this.objectLists[j];
                    if(this.equal(r1,r)){
                        found = true;
                        this.objectLists[j] = r1;
                        break;
                    }
                }
                if(!found){
                    this.objectLists.push(r1);
                }
            }
            this.show();
        };

        this.show = function(){
            var i = 0;
            var html = "";
            for(i=0; i<this.objectLists.length; i++){
                var p = this.objectLists[i];
                if(i>0){
                    html += "<span class='interTxt'>;</span>";
                }
                if(!p.selected){
                    html+= "<span class='selector' data='" + i + "'><<a href='javascript:void(0)'>";
                }
                else{
                    html+= "<span class='selector selected' data='" + i + "'><a href='javascript:void(0)'>";
                }

                for(var j=0; j< p.length; j++){
                    var c = p[j];
                    if(j>0){
                        html += "<span class='innerTxt'>,</span>";
                    }
                    html+="<span title='" + c.id + "'>" + c.name +"</span>" ;
                }
                html += "</a>> </span>";


            }
            this.elem.html(html);
        };
        this.useMultiLine = function () {
            this.elem.addClass("multiline");
        }

        this.useSingleLine = function () {
            this.elem.removeClass("multiline");
        }
        $(this.elem).keydown(function(event){
            if(event.keyCode == 8) {
                //Backspace
                event.stopPropagation();
                event.preventDefault();
                $this.deleteSelected();
            }
        });

        this.deleteObj = function(idx){
            if(this.objectLists.length>idx){
                this.objectLists.splice(idx,1);
            }

        };

        this.deleteSelected = function(){
            var n = 0;
            $("span.selected",this.elem).each(function(){
                var idx = $(this).attr("data");
                $this.deleteObj(idx - n);
                n++;
            });
            $this.show();
        };

        this.select = function(idx){
            if(this.objectLists.length>idx){
                this.objectLists[idx].selected = true;
            }
        };

        this.unselect = function(idx){
            if(this.objectLists.length>idx){
                this.objectLists[idx].selected = false;
            }
        };

        this.clearSelected = function(){
            $("span.selected",this.elem).each(function(){
                $(this).removeClass("selected");
                var idx = $(this).attr("data");
                $this.unselect(idx);
            });
        };

        this.selectAll = function(){
            $("span.selector",this.elem).each(function(){
                $(this).addClass("selected");
                var idx = $(this).attr("data");
                $this.select(idx);
            });
        };

        this.getObjectLists = function(){
            return this.objectLists;
        };

        $("span.selector",this.elem).live("click",function(){
            $(this).toggleClass("selected");
            var idx = $(this).attr("data");
            $this.select(idx);
        });
    };


    $.ObjectListSelector = ObjectListContainer;

})(window.jQuery);