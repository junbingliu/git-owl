//店铺授权添加保存-------------------------------------------//
$(document).ready(function () {
    $("#addSubmit").click(function () {
        var cid = $("#columnId").val();
        var mid = $("#merchantId").val();
        var data = $('#addForm').serialize();
        var flagCheck= checkShopFormIsNull("addForm");
        if(flagCheck){
        $('#addForm').submit(function () {
            $.ajax({
                url: 'ShopAuthorizationAdd.jsp',
                data: data,
                type: "post",
                cache: false,
                error: function () {
                    alert("系统操作异常，请联系管理员！");
                },
                success: function (data) {
                    if (data.state = 'ok') {
                        parent.showAlert("<div style='color: red'>添加成功！</div>");
                        location.reload(true);
                    } else {
                        parent.showAlert("<div style='color: red'>添加失败！</div>");
                        return false;
                    }
                    return true;
                }
            });
            return false;
        }); }
        else{
            $("#addForm").find("input[required!='true']").each(function () {
                if ($(this).val().length < 1) {
                    $(this).next().parents(".control-group").addClass("error");
                }
            });   }
    });
//分类库重置-------------------------------------------//
    $("#reset").click(function () {
        $("#form1").find("input[type!='hidden']").each(function () {
              $(this).attr("value",'');
        });
    });
//分类库保存-------------------------------------------//
$("#submit").click(function () {
        var flag=$("#form1").validate({
            rules:{
                OpenBatchGet:"required",
                OpenSingleGet:"required",
                OpenGetPlatform:"required"
            },
            messages:{
                OpenSingleGet:"<strong style='display: inline;color: #ff0000;'>X</strong>",
                OpenBatchGet:"<strong style='display: inline;color: #ff0000;'>X</strong>",
                OpenGetPlatform:"<strong style='display: inline;color: #ff0000;'>X</strong>"
            }
        }).form();
       if(flag){
           var data= $('#form1').serialize();
            $('#form1').submit(function() {
                $.ajax({
                    url: 'ProductCategoryImportConfigSave.jsp',
                    data:data,
                    type: "post",
                    cache : false,
                    error:function(){
                        parent.showAlert("系统操作异常，请联系管理员！");
                    },
                    success: function(objStr) {
                        var objs=eval("("+objStr+")");
                        var resultFlag = objs.operateFlag;
                        if(resultFlag){
                            parent.showAlert("<div style='color: red'>保存成功！</div>");
                            location.reload(true);
                        }else{
                            parent.showAlert("<div style='color: red'>保存失败！</div>");
                            return ;
                        }
                        return true;
                    }
                });
                return false;
            });
       }else{
           $("#form1").find("input").each(function () {
               if ($(this).val().length < 1) {
                   $(this).parents(".control-group").addClass("error");
               }
           });
       }
    });
$('#addShopCodeModel').on('show', function () {
        var cid = $("#columnId").val();
        var mid = $("#merchantId").val();
        $.ajax({
            type: "post",
            url: "GetAutoShopCode.jsp",
            data: "columnId="+cid+"&merchantId="+mid,
            error:function(){
                alert("系统操作异常，请联系管理员！");
            },
            success: function (shopCodeStr) {
                if(shopCodeStr.indexOf("error") !=-1){
                    alert("店铺编码生成失败，请您联系管理员！");
                }else{
                     $("#addShopCodeForm").find("input[name='shopCode']").val(shopCodeStr);
                }
            }
        });
    });
});//-----------ready function() end
function deleteFunction(id,n){
    var cid = $("#columnId").val();
    var mid = $("#merchantId").val();
    var keyId =id;
    if(confirm('确定删除吗？')){
        $.ajax({
            type: "post",
            url: "ShopAuthorizationDelete.jsp",
            data: "columnId="+cid+"&merchantId="+mid+"&keyId="+keyId,//提交表单，相当于CheckCorpID.ashx?ID=XXX
            error:function(){
                alert("系统操作异常，请联系管理员！");
            },
            success: function (data) {
                if (data.state = 'ok') {
                    parent.showAlert("<div style='color: red'>删除成功！</div>");
                    location.reload(true);
                } else {
                    parent.showAlert("<div style='color: red'>删除成功！</div>");
                    return false;
                }
                return true;
            }
        });
    }
    else{
        return false;
    }
}
//refreshSessionKey------------------------------------------------------//
function refreshSessionKey(id,n){
    var cid = $("#columnId").val();
    var mid = $("#merchantId").val();
    var updateForm = "updateForm"+n;
    var topAppkey=$.trim($("#"+updateForm).find("input[name='topAppkey']").val());
    var topSecret=$.trim($("#"+updateForm).find("input[name='topSecret']").val());
    var topSessionkey=$.trim($("#"+updateForm).find("input[name='topSessionkey']").val());
    var topParameters=$.trim($("#"+updateForm).find("input[name='topParameters']").val());
        $.ajax({
            type: "post",
            url: "RefreshSessionKey.jsp",
            data: "columnId="+cid+"&merchantId="+mid+"&topAppkey="+topAppkey+"&topSecret="+topSecret+"&topSessionkey="+topSessionkey+"&topParameters="+topParameters,//提交表单，相当于CheckCorpID.ashx?ID=XXX
            error:function(){
                alert("系统操作异常，请联系管理员！");
            },
            success: function (data) {
                var jData = JSON.parse(data);
                if (jData.state =='ok'&& jData !="") {
                    parent.showAlert("<div style='color: red'>刷新成功！</div>");
                    location.reload(true);
                }else{
                    parent.showAlert("<div style='color: red'>刷新失败！</div>");
                    return false;
                }
                return true;
            }
        });
}
//update ---------------------------------------------------------------------//
function updateFunction(id,u){
    var updateForm="updateForm"+u;
    var cid = $("#columnId").val();
    var mid = $("#merchantId").val();
    var prov = $("#updateProv"+u).val();
    var city = $("#updateCity"+u).val();
    var formParams= $("#"+updateForm).serialize();
    var flagCheck=checkShopFormUpdate(updateForm);
    if(flagCheck){
    $.ajax({
        type: "post",
        url: "ShopAuthorizationUpdate.jsp",
        data: "merchantId="+mid+"&columnId="+cid+"&keyId="+id+"&"+formParams+"&prov="+prov+"&city="+city,//提交表单，相当于CheckCorpID.ashx?ID=XXX
        error:function(){
            parent.showAlert("<div style='color: red'>系统操作异常，请联系管理员！</div>");
            location.reload(true);
        },
        success: function (data) {
            if (data.state = 'ok') {
                parent.showAlert("<div style='color: red'>修改成功！</div>");
                location.reload(true);
            } else {
                parent.showAlert("<div style='color: red'>修改失败！</div>");
                return false;
            }
            return true;
        }
    });
    }
    else{
        $("#"+updateForm).find("input[required!='true']").each(function () {
            if ($(this).val().length < 1) {
                $(this).next().parents(".control-group").addClass("error");
            }
        });   }
}
//add model ,chooseRegionSelect change----------------------------------------------------------//
function addChangeSelect(optionValue) {
    if(optionValue==0){
        $("#city").hide();
    }else{
        var cid = $("#columnId").val();
        var mid = $("#merchantId").val();
        var parentId =optionValue;
        var appendCity="";
        var city = $("#city");
        $("#city").show();
        city.empty();
            $.ajax({
                type: "post",
                url: "LoadRegion.jsp",
                data: "columnId="+cid+"&merchantId="+mid+"&parentId="+parentId,
                error:function(){
                    alert("系统操作异常，请联系管理员！");
                },
                success: function (data) {
                    var regionData=eval("("+data+")");
                    for(var i=0;i<regionData.length;i++) {
                            var jRegion = regionData[i];
                            appendCity+="<option value="+jRegion.id+">"+jRegion.name+"</option>";
                    }
                    city.append(appendCity) ;
                }
            });
    }
}
//修改选择地区改变--------------------------------------------------------------------//
function updateChangeSelect(merchantId,columnId,optionValue,num){
    var jLocationCity = $("#jLocationCity"+num).val();
    var columnId = columnId;
    var merchantId = merchantId;
    var parentId =optionValue;
    if(optionValue==null){
        $("#updateCity"+num).hide();
        return false;
    }else{
        var appendCity="";
        var updateCity = $("#updateCity"+num);
        updateCity.empty();
        updateCity.show();
        $.ajax({
            type: "post",
            url: "LoadRegion.jsp",
            data: "columnId="+columnId+"&merchantId="+merchantId+"&parentId="+parentId,
            error:function(){
                alert("系统操作异常，请联系管理员！");
            },
            success: function (data) {
                var regionData=eval("("+data+")");
                var regionDataLength=regionData.length;
                if(regionDataLength>0){
                    updateCity.show();
                }
                for(var i=0;i<regionDataLength;i++) {
                    var jRegion = regionData[i];
                    if(jLocationCity==jRegion.id){
                        appendCity+="<option value="+jRegion.id+" selected='selected'>"+jRegion.name+"</option>";
                    }else{
                        appendCity+="<option value="+jRegion.id+">"+jRegion.name+"</option>";
                    }
                }
                updateCity.append(appendCity) ;
            }
        });
    }
}
//店铺添加验证 ---------------------------------------------------------//
function checkShopFormIsNull(formId){
    return $("#"+formId).validate({
        rules:{
            prov:"required",
            shopName:"required",
            topUrl:"required",
            topAppkey:"required",
            topSecret:"required",
            topSessionkey:"required",
            topParameters:"required",
            shopCode:"required"
        },
        messages:{
            prov:"<span  style='color: #ff0000;'><strong>X</strong> 请选择店铺所在地</span>" ,
            shopName:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            topUrl:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            topAppkey:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            topSecret:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            topSessionkey:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            topParameters:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            shopCode:"<strong style='display: inline;color: #ff0000;'>X</strong>"
        }
    }).form();
}
//店铺修改验证----------------------------------------------//
function checkShopFormUpdate(formId){
    return $("#"+formId).validate({
        rules:{
            updateShopName:"required",
            updateShopCode:"required",
            topUrl:"required",
            topAppkey:"required",
            topSecret:"required",
            topSessionkey:"required",
            topParameters:"required"
        },
        messages:{
            updateShopName:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            updateShopCode:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            topUrl:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            topAppkey:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            topSecret:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            topSessionkey:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            topParameters:"<strong style='display: inline;color: #ff0000;'>X</strong>"
        }
    }).form();
}
//shopCode add check -----------------------------------------//
function checkAddShopCodeForm(formId){
    return $(formId).validate({
        rules:{
            shopCode:"required",
            shopName:"required"
        },
        messages:{
            shopCode:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            shopName:"<strong style='display: inline;color: #ff0000;'>X</strong>"
        }
    }).form();
}
//look up the point item of addHelp model -----------------------------------//
function GetOpenItemNum(num){
    $(".accordion-body").removeClass("in");
    $("#"+num).addClass("in");
}
//get sessionkey -----------------------------------------------//
function getSessionKey(num,code){
    var topAppkey;
    var updateForm="updateForm"+num;
    if(num==0){
        topAppkey= $.trim($("#addForm input[name='topAppkey']").val());
    }else{
        topAppkey=$.trim($("#"+updateForm).find("input[name='topAppkey']").val());
    }
    if(topAppkey==null||topAppkey==""){
        if(code=="p"){
            alert("获取topParameters,参数topAppkey不可为空!");
        }else{
            alert("获取topSessionkey,参数topAppkey不可为空!");
        }
        return false;
    }
    var postUrl="http://container.open.taobao.com/container?appkey="+topAppkey+"&encode=utf-8";
    window.open(postUrl);
}
//choose a shopCode Item  ------------------------//
function  chooseShopCodeItem(form,shopName,shopCode){
    $("#showShopCodeModel").modal('hide');
    if(form==0){
       $("#addForm input[name='shopCode']").val(shopCode);
       $("#addForm input[name='shopName']").val(shopName);
        var shopCodeV=$("#shopCode").val();
        var shopNameV=$("#shopName").val();
        if(shopCodeV!=""&&shopNameV!=""){
            $("#shopName").next("label").hide();
            $("#shopCode").next("label").hide();
        }
    }else{
       $("#updateForm"+form+" input[name='updateShopCode']").val(shopCode);
       $("#updateForm"+form+" input[name='updateShopName']").val(shopName);
    }
}
//add a shopCode Item -----------------------------------------------//
function  addShopCodeItem(){
    var getForm= $("#addShopCodeForm");
    var listNum= $("#listNum").text();
    var data = getForm.serialize();
    var checkFlag=checkAddShopCodeForm(getForm);
    if(checkFlag){
        $.ajax({
            url: 'ShopCodeAdd.jsp',
            data: data,
            type: "post",
            cache: false,
            error:function(){
                alert("系统操作异常，请联系管理员！");
            },
            success: function (data) {
                var jData = JSON.parse(data);
                if (jData.state =='ok'&& jData !="") {
                    parent.showAlert("<div style='color: red'>"+jData.msg+"</div>");
                } else {
                    alert(jData.msg);
                    return;
                }
                $('#addShopCodeModel').modal('hide');
                myShopCode(listNum);
            }
        });
    }else{
        $("#addShopCodeForm").find("input[name!='shopCodeDesc']").each(function () {
            if ($(this).val().length < 1) {
                $(this).parents(".control-group").addClass("error");
            }
        });
    }
}
//get my shopCode  storage -----------------------------------------------//
function myShopCode(num){
    var formNum=num;
    var cid = $("#columnId").val();
    var mid = $("#merchantId").val();
    var time=new Date().getTime();
    $("#listNum").html(formNum);
    $.ajax({
        type: "post",
        url: "LoadShopCodeList.jsp",
        data: "columnId="+cid+"&merchantId="+mid+"&time="+time,
        error:function(){
            alert("系统操作异常，请联系管理员！");
        },
        success: function (data) {
            var shopCodeData=eval("("+data+")");
            var shopCodeLength=shopCodeData.length;
            var shopCodeItem;
            var shopCode;
            var shopName;
            var shopCodeDesc;
            var shopCodeId;
            var shopNameLeg;
            var shopNameStr;
            if(shopCodeLength>0){
                $("#shopCodeInfo").hide();
                $("#shopInfo").show();
                $("#shopCodeTable").show();
                $("#shopCodeTable tr:not(:first)").remove(); //除了第一行标题，全删掉
                for(var i=shopCodeLength-1;i>=0;i--) {
                    shopCodeItem = shopCodeData[i];
                    shopName = shopCodeData[i].shopName;
                    shopCode = shopCodeData[i].shopCode;
                    shopCodeDesc = shopCodeData[i].shopCodeDesc;
                    shopNameLeg= getStringRealLength(shopName);
                    if(shopNameLeg>15){
                        shopNameStr=shopName.substring(0,8)+"...";
                    }else{
                        shopNameStr=shopName;
                    }
                    shopCodeId = shopCodeData[i].id;
                    $("<tr><td>"+shopNameStr+"</td><td>"+shopCodeItem.shopCode
                        +"</td><td>"+"<a href='#' class='btn btn-danger' onclick='chooseShopCodeItem("+formNum+","
                        +"\""+shopName+"\""+","+"\""+shopCode+"\");'>选 择</a>"
                        +"&nbsp;<a href='#' class='btn btn-warning' onclick='updateShopCodeModel("+formNum+","
                        +"\""+shopName+"\""+","+"\""+shopCodeId+"\""+","+"\""+shopCode+"\""+","+"\""+shopCodeDesc+"\");'>修 改</a>"
                        +"</td></tr>").insertAfter($("#shopCodeTable thead"));
                }
                $("#shopCodeTable tr:not(:first)").wrapAll("<tbody></tbody>");
            }else{
                $("#shopInfo").hide();
                $("#shopCodeTable").hide();
                $("#shopCodeInfo").show();
            }
        }
    });
};
function updateShopCodeModel(formNum,shopName,shopCodeId,shopCode,shopCodeDesc){
    $("#updateShopCodeForm input[name='shopCodeId']").val(shopCodeId);
    $("#updateShopCodeForm input[name='shopCode']").val(shopCode);
    $("#updateShopCodeForm input[name='shopName']").val(shopName);
    $("#updateShopCodeForm input[name='shopCodeDesc']").val(shopCodeDesc);
    $("#updateShopCodeFormNum").html(formNum);
    $("#updateShopCodeModel").modal('show');
}
function updateShopCodeItem(){
  var formId="#updateShopCodeForm";
  var updateData=$(formId).serialize();
  var formNumFlag= $("#updateShopCodeFormNum").text();
    var flagCheck=checkAddShopCodeForm(formId);
    if(flagCheck){
        $.ajax({
            type: "post",
            url: "ShopCodeUpdate.jsp",
            data: updateData,
            cache: false,
            error:function(){
                alert("系统操作异常，请联系管理员！");
            },
            success: function (data) {
                var jData = JSON.parse(data);
                if (jData.state =='ok'&& jData !="") {
                    parent.showAlert("<div style='color: red'>"+jData.msg+"</div>");
                    $("#updateShopCodeModel").modal('hide');
                    myShopCode(formNumFlag);
                } else {
                    alert(jData.msg);
                }
            }
        });
    }
    else{
        $(formId).find("input[required!='true']").each(function () {
            if ($(this).val().length < 1) {
                $(this).next().parents(".control-group").addClass("error");
            }
        });
    }
}
//get string length---------------------------------------------------//
function getStringRealLength(str) {
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
};