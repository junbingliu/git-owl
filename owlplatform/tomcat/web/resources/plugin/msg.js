
/*
* 一个弹出容器插件
* info：提示框  显示一个文本3秒后自动关闭
* closeInfo 关闭提示框
* alert 警告框 有“确定”和“取消”按钮
* closeAlert 关闭警告框
* success 提示框的简版 直接提示“操作成功”
* fail 提示框的简版 直接提示“操作失败”
* warn 警示框 显示一个文本用户必须自动关闭
* wait loading提示
* */

var XJ = XJ || {};
XJ.Config = XJ.Config || {};
XJ.Config.Msg = {timeout:2000};
XJ.Msg = (function($){
    var defaults = {container:'body',timeout:3000,isShowClose:false,isAutoClose:true,
        infoMarkup:'<div class="pop_msg_layer" id="xj_msg_info"><div class="xj_msg"><p class="txt"><i class="icon"></i><span></span></p></div></div>',
        alertMarkup:'<div class="pop_msg_layer" id="xj_msg_alert"><div class="xj_msg"><h4 class="txt"><i class="icon"></i><span></span></h4><p class="opt"><a href="#" class="btn btn-sure">确定</a> <a href="#" class="btn btn-cancel">取消</a></p></div></div>',
        closeMarkup:'<button type="button" class="close" data-dismiss="alert">×</button>',
        txt:'',html:false
    },alertDefaults = {isShowClose:true,isAutoClose:false},cfg,$infoElement,$alertElement,$closeElement,bInitInfo=false,bInitAlert=false,bBusy=false,rQueue=[];
    cfg = $.extend(defaults,(XJ.Config.Msg || {}));
    $infoElement = $(cfg.infoMarkup);
    $alertElement = $(cfg.alertMarkup);
    $closeElement = $(cfg.closeMarkup);


    function fCreate(element){
        var $self = this;
        element.css({display: 'none'}).appendTo(cfg.container);
        element.jqm({modal: true,overlay:30,overlayClass: 'jqmOverlay',onHide:$.proxy(function(h){var onHide = cfg.onHide;if(onHide){onHide();}if(cfg._out){clearTimeout(cfg._out);}cfg = defaults;h.w.animate({opacity:'hide',height:'hide'});if(h.o)h.o.remove();bBusy=false;},$self),onShow: function(c) {var onShow = cfg.onShow;if(onShow){onShow();}/*c.w.css("opacity", .9).slideDown('slow');*/c.w.animate({opacity:'show',height:'show'})}});
    }

    function fSetContent(element,txt) {
        var sTxt = (typeof txt == 'function' ? txt.call(this) : txt);
        element.find('.xj_msg .txt span')[cfg.html ? 'html' : 'text'](sTxt);
    }

    function fSetCloseElement(element,opt){
        var $close = element.find('.close');
        if(opt.isShowClose){
            if($close.length==0){
                console.log("add colse.");
                element.find('.xj_msg').prepend($closeElement);
                element.jqmAddClose('div[id^=xj_msg] .close');
            }
        }else{
            if($close.length>0){
                $closeElement.detach();
            }
        }
    }

    function fSetAlertCallBack(element,opt){
        element.find('.btn-sure').one('click',function(){
            element.jqmHide();
            var onOK = opt.onOk;
            if(onOK){
                onOK();
            }
        });
        element.find('.btn-cancel').one('click',function(){
            element.jqmHide();
            var onCancel = opt.onCancel;
            if(onCancel){
                onCancel();
            }
        });
    }

    function fShowInfo(txt){
        var opt = (typeof txt == 'object' ? txt : { txt: txt});
        opt._t= 'info';
        if(bBusy){
            rQueue.push(opt);
            fPublish();
            return;
        }
        if(!bInitInfo){
            fCreate($infoElement);
            bInitInfo=true;
        }else{
            $infoElement.css({display: 'none'});
        }
        cfg = $.extend({},defaults,opt);
        fSetCloseElement($infoElement,cfg);
        fSetContent($infoElement,cfg.txt);
        var actualWidth = $infoElement.width();
        bBusy = true;
        $infoElement.css({"margin-left":(0-actualWidth/2)+'px'}).jqmShow();
        if(cfg.isAutoClose){
            cfg._out = setTimeout(function(){$infoElement.jqmHide();},cfg.timeout);
        }
    }

    function fShowAlert(txt){
        var opt = (typeof txt == 'object' ? txt : { txt: txt});
        opt._t= 'alert';
        if(bBusy){
            rQueue.push(opt);
            fPublish();
            return;
        }
        if(!bInitAlert){
            fCreate($alertElement);
            bInitAlert=true;
        }else{
            $alertElement.css({display: 'none'});
        }
        cfg = $.extend({},defaults,alertDefaults,opt);
        fSetCloseElement($alertElement,cfg);
        fSetContent($alertElement,cfg.txt);
        fSetAlertCallBack($alertElement,cfg);
        var actualWidth = $alertElement.width();
        bBusy = true;
        $alertElement.css({"margin-left":(0-actualWidth/2)+'px'}).jqmShow();
        if(cfg.isAutoClose){
            cfg._out = setTimeout(function(){$alertElement.jqmHide();},cfg.timeout);
        }
    }



    function fPublish(){
        var l = rQueue.length;
        if(l>0){
            if (bBusy) {
                setTimeout(fPublish,500);
            }else{
                var o = rQueue[0];
                rQueue.splice(0,1);
                if(o._t==='info'){
                    fShowInfo(o);
                }else{
                    fShowAlert(o);
                }
            }
        }
    }

    function info(txt){
        fShowInfo(txt);
        return this;
    }

    function alert(txt){
        fShowAlert(txt);
    }

    function closeInfo(){
        $infoElement.jqmHide();
        return this;
    }

    function closeAlert(){
        $alertElement.jqmHide();
        return this;
    }

    function wait(txt){
        var opt = (typeof txt == 'object' ? txt : { txt: txt});
        opt = $.extend({},{txt:'正在努力处理...',time:100,isAutoClose:false},opt);
        var onShow = opt.onShow;
        opt.onShow = function(){
            $infoElement.find('.icon').addClass('icon-wait');
            if(onShow){
                onShow();
            }
        };
        var onHide = opt.onHide;
        opt.onHide = function(){
            $infoElement.find('.icon').removeClass('icon-wait');
            if(onHide){
                onHide();
            }
        };
        fShowInfo(opt);
        return this;
    }
    function success(txt){
        var opt = (typeof txt == 'object' ? txt : { txt: txt});
        opt = $.extend({},{txt:'操作成功',isShowClose:true},opt);
        fShowInfo(opt);
        return this;
    }
    function fail(txt){
        var opt = (typeof txt == 'object' ? txt : { txt: txt});
        opt = $.extend({},{txt:'操作失败',isShowClose:true},opt);
        fShowInfo(opt);
        return this;
    }

    function warn(txt){
        if(bInitInfo&&bBusy){
            closeInfo();
        }
        var opt = (typeof txt == 'object' ? txt : { txt: txt});
        opt = $.extend({},{isAutoClose:false,isShowClose:true,_t:'info'},opt);
        if(bBusy){
            rQueue.unshift(opt);
            fPublish();
        }else{
            fShowInfo(opt);
        }
        return this;
    }


    return {
        info:info,
        closeInfo:closeInfo,
        alert:alert,
        closeAlert:closeAlert,
        success:success,
        fail:fail,
        warn:warn,
        wait:wait
    };

}(jQuery));