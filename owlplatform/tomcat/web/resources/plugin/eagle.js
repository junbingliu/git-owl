
/*
* 分页插件
* manor 容器元素
* nest 存放分页数据的元素
* signal 事件名
* aim 获得分页数据url
* prey 当第一次不用ajax去load,数据存放的元素
* output 服务器返回数据的处理函数
* box 数据项的父元素
* mission.prepare 取数据前调用的函数
* mission.equip 获得参数的函数
* mission.spoilw 取数据后调用的函数
* mission.award 用缓存的数据分页后调用的函数
* */
function Eagle(opts,Ajax,Msg,Boa){
    var eagle = this;
    var defaults = {
        manor:'#eagle_container',nest:'#eagle_nest',vug:'li a',
        signal:'click',order:'holiday',

        aim:'',

        prey:'#eagle_nest_default',finish:false,

        output:function(data){return data;},
        box:'<ul></ul>',


        mission:{prepare:false,equip:false,spoil:false,award:false},

        pager:{
            cur:1,dis:7,sum:1,
            //ds:dyna sum    sfn:dyna count sum function
            ds:false,sfn:function(){},

            curCls:'active',prevCls:'upPage',nextCls:'downPage',otherCls:'',splitCls:'',disCls:'',
            prevTxt:'上一页',nextTxt:'下一页',splitTxt:'...',

            li:function(cls,num){
                return '<li class="'+ cls +'"><a href="#">'+num+'</a></li>'
            },

            goPage:function(eagle,force){
                var $src = this;
                var pager = eagle.cfg.pager;
                var $li = $src.parent();
                var n = $src.html();
                if(pager.splitTxt==n){
                    return -1;
                }
                if($li.hasClass(pager.prevCls)){
                    if(pager.cur<=1){
                        return -1;
                    }else{
                        return  pager.cur - 1;
                    }
                }else if($li.hasClass(pager.nextCls)){
                    if(pager.cur>=pager.sum){
                        return -1;
                    }else{
                        return pager.cur+1;
                    }
                }else if($li.hasClass(pager.curCls)){
                    if(force){
                        return pager.curCls
                    }else{
                        return -1;
                    }
                }else{
                    if(isNaN(n)){
                        return -1;
                    }else{
                        return n;
                    }
                }
            }
        }
    };

    //var cfg = $.extend(true,{},defaults,(EagleCfg || (EagleCfg={})), (opts || (opts={})));
    var cfg = $.extend(true,{},defaults,(opts || (opts={})));

    eagle.AJ = Ajax;
    eagle.Msg = Msg;
    eagle.Boa = Boa;
    eagle.cfg = cfg;
    eagle.$manor = $(eagle.cfg.manor);
    eagle.$nest = $(eagle.cfg.nest);
    if(/^eagle/.test(eagle.$nest.data('eagle'))){
        return eagle;
    }
    eagle.mark = eagle.code();
    eagle.storage = {};

    var action = function(clue){
        var $src = $(clue.target);
        var eagle = this;
        $src.goPage = eagle.cfg.pager.goPage.call($src,eagle,false);
        if($src.goPage!==-1){
            eagle.pursue($src);
        }
        return false;
    };

    var challenge = function(clue){
        var $src = $(clue.target);
        var eagle = this;
        $src.goPage = eagle.cfg.pager.goPage.call($src,eagle,true);
        if($src.goPage!==-1){
            //清缓存
            var id = eagle.mark+'_'+$src.goPage;
            eagle.storage[id] = false;
            $('#'+id).remove();

            eagle.pursue($src);
        }
        return false;
    };

    if(!(cfg.signal=='holiday')){
        eagle.$nest.delegate(cfg.vug,cfg.signal,eagle.px(action));
    }

    if(!(cfg.order=='holiday')){
        eagle.$nest.delegate(cfg.vug,cfg.order,eagle.px(challenge));
    }
    eagle.$nest.data('eagle',eagle.mark);
    if(!eagle.cfg.finish){
        eagle.reset();
    }
    return eagle;
}
Eagle.fn = Eagle.prototype;
Eagle.fn.px = function(func){
	var self = this;
	return(function(e){
        if (e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();
        }else{
            e.cancelBubble = true;
            e.returnValue = false;
        }
		return func.apply(self,arguments);
	});
};

Eagle.headquarters = 0;

Eagle.fn.code = function(){
    return 'eagle_'+ ++Eagle.headquarters;
};

Eagle.fn.pursue = function($src){
    var eagle = this;
    var cfg = eagle.cfg;
    var mission = cfg.mission;
    var pager = cfg.pager;
    if(!($src && $src.goPage)){
        return false;
    }

    var isGoOn = true;
    var prepare = mission.prepare;
    if(prepare){
        isGoOn = prepare.call($src,eagle);
    }
    if(!isGoOn){
        return false;
    }

    var sPage = $src.goPage;

    if(isNaN(sPage)){
        return false;
    }

    var iPage = Number(sPage);

    var  id =  eagle.mark+'_'+sPage;

    var food = eagle.storage[id];
    if(food && food===true){
        eagle.$manor.children().each(function(){
            if(!$(this).is(':hidden')){
                this.style.display = "none";
            }
        });
        $('#'+id).show();

        pager.cur = iPage;

        var s = eagle.feet(pager);
        eagle.$nest.html(s);

        var award = mission.award;
        if(award){
            award.call($src,eagle);
        }
        return false;
    }

    var equip = mission.equip;
    var spoil = mission.spoil;
    var data = {};
    data.page = iPage;
    if(equip){
        data = equip.call($src,data,eagle);
    }
    var success = function(data,status){
        if (status == "success") {
            if(data=="" || /^error/.test(data)){
                eagle.Msg.warn('服务器返回数据出错。');
                return false;
            }
            var output = eagle.cfg.output.call(eagle,data);
            if(output===''){
                return false;
            }
            eagle.$manor.append($(eagle.cfg.box).attr("id",id).append(output));
            eagle.storage[id] = true;

            eagle.$manor.children().each(function(){
                if(!$(this).is(':hidden')){
                    this.style.display = "none";
                }
            });
            $('#'+id).show();

            pager.cur = iPage;
            var award = mission.award;
            if(spoil){
                spoil.call($src,data,eagle);
            }

            var s = eagle.feet(pager);
            eagle.$nest.html(s);
            if(award){
                award.call($src,eagle);
            }
        }
    };
    var setting = {};
    setting.data = data;
    setting.type = 'POST';
    setting.url = cfg.aim;
    setting.success = success;
    eagle.AJ.ajax(setting);
    return false;
};

Eagle.fn.feet = function(page){
    var eagle = this;
    if(typeof page !== 'object'){
        return '';
    }
    if(page.ds){
        page.sum = page.sfn();
    }
    if(page.sum=='1'){
        return '';
    }
    var li = page.li;
    var total = page.sum;
    var cur = page.cur;
    var dis = page.dis;
    var curCls = page.curCls;
    var prevCls = page.prevCls;
    var nextCls = page.nextCls;
    var otherCls = page.otherCls;
    var splitCls = page.splitCls;
    var splitTxt = page.splitTxt;
    var prevTxt = page.prevTxt;
    var nextTxt = page.nextTxt;

    var p;
    var n;
    var b= 1,bt=1;
    var e= 1,et=1;
    var boa= eagle.Boa;
    boa.clean();
    if(cur<1){
        dis=1;
    }
    if(dis<5){
        dis=5;
    }
    if(total<1){
        dis=1;
    }
    if(total<=dis){
        b=1;e=total;
    }else{
        p = n = Math.floor((dis-2)/2);
        if(dis%2==0){
            p--;
        }
        b=bt=cur-p;
        e=et=cur+n;
        if(bt<2){
            e = et+(2-bt);
        }
        if(et>=total){
            b= bt-(e-total+1);
        }
        if(b<1){b=1}
        if(e>total){e=total}
        //alert('p:'+p+'__n:'+n+'__b:'+b+'__e:'+e);
    }
    if(cur>1){
        boa.eat(li(prevCls,prevTxt));
    }
    if(b>2){
        boa.eat(li(otherCls,1));
        boa.eat(li(splitCls,splitTxt));
    }else if(b==2){
        boa.eat(li(otherCls,1));
    }
    for(var i=b;i<=e;i++){
        if(i==cur){
            boa.eat(li(curCls,i));
        }else{
            boa.eat(li(otherCls,i));
        }
    }
    if(total-e>=2){
        boa.eat(li(splitCls,splitTxt));
        boa.eat(li(otherCls,total));
    }else if(total-e==1){
        boa.eat(li(otherCls,total));
    }
    if(total>cur){
        boa.eat(li(nextCls,nextTxt));
    }
    return boa.out('');
};

Eagle.fn.reset = function(){
    var $src = {manual:true,goPage:1};
    var eagle = this;
    /*for (var attr in eagle.storage) {
        $('#'+attr).remove();
    }*/
    eagle.$manor.empty();
    eagle.storage = {};
    //$(eagle.manor).find('div[id^=eagle_]').remove();
    eagle.pursue($src);
    return this;
};

Eagle.fn.goPage = function(iPage){
    var pager = this.cfg.pager;
    if(!isNaN(iPage) && iPage>0 && iPage<=pager.sum){
        this.pursue({manual:true,goPage:iPage});
    }
    return this;
};

Eagle.fn.next = function(){
    var pager = this.cfg.pager;
    this.goPage(pager.cur+1);
    return this;
};

Eagle.fn.prev = function(){
    var pager = this.cfg.pager;
    this.goPage(pager.cur-1);
    return this;
};
XJ.eagle = new Eagle();
//eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('8 w(a,b,c,d){4 e=6,f={F:"#1N",C:"#1O",Y:"H a",O:"1P",X:"M",18:"",1R:"#1Q",1t:!1,1r:8(a){3 a},1q:"<1y></1y>",1l:{1h:!1,1i:!1,1j:!1,T:!1},E:{A:1,1E:7,G:1,1s:!1,1D:8(){},L:"1F",R:"1J",N:"1G",1A:"",1v:"",1I:"",1u:"\\1S\\1z\\1x",1w:"\\27\\1z\\1x",V:"...",H:8(a,b){3\'<H 24="\'+a+\'"><a 25="#">\'+b+"</a></H>"},9:8(a,b){4 c=6,d=a.x.E,e=c.21(),f=c.Z();3 d.V==f?-1:e.P(d.R)?1>=d.A?-1:d.A-1:e.P(d.N)?d.A>=d.G?-1:d.A+1:e.P(d.L)?b?d.L:-1:10(f)?-1:f}}},g=$.1Y(!0,{},f,a||(a={}));y(e.1c=b,e.1b=c,e.1B=d,e.x=g,e.$F=$(e.x.F),e.$C=$(e.x.C),/^W/.1k(e.$C.S("W")))3 e;e.K=e.1p(),e.I={};4 h=8(a){y(a.1V)3 i.B(6,a),!1;4 b=$(a.1C),c=6;3 b.9=c.x.E.9.B(b,c,!1),-1!==b.9&&c.J(b),!1},i=8(a){4 b=$(a.1C),c=6;y(b.9=c.x.E.9.B(b,c,!0),-1!==b.9){4 d=c.K+"1g"+b.9;c.I[d]=!1,$("#"+d).22(),c.J(b)}3!1};3"M"!=g.O&&e.$C.1a(g.Y,g.O,e.U(h)),"M"!=g.X&&e.$C.1a(g.Y,g.X,e.U(i)),e.$C.S("W",e.K),e.x.1t||e.12(),e}w.D=w.23,w.D.U=8(a){4 b=6;3 8(c){3 c.17?(c.17(),c.1Z()):(c.1X=!0,c.1W=!1),a.1U(b,20)}},w.1m=0,w.D.1p=8(){3"1H"+ ++w.1m},w.D.J=8(a){4 b=6,c=b.x,d=c.1l,e=c.E;y(!a||!a.9)3!1;4 f=!0,g=d.1h;y(g&&(f=g.B(a,b)),!f)3!1;4 h=a.9;y(10(h))3!1;4 i=1K(h),j=b.K+"1g"+h,k=b.I[j];y(k&&k===!0){b.$F.1o().1f(8(){$(6).1e(":15")||(6.16.14="13")}),$("#"+j).11(),e.A=i;4 l=b.Q(e);b.$C.Z(l);4 m=d.T;3 m&&m.B(a,b),!1}4 n=d.1i,o=d.1j,p={};p.1L=i,n&&(p=n.B(a,p,b));4 q=8(c,f){y("1d"==f){y(""==c||/^1M/.1k(c))3 b.1b.2f("\\2n\\2q\\2m\\2r\\2o\\2t\\2s\\2v\\28\\2u"),!1;4 g=b.x.1r.B(b,c);y(""===g)3!1;b.$F.1n($(b.x.1q).2w("2p",j).1n(g)),b.I[j]=!0,b.$F.1o().1f(8(){$(6).1e(":15")||(6.16.14="13")}),$("#"+j).11(),e.A=i;4 h=d.T;o&&o.B(a,c,b);4 k=b.Q(e);b.$C.Z(k),h&&h.B(a,b)}},r={};3 r.S=p,r.2c="2b",r.29=c.18,r.1d=q,b.1c.2a(r),!1},w.D.Q=8(a){4 b=6;y("2e"!=2l a)3"";y(a.1s&&(a.G=a.1D()),"1"==a.G)3"";4 o,p,c=a.H,d=a.G,e=a.A,f=a.1E,g=a.L,h=a.R,i=a.N,j=a.1A,k=a.1v,l=a.V,m=a.1u,n=a.1w,q=1,r=1,s=1,t=1,u=b.1B;u.2j(),1>e&&(f=1),5>f&&(f=5),1>d&&(f=1),f>=d?(q=1,s=d):(o=p=2i.2h((f-2)/2),0==f%2&&o--,q=r=e-o,s=t=e+p,2>r&&(s=t+(2-r)),t>=d&&(q=r-(s-d+1)),1>q&&(q=1),s>d&&(s=d)),e>1&&u.z(c(h,m)),q>2?(u.z(c(j,1)),u.z(c(k,l))):2==q&&u.z(c(j,1));2g(4 v=q;s>=v;v++)v==e?u.z(c(g,v)):u.z(c(j,v));3 d-s>=2?(u.z(c(k,l)),u.z(c(j,d))):1==d-s&&u.z(c(j,d)),d>e&&u.z(c(i,n)),u.2d("")},w.D.12=8(){4 a={19:!0,9:1},b=6;3 b.$F.2k(),b.I={},b.J(a),6},w.D.9=8(a){4 b=6.x.E;3!10(a)&&a>0&&b.G>=a&&6.J({19:!0,9:a}),6},w.D.1T=8(){4 a=6.x.E;3 6.9(a.A+1),6},w.D.26=8(){4 a=6.x.E;3 6.9(a.A-1),6};',62,157,'|||return|var||this||function|goPage|||||||||||||||||||||||Eagle|cfg|if|eat|cur|call|nest|fn|pager|manor|sum|li|storage|pursue|mark|curCls|holiday|nextCls|signal|hasClass|feet|prevCls|data|award|px|splitTxt|eagle|order|vug|html|isNaN|show|reset|none|display|hidden|style|stopPropagation|aim|manual|delegate|Msg|AJ|success|is|each|_|prepare|equip|spoil|test|mission|headquarters|append|children|code|box|output|ds|finish|prevTxt|splitCls|nextTxt|u9875|ul|u4e00|otherCls|Boa|target|sfn|dis|active|downPage|eagle_|disCls|upPage|Number|page|error|eagle_container|eagle_nest|click|eagle_nest_default|prey|u4e0a|next|apply|shiftKey|returnValue|cancelBubble|extend|preventDefault|arguments|parent|remove|prototype|class|href|prev|u4e0b|u9519|url|ajax|POST|type|out|object|warn|for|floor|Math|clean|empty|typeof|u5668|u670d|u56de|id|u52a1|u8fd4|u636e|u6570|u3002|u51fa|attr'.split('|'),0,{}))


