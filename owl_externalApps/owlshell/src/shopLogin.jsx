//#import session.js
//#import doT.min.js
//#import pigeon.js
//#import Util.js

var template = $.getProgram(appMd5, "pages/login/shopLogin.jsxp");
var sessionId = request.getSession().getId();
SessionService.addSessionValue("backendLoginSessionId", sessionId + "", request, response);
var key = sessionId.substring(0, 16);
var iv = sessionId.substring(sessionId.length() - 16);
var pageData = {"key": key, "iv": iv, "appId": appId};
var pageFn = doT.template(template);
pigeon.getObject()
out.print(pageFn(pageData));
