//#import Util.js
//#import login.js
//#import user.js
//#import base64.js
//#import HttpUtil.js
//#import session.js
//#import $@projectCode:services/modelService.jsx

var backendUserId = LoginService.getBackEndLoginUserId();
var m = $.params.m;
if (!m) {
  m = SessionService.getSessionValue( "_loginMerId", request );
}

var user = UserService.getUser( backendUserId );

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

$.log("env====" + JSON.stringify(env));

try {
  var modelObject = JSON.parse( $body );

  //判断是add还是update
  var id = modelObject.id;

  if (!id) {
    //adding
    modelObject.m = m;
    var newdata = @projectCodeService.add( modelObject,env );
  }
  else {
    var newdata = @projectCodeService.update( modelObject,env);
  }

  var ret = {
    state: 'ok',
    object: newdata
  };
  out.print( JSON.stringify( ret ) );
} catch ( e ) {
  var ret = {
    state: 'err',
    msg: (e.msg || e) + ""
  };
  out.print( JSON.stringify( ret ) );
}




