var LoginApi = new JavaImporter(
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.user,
    Packages.net.xinshi.isone.modules.user.tools,
    Packages.net.xinshi.isone.commons,
    Packages.net.xinshi.isone.modules.businessruleEx,
    Packages.org.json
);


/**
 * 与登录相关的函数
 * @type {{getFrontendUserId: getFrontendUserId, getBackEndLoginUserId: getBackEndLoginUserId, loginBackend: loginBackend, getFrontendUser: getFrontendUser}}
 */

var LoginService = {
    /**
     * 获取当前登录用户Id,如果还没有登录则返回空字符串
     * @returns {string}
     */
    getFrontendUserId: function () {
        var userId = LoginApi.LoginSessionUtils.getFrontendLoginUserId(request);
        if (!userId) {
            return "";
        }
        return "" + userId;
    },


    /**
     * 获得后台登录用户的Id
     * @returns {string}
     */
    getBackEndLoginUserId: function () {
        var userId = LoginApi.LoginSessionUtils.getBackendLoginUserId(request);
        if (!userId) {
            return "";
        }
        return "" + userId;

    },
    /**
     * 登录到后台
     * @param loginKey
     * @param password
     * @param validateCode
     * @returns {*}
     */
    loginBackend: function (loginKey, password, validateCode) {
        var user = LoginApi.IsoneModulesEngine.adminService.getUserByKey(loginKey);
        if (!user) {
            return {state:false,msg:"noUser," + loginKey};
        }
        var userId = user.getString("id");
        var result = LoginApi.LoginUtil.loginByKey(loginKey, password, LoginApi.LoginUtil.TARGET_MEMBER);
        if (result == 100) {
            return {state: true, userId: "" + userId};
        }
        return {state: false,msg:"password error."};
    },

    /**
     * 检查前台会员登录
     * @param loginKey
     * @param password
     * @returns {boolean}
     */
    loginFrontend: function (loginKey, password) {
        var ret = {};
        var user = LoginApi.IsoneModulesEngine.userService.getUserByKey(loginKey);
        if (!user) {
            ret["state"] = false;
            ret["code"] = 104;
            return ret;
        }
        var userId = user.getString("id");
        var result = LoginApi.LoginUtil.loginByKey(loginKey, password, LoginApi.LoginUtil.TARGET_MEMBER);
        if (result == 100) {
            //100 ==  IUserService.LOGIN_SUCCESSFUL
            LoginApi.LoginSessionUtils.loginFrontend(request, response, userId);
            ret["state"] = true;
        } else {
            ret["state"] = false;
        }
        ret["code"] = result;
        ret.userId = userId + "";
        return ret;
    },

    setFrontEndUser: function (request, response, userId) {
        LoginApi.LoginSessionUtils.loginFrontend(request, response, userId);
    },

    /**
     * 检查帐号密码是否正确
     * @param loginKey
     * @param password
     * @returns {boolean}
     */
    loginByKey: function (loginKey, password) {
        var result = LoginApi.LoginUtil.loginByKey(loginKey, password, LoginApi.LoginUtil.TARGET_MEMBER);
        if (result == 100) {
            return true;
        }
        return false;
    },
    /**
     * 无需密码直接登录
     * @param userId
     */
    loginFrontendByUserId: function (userId) {
        LoginApi.LoginSessionUtils.loginFrontend(request, response, userId);
    },
    loginBackendByUserId: function (userId) {
        LoginApi.LoginSessionUtils.loginBackend(request, response, userId);
    },

    getFrontendUser: function () {
        var userId = LoginApi.LoginSessionUtils.getFrontendLoginUserId(request);
        if (!userId) {
            return null;
        }
        else {
            var user = LoginApi.IsoneModulesEngine.userService.getUser(userId, true);
            if (!user) {
                return null;
            }
            return JSON.parse("" + user.toString());
        }
    },

    getBackendUser: function () {
        var userId = LoginApi.LoginSessionUtils.getBackendLoginUserId(request);
        if (!userId) {
          return null;
        }
        else {
          var user = LoginApi.IsoneModulesEngine.userService.getUser(userId, true);
          if (!user) {
            return null;
          }
          return JSON.parse("" + user.toString());
        }
    },

    setKeepLoginTime: function (keepLoginTimeSeconds) {
        LoginApi.LoginSessionUtils.setKeepLoginTime(keepLoginTimeSeconds, request);
    },
    /**
     * 退出前台会员
     */
    logoutFrontend: function () {
        LoginApi.LoginSessionUtils.logoutFrontend(request);
    },

    logoutBackend: function () {
        LoginApi.LoginSessionUtils.logoutBackend(request);
    },
    judgeMemberField: function (field, flag) {
        return "" + LoginApi.IsoneModulesEngine.userService.judgeMemberField(field, flag);
    },
    /**
     * 根据手机号码增加会员或登录前台,注意要引入user.js
     * @param mobilePhone 注册人手机号
     * @param parentId 推荐人ID或登录ID等
     * @returns {{state: string,msg:string}}
     */
    loginOrAddUser: function (mobilePhone, parentId) {
        var result = {state: 'err', isAdd: "N", userId: ''};
        if (!mobilePhone) {
            result.msg = "参数为空";
            return result;
        }
        var existsUser = UserService.getUserByKey(mobilePhone);
        if (existsUser) {
            LoginService.loginFrontendByUserId(existsUser.id);
            result.state = "ok";
            result.userId = existsUser.id;
            return result;
        } else {
            var jUser = {};
            jUser.isEnable = "1";
            jUser.loginId = "";
            jUser.mobilPhone = mobilePhone;
            jUser.source_isOnline = "1";//线上
            jUser.source = "phone";//来源写死了是手机端
            jUser.source_entrance = "default";
            jUser.parentId = parentId || "";
            jUser.createTime = new Date().getTime();

            var userId = UserService.register(jUser, 'u_0');
            if (userId) {
                LoginService.loginFrontendByUserId(userId);//登录前台
                UserService.addMemberField(mobilePhone, userId, "");//绑定手机号与会员关联关系
                LoginApi.UserRegisterUtil.executeRegisterPlan(userId);//执行注册奖励事件
                LoginApi.UserRegisterUtil.executeRecommendPlan(parentId, userId);//执行推荐奖励事件
                result.state = "ok";
                result.isAdd = "Y";
                result.userId = userId;
                result.msg = "注册成功";
            } else {
                result.msg = "注册失败";
            }
            return result;
        }
    }
};