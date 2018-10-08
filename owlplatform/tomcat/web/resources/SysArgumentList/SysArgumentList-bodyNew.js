var merchantId = "";
var columnId = "";
var postData = new Object();
var updateIdArray;
var allbusType;
$(function () {
    columnId = $("#columnId").val();
    merchantId = $("#merchantId").val();
    postData["columnId"] = columnId;
    postData["merchantId"] = merchantId;
    getDataList("/OurHome/modules/sysargument/SysArgumentList.jsp");
    $("input[name='btnSaveAll']").live("click",function(){
        getAllSaveData();
    });
    //---------------------展开/收缩 明细--------------------------
    $("div[name='spreadLine']").live('click',function(){
        if($(this).children().children(".l-close").attr("class")=="l-close"){
            $(this).children().children(".l-close").removeClass("l-close").addClass("l-open");
            $(this).next().next().show();
        }else if($(this).children().children(".l-open")){
            $(this).children().children(".l-open").removeClass("l-open").addClass("l-close");
            $(this).next().next().hide();
        }
    });
});

function  getAllSaveData(){
    var sysArray = new Array();
    var index = 0;
    $.each(updateIdArray,function(num,val){
        var id = val;
        var sysKey = val;
        var keyPObj = $("#"+sysKey+"_tr");
        var sysType = keyPObj.children("td[name='sysType']").text();
        var sysArgJson = JSON.parse(keyPObj.children("td[name='sysArgJson']").text());
        if(sysArgJson.checkboxVal!=null){
            sysArgJson.value = getCheckboxArray(sysKey);
        }else{
            if(sysType=="0" || sysType=="2"){
                sysArgJson.value = $("#"+sysKey).val();
            }else if(sysType=="1"){
                var filedidStr = $("#"+sysKey).attr("filedid");
                sysArgJson.value = filedidStr;
                if(null != filedidStr && $.trim(filedidStr) != ""){
                    sysArgJson.fullpath = $("#"+sysKey).attr("src");
                }
            }

        }
        sysArray[index] = sysArgJson;
        index++;
    });
    saveAllData(sysArray);
}
//---------------获取数据-------------------
function getDataList(url) {

    $("#bodyCenter").html("");
    updateIdArray=new Array();
    allbusType = new Array();
    $.post(url, postData, function (data) {
        var state = data.state;
        var bt = "";
        if (state == "ok") {
            $.each(
                data.records,
                function (index, values) {
                    var dataType = values.type;
                    var dataBusinessType = values.businessType;
                    var dataName = values.name;
                    var dataValue = values.value;
                    var dataDescription = values.description;
                    var dataKey = values.key;
                    var dataPos = values.pos;
                    var isAdd = "N";
                    var dataCheckboxVal = values.checkboxVal;
                    var dataIsCheck = "";
                    var sysArgJson = JSON.stringify(values);
                    var fullpath = "";
                    if(dataBusinessType == null || dataBusinessType == ""){
                        dataBusinessType = "默认分组";
                    }
                    if(dataPos == null || dataPos == ""){
                        dataPos = "100";
                    }
                    var dname = "detailContent";

                    if(dataValue == undefined){
                        dataValue = "";
                    }

                    var sysValueHtml = "";
                    if(dataCheckboxVal!=null){
                        dataIsCheck = values.isMultipleChoice;
                        sysValueHtml = '<div style="clear: both;"></div><div  class="control-group" name="'+dataKey+'_sysValue"><label class="control-label" >'+dataName+':<div class="wrapKey">('+dataKey+')</div></label></div>'
                    }else{
                        if(dataType=="0"){
                            sysValueHtml = '<div class="control-group" ><label class="control-label"  for="'+dataKey+'">'+dataName+':<div class="wrapKey">('+dataKey+')</div></label><div class="controls"><input type="text" class="input-xlarge" style="width: 90%;" onfocus="getfocus(\''+dataKey+'\')" id="'+dataKey+'" value=""> <p class="help-block" style="margin-top:0px;color: #BDBDBD">'+dataDescription+'</p></div></div>'
                        }else if(dataType=="1"){
                            fullpath = values.fullpath;
                            if($.trim(dataValue)==""){
                                fullpath = "/upload/none_40.jpg";
                            }
                            sysValueHtml = '<div class="control-group"><label class="control-label" for="'+dataKey+'">'+dataName+':<div class="wrapKey">('+dataKey+')</div></label><div class="controls">' +
                                '<img style="width:60px;height:60px;margin-bottom: 0px;margin-right: 10px;" onclick="createDocPicWin(\''+dataKey+'\')"   id="'+dataKey+'" src="">'+
                                '<input type="button" value="更换图片" class="btn" filedid=""  style="margin-top: 25px;margin-bottom: 0px;" onclick="createDocPicWin(\''+dataKey+'\')">'+
                                '<p style="color: #BDBDBD">'+dataDescription+'</p>'+
                                '</div>'+
                                '</div>'
                        }else if(dataType=="2"){
                            sysValueHtml = '<div class="control-group"><label class="control-label" for="'+dataKey+'">'+dataName+':<div class="wrapKey">('+dataKey+')</div></label><div class="controls"><input type="password" style="width: 90%;margin-bottom: 0px;" onfocus="getfocus(\''+dataKey+'\')" id="'+dataKey+'" value=""><p class="help-block" style="margin-top:0px;color: #BDBDBD">'+dataDescription+'</p></div></div>'
                        }

                    }

                    var allHtml = '<tr id="'+dataKey+'_tr"><td  style="display: none" name="sysPos">'+dataPos+'</td><td  style="display: none">'+dataKey+'</td><td  style="padding-right: 10px;display: none" width="20%"  name="sysName">'+dataName+'</td><td name="sysValue">'+sysValueHtml+'</td><td style="display: none"  name="sysType">'+dataType+'</td><td style="display: none" name="sysBusinessType">'+dataBusinessType+'</td><td style="display: none" name="sysDescription">'+dataDescription+'</td><td style="display: none" name="sysArgJson">'+sysArgJson+'</td></tr> ';
                    var divB = $("div[name='businessType_"+dataBusinessType+"']").html();
                    if(divB==null){
                        allbusType.push(dataBusinessType);
                        createHtml(dataBusinessType);
                    }
                    $("div[name='businessType_"+dataBusinessType+"'] table[name='"+dname+"'] tbody").append(allHtml);
                    //-------------追加多选的子选项------------------
                    if(dataCheckboxVal!=null){
                        var divName = dataKey+'_sysValue';
                        var dvLength = dataCheckboxVal.length;
                        var dataValueArray = new Array();
                        dataValueArray = dataValue.split(";");
                        $.each(
                            dataCheckboxVal,
                            function(inde,val){
                                var sysVal_id = dataKey+"_"+inde;
                                var checkboxNum = val.checkboxNum;
                                var checkboxName = val.checkboxName;
                                var sysVal_valHtml = "";
                                if(dataIsCheck=="Y"){
                                    sysVal_valHtml = '<div class="controls"><label class="checkbox"><input onclick="updateCheckBox(\''+dataKey+'\')" type="checkbox" id="'+sysVal_id+'" value="'+checkboxNum+'">'+checkboxName+'</label></div> ';
                                }else if(dataIsCheck=="N"){
                                    sysVal_valHtml = '<div class="controls"><label class="radio"><input type="radio" onclick="updateCheckBox(\''+dataKey+'\')" name="'+dataName+'" id="'+sysVal_id+'" value="'+checkboxNum+'">'+checkboxName+'</label></div> ';
                                }

                                $("div[name="+divName+"]").append(sysVal_valHtml);

                                if(dataIsCheck=="Y"){
                                    if($.inArray(checkboxNum,dataValueArray)!="-1" ){
                                        $("#"+sysVal_id).attr("checked", true);
                                    }
                                }else if(dataIsCheck=="N"){
                                    if(checkboxNum == dataValue){
                                        $("#"+sysVal_id).attr("checked", true);
                                    }
                                }
                                if(inde==(dvLength-1)){
                                     $("#"+sysVal_id).parent().parent().append('<p style="color: #BDBDBD">'+dataDescription+'</p>');
                                }
                            }
                        );
                    }else{
                        if(dataType=="0" || dataType=="2"){
                            $("#"+dataKey).attr("value",dataValue);
                        }else if(dataType=="1"){
                            $("#"+dataKey).attr("filedid",dataValue);
                            $("#"+dataKey).attr("src",fullpath);
                        }
                    }
                }
            );
            //--------------------排序---------------------
            $.each(allbusType,function(n,bType){
                var tableName = "businessType_"+bType+"_table";
                var obj = $("#"+tableName).children("tbody");
                if(obj!=null && $.trim(obj.html())!=""){
                    sortTableT.sort(tableName,0,'Number' ,false);
                }
            });
            $("#bodyCenter").show();
        } else {
            alert("查询数据失败");
        }
    }, 'json');

}



//--------------input失去焦点------------------------
function getfocus(id){
    var i = 0;
    $("#"+id).change(function(){
        if(i==0){
            if($.inArray(id,updateIdArray)=="-1" ){
                updateIdArray.push(id);
            }
        }
        i++;
    });
}


//--------------处理返回来的数据-------------
function returnMessage(data){
    var state = data.state;
    var message = "";
    if(state=="none"){
        message = "权限不足";
        alert(message);
    }else if(state=="duplicate"){
        message = "*参数键已存在";
        alert(message);
    }else if(state=="ok"){
        message = "保存成功";
        saveReturnMessage(message);
    }else if(state=="error"){
        message = "操作异常";
        alert(message);
    }
}

//------------------调用关闭右下角弹出框------------------------------
function saveReturnMessage(message) {
    var time = 3000;
    rightFootWin(message, time);
    updateIdArray=new Array();

}

//--------------右下角弹出信息---------------------
function rightFootWin(message, time) {
    var tip;
    tip = $.ligerDialog.tip({ title:'提示信息', content:message });
    setTimeout(function () {
        tip.close();
    }, time);
}


//--------------多选/单选操作后保存ID到一个数组里面------------
function updateCheckBox(id){
//    alert(id);
    if($.inArray(id,updateIdArray)=="-1" ){
        updateIdArray.push(id);
    }else{
//        alert("包www含了"+$.inArray(id,updateIdArray));
    }
}


//-----------------遍历多选类型的子选项，返回一个值------------------------
function getCheckboxArray(sysKey){
    var ind = 0;
    var chboxVal = "";
    var keyPObj =  $("#"+sysKey+"_tr");
    var sysArgJson = JSON.parse(keyPObj.children("td[name='sysArgJson']").text());
    var isMultipleChoice = sysArgJson.isMultipleChoice;
    if(isMultipleChoice=="Y"){
        $("div[name='"+sysKey+"_sysValue'] input[type='checkbox']:checked").each(function(){
            chboxVal+=$(this).val()+";";
        });
        chboxVal=chboxVal.substring(0,chboxVal.length-1);
    }else if(isMultipleChoice=="N"){
        chboxVal =  $("div[name='"+sysKey+"_sysValue'] input[type='radio']:checked").val();
    }
    return chboxVal;
}


function createDocPicWin(key) {
    var testObj = new Object();
    testObj.id = key;
    testObj.window = parent;
    testObj.doSetFileFullPath = doSetFileFullPath;
    parent.showOpenFileSystemManager(columnId, testObj);
}

function doSetFileFullPath(obj, fullPath,filedId) {
    var keys = "";
    for (i in obj) {
        keys += i + "\r\n";
    }
    if (fullPath == null || fullPath == "") {
        fullPath = "/upload/none_40.jpg"
    }
    $("#"+obj.id).attr("src",fullPath);
    $("#"+obj.id).attr("filedid",filedId);
    if($.inArray(obj.id,updateIdArray)=="-1" ){
        updateIdArray.push(obj.id);
    }else{
//        alert("包www含了"+$.inArray(obj.id,updateIdArray));
    }
};


//----------------真正 保存所有数据----------------
function saveAllData(dataSysArray){

    postData['paramStr'] = JSON.stringify(dataSysArray);
    postData["isAdd"] = "N";
    $.post("/OurHome/modules/sysargument/SysArgumentUpdate.jsp",postData,function(data){
        returnMessage(data);
    },'json');
}

//---------------------创建页面中的分类---------------------------
function createHtml(dataBusinessType){

        var nameBt= dataBusinessType
        $("#bodyCenter").append(
            '<div style="border: 1px;margin-bottom: 0px;padding: 10px;" name="businessType_'+dataBusinessType+'">'+
                '<div class="l-grid-row-cell-detail" style="border: 1px;" name="spreadLine">'+
        '<div class="l-grid-row-cell-inner" id="detail_3" ><span class="l-open"></span></div>'+
        '<div style="margin-top: -20px;margin-left: 28px;">'+nameBt+'</div>'+
        '</div>'+
        '<div  class="l-grid-row-cell" ><span></span></div>'+
        '<div style="border: 1px;padding-top: 10px;padding-left: 25px;"><form class="form-horizontal">'+
        '<table border="0px" style="width: 100%;" name="detailContent" id=""><tbody></tbody> </table></form>'+
        '</div>'+
        '</div>');
        $("div[name='businessType_"+dataBusinessType+"'] table[name='detailContent']").attr("id","businessType_"+dataBusinessType+"_table");

}