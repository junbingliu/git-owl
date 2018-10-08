//#import session.js
//#import file.js
//#import app.js
//#import Util.js
//#import doT.min.js
(function () {
    var merchantId = $.params["m"];
    var shopId = (!$.params["s"] || $.params["s"] === "undefined") ? null : $.params["s"];
    var warehouseId = (!$.params["w"] || $.params["w"] === "undefined") ? null : $.params["w"];
    var type = (!$.params["type"] || $.params["type"] === "undefined") ? null : $.params["type"];
    var keyword = $.params.keyword;
    var sessionName = "appHistory";
    var sessionValue = SessionService.getSessionValue(sessionName, request);
    var historyList = [];
    var matchApps = [];
    if (sessionValue) {
        var objects = JSON.parse(sessionValue);
        var appIds = Object.keys(objects);
        appIds.forEach(function (appId) {
            var history = objects[appId];
            var app = AppService.getApp(appId);
            if (app) {
                app.viewTime = history.viewTime;
                historyList.push(app);
            }

        });


        if (!keyword) {
            matchApps = historyList;
        } else {
            keyword = keyword.trim().replace(" ", "|");
            var pattern = new RegExp(keyword, 'gi');
            historyList.forEach(function (app) {
                //todo 这里通过正则表达式匹配会有点问题，但是在后面再调用一次 pattern.test(app.name) 就又正常了
                var matchResult = pattern.test(app.name) || pattern.test(app.id);
                var nameResult = pattern.test(app.name);
                if (matchResult) {
                    matchApps.push(app);
                }
            });
        }

        if (matchApps.length) {
            matchApps = matchApps.sort(function (a, b) {
                return a.viewTime > b.viewTime;
            });
        }


        matchApps = matchApps.filter(function (app) {
            var meta = AppService.getAppMeta(app.id);
            var url = '/' + app.id + "/index.jsx?m=" + merchantId;
            if (!meta) {
                return false;
            }
            if (meta.isWidget == true) {
                return false;
            }
            if (meta.isApi == true) {
                return false;
            }
            var subMeta = meta["#meta"];
            if (!subMeta) {
                return false;
            }
            if (shopId && shopId !== "") {
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
            }
            if (subMeta.group) {
                app.group = subMeta.group;
            }
            app.url = url;
            if (app.iconFileId) {
                icon = FileService.getRelatedUrl(app.iconFileId, "");
                app.icon = icon;
            }
            return app != null;
        });
    }
    var template = $.getProgram(appMd5, "pages/leftMenu.jsxp");
    $.log("\n\n\n\n\n merchantId = " + merchantId + " \n\n\n\n");
    var pageData = {appId: appId, apps: matchApps, m: merchantId};
    if (shopId) {
        pageData.s = shopId;
    }
    if (warehouseId) {
        pageData.w = warehouseId;
    }
    if (type) {
        pageData.type = type;
    }
    var pageFn = doT.template(template);
    out.print(pageFn(pageData));
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