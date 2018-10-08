(function(template){
    template.helper('importUrl',function(url){
        var html=$.importUrl(url);
        return html+"";

    });
    template.helper('inc',function(url){
        var html=$.inc(url);
        return html+"";
    });

})(template);