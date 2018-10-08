$(function () {

    $("input[name='paymentItem']").live("click", function () {
//        if(this.checked){
        $("li.cur").removeClass("cur");
        $(this).closest("li").addClass("cur");
        reBindToPayBtnEvent();
//        }
    });

    $(".paymentItemImg").live("click", function () {
        var currLi = $(this).closest("li");
        currLi.find("input[name='paymentItem']").click();
        reBindToPayBtnEvent();
    });


    $("#toPayBtn").live("click", function () {
        doToPayEvent();
    });
});

function reBindToPayBtnEvent() {
    var toPayBtn = $("#toPayBtn");
    toPayBtn.html("确认支付方式");
    toPayBtn.die("click");
    toPayBtn.live("click", function () {
        doToPayEvent();
    });
}

function doToPayEvent() {
    var checkedItem = $("input[name='paymentItem']:checked");
    if (checkedItem.length == 0) {
        alert("请选择一个支付方式！");
        return;
    }

    var checkedItemValue = checkedItem.val();
    var url = "/shopping/handle/to_pay_handler.jsp";
    var valSplit = checkedItemValue.split(":");
    var orderId = valSplit[0];
    var paymentId = valSplit[1];
    var bankCode = valSplit[2];
    if (bankCode == undefined) {
        bankCode = "";
    }
    url += "?id=" + orderId + "&paymentId=" + paymentId + "&bankCode=" + bankCode;
    window.open(url);
    var toPayBtn = $("#toPayBtn");
    toPayBtn.html("正在支付...");
    toPayBtn.die("click");
}