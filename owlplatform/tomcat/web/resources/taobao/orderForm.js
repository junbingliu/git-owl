var addressEditor;
var deliveryRuleSelector;
$(function () {
    addressEditor = new $.AddressEditor(addresses, $("#address"), "#addressEdit", "#addressListTemplate","#kindlyReminderAndOtherAddress");
    addressEditor.show();
    $("#deliveryPanel").html($("#deliveryRuleErrorTemplate").render());
    $("#total_info_detail").html($("#totalInfoTemplate").render(window.oc));
    $("#btnSubmit").find("a").live("click", function () {
        var taoBaoAddressId=$('input:radio[name="taoBaoAddressId"]:checked').val();
        if(taoBaoAddressId==null||taoBaoAddressId==""){
            alert("请选收货人信息")
            return false;
        }
        var isok=true;
        if(taoBaoAddressId=="other"){
            isok=addressEditor.saveAddress();
        }
        if(!isok){
          return false;
        }
        var shipping_type=$('input:radio[name="shipping_type"]:checked').val();
        if(shipping_type==null||shipping_type==""){
            alert("请选择配送方式")
            return false;
        }
        var description = $('#description').val();
        if (description.length > 250) {
            alert("订单留言超出250字，请缩短留言")
            return false;
        }

        var taoBaoAddressId=$('input:radio[name="taoBaoAddressId"]:checked').val();
        if (checkOc(window.oc)) {
            document.getElementById("orderFormSubmit").submit();
            return false;
        } else {
            alert("还有商品没有选择具体规格，请选择具体规格后提交订单。")
            return false;
        }
    });
    window.onOcChange = function (oc) {
        window.oc = oc;
        window.ocs = [oc];
        $("#total_info_detail").html($("#totalInfoTemplate").render(oc));

    }
    $(".away input","#deliveryPanel").bind("change", function () {
        var shipping_type =$(".away input:checked","#deliveryPanel").val();
        if(shipping_type=="express"){
            var expressprice = $("#expressprice").html();
            if(expressprice==null||expressprice==""){
                expressprice="0";
            }
            var totalPayPrice = $("#totalPayPrice").html();
            $("#deliveryPrice").html(parseFloat(expressprice).toFixed(2));
            $(".deliveryPrice").val(parseFloat(expressprice).toFixed(2));
            var needtotalPayprice = parseFloat(expressprice) + parseFloat(totalPayPrice);
            $("#needtotalPayprice").html(needtotalPayprice.toFixed(2));
        }else{
            var emsprice = $("#emsprice").html();
            if(emsprice==null||emsprice==""){
                emsprice="0";
            }
            var totalPayPrice = $("#totalPayPrice").html();
            $("#deliveryPrice").html(parseFloat(emsprice).toFixed(2)) ;
            $(".deliveryPrice").val(parseFloat(emsprice).toFixed(2));
            var needtotalPayprice = parseFloat(emsprice) + parseFloat(totalPayPrice);
            $("#needtotalPayprice").html(needtotalPayprice.toFixed(2));
        }

    });
})







