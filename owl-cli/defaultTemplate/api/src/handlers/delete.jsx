//#import Util.js
//#import login.js
//#import session.js
//#import HttpUtil.js
//#import $@projectCode:services/modelService.jsx


var spec = @spec;

var backendUserId = LoginService.getBackEndLoginUserId();
var visitType = SessionService.getSessionValue( "visitType", request );
if (visitType) {
  visitType = JSON.parse( visitType );
}

var shopId = visitType.shop;
var warehouseId = visitType.warehouse;
m=shopId;
//为了显示数据，临时加上这个判断，现在很多数据都搜索不出来
if(!m){
  m = SessionService.getSessionValue("_loginMerId",request);
}

//判断是subplatform,还是shop,还是platform
var params = JSON.parse($body);
var id = params.id;
var msg = '';
@projectCodeService.del(id);
var ret = {
    state: msg ? 'err' : 'ok',
    msg: msg
}
out.print(JSON.stringify(ret));