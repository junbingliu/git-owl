var DynaAttrApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.base,
    Packages.net.xinshi.isone.functions.dynaattr,
    Packages.net.xinshi.isone.base.dynaattr
);

/**
 * @namespace
 * @type {Object}
 */
var DynaAttrService = {};

/**
 * 获得本栏目下的对象的属性模板，例如栏目下的商品，信息等的属性模板。但不是本栏目自身的属性模板。
 */
DynaAttrService.getCompleteAttrTemplateByColumnId = function (columnId) {
    var json = DynaAttrApi.DynaAttrUtil.getCompleteAttrTemplateByColumnId(columnId);
    if (!json) {
        return null;
    }
    return JSON.parse(json.toString());
};
/**
 * 获取属性组
 * @param jTemplate
 * @returns {*}
 */
DynaAttrService.getAttrGroups = function (jTemplate) {
    return DynaAttrApi.DynaAttrFunctions.getAttrGroups(jTemplate);
};
/**
 * 获得属性组中的所有重要属性
 */
DynaAttrService.getImportantPropertyAttrs = function (attrs) {
    return DynaAttrApi.DynaAttrFunctions.getImportantPropertyAttrs(attrs);
};

/**
 * 根据属性名称获取某个模板的属性对象
 * 前提：同一个属性模板同一种类型（库存属性和非库存属性）原则上不能重名，否则取第一个
 * @param jTemplate
 * @param attrName
 * @param attrType : 0 普通属性 | 1 库存属性 | 2 同款属性
 * @returns {*}
 */
DynaAttrService.getAttrByAttrName = function (jTemplate, attrName, attrType) {
    var jParams = $.toJavaJSONObject(jTemplate);
    var json = DynaAttrApi.DynaAttrUtil.getAttrByAttrName(jParams, attrName, attrType);
    return JSON.parse(json.toString());
};

/**
 * 根据属性名称获取某个模板的属性对象
 * 前提：同一个属性模板同一种类型（库存属性和非库存属性）原则上不能重名，否则取第一个
 * @param jTemplate
 * @param attrName
 * @param attrType : 0 普通属性 | 1 库存属性 | 2 同款属性
 * @returns {*}
 */
DynaAttrService.getAttrIdByAttrName = function (jTemplate, attrName, attrType) {
    var jParams = $.toJavaJSONObject(jTemplate);
    return ""+ DynaAttrApi.DynaAttrUtil.getAttrIdByAttrName(jParams, attrName, attrType);
};

DynaAttrService.getInheritedStandardValues = function (groupId,attributeId) {
    var json = DynaAttrApi.DynaAttrFunctions.getInheritedStandardValues(groupId,attributeId);
    if(json){
        return JSON.parse(json.toString());
    }
};

/**
 * 根据标准值id获得标准值
 * @param valueId
 * @returns {*}
 */
DynaAttrService.getStandardValueByValueId = function (valueId) {
    var json = DynaAttrApi.IsoneBaseEngine.standardValueService.getValue(valueId);
    if(json){
        return JSON.parse(json.toString());
    }
    return null;
};

/**
 * 根据动态属性ID获取动态属性
 * @param attrId
 * @returns {*}
 */
DynaAttrService.getAttrById = function (attrId) {
    if(!attrId){
        return null;
    }
    var json = DynaAttrApi.IsoneBaseEngine.dynaAttrService.getAttr(attrId);
    if(json){
        return JSON.parse(json.toString());
    }
    return null;
};

/**
 * 获取分类下的同款属性
 * @param columnId 分类ID
 * @returns {*}
 */
DynaAttrService.getSameStyleAttr = function (columnId) {
    if(!columnId){
        return null;
    }
    var json = DynaAttrApi.DynaAttrUtil.getCompleteAttrTemplateByColumnId(columnId);
    if (!json) {
        return null;
    }
    var jSameStyleAttr = DynaAttrApi.DynaAttrUtil.getSameStyleAttr(json);
    if (jSameStyleAttr != null) {
        return JSON.parse(jSameStyleAttr.toString());
    }
    return null;
};