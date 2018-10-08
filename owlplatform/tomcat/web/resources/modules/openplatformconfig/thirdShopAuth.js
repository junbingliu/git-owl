$(document).ready(function () {
//-------------------------------   shopAuth add ---------------------//
    $("#addShopAuthSubmit").click(function () {
        var formId="#addShopAuthForm";
        var addShopAuthFormData = $('#addShopAuthForm').serialize();
        var checkFlag=checkAddShopAuthForm(formId);
        if(checkFlag){
            $(formId).submit(function () {
                $.ajax({
                    url: 'ShopAuthAdd.jsp',
                    data: addShopAuthFormData,
                    type: "post",
                    cache: false,
                    error: function () {
                        alert("系统操作异常，请联系管理员！");
                    },
                    success: function (data) {
                        var jData = JSON.parse(data);
                        if (jData.state == 'ok') {
                            parent.showAlert("<div style='color: blue'>应用添加成功！</div>");
                            location.reload(true);
                        }else {
                            parent.showAlert("<div style='color: red'>应用添加失败！</div>");
                            location.reload(true);
                            return false;
                        }
                        return true;
                    }
                });
                return false;
            });
        }else{
            $(formId).find("input[required!='true']").each(function () {
//            $(formId).find("input[name!='shopDescription']").each(function () {
                if ($(this).val().length < 1) {
                    $(this).next().parents(".control-group").addClass("error");
                }
            });
        }
    });
});
//------------------------------ready function end ---------------- //
//-----------------  delete shop  ------------//
function deleteShopAuth(id,n){
    var columnId = $("#columnId").val();
    var merchantId = $("#merchantId").val();
    var shopId = $("#shopId").val();
    if(confirm('确定删除吗？')){
        $.ajax({
            type: "post",
            url: "ShopAuthDelete.jsp",
            data: "columnId="+columnId+"&merchantId="+merchantId+"&shopId="+shopId+"&shopAuthId="+id,
            error:function(){
                alert("系统操作异常，请联系管理员！");
            },
            success: function (data) {
                if (data.state = 'ok') {
                    parent.showAlert("<div style='color: blue'>应用删除成功！</div>");
                    location.reload(true);
                } else {
                    parent.showAlert("<div style='color: red'>应用删除失败！</div>");
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
//---------------updateShopAuthSave
function updateShopAuthSave(shopAuthId,num){
    var columnId = $("#columnId").val();
    var merchantId = $("#merchantId").val();
    var formId="#updateShopAuthForm"+num;
    var updateData=$(formId).serialize();
    var checkFlag=checkUpdateShopAuthForm(formId);
    if(checkFlag){
        $.ajax({
            type: "post",
            url: "ShopAuthUpdate.jsp",
            data: "merchantId="+merchantId+"&columnId="+columnId+"&shopAuthId="+shopAuthId+"&"+updateData,
            cache: false,
            error:function(){
                alert("系统操作异常，请联系管理员！");
            },
            success: function (data) {
                var jData = JSON.parse(data);
                if (jData.state =='ok'&& jData !="") {
                    $("#updateShopAuthModal"+num).modal('hide');
                    parent.showAlert("<div style='color: blue'>"+jData.msg+"</div>");
                    location.reload(true);
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
//---------------  check AddShopForm  ---------------
function checkAddShopAuthForm(formId){
    return $(formId).validate({
        rules:{
            topUrl:"required",
            topAppkey:"required",
            topSecret:"required",
            topSessionkey:"required",
            topParameters:"required"
        },
        messages:{
            topUrl:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            topAppkey:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            topSecret:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            topSessionkey:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            topParameters:"<strong style='display: inline;color: #ff0000;'>X</strong>"
        }
    }).form();
}
//---------------  check AddShopForm  ---------------
function checkUpdateShopAuthForm(formId){
    return $(formId).validate({
        rules:{
            topUrl:"required",
            topAppkey:"required",
            topSecret:"required",
            topSessionkey:"required",
            topParameters:"required"
        },
        messages:{
            topUrl:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            topAppkey:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            topSecret:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            topSessionkey:"<strong style='display: inline;color: #ff0000;'>X</strong>",
            topParameters:"<strong style='display: inline;color: #ff0000;'>X</strong>"
        }
    }).form();
}
//---------------------ShopAuth ---------------------------
function goToShopAuth(shopId){
    var columnId = $("#columnId").val();
    var merchantId = $("#merchantId").val();
    var url="ShopAuthList.jsp?columnId="+columnId+"&merchantId="+merchantId+"&shopId="+shopId;
    window.location.href=url;
}
//look up the point item of addHelp model -----------------------------------//
function GetOpenItemNum(num){
    $(".accordion-body").removeClass("in");
    $("#"+num).addClass("in");
}
//get sessionkey -----------------------------------------------//
function getSessionKey(num,code){
    var topAppkey;
    var updateShopAuthForm="#updateShopAuthForm"+num;
    if(num==0){
        topAppkey= $.trim($("#addShopAuthForm input[name='topAppkey']").val());
    }else{
        topAppkey=$.trim($(updateShopAuthForm).find("input[name='topAppkey']").val());
    }
    if(isNaN(topAppkey)){
        alert("topAppkey是长度为8的数字字符串，请更改!");
        return false;
    }
    if(topAppkey==null||topAppkey==""){
        if(code=="p"){
            alert("获取topParameters,参数topAppkey不可为空!");
        }else if(code=="shopAuth"){
            alert("进行应用授权,参数topAppkey不可为空!");
        }else{
            alert("获取topSessionkey,参数topAppkey不可为空!");
        }
        return false;
    }else if(topAppkey.length!=8){
        alert("请检查topAppkey长度是否为8的数字字符串!");
        return false;
    }
    var postUrl="http://container.open.taobao.com/container?appkey="+topAppkey+"&encode=utf-8";
    window.open(postUrl);
}
//refreshSessionKey------------------------------------------------------//
function refreshSessionKey(id,n){
    var columnId = $("#columnId").val();
    var merchantId = $("#merchantId").val();
    var updateForm = "#updateShopAuthForm"+n;
    var topAppkey=$.trim($(updateForm).find("input[name='topAppkey']").val());
    var topSecret=$.trim($(updateForm).find("input[name='topSecret']").val());
    var topSessionkey=$.trim($(updateForm).find("input[name='topSessionkey']").val());
    var topParameters=Trim($(updateForm).find("input[name='topParameters']").val(),"g");
    $.ajax({
        type: "post",
        url: "RefreshSessionKey.jsp",
        data: "columnId="+columnId+"&merchantId="+merchantId+"&topAppkey="+topAppkey+"&topSecret="+topSecret+"&topSessionkey="+topSessionkey+"&topParameters="+topParameters,//提交表单，相当于CheckCorpID.ashx?ID=XXX
        error:function(){
            alert("系统操作异常，请联系管理员！");
        },
        success: function (data) {
            var jData = JSON.parse(data);
            if (jData.state =='ok'&& jData !="") {
                parent.showAlert("<div style='color: blue'>SessionKey刷新成功！</div>");
                location.reload(true);
            }else{
                parent.showAlert("<div style='color: red'>SessionKey刷新失败！</div>");
                return false;
            }
            return true;
        }
    });
}
//---------  返回店铺设置页面  -------------
function goBack(){
    var columnId = $("#columnId").val();
    var merchantId = $("#merchantId").val();
    var backurl="ThirdShopSetList.jsp?columnId="+columnId+"&merchantId="+merchantId;
    window.location.href=backurl;
}
//去除字符串空格(前中后)
function Trim(str,is_global)
{
    var resultStr;
    resultStr = str.replace(/(^\s+)|(\s+$)/g,"");
    if(is_global.toLowerCase()=="g")
        resultStr = resultStr.replace(/\s/g,"");
    return resultStr;
}
