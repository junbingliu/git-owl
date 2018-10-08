var merchantId = "";
var columnId = "";
var postData = new Object();
var deleteDelM =[];
var addDelM = [];
var erpNo = "false";
$(function (){
    getStartData();
    $("#checkBoxSave").click(function(){
        getNeedupdateData();
    });
});


function getStartData(){
    merchantId = $("#merchantId").val();
    columnId = $("#columnId").val();
    postData["merchantId"] = merchantId;
    postData["columnId"] = columnId;
    getDateList("/OurHome/modules/delivery/delMerchant/DelMerchantList.jsp");
}

//-------------------获取数据列表--------------------------
function getDateList(url){

    var isCh = [];
    deleteDelM =[];
    addDelM = [];
    $.post(url,postData,function(data){
        var state = data.state;
        var dataTotal = data.total;
        erpNo=data.enableERP;
        if(state=="ok"){
            var dataAll =[];
            var htmlString="";
            $("#tab").html("");
            var dataRecordsLength = data.records.length;
            $.each(
                data.records,
                function(index,values){
                    var name = "";
                    var delMerchantName = values.delMerchantName;//商家的名称
                    var deliveryMerchantName = values.deliveryMerchantName;//平台的名称
                    var deliveryMerchantId = values.id;
                    var delMerchantId = values.delId;
                    var dmId ="";
                    var isCheck = false;

                    if(values.isY=="0"){//未选中时名称
                        if(delMerchantName!="" && delMerchantName!=null){
                            if(delMerchantName != deliveryMerchantName){//已经修改过备注名称，则显示备注名称
                                name = delMerchantName;
                            }else{
                                name = deliveryMerchantName;
                            }
                        }else{
                            name = deliveryMerchantName;
                        }
                    }else if(values.isY=="1"){//选中时名称
                        isCheck=true;
                        name = delMerchantName;
                    }

                    if(delMerchantId != null && delMerchantId !=""){

                        dmId = delMerchantId;
                    }else{
                        dmId = deliveryMerchantId;
                    }
                    var htmlStringNode = '<td style="padding: 5px;"><label class="checkbox"><input type="checkbox" checked="" onclick="inputChecked(\''+dmId+'\')" id="'+dmId+'"><a href="#" data-toggle="modal" id="hr-'+dmId+'"  onclick="updateData(\''+dmId+'\','+values.isY+')">'+name+'</a></label></td>';

                    if(!isCheck){
                        isCh.push(dmId);
                    }
                    htmlString+=htmlStringNode;
                    if(dataRecordsLength>4){
                        if((index+1)%4 == 0){//index从０开始计数的
                            $("#tab").append("<tr>"+htmlString+"</tr>");
                            htmlString=""
                        }else if((index+1)==dataRecordsLength){
                            $("#tab").append("<tr>"+htmlString+"</tr>");
                        }
                    }else{
                        if((index+1)==dataRecordsLength){
                            $("#tab").append("<tr>"+htmlString+"</tr>");
                        }
                    }

                }
            );

            $.each(isCh,function(n,value) {
                $("#"+value).attr("checked",false);
            });

        }else{
            alert("获取数据失败");
        }
    },'json');
}

//----------修改数据-----------
function updateData(id,isY){

    if(isY=="1"){
        getDateSingle(id,isY);
    }else if(isY=="0"){
        var addUrl = "/OurHome/modules/delivery/delMerchant/GetParameters.jsp";
        var arraydelete = new Array();
        var oupdate = new Object();
        oupdate.id = id;
        arraydelete[0] = oupdate;
        postData["dmIdArray"]=$.toJSON(arraydelete);

        $.post(addUrl,postData,function(data){
            $("#hidediv").html("");
            $("#messageDiv").html("");
            $.each(
                data.jrecords,
                function(index,values){
                    $(".modal-header h3").html("修改配送商");
                    var delMerchantName = values.deliveryMerchantName;

                    var delMerchantERPNo = values.delMerchantERPNo;//有可能为空；
                    var deliveryMerchantName = values.deliveryMerchantName;
                    var deliveryMerchantWebsite = values.deliveryMerchantWebsite;
                    var deliveryMerchantDescription = values.deliveryMerchantDescription;
                    var deliveryMerchantId = values.id;
                    var pos = values.pos;
                    $("#delMerchantName").val(delMerchantName);
                    if(delMerchantERPNo==null){
                        delMerchantERPNo="";
                    }
                    $("#delMerchantERPNo").val(delMerchantERPNo);

                    appendHiddenInput("pos",pos);
                    $("#hidediv").append('<input type="hidden" id="hidden_deliveryMerchantId" value="'+deliveryMerchantId+'">');
                    $("#deliveryMerchantName").html(deliveryMerchantName);
                    $("#deliveryMerchantWebsite").html(deliveryMerchantWebsite);
                    var newWebsite = deliveryMerchantWebsite.substring(0,7);
                    if(newWebsite!="http://"){
                        newWebsite="http://"+deliveryMerchantWebsite;
                    }else{
                        newWebsite=deliveryMerchantWebsite;
                    }
                    $("#deliveryMerchantWebsite").attr("href",newWebsite);
                    $("#deliveryMerchantDescription").html(deliveryMerchantDescription);
                    $("#hidediv").append('<input type="hidden" id="hidden_clickId" value="'+id+'">');
                    $("#hidediv").append('<input type="hidden" id="hidden_isYId" value="'+isY+'">');
                    $("#dateDetail").modal('show');
                });
        },'json');

    }

}
//-------------获取要修改的数据---------------
function getDateSingle(idString,isY){

    postData["dId"] = idString;
    var url = "/OurHome/modules/delivery/delMerchant/GetDelMerchant.jsp";
    $.post(url,postData,function(data){
        $("#hidediv").html("");
        $("#messageDiv").html("");
        $.each(
            data.jDelMerchant,
            function(index,values){
                $(".modal-header h3").html("修改配送商");
                var delMerchantName = values.delMerchantName;
                var delMerchantERPNo = values.delMerchantERPNo;//有可能为空；
                var deliveryMerchantName = values.deliveryMerchantName;
                var deliveryMerchantWebsite = values.deliveryMerchantWebsite;
                var deliveryMerchantDescription = values.deliveryMerchantDescription;

                var supportInterface = values.supportInterface;
                var deliveryMerchantId = values.deliveryMerchantId;
                var url = values.url;
                var companyCode = values.companyCode;
                var pos = values.pos;
                $("#delMerchantName").val(delMerchantName);

                if(delMerchantERPNo==null){
                    delMerchantERPNo="";
                }
                $("#delMerchantERPNo").val(delMerchantERPNo);

                appendHiddenInput("supportInterface",supportInterface);
                appendHiddenInput("url",url);
                appendHiddenInput("companyCode",companyCode);
                appendHiddenInput("pos",pos);
                $("#hidediv").append('<input type="hidden" id="hidden_deliveryMerchantId" value="'+deliveryMerchantId+'">');
                $("#deliveryMerchantName").html(deliveryMerchantName);
                $("#deliveryMerchantWebsite").html(deliveryMerchantWebsite);
                var newWebsite = deliveryMerchantWebsite.substring(0,7);
                if(newWebsite!="http://"){
                    newWebsite="http://"+deliveryMerchantWebsite;
                }else{
                    newWebsite=deliveryMerchantWebsite;
                }
                $("#deliveryMerchantWebsite").attr("href",newWebsite);

                $("#deliveryMerchantDescription").html(deliveryMerchantDescription);
                $("#hidediv").append('<input type="hidden" id="hidden_clickId" value="'+idString+'">');
                $("#hidediv").append('<input type="hidden" id="hidden_isYId" value="'+isY+'">');
                $("#dateDetail").modal('show');
            });
    },'json');
}
//---------------保存要修改的数据---------------
function saveUpdateData(){

    var isYId = $("#hidden_isYId").val();
    if(isYId=="1"){
        var id = $("#hidden_clickId").val();
        var delMerchantName = $("#delMerchantName").val();
        var delMerchantERPNo = $("#delMerchantERPNo").val();//有可能为空；
        var deliveryMerchantName = $("#deliveryMerchantName").text();
        var deliveryMerchantWebsite = $("#deliveryMerchantWebsite").text();
        var deliveryMerchantDescription = $("#deliveryMerchantDescription").text();
        var supportInterface = $("#hidden_supportInterface").val();
        var deliveryMerchantId = $("#hidden_deliveryMerchantId").val();
        var url = $("#hidden_url").val();
        var companyCode = $("#hidden_companyCode").val();
        var pos = $("#hidden_pos").val();
       if($.trim(delMerchantName) == ""){
           $("#messageDiv").html("*必填,且不能为空或全为空格");
           return false;
       }
        if(pos==null || $.trim(pos)==""){
            pos="100";
        }
        var array = new Array();
        var del = new Object();
        del.delMerchantName = delMerchantName;
        del.id = id;
        if(!$("#div_delMerchantERPNo").is(":hidden")){
         del.delMerchantERPNo = delMerchantERPNo;
        }
        del.deliveryMerchantWebsite = deliveryMerchantWebsite;
        del.deliveryMerchantDescription = deliveryMerchantDescription;
        del.merchantId = merchantId;
        del.deliveryMerchantName = deliveryMerchantName;
        del.supportInterface = supportInterface;
        del.deliveryMerchantId = deliveryMerchantId;
        del.url = url;
        del.companyCode = companyCode;
        del.pos = pos;
        array[0] = del;

        postData["json"] = $.toJSON(del);
        var url = "/OurHome/modules/delivery/delMerchant/DelMerchantUpdate.jsp";
        $.post(url,postData,function(data){
            returnMessage(data.state);
        },'json');
    }else if(isYId=="0"){
        var delMerchantERPNo = $("#delMerchantERPNo").val();//有可能为空；
        var arrayDelM = new Array();
        var oDel = new Object();
        oDel.merchantId = merchantId;
        oDel.delMerchantName = $("#delMerchantName").val();
        if(!$("#div_delMerchantERPNo").is(":hidden")){
            oDel.delMerchantERPNo = delMerchantERPNo;
        }
        oDel.deliveryMerchantId = $("#hidden_deliveryMerchantId").val();
        arrayDelM[0] = oDel;
        var urlAddData = "/OurHome/modules/delivery/delMerchant/DelMerchantAdd.jsp";
        $("#tab_thead_td_div").html("");
        addData(urlAddData,arrayDelM);
        $("#dateDetail").modal('hide');
    }
}

function appendHiddenInput(nam,value){
    if(value!=null){
        $("#hidediv").append('<input type="hidden" id="hidden_'+nam+'" value="'+value+'">');
    }
}
//------------处理返回来的数据-------------------
function returnMessage(state){
    var state = state;
    if(state=="none"){
        alert("权限不足");
    }else if(state=="ok"){
        $("#dateDetail").modal('hide');
        getDateList("/OurHome/modules/delivery/delMerchant/DelMerchantList.jsp");
        saveReturnMessage("操作成功");
    }else if(state=="null"){
        alert("没有可操作数据");
    }else if(state=="error"){
        alert("操作异常");
    }
}

function inputChecked(checkBoxId){
    var inputObj = $("#"+checkBoxId);
    var isAdd = $.inArray(checkBoxId, addDelM);
    var isDel = $.inArray(checkBoxId, deleteDelM);
    if(isAdd != -1 ){
        addDelM.splice($.inArray(checkBoxId,addDelM),1);
    }else if(isDel != -1){
        deleteDelM.splice($.inArray(checkBoxId,deleteDelM),1);
    }else{
        if(inputObj.attr("checked")){
            addDelM.push(checkBoxId);
        }else{
            deleteDelM.push(checkBoxId);
        }
    }
}
//------------获取需要操作的数据（增加和删除）------------------
function getNeedupdateData(){
    $("#tab_thead_td_div").html("");
    var addDelNum = addDelM.length;
    var deleteDelNum = deleteDelM.length;
    var stateAdd="";
    var stateDel="";
    if(addDelNum>0){
        var addUrl = "/OurHome/modules/delivery/delMerchant/GetParameters.jsp";
       getDeliveryMerchantList(addUrl);
    }else{
        if(deleteDelNum>0){
            var deleteUrl = "/OurHome/modules/delivery/delMerchant/DelMerchantDelete.jsp";
            deleteData(deleteUrl);
        }
    }
}

//----------------根据需要增加的配送商，获取平台的配送商信息-----------------------
function getDeliveryMerchantList(url){
    var jsonArray = new Array();

    var num = 0;
    $.each(addDelM,function(n,values) {
        var jsonObj = new Object();
        jsonObj["id"] = values;
        jsonArray[num] = jsonObj;
        num++;
    });
    postData["dmIdArray"]=$.toJSON(jsonArray);
    $.post(url,postData,function(data){
        if(data.state=="ok"){
            var arrayDelM = new Array();
            var jrecordsNum = 0;
            $.each(
                data.jrecords,
                function(index,values){
                    var oDel = new Object();
                    var isApp = values.isApp;
                    if(isApp=="0"){
                        alert("\""+values.deliveryMerchantName+"\"被管理员设置为不可用,已过滤");
                    }else{
                        oDel.merchantId = merchantId;
                        oDel.delMerchantName = values.deliveryMerchantName;
                        oDel.deliveryMerchantId = values.id;
                        arrayDelM[jrecordsNum] = oDel;
                        jrecordsNum++;
                    }
                });
            var urlAddData = "/OurHome/modules/delivery/delMerchant/DelMerchantAdd.jsp";
            if(arrayDelM.length>0){
                addData(urlAddData,arrayDelM);
            }
        }else{
            saveReturnMessage("获取数据失败");
        }
    },'json');

}

//----------------增加启用的配送商--------
function addData(urlAddData,addDataJsonString){
    postData["json"]=$.toJSON(addDataJsonString);
    $.post(urlAddData,postData,function(data){
        if(data.state=="ok"){
            if(deleteDelM.length<1){
                getDateList("/OurHome/modules/delivery/delMerchant/DelMerchantList.jsp");
                saveReturnMessage("操作成功");
            }else{
                var deleteUrl = "/OurHome/modules/delivery/delMerchant/DelMerchantDelete.jsp";
                deleteData(deleteUrl);
            }
        }else{
            saveReturnMessage("操作失败");
        }
    },'json');

}

//------------------删除已启用的配送商-------------
function deleteData(deleteUrl){

    var arraydelete = new Array();
    $.each(deleteDelM,function(n,values) {
        var oDelete = new Object();
        oDelete.id = values;
        arraydelete[n] = oDelete;
    });
    postData["idArray"]=$.toJSON(arraydelete);

    $.post(deleteUrl,postData,function(data){
        if(data.state=="ok"){
            saveReturnMessage("操作成功");
            getDateList("/OurHome/modules/delivery/delMerchant/DelMerchantList.jsp");
        }else{
            saveReturnMessage("操作失败");
        }
    },'json');

}

//------------------调用关闭右下角弹出框------------------------------
function saveReturnMessage(message) {
    var time = 4000;
    rightFootWin(message, time);
}
var num=0;
//--------------右下角弹出信息---------------------
function rightFootWin(message, time) {
    var tip;
    tip = $.ligerDialog.tip({ title:'提示信息', content:message ,height:135 });
    setTimeout(function () {
        tip.close();
    }, time);
}
