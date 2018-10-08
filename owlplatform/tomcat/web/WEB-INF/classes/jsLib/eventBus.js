//#import Util.js
//#import ps20.js

var EventBusApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.commons,
    Packages.net.xinshi.isone.modules.order.ordereventbus.bean,
    Packages.net.xinshi.isone.modules.order.ordereventbus.impl,
    Packages.java.util
);

var EventBusService = {
    registerEventHandler : function(merchantId,handlerId,eventName,appId,pageId){
        var registry = {
            merchantId:merchantId,
            handlerId:handlerId,
            eventName:eventName,
            appId:appId,
            pageId:pageId,
            type:'javascript'
        }
        var bean = $.getBean("net.xinshi.isone.modules.order.ordereventbus.bean.EventHandlerRegistryBean",registry);
        EventBusApi.AdvancedEventBus.registerExtendedHandler(merchantId,eventName,handlerId,bean);
    },

    fire:function(eventName,ctx){
        var ctxMap = new EventBusApi.HashMap();
        for(k in ctx){
            ctxMap.put(k,ctx[k]);
        }
        EventBusApi.AdvancedEventBus.fire(eventName,ctxMap);
        var state = "" + ctxMap.get("state");
        if(state == "error"){
            throw "" + ctxMap.get("msg");
        }
    },

    unRegisterExtendedHandler:function(merchantId,eventName,handlerId){
        EventBusApi.AdvancedEventBus.unRegisterExtendedHandler(merchantId,eventName,handlerId);
    },
    getEventHandlers:function(merchantId){
        var handlers = EventBusApi.AdvancedEventBus.getEventHandlers(merchantId);
        return $.java2Javascript(handlers);
    },
    logEvent:function(eventName,appId,pageId,merchantId,ctx){
        assertSystem("mall");
        var entries = ctx.entrySet();
        var it = entries.iterator();
        var params = {};
        while(it.hasNext()){
            var entry = it.next();
            var k = "" + entry.getKey().toString();
            try {
                var v = entry.getValue();
                v = "" + entry.getValue().toString();
            } catch (e) {
                v = "";
            }
            params[k] = v;
        }
       
        var eventId = "systemEvt_" + getId("systemEvents");
        var now = (new Date()).getTime();
        var evt = {
            id:eventId,
            eventName:eventName,
            appId:appId,
            pageId:pageId,
            merchantId:merchantId,
            params:params,
            timestamp:now
        }
        saveObject(eventId,evt);
        var key = getRevertComparableString(now,13);
        addToList("systemEvtLogs",key,eventId);
    },
    getEvents:function(from,limit){
        return getObjects("systemEvtLogs",from,limit);
    },
    getEventsCount : function(){
        return getListSize("systemEvtLogs");
    }

};