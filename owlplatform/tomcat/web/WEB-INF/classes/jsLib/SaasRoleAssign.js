//#import Util.js
//#import merchant.js
//#import merchantRights.js
//#import app.js
//#import SaasActionGroup.js
//#import SaasUserGroup.js
//#import SaasRoleService.js

var SaasRoleAssignApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.saas,
    Packages.net.xinshi.isone.commons,
    Packages. net.xinshi.saas.privilege.bean
);

var SaasRoleAssignService = {
//    void assignUserGroupToRole(String merchantId,String userGroupId,String roleId) throws Exception;
    assignUserGroupToRole:function(merchantId,userGroupId,roleId){
        SaasRoleAssignApi.SaasPrivilegeEngine.roleAssignService.assignUserGroupToRole(merchantId,userGroupId,roleId);
    },
//    void removeUserGroupFromRole(String merchantId,String userGroupId,String roleId) throws Exception;
    removeUserGroupFromRole:function(merchantId,userGroupId,roleId){
        SaasRoleAssignApi.SaasPrivilegeEngine.roleAssignService.removeUserGroupFromRole(merchantId,userGroupId,roleId);
    },

//    List<String> getUserGroupsOfRole(String merchantId,String roleId) throws Exception;
    getUserGroupsOfRole:function(merchantId,roleId){
        var ids = SaasRoleAssignApi.SaasPrivilegeEngine.roleAssignService.getUserGroupsOfRole(merchantId,roleId);
        return JSON.parse(SaasRoleAssignApi.Util.bean2String(ids));
    },
//    List<String> getRolesOfUserGroup(String merchantId,String userGroupId) throws Exception;
    getRolesOfUserGroup:function(merchantId,userGroupId){
        var ids = SaasRoleAssignApi.SaasPrivilegeEngine.roleAssignService.getRolesOfUserGroup(merchantId,userGroupId);
        return JSON.parse(SaasRoleAssignApi.Util.bean2String(ids));
    },

    //�������Ȩ�޵�app
    filterByUserPrivilege:function(apps,merchantId,userId){
        if(userId=='u_0' || userId=='u_1'){
            return apps;
        }

        //�����ĸ�ʺţ�Ҳ����Ҫ��֤
        var rootAdminId = MerchantService.getRootAdmin(merchantId);
        if(userId==rootAdminId){
            return apps;
        }

        //�ж���Щ��Ȩ��
        var userGroupIds = SaasUserGroupService.getEffectiveUserGroupIdsOfUser(userId,merchantId);
        var effectiveRoleIds = [];
        userGroupIds.forEach(function(groupId){
            var roleIds = SaasRoleAssignService.getRolesOfUserGroup(merchantId,groupId);
            roleIds.forEach(function(roleId){
                if(effectiveRoleIds.indexOf(roleId)<0){
                    effectiveRoleIds.push(roleId);
                }
            });
        });
        //���ÿ��role��Ӧ��app
        apps.forEach(function (app) {
            var stockActionGroups = SaasActionGroupService.getStockActionGroups(app.md5, app.id);
            var customActionGroups = SaasActionGroupService.getCustomActionGroups(merchant, app.id);
            var actionGroups = [];
            if(stockActionGroups){
                actionGroups =  actionGroups.concat(stockActionGroups);
            }
            if(customActionGroups){
                actionGroups = actionGroups.concat(customActionGroups);
            }

            app.actionGroups = actionGroups;
        });


        var actionGroupIds = [];
        var result = [];
        effectiveRoleIds.forEach(function(roleId){
            var groupIds = SaasRoleService.getActionGroupsOfRole(roleId);
            actionGroupIds = actionGroupIds.concat(groupIds);
        });
        apps.forEach(function(app){
            var found = false;
            app.actionGroups.forEach(function(actionGroup){
                if(actionGroupIds.indexOf(actionGroup.id)>=0){
                    found = true;
                }
            });
            if(found){
                result.push(app);
            }
        });
        return result;
    },
    checkPrivilege:function(userId,merchantId,appId,actionGroupId){
        if(userId=='u_0' || userId=='u_1'){
            return true;
        }
        //�����ĸ�ʺţ�Ҳ����Ҫ��֤
        var rootAdminId = MerchantService.getRootAdmin(merchantId);
        if(userId==rootAdminId){
            return true;
        }

        var userGroupIds = null;
        if(userId){
            userGroupIds = SaasUserGroupService.getEffectiveUserGroupIdsOfUser(userId,merchantId);
        }
        if(!userGroupIds){
            userGroupIds=[];
        }
        userGroupIds.push("usergroup_public");
        var effectiveRoleIds = [];
        userGroupIds.forEach(function(groupId){
            var roleIds = SaasRoleAssignService.getRolesOfUserGroup(merchantId,groupId);
            roleIds.forEach(function(roleId){
                if(effectiveRoleIds.indexOf(roleId)<0){
                    effectiveRoleIds.push(roleId);
                }
            });
        });
        var hasPrivilege = false;
        var effectiveActionGroup = appId + "_" + actionGroupId;
        effectiveRoleIds.forEach(function(roleId){
            var groupIds = SaasRoleService.getActionGroupsOfRole(roleId);
            if(groupIds.indexOf(effectiveActionGroup)>=0){
                hasPrivilege = true;
            }
        });
        return hasPrivilege;
    },
    checkAnyPrivileges:function(userId,merchantId,appId,actionGroupIds){
        if(userId=='u_0' || userId=='u_1'){
            return true;
        }
        //�����ĸ�ʺţ�Ҳ����Ҫ��֤
        var rootAdminId = MerchantService.getRootAdmin(merchantId);
        if(userId==rootAdminId){
            return true;
        }
        var userGroupIds = null;
        if(userId){
            userGroupIds = SaasUserGroupService.getEffectiveUserGroupIdsOfUser(userId,merchantId);
        }
        if(!userGroupIds){
            userGroupIds=[];
        }
        userGroupIds.push("usergroup_public");

        var effectiveRoleIds = [];
        userGroupIds.forEach(function(groupId){
            var roleIds = SaasRoleAssignService.getRolesOfUserGroup(merchantId,groupId);
            roleIds.forEach(function(roleId){
                if(effectiveRoleIds.indexOf(roleId)<0){
                    effectiveRoleIds.push(roleId);
                }
            });
        });

        var hasPrivilege = false;

        var effectiveActionGroupIds = actionGroupIds.map(function(actionGroupId){return appId + "_" + actionGroupId;});
        effectiveRoleIds.forEach(function(roleId){
            var groupIds = SaasRoleService.getActionGroupsOfRole(roleId);
            effectiveActionGroupIds.forEach(function(effectiveActionGroupId){
                if(groupIds.indexOf(effectiveActionGroupId)>=0){
                    hasPrivilege = true;
                }
            });
        });
        return hasPrivilege;
    }


};