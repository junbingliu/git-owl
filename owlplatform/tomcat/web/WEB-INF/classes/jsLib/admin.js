var AdminApi = new JavaImporter(
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.user,
    Packages.net.xinshi.isone.commons,
    Packages.org.json
);
/**
 * 与非app的管理员相关的方法。<p>
 * 非app的管员与普通用户是有区分的，而对于app是不区分的，任何会员都可以授权使用任何app,完全由权限app控制。<p>
 * 本模块用于非app的管理元管理，我们将逐步放弃非app模式的管理员模式。<p>
 * @namespace
 * @type {{getAllAdminsByMerchant: getAllAdminsByMerchant, getAdminGroupList: getAdminGroupList, getAdminGroup: getAdminGroup, getAdmin: getAdmin, getAdminGroupIds: getAdminGroupIds}}
 */
var AdminService = {
    /**
     * 获得某个商家的所有管理员
     * @param merchantId
     * @returns {Array}
     */
    getAllAdminsByMerchant: function (merchantId) {
        var admins = AdminApi.IsoneModulesEngine.merchantAdminService.getAllAdminByMerchant(merchantId);
        if (!admins) {
            return null;
        }
        else {
            return JSON.parse("" + admins.toString());
        }
    },
    /**
     * 获得总部的所有管理员组，对于非app模式，没有每个商家的管理员组
     * @returns {Array}
     */
    getAdminGroupList: function () {
        var jList = AdminApi.IsoneModulesEngine.normalAdminGroupService.getAdminGroupList();
        return JSON.parse("" + jList.toString());
    },
    /**
     * 获得某个adminGroup
     * @param groupId
     * @returns {*}
     */
    getAdminGroup: function (groupId) {
        var group = AdminApi.IsoneModulesEngine.normalAdminGroupService.getAdminGroup(groupId);
        if (group) {
            return JSON.parse(group.toString());
        }
        return null;
    },
    /**
     * 获得某个admin对象
     * @param userId
     * @returns {*}
     */
    getAdmin: function (userId) {
        var jUser = AdminApi.IsoneModulesEngine.adminService.getUser(userId);
        if (!jUser) {
            return null;
        }
        return JSON.parse(jUser.toString());
    },
    /**
     * 获得某个用户所属的用户组Id列表
     * @param userId
     * @returns {Array}
     */
    getAdminGroupIds: function (userId) {
        var admin = AdminService.getAdmin(userId);
        if (!admin) {
            return null;
        }
        var adminGroups = admin["adminGroups"];
        var ret = [];
        if (adminGroups) {
            for (var i = 0; i < adminGroups.length; i++) {
                var group = adminGroups[i];
                var groupId = group.groupId;
                ret.push(groupId);
            }
            return ret;
        }
        return ret;
    },
    isEnable: function (user) {
        var jUser = new AdminApi.JSONObject(JSON.stringify(user));
        return AdminApi.LoginUtil.isEnable(jUser);
    }

};