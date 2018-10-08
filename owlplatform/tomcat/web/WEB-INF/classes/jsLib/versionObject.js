
var CHECK_OUT = "cko";
var HEAD = "hd";
var versionObject = {
    addObject : function(obj,id,userId,initialCheckout){
        lock(id);
        try {
            var vid = id + "_" + CHECK_OUT;
            obj["checkoutTime"] = (new Date()).getTime();
            obj["chectoutUserId"] =  userId;
            obj["fromVersionId"] =  "";
            obj["id"] = vid;
            obj["_v"] = id + "_" + CHECK_OUT;
            saveObject(vid,obj);
            if (!initialCheckout) {
                versionObject.checkin(id, userId);
            }
        } finally {
            unlock(id);
        }
    } ,
    checkin:function(objId,userId){
        lock(objId);
        try {
            if (!versionObject.isCheckedOut(objId)) return false;
            versionObject.saveOldHead(objId);
            var vid = objId + "_" + CHECK_OUT;
            var obj = getObject(vid);
            var versionId = "" + getId("versions");
            versionObject.setAsHeadObject(objId, versionId, userId, obj);
            versionObject.deleteCheckoutCopy(objId);
            return true;
        } finally {
            unlock(objId);
        }
    },
    isCheckedOut:function(objId){
        var vid = objId + "_" + CHECK_OUT;
        var cstr = getContent(vid);
        if(!cstr){
           return false;
        }
        return true;
    },
    saveOldHead : function(objId){
        var headId = objId + "_" + HEAD;
        oldHead = getObject(headId);
        if (oldHead) {
            var _ver = oldHead["_v"];
            var headObjId = objId + "_" + _ver;
            oldHead["id"] = headObjId;
            oldHead["objId"] =  objId;
            saveObject(headObjId, oldHead);
        }
    },
    setAsHeadObject:function( objId,  versionId,  userId,  jobj) {
        var headId = objId + "_" + HEAD;
        jobj["_v"] = versionId;
        jobj["id"] = headId;
        jobj["objId"] = objId;//这个objId是区别于id的，但同一个对象所有version的objId都应该是一样的
        var t = (new Date()).getTime();
        jobj["dateTime"] = "" + t;
        jobj["checkinUser"] = userId;
        saveObject(headId, jobj);

        //添加 versionId 2 head
        var versionObjId = objId + "_" + versionId;
        var relObj ={};
        relObj["id"]= versionObjId;
        relObj["_v"]=HEAD;
        saveObject(versionObjId, relObj);
        t = t / 1000;
        addToList(objId + "_versions",getRevertComparableString(t,11),versionObjId)
    },
    deleteCheckoutCopy:function(id)  {
        //删除CheckOut Copy,其他的保留
        vid = id + "_" + CHECK_OUT;
        saveContent(vid, null);
    },

    getObject:function(objId, versionId) {
        if (versionId==HEAD) {
            vid = objId + "_" + versionId;
            return getObject(vid);

        } else {
            var vid = objId + "_" + versionId;

            var vobj =getObject(vid);
            if(!vobj){
                return null;
            }
            //有可能这只是一个链接直接指向head
            var _ver = vobj["_v"];
            if (_ver==versionId) {
                return vobj;
            } else {
                return versionObject.getObject(objId, _ver);
            }
        }
    },
    update : function(objId, jobj, userId) {
        lock(objId);
        var t = (new Date()).getTime();
        try {
            var vid = objId + "_" + CHECK_OUT;
            jobj["id"] = vid;
            jobj["lastModifyTime"] = t;
            jobj["lastModifier"] = userId;
            saveObject(vid, jobj);
            return jobj;
        } finally {
            unlock(objId);
        }
    }
}