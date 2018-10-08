/**
 * Created with IntelliJ IDEA.
 * User: zsl
 * Date: 13-9-10
 * Time: 上午9:25
 * To change this template use File | Settings | File Templates.
 */

(function ($) {
    "use strict"; // jshint ;_;

    var IsoneAjaxStylePagination = function (initconfigs) {
        var $that = this;
        $that.ajaxType = "post";
        $that.args = {};
        $that.loadAfterEvent = undefined;
        if (initconfigs) {
            $that.data_container = initconfigs.data_container ? initconfigs.data_container : undefined;
            $that.pagination_container = initconfigs.pagination_container ? initconfigs.pagination_container : undefined;
            $that.pagination_params = initconfigs.pagination_params ? initconfigs.pagination_params : undefined;
            $that.ajaxUrl = initconfigs.ajaxUrl ? initconfigs.ajaxUrl : undefined;
        }

        $that.init = function () {
            if (!$that.pagination_params) {
                throw "pagination_params is undefined";
            }
            var $pagination_params = $($that.pagination_params);
            if ($pagination_params.length === 0) {
                throw "the div of pagination_params is not exist";
            }

            $that.isDisplayHomePage = false;
            $that.enableToPage = false; //是否显示跳转到页面
            $that.hideIfEmpty = false;//当数据为空时是否显示，默认为false
            $that.hideTotal = false;//是否显示总数量，默认为false
            $that.recordType = $pagination_params.attr("recordType");//分页对象,如：商品，团购，信息等
            $that.totalPages = parseInt($pagination_params.attr("totalPages"));//总页数
            $that.currentPage = parseInt($pagination_params.attr("currentPage")); //当前页
            $that.totalRecords = parseInt($pagination_params.attr("totalRecords")); //总数量
            $that.displayNum = 6; //一次显示页数
            $that.pageLimit = 10; //一页显示数量

            if ($pagination_params.attr("displayNum")) {
                $that.displayNum = parseInt($pagination_params.attr("displayNum"));
            }
            if ($pagination_params.attr("pageLimit")) {
                $that.pageLimit = parseInt($pagination_params.attr("pageLimit"));
            }
            if ($pagination_params.attr("enableToPage") && $pagination_params.attr("enableToPage") == "true") {
                $that.enableToPage = true;
            }
            if ($pagination_params.attr("hideIfEmpty") && $pagination_params.attr("hideIfEmpty") == "true") {
                $that.hideIfEmpty = true;
            }
            if ($pagination_params.attr("hideTotal") && $pagination_params.attr("hideTotal") == "true") {
                $that.hideTotal = true;
            }
        };

        $that.showPageHtml = function () {
            $that.init();
            if (!$that.pagination_container) {
                throw "pagination_container is undefined";
            }
            var $pagination_container = $($that.pagination_container);
            if ($pagination_container.length == 0) {
                throw "the div of pagination_container is not exist";
            }

            var containerId = $($that.data_container).attr("id");
            var anchorHref = "javascript:void(0);";
            if (containerId) anchorHref = "#" + containerId;

            if($that.hideIfEmpty && $that.totalRecords == 0){
                $pagination_container.html("");
                return;
            }

            var re = "";

            re += "<ul>";
            if ($that.currentPage > 1) {
                if ($that.isDisplayHomePage) {
                    re += "<li><a href='" + anchorHref + "' class='homePage do_click' data-a='1'></a></li>";
                }
            }
            if ($that.currentPage > 1) {
                re += "<li><a title='上一页' href='" + anchorHref + "' class='upPage do_click' data-a='" + ($that.currentPage - 1) + "'></a></li>";
            } else {
                re += "<li><a title='目前已是第一页' class='upPage'></a></li>";
            }

            /*计算显示的页*/
            if ($that.displayNum == 0) {
                re += "<li class='active'><a>" + $that.currentPage + "</a>/" + $that.totalPages + "</li>";
            } else {
                var pagecenter = $that.displayNum / 2 - 1;
                var pagebet = $that.displayNum / 2 + 1;
                var beginPage = 1;
                var endPage = 1;

                if ($that.currentPage < pagebet) {
                    beginPage = 1;
                } else {
                    beginPage = $that.currentPage - pagecenter;
                }

                if ($that.currentPage + pagecenter > $that.totalPages) {
                    endPage = $that.totalPages;
                } else {
                    endPage = $that.currentPage + pagecenter;
                }

                if ($that.currentPage + pagecenter < $that.displayNum) {
                    endPage = $that.displayNum;
                }

                if (endPage - $that.currentPage < pagecenter) {
                    beginPage = $that.totalPages - ($that.displayNum - 1);
                    if (beginPage != 1) {
                        beginPage += 1;
                    }
                }

                if (beginPage <= 0) {
                    beginPage = 1;
                }

                if (endPage > $that.totalPages) {
                    endPage = $that.totalPages;
                }

                if ($that.currentPage >= pagebet && beginPage != 1) {
                    re += "<li><a href='" + anchorHref + "' class='everyPage do_click'>1</a></li>";
                    if ($that.currentPage != pagebet) {
                        re += "<li><span>...</span></li>";
                    }
                }

                for (var i = beginPage; i <= endPage; i++) {
                    var item = "";
                    if (i != $that.currentPage) {
                        item = "<li><a href='" + anchorHref + "' class='everyPage do_click' data-a='" + i + "'>" + i +
                            "</a></li>";
                    } else {
                        item = "<li><a class='nowPage'>" + i +"</a></li>";
                    }
                    re += item;
                }
            }

            if ($that.currentPage < $that.totalPages) {
                re += "<li><a href='" + anchorHref + "' class='downPage do_click' data-a='" + ($that.currentPage + 1) + "'></a></li>";
            } else {
                re += "<li><a title='目前已是最后一页' class='downPage'></a></li>";
            }

            if ($that.enableToPage && $that.totalPages > $that.displayNum) {
                re += "<li><span>第</span></li>";
                re += "<li><input type='text' class='input toPage'></li>";
                re += "<li><span>页</span></li>";
                re += "<li><a href='" + anchorHref + "' class='toPage_submit'>确定</a></li>";
            }

            if (!$that.hideTotal) {
                if ($that.totalRecords == 0) {
                    re += "<li><span>共 " + $that.totalRecords;
                    if ($that.recordType != null && $that.recordType.length > 0) {
                        re += " 个" + $that.recordType;
                    }
                    re += "</span></li>";
                } else {
                    var start = ($that.currentPage - 1) * $that.pageLimit + 1;
                    var last;
                    if (start + $that.pageLimit > $that.totalRecords) {
                        last = $that.totalRecords;
                    } else {
                        last = start + $that.pageLimit - 1;
                    }
                    re += "<li><span>显示 " + start + " - " + last + " / 共 " + $that.totalRecords
                    if ($that.recordType != null && $that.recordType.length > 0) {
                        re += " 个" + $that.recordType;
                    }
                    re += "</span></li>";
                }
            }
            re += "</ul>";


            var $toPage_submit = $(".toPage_submit", $pagination_container);
            $toPage_submit.die();
            $toPage_submit.live("click", function () {
                var toPage = $(".toPage", $pagination_container);
                if (!toPage) {
                    alert("请输入要跳转到的页面!");
                    return;
                }
                var toPageValue = toPage.val();
                toPageValue = $.trim(toPageValue);
                if (toPageValue == "") {
                    alert("请输入要跳转到的页面!");
                    return;
                }
                var reg = new RegExp("^[1-9][0-9]*$");
                if (!reg.test(toPageValue)) {
                    alert("要跳转到的页面必须为非0的数字!");
                    return;
                }
                if (toPageValue > $that.totalPages) {
                    alert("最大跳转页数为：" + $that.totalPages + "，请重新输入!");
                    return;
                }
                $that.goPage(toPageValue);
            });

            var $do_click = $(".do_click");
            $do_click.die();
            $do_click.live("click", function () {
                var toPage = $(this).attr("data-a");
                $that.goPage(toPage);
            });

            $pagination_container.html("");
            $pagination_container.append(re);
        };

        $that.load = function (searchArgs) {
            $that.args = (searchArgs == null || searchArgs == undefined) ? {} : searchArgs;
            var postData = {page: 1};
            if ($that.args) {
                $.extend(postData, $that.args);
            }
            $that.doAjax(postData);
        };

        $that.goPage = function (page) {
            var postData = {page: page};
            $.extend(postData, $that.args);
            $that.doAjax(postData);
        };

        $that.doAjax = function (postData) {
            if (!$that.ajaxUrl) {
                throw "ajaxUrl is undefined";
            }
            if (!$that.data_container) {
                throw "data_container is undefined";
            }
            $.ajax({
                    url: $that.ajaxUrl,
                    type: $that.ajaxType,
                    data: postData,
                    dataType: 'html',
                    success: function (data) {
                        var divShow = $($that.data_container);
                        divShow.html("");
                        divShow.append(data);
                        $that.showPageHtml();
                        if($that.loadAfterEvent){
                            $that.loadAfterEvent.fireEvent();
                        }
                    }
                }
            );
        };
    };

    $.IsoneAjaxStylePagination = IsoneAjaxStylePagination;

})(window.jQuery);