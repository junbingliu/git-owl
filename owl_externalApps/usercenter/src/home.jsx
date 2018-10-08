//#import Util.js
//#import session.js
//#import $owl_shop:services/modelService.jsx

var _loginUserId =SessionService.getSessionValue("_loginUserId", request);
var pageData = owl_shopService.search('0',{ownerUserId:_loginUserId},"*",0,100,null);
$.log(JSON.stringify(pageData));
var html = $.runArtTemplate(appId,appMd5, "home.html",pageData);
out.print(html);