//#import util.js

var UserApi = new JavaImporter(
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.user,
    Packages.net.xinshi.isone.functions.user,
    Packages.net.xinshi.isone.commons,
    Packages.net.xinshi.isone.lucene,
    Packages.net.xinshi.isone.lucene.search.user,
    Packages.net.xinshi.isone.lucene.search,
    Packages.net.xinshi.isone.functions.account,
    Packages.net.xinshi.isone.modules.account,
    Packages.net.xinshi.isone.modules.order,
    Packages.net.xinshi.isone.base,
    Packages.java.lang,
    Packages.java.util,
    Packages.org.json,
    Packages.net.xinshi.isone.modules.user.tools
);
var params = {};
if ($body) {
    params = JSON.parse($body);
}

var keyword = params.keyword;
var page = params.page || 1;
var pageSize = params.pageSize || 20;

var userSearchArgs = new UserApi.UserSearchArgs();
userSearchArgs.setSearchType(UserApi.SearchTypes.USER);
if (keyword) {
    userSearchArgs.setKeyword(keyword);
}
userSearchArgs.setFetchCount(pageSize);
userSearchArgs.setFromPath((page - 1) * pageSize);
var searchResult = UserApi.IsoneFulltextSearchEngine.searchServices.search(userSearchArgs);
var total = searchResult.getTotal() + 0;
var ids = searchResult.getLists();
var users = UserApi.IsoneModulesEngine.userService.getListDataByIds(ids, false);
var hits = [];
for (var i = 0; i < users.size(); i++) {
    var user = users.get(i);
    var u = {};
    u.id = "" + user.get("id");
    u.loginId = "" + user.opt("loginId");
    u.realName = "" + user.opt("realName");
    u.nickName = "" + user.opt("nickName");
    hits.push(u);
}
var ret = {
    state: 'ok',
    list: hits,
    total: total
}
out.print(JSON.stringify(ret));






