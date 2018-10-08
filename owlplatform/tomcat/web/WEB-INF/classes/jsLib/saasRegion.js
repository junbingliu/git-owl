//#import Util.js
var SaasRegionUtil = {};
SaasRegionUtil.api = new JavaImporter(
    Packages.net.xinshi.isone.commons,
    Packages.org.json,
    Packages.java.lang
);

var SaasRegionService = {
    getRegionEx:function(url,regionId){
        var postData = {regionId:regionId,action:'getRegion'};
        var jData = $.toJavaJSONObject(postData);
        var ret = SaasRegionUtil.api.HttpUtil.post(url,jData);
        var retObj =  JSON.parse(ret);
        if(retObj.state=='ok'){
            return retObj.region;
        }
        else{
            throw retObj.msg;
        }
    },
    getRegion:function(regionId){
       var url = SaasRegionService.getCurrentRegionUrl();
       return SaasRegionService.getRegionEx(url,regionId);
    },
    getSubRegionsEx:function(url,regionId){
        var postData = {regionId:regionId,action:'getSubRegions'};
        var jData = $.toJavaJSONObject(postData);
        var ret = SaasRegionUtil.api.HttpUtil.post(url,jData);
        if(ret&&ret!=""){
            var retObj = JSON.parse(ret);
            if(retObj.state=='ok'){
                return retObj.children;
            }
            else{
                throw retObj.msg;
            }
        }else{
            return null;
        }
    },
    getSubRegion:function(regionId){
        var url = SaasRegionService.getCurrentRegionUrl();
        return SaasRegionService.getSubRegionsEx(url,regionId);
    },
    getRootRegionEx:function(url){
        var postData = {action:'getRootRegion'};
        var jData = $.toJavaJSONObject(postData);
        var ret = SaasRegionUtil.api.HttpUtil.post(url,jData);
        var retObj =  JSON.parse(ret);
        if(retObj.state=='ok'){
            return retObj.region;
        }
        else{
            throw retObj.msg;
        }
    },
    getRootRegion:function(){
        var url = SaasRegionService.getCurrentRegionUrl();
        return SaasRegionService.getRootRegionEx(url);
    },
    getFullPathObjectsEx:function(url,regionId){
        var postData = {regionId:regionId,action:'getFullPathObjects'};
        var jData = $.toJavaJSONObject(postData);
        var ret = SaasRegionUtil.api.HttpUtil.post(url,jData);
        if(ret){
            var retObj =  JSON.parse(ret);
            if(retObj&&retObj.state=='ok'){
                return retObj.regions;
            }
            else{
                throw retObj.msg;
            }
        }

    },
    getFullPathObjects:function(regionId){
        var url = SaasRegionService.getCurrentRegionUrl();
        return SaasRegionService.getFullPathObjectsEx(url,regionId);
    },
    getFullPathStringEx:function(url,regionId){
        var postData = {regionId:regionId,action:'getFullPathString'};
        var jData = $.toJavaJSONObject(postData);
        var ret = SaasRegionUtil.api.HttpUtil.post(url,jData);
        var retObj =  JSON.parse(ret);
        if(retObj.state=='ok'){
            return retObj.regions;
        }
        else{
            throw retObj.msg;
        }
    },
    getFullPathString:function(regionId){
        var url = SaasRegionService.getCurrentRegionUrl();
        return SaasRegionService.getFullPathStringEx(url,regionId);
    },
    setCurrentRegionUrl:function(url){
        ps20.saveContent("saasRegionUrl",url);
    },
    getCurrentRegionUrl:function(){
        var content = "" +ps20.getContent("saasRegionUrl");
        if(content!=null){
           if(content.indexOf("http://")!=0 && content.indexOf("https://")!=0){
               var domain = "http://" + request.getHeader("HOST");
               if(content.indexOf("/")!=0){
                   content = "/" + content;
               }
               return domain + content;
           }
            else{
               return content;
           }
        }
        return null;
    }
};