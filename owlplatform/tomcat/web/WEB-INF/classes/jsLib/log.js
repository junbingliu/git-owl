var LogApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.log
);

/**
 * @constructor
 * @type {Object}
 */
var LogService = {};

/**
 * 获取执行时日志列表
 * @param searchArgs
 */
LogService.getExecuteTimeLogs = function (searchArgs) {
    var jParams = $.JSONObject(searchArgs);
    var json = LogApi.ExecuteTimeLogUtil.getLogs(jParams);
    return JSON.parse(json.toString());
};

/**
 * 获取执行时日志
 * @param logId
 */
LogService.getExecuteTimeLog = function (logId) {
    var json = LogApi.IsoneModulesEngine.executeTimeLogService.getLog(logId);
    if(!json){
        return {};
    }
    return JSON.parse(json.toString());
};

/**
 * 初始化一个执行时日志对象
 * @param merchantId
 * @param userId
 * @param logType
 * @returns {*}
 */
LogService.getNewInitLog = function (merchantId, userId, logType) {
    var json = LogApi.IsoneModulesEngine.executeTimeLogService.getNewInitLog(merchantId, userId, logType);
    return JSON.parse(json.toString());
};

/**
 * 保存执行时日志在内存中
 * @param log
 * @param msg
 * @returns {*}
 */
LogService.saveLog = function (log, msg) {
    var jLog = $.JSONObject(log);
    var json = LogApi.IsoneModulesEngine.executeTimeLogService.saveLog(jLog, msg);
    if(!json){
        return null;
    }
    return JSON.parse(json.toString());
};

/**
 * 保存执行时日志到数据库
 * @param log
 * @param msg
 * @returns {*}
 */
LogService.realSaveLog = function (log, msg) {
    var jLog = $.JSONObject(log);
    var json = LogApi.IsoneModulesEngine.executeTimeLogService.realSaveLog(jLog, msg);
    if(!json){
        return null;
    }
    return JSON.parse(json.toString());
};

/**
 * 添加对象修改日志
 * @param saveType
 * @param objId
 * @param logType
 * @param log
 * @returns {*}
 */
LogService.addObjectLog = function (saveType, objId, logType, log) {
    var jLog = $.JSONObject(log);
    LogApi.ObjectLogHelper.addLog(saveType, objId, logType, jLog);
};