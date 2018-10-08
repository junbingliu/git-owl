var XJ = XJ || {};
!function ($,E) {
      "use strict";
      var Advplace = function (element, options) {
        this.options = $.extend({}, $.fn.gwt_advplace.defaults, options)
        this.$element = $(element)
        //this.$element.on('click.advplace.data-api', $.proxy(this.fire, this))
        this.$element.on('click.advplace.data-api', this.ex(this.fire))
      }
    Advplace.fn = Advplace.prototype;
    Advplace.fn.ex = E.ex;
    Advplace.fn.px = E.px;
        Advplace.fn.checkParam = function () {
            if(!this.options.cid || $.trim(this.options.cid)==''){
                alert("栏目ID为空！");
                return false;
            }
            this.options.title = $.trim(this.options.title);
            return true;
      }
        Advplace.fn.fire = function () {
            if(this.checkParam()){
                //window.parent.gotoGWTAdv();
                window.parent.fire_advplace_list(this.options.cid,this.options.title);
            }
      }

        $.fn.gwt_advplace = function (option) {
        return this.each(function () {
          var $this = $(this)
            , data = $this.data('advplace')
            , options = typeof option == 'object' && option
          if (!data) $this.data('advplace', (data = new Advplace(this, options)))
          if (typeof option == 'string') data[option]()
        })
      }


        $.fn.gwt_advplace.Constructor = Advplace

        $.fn.gwt_advplace.defaults = {
        offset: 0
      }


     /* ADVPLACE DATA-API
      * ============== */

      $(function () {
        $('[data-gwt="advplace"]').each(function () {
          var $gwt = $(this)
            , data = $gwt.data()

          data = data || {}

            $gwt.gwt_advplace(data)
        })
      })


    }(window.jQuery,XJ.Event);


    !function ($,E) {
        "use strict";
        var Adv = function (element, options) {
            this.options = $.extend({}, $.fn.gwt_adv.defaults, options)
            this.$element = $(element)
            //this.$element.on('click.adv.data-api', $.proxy(this.fire, this))
            this.$element.on('click.adv.data-api', this.ex(this.fire))
        }
        Adv.fn = Adv.prototype;
        Adv.fn.ex = E.ex;
        Adv.fn.px = E.px;
        Adv.fn.check_param_one = function () {
            if(!this.options.cid || $.trim(this.options.cid)==''){
                alert("栏目ID为空！");
                return false;
            }
            this.options.title = $.trim(this.options.title);
            return true;
        }

        Adv.fn.check_param_list = function () {
            if(!this.options.cid || $.trim(this.options.cid)==''){
                alert("栏目ID为空！");
                return false;
            }
            if(!this.options.advplaceid || $.trim(this.options.advplaceid)==''){
                alert("广告位ID为空！");
                return false;
            }
            this.options.width = $.trim(this.options.width);
            this.options.height = $.trim(this.options.height);
            this.options.title = $.trim(this.options.title);
            return true;
        }

        Adv.fn.fire = function () {
            this.options.opt = this.options.opt || 'list';
            if(this.options.opt=='one'){
                if(this.check_param_one){
                    window.parent.fire_adv_one(this.options.cid,this.options.title);
                }
            }else if(this.options.opt=='list'){
                if(this.check_param_list()){
                    window.parent.fire_adv_list(this.options.cid,this.options.advplaceid,this.options.width+'',this.options.height+'',this.options.title+'');
                }
            }
        }

        $.fn.gwt_adv = function (option) {
            return this.each(function () {
                var $this = $(this)
                        , data = $this.data('adv')
                        , options = typeof option == 'object' && option
                if (!data) $this.data('adv', (data = new Adv(this, options)))
                if (typeof option == 'string') data[option]()
            })
        }

        $.fn.gwt_adv.Constructor = Adv

        $.fn.gwt_adv.defaults = {
            offset: 0
        }


        /* ADV DATA-API
         * ============== */

        $(function () {
            $('[data-gwt="adv"]').each(function () {
                var $gwt = $(this)
                        , data = $gwt.data()

                data = data || {}

                $gwt.gwt_adv(data)
            })
        })


    }(window.jQuery,XJ.Event);


    !function ($,E) {
        "use strict";
        var PageMgt = function (element, options) {
            this.options = $.extend({}, $.fn.gwt_pagemgt.defaults, options)
            this.$element = $(element)
            //this.$element.on('click.pagemgt.data-api', $.proxy(this.fire, this))
            this.$element.on('click.pagemgt.data-api',this.ex(this.fire))
        }
        PageMgt.fn = PageMgt.prototype;
        PageMgt.fn.ex = E.ex;
        PageMgt.fn.px = E.px;
        PageMgt.fn.check_param = function () {
            if(!this.options.cid || $.trim(this.options.cid)==''){
                alert("栏目ID为空！");
                return false;
            }
            this.options.title = $.trim(this.options.title);
            return true;
        }

        PageMgt.fn.fire = function () {
            if(this.check_param){
                window.parent.fire_pagemgt_list(this.options.cid,this.options.title);
            }
        }

        $.fn.gwt_pagemgt = function (option) {
            return this.each(function () {
                var $this = $(this)
                        , data = $this.data('pagemgt')
                        , options = typeof option == 'object' && option
                if (!data) $this.data('pagemgt', (data = new PageMgt(this, options)))
                if (typeof option == 'string') data[option]()
            })
        }

        $.fn.gwt_pagemgt.Constructor = PageMgt

        $.fn.gwt_pagemgt.defaults = {
            offset: 0
        }


        /* PAGEMGT DATA-API
         * ============== */

        $(function () {
            $('[data-gwt="pagemgt"]').each(function () {
                var $gwt = $(this)
                        , data = $gwt.data()

                data = data || {}

                $gwt.gwt_pagemgt(data)
            })
        })


    }(window.jQuery,XJ.Event);


    !function ($,E) {
        "use strict";
        var Commend = function (element, options) {
            this.options = $.extend({}, $.fn.gwt_commend.defaults, options)
            this.$element = $(element)
            //his.$element.on('click.commend.data-api', $.proxy(this.fire, this))
            this.$element.on('click.commend.data-api', this.ex(this.fire))
        }
        Commend.fn = Commend.prototype;
        Commend.fn.ex = E.ex;
        Commend.fn.px = E.px;
        Commend.fn.check_param = function () {
            if(!this.options.cid || $.trim(this.options.cid)==''){
                alert("栏目ID为空！");
                return false;
            }
            //this.options.title = this.trim(this.options.title);
            this.options.title = $.trim(this.options.title);
            return true;
        }
        Commend.fn.fire = function () {
            this.options.opt = this.options.opt || 'product';
            if(this.options.opt=='product'){
                if(this.check_param()){
                    //XJ.Msg.alert('cid:'+this.options.cid);
                    //XJ.Msg.alert('title:'+this.options.title);
                    window.parent.fire_commend_product(this.options.cid,this.options.title);
                }
            }else if(this.options.opt=='info'){
                if(this.check_param()){
                    window.parent.fire_commend_info(this.options.cid,this.options.title);
                }
            }else if(this.options.opt=='merchant'){
                if(this.check_param()){
                    window.parent.fire_commend_merchant(this.options.cid,this.options.title);
                }
            }else if(this.options.opt=='panic'){
                if(this.check_param()){
                    window.parent.fire_commend_panic(this.options.cid,this.options.title);
                }
            }else if(this.options.opt=='groupon'){
                if(this.check_param()){
                    window.parent.fire_commend_groupon(this.options.cid,this.options.title);
                }
            }else if(this.options.opt=='categoryproduct'){
                if(this.check_param()){
                    window.parent.fire_commend_category_product(this.options.cid,this.options.title);
                }
            }/*else if(this.options.opt=='columnproduct'){
                if(this.check_param()){
                    this.$element.gwt_columnproductcommend(this.options);
                }
            }*/
        }

        $.fn.gwt_commend = function (option) {
            return this.each(function () {
                var $this = $(this)
                        , data = $this.data('commend')
                        , options = typeof option == 'object' && option
                if (!data) $this.data('commend', (data = new Commend(this, options)))
                if (typeof option == 'string') data[option]()
            })
        }

        $.fn.gwt_commend.Constructor = Commend

        $.fn.gwt_commend.defaults = {
            offset: 0
        }


        /* COMMEND DATA-API
         * ============== */

        $(function () {
            $('[data-gwt="commend"]').each(function () {
                var $gwt = $(this)
                        , data = $gwt.data()

                data = data || {}

                $gwt.gwt_commend(data)
            })
        })


    }(window.jQuery,XJ.Event);


/*!function ($,E) {
    "use strict";
    var InfoColumn = function (element, options) {
        this.options = $.extend({}, $.fn.gwt_infocolumn.defaults, options)
        this.$element = $(element)
        this.$element.on('click.infocolumn.data-api',this.ex(this.fire))
    }
    InfoColumn.fn = InfoColumn.prototype;
    InfoColumn.fn.ex = E.ex;
    InfoColumn.fn.px = E.px;
    InfoColumn.fn.check_param = function () {
        if(!this.options.cid || $.trim(this.options.cid)==''){
            alert("栏目ID为空！");
            return false;
        }
        this.options.title = $.trim(this.options.title);
        return true;
    }

    InfoColumn.fn.fire = function () {
        if(this.check_param()){

        }
    }

    $.fn.gwt_infocolumn = function (option) {
        return this.each(function () {
            var $this = $(this)
                    , data = $this.data('infocolumn')
                    , options = typeof option == 'object' && option
            if (!data) $this.data('infocolumn', (data = new InfoColumn(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.gwt_infocolumn.Constructor = InfoColumn

    $.fn.gwt_infocolumn.defaults = {
        offset: 0
    }


    *//* AFFIX DATA-API
     * ============== *//*

    $(window).on('load', function () {
        $('[data-gwt="infocolumn"]').each(function () {
            var $gwt = $(this)
                    , data = $gwt.data()

            data = data || {}

            $gwt.gwt_infocolumn(data)
        })
    })


}(window.jQuery,XJ.Event);*/




!function ($,E) {
    "use strict";
    var Info = function (element, options) {
        this.options = $.extend({}, $.fn.gwt_info.defaults, options)
        this.$element = $(element)
        //this.$element.on('click.pagemgt.data-api', $.proxy(this.fire, this))
        this.$element.on('click.info.data-api',this.ex(this.fire))
    }
    Info.fn = Info.prototype;
    Info.fn.ex = E.ex;
    Info.fn.px = E.px;
    Info.fn.check_param = function () {
        if(!this.options.cid || $.trim(this.options.cid)==''){
            alert("栏目ID为空！");
            return false;
        }
        this.options.title = $.trim(this.options.title);
        return true;
    }

    Info.fn.fire = function () {
        this.options.opt = this.options.opt || 'info';
        if(this.options.opt=='simple'){
            if(this.check_param()){
                window.parent.fire_simple_info(this.options.cid,this.options.title);
            }
        }else{
            if(this.check_param()){
                window.parent.fire_info_list(this.options.cid,this.options.title);
            }
        }
    }

    $.fn.gwt_info = function (option) {
        return this.each(function () {
            var $this = $(this)
                    , data = $this.data('info')
                    , options = typeof option == 'object' && option
            if (!data) $this.data('info', (data = new Info(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.gwt_info.Constructor = Info

    $.fn.gwt_info.defaults = {
        offset: 0
    }


    /* INFO DATA-API
     * ============== */

    $(function () {
            $('[data-gwt="info"]').each(function () {
                var $gwt = $(this)
                        , data = $gwt.data()

                data = data || {}

                $gwt.gwt_info(data)
            })
        })


}(window.jQuery,XJ.Event);













