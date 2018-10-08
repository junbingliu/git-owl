//#import session.js
//#import doT.min.js
//#import file.js
//#import pigeon.js
//#import login.js
//#import Util.js
//#import app.js
//#import merchantRights.js
//#import SaasRoleAssign.js
//#import $owl_shop:services/modelService.jsx
(function () {
    var merchantId = $.params["m"];
    var shopId = (!$.params["s"] || $.params["s"] === "undefined") ? null : $.params["s"];
    var warehouseId = (!$.params["w"] || $.params["w"] === "undefined") ? null : $.params["w"];
    var userId = LoginService.getBackEndLoginUserId();
    var apps = AppService.getIndependentApps(merchantId, 0, -1);
    var ruleApps = MerchantRightsService.getAvailableApps(merchantId);
    if (ruleApps) {
        apps = apps.concat(ruleApps);
    }
    // apps = SaasRoleAssignService.filterByUserPrivilege(apps, merchantId, userId);
    var keyword = $.params.keyword;

    var matchApps = [];
    if (!keyword) {
        matchApps = apps;
    } else {
        keyword = keyword.trim().replace(" ", "|");
        var pattern = new RegExp(keyword, 'gi');
        apps.forEach(function (app) {
            //todo 这里通过正则表达式匹配会有点问题，但是在后面再调用一次 pattern.test(app.name) 就又正常了
            var matchResult = pattern.test(app.name) || pattern.test(app.id);
            var nameResult = pattern.test(app.name);
            if (matchResult) {

                matchApps.push(app);
            }
        });
    }

    matchApps = matchApps.filter(function (app) {
        var meta = AppService.getAppMeta(app.id);
        var url = '/owl_desktop_default/home.jsx?m=' + merchantId + "&appId=" + app.id ;
        if (!meta) {
            return false;
        }
        if (meta.isWidget == true) {
            return false;
        }
        /*if (meta.isApi == true) {
            return false;
        }*/
        var subMeta = meta["#meta"];
        if (!subMeta) {
            return false;
        }
        if (shopId && shopId !== "" && shopId !== '0') {
            var isValidResult = isValid(subMeta, "shop");
            if (isValidResult) {
                url += "&s=" + shopId;
            } else {
                return false;
            }
        } else if (warehouseId && warehouseId !== "") {
            var isValidResult = isValid(subMeta, "warehouse");

            if (isValidResult) {
                url += "&w=" + warehouseId;
            } else {
                return false;
            }
        } else if(shopId === '0'){
            var isValidResult = isValid(subMeta, "platform");
            if (isValidResult) {
                url += "&s=" + shopId;
            } else {
                return false;
            }
        }

        if (subMeta.group) {
            app.group = subMeta.group;
        }
        if (subMeta.pos) {
            app.pos = subMeta.pos;
        }
        app.url = url;
        app.name=subMeta.rem;

        if (app.iconFileId) {
            var icon = FileService.getRelatedUrl(app.iconFileId, "");
            app.icon = icon;
        }
        return app != null;
    });


    matchApps.sort(function(a,b){

        if (a.pos == undefined){
            a.pos=100;
        }
        if (b.pos == undefined){
            b.pos=100;
        }
        return a.pos- b.pos;
       });

    var apps = {};
    matchApps.forEach(function (app) {

        if (app.group) {
            var appGroupId = app.group.id;
            var appGroups = apps[appGroupId];
            if (!appGroups) {
                appGroups = [];
            }
            appGroups.push(app);

            appGroups.sort(function(a,b){
                if (a.group.pos == undefined){
                    a.group.pos=100;
                }
                if (b.group.pos == undefined){
                    b.group.pos=100;
                }
                return a.group.pos-b.group.pos});
            apps[appGroupId] = appGroups;
        } else {
            apps[app.id] = app;
        }
    });


    var keys = Object.keys(apps);
    var appArray = [];
    for (var i = 0; i < keys.length; i++) {
        var app = apps[keys[i]];
        appArray.push(app);
    }

    var pageData = {appId: appId, apps: appArray, m: merchantId};
    if (shopId) {
        pageData.s = shopId;
    }
    if (warehouseId) {
        pageData.w = warehouseId;
    }
    /*var pageFn = doT.template(template);
    out.print(pageFn(pageData));*/

    var html = $.runDoT(appId,appMd5,'pages/leftMenu.jsxp',pageData);
    out.print(html);
}());

function isValid(meta, visitType) {
    var mVisitType = meta.visitType;
    if (!mVisitType || mVisitType.length == 0) {
        return false;
    }
    return mVisitType.some(function (type) {
        return type === visitType;
    });
    return false;
}
