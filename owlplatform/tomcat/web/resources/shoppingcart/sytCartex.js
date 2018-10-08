$(document).ready(function(){
    $(".goOrderForm").live("click",function(){
        var cartId = $(this).attr("cartKey")
        for(var i=0; i<ocs.length; i++){
            var oc = ocs[i];
            if(oc.cartKey == cartId){
                for(var j=0; j<oc.buyItems.length;j++){
                    var item = oc.buyItems[j];
                    if(item.checked){
                        return true;
                    }
                }
            }
        }
        alert("必须选择一个商品去购买。")
        return false;
    });
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
        currentNumber = parseInt(currentNumber);
        changeAmount(itemId,currentNumber+1,cartId);
    });

    $("input.Num").live("keyup",function(event){
        if(event.keyCode == 13){
            var $e = $(this).parents('.number');
            var itemId = $e.attr("itemid");
            var cartId = $e.attr("cartid");
            var currentNumber = $(this).val();
            if(isNaN(currentNumber)){
                alert("数量必须是数字。");
                return false;
            }else if(parseInt(currentNumber) == 0){
                alert("数量必须大于0");
                $(this).val("1");
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
        var currentNumber = $(this).val();
        if(isNaN(currentNumber)){
            alert("数量必须是数字。");
            return false;
        }else if(parseInt(currentNumber) == 0){
            alert("数量必须大于0");
            $(this).val("1");
            return false;
        }
        currentNumber = parseInt(currentNumber);
        changeAmount(itemId,currentNumber,cartId);
    })

    $("input.ruleSelector").live("change",function(event){
        var $e = $(this);
        var itemId = $e.attr("itemid");
        var cartId = $e.attr("cartid");
        var ruleId = $e.val();
        var checked = $e.attr("checked");
        if(checked){
            checked=true;
        }
        else{
            checked=false;
        }
        changeUserSelection(cartId,itemId,ruleId,checked);
    });

    $("a.showExcluded").live("click",function(event){
        var $e =  $(this).siblings("input");
        var itemId = $e.attr("itemid");
        var cartId = $e.attr("cartid");
        $(".excluded").removeClass("excluded");
            var excluded = $(this).attr("excluded");
            var ids = excluded.split(",");
            var domId;
            for(var i=0; i<ids.length;i++){
                if(itemId){
                   domId ="#r_" + itemId +"_" + ids[i];
                }
                else{
                    domId =  "#r_" + ids[i];
                }
                $(domId).addClass("excluded");
            }
            $(this).addClass("excluded");
    });

    $(".buyPresent").live("click",function(event){
       var itemId = $(this).attr("itemId");
       var ruleId = $(this).attr("ruleId");
       var productId = $(this).attr("productId");
       var cartId = $(this).attr("cartId");
       selectPresent(itemId,ruleId,productId,cartId);
    });

    $(".deletePresent").live("click",function(event){
        var itemId = $(this).attr("itemid");
        var ruleId = $(this).attr("ruleid");
        var productId = $(this).attr("productid");
        var cartId = $(this).attr("cartId");
        deletePresent(itemId,ruleId,productId,cartId);
    });

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
        selectCartItem("_all","_all",bool);
    });

    $("input.item_check").live("click",function(event){
        var cartId = $(this).attr("cartId");
        var itemKey = $(this).val();
        var checked = this.checked;
        selectCartItem(cartId,itemKey,checked);
    })

    $(".batchFavor").live("click",function(event){
        var checkedItem = $("input.item_check:checked");
        if(checkedItem.length > 0){
            var ids="",data=[];
            checkedItem.each(function(){
                var obj=$(this);
                var productId=obj.attr("productId");
                if(productId!= undefined && productId != null){
                    data.push(productId);
                }
            });
            batchFavorProduct(data.join(","));
        }else{
            alert("请先选择需要收藏的商品！");
            return;
        }
    });

    $(".favProduct").live("click",function(event){
        var obj  = $(this);
        favoriteProduct(obj.attr("productId"));
    });

    $("input.selectSku").live("click",function(event){
        var $this = $(this);
        var itemId = $this.attr("itemId");
        var skuId = $this.attr("skuId");
        var ruleId=$this.attr("ruleId");
        var cartId=$this.attr("cartId");
        var productId = $this.attr("productId");
        var num = $("input.num[skuId='"+skuId +"']",$this.parent.parent).val();
        selectSku(ruleId,skuId,productId,num,itemId,cartId);
        $.colorbox.close();
    });

    $(".chooseSku").live("click",function(event){
        var $this = $(this);
        var productId = $this.attr("productId");
        var merchantId=$this.attr("merchantId");
        var itemId = $this.attr("itemId");
        var maxNum = $this.attr("maxNum");
        var ruleId = $this.attr("ruleId");
        var cartId = $this.attr("cartId");
        chooseSku(productId,merchantId,maxNum,itemId,ruleId,cartId,$this);
    });

    $(".delSku").live("click",function(event){
        var $this = $(this);
        var productId = $this.attr("productId");
        var merchantId=$this.attr("merchantId");
        var itemId = $this.attr("itemId");
        var maxNum = $this.attr("maxNum");
        var ruleId = $this.attr("ruleId");
        var cartId = $this.attr("cartId");
        var skuId = $this.attr("skuId");
        deleteSku(ruleId,skuId,productId,maxNum,itemId,cartId);
    });



    if(!window.ocs){
        window.ocs = [oc];
    }

    drawCarts(ocs);
});

function drawCarts(ocs){
    $("#cartHead").html($("#cartHeadTemplate").render());
    $("#cart").html($( "#cartTemplate" ).render( ocs ));

    var selectedPayInterfaceId = $("#selectedPayInterfaceId").val();
    if(selectedPayInterfaceId == 'payi_0'){
        depositAndPointsEditor = new $.DepositAndPointEditor($("#depositAndPoint"), $("#depositShow"), $("#depositEdit"), '/shopping/handle/new/setUseDepositAndPoints.jsp', ocs, merchantId, cartType);
        depositAndPointsEditor.show();
    } else{
        depositAndPointsEditor = new $.DepositAndPointEditor($("#depositAndPoint"), $("#depositAndPointsShow"), $("#depositAndPointsEdit"), '/shopping/handle/new/setUseDepositAndPoints.jsp', ocs, merchantId, cartType);
        depositAndPointsEditor.show();
        var notEligible = $(".notEligible").val();
        if (notEligible == 1) {
            depositAndPointsEditor.edit();
        }
/*
        if (ocs.depositPoints == 1) {
            depositAndPointsEditor.edit();
        }
        $("#coupons").html($("#cardsTemplate").render(ocs));
        $("#total_info_detail").html($("#totalInfoTemplate").render(ocs));*/

    }

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
}



function deleteSku(ruleId,skuId,productId,num,itemId,cartId){
    $.post("handle/new/selectSku.jsp",{ruleId:ruleId,skuId:skuId,productId:productId,num:num,itemId:itemId,cartId:cartId,action:'delete',mode:window.mode},function(data){
        if(data.state=='ok'){
            onDataChange(data.oc);
        }
        else{
            alert(data.msg);
        }
    },"json");
}

function checkOc(oc){
    var buyItems = oc.buyItems;
    for(var i=0; i<buyItems.length; i++){
        var item = buyItems[i];
        if(!item.skuId){
            return false;
        }
        var freePresents = item.freePresents;
        if(freePresents){
            for(var j=0;j<freePresents.length;j++){
                var present = freePresents[j];
                if(!present.skuId){
                    return false;
                }
            }
        }
        var lowPricePresents = item.lowPricePresents;
        if(lowPricePresents){
            for(var j=0;j<lowPricePresents.length;j++){
                var present = lowPricePresents[j];
                if(!present.skuId){
                    return false;
                }
            }
        }
    }
    var freePresents = oc.freePresents;
    if(freePresents){
        for(var j=0;j<freePresents.length;j++){
            var present = freePresents[j];
            if(!present.skuId){
                return false;
            }
        }
    }
    var lowPricePresents = oc.lowPricePresents;
    if(lowPricePresents){
        for(var j=0;j<lowPricePresents.length;j++){
            var present = lowPricePresents[j];
            if(!present.skuId){
                return false;
            }
        }
    }
    return true;
}
function selectSku(ruleId,skuId,productId,num,itemId,cartId){
    $.post("handle/new/selectSku.jsp",{ruleId:ruleId,skuId:skuId,productId:productId,num:num,itemId:itemId,cartId:cartId,action:'add',mode:window.mode},function(data){
        if(data.state=='ok'){
            onDataChange(data.oc);
        }
        else{
            alert(data.msg);
        }
    },"json");

}
function chooseSku(productId,merchantId,maxNum,itemId,ruleId,cartId,elem){
    $.post("handle/new/productSkuList.jsp",{"productId":productId,"merchantId":merchantId,mode:window.mode},function(data){
        data.maxNum = maxNum;
        data.productId = productId;
        data.itemId = itemId;
        data.ruleId = ruleId;
        data.cartId = cartId;
        var html = $("#chooseSkuTemplate").render(data);
        $.colorbox({html:html,open:true});

    },"json");
}

function deleteItem(itemId,cartId){
    $.post("handle/new/deleteCartItem.jsp",{"itemId":itemId,"cartId":cartId,mode:window.mode},function(data){
        if(data.state=='ok'){
            onDataChange(data.oc);
        }
        else{
            alert(data.msg);
        }
    },"json")
}

function batchDeleteItem(jsonString){
    $.post("handle/new/batchDeleteItem.jsp",{"jsonString":jsonString,mode:window.mode},function(data){
       if(data.state=='ok'){
            onDataChange(data.oc);
        }
        else{
            alert(data.msg);
        }
    },"json");
}

function selectCartItem(cartId,itemKey,checked){
    $.post("handle/new/selectCartItems.jsp",{"cartId":cartId,"itemKey":itemKey,"checked":checked,mode:window.mode},function(data){
        if(data.state=='ok'){
            onDataChange(data.oc);
        }
        else{
            alert(data.msg);
        }
    },"json");
}
function deletePresent(itemId,ruleId,productId,cartId){
    $.post("handle/new/deletePresentEx.jsp",{"itemId":itemId,"ruleId":ruleId,"cartId":cartId,productId:productId,mode:window.mode},function(data){
        if(data.state=='ok'){
            onDataChange(data.oc);
        }
        else{
            alert(data.msg);
        }
    },"json")
}

function selectPresent(itemId,ruleId,productId,cartId){
    $.post("handle/new/selectPresent.jsp",{"itemId":itemId,"ruleId":ruleId,"cartId":cartId,productId:productId,mode:window.mode},function(data){
        if(data.state=='ok'){
            onDataChange(data.oc);
        }
        else{
            alert(data.msg);
        }
    },"json")
}

function changeUserSelection(cartId,itemId,ruleId,selected){
    $.post("handle/new/changeUserSelection.jsp",{"itemId":itemId,"selected":selected,"cartId":cartId,"ruleId": ruleId,mode:window.mode},function(data){
        if(data.state=='ok'){
            onDataChange(data.oc);
        }
        else{
            alert(data.msg);
        }
    },"json")
}


function changeAmount(itemId,toNumber,cartId){
    $.post("handle/new/changeAmount.jsp",{"itemId":itemId,"toNumber":toNumber,"cartId":cartId,mode:window.mode},function(data){
        if(data.state=='ok'){
            onDataChange(data.oc);
        }
        else{
            if(window.onOcChange){
                onDataChange(window.oc);
            }else{
                onDataChange(window.ocs);
            }
            alert(data.msg);
        }
    },"json")
}

function batchFavorProduct(ids) {
    $.post("/member/handle/favor_add_handler.jsp", {ids:ids,tag:"batchFavor",type:"product",mode:window.mode}, function(data){
        var result = jQuery.trim(data);
        if (result == "ok") {
            alert("已收藏选中的商品！");
        } else if(result == "none"){
            //alert("很抱歉，您需要登录后才能收藏商城商品，！");
            document.location.href="/login/sign_in.jsp?redirectURL=" + encodeURIComponent("/shopping/cart.jsp");
        }else{
            alert("很抱歉，收藏商品失败，请稍候重试！");
        }
    });
}

function favoriteProduct(pid) {
    var params = new Object();
    params["objId"] = pid;
    params["type"] = "product";
    jQuery.post("/member/handle/favor_add_handler.jsp", params, function (msg) {
        var data = jQuery.trim(msg);
        if (data == "none") {
            document.location.href="/login/sign_in.jsp?redirectURL=" + encodeURIComponent("/shopping/cart.jsp");
        } else if (data == "ok") {
            alert("商品收藏成功！");
        } else if (data == "existed") {
            alert("此商品已收藏过!");
        } else {
            alert("系统繁忙请稍后再试!");
        }

    });
}