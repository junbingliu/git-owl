(function ($) {
    $.PaymentSelector = function (elem, editTemplate, showTemplate, payments, selectedPaymentId, saveSelectedPaymentUrl) {
        this.mode = 'show';
        this.elem = elem;
        this.editTemplate = editTemplate;
        this.showTemplate = showTemplate;
        this.payments = payments;
        this.selectedPaymentId = selectedPaymentId;
        this.saveSelectedPaymentUrl = saveSelectedPaymentUrl;
        this.enableCOD = true;

        this.show = function () {
            var selectedPayment = null;
            for (var i = 0; i < this.payments.length; i++) {
                var payment = this.payments[i];
                if (payment.id === this.selectedPaymentId) {
                    selectedPayment = payment;
                }
            }
            if(selectedPayment==null){
                this.mode = "edit";
                this.edit();
                return;
            }

            if(this.enableCOD == false && selectedPayment.payInterfaceId == "payi_0"){
                this.mode = "edit";
                this.edit();
                return;
            }

            $(this.elem).html($(showTemplate).render(selectedPayment));
            that = this;
            $(".edit",this.elem).click(function(){
                that.edit();
                that.mode = "edit";
            });
        }

        this.edit = function(){
            var that = this;
            if(this.payments==null || this.payments.length==0){
                return;
            }
            $(this.elem).html($(editTemplate).render({selectedPaymentId:this.selectedPaymentId,payments:payments,"enableCOD":this.enableCOD}));
            var thisInputs = $("input",that.elem);
            if(thisInputs.length == 1){
                thisInputs[0].checked=true;
            }
            $(".cancel",that.elem).click(function(){
                that.mode = "show";
                that.show();
            });
            $(".btnSave a",this.elem).click(function(){
                var selectedPayInterfaceId = $("input:checked",that.elem).attr("title");
                $("#selectedPayInterfaceId").val(selectedPayInterfaceId);
                var selectedPaymentId = $("input:checked",that.elem).val();
                if(!selectedPaymentId){
                    alert("请选择一种支付方式。");
                    return;
                }
                $.post(that.saveSelectedPaymentUrl,{'selectedPaymentId':selectedPaymentId,mode:'of'},function(data){
                    if(data.state==="ok"){
                        that.selectedPaymentId = selectedPaymentId;
                        that.show();
                        that.mode = "show";
                    }
                    else{
                        alert("服务器出现错误," + data.msg);
                        return null;
                    }
                },"json");
            });

        }

        this.setEnableCOD = function(bool){
            this.enableCOD = bool;
        }
    }
})(jQuery);