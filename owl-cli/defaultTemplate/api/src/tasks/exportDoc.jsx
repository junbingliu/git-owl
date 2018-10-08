//#import $@projectCode:services/modelService.jsx
//#import moment.min.js
//#import excel.js

var formSpecs = @formSpecs;

function tranverseFields(formSpec, callback, ctx){
  formSpec.fields.forEach( function(field){
    if (field[ '_ft' ] == 'field') {
      callback( field, ctx );
    }
    else if (field[ '_ft' ] == 'subform') {
      var context = { parentField: field }
      tranverseFields( field, callback, context );
    }
    else if (field[ '_ft' ] == 'array') {
      var context = { parentField: field }
      tranverseFields( field, callback, context )
    }
  } );
}

function normalizeValue(value,spec){
  if(value == null){
    return null;
  }
  switch (spec.fieldType){
    case 'string':
      return 's'+value;
    case 'number':
      return 'n' + value;
    case 'date':
      return 'd'+ moment(value).toDate().getTime();
    case 'choice':
      for(var i=0; i<spec.options.length; i++){
        var option = spec.options[i];
        if(option[0]==value){
          return 's'+option[1];
        }
      }
      return 's'+value;
    default:
      return "s"+value;
  }
}

function getExportDoc(obj){
  tranverseFields(formSpecs,function(f,ctx){
    if (ctx.parentField && ctx.parentField._ft == 'array') {
      var items = @projectCodeService.getValue( ctx.parentField.key, obj )
      if(items){
        for(var i=0; i<items.length; i++){
          var item = items[i];
          var value = item[f.origKey];
          value = normalizeValue(value,f);
          item[f.origKey] = value;
        }
      }
    }
    else{
      var value = @projectCodeService.getValue( f.key, obj );
      value = normalizeValue(value,f);
      @projectCodeService.setValue(f.key,value,obj);
    }
  },{});
  return obj;
}


(function(){
  var doc = @projectCodeService.get(id);
  var exportDoc = getExportDoc(doc);
  var templateExcelUrl = "@{@projectCode.xlsx}@";
  var  fileId = Excel.generateExcelFromTemplate( templateExcelUrl, exportDoc );

  $.log("exportDoc Success, fileId=" + fileId  + ",taskInfoId=" + taskInfoId);
  var  taskInfo = @projectCodeService.getExportTaskInfo( taskInfoId );
  taskInfo.processState = "success";
  taskInfo.percent = 100;
  taskInfo.fileId = fileId;
  taskInfo.total = 1;
  taskInfo.lastTime = new Date().getTime();
  taskInfo.msg = "生成Excel文件成功";
  @projectCodeService.updateExportTaskInfo(taskInfoId, taskInfo );
  $.log("update taskInfo Success, fileId=" + fileId  + ",taskInfoId=" + taskInfoId);
})();

