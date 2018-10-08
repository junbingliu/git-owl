//#import Util.js

var repository_version = "@{repository.version}"
var buildTime = "@{buildTime}"

var pageData = {
    repository_version: repository_version,
    buildTime: buildTime,
}

var html = $.runArtTemplate(appId,appMd5,"about.html",pageData);
out.print(html);