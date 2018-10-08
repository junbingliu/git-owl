//#import Util.js
var UserProfileApi = new JavaImporter(
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.user,
    Packages.net.xinshi.isone.functions.user,
    Packages.net.xinshi.isone.commons,
    Packages.net.xinshi.isone.lucene,
    Packages.net.xinshi.isone.lucene.search.user,
    Packages.net.xinshi.isone.lucene.search,
    Packages.net.xinshi.isone.modules.account,
    Packages.net.xinshi.isone.base,
    Packages.net.xinshi.isone.modules.userProfile.bean,
    Packages.org.json
);


var UserProfileService = {
    setUserInfo: function (userId, key, value) {
        UserProfileApi.IsoneModulesEngine.userProfileService.setUserInfo(userId,key,value);
    },
    getUserInfo: function (userId, key) {
        return "" + UserProfileApi.IsoneModulesEngine.userProfileService.getUserInfo(userId,key);
    },
    getHistoryOfType: function (userId, key, from, number) {
        var histories=  UserProfileApi.IsoneModulesEngine.userProfileService.getHistoryOfType(userId,key,from,number);
        $.java2Javascript(histories);
    },
    getHistoryOfUser: function (userId, from, number) {
        var histories=  UserProfileApi.IsoneModulesEngine.userProfileService.getHistoryOfUser(userId,from,number);
        $.java2Javascript(histories);
    },
    getHistoryOfPlatform: function (from, number) {
        var histories=  UserProfileApi.IsoneModulesEngine.userProfileService.getHistoryOfPlatform(from,number);
        $.java2Javascript(histories);
    }
}