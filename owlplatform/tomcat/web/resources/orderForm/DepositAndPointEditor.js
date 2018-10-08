(function ($) {
    $.DepositAndPointEditor = function (elem, showTemplate, editTemplate, saveUrl, oc, merchantId, cartType) {
        this.mode = 'show';
        this.elem = elem;
        this.showTemplate = showTemplate;
        this.editTemplate = editTemplate;
        this.saveUrl = saveUrl;
        this.oc = oc;
        this.merchantId = merchantId;
        this.cartType = cartType;
        this.show = function () {
            var that = this;
            that.mode = "show";

//            var showPointPay = false,showDepositPay = false;
//            for (var i = 0; i < window.payments.length; i++) {
//                var payment = window.payments[i];
//                if (payment.payInterfaceId == "payi_4") {
//                    showPointPay = true;
//                }
//                if (payment.payInterfaceId == "payi_5") {
//                    showDepositPay = true;
//                }
//            }
////            if(selectedPayment==null){
////                this.mode = "edit";
////                this.edit();
////                return;
////            }
//            var ocObj = eval("("+this.oc+")");
//
//            ocObj["showPointPay"]=showPointPay;
//            ocObj["showDepositPay"]=showDepositPay;

//alert(ocObj["merchantId"])

            $(this.elem).html($(showTemplate).render(this.oc));
            $(".edit", this.elem).click(function () {
                that.mode = "edit";
                that.edit();

            });
        }
        this.edit = function () {
            var that = this;
            that.mode = "edit";
            $(this.elem).html($(editTemplate).render(oc));
            $(".cancel", this.elem).click(function () {
                that.mode = "show";
                that.show();
            });
            $(".save", this.elem).click(function () {
                var pointsAmount = $("input.points", this.elem).val();
                var integralAmount= parseFloat($("#IntegralAmount").html());//总积分
                pointsAmount = $.trim(pointsAmount);
                if(isNaN(integralAmount)){
                    integralAmount = 0;
                }
                if($.trim(pointsAmount) != ""){
                    if(isNaN(pointsAmount)){
                        alert("请输入正确的积分支付金额!");
                        obj.focus();
                        return false;
                    }
                    if ((Number(pointsAmount)*100).toFixed(2) % parseInt(Number(pointsAmount)*100) != 0 && (Number(pointsAmount)*100).toFixed(2) % parseInt(Number(pointsAmount)*100) != 1 && pointsAmount != 0) {
                        alert("请保留小数点后两位数!");
                        obj.focus();
                        return false;
                    }
                    if (parseFloat(pointsAmount) > integralAmount) {
                        $("input.points", this.elem).val(integralAmount);
                    }
                }

                var depositAmount = $("input.deposit", this.elem).val();
                var advanceDepositAmount= parseFloat($("#advanceDepositAmount").html());//总预存款
                if(isNaN(advanceDepositAmount)){
                    advanceDepositAmount = 0;
                }
                if($.trim(depositAmount) != ""){
                    if(isNaN(depositAmount)){
                        alert("请输入正确的预存款支付金额!");
                        obj.focus();
                        return false;
                    }
                    if ((Number(depositAmount)*100).toFixed(2) % parseInt(Number(depositAmount)*100) != 0 && depositAmount != 0) {
                        alert("请保留小数点后两位数!");
                        obj.focus();
                        return false;
                    }
                    if (parseFloat(depositAmount) > advanceDepositAmount) {
                        $("input.deposit", this.elem).val(advanceDepositAmount);
                    }
                }
                $.post(that.saveUrl, {"deposit":$("input.deposit", this.elem).val(), "points":$("input.points", this.elem).val(), "m":that.merchantId, "t":that.cartType,mode:'of'}, function (data) {
                    if (data.state === 'ok') {
                        window.oc = data.oc;
                        that.oc = data.oc;
                        if (window.onOcChange) {
                            window.onOcChange(data.oc);
                        }

//                        if (data.oc.depositPoints == 1) {
//                            alert("支付金额大于订单总金额");
//                            that.edit();
//                        } else {
                            that.mode = "show";
                            that.show();
//                        }
                    }
                    else {
                        alert(data.msg);
                        return;
                    }

                }, 'json');
            });
        }

    }
})(jQuery);