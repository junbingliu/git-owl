//#import Util.js
var SaasRoleApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.saas,
    Packages.net.xinshi.isone.commons,
    Packages. net.xinshi.saas.privilege.bean
);

var SaasRoleService = {
    //void addRole(Role role) throws Exception;
    addRole:function(role){
        var roleBean = $.getBean("net.xinshi.saas.privilege.bean.Role",role);
        return "" + SaasRoleApi.SaasPrivilegeEngine.roleService.addRole(roleBean);
    },
    //void updateRole(Role role) throws Exception;
    updateRole:function(role){
        var roleBean = $.getBean("net.xinshi.saas.privilege.bean.Role",role);
        SaasRoleApi.SaasPrivilegeEngine.roleService.updateRole(roleBean);
    },

    // void deleteRole(Role role) throws Exception;
    deleteRole:function(roleId){
        SaasRoleApi.SaasPrivilegeEngine.roleService.deleteRole(roleId);
    },

    //Role getRole(String roleId) throws Exception;
    getRole:function(roleId){
        var roleBean = SaasRoleApi.SaasPrivilegeEngine.roleService.getRole(roleId);
        if(!roleBean){
            return null;
        }
        return JSON.parse("" + SaasRoleApi.Util.bean2String(roleBean));
    },
    //List<Role> getPublicRoles(int from,int num) throws Exception;
    getPublicRoles:function(from,num){
        var list = SaasRoleApi.SaasPrivilegeEngine.roleService.getPublicRoles(from,num);
        return JSON.parse("" + SaasRoleApi.Util.bean2String(list));
    },

    //List<Role> getPrivateRoles(String merchantId,int from,int num) throws Exception;
    getPrivateRoles:function(merchantId,from,num){
        var list = SaasRoleApi.SaasPrivilegeEngine.roleService.getPrivateRoles(merchantId,from,num);
        return JSON.parse("" + SaasRoleApi.Util.bean2String(list));
    },

    //List<Role> getImportedRoles(String merchantId,int from,int num) throws Exception;
    getImportedRoles:function(merchantId,from,num){
        var list = SaasRoleApi.SaasPrivilegeEngine.roleService.getImportedRoles(merchantId,from,num);
        return JSON.parse("" + SaasRoleApi.Util.bean2String(list));
    },

    //long getPublicRolesCount() throws Exception;
    getPublicRolesCount:function(){
        return SaasRoleApi.SaasPrivilegeEngine.roleService.getPublicRolesCount();
    },

    //long getPrivateRolesCount(String merchantId) throws Exception;
    getPrivateRolesCount:function(){
        return SaasRoleApi.SaasPrivilegeEngine.roleService.getPublicRolesCount();
    },

    //long getImportedRolesCount(String merchantId) throws Exception;
    getImportedRolesCount:function(){
        return SaasRoleApi.SaasPrivilegeEngine.roleService.getImportedRolesCount();
    },

    //void importRole(String merchantId,String roleId) throws Exception;
    importRole:function(merchantId,roleId){
        return SaasRoleApi.SaasPrivilegeEngine.roleService.importRole(merchantId,roleId);
    },
    //void removeImportedRole(String merchantId,String roleId) throws Exception;
    removeImportedRole : function(merchantId,roleId){
        return SaasRoleApi.SaasPrivilegeEngine.roleService.removeImportedRole(merchantId,roleId);
    },

    //将role发布成公共的role
    //void publishRole(String roleId) throws Exception;
    publishRole:function(roleId){
        return SaasRoleApi.SaasPrivilegeEngine.roleService.publishRole(roleId);
    },
    //平台管理员才能处理这个删除的功能
    //void deleteFromPublicRole(String roleId) throws Exception;
    deleteFromPublicRole : function(roleId){
        SaasRoleApi.SaasPrivilegeEngine.roleService.deleteFromPublicRole(roleId);
    },

    //void addActionGroupToRole(String roleId,String actionGroupId) throws Exception;
    addActionGroupToRole:function(roleId,actionGroupId){
        SaasRoleApi.SaasPrivilegeEngine.roleService.addActionGroupToRole(roleId,actionGroupId);
    },

    //void removeActionGroupFromRole(String roleId,String actionGroupid) throws Exception;
    removeActionGroupFromRole:function(roleId,actionGroupId){
        SaasRoleApi.SaasPrivilegeEngine.roleService.removeActionGroupFromRole(roleId,actionGroupId);
    },
    //List<String> getActionGroupsOfRole(String roleId) throws Exception;
    getActionGroupsOfRole:function(roleId){
        var ids = SaasRoleApi.SaasPrivilegeEngine.roleService.getActionGroupsOfRole(roleId);
        return JSON.parse(SaasRoleApi.Util.bean2String(ids));
    },
    //List<String> getRolesOfActionGroup(String actionGroupId) throws Exception;
    getRolesOfActionGroup:function(actionGroupId){
        var ids = SaasRoleApi.SaasPrivilegeEngine.roleService.getRolesOfActionGroup(actionGroupId);
        return JSON.parse(SaasRoleApi.Util.bean2String(ids));
    },
    clearActionGroups :function(roleId){
       var ids = SaasRoleService.getActionGroupsOfRole(roleId);
       ids.map(function(id){
           SaasRoleService.removeActionGroupFromRole(roleId,id);
       });
    }
};