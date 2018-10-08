/** object  
*  example : sortTableT.sort('sortTable',0,'Number')  
*   
**/ 
var sortTableT = new SortTableTool(); 
/** function  
*  SortTableTool  
*/ 
function SortTableTool(){  
/** is sort all tBodies */  
this.isSortAlltBodies = false;     
/** is first descending sort by sortColumn */  
this.first_descending = false; }; 
/** SortTableTool.sort  
*  tableId        : table.id  
*  sortColumn : cell's index of row  
*  nodeType    :  {'Number' ,'String' ,'Date' ,'NoCaseString'}  
*  _first_descending : is first descending ,descending is default false.  
*/ 
SortTableTool.prototype.sort = function(tableId, sortColumn ,nodeType ,_first_descending) {     
var table = document.getElementById(tableId);
if(table!=null){
var _tBodies_length = this.isSortAlltBodies ? table.tBodies.length : 1;          
var rowArray = new Array();     
var rowIndex = 0;     
for(var t=0 ; t< _tBodies_length ; t++){   
var tableBody = table.tBodies[t];   
var tableRows = tableBody.rows;   
for (var i = 0; i < tableRows.length; i++) {          
rowArray[rowIndex++] = tableRows[i];      
}  
}  
if( !isNULL(_first_descending) && ( _first_descending == true || _first_descending == false)){   
this.first_descending = _first_descending;  
}else{   
this.first_descending = false;  
}     
if (table.sortColumn == sortColumn) {          
rowArray.reverse();     
} else {         
rowArray.sort(generateCompareTR(sortColumn, nodeType));   
if(this.first_descending){    
rowArray.reverse();   
}     
}   
var tbodyFragment = document.createDocumentFragment();     
for (var i = 0; i < rowArray.length; i++) {         
tbodyFragment.appendChild(rowArray[i]);     
} 
tableBody.appendChild(tbodyFragment);     
table.sortColumn = sortColumn;
}
}
/**  
* generateCompareTR  
* @return   
*/ 
var generateCompareTR = function(sortColumn, nodeType) {     
return function compareTR(trLeft, trRight) {      
var left_firstChild = trLeft.cells[sortColumn].firstChild;      
var right_firstChild = trRight.cells[sortColumn].firstChild;         
var leftValue = convertData(left_firstChild == null ? "" :left_firstChild.nodeValue, nodeType);         
var rightValue = convertData(right_firstChild == null ? "" :right_firstChild.nodeValue, nodeType);         
if (leftValue < rightValue) {             
return -1;         
}else if (leftValue > rightValue) {          
return 1;         
}else{          
return 0;         
}     
}; 
}  

/**function : convertData  
*  _value     : string value  
*  _dataType : {'Number' ,'String' ,'Date' ,'NoCaseString'}  
* @return  
*/ 
var convertData = function(_value, _dataType) {  
var value = isNULL(_value) ? "" :  _value;  
var dataType = isNULL(_dataType) ? null : _dataType.toLowerCase();  
var v_result = null;     
switch (dataType) {       
case "number":        
v_result = new Number(value.trim().replace(/,/g,''));        
return isNaN(v_result) ? null : v_result ;        
case "string":        
return value.toString();    
case "nocasestring":        
return value.toString().toLowerCase();       
case "date":        
v_result = new Date(Date.parse(value.trim().trimNBSP().replace(/-/g,'/')));        
return isNaN(v_result) ? null : v_result; 
default:        
return value.toString();     
}   
} 
/**  
* isNULL()  
* @return true or false  
*/ 
var isNULL=function(v){     
return v == null || typeof(v) == 'undefined'; 
} 
/**  
* String.prototype.trim()  
* @return  
*/ 
String.prototype.trim=function(){     
return this.replace(/(^\s*)|(\s*$)/g, ''); 
} 
String.prototype.ltrim=function(){     
return this.replace(/(^\s*)/g,''); 
} 
String.prototype.rtrim=function(){     
return this.replace(/(\s*$)/g,''); 
} 
/**  
* String.prototype.trimNBSP()  
* @return  
*/ 
String.prototype.trimNBSP=function(){     
return this.replace(/^[\s\u3000\xA0]+|[\s\u3000\xA0]+$/g, ''); 
} 
String.prototype.ltrimNBSP=function(){     
return this.replace(/^[\s\u3000\xA0]+/g,''); 
} 
String.prototype.rtrimNBSP=function(){     
return this.replace(/[\s\u3000\xA0]+$/g,''); 
} 
//------------------ over -------------------------