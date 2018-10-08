var OrganizationApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.organization,
    Packages.java.util
);

/**
 * @namespace
 * @type {Object}
 */
var OrganizationService = {};

/**
 * 获得一个组织机构
 * @param ogId
 * @return {*}
 */
OrganizationService.getOrganization = function (ogId) {
    var jcol = OrganizationApi.IsoneModulesEngine.organizationService.getOrganization(ogId);
    if (!jcol) {
        return null;
    }
    return JSON.parse(jcol.toString());
};

/**
 * 获得所有子组织机构
 * @param ogId
 * @return {Array}
 */
OrganizationService.getChildren = function (ogId) {
    var jlist = OrganizationApi.IsoneModulesEngine.organizationService.getAllOrganizationChildren(ogId);
    if (!jlist) {
        return null;
    }
    return JSON.parse(jlist.toString());
};
