var SysArgumentApi = new JavaImporter(
    Packages.net.xinshi.isone.modules.sysargument,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.functions.sysargument,
    Packages.net.xinshi.isone.functions,
    Packages.org.json
);

/**
 *  处理系統參數的函数
 * @type {{getSysArgumentStringValue: getSysArgumentStringValue}}
 */
var SysArgumentService = {

    /**
     * 获得一个系统参数
     * @param merchantId
     * @param columnId
     * @param key
     * @returns {*}
     */
    getSysArgumentStringValue: function (merchantId, columnId, key) {
        return "" + SysArgumentApi.SysArgumentUtil.getSysArgumentStringValue(merchantId, columnId, key);
    },

    setSysArgumentStringValue:function(merchantId,columnId,key,value){
        SysArgumentApi.SysArgumentUtil.setSystemArgumentStringValue(merchantId, columnId, key,value);
    },

    getSysArgumentBooleanValue: function (merchantId, columnId, key) {
        return SysArgumentApi.SysArgumentUtil.getSysArgumentBooleanValue(merchantId, columnId, key);
    },

    setSysArgumentBooleanValue:function(merchantId,columnId,key,value){
        SysArgumentApi.SysArgumentUtil.setSystemArgumentBooleanValue(merchantId, columnId, key,value);
    },

    getAllSysArgument:function(merchantId,columnId){
        var json = SysArgumentApi.SysArgumentFunction.getAllSysArgument(merchantId, columnId);
        if(json||json!=null){
            return JSON.parse(json.toString());
        }
    }
};