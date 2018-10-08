var pagination = function(totalPages,currentPage,pageNumbers){
    var uri = new URI(window.location.href);
    var content = "<div class='pagination'><ul>";
    var from = 1;
    var to;
    from = currentPage - pageNumbers / 2;
    if(from < 1){
        from = 1;
    }
    if(from + pageNumbers - 1 > totalPages){
        to = totalPages;
    }
    else{
        to = from + pageNumbers - 1;
    }
    if(currentPage!=1){
        uri.removeQuery("p").addQuery({p:currentPage-1});
        content = content + "<li><a href='" + uri +"'><<</a></li>"
    }
    else{
        content = content + "<li class='disabled'><a href='#'><<</a>"
    }
    for(var i=from; i<=to; i++){
        uri.removeQuery("p").addQuery({p:i});
        if(i==currentPage){
            content = content + "<li class='active'><a href='" + uri +"'>" + i+ "</a></li>"
        }
        else{
            content = content + "<li><a href='" + uri +"'>" + i+ "</a></li>"
        }
    }
    if(currentPage!=totalPages){
        uri.removeQuery("p").addQuery({p:currentPage+1});
        content = content + "<li><a href='" + uri +"'> >> </a></li>"
    }
    else{
        content = content + "<li class='disabled'><a href='#'> >> </a></li>"
    }
    content += "</ul></div>"
    return content;
}

