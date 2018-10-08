var SaasActionGroupApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.saas,
    Packages.net.xinshi.isone.commons,
    Packages. net.xinshi.saas.privilege.bean
);
var SaasActionGroupService = {
//    List<ActionGroup> getStockActionGroups(String appMd5,String appId) throws Exception;
    getStockActionGroups :function(appMd5,appId){
       var jgroups = SaasActionGroupApi.SaasPrivilegeEngine.actionGroupService.getStockActionGroups(appMd5,appId);
       return JSON.parse(SaasActionGroupApi.Util.bean2String(jgroups));
    },

//    List<ActionGroup> getCustomActionGroups(String appId) throws Exception;
    getCustomActionGroups :function(merchantId,appId){
        var jgroups = SaasActionGroupApi.SaasPrivilegeEngine.actionGroupService.getCustomActionGroups(merchantId,appId);
        return JSON.parse(SaasActionGroupApi.Util.bean2String(jgroups));
    },
    getAllCustomActionGroups :function(merchantId){
        var jgroups = SaasActionGroupApi.SaasPrivilegeEngine.actionGroupService.getAllCustomActionGroups(merchantId);
        return JSON.parse(SaasActionGroupApi.Util.bean2String(jgroups));
    },
//    List<ActionGroup> searchActionGroupByUrl(String url) throws Exception;
    searchActionGroupByUrl :function(merchantId,url){
        var jgroups = SaasActionGroupApi.SaasPrivilegeEngine.actionGroupService.getCustomActonGroups(merchantId,url);
        return JSON.parse(SaasActionGroupApi.Util.bean2String(jgroups));
    },
//    void addActionGroup(ActionGroup actionGroup) throws Exception;
    addActionGroup :function(actionGroup){
       var javaObject = $.getBean("net.xinshi.saas.privilege.bean.ActionGroup",actionGroup);
       SaasActionGroupApi.SaasPrivilegeEngine.actionGroupService.addActionGroup(javaObject);
       return "" + javaObject.getId();
    },
//    void updateActionGroup(ActionGroup actionGroup) throws Exception;
    updateActionGroup :function(actionGroup){
        var javaObject = $.getBean("net.xinshi.saas.privilege.bean.ActionGroup",actionGroup);
        SaasActionGroupApi.SaasPrivilegeEngine.actionGroupService.updateActionGroup(javaObject);
    },
//    void deleteActionGroup(String actionGroupId) throws Exception;
    deleteActionGroup :function(actionGroupId){
        SaasActionGroupApi.SaasPrivilegeEngine.actionGroupService.deleteActionGroup(actionGroupId);
    },

//    List<String> getOldAppIds() throws Exception;
    getOldAppIds :function(actionGroupId){
        var appIds = SaasActionGroupApi.SaasPrivilegeEngine.actionGroupService.getOldAppIds();
        JSON.parse("" + SaasActionGroupApi.Util.bean2String(appIds));
    },
//    void removeOldAppId(String appId) throws Exception;
    removeOldAppId :function(appId){
        SaasActionGroupApi.SaasPrivilegeEngine.actionGroupService.removeOldAppId(appId);
    },
//    void addOldAppId(String appId) throws Exception;
    addOldAppId :function(appId){
        SaasActionGroupApi.SaasPrivilegeEngine.actionGroupService.addOldAppId(appId);
    }
};