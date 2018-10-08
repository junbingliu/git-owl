(function ($) {
    "use strict";

    var TreeSelector = function (e, loaderUrl, root, values) {
        this.elem = e;
        this.values = values;
        this.loaderUrl = loaderUrl;
        this.root = root;
        this.data = {};
        this.changeListeners = [];
        if(this.values==null){
            this.values = [];
        }

        this.loadValues = function () {
            var postValues = [];
            if (!this.data[this.root]) {
                postValues.push(this.root);
            }

            for (var i = 0; i < this.values.length; i++) {
                if (!this.data[this.values[i]]) {
                    postValues.push(this.values[i]);

                }
            }
            var that = this;
            $.post(loaderUrl, {values:postValues.join(",")}, function (data) {
                $.extend(that.data, data);
                that.render();
            }, "json");

        }

        this.fireChangeEvent = function(){
            for(var i=0; i<this.changeListeners.length; i++){

                this.changeListeners[i](this);

            }
        }
        this.render = function () {
            var template = $.templates("<select data-parent='{{:parent}}' data-level='{{:level}}'>" +
                "{{if id==null}}<option>请选择...</option>{{/if}}" +
                "{{for options}}<option value='{{:id}}' {{if id==#parent.parent.data.id}} selected {{/if}} parentid='{{:#parent.parent.data.id}}'>{{:name}}</option>{{/for}}" +
                "</select>");

            var parent = this.root;
            var html = "";
            for (var i = 0; i < this.values.length; i++) {
                var options = this.data[parent];
                if (options && options.length > 0) {
                    html += template.render({"parent":parent, "options":options, "id":this.values[i], level:i});
                    parent = this.values[i];
                }
            }
            if (this.data[parent] != null && this.data[parent].length > 0) {
                var options = this.data[parent];
                html += template.render({"parent":parent, "options":options, level:this.values.length});
            }

            $(this.elem).html(html);
            var that = this;

            $("select", this.elem).bind("change", function (e) {
                var level = $(this).attr("data-level");
                var pos = parseInt(level);
                var id = $(this).val();
                var len = that.values.length;
                len = len > 0 ? len : len -1;
                that.values.splice(pos,len);
                that.values[pos] = id;
                that.loadValues();
                that.fireChangeEvent();

            });

        }

        this.getSelectedRegion = function () {
            if (this.values == null || this.values.length == 0) {
                return null;
            }
            return this.values[this.values.length - 1];
        }

        this.isLast = function () {
            var regionId = this.getSelectedRegion();
            if (this.data[regionId] != null && this.data[regionId].length == 0) {
                return true;
            }
            return false;
        }

        this.getSelectedRegionFullName = function () {
            var parent = this.root;
            var result = "";
            for (var i = 0; i < this.values.length; i++) {
                var arr = this.data[parent];
                if(arr == undefined){
                    continue;
                }
                for (var j = 0; j < arr.length; j++) {
                    var col = arr[j];
                    if (col.id === this.values[i]) {
                        result = result + col.name;
                        parent = col.id;
                        break;
                    }
                }
            }
            return result;
        }

        this.addChangeListener = function (listener) {
            this.changeListeners.push(listener);
        }
    }
    $.TreeSelector = TreeSelector;

})(jQuery);