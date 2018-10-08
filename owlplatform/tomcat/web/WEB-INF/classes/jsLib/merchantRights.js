//#import ps20.js
//#import app.js

var MerchantRightsApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.merchant,
    Packages.net.xinshi.isone.modules.merchant.impl,
    Packages.net.xinshi.isone.commons
);

/**
 *
 * @constructor
 */
function RightsDispatchRule(){
    var self = this;
    self.id = "";
    self.name = "";
    self.description = "";
    self.orgId = "";
    self.levelId = "";
    self.mainCategoryId = "";
    self.customCategoryId = "";
    self.templateId = "";
}
/**
 *
 * 与将app分配给商户相关的函数
 * @namespace
 * @type {{getAllTemplates: getAllTemplates, addTemplate: addTemplate, saveTemplate: saveTemplate, removeTemplate: removeTemplate, getTemplateById: getTemplateById, getDispatchRules: getDispatchRules, addDispatchRule: addDispatchRule, saveDispatchRule: saveDispatchRule, removeDispatchRule: removeDispatchRule, getDispatchRuleById: getDispatchRuleById, getAvailableApps: getAvailableApps}}
 */
var MerchantRightsService = {
    /**
     * 返回全部权限模版
     * @returns {*}
     */
    getAllTemplates: function () {
        return getObjects("allRightsTemplates", 0, -1);
    },
    /**
     * 添加一个权限模版
     * @param template
     * @returns {string}
     */
    addTemplate: function (template) {
        var id = "rightsTemplate_" + getId("rightsTemplate");
        template.id = id;
        saveObject(id, template);
        addToList("allRightsTemplates", id, id);
        return id;
    },
    /**
     * 保存权限模版
     * @param template
     */
    saveTemplate:function(template){
        saveObject(template.id,template);
    },
    /**
     * 删除权限模版
     * @param templateId
     */
    removeTemplate : function(templateId){
        deleteFromList("allRightsTemplates",templateId,templateId);
        saveObject(templateId,null);
    },
    getTemplateById : function(templateId){
        var template = getObject(templateId);
        return template;
    },
    //以下为权益分配相关方法
    getDispatchRules : function(){
        //获得所有的权益分配规则
        return getObjects("allRightsDispatchRules", 0, -1);
    },
    addDispatchRule: function (rule) {
        var id = "rightsDispatchRule_" + getId("rightsDispatchRule");
        rule.id = id;
        saveObject(id, rule);
        addToList("allRightsDispatchRules", id, id);
        return id;
    },
    saveDispatchRule:function(rule){
        saveObject(rule.id,rule);
    },
    removeDispatchRule : function(ruleId){
        deleteFromList("allRightsDispatchRules",ruleId,ruleId);
        saveObject(ruleId,null);
    },
    getDispatchRuleById : function(ruleId){
        return getObject(ruleId);
    } ,
    getAvailableApps : function(merchantId){
        var appIds =  MerchantRightsApi.NormalMerchantRightsService.getAvailableApps(merchantId);
        var s = MerchantRightsApi.Util.bean2String(appIds);
        var ids = JSON.parse(s);
        return AppService.getAppsByIds(ids);
    }
};
