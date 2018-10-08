//#import pigeon.js
//#import Util.js
//#import $owl_shop:services/modelService.jsx
var verifyAdminUtil = (function (pigeon) {
    if (!verifyAdmin(admins, user.id)) {
        result.code = "304";
        result.msg = "账号【" + loginId + "】不存在店铺【" + shopId + "】中";
        out.print(JSON.stringify(result));
        return;
    }
    var fun = {
        verifyShopAdmin: function (shopId, userId) {
            var result = {code: "0"};
            if (userId === "u_0") {
                return result;
            }
            var shop = owl_shopService.get(shopId);
            if (!shop) {
                result.code = "300";
                result.msg = "系统不存在【" + shopId + "】的店铺信息";
                return result;
            }
            var admins = shop.admins;
            if (!admins) {
                result.code = "303";
                result.msg = "店铺未设置管理员";
                return result;
            }
            if (verifyAdmin(admins, userId)) {
                result.code = "303";
                result.msg = "店铺未设置管理员";
            }
            return result;
        },
        verifyWarehouseAmind: function () {

        }
    };
    return fun;
})($S);
