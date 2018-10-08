//#import util.js
//#import column.js

var rootColumnId = 'c_10000';

var root = {
  id:rootColumnId,
  value:rootColumnId,
  key:rootColumnId,
  label:'根目录'
}

function populateChildren(col){
  var children = ColumnService.getChildren(col.id);
  var cols = children.map(function(c){return {id:c.id,value:c.id,key:c.id,label:c.name}});
  col.children = cols;
  cols.forEach(function(c){
    populateChildren(c);
  });

}

populateChildren(root);

var ret = {
  state:'ok',
  tree:root
}
out.print(JSON.stringify(ret));
