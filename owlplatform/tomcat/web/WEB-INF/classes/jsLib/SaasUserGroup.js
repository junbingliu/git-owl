var SassGroupsApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.saas,
    Packages.net.xinshi.isone.commons,
    Packages.net.xinshi.saas.usergroup.bean
);

var SaasUserGroupService = {
    addUser2UserGroup: function (userId, merchantId, userGroupId) {
        SassGroupsApi.SaasPrivilegeEngine.saasUserGroupService.addUser2UserGroup(userId, merchantId, userGroupId);
    },
    removeUserFromUserGroup: function (userId, merchantId, userGroupId) {
        SassGroupsApi.SaasPrivilegeEngine.saasUserGroupService.removeUserFromUserGroup(userId, merchantId, userGroupId);
    },
    getChildren: function (merchantId, userGroupId) {
        var children = SassGroupsApi.SaasPrivilegeEngine.saasUserGroupService.getChildren(merchantId, userGroupId);
        var jsonString = SassGroupsApi.Util.bean2String(children);
        var result = JSON.parse("" + jsonString);
        return result;
    },
    getUserGroupIdsOfUser: function (userId, merchantId) {
        var groupIds = SassGroupsApi.SaasPrivilegeEngine.saasUserGroupService.getUserGroupIdsOfUser(userId, merchantId);
        var result = JSON.parse("" + SassGroupsApi.Util.bean2String(groupIds));
        return result;
    },
    getEffectiveUserGroupIdsOfUser: function (userId, merchantId) {
        var groupIds = SassGroupsApi.SaasPrivilegeEngine.saasUserGroupService.getEffectiveUserGroupIdsOfUser(userId, merchantId);
        var result = JSON.parse("" + SassGroupsApi.Util.bean2String(groupIds));
        return result;
    },
    addUserGroup: function (userGroup) {
        var saasUserGroup = new SassGroupsApi.SaasUserGroup();
        saasUserGroup.setName(userGroup.name);
        if(userGroup.parentId){
            saasUserGroup.setParentId(userGroup.parentId);
        }
        saasUserGroup.setDescription(userGroup.description);
        saasUserGroup.setMerchantId(userGroup.merchantId);
        SassGroupsApi.SaasPrivilegeEngine.saasUserGroupService.addUserGroup(saasUserGroup);
        return "" + saasUserGroup.getId();
    },
    updateUserGroup: function (userGroup) {
        var saasUserGroup = new SassGroupsApi.SaasUserGroup();
        saasUserGroup.setName(userGroup.name);
        saasUserGroup.setId(userGroup.id);
        if(userGroup.parentId){
            saasUserGroup.setParentId(userGroup.parentId);
        }
        saasUserGroup.setDescription(userGroup.description);
        saasUserGroup.setMerchantId(userGroup.merchantId);
        SassGroupsApi.SaasPrivilegeEngine.saasUserGroupService.updateUserGroup(saasUserGroup);
    },
    removeUserGroup: function (userGroup) {
        var saasUserGroup = new SassGroupsApi.SaasUserGroup();
        saasUserGroup.setName(userGroup.name);

        saasUserGroup.setId(userGroup.id);
        if(userGroup.parentId){
            saasUserGroup.setParentId(userGroup.parentId);
        }
        saasUserGroup.setDescription(userGroup.description);
        saasUserGroup.setMerchantId(userGroup.merchantId);
        SassGroupsApi.SaasPrivilegeEngine.saasUserGroupService.removeUserGroup(saasUserGroup);
    },
    getSaasUserGroup: function (id) {
        var group = SassGroupsApi.SaasPrivilegeEngine.saasUserGroupService.getSaasUserGroup(id);
        return JSON.parse("" + SassGroupsApi.Util.bean2String(group));
    },

    getUsersCountOfUserGroup:function(merchantId, userGroupId){
        return SassGroupsApi.SaasPrivilegeEngine.saasUserGroupService.getUsersCountOfUserGroup(merchantId,userGroupId);
    },
    getUserIdsOfUserGroup:function(merchantId, userGroupId, from, num){
        var ids =  SassGroupsApi.SaasPrivilegeEngine.saasUserGroupService.getUserIdsOfUserGroup(merchantId,userGroupId,from,num);
        var ret = JSON.parse(""+SassGroupsApi.Util.bean2String(ids));
        return ret;
    }

};

