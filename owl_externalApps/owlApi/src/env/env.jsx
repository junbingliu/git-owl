//#import Util.js
//#import login.js
//#import user.js

var backendUserId = LoginService.getBackEndLoginUserId();
var user = UserService.getUser(backendUserId);

var now = new Date().getTime();
var u = {
  id:user.id,
  realName:user.realName,
  nickName:user.nickName
}

var ret = {
  state:'ok',
  env:{loginUser:u,now:now}
}
out.print(JSON.stringify(ret));