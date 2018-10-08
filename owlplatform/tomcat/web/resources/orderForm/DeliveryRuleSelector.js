(function ($) {
    var DeliveryRuleSelector = function (oc, mode, elem, saveUrl, merchantId) {
        this.mode = mode;
        this.oc = oc;
        this.elem = elem;
        this.saveUrl = saveUrl;
        this.merchantId = merchantId;
        this.regionIds = null;
        this.regionSelector = null;
        this.deliveryRuleChangeListeners = [];

        this.selectedDeliveryTimeMapTable = {
            "everyday":"工作日、周末及假日均可送货",
            "m2f":"仅工作日送货",
            "s2s":"仅周末或假日送货"
        };
        this.setOc = function(oc){
            this.oc = oc;
            if (!oc.selectedDeliveryRuleId || !oc.selectedDeliveryTime) {
                this.mode = "edit";
            }
            else {
                if (oc.availableDeliveryRuleResults && oc.availableDeliveryRuleResults.length > 0) {
                    var found = false;
                    for (var i = 0; i < oc.availableDeliveryRuleResults.length; i++) {
                        var r = oc.availableDeliveryRuleResults[i];
                        if (r.ruleId == oc.selectedDeliveryRuleId ) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        this.mode = "edit";
                    }
                }
            }
        }

        this.setOc(oc);
        this.show = function () {
            if (this.oc && this.oc.availableDeliveryRuleResults && this.oc.availableDeliveryRuleResults.length > 0) {
                if (this.mode === 'edit') {
                    $(this.elem).html($("#deliveryRuleEditTemplate").render(this.oc));
                    $(this.elem).addClass("editing");
                    var that = this;
                    that.loadRegionSelect();
                    var selectObj = $("input:checked[name='deliveryRule']", that.elem);
                    if(selectObj && selectObj.attr("supportDP") == "1"){
                        $(".PickBox",that.elem).show();
                    }
                    $("input[name='deliveryRule']",that.elem).bind("change",function(){
                        var obj = $(this);
                        if(obj.attr("supportDP") == "1"){
                            $(".PickBox",that.elem).show();
                        }else{
                            $(".PickBox",that.elem).hide();
                        }
                    })

                    $(".save", that.elem).click(function () {
                        var selectedRuleId = $("input:checked[name='deliveryRule']", that.elem).val();
                        var selectedDeliveryTime = $("select[name='deliveryTime']", that.elem).val();
                        if (selectedDeliveryTime == null) {
                            alert("请选择配送时间。");
                            return;

                        }
                        if (selectedRuleId == null) {
                            alert("请选择配送方式。");
                            return;
                        }
                        var selectedRuleResult;
                        for(var i=0;i<that.oc.availableDeliveryRuleResults.length;i++){
                            var ruleResult =that.oc.availableDeliveryRuleResults[i];
                            if(ruleResult.ruleId===selectedRuleId){
                                selectedRuleResult = ruleResult;
                            }

                        }
                        if(selectedRuleResult.supportDP){
                            var domQuery = "input:checked[name='deliveryPoint_" + selectedRuleResult.ruleId + "']";
                            var selectedDeliveryPointId = $(domQuery, that.elem).val();
                            if(!selectedDeliveryPointId) {
                                alert("请选择自提点！");
                                return;
                            }
                        }
                        var  selectedDeliveryPointRegionId = '';
                        if(that.regionSelector && that.regionSelector.getSelectedRegion()){
                            selectedDeliveryPointRegionId = that.regionSelector.getSelectedRegion();
                        }
                        $.post(that.saveUrl, {'selectedRuleId':selectedRuleId, 'selectedDeliveryTime':selectedDeliveryTime,'selectedDeliveryPointId':selectedDeliveryPointId, 'regionId':that.oc.regionId, "m":that.merchantId,mode:'of',selectedDeliveryPointRegionId:selectedDeliveryPointRegionId}, function (data) {
                            if (data.state === 'ok') {
                                window.oc = data.oc;   //修改全局变量，这里好像很糟糕,改成fire一个Event
                                that.oc = data.oc;
                                if (window.onOcChange) {
                                    window.onOcChange(data.oc);
                                }
                                that.mode = 'show';
                                that.show();
                                that.fireDeliveryRuleChange();
                            }
                        }, 'json')
                    });
                    $(".cancel",that.elem).click(function(){
                        that.mode = "show";
                        that.show();
                    });
                }
                else {
                    if(this.oc.selectedDeliveryTime && this.oc.selectedDeliveryRuleResult != null){
                        this.oc.selectedDeliveryTimeName = this.selectedDeliveryTimeMapTable[this.oc.selectedDeliveryTime];
                        $(this.elem).html($("#deliveryRuleShowTemplate").render(this.oc));
                        $(this.elem).removeClass("editing");
                    }
                    else{
                        alert("还没有选择好配送方式或者由于情况发生了变化，需要你重新选择配送方式。");
                        this.mode = "edit";
                        this.show();
                    }
                    var that = this;
                    $(".edit",this.elem).click(function(){
                        that.mode = "edit";
                        that.show();
                    });
                }
            }
            else {
                $(this.elem).html($("#deliveryRuleErrorTemplate").render(oc));
                $(this.elem).removeClass("editing");
            }
        }

        this.setRegionIds = function (ids){
            if(ids == undefined){
                ids = null;
            }
            this.regionIds = ids;
        }

        this.loadRegionSelect = function(){
            var e = $(".DP_region",this.elem);
            if(e != undefined && e != null && e.length > 0){
                var ruleId = e.attr("ruleId");
                var that = this;
				var mid = this.merchantId;
                this.regionSelector = new $.TreeSelector(e, "/tools/selectColumnEx.jsp", "c_region_1602", this.regionIds);
                this.regionSelector.addChangeListener(function(treeSelector){
                    var domQuery = "input:checked[name='deliveryPoint_" + ruleId + "']";
                    var selectedDeliveryPointId = $(domQuery, that.elem).val();
                    $.get("/shopping/handle/new/loadDeliveryPoint.jsp",{regionId:treeSelector.getSelectedRegion(),merchantId:mid,selectedDeliveryPointId:selectedDeliveryPointId,deliveryRuleId:ruleId},function(data){
                        if(data['state']){
                            $("#deliveryPointsList").html($("#deliveryPointShowTemplate").render(data['points']));
                        }else{
                            $("#deliveryPointsList").html(data['errorMsg']);
                        }
                    },"json");
                });

                this.regionSelector.loadValues();
                this.regionSelector.fireChangeEvent();
            }

        }

        this.deliveryRuleChangeListener = function(listener){
            this.deliveryRuleChangeListeners.push(listener);
        }

        this.fireDeliveryRuleChange=function(){
            for(var i=0; i<this.deliveryRuleChangeListeners.length; i++){
                this.deliveryRuleChangeListeners[i](this.oc.selectedDeliveryRuleResult);
            }
        }
    }

    $.DeliveryRuleSelector = DeliveryRuleSelector;
})(jQuery);