//#import Util.js
//#import file.js
//#import $@projectCode:services/modelService.jsx


//判断是subplatform,还是shop,还是platform
var params = JSON.parse($body);
var taskInfoId = params.taskInfoId;

var taskInfo = @projectCodeService.getExportTaskInfo(taskInfoId);
if(taskInfo.fileId){
  var downloadUrl = FileService.getFullPath(taskInfo.fileId);
  taskInfo.downloadUrl = downloadUrl;
}

var ret = {
  state:"ok",
  taskInfo:taskInfo
}

out.print(JSON.stringify(ret));