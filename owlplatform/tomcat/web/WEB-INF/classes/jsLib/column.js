var ColumnApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.base,
    Packages.net.xinshi.isone.modules.price,
    Packages.net.xinshi.isone.modules.product,
    Packages.net.xinshi.isone.modules.product.tools,
    Packages.net.xinshi.isone.lucene,
    Packages.net.xinshi.isone.lucene.search.product,
    Packages.net.xinshi.isone.commons,
    Packages.net.xinshi.isone.functions.dynaattr,
    Packages.net.xinshi.isone.base.dynaattr,
    Packages.net.xinshi.isone.base.column,
    Packages.net.xinshi.isone.modules.businessrange,
    Packages.java.util
);

/**
 * column是一种树装结构，只要是树状的结构都可以用column来实现，例如商品分类，信息分类等等
 * @namespace
 * @type {Object}
 */
var ColumnService = {};

/**
 * 获得columnId对应的 column对象
 * @param columnId
 * @return {*}
 */
ColumnService.getColumn = function (columnId) {
    var jcol = ColumnApi.IsoneBaseEngine.columnService.getColumn(columnId);
    if (!jcol) {
        return null;
    }
    return JSON.parse(jcol.toString());
};

/**
 * 根据checkDeleteState参数判断是否要验证column的删除状态，获得column
 * @param columnId
 * @param checkDeleteState : true，需要验证删除状态
 * @returns {*}
 */
ColumnService.getColumnByState = function (columnId, checkDeleteState) {
    var jcol = ColumnApi.IsoneBaseEngine.columnService.getColumn(columnId, checkDeleteState);
    if (!jcol) {
        return null;
    }
    return JSON.parse(jcol.toString());
};

ColumnService.getColumns = function(ids){
    var listIds = new ColumnApi.ArrayList();
    ids.forEach(function(id){listIds.add(""+ id)});
    var jcols = ColumnApi.IsoneBaseEngine.columnService.getListDataByIds(listIds,true);
    var result = [];
    for(var i=0; i<jcols.size(); i++){
        var col = jcols.get(i);
        if(col){
            var oCol = JSON.parse("" + col.toString());
            result.push(oCol);
        }
        else{
            result.push(null);
        }
    }
    return result;

}

/**
 * 获得columnId对应的所有子栏目
 * @param columnId
 * @return {Array}
 */
ColumnService.getChildren = function (columnId) {
    var jlist = ColumnApi.IsoneBaseEngine.columnService.getAllColumnChildren(columnId);
    if (!jlist) {
        return null;
    }
    return JSON.parse(jlist.toString());
};

/**
 * 获得商家自定义的分类子栏目
 * @param merchantId
 * @param columnId
 * @returns {*}
 */
ColumnService.getChildrenByMerchantId = function (merchantId, columnId) {
    var jlist = ColumnApi.IsoneBaseEngine.columnService.getAllColumnChildren(merchantId, columnId);
    if (!jlist) {
        return null;
    }
    return JSON.parse(jlist.toString());
};

/**
 * 根据经营范围获得的子分类
 * @param merchantId
 * @param columnId
 * @param rangeType
 * @returns {*}
 */
ColumnService.getFilterChildrenByMerchantId = function (merchantId, columnId, rangeType) {
    var children = ColumnApi.IsoneBaseEngine.columnService.getAllColumnChildren(columnId);
    if (children) {
        children = ColumnApi.BusinessRangeHelper.filterByBusinessRange(merchantId, children, rangeType);
        if (children) {
            return JSON.parse(children.toString());
        }
    }
    return [];
};

/**
 * 根据经营范围获得商品的子分类
 * @param merchantId
 * @param columnId
 * @returns {*}
 */
ColumnService.getFilterProductCategoryChildren = function (merchantId, columnId) {
    return ColumnService.getFilterChildrenByMerchantId(merchantId, columnId, "mp_tree");
};


/**
 * 判断某个栏目是否拥有子栏目，性能大大好于getChildren(columnId).length>0;
 * @param columnId
 * @return {Boolean}
 */
ColumnService.hasChildren = function (columnId) {
    if(!columnId){
        return false;
    }
    var sortList = ColumnApi.IsoneBaseEngine.columnService.getChildren(columnId);
    return (sortList.getSize() > 0);
};


/**
 * 判断某个栏目是否拥有子栏目，性能大大好于getChildren(merchantId, columnId).length>0;
 * @param merchantId
 * @param columnId
 * @returns {boolean}
 */
ColumnService.hasChildrenByMerchantId = function (merchantId, columnId) {
    var sortList = ColumnApi.IsoneBaseEngine.columnService.getChildren(merchantId, columnId);
    return (sortList.getSize() > 0);
};

/**
 * 返回某个column的全路径
 * @param columnId
 * @param fromId  根节点ID,从哪里开始算
 * @param px     分隔符
 * @return {String}
 */
ColumnService.getColumnNamePath = function (columnId, fromId, px) {
    return "" + ColumnApi.IsoneBaseEngine.columnService.getColumnNamePath(columnId, fromId, px);
};

/**
 *  返回某个column的全路径，不过路径的组成部分不是column名称，而是每个栏目的ID
 * @param columnId
 * @param fromId   从哪里开始算
 * @param px       分隔符
 * @return {String}
 */
ColumnService.getColumnIdPath = function (columnId, fromId, px) {
    return "" + ColumnApi.IsoneBaseEngine.columnService.getColumnIdPath(columnId, fromId, px);
};

/**
 *  返回某个column的全路径，不过路径的组成部分不是column名称，而是每个栏目的ID
 * @param columnId
 * @param fromId   从哪里开始算
 * @param px       分隔符
 * @return {String}
 */
ColumnService.getColumnNamePathWithoutFirst = function (columnId, fromId, px) {
    return "" + ColumnApi.IsoneBaseEngine.columnService.getColumnNamePathWithoutFirst(columnId, fromId, px);
}

/**
 *  增加column
 * @param parentId 父columnId
 * @param col   需要添加的column对象
 * @return {String}
 */
ColumnService.addColumn = function (parentId, col) {
    var s = JSON.stringify(col);
    var jo = new ColumnApi.JSONObject(s);
    ColumnApi.IsoneBaseEngine.columnService.addToColumn(parentId, jo);
    return "" + jo.optString("id");
};
/**
 *  删除column
 * @param colId columnId
 * @return {String}
 */
ColumnService.deleteColumn = function (colId) {
    try {
        ColumnApi.IsoneBaseEngine.columnService.deleteColumn(colId);
    }
    catch (e) {
        e.printStackTrace();
        throw new Error("删除失败，err:" + e.getMessage());

    }
};
/**
 *  保存column
 * @param column column对象
 * @return {null}
 */
ColumnService.saveColumn = function (column) {
    var jColumn = new ColumnApi.JSONObject(JSON.stringify(column));
    ColumnApi.IsoneBaseEngine.columnService.saveColumn(jColumn);
};

ColumnService.updatePos = function (objId, pos, parentId) {
    ColumnApi.IsoneBaseEngine.columnService.updatePos(objId, pos, parentId);
};

ColumnService.getColumnPath = function (columnId, fromId, includeFromId) {
    var listColumns = ColumnApi.IsoneBaseEngine.columnService.getColumnPath(columnId, fromId, includeFromId);
    var s = "" + ColumnApi.Util.bean2String(listColumns);
    var columnPath = JSON.parse(s);
    return columnPath.map(function (col) {
        return col.objectMap;
    });
};

/**
 * 判断商品栏目下是否有商品
 * @param merchantId
 * @param columnId
 * @return {number}
 * 1代表true,0代表false
 */
ColumnService.isExistProduct = function (merchantId, columnId) {
    var slist = ColumnApi.IsoneModulesEngine.productService.getList(columnId, merchantId);
    var rowCount = parseInt(slist.getSize());
    if (rowCount == 0) {
        return 0;
    }
    var list = slist.getRange(0, -1);
    var ids = [];
    for (var i = 0; i < list.size(); i++) {
        ids.push(list.get(i).getObjid());
    }
    var productLists = ColumnApi.IsoneModulesEngine.productService.getListDataByIds(ids, true);
    ColumnApi.IsoneModulesEngine.productService.setNoVersions(ids, productLists);
    var flag = 0;
    for (var j = 0; j < productLists.size(); j++) {
        var jProduct = productLists.get(j);
        if (jProduct == null) {
            continue;
        }
        var productId = "" + jProduct.optString("id");
        var publishState = ColumnApi.ProductUtil.getPublishState(jProduct);
        var isDelete = ColumnApi.ProductUtil.isDeleted(jProduct);
        if (publishState != 1 || isDelete != false) {
            continue;
        }
        flag++;
    }
    if (flag > 0) {
        return 1;
    }
    return 0;
};

/**
 * 获得本栏目下的对象的属性模板，例如栏目下的商品，信息等的属性模板。但不是本栏目自身的属性模板。
 */
ColumnService.getCompleteAttrTemplateByColumnId = function (columnId) {
    var javaObj = ColumnApi.DynaAttrUtil.getCompleteAttrTemplateByColumnId(columnId);
    if (!javaObj) {
        return null;
    }
    var s = "" + javaObj.toString();
    return JSON.parse(s);
};
/**
 * 获取属性组
 * @param jTemplate
 * @returns {*}
 */
ColumnService.getAttrGroups = function (jTemplate) {
    return ColumnApi.DynaAttrFunctions.getAttrGroups(jTemplate);
};
/**
 * 获得属性组中的所有重要属性
 */
ColumnService.getImportantPropertyAttrs = function (attrs) {
    return ColumnApi.DynaAttrFunctions.getImportantPropertyAttrs(attrs);
};
/**
 * 通过columnId获取动态属性模板id
 * @param columnId
 * @returns {*}
 */
ColumnService.getAttrTemplateId = function (columnId) {
    return ColumnApi.IsoneBaseEngine.columnService.getAttrTemplateId(columnId);
};

ColumnService.getProductColumnPath = function (column, includeFirst) {
    var jColumn = new ColumnApi.JSONObject(JSON.stringify(column));
    var productColumnPath = ColumnApi.ColumnUtil.getProductColumnPath(jColumn, includeFirst);
    return JSON.parse(productColumnPath.toString());
};

/**
 * 保存分类路径和id的关联关系
 * @param path
 * @param id
 */
ColumnService.bindPath2Id = function (path, id) {
    ColumnApi.IsoneModulesEngine.productCategoryService.bindPath2Id(path, id);
};

/**
 * 根据分类路径获取到对应的分类ID
 * @param path
 */
ColumnService.getIdByPath = function (path) {
    var id = ColumnApi.IsoneModulesEngine.productCategoryService.getIdByPath(path);
    return id + "";
};
