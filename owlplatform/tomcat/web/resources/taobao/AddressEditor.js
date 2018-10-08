function clone(obj) {
    if(obj==null){
        return {};
    }
    var s = JSON.stringify(obj);
    return JSON.parse(s);
}

(function ($) {
    var AddressEditor = function (addresses, elem, editTemplate, listTemplate,kindlyReminderAndOtherAddress) {
        this.addresses = addresses;
        this.elem = elem;
        this.editTemplate = editTemplate;
        this.addressSelector = null;
        this.kindlyReminderAndOtherAddress = kindlyReminderAndOtherAddress;
        this.cloneAddr = {};
        this.show = function () {
            var that = this;
            $(this.elem).html($(this.editTemplate).render());
            $(".addressList", this.elem).html('<table>'+$(listTemplate).render(this.addresses)+'</table>');
            var table = $(".addressList table tbody").html();
            if (table != null) {
                $(".addressList table tbody", this.elem).append($(kindlyReminderAndOtherAddress).render());
            } else {
                $(".addressList table", this.elem).html($(kindlyReminderAndOtherAddress).render());
            }
            if(this.addresses.length==0){
                $("#othertaoBaoAddress").attr("checked",'checked')
                $(".loadaddress").show();
            }else{
                $("#kindlyOther").show();;
            }
            $(".addressList input", this.elem).bind("change", function () {
                $('input:radio[name="shipping_type"]').attr("checked",false);
                $("#tdexpress").html("");
                $("#tdems").html("");
                $("#deliveryPrice").html("0.00") ;
                var selectedAddressId = $(".addressList input:checked", that.elem).val();
                if(selectedAddressId=="other"){
                    $(".loadaddress").show();
                }else{
                    taoBaoAreaId= $(".addressList input:checked", that.elem).attr("taoBaoAreaId");
                    that.loadDeliveryPrice(taoBaoAreaId);
                    $(".loadaddress").hide();
                }

            });

            var e = $(".region", this.elem);
            this.addressSelector = new $.TreeSelector(e, "/tools/selectColumnEx.jsp", "c_area_taobao", null);

            this.addressSelector.addChangeListener(function (selector) {
                that.cloneAddr.regionName = selector.getSelectedRegionFullName();
                $(".regionName",that.elem).html(that.cloneAddr.regionName);
                that.loadDeliveryPrice(selector.getSelectedRegion());
                $("#taobaoAreaId").val(selector.getSelectedRegion());
            });

            this.addressSelector.loadValues();

        }

        this.saveAddress = function () {
            var that = this;
            var e = that.elem;
            var userName = $(".userName", e).val();
            var detailAddress = $(".detailAddress",e).val();
            var mobile = $(".mobile", e).val();
            var phone = $(".phone", e).val();
            var postalCode = $(".postalCode", e).val();

            var focusObj = null;
            if(userName == ""){
                /* var obj = $(".userName", e);
                 obj.next(".subtips").css("color","red").html("&nbsp;请填写收货人姓名！");
                 if(focusObj == null){
                 focusObj = obj;
                 }*/
                alert("请填写收货人姓名！")
                return false;
            }

            if(!that.addressSelector.isLast()){
                /* var obj = $(".region", e);
                 obj.next(".subtips").css("color","red").html("&nbsp;请正确选择地区！");*/
                alert("请正确选择地区！")
                return false;
            }

            if(detailAddress == ""){
                var obj = $(".detailAddress", e);
                /*  obj.next(".subtips").css("color","red").html("&nbsp;请填写收货地址！");
                 if(focusObj == null){
                 focusObj = obj;
                 }*/
                alert("请填写收货地址！")
                return false;
            }
            if(detailAddress.length <= 5 || detailAddress.length > 60){
                /* var obj = $(".detailAddress", e);
                 obj.next(".subtips").css("color","red").html("地址字数必须大于5，少于60");*/
                alert("地址字数必须大于5，少于60")
                return false
            }
            if(postalCode == ""){
                /*  var obj = $(".postalCode", e);
                 obj.next(".subtips").css("color","red").html("&nbsp;请填写邮政编码！");*/
                alert("请填写邮政编码！")
                return false;
            }
            if(postalCode != "" && (isNaN(postalCode) || postalCode.length != 6)){
                /*   var obj = $(".postalCode", e);
                 obj.next(".subtips").css("color","red").html("&nbsp;邮政编码应该是6位数字！");*/
                alert("邮政编码应该是6位数字！")
                return false;
            }
            if(mobile == "" && phone == ""){
                /* $(".phone", e).next(".subtips").css("color","red").html("&nbsp;固话与手机至少填写一项！");*/
                alert("固话与手机至少填写一项！")
                return false;
            }
            if(phone != ""){
                if(!/^\d{3}-\d{8}|\d{4}-\d{7}$/.exec(phone)){
                    /*   $(".phone", e).next(".subtips").css("color","red").html("&nbsp;请输入正确格式的电话号码，如：123-12346578");*/
                    alert("请输入正确格式的电话号码，如：123-12346578")
                    return false;

                }
            }
            if(mobile!=""){
                if(!/^([0-9]{11})$/.exec(mobile)){
                    /*   $(".mobile", e).next(".subtips").css("color","red").html("&nbsp;请正确输入11位的手机号码 ！");*/
                    alert("请正确输入11位的手机号码 ！")
                    return false;
                }
            }
            return true;
        }
        this.saveNewAddress = function () {
            this.saveAddress();
        }
        this.loadDeliveryPrice= function(taoBaoAreaId) { //异步load运费
            if (taoBaosellerId == "" || taoBaosellerId == null) { //商家没有配置淘宝卖家id
                $("#deliveryPriceLoadingTxt").html("（商品计算运费失败，原因是商家未配置卖家Id,但您仍可提交订单，以最终订单显示运费为准!!）");
                return;
            }
            if (taoBaoAreaId == "" || taoBaoAreaId == null) { //没有设置默认地址或没有地址 （新增地址在淘宝上，淘宝不会把它设成默认）
                $("#deliveryPriceLoadingTxt").html("（商品计算运费失败，原因是获取地址码失败，但您仍可提交订单，以最终订单显示运费为准!）");
                return;
            }
            var orderIds=$(".cartBox").attr("orderIds");
            var shipping_type = "express,ems";
            //---商品ids
            var numIds = "";
            var numIdsLengh = $(".cartBox .numId").length;
            $(".cartBox .numId").each(function (i) {
                numIds += $(this).val();
                if (i != numIdsLengh - 1) {
                    numIds += ",";
                }
            })
            //---end 商品ids
            //--是否卖家承担运费
            var isSellPay = "";
            var freight_payersLengh = $(".cartBox .freight_payer").length;
            $(".cartBox .freight_payer").each(function (i) {
                if ($(this).val() == "seller") {
                    isSellPay += "true";
                } else {
                    isSellPay += "false";
                }
                if (i != freight_payersLengh - 1) {
                    isSellPay += ",";
                }

            })
            //--是否卖家承担运费
            //---运费模板id
            var template_ids = "";
            var template_idsLengh = $(".cartBox .template_id").length;
            $(".cartBox .template_id").each(function (i) {
                template_ids += $(this).val();
                if (i != template_idsLengh - 1) {
                    template_ids += ",";
                }
            })
            //---end 运费模板id
            //---skuIds
            var skuIds = "";
            var skuIdsLengh = $(".cartBox .skuId").length;
            $(".cartBox .skuId").each(function (i) {
                skuIds += $(this).val();
                if (i != skuIdsLengh - 1) {
                    skuIds += ",";
                }
            })
            //---end skuIds
            //---商品数量
            var itemCounts = "";
            var itemCountsLengh = $(".cartBox .itemCount").length;
            $(".cartBox .itemCount").each(function (i) {
                itemCounts += $(this).val();
                if (i != itemCountsLengh - 1) {
                    itemCounts += ",";
                }
            })
            //---end 商品数量
            //---卖家id  多少个商品就要传多少个
            var sellerIds = "";
            for (i = 0; i < numIdsLengh; i++) {
                sellerIds += taoBaosellerId;
                if (i != itemCountsLengh - 1) {
                    sellerIds += ",";
                }
            }
            //---end 卖家id
            //---不用模板，全国统一运费时
            var expressFee = "";
            var expressFeeLengh = $(".cartBox .expressFee").length;
            $(".cartBox .expressFee").each(function (i) {
                expressFee += $(this).val() * 100;
                if (i != expressFeeLengh - 1) {
                    expressFee += ",";
                }
            })
            var postFee = "";
            var postFeeLengh = $(".cartBox .postFee").length;
            $(".cartBox .postFee").each(function (i) {
                postFee += $(this).val()* 100;
                if (i != postFeeLengh - 1) {
                    postFee += ",";
                }
            })

            var emsFee = "";
            var emsFeeLengh = $(".cartBox .emsFee").length;
            $(".cartBox .emsFee").each(function (i) {
                emsFee += $(this).val()* 100;
                if (i != emsFeeLengh - 1) {
                    emsFee += ",";
                }
            })
            $.post("./loadDeliveryPrice.jsp", {orderIds:orderIds,shipping_type: shipping_type, numIds: numIds, isSellPay: isSellPay, template_ids: template_ids, taoBaoAreaId: taoBaoAreaId, skuIds: skuIds, sellerIds: sellerIds, itemCounts: itemCounts, expressFee: expressFee, postFee: postFee, emsFee: emsFee, taoBaoXTaoId: taoBaoXTaoId, taoBaoXTaoKey: taoBaoXTaoKey}, function (data) {
                var express =0;
                var ems=0;
                if (data.msg=='shouyuanerror') {
                    $("#deliveryPriceLoadingTxt").html("糟糕！授权已过期请重新授权来获取配送费用!")
                    return
                }else if(data.msg=='APIerror'){
                    $("#deliveryPriceLoadingTxt").html("糟糕！调用运费接口异常，注：可直接提交订单")
                    return
                }else if(data.msg=='notallow'){
                    //这里是不允诺调用API
                }else{
                    if (data.express!=""){
                        if(data.express=="-11"){
                            $("#express").attr("disabled", true);
                        }else{
                            $("#express").attr("disabled", false);
                            express = parseInt(data.express)/100;
                        }

                    }
                    if (data.ems!=""){
                        if(data.ems=="-11"){
                            $("#ems").attr("disabled", true);
                            $("#deliveryRuleEMS").css("display", "none");
                            $("#tdems").css("display", "none");
                        }else{
                            $("#ems").attr("disabled", false);
                            $("#deliveryRuleEMS").css("display", "block");
                            $("#tdems").css("display", "block");
                            ems = parseInt(data.ems)/100;
                        }
                    }
                    $("#tdexpress").html("运费(<font color='color:#CC0000;'>￥</font><font color='color:#CC0000;' id='expressprice' >"+express.toFixed(2)+"</font>)");
                    $("#tdems").html("运费(<font color='color:#CC0000;'>￥</font><font color='color:#CC0000;' id='emsprice' >"+ems.toFixed(2)+"</font>)")
                    var shipping_type=$('input:radio[name="shipping_type"]:checked').val();
                    if(shipping_type=="express"){
                        $("#deliveryPrice").html(express.toFixed(2))
                        $(".deliveryPrice").val(express.toFixed(2))
                        var totalPayPrice = $("#totalPayPrice").html();
                        var needtotalPayprice = parseFloat(express) + parseFloat(totalPayPrice);
                        $("#needtotalPayprice").html(needtotalPayprice.toFixed(2))
                    }else if(shipping_type=="emsprice"){
                        $("#deliveryPrice").html(ems.toFixed(2))
                        $(".deliveryPrice").val(ems.toFixed(2))
                        var totalPayPrice = $("#totalPayPrice").html();
                        var needtotalPayprice = parseFloat(ems) + parseFloat(totalPayPrice);
                        $("#needtotalPayprice").html(needtotalPayprice.toFixed(2))
                    }
                }
                $("#expressprice").html(express.toFixed(2));
                $("#emsprice").html(ems.toFixed(2));
            },"json");
        }
    }
    $.AddressEditor = AddressEditor;
})(jQuery);


