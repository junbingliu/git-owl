
/*
* 一个拼接字符串的类
* */
function Boa() {
    this._s = new Array();
}

Boa.prototype = {
    //添加字符串
    eat:function(s) {
        this._s.push(s);
        return this;
    },
    //输出拼接后字符串
    out:function(s) {
        return this._s.join(s);
    },
    //清除
    clean:function() {
        return this._s.splice(0,this._s.length);
    }
};


function Boa(){this._s=new Array}Boa.prototype={eat:function(e){return this._s.push(e),this},out:function(e){return this._s.join(e)},clean:function(){return this._s.splice(0,this._s.length)}};
