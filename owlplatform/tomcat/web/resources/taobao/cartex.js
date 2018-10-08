$(document).ready(function(){

    $(".c_min").live("click",function(){
       var $e = $(this).parents('.number');
       var itemId = $e.attr("itemid");
       var cartId = $e.attr("cartid");
       var currentNumber = $(this).siblings("input").val();
        currentNumber = parseInt(currentNumber);
       if(currentNumber>1){
        changeAmount(itemId,currentNumber-1,cartId);
       }
    });

    $(".c_add").live("click",function(){
        var $e = $(this).parents('.number');
        var itemId = $e.attr("itemid");
        var cartId = $e.attr("cartid");
        var currentNumber = $(this).siblings("input").val();
        var sellCount = $e.attr("sellCount");
        if(parseInt(currentNumber)+1>parseInt(sellCount)){
            alert("库存不足,该商品可销售库存为"+sellCount+"。");
            return false;
        }
        currentNumber = parseInt(currentNumber);
        changeAmount(itemId,currentNumber+1,cartId);
    });

    $("input.Num").live("keyup",function(event){
        if(event.keyCode == 13){
            var $e = $(this).parents('.number');
            var itemId = $e.attr("itemid");
            var cartId = $e.attr("cartid");
            var sellCount = $e.attr("sellCount");
            var currentNumber = $(this).val();
            if(isNaN(currentNumber)){
                alert("数量必须是数字。");
                return false;
            }else if(parseInt(currentNumber) == 0){
                alert("数量必须大于0");
                $(this).val("1");
                return false;
            } else if(parseInt(currentNumber)>parseInt(sellCount)){
                alert("库存不足,该商品可销售库存为"+sellCount+"。");
                return false;
            }
            currentNumber = parseInt(currentNumber);
            changeAmount(itemId,currentNumber,cartId);
        }
    })

    $("input.Num").live("blur",function(event){
        var $e = $(this).parents('.number');
        var itemId = $e.attr("itemid");
        var cartId = $e.attr("cartid");
        var sellCount = $e.attr("sellCount");
        var currentNumber = $(this).val();
        if(isNaN(currentNumber)){
            alert("数量必须是数字。");
            return false;
        }else if(parseInt(currentNumber) == 0){
            alert("数量必须大于0");
            $(this).val("1");
            return false;
        }else if(parseInt(currentNumber)>parseInt(sellCount)){
            alert("库存不足,该商品可销售库存为"+sellCount+"。");
            return false;
        }
        currentNumber = parseInt(currentNumber);
        changeAmount(itemId,currentNumber,cartId);
    })
    $(".deleteItem").live("click",function(event){
        var itemId = $(this).attr("itemid");
        var cartId = $(this).attr("cartId");
        deleteItem(itemId,cartId);

    });

    $(".batchDelete").live("click",function(event){
        var checkedItem = $("input.item_check:checked");
        if(checkedItem.length > 0){
            var ids="",data={},count=checkedItem.length-1;
            checkedItem.each(function(){
                var obj=$(this);
                if(data[obj.attr("cartId")]==undefined){
                    data[obj.attr("cartId")]=[];
                    data[obj.attr("cartId")].push(obj.val());
                }else{
                    data[obj.attr("cartId")].push(obj.val());
                }
            });
            if (confirm("确定要删除选中的商品吗？")) {
                batchDeleteItem(JSON.stringify(data));
            }
        }else{
            alert("请先选择需要删除的商品！");
            return;
        }
    });
    $(".checkAll").live("click",function (event) {
        var bool = false;
        bool = this.checked ? true : false;
        jQuery("input.item_check").each(function(){
            this.checked = bool;
        });
    });

    $("input.item_check").live("click",function(event){
        var cartId = $(this).attr("cartId");
        var itemKey = $(this).val();
        var checked = this.checked;
    })

    $(".promotionInItem").live("change",function(event){
        var defaultpromotionInItemId = $(this).children('option:selected').val();
        if(defaultpromotionInItemId==null||defaultpromotionInItemId==""){
            return;
        }
        var  defaultpromotionInItemName = $(this).children('option:selected').text();
        var itemId =$(this).attr("itemid");
        var cartId =$(this).attr("cartid");
        $.post("./selectPromotionIntem.jsp",{"itemId":itemId,"defaultpromotionInItemId":defaultpromotionInItemId,"cartId":cartId,mode:window.mode,defaultpromotionInItemName:defaultpromotionInItemName},function(data){
            if(data.state=='ok'){
                onDataChange(data.oc);
            }
            else{
                alert(data.msg);
            }
        },"json")
    })
    $(".rules ul :radio").live("change",function(event){
        var defaultpromotionShopId=$("input[name='promotionShop']:checked").val();
        if(defaultpromotionShopId==null||defaultpromotionShopId==""){
            return;
        }
        var defaultpromotionShopName=$("input[name='promotionShop']:checked").attr("promotionShopName");
        var cartId =$(".cartBox").attr("orderIds");
        $.post("./selectPromotionInShop.jsp",{"defaultpromotionShopId":defaultpromotionShopId,defaultpromotionShopName:defaultpromotionShopName,"cartId":cartId,mode:window.mode},function(data){
            if(data.state=='ok'){
                onDataChange(data.oc);
            }
            else{
                alert(data.msg);
            }
        },"json")
    })

    if(!window.ocs){
        window.ocs = [oc];
    }

    drawCarts(ocs);
});

function drawCarts(ocs){
    $("#cartHead").html($("#cartHeadTemplate").render());
    $("#cart").html($( "#cartTemplate" ).render( ocs ));
    if(window.mode && window.mode=='of'){
        $("input.item_check").hide();
        $(".checkAll").hide();
    }
    else{
        for(var i=0; i<ocs.length; i++){
            var oc = ocs[i];
            if(!oc.allChecked){
                return;
            }
        }
        $(".checkAll").attr("checked","true");
    }
}


function onDataChange(newOc){
    if(newOc instanceof Array){
        window.ocs = newOc;
    }else{
        for(var i=0; i<window.ocs.length;i++){
            var oc = window.ocs[i];
            if(oc.cartKey===newOc.cartKey){
                window.ocs[i] = newOc;
                if(newOc.buyItems===null || newOc.buyItems.length==0){
                    window.ocs.splice(i,1);
                }
                break;
            }
        }
    }
    if(window.ocs.length == 0){
        document.location.href = "cart.jsp";
        return;
    }

    drawCarts(window.ocs);
    if(window.onOcChange){
        window.onOcChange(newOc);
    }
    var shipping_type=$('input:radio[name="shipping_type"]:checked').val();
    if(shipping_type=="express"){
        var expressprice = $("#expressprice").html();
        if(expressprice==null||expressprice==""){
            expressprice="0";
        }
        $("#deliveryPrice").html(parseFloat(expressprice).toFixed(2));
        $(".deliveryPrice").val(parseFloat(expressprice).toFixed(2));
        var totalPayPrice = $("#totalPayPrice").html();
        var needtotalPayprice = parseFloat(expressprice) + parseFloat(totalPayPrice);
        $("#needtotalPayprice").html(needtotalPayprice.toFixed(2))
    }else if(shipping_type=="emsprice"){
        var emsprice = $("#emsprice").html();
        if(emsprice==null||emsprice==""){
            emsprice="0";
        }
        $("#deliveryPrice").html(parseFloat(emsprice).toFixed(2))
        $(".deliveryPrice").val(parseFloat(emsprice).toFixed(2))
        var totalPayPrice = $("#totalPayPrice").html();
        var needtotalPayprice = parseFloat(emsprice) + parseFloat(totalPayPrice);
        $("#needtotalPayprice").html(needtotalPayprice.toFixed(2))
    }
}


function deleteItem(itemId,cartId){
    $.post("./deleteTaobaoCartItem.jsp",{"itemId":itemId,"cartId":cartId,mode:window.mode},function(data){
        if(data.state=='ok'){
            onDataChange(data.oc);
        }
        else{
            alert(data.msg);
        }
    },"json")
}

function batchDeleteItem(jsonString){
    $.post("./batchDeleteTaobaoItem.jsp",{"jsonString":jsonString,mode:window.mode},function(data){
       if(data.state=='ok'){
            onDataChange(data.oc);
        }
        else{
            alert(data.msg);
        }
    },"json");
}

function changeAmount(itemId,toNumber,cartId){
    $.post("./changeTaobaoAmount.jsp",{"itemId":itemId,"toNumber":toNumber,"cartId":cartId,mode:window.mode},function(data){
        if(data.state=='ok'){
            onDataChange(data.oc);
        }
        else{
            alert(data.msg);
        }
    },"json")
}
function checkOc(oc){
    var buyItems = oc.buyItems;
    for(var i=0; i<buyItems.length; i++){
        var item = buyItems[i];
        if(!item.skuId){
            return false;
        }
    }
    return true;
}