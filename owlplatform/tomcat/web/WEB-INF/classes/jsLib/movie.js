//#import Util.js

var MovieApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.movie.tools,
    Packages.net.xinshi.isone.modules.movie.ui,
    Packages.net.xinshi.isone.functions.commend
);

/**
 * @constructor
 * @type {Object}
 */
var MovieService = {};

/**
 * 获得热映电影推荐
 * @param merchantId : 影院商家ID
 * @param logoSize : 图片尺寸（如：96X128）
 * @param number : 电影数量
 * @returns {*}
 */
MovieService.getHotMovie = function (merchantId, logoSize, number) {
    var json = MovieApi.MovieCommendFunctions.getMovieCommendList(merchantId, "col_m_Movie_201", logoSize, number);
    return JSON.parse(json.toString());
};

/**
 * 获得影院列表
 * @param merchantId : 影院商家ID
 * @param searchArgs : 相关搜索参数，JSON（page，limit，keyword）
 * @returns {pageCount，totalCount，curPage，recordList}
 */
MovieService.getCinemaList = function (merchantId, searchArgs) {
    var jParams = $.toJavaJSONObject(searchArgs);
    var json = MovieApi.CinemaSearchHelper.getCinemaList(merchantId, jParams);
    return JSON.parse(json.toString());
};

/**
 * 获得影院详情
 * @param cinemaId : 影院ID
 * @returns {*}
 */
MovieService.getCinema = function (cinemaId) {
    var json = MovieApi.IsoneModulesEngine.cinemaService.getCinema(cinemaId);
    if (!json) return null;
    return JSON.parse(json.toString());
};

/**
 * 获得电影列表
 * @param merchantId : 影院商家ID
 * @param searchArgs : 相关搜索参数，JSON（page，limit，merchantId，keyword）
 * @returns {pageCount，totalCount，curPage，recordList}
 */
MovieService.getMovieList = function (merchantId, searchArgs) {
    var jParams = $.toJavaJSONObject(searchArgs);
    var json = MovieApi.MovieSearchHelper.getMovieList(merchantId, jParams);
    return JSON.parse(json.toString());
};

/**
 * 获得电影详情
 * @param movieId : 电影库中的电影ID
 * @returns {*}
 */
MovieService.getMovie = function (movieId) {
    var json = MovieApi.IsoneModulesEngine.movieService.getMovie(movieId);
    if (!json) return null;
    return JSON.parse(json.toString());
};

/**
 * 获得影院商家经营的电影ID（注意：mMovieId为商家经营电影的电影ID，movieId为平台电影库的电影ID）
 * @param merchantId : 影院商家ID
 * @param movieId : 电影库中的电影ID
 * @returns {*}
 */
MovieService.getMMovieId = function (merchantId, movieId) {
    var v = MovieApi.IsoneMovieEngine.merchantMovieService.getMMovieId(merchantId, movieId);
    return "" + v;
};

/**
 * 获得电影的类型
 * @param movie : 电影对象
 * @param spec : 分隔符，如‘/’
 * @returns 比如：动作/冒险/魔幻
 */
MovieService.getMovieTypes = function (movie, spec) {
    var jMovie = $.toJavaJSONObject(movie);
    var v = MovieApi.MovieValueUtil.getMovieTypes(jMovie, spec);
    return "" + v;
};

/**
 * 根据影院ID和播放日期，获得所有播放的电影
 * @param merchantId  : 影院商家ID
 * @param cinemaId  : 影院ID
 * @param playDate : 播放日期
 * @returns {*}
 */
MovieService.getOpenMovieListByCinemaId = function (merchantId, cinemaId, playDate) {
    var json = MovieApi.GlobalMovieHelper.getOpenMovieListByCinemaId(merchantId, cinemaId, playDate);
    if (!json) return null;
    return JSON.parse(json.toString());
};

/**
 * 根据电影ID和播放日期，获得所有播放该电影的影院
 * @param merchantId  : 影院商家ID
 * @param movieId  : 电影ID
 * @param playDate : 播放日期
 * @returns {*}
 */
MovieService.getOpenCinemaListByMovieId = function (merchantId, movieId, playDate) {
    var json = MovieApi.GlobalMovieHelper.getOpenCinemaListByMovieId(merchantId, movieId, playDate);
    if (!json) return null;
    return JSON.parse(json.toString());
};


/**
 * 根据播放日期、影院ID和电影ID，获得所有场次（注意：影院ID和电影ID不能同时为空）
 * @param merchantId  : 影院商家ID
 * @param cinemaId  : 影院ID
 * @param movieId  : 电影ID
 * @param playDate : 播放日期
 * @returns {*}
 */
MovieService.getArrangeListByMovieId = function (merchantId, cinemaId, movieId, playDate) {
    var json = MovieApi.GlobalMovieHelper.getArrangeListByMovieId(merchantId, cinemaId, movieId, playDate);
    if (!json) return null;
    return JSON.parse(json.toString());
};

/**
 * 根据场次ID，获得所有座位号
 * @param merchantId
 * @param mpid
 * @returns {*}
 */
MovieService.getOpiSeatInfoListByMpId = function (merchantId, mpid) {
    var json = MovieApi.GlobalMovieHelper.getOpiSeatInfoListByMpId(merchantId, mpid);
    if (!json) return null;
    return JSON.parse(json.toString());
};

/**
 * 根据影院编码获得影院ID
 * @param merchantId : 影院商家ID
 * @param cinemaCode : 第三方平台的影院ID（比如格瓦拉的影院ID）
 * @returns {string}
 */
MovieService.getCinemaIdByCinemaCode = function (merchantId, cinemaCode) {
    var v = MovieApi.IsoneMovieEngine.code2CinemaService.getCinemaIdByCinemaCode(merchantId, cinemaCode);
    return "" + v;
};

/**
 * 根据电影编码获得电影ID
 * @param merchantId : 影院商家ID
 * @param movieCode  : 第三方平台的电影ID（比如格瓦拉的电影ID）
 * @returns {string}
 */
MovieService.getMovieIdByMovieCode = function (merchantId, movieCode) {
    var v = MovieApi.IsoneMovieEngine.code2MovieService.getMovieIdByMovieCode(merchantId, movieCode);
    return "" + v;
};



