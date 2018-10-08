var DssApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.commons
);

var DssService = {
    runDQL : function(dql,merchantId,from,num){
        var saasId = $.getSaasId();
        if(!saasId){
            saasId="";
        }
//        saasId="";
        var result = DssApi.DssUtil.runDssQL(saasId,merchantId,dql,from,num);
        return JSON.parse(result);
    },
    search: function(coreName,args){
        var  map = new InfoscapeUtil.api.HashMap();
        for(var k in args){
            var v = args[k];
            map.put(""+k , ""+v);
        }
        return DssApi.DssUtil.search(coreName,map);
    },
    getUserAgent : function(request){
        var userAgent = request.getHeader("User-Agent");
        var agent = DssApi.DssUtil.parse(userAgent);
        var agentInfo = {
            os:""+agent.getOperatingSystem().getFamilyName(),
            agentType:"" + agent.getTypeName(),
            agentFamilyName:"" + agent.getFamily().getName(),
            majorVersion : "" + agent.getVersionNumber().getMajor(),
            deviceCategory: "" + agent.getDeviceCategory().getName()
        }
        return agentInfo;
    }
};