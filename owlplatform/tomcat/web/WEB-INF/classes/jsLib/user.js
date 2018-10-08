var UserApi = new JavaImporter(
  Packages.net.xinshi.isone.modules,
  Packages.net.xinshi.isone.modules.user,
  Packages.net.xinshi.isone.functions.user,
  Packages.net.xinshi.isone.commons,
  Packages.net.xinshi.isone.lucene,
  Packages.net.xinshi.isone.lucene.search.user,
  Packages.net.xinshi.isone.lucene.search,
  Packages.net.xinshi.isone.functions.account,
  Packages.net.xinshi.isone.modules.account,
  Packages.net.xinshi.isone.modules.order,
  Packages.net.xinshi.isone.base,
  Packages.java.lang,
  Packages.java.util,
  Packages.org.json,
  Packages.net.xinshi.isone.modules.user.tools
);

//#import column.js

/**
 * 用户相关api
 * @namespace
 * @type {{getUserTradeInfo: getUserTradeInfo, saveUserTradeInfo: saveUserTradeInfo, getCountOfUserLevel: getCountOfUserLevel, deleteUserLevel: deleteUserLevel, getUserLevel: getUserLevel, saveUserLevel: saveUserLevel, getUser: getUser, getUserByKey: getUserByKey, getUserGroups: getUserGroups, getAccountType: getAccountType}}
 */
var UserService = {
  /**
   * 获得某个用户对交易相关的信息的选择，例如支付方式等,{selectedPaymentId:"xxxx"}
   * @param userId
   * @return {*}
   */
  getUserTradeInfo: function (userId){
    var jTradeInfo = UserApi.MemberFunction.getTradeInfoByUserId( userId );
    if (!jTradeInfo) return {};
    return JSON.parse( jTradeInfo.toString() );
  },
  /**
   * 设置用户的交易相关信息
   * @param userId
   * @param propertyName
   * @param propertyValue
   */
  saveUserTradeInfo: function (userId, propertyName, propertyValue){
    UserApi.MemberFunction.saveTradeInfo( userId, propertyName, propertyValue );
  },

  /**
   * 返回会员等级下的会员数
   * @param userLevelId
   * @returns {*}
   */
  getCountOfUserLevel: function (userLevelId){
    var userSearchArgs = new UserApi.UserSearchArgs();
    userSearchArgs.setMemberGroup( userLevelId );
    userSearchArgs.setFetchCount( 0 );
    userSearchArgs.setFromPath( 0 );
    userSearchArgs.setSearchType( UserApi.SearchTypes.USER );
    var searchResult = UserApi.IsoneFulltextSearchEngine.searchServices.search( userSearchArgs );
    return searchResult.getTotal() + 0;

  },
  /**
   * 删除用户等级
   * @param userLevelId
   * @returns {boolean}
   */
  deleteUserLevel: function (userLevelId){
    //如果有用户在用户等级里，则不能删除
    var count = UserService.getCountOfUserLevel( userLevelId );
    if (count > 0) {
      throw new Error( "会员等级下已经有用户，不能删除。" );
    }
    //如果有下级用户等级，则不能删除
    if (ColumnService.hasChildren( userLevelId )) {
      throw new Error( "会员等级下还有其他用户等级，不能删除。" );
    }
    //真正删除
    ColumnService.deleteColumn( userLevelId );

    return true;
  },
  /**
   * 获取会员等级
   * @param userLevelId
   * @returns {*}
   */
  getUserLevel: function (userLevelId){
    var userLevel = ColumnService.getColumn( userLevelId );
    return { id: userLevel.id, name: userLevel.name }
  },
  /**
   * 保存会员等级
   * @param userLevel
   */
  saveUserLevel: function (userLevel){
    ColumnService.saveColumn( userLevel );
  },
  /**
   * 获取用户
   * @param userId
   * @returns {*}
   */
  getUser: function (userId){
    var jUser = UserApi.IsoneModulesEngine.userService.getUser( userId );
    if (!jUser) {
      return null;
    }
    return JSON.parse( jUser.toString() );
  },

  getUsers: function (userIds){
    var ids = new UserApi.ArrayList();
    userIds.forEach( function (id){
      ids.add( id )
    } );
    var users = UserApi.IsoneModulesEngine.userService.getListDataByIds( ids, true );
    return JSON.parse( users.toString() );
  },
  /**
   * 修改用户
   * @param user
   * @param userId
   */
  updateUser: function (user, userId){
    var jUser = new UserApi.JSONObject( JSON.stringify( user ) );
    UserApi.IsoneModulesEngine.memberService.updateUser( jUser, userId );
  },
  /**
   * 获取会员等级名称
   * @param user
   * @param groupType
   * @returns {*}
   * deprecated
   */
  getMemberGroupName: function (user, groupType){
    var userObj = new UserApi.JSONObject( JSON.stringify( user ) );
    var groupName = UserApi.MemberGradeUtil.getMemberGroupName( userObj, groupType );
    if (!groupName) {
      return null;
    }
    return groupName + "";
  },
  /**
   * key 可以是email,手机手机号等等
   * @param key
   * @returns {*}
   */
  getUserByKey: function (key){
    var jUser = UserApi.IsoneModulesEngine.userService.getUserByKey( key );
    if (!jUser) {
      return null;
    }
    return JSON.parse( jUser.toString() );
  },

  getUserByOpenIdAndType: function (openId, type){
    var userId = UserApi.IsoneModulesEngine.memberService.judgeMemberField( openId, type );
    if (!userId) {
      return null;
    }
    return UserService.getUser( userId );
  },


  getUserGroups: function (userId){
    var user = UserService.getUser( userId );
    var groups = {};
    if (user) {
      var memberGroups = user.memberGroups;
      if (memberGroups) {
        for ( k in memberGroups ) {
          var memberGroup = memberGroups[ k ];
          groups[ memberGroup.groupId ] = memberGroup;
          memberGroup.id = memberGroup.groupId;
          var groupId = memberGroup.groupId;
          var path = UserApi.IsoneBaseEngine.columnService.getColumnPath( groupId, "c_100" );
          for ( var i = 0; i < path.size(); i++ ) {
            var jg = path.get( i );
            var g = JSON.parse( "" + jg.toString() );
            groups[ g.id ] = g;
          }
        }
      }
    }
    return groups;
  },
  /**
   * 将会员加入到指定的会员组，默认永久有效
   * @param userId
   * @param groupId
   * @returns {*}
   */
  addUserToGroup: function (userId, groupId){
    if (!userId || !groupId) {
      return;
    }
    //加入到会员组，默认永久有效
    var beginTime = new Date().getTime();
    var endTime = 4102415999000;
    return UserApi.IsoneModulesEngine.memberService.addUserToGroup( userId, groupId, beginTime, endTime );
  },

  getAccountType: function (accountTypeId){
    return UserApi.AccountTypeUtil.getAccountTypeName( accountTypeId );
  },

  getUserAccount: function (userId, accountType){
    var userAccount = UserApi.AccountFunction.getUserAccount( userId, accountType );
    if (!userAccount) {
      return null;
    }
    return JSON.parse( userAccount.toString() );
  },
  getObjAmount: function (id, userId){
    return UserApi.AccountFunction.getObjAmount( id, userId );
  },

  getUserEWalletMoneyAmount: function (userId){
    return UserApi.OrderCardHelper.getUserEWalletMoneyAmount( userId );
  },

  getUserMyWalletMoneyAmount: function (userId){
    return UserApi.OrderCardHelper.getUserMyWalletMoneyAmount( userId );
  },
  /**
   * 修改会员等级
   * @param user 会员对象
   * @param groupType 会员等级类型的第一个，如：普通会员-银牌会员-金牌会员 中的银牌会员ID 可看IUserService的常量
   * @param newGroupId 新等级ID
   */
  updateMemberGroup: function (user, groupType, newGroupId){
    var s = JSON.stringify( user );
    var jUser = new UserApi.JSONObject( s );
    return UserApi.IsoneModulesEngine.memberService.updateMemberGroup( jUser, groupType, newGroupId );
  },

  getMemberGroups: function (groupRootId){
    var result = UserApi.MemberGradeUtil.getAllMemberGroups( groupRootId );
    return JSON.parse( result.toString() );
  },
  /**
   * 增加会员
   * @param user 会员对象
   * @param operatorUserId 操作人ID，可以为空
   * @param config 是否要验证会员里的一些字段，见API详情
   * @returns {*}
   */
  addUser: function (user, operatorUserId, config){
    var jUser = $.toJavaJSONObject( user );
    var jConfig = $.toJavaJSONObject( config );
    var json = UserApi.UserAddUtil.addUser( jUser, operatorUserId, jConfig );
    return JSON.parse( json.toString() );
  },

  getAllUserIds: function (){
    var ids = UserApi.UserAddUtil.getAllUserIds();
    var result = [];
    for(var i=0; i<ids.size(); i++){
      result.push(ids.get(i) + "");
    }
    return result;
  },
  removeUserFromGroup: function (userId, groupId){
    UserApi.IsoneModulesEngine.memberService.removeUserFromGroup( userId, groupId );
  },


  removeAllParentGroup: function (userId, groupId){
    this.removeUserFromGroup( userId, groupId );
    var childrens = ColumnService.getChildren( groupId );
    if (!childrens) return;
    for ( var k in childrens ) {
      var child = childrens[ k ];
      if (child) {
        this.removeUserFromGroup( userId, child.id );
      }
    }
  },
  /**
   * 返回会员对应的所有会员等级名称
   * @param user
   * @returns {*}
   */
  getMemberAllGroupName: function (user){
    var userObj = new UserApi.JSONObject( JSON.stringify( user ) );
    var groupName = UserApi.MemberGradeUtil.getMemberAllGroupName( userObj, null );
    if (!groupName) {
      return null;
    }
    return groupName.toString();
  },
  /**
   * 获取当前会员组是在第几级
   * @param groupId
   * @returns {number}
   */
  getGroupLevel: function (fromId, topId){
    var level = 0;
    var columnPath = UserApi.IsoneBaseEngine.columnService.getColumnIdPath( fromId, topId, "/" );
    var columnPaths = columnPath.split( "/" );
    for ( var columnId  in columnPaths ) {
      if (columnId == fromId) {
        break;
      }
      level++;
    }
    return level;
  },
  /**
   * 获取最大会员等级
   * @param groups  结构形式是按level排序：[{level:1},{level:2}]
   * @returns {level:2}
   */
  getTopLevelGroup: function (groups){
    if (!groups)return;
    var s = JSON.stringify( groups );
    var list = UserApi.Util.jsonArrayStringToList( s );
    var sortList = UserApi.Util.sortList( list );
    var topLevelGroup = sortList.get( 0 );
    return JSON.parse( topLevelGroup );
  },

  /**
   * 注册会员（亚泰线下会员导入用到）
   */
  registerMember: function (param){
    if (!param) {
      return null;
    }
    var jParam = new UserApi.JSONObject( JSON.stringify( param ) );
    var jResult = UserApi.MemberFunction.registerMember( jParam );
    if (!jResult) return null;

    return JSON.parse( jResult.toString() );
  },
  /**
   * 验证用户是否属于某一个会员组
   *
   * @param userId
   * @param userGroupId
   * @return
   * @throws Exception
   */
  checkMemberGroup: function (userId, userGroupId){
    if (userId) {
      var isMemberGroup = UserApi.MemberGradeUtil.checkMemberGroup( userId, userGroupId );
      return isMemberGroup;
    }
    return false;
  },
  /**
   * 获得会员所有适用的会员组ID
   * @param userId
   * @returns {*}
   */
  getAllEffectiveGroupIds: function (userId){
    var json = UserApi.MemberGradeUtil.getAllEffectiveGroupIds( userId );
    return JSON.parse( json.toString() );
  },
  /**
   * 获取指定会员的最高等级
   * @param userId
   * @returns {*}
   */
  getUserTopGroupByUserId: function (userId){
    if (!userId) {
      return;
    }
    var userGroups = this.getUserGroups( userId );
    var groups = [];
    for ( var groupId in userGroups ) {
      var level = this.getGroupLevel( groupId, "c_100" );
      var group = {
        level: "" + level,
        groupId: groupId
      }
      groups.push( group );
    }
    if (groups.length == 0) {
      return;
    }
    var topLevelGroup = this.getTopLevelGroup( groups );
    if (!topLevelGroup) {
      return;
    }
    return topLevelGroup;
  },

  //修改会员的绑定状态（万家）
  updateUserBindStatus: function (userId, bindStatus, wjCardNo, wjShopId, wjMemberId, wjRegionId){
    if (!userId) {
      return false;
    }
    var userObj = this.getUser( userId );
    if (!userObj) {
      return false;
    }
    var wjCardInfo = {};
    wjCardInfo.wjCardNo = wjCardNo || "";
    wjCardInfo.wjShopId = wjShopId || "";
    wjCardInfo.wjMemberId = wjMemberId || "";
    wjCardInfo.wjRegionId = wjRegionId || "";
    wjCardInfo.bindTime = (new Date()).getTime() + "";
    userObj.wjCardInfo = wjCardInfo;

    userObj.userCardBindStatus = bindStatus || "0";
    userObj = new UserApi.JSONObject( JSON.stringify( userObj ) );
    UserApi.IsoneModulesEngine.memberService.updateUser( userObj, userId );

    return true;
  },

  updateUserPreSaleMobile: function (userId, preSaleMobile){
    if (!userId || !preSaleMobile) {
      return false;
    }
    var userObj = this.getUser( userId );
    if (!userObj) {
      return false;
    }
    userObj.preSaleMobile = preSaleMobile;
    userObj = new UserApi.JSONObject( JSON.stringify( userObj ) );
    UserApi.IsoneModulesEngine.memberService.updateUser( userObj, userId );
    return true;
  },
  /**
   * 判断某个key是否已经存在对应的userId
   * @param fieldValue
   * @param flag
   * @returns {string}
   */
  judgeMemberField: function (fieldValue, flag){
    var userId = UserApi.IsoneModulesEngine.memberService.judgeMemberField( fieldValue, flag );
    if (!userId) {
      return "";
    }
    return userId + "";
  },
  /**
   * 把某个key绑定到指定userId
   * @param fieldValue
   * @param userId
   * @param flag
   * @returns {string}
   */
  addMemberField: function (fieldValue, userId, flag){
    var s = UserApi.IsoneModulesEngine.memberService.addMemberField( fieldValue, userId, flag );
    if (!s) {
      return "";
    }
    return s + "";
  },
  /**
   * 获得会员来源配置
   * @returns {*}
   */
  getMemberSourceConfig: function (){
    var jConfig = UserApi.IsoneModulesEngine.userService.getUserSourceConfig();
    if (!jConfig) {
      return null;
    }
    return JSON.parse( jConfig.toString() );
  },
  /**
   * 修改会员来源配置
   * @param config
   */
  updateMemberSourceConfig: function (config){
    var jConfig = $.toJavaJSONObject( config );
    UserApi.IsoneModulesEngine.userService.updateUserSourceConfig( jConfig );
  },
  /**
   * 删除会员，把会员标识为已删除
   * @param delUserId 要删除的会员ID
   * @param operationUserId 操作的会员Id
   */
  deleteUser: function (delUserId, operationUserId){
    if (!delUserId) {
      return false;
    }
    UserApi.IsoneModulesEngine.memberService.deleteUser( delUserId, operationUserId );
    return true;
  },
  /**
   * 会员注册API，注册会触发会员注册前事件和会员注册后事件
   * @param jUser 会员对象
   * @param userId 操作人ID
   * @returns {*} 新会员ID
   */
  register: function (jUser, userId){
    if (!jUser) {
      return;
    }
    jUser = $.toJavaJSONObject( jUser );
    return UserApi.IsoneModulesEngine.memberService.register( jUser, userId );
  },
  /**
   * 触发用户验证后事件
   * @param eventName 事件名称，在UserEventConstants里有定义
   * @param jUser 用户对象
   * @returns {*}
   */
  fireUserEvent: function (eventName, jUser){
    if (!jUser || !eventName) {
      return;
    }
    jUser = $.toJavaJSONObject( jUser );
    return UserApi.IsoneModulesEngine.memberService.fireUserEvent( eventName, jUser );
  },
  /**
   * 把某个key绑定的userId解除
   * @param fieldValue 绑定的值
   * @param flag 类型
   * @returns {string}
   */
  removeMemberField: function (fieldValue, flag){
    if (!fieldValue) {
      return;
    }
    UserApi.IsoneModulesEngine.memberService.removeMemberField( fieldValue, flag );
  },
  /**
   * 重建会员索引
   * @param merchantId
   */
  reBuildIndex: function (userId) {
    if (!userId) {
      return;
    }
    UserApi.IsoneModulesEngine.memberService.addIndexingQue(userId);
  }
};
