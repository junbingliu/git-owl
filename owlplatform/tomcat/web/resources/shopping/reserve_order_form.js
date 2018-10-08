
var addressEditor;
var paymentSelector;
var depositAndPointsEditor;
var couponSelector;
var isCheckPhone = false;

$(function () {

    var addressEditor = {};
    addressEditor.show = function(){
        var elem = $("#consigneePanel");
        elem.html($("#reserve_info_edit_template").render(oc));
        $("#dateTimeBegin",elem).datepicker({
            dateFormat: 'yy-mm-dd'
        });
        $("#dateTimeEnd",elem).datepicker({
            dateFormat: 'yy-mm-dd'
        });
        $(".save", elem).click(function () {
            addressEditor.check();
        });
    }
    addressEditor.check = function(){
        var elem = $("#consigneePanel");
        var reserveBuyerName = $("#reserveBuyerName",elem);
        if(reserveBuyerName.val() == ""){
            alert("请填写预约人姓名！");
            reserveBuyerName.focus();
            return false;
        }

        var dateTimeBegin = $("#dateTimeBegin",elem);
        var dateTimeEnd = $("#dateTimeEnd",elem);
        if(dateTimeBegin && dateTimeBegin.val() == ""){
            alert("请选择预约时间！");
            dateTimeBegin.focus();
            return false;
        }
        if(dateTimeEnd && dateTimeEnd.val() == ""){
            alert("请选择预约时间！");
            dateTimeEnd.focus();
            return false;
        }

        var mobileObj = $("#reserveMobile", elem);
        var phoneObj = $("#reservePhone", elem);
        if(mobileObj.val() == "" && phoneObj.val() == ""){
            alert("固话与手机至少填写一项！");
            return false;
        }
        if(phoneObj.val() != ""){
            if(!/^\d{3,4}-\d{8}|\d{4}-\d{7}$/.exec(phoneObj.val())){
                alert("请输入正确格式的电话号码，如：123-12346578");
                return false;

            }
        }
        if(mobileObj.val() != ""){
            if(!/^([0-9]{11})$/.exec(mobileObj.val())){
                alert("请正确输入11位的手机号码 ！");
                return false;
            }
        }
        return true;
    }

    addressEditor.show();


    paymentSelector = new $.PaymentSelector($("#paymentPanel"), $("#payment_edit_template"), $("#payment_show_template"), window.payments, window.selectedPaymentId, '/shopping/handle/v3/selectPayment.jsp',oc.merchantId);
    if(oc.selectedDeliveryRuleResult){
        paymentSelector.setEnableCOD(oc.selectedDeliveryRuleResult.enableCOD && oc.enableCOD);
    }
    paymentSelector.show();
//    depositAndPointsEditor = new $.DepositAndPointEditor($("#depositAndPointPanel"), $("#deposit_and_points_show_template"), $("#deposit_and_points_edit_template"), '/shopping/handle/v3/setUseDepositAndPoints.jsp?objectId='+window.objectId, window.oc, merchantId, cartType);
//    depositAndPointsEditor.edit();

    $("#cartBodyPanel").html($("#cart_body_template").render(oc));
    $("#bottomPanel").html($("#order_bottom_template").render(oc));

    $(".showInvoice").live("click", function () {
        $("#invoiceLayer").show();
        $("#invoiceTitle").focus();
    });
    $(".closeInvoice").live("click", function () {
        $("#invoiceLayer").hide();
    });

    $("input[name='invoiceType']").live("change",function(){
        if(this.value == "个人"){
            $("#invoiceTitleDetail").hide();
        }else{
            if(window.oc.invoiceInfo && window.oc.invoiceInfo.invoiceTitleType == "个人"){
                $("#invoiceTitle").val("");
            }
            $("#invoiceTitleDetail").show();
            $("#invoiceTitle").focus();
        }
    });

    $("#saveInvoice").live("click", function () {
        var currObj = $(this);
        var invoiceTitle = "";
        var titleObj = $("input[name='invoiceType']:checked");
        var address = $("#invoiceTitle");
        if (titleObj.val() == "单位") {
            if (address.val() == "") {
                alert("请填写发票单位名称！");
                address.focus();
                return false;
            }
            invoiceTitle = address.val();
        }else if(titleObj.val() == "个人"){
            invoiceTitle = addressEditor.addr.userName;
        }

        var params = {"needInvoiceKey":"yes", "title":invoiceTitle, "content":"", "titleType":titleObj.val(), "merchantId":currObj.attr("merchantId"), "cartType":currObj.attr("cartType"),"mode":'of'};
        $.post("handle/v3/saveInvoice.jsp", params, function (data) {
            if (data.state == "ok") {
                $("#invoiceLayer").hide();
                var html = "";
                if(titleObj.val() == "个人"){
                    html = "(您选择的发票抬头为：" + titleObj.val() + ")";
                }else{
                    html = "(您选择的发票抬头为：" + titleObj.val() + "“" + invoiceTitle + "”)";
                }
                $("#invoice_selected").html(html);
            } else {
                alert("保存发票信息异常！");
            }
        }, "json");
    });

    var discriptionVal = "备注中有关收货人信息、支付方式、配送方式、发票信息等购买要求一律以上面的选择为准，备注无效。";
    $("#description").live({
        focus:function(){
            if(this.value == discriptionVal){
                $(this).select();
            }
        },
        blur:function(){
            if(this.value == ""){
                this.value = discriptionVal;
            }
        }
    });

    $("#btnSubmit").live("click", function () {
        if(window.oc.orderType == "common" ){
            if($(".item_check:checked").length == 0){
                alert("请至少选中一个商品！");
                return false;
            }else{
                var buyItems = window.oc.buyItems;
                var hasChecked = false;
                for(var j=0; j<buyItems.length;j++){
                    var item = buyItems[j];
                    if(item.checked){
                        hasChecked = true;
                        break;
                    }
                }
                if(!hasChecked){
                    alert("请至少选中一个商品！");
                    return false;
                }
            }
        }

        var consigneePanel = $("#consigneePanel");
        if(!addressEditor.check()){
            return false;
        }
        if(paymentSelector.mode == "edit"){
            if(!paymentSelector.checkSelect()){
                return false;
            }else{
                $(".btnSave a",paymentSelector.elem).click();
            }
        }

        $("input",$("#consigneePanel")).clone(true).each(function(){
            var $this = $(this);
            $this.type = "hidden";
            $("#orderFormSubmit").append(this);
        });

        if (checkOc(window.oc)) {
            if($("#description").val() != discriptionVal){
                $("#input_description").val($("#description").val());
            }
            $("#orderFormSubmit").submit();
            $(this).html("正在提交...");
            return false;
        } else {
            alert("还有商品没有选择具体规格，请选择具体规格后提交订单。");
            return false;
        }

    });
    window.onOcChange = function (oc) {
        window.oc = oc;
        window.ocs = [oc];
        if (oc.depositPoints == 1) {
            depositAndPointsEditor.setOc(oc);
            depositAndPointsEditor.edit();
        }
        if(oc.autoUseCard){
            $("#couponPanel").html($("#use_cards_template").render(oc));
        }else{
            couponSelector.setOc(oc);
            couponSelector.edit();
        }
        $("#cartBodyPanel").html($("#cart_body_template").render(oc));
        $("#bottomPanel").html($("#order_bottom_template").render(oc));
    }
});
