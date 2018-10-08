var tmpl = {
    setTemplate : function(template,style){
        var t = typeof template=='string'?JSON.parse(template): template;
        var s = typeof style=='string'?JSON.parse(style): style;
        if(!t || typeof t!='object' || !s || typeof s!='object' ){
            throw '模板或风格格式错误';
        }
        var id = t.id;
        if(!id || id === ''){
            throw '模板id不能为空。';
        }
        var folder = s.folder;
        if(!folder || folder === ''){
            throw '风格folder不能为空。';
        }
        var ot = getObject(id);
        var date =  new Date().getTime();
        var sl = [];
        s.addTime = date;
        var isInit = false;
        if(!ot){
            sl.push(s);
            t.addTime = date;
            t.styles = sl;
            //printPlainObjects(t);
            saveObject(t.id,t);
        }else{
            sl = ot.styles;
            var isExist = false;
            for ( var i=0 ; i < sl.length ; ++i ){
                if (sl[i] && folder===sl[i].folder){
                    sl[i] = s;
                    isExist = true;
                    break;
                }
            }
            if(!isExist){
                sl.push(s);
            }
            ot.lastModifyTime = date;
            if(ot.isInit){
                isInit = true;
            }
            //printPlainObjects(ot);
            saveObject(ot.id,ot);
        }
        return isInit;
    },
    finished  : function(id){
        var t = getObject(id);
        if(!!t){
            if(!t.isInit){
                t.finishedTime = new Date().getTime();
                t.isInit = true;
                saveObject(t.id,t);
            }
        }
    }
};
