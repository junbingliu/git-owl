//会员集树
var setting = {
    async:{
        enable:true,
        url:"loadUserCollection.jsp",
        autoParam:["id"],
        otherParam:{"columnId":columnId, "merchantId":merchantId}
    },
    check:{
        enable:true
    },
    data:{
        simpleData:{
            enable:true
        }
    },
    callback:{
        onCheck:onCheck
    }
};

var zNodes = [
    {name:"所有会员集", id:"50000", isParent:true, open:true}
];

//share
function onCheck(e, treeId, treeNode) {
    //商品分类
    var zTree = $.fn.zTree.getZTreeObj("userCollectionTree");
    var checks = zTree.getCheckedNodes(true);
    var s = '';
    for(var i = 0;i<checks.length;i++){
        var note = checks[i];
        var halfCheck = note.getCheckStatus();
        if(!halfCheck.half){
            var parentNote = note.getParentNode();
            if(parentNote == null){
                s = addString(s, getColumnPathName(note, '50000', '/', false));
            }else{
                var parentHalfCheck = parentNote.getCheckStatus();
                if(parentHalfCheck.half){
                    s = addString(s, getColumnPathName(note, '50000', '/', false));
                }
            }
        }
    }

    $('#currentSelect').html('当前选择：');
    $('#currentSelectValue').html(s);
}

function addString(result, newValue) {
    if (result == '') {
        result += newValue;
    } else {
        result += "<span class='innerTxt'> 且 </span>" + newValue;
    }
    return result;
}

function getColumnPathName(treeNode, fromId, px, includeFirst) {
    if(treeNode['id'] == fromId){
        return treeNode['name'];
    }
    var s = treeNode['name'];
    var parentNote = treeNode.getParentNode();
    var count = 0;
    while (parentNote != null && count < 10) {
        if((parentNote['id'] == fromId) && !includeFirst){
            break;
        }
        s = parentNote['name'] + px + s;

        parentNote = parentNote.getParentNode();
        count++;
    }
    return s;
}

function getUserCollection(categories) {
    var zTree = $.fn.zTree.getZTreeObj("userCollectionTree");
    var checks = zTree.getCheckedNodes(true);
    for(var i = 0;i<checks.length;i++){
        var note = checks[i];
        var halfCheck = note.getCheckStatus();
        if(!halfCheck.half){
            var parentNote = note.getParentNode();
            if(parentNote == null){
                var category = {};
                category.id = note['id'];
                category.name = getColumnPathName(note, '50000', '/', false);
                categories.push(category);
            }else{
                var parentHalfCheck = parentNote.getCheckStatus();
                if(parentHalfCheck.half){
                    var category = {};
                    category.id = note['id'];
                    category.name = getColumnPathName(note, '50000', '/', false);
                    categories.push(category);
                }
            }
        }
    }
}