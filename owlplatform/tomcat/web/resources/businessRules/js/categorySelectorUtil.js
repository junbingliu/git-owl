//商品分类树
var setting = {
    async:{
        enable:true,
        url:"loadColumn.jsp",
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
    {name:"所有分类", id:"c_10000", isParent:true, open:true}
];
if(isAppMulMerchant || isEnableCustomCategory){
    zNodes = [
        {name:"所有分类", id:"c_10000", isParent:true, open:true},
        {name:"自定义分类", id:"c_9999", isParent:true}
    ];
}

//组合套餐分类树
var combinationSetting = {
    async:{
        enable:true,
        url:"loadColumn.jsp",
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

var zCombinationNodes = [
    {name:"所有组合套餐", id:"col_m_Promotional_004", isParent:true, open:true}
];


//商品品牌树
var brandSetting = {
    async:{
        enable:true,
        url:"loadBrand.jsp",
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

var zBrandNodes = [
    {name:"所有品牌", id:"brnad_all", isParent:false},
    {name:"自定义品牌分类", id:"c_brand_00001", isParent:true, nocheck:true}
];

var zBrandSearchNodes = [
    {name:"搜索结果", id:"c_brand_search", isParent:true, nocheck:true}
];

//搜索
function searchTree() {
    var treeObj = $.fn.zTree.getZTreeObj("productBrandTree");
    treeObj.removeNode(treeObj.getNodeByParam("id", "c_brand_search", null));

    var brandSearchName = $("#brandName").val();
    if (brandSearchName.length > 0) {
        treeObj.setting.async.otherParam = {"columnId":columnId, "merchantId":merchantId, search:brandSearchName};
        treeObj.addNodes(null, zBrandSearchNodes);
        var searchNode = treeObj.getNodeByParam("id", "c_brand_search", null);
        treeObj.reAsyncChildNodes(searchNode, "refresh");
        treeObj.setting.async.otherParam = {"columnId":columnId, "merchantId":merchantId};
    }
}

//share
function onCheck(e, treeId, treeNode) {
    //商品分类
    var zTree = $.fn.zTree.getZTreeObj("productCategoryTree");
    var checks = zTree.getCheckedNodes(true);
    var s = '';
    for (var i = 0; i < checks.length; i++) {
        var note = checks[i];
        var halfCheck = note.getCheckStatus();
        if (!halfCheck.half) {
            var parentNote = note.getParentNode();
            if (parentNote == null) {
                s = addString(s, getColumnPathName(note, 'c_10000', '/', false));
            } else {
                var parentHalfCheck = parentNote.getCheckStatus();
                if (parentHalfCheck.half) {
                    s = addString(s, getColumnPathName(note, 'c_10000', '/', false));
                }
            }
        }
    }

    //组合套餐分类
    var zCombinationTree = $.fn.zTree.getZTreeObj("combinationTree");
    var combinationChecks = zCombinationTree.getCheckedNodes(true);
    for (var k = 0; k < combinationChecks.length; k++) {
        var combinationNote = combinationChecks[k];
        var combinationHalfCheck = combinationNote.getCheckStatus();
        if (!combinationHalfCheck.half) {
            var parentCombinationNote = combinationNote.getParentNode();
            if (parentCombinationNote == null) {
                s = addString(s, getColumnPathName(combinationNote, 'col_m_Promotional_004', '/', false));
            } else {
                var parentCombinationHalfCheck = parentCombinationNote.getCheckStatus();
                if (parentCombinationHalfCheck.half) {
                    s = addString(s, getColumnPathName(combinationNote, 'col_m_Promotional_004', '/', false));
                }
            }
        }
    }

    //品牌
    var zBrandTree = $.fn.zTree.getZTreeObj("productBrandTree");
    var brandChecks = zBrandTree.getCheckedNodes(true);
    for (var j = 0; j < brandChecks.length; j++) {
        var brandNote = brandChecks[j];
        s = addString(s, brandNote['name']);
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
    if (treeNode['id'] == fromId) {
        return treeNode['name'];
    }
    var s = treeNode['name'];
    var parentNote = treeNode.getParentNode();
    var count = 0;
    while (parentNote != null && count < 10) {
        if ((parentNote['id'] == fromId) && !includeFirst) {
            break;
        }
        s = parentNote['name'] + px + s;

        parentNote = parentNote.getParentNode();
        count++;
    }
    return s;
}

function getColumnPathId(treeNode, fromId, px) {
    var s = treeNode['id'];
    var parentNote = treeNode.getParentNode();
    var count = 0;
    while (parentNote != null && count < 10) {
        s = parentNote['id'] + px + s;

        parentNote = parentNote.getParentNode();
        count++;
    }
    return s;
}

function getCategory(categories) {
    getTreeCategories(categories, 'productCategoryTree', 'c_10000', false);
}

function getCombination(categories) {
    getTreeCategories(categories, 'combinationTree', 'col_m_Promotional_004', false);
}

function getTreeCategories(categories, treeId, fromColumnId, includeFirst) {
    var zTree = $.fn.zTree.getZTreeObj(treeId);
    var checks = zTree.getCheckedNodes(true);
    for (var i = 0; i < checks.length; i++) {
        var note = checks[i];
        var halfCheck = note.getCheckStatus();
        if (!halfCheck.half) {
            var parentNote = note.getParentNode();
            if (parentNote == null) {
                var category = {};
                category.id = note['id'];
                category.name = getColumnPathName(note, fromColumnId, '/', includeFirst);
                categories.push(category);
            } else {
                var parentHalfCheck = parentNote.getCheckStatus();
                if (parentHalfCheck.half) {
                    var category = {};
                    category.id = note['id'];
                    category.name = getColumnPathName(note, fromColumnId, '/', includeFirst);
                    categories.push(category);
                }
            }
        }
    }
}

function getBrand(categories) {
    var zBrandTree = $.fn.zTree.getZTreeObj("productBrandTree");
    var brandChecks = zBrandTree.getCheckedNodes(true);
    for (var j = 0; j < brandChecks.length; j++) {
        var brandNote = brandChecks[j];
        var brand = {};
        brand.id = brandNote['id'];
        brand.name = brandNote['name'];
        categories.push(brand);
    }
}