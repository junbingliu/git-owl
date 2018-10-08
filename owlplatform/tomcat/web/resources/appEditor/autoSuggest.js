(function ($) {

    $.fn.autoSuggest = function (options) {
        defaults = {
            url: options.url,
            keyLeft: 37,
            // 向左方向键
            keyUp: 38,
            // 向上方向键
            keyRight: 39,
            // 向右方向键
            keyDown: 40,
            // 向下方向键
            keyEnter: 13,
            // 回车键
            listHoverCSS: 'ks_selected',
            // 提示框列表鼠标悬浮的样式
            topoffset: options.topoffset || 10
        };
        var options = $.extend(defaults, options);
        var dropDiv = $('<ol id="tie" ></ol>').appendTo('#suggest_content');
        var isOver = false;
        dropDiv.hover(function () {
                isOver = true;
            },
            function () {
                isOver = false;
            });
        return this.each(function () {
            var $searchTxt = $(this);
            $(this).bind('keydown',
                function (event) {
                    if (dropDiv.css('display') != 'none') { // 当提示层显示时才对键盘事件处理
                        var currentList = dropDiv.find('.' + options.listHoverCSS);
                        if (event.keyCode == options.keyDown) { // 如果按的是向下方向键
                            if (currentList.length == 0 || getPointWord(currentList.next().mouseover()) == "") {
                                // 如果提示列表没有一个被选中,则将列表第一个选中
                                $(this).val(getPointWord(dropDiv.find('.nor:first').mouseover()));
                            } else if (currentList.next().length == 0) {
                                // 如果是最后一个被选中,则取消选中,即可认为是输入框被选中
                                unHoverAll();
                            } else {
                                unHoverAll();
                                // 将原先选中列的下一列选中
                                if (currentList.next().length != 0) $(this).val(getPointWord(currentList.next().mouseover()));
                            }
                            return false;
                        } else if (event.keyCode == options.keyUp) { // 如果按的是向上方向键
                            if (currentList.length == 0 || getPointWord(currentList.prev().mouseover()) == "") {
                                $(this).val(getPointWord(dropDiv.find('.nor:last').mouseover()));
                            } else if (currentList.prev().length == 0) {
                                unHoverAll();
                            } else {
                                unHoverAll();
                                if (currentList.prev().length != 0) $(this).val(getPointWord(currentList.prev().mouseover()));
                            }
                            return false;
                        } else if (event.keyCode == options.keyEnter) {
                            dropDiv.parent().hide();
                            dropDiv.empty();
                        }
                    }
                    // 当按下键之前记录输入框值,以方便查看键弹起时值有没有变
                    $(this).attr('alt', $(this).val());
                }).bind('keyup',
                function (event) {
                    // 如果弹起的键是向上或向下方向键则返回
                    if (event.keyCode == options.keyDown || event.keyCode == options.keyUp) return;
                    //modified by weic.lu 输入英文文本长度大等于2时才搜索
                    //中文长度>=1
                    var kwLength = 0;
                    if ($(this).val() != '' && $(this).val().length > 1) {
                        var kwContent = $(this).val();
                        for (var i = 0; i < kwContent.length; i++) {
                            if (kwContent.charCodeAt(i) > 255) {
                                kwLength += 2;
                            } else {
                                kwLength += 1;
                            }
                            if (kwLength >= 2) {
                                break;
                            }
                        }
                    }

                    if ($(this).val() == '' || kwLength.length < 2) {
                        dropDiv.parent().hide();
                        dropDiv.empty();
                        return;
                    }
                    // 若输入框值没有改变或变为空则返回
                    if ($(this).val() == $(this).attr('alt')) return;
                    getData($searchTxt, $(this).val());
                }).bind('blur',
                function () {
                    if (isOver && dropDiv.find('.' + options.listHoverCSS) != 0) return;
                    // 文本输入框失去焦点则清空并隐藏提示层
                    dropDiv.parent().hide();
                    dropDiv.empty();
                });
            /** 处理ajax返回成功的方法* */
            handleResponse = function (parent, json) {

                if (json == null || json.length == 0) {
                    // 返回数据为空
                    $("#tie").parent().hide();
                    return;
                }
                refreshDropDiv(parent, json);

                var $dropDiv = $(dropDiv);
                $dropDiv.parent().show();
            }
            /** 处理ajax失败的方法* */
            handleError = function (error) {
                // showError("由于url错误或超时请求失败!");
            }
            showError = function (error) {
                alert(error);
            }
            /** 通过ajax返回json格式数据生成用来创建dom的字符串* */
            render = function (parent, json) {
                var appendStr = '';
                // 用json对象中内容替换模版字符串中匹配/\{([a-z]+)\}/ig的内容,如{word},{view}
                for (var i = 0; i < json.length; i++) {
                    if (json[i].num == null) {
                        if (i == 0)appendStr += "<li class=\"nor\"><em class=\"suggest_key\" title=" + json[i].keyword + ">" + json[i].keyword + "</em></li>";
//                        appendStr += "<li class=\"nor\" valueId=\""+json[i].id+" \" ><em class=\"suggest_key sor\" title=\""+json[i].keyword+"\" style=\"margin-left: 15px;\">在<strong style=\"color: #CC0000;\">" + json[i].name  +"</strong>分类中搜索"+ "</em></li>";
                        appendStr += '<li class="nor" valueId="' + json[i].id + '"><em class="suggest_key sor" title="' + json[i].keyword + '" style="margin-left: 15px;">在<strong style="color: #CC0000;">' + json[i].name + '</strong>分类中搜索</em></li>';
                    } else {
                        appendStr += "<li class=\"nor\"  ><em class=\"suggest_key\" title=" + json[i].name + ">" + json[i].name + "</em></li>";
                    }
                }
                jebind(parent, appendStr);
            }
            /** 将新建dom对象插入到提示框中,并重新绑定mouseover事件监听* */
            jebind = function (parent, a) {
                dropDiv.append(a);
                $(".nor", dropDiv).off("mouseover click");
                $(".nor", dropDiv).bind({
                    mouseover: function () {
                        unHoverAll();
                        var columnId = $(this).attr("valueId");
//                        alert("1+"+columnId);
                        if (null != columnId && columnId != "") {
                            $("#columnId").val(columnId);
                        }
                        $(this).addClass(options.listHoverCSS);
                    },
                    click: function () {
                        $searchTxt.val(getPointWord($(this)));
                        var keyword = getPointWord($(this));
                        var columnId = $(this).attr("valueId");
                        if(options.callback){
                            options.callback(keyword,columnId);
                        }
                        dropDiv.parent().hide();
                        dropDiv.empty();
                        $searchTxt.focus();
                    }
                });
            }
            /**将提示框中所有列的hover样式去掉**/
            unHoverAll = function () {
                dropDiv.find('.nor').each(function () {
                    $(this).removeClass(options.listHoverCSS);
                });
            }
            /**在提示框中取得当前选中的提示关键字**/
            getPointWord = function (p) {
                return p.find('.suggest_key').attr("title");
            }
            /**刷新提示框,并设定样式**/
            refreshDropDiv = function (parent, json) {
                var left = parent.offset().left;
                var height = parent.height();
                var top = parent.offset().top + options.topoffset + height;
                var width = options.width || parent.width() + 'px';
                dropDiv.empty();

                render(parent, json);
                //防止ajax返回之前输入框失去焦点导致提示框不消失
                parent.focus();
            }
            /**通过ajax向服务器请求数据**/
            getData = function (parent, word) {
                word = word.replace(/[()'";,{}~!@#$%^&*(){}?\|<>.]/g, "");
                $.getJSON(options.url + "?keyword=" + encodeURI(word) + "&callback=?",
                    function (json) {
                        handleResponse(parent, json);
                    });
            }
        });
    }
})(jQuery);
