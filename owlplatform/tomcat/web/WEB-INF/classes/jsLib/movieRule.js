var MovieRuleApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.movie.rule,
    Packages.net.xinshi.isone.modules.movie.tools
);
/**
 * @constructor
 * @type {Object}
 */
var MovieRuleService = {};

MovieRuleService.searchMovieRule = function (merchantId, searchArgs) {
    var objString = JSON.stringify(searchArgs);
    var jParams = new MovieRuleApi.JSONObject(objString);
    var json = MovieRuleApi.MovieRuleSearchUtil.searchMovieRule(merchantId, jParams);
    return JSON.parse(json.toString());
};

/**
 * 添加规则
 * @param merchantId
 * @param userId
 * @param movieRule
 * @returns {*}
 */
MovieRuleService.addMovieRule = function (merchantId, userId, movieRule) {
    var objString = JSON.stringify(movieRule);
    var jMovieRule = new MovieRuleApi.JSONObject(objString);
    var s = MovieRuleApi.IsoneModulesEngine.movieRuleService.addMovieRule(merchantId, userId, jMovieRule);
    if (!s) return null;
    return s + "";
};

/**
 * 修改规则
 * @param movieRuleId
 * @param movieRule
 */
MovieRuleService.updateMovieRule = function (movieRuleId, movieRule) {
    var objString = JSON.stringify(movieRule);
    var jMovieRule = new MovieRuleApi.JSONObject(objString);
    MovieRuleApi.IsoneModulesEngine.movieRuleService.updateMovieRule(movieRuleId, jMovieRule);
};

/**
 * 根据id获得规则
 * @param movieRuleId
 * @returns {*}
 */
MovieRuleService.getMovieRule = function (movieRuleId) {
    var json = MovieRuleApi.IsoneModulesEngine.movieRuleService.getMovieRule(movieRuleId);
    if (!json) return null;
    return JSON.parse(json.toString());
};

/**
 * 删除规则
 * @param movieRuleId
 * @param userId
 */
MovieRuleService.deleteMovieRule = function (movieRuleId, userId) {
    MovieRuleApi.IsoneModulesEngine.movieRuleService.deleteMovieRule(movieRuleId, userId);
};

/**
 * 重建索引
 * @param movieRuleId
 */
MovieRuleService.addIndexingQue = function (movieRuleId) {
    MovieRuleApi.IsoneModulesEngine.movieRuleService.addIndexingQue(movieRuleId);
};


