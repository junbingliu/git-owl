var addressEditor;
var deliveryRuleSelector;
var paymentSelector;
var depositAndPointsEditor;
var isCheckPhone = false;

$(function () {
    addressEditor = new $.AddressEditor(addresses, $("#address"), "show", "#addressEdit", "#addressShow", "#addressListTemplate", saveUrl, deleteUrl);
    addressEditor.show();
    addressEditor.addAddressChangeListener(function (addr) {
        $.post("/shopping/handle/new/getCart.jsp", {regionId:addr.regionId, m:merchantId,mode:'of'}, function (data) {
            if (data.state === 'ok') {
                oc = data.oc;
                deliveryRuleSelector.setOc(oc);
                deliveryRuleSelector.setRegionIds(addr.regionIds);
                deliveryRuleSelector.mode = "edit";
                deliveryRuleSelector.show();
            }
        }, "json");
    });

    deliveryRuleSelector = new $.DeliveryRuleSelector(oc, "show", $("#deliveryPanel"), '/shopping/handle/new/selectDeliveryRule.jsp', merchantId);
    if(addressEditor.addr){
        deliveryRuleSelector.setRegionIds(addressEditor.addr.regionIds);
    }
    deliveryRuleSelector.show();
    if(addressEditor.addr){
        deliveryRuleSelector.setRegionIds(addressEditor.addr.regionIds);
    }
    deliveryRuleSelector.deliveryRuleChangeListener(function(selectedDeliveryRuleResult){
        if(selectedDeliveryRuleResult != null){
            var enableCOD = selectedDeliveryRuleResult.enableCOD;
            paymentSelector.setEnableCOD(enableCOD);
            if(!enableCOD){
                for(var i=0;i<window.payments.length;i++){
                    var payment = window.payments[i];
                    if(payment.id == paymentSelector.selectedPaymentId){
                        if(payment.payInterfaceId == "payi_0"){
                            paymentSelector.mode = "edit";
                            paymentSelector.edit();
                        }
                    }
                }
            }
        }
    });

    paymentSelector = new $.PaymentSelector($("#payments"), $("#paymentsEdit"), $("#paymentsShow"), window.payments, window.selectedPaymentId, '/shopping/handle/new/selectPayment.jsp');
    if(oc.selectedDeliveryRuleResult){
        paymentSelector.setEnableCOD(oc.selectedDeliveryRuleResult.enableCOD);
    }
    paymentSelector.show();
    depositAndPointsEditor = new $.DepositAndPointEditor($("#depositAndPoint"), $("#depositAndPointsShow"), $("#depositAndPointsEdit"), '/shopping/handle/new/setUseDepositAndPoints.jsp', window.oc, merchantId, cartType);
    depositAndPointsEditor.show();

    $("#barcodePay").html($("#barcodePayShow").render({payments:payments}));
    $("#coupons").html($("#cardsTemplate").render(window.oc));
    $("#total_info_detail").html($("#totalInfoTemplate").render(window.oc));
    $("#barcodePay .btnSave .save").live("click", function () {
        var addItionnumber = $("#addItionnumber").val();
        var paymentId = $("#addItionnumber").attr("paymentId");
        if (addItionnumber == "" || addItionnumber == null) {
            alert("请输入条形码");
            return;
        } else {
            $.post("handle/new/queryAddItionnumber.jsp", {addItionnumber: addItionnumber, paymentId: paymentId,merchantId:merchantId,cartType:cartType,mode:'of'}, function (data) {
                if (data.state == "ok") {
                    $("#barcodePayPrice").html(parseFloat(data.activityAmountPaid));
                    if (window.onOcChange) {
                        window.onOcChange(data.oc);
                    }
                } else {
                    $("#barcodePayPrice").html("0.00");
                    alert(data.msg);
                }
            }, "json");
        }
    });
    $(".showInvoice").live("click", function () {
        $("#invoiceLayer").show();
    });
    $(".closeInvoice").live("click", function () {
        $("#invoiceLayer").hide();
    });
    //保存发票
    $(".saveInvoice").live("click", function (event) {
        var titleObj = $("input[name='titleType']:checked");
        var address = $("#invoiceTitle");
        if (address.val() == "") {
            if (titleObj.val() == "单位") {
                alert("请填写单位名称");
            } else {
                alert("请填写个人发票名称");
            }
            address.focus();
            return false;
        }

        var params = {"needInvoiceKey":"yes", "title":address.val(), "content":$("#invoiceContent").val(), "type":$("input[name='invoiceType']:checked").val(), "merchantId":$("#merchantId").val(), "cartType":$("#cartType").val(),mode:'of'};
        $.post("handle/new/saveInvoice.jsp", params, function (data) {
            if (data.state == "ok") {
                $(".cancelInvoice").show();
                $("#invoiceLayer").hide();
                $(".invoiceInfo #invoiceTY div").html($("input[name='invoiceType']:checked").val());
                if (titleObj.val() == "单位") {
                    $(".invoiceInfo #invoiceTN label").html("单位名称：");
                } else {
                    $(".invoiceInfo #invoiceTN label").html("个人发票名称：");
                }
                $(".invoiceInfo #invoiceTN div").html(address.val());
                $(".invoiceInfo").show();
            } else {
                alert("保存发票信息异常！");
            }
        }, "json");
    });
    //取消发票
    $(".cancelInvoice").live("click", function (event) {
        if(window.confirm('你确定要取消发票吗？')){
            var params = {"needInvoiceKey":"no", "title":"", "content":"", "type":"", "merchantId":$("#merchantId").val(), "cartType":"",mode:'of'};
            $.post("handle/new/saveInvoice.jsp", params, function (data) {
                if (data.state == "ok") {
                    $("#invoiceTitle").val("");
                    $(".cancelInvoice").hide();
                    $(".invoiceInfo").hide();
                } else {
                    alert("取消发票异常，请稍后重试！");
                }
            }, "json");
        }else{
            return false;
        }
    });

    var isSubmit = false;
    $("#btnSubmit").find("a").live("click", function () {
        if (addressEditor.mode == "edit") {
            alert("收货人信息未保存，请先保存！");
            return false;
        }
        if (deliveryRuleSelector.mode == "edit" || oc.selectedDeliveryRuleResult == null) {
            alert("配送方式未保存，请先保存！");
            return false;
        }
        if (paymentSelector.mode == "edit") {
            alert("支付方式未保存，请先保存！");
            return false;
        }
        if(depositAndPointsEditor.mode =="edit") {
            alert("积分预付款未保存，请先保存！");
            return false;
        }
        var addItionnumber=$("#addItionnumber").val();
        if(addItionnumber!=null&&addItionnumber!=""){
         var  barcodePayPrice=$("#barcodePayPrice").html();
             if(barcodePayPrice==null||barcodePayPrice==""||barcodePayPrice=="0.00"){
                 alert("请确认条形码");
                 return false;
             }
        }
        if(depositAndPointsEditor.mode =="edit") {
            alert("积分预付款未保存，请先保存！");
            return false;
        }
        if(isCheckMobileSubmitOrder){
            if(!isCheckPhone){
                var selectedPayInterfaceId = $("#selectedPayInterfaceId").val() ;
                if(selectedPayInterfaceId == "payi_0"){
                    params = new Object();
                    if($("#favoriteLoginLayer").html()==null || $("#favoriteLoginLayer").html()==""){
                        jQuery("#favoriteLoginLayer").load("/login/checkPhonebox.jsp?m="+merchantId+"&height=280", params, function() {
                            document.getElementById("favoriteLoginLayer").style.left = "13%";
                            document.getElementById("favoriteLoginLayer").style.display = "block";
                        });
                    }else{
                        $("#valiCode").val("");
                        $("#favoriteLoginLayer").show();
                    }

                    return false;
                }
            }
        }

        if (checkOc(window.oc)) {
//            $("#orderFormSubmit").get(0).submit();
            if(isSubmit){
                return false;
            }
            document.getElementById("orderFormSubmit").submit();
            isSubmit = true;
            return false;
        } else {
            alert("还有商品没有选择具体规格，请选择具体规格后提交订单。")
            return false;
        }

    });
    window.onOcChange = function (oc) {
        window.oc = oc;
        window.ocs = [oc];
        if (oc.depositPoints == 1) {
            depositAndPointsEditor.edit();
        }
        $("#coupons").html($("#cardsTemplate").render(oc));
        $("#total_info_detail").html($("#totalInfoTemplate").render(oc));
    }

})






