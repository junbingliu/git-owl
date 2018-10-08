ExcelApi = new JavaImporter(
  Packages.net.xinshi.isone.commons,
  Packages.java.util,
  Packages.org.json
);

/**
 * 工具类,与处理excel文件相关的方法
 * @namespace
 */
var Excel = {

  /**
   * 返回一个包含excel文件内容的javascript对象
   * @param url   excel文件的url
   * @return {*}
   * @example
   for (var j = 1; j < sheet.rows.length; j++) {
         var row = sheet.rows[j];
         var title = "" + row.cells[0].value;
         var price = row.cells[1].value;
         var hotIndex = row.cells[2].value;     //每月销售份数
         var commentsCount = row.cells[3].value; //评价数
         var goodCommentsCount = row.cells[4].value; //好评数
         var goodIndex = row.cells[5].value;    //星级
     }
   */
  parse: function (url){
    var excelString = ExcelApi.ExcelUtils.parseExcel( url );
    return JSON.parse( "" + excelString );
  },


  /**
   * 创建excel对象并保存到列表中
   * merchantId 商家ID
   * outputFile 输出文件路径
   * export_file_type 文件类型
   * recordList 记录
   * titleItems EXCEL文件表头
   */
  createExcelList: function (merchantId, outputFile, export_file_type, titleList, recordList){
    var tList = new ExcelApi.ArrayList();
    for ( var i = 0; i < titleList.length; i++ ) {
      var json = new ExcelApi.JSONObject( JSON.stringify( titleList[ i ] ) );
      tList.add( json );
    }

    var rList = new ExcelApi.ArrayList();
    for ( var i = 0; i < recordList.length; i++ ) {
      var json = new ExcelApi.JSONObject( JSON.stringify( recordList[ i ] ) );
      rList.add( json );
    }
    var excelString = ExcelApi.ExcelUtils.createExcelList( merchantId, outputFile, export_file_type, tList, rList );
    return excelString + "";
  },


  createExcel: function (rows, groupings, name){
    var jsonRows = new ExcelApi.JSONArray( JSON.stringify( rows ) );
    var jsonGroupings = new ExcelApi.JSONArray( JSON.stringify( groupings ) );
    return "" + ExcelApi.ExcelUtils.createExcel( jsonRows, jsonGroupings, name );
  },
  /**
   *
   * @param merchantId
   * @param fileType
   * @param rex
   * @returns {Array}
   */

  getExcelList4History: function (merchantId, fileType, rex){
    var count = parseInt( rex );
    if (typeof count !== 'string') {
      count = count;
    } else {
      count = -1;
    }

    var excelList = ExcelApi.ExcelUtils.getExcelList4History( merchantId, fileType, count );
    var result = [];
    for ( var i = 0; i < excelList.size(); i++ ) {
      var content = excelList.get( i );
      if (content) {
        result.push( JSON.parse( content ) );
      }
    }
    return result;
  },

  generateExcelFromTemplate:function(url,jsonData){
    var fileId = "" + ExcelApi.ExcelUtils.generateExcelFromTemplate(url,new ExcelApi.JSONObject( JSON.stringify(jsonData)));
    return fileId;
  }
};

