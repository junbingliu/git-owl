(function(template){
    template.helper('importUrl',function(url){
        var html=$.importUrl(url);
        return html+"";
    });

    template.helper('log',function(str){
        var html=$.log(str);
        return str+"";

    });

    template.helper('inc',function(url){
        var html=$.inc(url);
        return html+"";
    });

    template.helper('stringify' , function(o){
        return JSON.stringify(o);
    });

    template.helper('getData' , function(dataId){
        return pageData[dataId];
    });

})(template);