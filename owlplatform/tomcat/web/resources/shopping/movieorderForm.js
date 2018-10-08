
$(function () {
    $(".close").live("click", function () {
           $(".reservation_warm").hide();
    });
    $("#btnSubmit").live("click", function () {
        var objs = $('li', "#allseat");
        var sixseat = "";
        var len=objs.length;
        objs.each(function (i) {
            if(len-1==i){
                sixseat+=$(this).attr("allseat");
            }else{
              sixseat+=$(this).attr("allseat") + ";" ;
            }
        });
        if (sixseat == "" ) {
            alert("请最少选择1张影票");
            return false;
        }
        $("#sitseat").val(sixseat)
        var mobile = $("#mobile").val();
        if(mobile == ""){
            alert("请填写手机号码！");
            return false;
        }
        if(mobile!=""){
            if(!/^(13[0-9]|15[0-9]|18[0-9]|147)\d{8}$/.exec(mobile)){
                alert("请正确输入11位的手机号码 ！");
                return false;
            }
        }
        var selectedPaymentId=$('input:radio[name="payment"]:checked').val();
        if(!selectedPaymentId){
            alert("请选择一种支付方式。");
            return false;
        }
        $("#infoBtnDiv").hide();
        $("#sumbitPicDiv").show();
        $("#orderFormSubmit").submit();
    });
});
var selectedseat = 0;
function onSelect(seats) {
    if (seats.className == "blue") {  //取消选取的座位
        seats.className = "red";
        var seat = $(seats).attr("seat");
        seat = seat.split("|");
        $("li").remove("#sd_" + seat[0] + seat[1]);
        $(seats).html(seat[1]);
        selectedseat--;
        $("#select_seat_title").text("您已选择"+selectedseat+"个座位：");
    } else {  //选中座位后
        var maxseat=$("maxseat").html();
         if(maxseat==""||maxseat==null){
             maxseat=5;
         }
        if (selectedseat >= maxseat) {
            alert("每笔订单最多可购买"+maxseat+"张影票");
        } else {
            seats.className = "blue";
            var seat = $(seats).attr("seat");
            seatsp = seat.split("|");
            $(seats).html("&nbsp;");
            var html = "<li id='sd_" + seatsp[0] + seatsp[1] + "' class='allseat' allseat='" + seatsp[0] +":"+seatsp[1] + "'>";
            html += "<div class='seat'><em>" + seatsp[0] + "</em>排<em>" + seatsp[1]+ "</em>座</div>";
            html += "<div class='price' id='pr_" + seatsp[0] + seatsp[1] + "'>  &#65509;" + seatsp[2] + "</div></li>";
            jQuery("#allseat").append(html);
            selectedseat++;
            $("#select_seat_title").text("您已选择"+selectedseat+"个座位：");
        }
    }
}