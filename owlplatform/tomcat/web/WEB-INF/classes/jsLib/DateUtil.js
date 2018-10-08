var DateUtilApi = new JavaImporter(
    Packages.net.xinshi.isone.commons
);
/**
 * @namespace
 * @type {Object}
 */
var DateUtil = {
    /**
     *  format格式：yyyy-MM-dd
     * @param dateTime
     */
    getShortDate: function (dateTime) {
        return "" + DateUtilApi.DateUtil.getShortDate(dateTime);
    },

    /**
     * format格式：yyyy-MM-dd HH:mm:ss
     * @param dateTime
     */
    getLongDate: function (dateTime) {
        return "" + DateUtilApi.DateUtil.getLongDateTime(dateTime);
    },
    /**
     * format格式：1422536322373
     * @param dateTime
     */
    getLongTime: function (dateTime) {
        return "" + DateUtilApi.DateUtil.getLongTime(dateTime);
    },
    /**
     * 根据format格式返回longTime
     * format格式：1422536322373
     * @param dateTime
     * @param format ：格式为yyyy-MM-dd HH:mm:ss 或者 yyyyMMddHHmmss 等
     */
    getLongTimeByFormat: function (dateTime, format) {
        return "" + DateUtilApi.DateUtil.getLongTime(dateTime, format);
    },
    /**
     * 获取系统当前系统
     */
    getNowTime: function () {
        return "" + DateUtilApi.DateUtil.getNowTime();
    },
    /**
     * 时间比较
     * @param long dateTime
     */
    dateCompare: function (dateTime) {
        var currDate = DateUtil.getNowTime();
        var num = currDate - dateTime;
        if (num > 0) {
            return "0";
        } else if (num == 0) {
            return "2";
        } else {
            return "1";
        }
    },
    getStringDate: function (t, format) {
        return "" + DateUtilApi.DateUtil.getStringDate(t, format);
    },
    /**
     * 根据一个时间点（长整型）获取当月的开始与结束时间
     * @param paramTime 一个长整型的时间点
     * @returns {string} 2016-03-01 00:00:00&&2016-03-31 23:59:59
     */
    getBeginEndDateByTime: function (paramTime) {
        return "" + DateUtilApi.DateUtil.getBeginEndDateByTime(paramTime);
    }

};
