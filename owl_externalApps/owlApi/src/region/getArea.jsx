//#import Util.js
//#import region.js
//#import column.js
//#import pigeon.js
//#import session.js

(function () {
  var dataKey = "region_data_key";
  var nowTime= new Date().getTime();
  var ret = {state: "ok"};
  var blnGetData =false;
  var oldData = appData.getData(appId,dataKey);
  if(oldData){
    out.print(oldData);
    return;
  }


  var cid = "col_region";
  var name = "地区根节点";
  //var mid = "head_merchant";
  var data = {};
  data.id = cid;
  data.key = cid;
  data.value = cid;
  data.label = name;
  data.name = name;
  //读取子级数据
  getChildren(data,cid);
  data.expireTime = nowTime+1*86400;//数据有效期一天
  //data.expireTime = nowTime+120*1000;//测试1分钟
  //保存数据
  ret.tree = data;
  var oldData = JSON.stringify(ret);
  appData.setData(appId,dataKey,oldData);
  out.print(oldData);
})();

function getChildren(parent, cid) {
  var ret = parent;
  var result = ColumnService.getChildren(cid);
  var hasChildren = ColumnService.hasChildren(cid);
  ret.hasChildren = hasChildren;
  ret.children = [];
  ret.id = cid;
  ret.key = cid;
  ret.value = cid;
  ret.label = parent.name;
  if (hasChildren)
  {
    var len = result.length;
    for (var i = 0; i < len; i++)
    {
      ret.children.push(getChildren(result[i], result[i].id));
    }
  }
  return ret;
}