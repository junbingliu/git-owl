//#import Util.js
//#import order.js
var RealPayServiceApi = new JavaImporter(
    Packages.net.xinshi.isone.modules,
    Packages.org.json,
    Packages.net.xinshi.isone.modules.payment.bean,
    net.xinshi.isone.modules.payment.RealPayRecordUtil
);

var RealPayRecordService = {
    //String addRealPayRecord(RealPayRecord rec) throws Exception;
    addRealPayRecord : function(rec){
        var javaRec = $.getBean("net.xinshi.isone.modules.payment.bean.RealPayRecord",rec);
        var id = "" + RealPayServiceApi.IsoneModulesEngine.realPayRecordService.addRealPayRecord(javaRec);
        var outerId = "" + javaRec.getOuterId();
        rec.outerId = outerId;
        return outerId;
    },
    //void updateRealPayRecord(String id,RealPayRecord rec) throws Exception
    updateRealPayRecord:function(id,rec){
        var javaRec = $.getBean("net.xinshi.isone.modules.payment.bean.RealPayRecord",rec);
        RealPayServiceApi.IsoneModulesEngine.realPayRecordService.updateRealPayRecord(id,javaRec);
    },

    //如果要获得所有的支付记录，merchantId可以传入"_all"
    //List<RealPayRecord> getRecords(String merchantId,int from,int number) throws Exception;
    getRecords : function(merchantId,from,number){
        var javaList =  RealPayServiceApi.IsoneModulesEngine.realPayRecordService.getRecords(merchantId,from,number);
        return $.java2Javascript(javaList);
    },
    //long getNumber(String merchantId) throws Exception;
    getNumber:function(merchantId){
        return RealPayServiceApi.IsoneModulesEngine.realPayRecordService.getNumber(merchantId);
    },

    //List<RealPayRecord> getRecordsByPayInterface(String merchantId,String payInterfaceId,int from,int number) throws Exception;
    getRecordsByPayInterface : function(merchantId,payInterfaceId,from,number){
        var javaList =  RealPayServiceApi.IsoneModulesEngine.realPayRecordService.getRecordsByPayInterface(merchantId,payInterfaceId,from,number);
        return $.java2Javascript(javaList);
    },

    //long getNumberByPayInterface(String merchantId,String payInterfaceId) throws Exception;
    getNumberByPayInterface:function(merchantId,payInterfaceId){
        return RealPayServiceApi.IsoneModulesEngine.realPayRecordService.getNumberByPayInterface(merchantId,payInterfaceId);
    },
    getPayRec :function(id){
        var javaRec = RealPayServiceApi.IsoneModulesEngine.realPayRecordService.get(id);
        return $.java2Javascript(javaRec);
    },
    getPayRecByOuterId :function(outerId){
        var id = OrderService.getOrderIdByOrderPayRecId(outerId);
        var javaRec = RealPayServiceApi.IsoneModulesEngine.realPayRecordService.get(id);
        return $.java2Javascript(javaRec);
    },

    getPaidRecsCount: function(payInterfaceId,dateStr_yyMMdd){
        return RealPayServiceApi.IsoneModulesEngine.realPayRecordService.getPaidRecsCount(payInterfaceId,dateStr_yyMMdd);
    },
    getPaidRecs:function(payInterfaceId,dateStr_yyMMdd,from,number){
        var javaList = RealPayServiceApi.IsoneModulesEngine.realPayRecordService.getPaidRecs(payInterfaceId,dateStr_yyMMdd,from,number);
        return $.java2Javascript(javaList);
    },
    fireChange:function(realPayRecord){
        var javaRec = $.getBean("net.xinshi.isone.modules.payment.bean.RealPayRecord",rec);
        var ctx = {
            id:realPayRecord.id,
            realPayRec:realPayRecord
        };
        EventBusService.fire("realPayChanged",ctx);
    },
    /**
     * 搜索支付记录
     * @param searchArgs 搜索参数
     * @param start 从多少开始取
     * @param limit 取多少条 不传默认取10条,-1表示取所有
     */
    searchRealPayRec:function(searchArgs, start, limit){
        if(!searchArgs){
            return null;
        }
        var jSearchArgs = $.JSONObject(searchArgs);
        var json = RealPayServiceApi.RealPayRecordUtil.searchRealPayRec(jSearchArgs, start, limit);
        return JSON.parse(json + "");
    }
};

