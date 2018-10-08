
//为了防止错误的执行sript，例如针对mall的script执行到了sns等等，我们要求在patch的开头首先要调用assertSystem,否则就抛出异常
var systemChecked;
var rSystem
function assertSystem(requiredSystem){
    rSystem = requiredSystem;
    if(requiredSystem == 'mall'){
        systemChecked = true;
    }
    else{
        throw "当前的System是" + system + ",和requiredSystem不一致。";
    }
}

function checkSystem(){
    return;
    if(!systemChecked){
        throw "请首先调用assertSystem(system),system的取值可以是：'mall','sns','erp'"
    }
}

/*
获得一个对象
 */
function getObject(name){
    checkSystem()
    var content = ps20.getContent(name);
    if(!content){
        return content;
    }
    return JSON.parse(content);
}

function getListSize(listName){
    return ps20.getListSize(listName);
}

function getContent(name){
    checkSystem()
    return ps20.getContent(name);
}

function getContents(name,from,num){
    checkSystem()
    return ps20.getContents(name,from,num);
}

function getObjects(name,from,num){
    checkSystem()
    var contents = getContents(name,from,num);
    var result = [];
    for(var i=0; i<contents.size();i++) {
        var content = contents.get(i);
        if(content){
            result.push(JSON.parse(content));
        }
    }
    return result;
}

function where(listName,filter,from,num) {
    var curPos = 0;
    var step = 100;
    var result = [];
    var validNum = 0;
    while(true){
        var objs = getObjects(listName,curPos,step);

        for(var i=0; i<objs.length; i++){
            var obj = objs[i];
            if(filter(obj)){
                validNum++;
                if(validNum>from && validNum<=from + num) {
                    result.push(obj);
                }
            }
        }
        if(objs.length<step){
            break;
        }
        curPos += step;
    }
    return result;
}

/*
保存一个对象
 */
function saveObject(name,obj){
    checkSystem()
    if(!obj){
        ps20.saveContent(name,null);
    }
    ps20.saveContent(name,JSON.stringify(obj));
}

function saveContent(name,content){
    checkSystem()
    ps20.saveContent(name,content);
}

function printPlainObjects(objs){
    print(JSON.stringify(objs))
    print("<hr>")
    print("length=" + objs.length);
    print("<br>")
}

function addToList(listname,key,objId){
    checkSystem()
    ps20.addToList(listname,key,objId);
}

function clearList(listname){
    ps20.clearList(listname);
}

function deleteFromList(listname,key,objId){
    checkSystem()
    ps20.deleteFromList(listname,key,objId);
}

function print(msg){
    ps20.putMsg(msg);
}

function getAtom(name){
    checkSystem()
    return ps20.getAtom(name);
}

function setAtom(name,value){
    checkSystem()
    ps20.setAtom(name,value);
}

function getList(name,from,num){
    checkSystem()
    var listSortObjects = ps20.getList(name,from,num);
    var ret = [];
    for(var i=0; i<listSortObjects.size(); i++){
        var sobj = listSortObjects.get(i);
        ret.push({
            objid:"" + sobj.getObjid(),
            key:"" + sobj.getKey()
        })
    }
    return ret;
}

function printList(name,from,num){
    checkSystem()
    ps20.printList(name,from,num);
}

function printObjects(listId,from,num){
    checkSystem()
    ps20.printObjects(listId,from,num);
}

function getId(id){
    checkSystem()
    return ps20.getId(id);
}

function lock(id) {
    checkSystem()
    ps20.lock(id);
}

function unlock(id) {
    checkSystem()
    ps20.unlock(id);
}

function getComparableString(value, len){
   var key = "" + value;
   var l = len - key.length;
   for(var i=0; i<l; i++){
       key = "0" + key;
   }
   return key;
}

function getRevertComparableString(value, len){
    var powers = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000, 100000000000, 1000000000000,10000000000000];
    var value = powers[len] - value;
    return getComparableString(value,len);
}

function saveUrls(urls){
    var defaultActionFinderClass = 'net.xinshi.isone.modules.privilege.privilegefinder.impl.NormalActionFinder';
    var defaultColumnFinderClass = 'net.xinshi.isone.modules.privilege.privilegefinder.impl.NormalColumnFinder';
    for(var i=0; i<urls.length; i++){
        var u = urls[i];

        if(!u.actionFinder){
            u.actionFinder = defaultActionFinderClass;
        }
        var actionFinder = {
            id:'ActionFinder_' + u.url,
            finder:u.actionFinder,
            actionId:u.actionId
        }
        saveObject(actionFinder.id,actionFinder);

        if(!u.columnFinder){
            u.columnFinder = defaultColumnFinderClass;
        }
        var columnFinder = {
            id:"ColumnFinder_"  + u.url,
            finder:u.columnFinder
        }
        saveObject(columnFinder.id,columnFinder);
    }
}
//#import versionObject.js
