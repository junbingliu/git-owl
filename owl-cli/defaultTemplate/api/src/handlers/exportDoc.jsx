//#import Util.js
//#import login.js
//#import session.js
//#import user.js
//#import $@projectCode:services/modelService.jsx

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

var user = UserService.getUser( backendUserId );

var params = JSON.parse($body);
var id = params.id;


var now = new Date().getTime();
var u = {
  id: user.id,
  realName: user.realName,
  nickName: user.nickName
}

var visitType = SessionService.getSessionValue( "visitType", request );
if (visitType) {
  visitType = JSON.parse( visitType );
}

var shopId = visitType.shop;
var warehouseId = visitType.warehouse;

var env = {
  now: new Date().getTime(),
  loginId: backendUserId,
  loginUser: u,
  shopId:shopId,
  warehouseId:warehouseId
}

var taskInfoId = @projectCodeService.addDocExportTask(id,env);

var ret = {
  state:'ok',
  taskInfoId : taskInfoId
}

out.print(JSON.stringify(ret));
