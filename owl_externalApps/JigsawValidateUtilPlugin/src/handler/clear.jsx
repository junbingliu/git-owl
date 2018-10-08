//#import Util.js
//#import login.js
//#import file.js
//#import base64.js
//#import $JigsawValidateUtilPlugin:services/GlobalSysArgsService.jsx

var result={
    code:"",
    msg:""
}
try {
  GlobalSysArgsService.saveArgs({jigsawBgImages :[]});
  result.code = "0";
  result.msg = "ok";
  out.print(JSON.stringify(result))
}catch (e){
  result.code = "1";
  result.msg = e+"";
  out.print(JSON.stringify(result))
}


