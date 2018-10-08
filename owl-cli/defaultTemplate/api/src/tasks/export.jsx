//#import $@projectCode:services/modelService.jsx
//#import moment.min.js
//#import excel.js


var formSpecs = @formSpecs;

function getFieldByKey(fullKey){
  var keys = fullKey.split(".");
  var curField = formSpecs;
  for(var i=0; i<keys.length; i++){
    if(curField._ft=='field'){
      if(curField.key == fullKey){
        return curField;
      }
      else{
        return null;
      }
    }
    else{
      var key = keys[i];
      var fields = curField.fields;
      curField == null;
      for(var j=0; j<fields.length; j++){
        var f = fields[j];
        if(f.origKey == key){
          curField = f;
          break;
        }
      }
      if(curField==null){
        return null;
      }
    }
  }
  return curField;
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

function getMainAndSubFields(exConfig){
  var mainFields = [];
  var subFields = [];
  if (exConfig.fields == "*") {
    tranverseFields(formSpecs,function(field,ctx){
      if (ctx.parentField && ctx.parentField._ft == 'array') {
        //nothing
      }
      else {
        mainFields.push( field );
      }
    },{})
  }
  else{
    for(var i=0; i<exConfig.fields.length; i++){
      var fieldKey = exConfig.fields[i];
      var field = getFieldByKey(fieldKey);
      if(field){
        mainFields.push(field);
      }
    }
  }

  if(exConfig && exConfig.items && exConfig.items.name){
    if(exConfig.items.itemFields=='*'){
      //找到items.name对应的field
      var f = getFieldByKey(exConfig.items.name);
      f.fields.forEach(function(spec){
        if(spec._ft=='field'){
          subFields.push(spec);
        }
      });
    }
    else{
      for(var i=0; i<exConfig.items.itemFields.length; i++){
        var itemField = exConfig.items.itemFields[i];
        var fieldKey = "";
        if(itemField.indexOf("$parent.")==0){
          fieldKey = itemField.substring(8);
          var field = getFieldByKey(fieldKey);
          if(field){
            field.isItemField = false;
            subFields.push(field);
          }
          else{
            $.log("panic!!!!-------------------------++++++++++++++" + fieldKey);
          }

        }
        else{
          fieldKey =  exConfig.items.name + "." + itemField;
          var field = getFieldByKey(fieldKey);
          if(field){
            field.isItemField = true;
            subFields.push(field);
          }
          else{
            $.log("panic!!!!-------------------------++++++++++++++" + fieldKey);
          }

        }


      }
    }
  }
  return [mainFields,subFields];
}



(function(){
    var spec = @spec;
    var q = JSON.parse(query);
    var ctx = JSON.parse(env);
    var exportKey = ctx.exportKey;

    var elasticSearchUrl = $.getEnv( "elasticSearchUrl" );

    var headers = { "Content-Type": "application/json;charset=utf-8" };
    var elasticSearchUser = $.getEnv( "elasticSearchUser" );
    var elasticSearchPass = $.getEnv( "elasticSearchPass" );
    if (elasticSearchUser && elasticSearchPass) {
      var auth = Base64.encode( elasticSearchUser + ":" + elasticSearchPass );
      var basicAuth = "Basic " + auth;
      headers[ "Authorization" ] = basicAuth;
    }
    var searchUrl = elasticSearchUrl + "/is1erp/allinone/_search";

    var sndTxt = JSON.stringify( q );
    var s = HttpUtils.postRaw( searchUrl, sndTxt, headers );
    var result = JSON.parse( s );


    var elasticSearchUrl = $.getEnv( "elasticSearchUrl" );

    var headers = { "Content-Type": "application/json;charset=utf-8" };
    var elasticSearchUser = $.getEnv( "elasticSearchUser" );
    var elasticSearchPass = $.getEnv( "elasticSearchPass" );
    if (elasticSearchUser && elasticSearchPass) {
      var auth = Base64.encode( elasticSearchUser + ":" + elasticSearchPass );
      var basicAuth = "Basic " + auth;
      headers[ "Authorization" ] = basicAuth;
    }
    var searchUrl = elasticSearchUrl + "/@projectCode/_search";

    var sndTxt = JSON.stringify( q );
    $.log("export.jsx")
    $.log(sndTxt)

    var s = HttpUtils.postRaw( searchUrl, sndTxt, headers );
    var result = JSON.parse( s );
    var total = result.hits.total;

    var taskInfo = @projectCodeService.getExportTaskInfo( taskInfoId );
    taskInfo.total = total;
    taskInfo.lastTime = new Date().getTime();
    taskInfo.processState = "processing";
    taskInfo.msg = "获取导出总数成功......";
    taskInfo.percent = "20";

  @projectCodeService.updateExportTaskInfo( taskInfoId, taskInfo );

    q.size = total;

    var sndTxt = JSON.stringify( q );
    var s = HttpUtils.postRaw( searchUrl, sndTxt, headers );
    var result = JSON.parse( s );

    var hits = result.hits.hits;
    var objs = hits.map( function (hit){
      return hit._source
    } );

    var meta = spec[ "#meta" ];

    var rows = [];
    var row = [];

    var groupings = [];

    var mainFields = [];
    var subFields = [];

    var exConfig = null;
    if (meta.export) {
      meta.export.forEach(function(config){
        if(config.key == exportKey){
          exConfig = config;
        }
      });
      if (exConfig && exConfig.fields) {
        var fields = getMainAndSubFields(exConfig);
        mainFields = fields[0];
        subFields = fields[1];

        if(mainFields.length>0){
          row.push(exConfig.mainTitleFormat);
          mainFields.forEach( function (f){
            row.push( "s"+f.fieldLabel );
          } );
          rows.push(row);
        }
        else{
          //写入子记录的title一次
          row.push(exConfig.subTitleFormat);
          subFields.forEach( function (spec){
            row.push( "s" + spec.fieldLabel ); //子记录title
          } );
          rows.push(row);
        }

        var subTitleInterval = exConfig.subTitleInterval || 9999999;
        objs.forEach( function (obj,objIdx){
          if(mainFields.length>0){
            var row = [];
            row.push(exConfig.mainRecordFormat);
            mainFields.forEach( function (f){
              if(!f.key){
                row.push('null');
              }
              else{

                var value = @projectCodeService.getValue( f.key, obj );
                $.log("getValue:" + f.key+":" +value);
                value = normalizeValue(value,f);
                row.push( value );
              }

            } );
            rows.push( row );
          }
          //写入子item的title
          if (subFields.length>0) {
            var row = [];
            var grouping = [];
            if(mainFields.length>0 && (objIdx % subTitleInterval)==0){
              //当有主记录的时候才写入子记录的Title
              row.push(exConfig.subTitleFormat);
              subFields.forEach( function (spec){
                row.push( "s" +spec.fieldLabel ); //子记录title
              } );
              rows.push( row );
              grouping[ 0 ] = rows.length - 1;
            }
            var items = obj[exConfig.items.name];
            items && items.forEach && items.forEach( function (item){
              var row = [];
              row.push(exConfig.subRecordFormat);
              subFields.forEach( function (spec){
                if(spec.isItemField){
                  var value = item[ spec.origKey ];
                  value = normalizeValue(value,spec);
                  row.push( value );
                }
                else{
                  if(spec.key){
                    var value = @projectCodeService.getValue( spec.key, obj );
                    value = normalizeValue(value,spec);
                    row.push(value);
                  }
                  else{
                    row.push("")
                  }

                }
              } );
              rows.push( row );
            } );
            if(mainFields.length>0){
              grouping[ 1 ] = rows.length - 1;
              groupings.push( grouping );
            }
          }
        } );
      }

      var taskInfo = @projectCodeService.getExportTaskInfo( taskInfoId );
      taskInfo.processState = "success";
      taskInfo.percent = 70;
      taskInfo.lastTime = new Date().getTime();
      taskInfo.msg = "获取数据记录完成";

      var fileId = Excel.createExcel( rows, groupings, "export" );
      var taskInfo = @projectCodeService.getExportTaskInfo( taskInfoId );
      taskInfo.processState = "success";
      taskInfo.percent = 100;
      taskInfo.fileId = fileId;
      taskInfo.lastTime = new Date().getTime();
      taskInfo.msg = "生成Excel文件成功";
    @projectCodeService.updateExportTaskInfo(taskInfoId, taskInfo );
    }
  }
)();











