var curRootNoteName = "赠品分类";//赠品分类
var curRootNoteId = "col_m_Promotional_006";//赠品分类
var curTreeId = "presentCategoryTree"; //地区树
var setting = {
    async:{
        enable:true,
        url:"loadColumn.jsp",
        autoParam:["id"],
        otherParam:{"columnId":columnId, "merchantId":merchantId}
    },
    data:{
        simpleData:{
            enable:true
        }
    },
    callback:{
        onClick:onClick
    }
};

var zNodes = [
    {name:curRootNoteName, id:curRootNoteId, isParent:true, open:true}
];

//share
function onClick(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(curTreeId);
    var notes = zTree.getSelectedNodes();
    var s = getColumnPathName(notes[0], curRootNoteId, '/', false)

    $('#currentSelect').html('当前选择：');
    $('#currentSelectValue').html(s);
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

function getCategories(categories) {
    var zTree = $.fn.zTree.getZTreeObj(curTreeId);
    var notes = zTree.getSelectedNodes();

    var category = {};
    category.id = notes[0]['id'];
    category.name = getColumnPathName(notes[0], curRootNoteId, '/', false);
    categories.push(category);
}