/**
 * Created with IntelliJ IDEA.
 * User: zsl
 * Date: 12-8-21
 * Time: 下午15:05
 * To change this template use File | Settings | File Templates.
 */

(function ($) {
    "use strict"; // jshint ;_;

    var IsoneStylePagination = function (e) {
        this.elem = $(e);

        var _recordType = this.elem.attr("recordType");//分页对象,如：商品，团购，信息等
        var _totalPages = parseInt(this.elem.attr("totalPages"));//总页数
        var _currentPage = parseInt(this.elem.attr("currentPage")); //当前页
        var _totalRecords = parseInt(this.elem.attr("totalRecords")); //总数量
        var _displayNum = 6; //一次显示页数
        var _pageLimit = 10; //一页显示数量

        if (this.elem.attr("displayNum")) {
            _displayNum = parseInt(this.elem.attr("displayNum"));
        }
        if (this.elem.attr("pageLimit")) {
            _pageLimit = parseInt(this.elem.attr("pageLimit"));
        }

        this.getCleanUrl = function () {
            var fullUrl = document.location.href;

            var reg = new RegExp("page=([^&?]*)", "g");
            var tempPage = ((fullUrl.match(reg)) ? (fullUrl.match(reg)[0]) : null);
            if (tempPage != null) {
                return fullUrl.replace(tempPage, "");
            }
            return fullUrl;
        };
        var cleanUrl = this.getCleanUrl();

        this.getCompleteUrl = function (reqUrl, page) {
            if (reqUrl.indexOf("?") > 0) {
                var urlLength = reqUrl.length;
                if (reqUrl.lastIndexOf("?") == (urlLength - 1) || reqUrl.lastIndexOf("&") == (urlLength - 1)) {
                    return reqUrl + "page=" + page;
                }
                return reqUrl + "&page=" + page;
            } else {
                return reqUrl + "?page=" + page;
            }
        };

        var re = "";

        re += "<ul>";
        if (_currentPage > 1) {
            re += "<li><a title='上一页' class='upPage' href='" + this.getCompleteUrl(cleanUrl, _currentPage - 1) +
                "'></a></li>";
        } else {
            re += "<li><a title='目前已是第一页' class='upPage'></a></li>";
        }

        //计算显示的页
        if (_displayNum == 0) {
            re += "<li><a href='#'>" + _currentPage + "</a>/" + _totalPages + "</li>";
        } else {
            var pagecenter = _displayNum / 2 - 1;
            var pagebet = _displayNum / 2 + 1;
            var beginPage = 1;
            var endPage = 1;

            if (_currentPage < pagebet) {
                beginPage = 1;
            } else {
                beginPage = _currentPage - pagecenter;
            }

            if (_currentPage + pagecenter > _totalPages) {
                endPage = _totalPages;
            } else {
                endPage = _currentPage + pagecenter;
            }

            if (_currentPage + pagecenter < _displayNum) {
                endPage = _displayNum;
            }

            if (endPage - _currentPage < pagecenter) {
                beginPage = _totalPages - (_displayNum - 1);
                if (beginPage != 1) {
                    beginPage += 1;
                }
            }

            if (beginPage <= 0) {
                beginPage = 1;
            }

            if (endPage > _totalPages) {
                endPage = _totalPages;
            }

            if (_currentPage >= pagebet && beginPage != 1) {
                re += "<li><a class='everyPage' href='" + this.getCompleteUrl(cleanUrl, 1) +
                    "'>1</a></li>";
                if (_currentPage != pagebet) {
                    re += "<li><span>...</span></li>";
                }
            }

            for (var i = beginPage; i <= endPage; i++) {
                var item = "";
                if (i != _currentPage) {
                    item = "<li><a class='everyPage' href='" + this.getCompleteUrl(cleanUrl, i) +
                        "'>" + i +
                        "</a></li>";
                } else {
                    item = "<li><a class='nowPage' href='#'>" + i +
                        "</a></li>";
                }
                re += item;
            }
        }

        if (_currentPage < _totalPages) {
            re += "<li><a title='下一页' class='downPage' href='" + this.getCompleteUrl(cleanUrl, _currentPage + 1) +
                "'></a></li>";
        } else {
            re += "<li><a title='目前已是最后一页' class='downPage'></a></li>";
        }

        if (_totalRecords == 0) {
            re += "<li><span>共 " + _totalRecords;
            if (_recordType != null && _recordType.length > 0) {
                re += " 个" + _recordType;
            }
            re += "</span></li>";
        } else {
            var start = (_currentPage - 1) * _pageLimit + 1;
            var last;
            if (start + _pageLimit > _totalRecords) {
                last = _totalRecords;
            } else {
                last = start + _pageLimit - 1;
            }
            re += "<li><span>显示 " + start + " - " + last + " / 共 " + _totalRecords;
            if (_recordType != null && _recordType.length > 0) {
                re += " 个" + _recordType;
            }
            re += "</span></li>";
        }
        re += "</ul>";

        this.elem.append(re);

    };
    $.IsoneStylePagination = IsoneStylePagination;

})(window.jQuery);