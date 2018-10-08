$(document).ready(function () {});
//choice set  template
function setTemplateChoice(templateName, templateId, num) {
    var merchantId = $("#merchantId").val();
    var columnId = $("#columnId").val();
//    alert(templateId+"|"+num+"|c="+columnId+"|m="+merchantId);
    if (confirm('您应用的模版是：' + templateName + '？')) {
        $.ajax({
            type:"post",
            url:"SetPrintTemplate.jsp",
            data:"merchantId=" + merchantId + "&columnId=" + columnId + "&templateId=" + templateId,
            cache:false,
            error:function () {
                alert("系统操作异常，请联系管理员！");
            },
            success:function (data) {
                var jData = JSON.parse(data);
                if (jData.state == 'ok' && jData != "") {
                    parent.showAlert("<div style='color: #0000ff'>" + jData.msg + "</div>");
                    location.reload(true);
                } else {
                    alert(jData.msg);
                }
            }
        });
    }
}
