/*
* 一个基于jquer的工具类
* */

function Hebe(){}
Hebe.fn = Hebe.prototype;
Hebe.fn.ie6 = $.browser.msie&&($.browser.version == "6.0")&&!window.XMLHttpRequest;
Hebe.fn.ie7 = $.browser.msie&&($.browser.version == "7.0");
Hebe.fn.ie8 = $.browser.msie&&(Number($.browser.version)<9);

//加载样式
Hebe.fn.addStyle = function(s){
    var d = document;
    var t=d.createElement("style");
    t.type="text/css";
    t.async=true;
    if(t.styleSheet){//ie
        t.styleSheet.cssText = s;
    }else{
        var x = d.createTextNode(s);
        t.appendChild(x);
    }
    var h = d.getElementsByTagName("head");
    if(h.length){
        h[0].appendChild(t);
    }else{
        d.documentElement.appendChild(t);
    }
};
//ajax请求
Hebe.fn.ajax = function(opts){
    var isLoadingOut = false,isBusyOut = false;
    var loadingTimer,busyTimer;
    var before = function() {
        loadingTimer = setTimeout(function(){
            isLoadingOut = true;
            XJ.Msg.wait('正在为你加载数据...');
        },1000);
        busyTimer = setTimeout(function(){
            isBusyOut = true;
            XJ.Msg.warn('网络繁忙，请尝试刷新页面');
        },25000);
    };
    var cureTimer = function(){
        if(!isLoadingOut){
            clearTimeout(loadingTimer);
        }
        if(!isBusyOut){
            clearTimeout(busyTimer);
        }
        if(isLoadingOut || isBusyOut){
            XJ.Msg.closeInfo();
        }
    };
    var success = opts.success;
    var ok = function(){
        cureTimer();
        if(success){
            success.apply(this,arguments);
        }
    };
    if(success){
        opts.success = ok;
    }
    var error = opts.error;
    var fail = function(){
        cureTimer();
        XJ.Msg.warn('网络错误，请稍后再试。');
        if(error){
            error.apply(this,arguments);
        }
    };
    if(error){
        opts.error = fail;
    }
    var contentType = 'application/x-www-form-urlencoded; charset=utf-8';
    var defaults = {url:'',data:{},type:'GET',contentType:contentType,cache:false,beforeSend:before};
    var setting = $.extend({},defaults, opts);
    return $.ajax(setting);
};
//ajax请求的简版
Hebe.fn.load = function(opts){
    var contentType = 'application/x-www-form-urlencoded; charset=utf-8';
    var defaults = {url:'',data:{},type:'POST',contentType:contentType,cache:false};
    var setting = $.extend({},defaults, opts);
    return $.ajax(setting);
};
//用于调度打印各种对象的函数
Hebe.fn.toString = function(o){
    var parse = function(_o){
        var a = [], t;
        for(var p in _o){
            if(_o.hasOwnProperty(p)){
                t = _o[p];
                if(t && typeof t == "object"){
                    a[a.length]= p + ":{ " + arguments.callee(t).join(", ") + "}";
                }
                else {
                    if(typeof t == "string"){
                        a[a.length] = [ p+ ": \"" + t.toString() + "\"" ];
                    }
                    else{
                        a[a.length] = [ p+ ": " + t.toString()];
                    }

                }
            }
        }
        return a;
    };
    //return "{" + parse(o).join(", ") + "}";
    return parse(o).join(", ");
};

var T=new Hebe;

var msg_css = [
    '.pop_overlay { background-color: #000;}',
    '* iframe.pop {position:absolute;top:0;left:0;z-index:-1;width: expression(this.parentNode.offsetWidth+"px");height: expression(this.parentNode.offsetHeight+"px")}',
    '.pop_msg_layer {position:fixed; left:50%; top:200px; margin-left:-100px; z-index:3001; display:none }',
    '* html .pop_msg_layer{position:absolute;top:expression((document.documentElement.scrollTop||document.body.scrollTop)+Math.round(17 * (document.documentElement.offsetHeight||document.body.clientHeight) / 100)+"px")}',
    '.xj_msg{font-size:14px;line-height:20px;width:auto;max-width:350px;*width:350px;height:auto;overflow:hidden;padding:23px 35px 18px 25px;margin:0;color:#c09853;text-shadow:0 1px 0 rgba(255,255,255,0.5);background-color:#fff;border-color:#0088CC #0074CC #0074CC #0088CC;border-style:solid;border-width:2px;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}',
    '.xj_msg a{text-decoration:none}',
    '.xj_msg a:hover{text-decoration:none}',
    '.xj_msg p{margin:15px 0 0}',
    '.xj_msg .txt{color:#4D3525;font-weight:bold;padding-right:20px;margin:0}',
    '.xj_msg .opt{text-align:right;margin-bottom:3px}',
    '.xj_msg h4{color:#4D3525;margin:0;font-size:14px;line-height:25px;font-family:inherit;font-weight:bold;text-rendering:optimizelegibility;padding-right:20px}',
    '.xj_msg .close{position:relative;_position:absolute;top:-20px;_top:-5px;right:-24px;_right:-2px;line-height:20px;padding:0;cursor:pointer;border:0;-webkit-appearance:none;filter:alpha(opacity=20);background:#fff;float:right;font-size:20px;font-weight:bold;color:black;text-shadow:0 1px 0 white;opacity:0.2;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;margin:0;vertical-align:middle}',
    '.xj_msg .icon{background-position:0 0;display:inline-block;width:36px;height:24px;margin-top:-4px;*margin-right:.3em;line-height:14px;vertical-align:text-top;background-image:url("images/icon.gif");background-repeat:no-repeat;color:#C09853;text-shadow:0 1px 0 rgba(255,255,255,0.5)}',
    '.xj_msg .icon-wait{background-image: url("images/load.gif");}',
    '.xj_msg .btn{display:inline-block;*display:inline;padding:4px 14px;margin-bottom:0;*margin-left:.3em;font-size:14px;line-height:20px;*line-height:20px;color:#333333;text-align:center;text-shadow:0 1px 1px rgba(255,255,255,0.75);vertical-align:middle;cursor:pointer;background-color:#f5f5f5;*background-color:#e6e6e6;background-image:-webkit-gradient(linear,0 0,0 100%,from(#ffffff),to(#e6e6e6));background-image:-webkit-linear-gradient(top,#ffffff,#e6e6e6);background-image:-o-linear-gradient(top,#ffffff,#e6e6e6);background-image:linear-gradient(to bottom,#ffffff,#e6e6e6);background-image:-moz-linear-gradient(top,#ffffff,#e6e6e6);background-repeat:repeat-x;border:1px solid #bbbbbb;*border:0;border-color:rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);border-color:#e6e6e6 #e6e6e6 #bfbfbf;border-bottom-color:#a2a2a2;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;filter:progid:dximagetransform.microsoft.gradient(startColorstr="#ffffffff",endColorstr="#ffe6e6e6",GradientType=0);filter:progid:dximagetransform.microsoft.gradient(enabled=false);*zoom:1;-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);-moz-box-shadow:inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);box-shadow:inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05)}',
    '.xj_msg .btn{border-color:#c5c5c5;border-color:rgba(0,0,0,0.15) rgba(0,0,0,0.15) rgba(0,0,0,0.25)}.xj_msg .btn-sure{color:#ffffff;text-shadow:0 -1px 0 rgba(0,0,0,0.25);background-color:#986107;*background-color:#986107;background-image:-webkit-gradient(linear,0 0,0 100%,from(#986107),to(#986107));background-image:-webkit-linear-gradient(top,#986107,#986107);background-image:-o-linear-gradient(top,#986107,#986107);background-image:linear-gradient(to bottom,#986107,#986107);background-image:-moz-linear-gradient(top,#986107,#986107);background-repeat:repeat-x;border-color:#942a25 #942a25 #962125;border-color:rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);filter:progid:dximagetransform.microsoft.gradient(startColorstr="#ff986107",endColorstr="#ff986107",GradientType=0);filter:progid:dximagetransform.microsoft.gradient(enabled=false)}',
    '.xj_msg .btn-sure:hover,.xj_msg .btn-sure:active,.xj_msg .btn-sure.active,.xj_msg .btn-sure.disabled,.xj_msg .btn-sure[disabled]{color:#ffffff;background-color:#942a25;*background-color:#942a25}.xj_msg .btn-sure:active,.xj_msg .btn-sure.active{background-color:#942a25 9}',
    ''
];