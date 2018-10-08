/**
 * Created by zxy on 13-12-8.
 */
//#import ps20.js
/**
 * @namespace
 * @type {{}}
 */
SysInfo = {}
/**
 * 返回系统是哪种？平台版还是单机版
 * @returns {*}
 */
SysInfo.getSysType =  function(){
   return ps20.getContent("_sysType_");
};
