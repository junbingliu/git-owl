//单商家的初始化脚本
//#import ps20.js
assertSystem("mall");
var merchantId = "m_100"
var userId = "u_1";
var now = new Date();
var t = now.getTime();
var strT = t+"";
var user = {
    id:userId,
    loginId:'admin',
    realName:'商家超级管理员',
    createUserId:userId,
    gender:'2',
    createTime:strT,
    lastModifiedUserId:'u_sys',
    lastModifiedTime:strT,
    passwordhash:'EeoK7KKM7cClnfm+Z9rKjqv7',
    random:'0.20496861378640363',
    isEnable:'1',
    isAdmin:'0'
};
var userKey = {
    id:userId
};

saveObject('u_0', {
    "lastModifiedTime": "1273196933843",
    "id": "u_0",
    "createTime": "1272448368046",
    "isEnable": "1",
    "isAdminEnable": "1",
    "loginId": "root",
    "random": "0.14304481404193248",
    "gender": "2",
    "isAdmin": "1",
    "realName": "管理员",
    "passwordhash": "fcehsIo4y0BrneH21m3C2USM",
    "marriage": "0"});

addToList('Admin2MerchantList_head_merchant', 'Admin2MerchantList_head_merchant_0', 'u_0');
saveObject('uLoginKey_root', {"id": "u_0"});

function getPosKeyRevertCreateTime(pos,createTime) {
    var time = createTime / 1000;
    var key = getComparableString(pos, 5) + "_" + getRevertComparableString(time, 11);
    return key;
}
var allGroupIds ="c_101"
var memberGroup = {}
memberGroup.groupId = 'c_101'
memberGroup.allGroupId = allGroupIds;
memberGroup.createTime = t;
var groupType = "c_102" + "_group";
var memberGroups = {};
memberGroups[groupType] = memberGroup;

user.memberGroups = memberGroups;

saveObject(userId,user);
//加入所有用户
addToList("User",getPosKeyRevertCreateTime(100,t),user.id);
saveObject("uLoginKey_" + user.loginId,userKey);
addToList("User_" + memberGroup.groupId,"" + t, user.Id);

addToList("Admin2MerchantList_" + merchantId,getPosKeyRevertCreateTime(100,t),userId);
addToList("Merchant2AdminList_" + "merchant" + "_" + userId,getPosKeyRevertCreateTime(100,t),merchantId);
addToList("IndexingQue_user",t, user.id);
addToList("IndexingQue_userDss",t, user.id);

var merchant = {
    certifyState : "1",
    id:merchantId,
    name_cn:"默认商家",
    name_en:"DefaultMerchant",
    columnId:  "col_merchant_all",
    checkinUser: "u_0",
    chectoutUserId:"u_0",
    checkoutTime:  "" + t
}
versionObject.addObject(merchant,merchantId,"u_0",false);
var merchantGradeId = "col_merGrade_100"
var merchant_nover ={
    id:merchantId + "_NoVersionObject",
    objId:merchantId,
    productCanBuyState:"1",
    canGiveIntegral:"1",
    merchantType:"1",
    rootAdmin:userId,
    merchantGradeId:merchantGradeId,
    enableState: "Y"
}
saveObject(merchant_nover.id,merchant_nover);
addToList("IndexingQue_userDss",t, "IndexingQue_merchant");

//把商家等级卷对应的权限分配给商家

var listName = "RoleDispatchs_mg_" + merchantGradeId + "_" + "head_merchant"
//先删除原来的
clearList("RoleDispatchs_mg_" + merchantGradeId + "_" + "head_merchant");
var merchantGradeId = "col_merGrade_100"
var roles = getObjects(listName,0,-1);
for( role in roles){
    var r = {
        id:"rdch_" + getId("RoleDispatch"),
        roleId:role.id,
        objType:"mg",
        canBeInherited:"1",
        canGive:"1",
        objId:merchantGradeId,
        mid:"head_merchant"
    }
    saveObject(r.id,r);
    addToList("RoleDispatchs_" + "mg" + "_" + r.objId + "_" + r.mid, getComparableString(100,5),r.id);
    addToList("Role2ObjectList_" + r.roleId + "_" + r.objType, r.objId, r.objId);

    var r = {
        id:"rdch_" + getId("RoleDispatch"),
        roleId:role.id,
        objType:"u",
        canBeInherited:"1",
        canGive:"1",
        objId:userId,
        mid:"head_merchant"
    }
    saveObject(r.id,r);
    addToList("RoleDispatchs_" + "u" + "_" + r.objId + "_" + r.mid, getComparableString(100,5),r.id);
    addToList("Role2ObjectList_" + r.roleId + "_" + r.objType, r.objId, r.objId);
}
addToList("Merchant2merchantGradeQue","100",merchantId);
addToList(merchantGradeId + "_Merchants",getRevertComparableString(100,10),merchantId);
addToList("col_merchant_all_Merchants", getRevertComparableString(100, 10), merchantId);

saveObject('c_10000', {"id":"c_10000","parentId":"col_ProductRoot","title":"所有商品","name":"所有商品","columntype":"coltype_standardProduct","attrTemplateId":"attrTemplate_10000","columnAttrTemplateId":"attrTemplate_20000","pos":"100"});


//商品的参数
saveObject('ProductValidPublishTimes', {"free":{"time014":{"id":"time014","name":"14天","value":"15"},"time999":{"id":"time999","isDefault":"true","name":"永久","value":"-1"},"time007":{"id":"time007","name":"7天","value":"8"}},"common":{"time014":{"id":"time014","name":"14天","value":"15"},"time999":{"id":"time999","isDefault":"true","name":"永久","value":"-1"},"time007":{"id":"time007","name":"7天","value":"8"}},"defaultPublishState":"0"});
saveObject('CommendTypes_product', {"id":"CommendTypes_product","value":[{"name":"相关商品","key":"related"},{"name":"最佳组合","key":"combination"},{"name":"同价位同属性","key":"samePrice"},{"name":"购买此商品的人还购买过","key":"historyBuy"},{"name":"您可能感兴趣的商品","key":"interested"},{"name":"浏览此商品的人还浏览过","key":"historyView"}]});
saveObject('CommendTypes_info', {"id":"CommendTypes_info","value":[{"name":"相关信息","key":"i_related"},{"name":"售后服务","key":"i_afterSalesServiceRelated"}]});

//money type
saveObject('MoneyTypes', {"moneytype_HKD": {"id": "moneytype_HKD", "name": "港币", "code": "HK$ "}, "moneytype_RMB": {"id": "moneytype_RMB", "name": "人民币", "code": "RMB "}, "moneytype_EUR": {"id": "moneytype_EUR", "name": "欧元", "code": "EUR "}, "moneytype_INTEGRAL": {"id": "moneytype_INTEGRAL", "name": "积分", "code": "INTEGRAL "}, "moneytype_USD": {"id": "moneytype_USD", "name": "美元", "code": "US$ "}});
saveObject('PriceEntityTypes', {"id": "PriceEntityTypes", "values": [
    {"id": "entitytype_usergroup", "name": "用户组"},
    {"id": "entitytype_user", "name": "具体用户"},
    {"id": "entitytype_other", "name": "其他价格"}
]});
saveObject('OtherEntities', {"id": "OtherEntities", "values": [
    {"id": "entity_securitySellPrice", "payable": "N", "allowBlank": "false", "name": "最低安全售价"},
    {"id": "entity_marketPrice", "payable": "N", "allowBlank": "true", "name": "市场价"}
]});
saveObject('PriceTypesConfig_Default', {"id": "PriceTypesConfig_Default", "values": [
    {"id": "entity_marketPrice", "allowBlank": "false", "name": "市场价"},
    {"id": "entity_securitySellPrice", "allowBlank": "false", "name": "最低安全售价"},
    {"id": "sellableCount", "allowBlank": "false", "name": "可卖数"},
    {"id": "SecuritySellableCount", "allowBlank": "false", "name": "安全可卖数"},
    {"id": "OnceMustBuyCount", "allowBlank": "false", "name": "起订量"}
]});
saveObject('head_merchant_ProductPriceScale', {
    "id": "head_merchant_ProductPriceScale",
    description: '默认货币类型',
    defaultMoneyType: {id: 'moneytype_RMB', name: '人民币', code: 'RMB'}
});

//title的颜色
saveObject('ObjectTitle_Colors', {"id":"ObjectTitle_Colors","values":[{"visi":"hidden","name":"default","value":"","url":"../upload/color/transparent.gif"},{"visi":"hidden","name":"black","value":"#000000","url":"../upload/color/black.gif"},{"visi":"hidden","name":"red","value":"#FF0000","url":"../upload/color/red.gif"},{"visi":"hidden","name":"purple","value":"#800080","url":"../upload/color/purple.gif"},{"visi":"hidden","name":"blue","value":"#0000FF","url":"../upload/color/blue.gif"}]});

//动态属性的类型
saveObject('attrtype_text', {"id":"attrtype_text","name_en":"Text","name":"文字"});
saveObject('attrtype_decimal', {"id":"attrtype_decimal","name_en":"Decimal","name":"数字"});
saveObject('attrtype_pic', {"id":"attrtype_pic","name_en":"Pic","name":"图片"});
saveObject('attrtype_piclist', {"id":"attrtype_piclist","name_en":"PicList","name":"图片列表"});
saveObject('attrtype_filelist', {"id":"attrtype_filelist","name_en":"FileList","name":"文件列表"});
saveObject('attrtype_date', {"id":"attrtype_date","name_en":"Date","name":"日期"});
saveObject('attrtype_date_range', {"id":"attrtype_date_range","name_en":"DateRange","name":"日期范围"});
saveObject('attrtype_decimal_range', {"id":"attrtype_decimal_range","name_en":"DecimalRange","name":"数字范围"});
saveObject('attrtype_singlecolumn', {"id":"attrtype_singlecolumn","name_en":"singlecolumn","name":"栏目单选"});
addToList('attrtypes','001','attrtype_text');
addToList('attrtypes','002','attrtype_decimal');
addToList('attrtypes','003','attrtype_decimal_range');
addToList('attrtypes','004','attrtype_pic');
addToList('attrtypes','005','attrtype_piclist');
addToList('attrtypes','006','attrtype_filelist');
addToList('attrtypes','007','attrtype_date');
addToList('attrtypes','008','attrtype_date_range');
addToList('attrtypes','009','attrtype_singlecolumn');

//会员等级
saveObject('c_100', {"id":"c_100","parentId":"col_MemberRoot","title":"会员等级管理","name":"会员等级管理","columntype":"coltype_Default","pos":"101"});
saveObject('c_101', {"id":"c_101","parentId":"c_100","title":"普通会员","gradeLogo":"/images/c_101_mg.gif","name":"普通会员","columntype":"coltype_userGroup","pos":"100"});
addToList('c_100_children','00100','c_101');

//虚拟卡类型
saveObject('VirtualCardTypes', {"cardType_coupons":{"id":"cardType_coupons","description":"特点：一次性使用，有期限。","name":"购物券","cardNumberRule":{"bit":"7","ruleService":"net.xinshi.isone.modules.card.generaterulepolicy.impl.NormalCardNumberRule"}}});


//信息管理
//仅仅是单机版的，多商家版还有更多得需要定义
saveObject('col_InfoRoot', {"id":"col_InfoRoot","parentId":"rootcolumn","title":"信息管理","name":"信息管理","columntype":"coltype_Default","pos":"107"});
saveObject('c_info_10000', {"id":"c_info_10000","parentId":"col_InfoRoot","title":"所有信息","name":"所有信息","columntype":"coltype_InfoMgt","pos":"100"});
clearList('col_InfoRoot_children');
addToList('col_InfoRoot_children','00100','c_info_10000');
saveContent("_sysType_","single");

//支付方式
saveObject('payi_120', {
    "id":"payi_120",
    "payInterfaceDescription":"支付宝wap支付",
    "payInterfaceName":"支付宝wap支付",
    "values":{
        "icon_width":{
            "innerName":"icon_width",
            "isPassword":"0",
            "outerName":"支付按钮的宽",
            "defaultValue":"112",
            "type": "1"
        },
        "icon":{
            "innerName":"icon",
            "isPassword":"0",
            "outerName":"支付按钮图标",
            "defaultValue":"../images/cartOk_btnPay.gif",
            "type": "1"
        },
        "notify_url":{
            "innerName":"notify_url",
            "isPassword":"0",
            "outerName":"通知url",
            "defaultValue":"http://yourdomain/payment/alipayMobileNotify.jsp",
            "type": "1"
        },
        "gateWay":{
            "innerName":"paygateway",
            "isPassword":"0",
            "outerName":"支付网关Url",
            "defaultValue":"https://wappaygw.alipay.com/service/rest.htm",
            "type": "1"
        },
        "RSA_PRIVATE":{
            "innerName":"RSA_PRIVATE",
            "isPassword":"0",
            "outerName":"商户（RSA）私钥",
            "defaultValue":"",
            "type":"1"
        },
        "return_url":{
            "innerName":"return_url",
            "isPassword":"0",
            "outerName":"页面跳转返回数据URL",
            "type": "1",
            "defaultValue":"http://yourdomain/payment/alipayMobileReturn.jsp"
        },
        "RSA_ALIPAY_PUBLIC":{
            "innerName":"RSA_ALIPAY_PUBLIC",
            "isPassword":"0",
            "outerName":"支付宝（RSA）公钥",
            "defaultValue":"",
            "type":"1"
        },
        "merchantUrl":{
            "innerName":"merchantUrl",
            "isPassword":"0",
            "outerName":"未完成支付，用户点击链接返回商户url",
            "type": "1",
            "defaultValue":"http://yourdomain/phone_page/payment/closePayment.jsp"
        },
        "icon_height":{
            "innerName":"icon_height",
            "isPassword":"0",
            "outerName":"支付按钮的高",
            "defaultValue":"40"
            ,"type": "1"
        },
        "payEntryUrl":{
            "innerName":"payEntryUrl",
            "isPassword":"0",
            "outerName":"手机支付入口",
            "type": "1",
            "defaultValue":"http://yourdomain/phone_page/payment/alipay.jsp"
        },
        "partner":{
            "innerName":"partner",
            "isPassword":"0",
            "outerName":"合作伙伴id",
            "defaultValue":"",
            "type":"1"
        },
        "seller_email":{
            "innerName":"seller_email",
            "isPassword":"0",
            "outerName":"卖家支付宝账号",
            "defaultValue":"",
            "type":"1"
        },
        "key":{
            "innerName":"key",
            "isPassword":"0",
            "outerName":"商户（MD5）KEY",
            "defaultValue":"",
            "type":"1"
        },
        "enterpriseAccountName": {"innerName": "enterpriseAccountName", "isPassword": "0", "outerName": "企业开户名称", "defaultValue": "", "type": "1"},
        "enterpriseBankName": {"innerName": "enterpriseBankName", "isPassword": "0", "outerName": "企业开户银行", "defaultValue": "", "type": "1"},
        "enterpriseBankAccount": {"innerName": "enterpriseBankAccount", "isPassword": "0", "outerName": "企业银行账号", "defaultValue": "", "type": "1"}
    },
    "isPhoneUseOnly":"Y",
    "isMobile": "Y",
    "payInterfaceAPI":"net.xinshi.isone.modules.payment.applyimpl.AlipayMobile.AlipayMobileRealPay",
    "isPayOnLine":"Y",
    "logoUrl":"/resources/bank/logo_AliPay.jpg",
    "isMerApp":"Y",
    "isSys":true,
    "isThirdPart":"Y"});
addToList('PayInterfaces','payi_120','payi_120');
saveObject('payi_140', {
    "id":"payi_140",
    "payInterfaceDescription":"银联wap支付",
    "payInterfaceName":"银联wap支付",
    "values":{
        "icon": {
            "innerName": "icon",
            "isPassword": "0",
            "outerName": "支付按钮图标",
            "defaultValue": "../images/cartOk_btnPay.gif",
            "type": "1"
        },
        "merId": {
            "innerName": "merId",
            "isPassword": "0",
            "outerName": "商户Id",
            "defaultValue": "777290058110538",
            "type": "1"
        },
        "frontUrl": {
            "innerName": "frontUrl",
            "isPassword": "0",
            "outerName": "前台通知地址",
            "defaultValue": "http://127.0.0.1/payment/chinaWapReturn.jsp",
            "type": "1"
        },
        "backUrl": {
            "innerName": "backUrl",
            "isPassword": "0",
            "outerName": "后台通知地址",
            "defaultValue": "http://127.0.0.1/payment/chinaWapNotify.jsp",
            "type": "1"
        },
        "frontTransUrl": {
            "innerName": "frontTransUrl",
            "isPassword": "0",
            "outerName": "前台交易请求地址",
            "defaultValue": "https://101.231.204.80:5000/gateway/api/frontTransReq.do",
            "type": "1"
        },
        "singleQueryUrl": {
            "innerName": "singleQueryUrl",
            "isPassword": "0",
            "outerName": "单笔查询地址",
            "defaultValue": "https://101.231.204.80:5000/gateway/api/queryTrans.do",
            "type": "1"
        },
        "signCertPath": {
            "innerName": "signCertPath",
            "isPassword": "0",
            "outerName": "商户私钥证书",
            "defaultValue": "/Users/apple/Desktop/wap/certs/700000000000001_acp.pfx",
            "type": "1"
        },
        "signCertPwd": {
            "innerName": "signCertPwd",
            "isPassword": "0",
            "outerName": "签名密码",
            "defaultValue": "000000",
            "type": "1"
        },
        "encryptCertPath": {
            "innerName": "encryptCertPath",
            "isPassword": "0",
            "outerName": "密码加密证书路径",
            "defaultValue": "/Users/apple/Desktop/wap/certs/encrypt.cer",
            "type": "1"
        },
        "validateCertDir": {
            "innerName": "validateCertDir",
            "isPassword": "0",
            "outerName": "商户公钥目录",
            "defaultValue": "/Users/apple/Desktop/wap/certs",
            "type": "1"
        },
        "backTransUrl": {
            "innerName": "backTransUrl",
            "isPassword": "0",
            "outerName": "后台交易请求地址",
            "defaultValue": "https://101.231.204.80:5000/gateway/api/backTrans.do",
            "type": "1"
        },
        "batchTransUrl": {
            "innerName": "batchTransUrl",
            "isPassword": "0",
            "outerName": "批量交易请求地址",
            "defaultValue": "https://101.231.204.80:5000/gateway/api/batchTransReq.do",
            "type": "1"
        },
        "reqReserved": {
            "innerName": "reqReserved",
            "isPassword": "0",
            "outerName": "手机支付结果页",
            "defaultValue": "http://10.10.10.201:8000/#/payResultPage/",
            "type": "1"
        },
        "payEntryUrl":{
            "innerName":"payEntryUrl",
            "isPassword":"0",
            "outerName":"手机支付入口",
            "type": "1",
            "defaultValue":"http://127.0.0.1/phone_page/payment/chinaWapPay.jsp"
        },
        "enterpriseAccountName": {"innerName": "enterpriseAccountName", "isPassword": "0", "outerName": "企业开户名称", "defaultValue": "", "type": "1"},
        "enterpriseBankName": {"innerName": "enterpriseBankName", "isPassword": "0", "outerName": "企业开户银行", "defaultValue": "", "type": "1"},
        "enterpriseBankAccount": {"innerName": "enterpriseBankAccount", "isPassword": "0", "outerName": "企业银行账号", "defaultValue": "", "type": "1"}
    },
    "isPhoneUseOnly":"Y",
    "payInterfaceAPI":"net.xinshi.isone.modules.payment.applyimpl.mobilePay.ChinaWapPay",
    "isPayOnLine":"Y",
    "isMobile": "Y",
    "isMerApp":"Y",
    "isSys":true,
    "logoUrl":"/resources/bank/logo_UnionPay.png",
    "isThirdPart":"Y"});
addToList('PayInterfaces','payi_140','payi_140');

saveObject('payi_100', {
    "id": "payi_100",
    "addFrontOrderShow": "Y",
    "payInterfaceDescription": "支付宝",
    "payInterfaceName": "支付宝",
    "values": {
        "query_url": {"innerName": "query_url", "isPassword": "0", "outerName": "验证查询结果url", "defaultValue": "http://notify.alipay.com/trade/notify_query.do?", "type": "1"},
        "icon_width": {"innerName": "icon_width", "isPassword": "0", "outerName": "按钮图标宽", "defaultValue": "112", "type": "1"},
        "icon": {"innerName": "icon", "isPassword": "0", "outerName": "支付按钮图标路径", "defaultValue": "../images/cartOk_btnPay.gif", "type": "1"},
        "paygateway": {"innerName": "paygateway", "isPassword": "0", "outerName": "支付网关url", "defaultValue": "https://www.alipay.com/cooperate/gateway.do?", "type": "1"},
        "sign_type": {"innerName": "sign_type", "isPassword": "0", "outerName": "签名方式", "defaultValue": "MD5", "type": "1"},
        "input_charset": {"innerName": "input_charset", "isPassword": "0", "outerName": "字符集", "defaultValue": "utf-8", "type": "1"},
        "notify_url": {"innerName": "notify_url", "isPassword": "0", "outerName": "通知url", "defaultValue": "/payment/alipayNotify.jsp", "type": "1"},
        "defaultbank": {"innerName": "defaultbank", "isPassword": "0", "outerName": "默认网银代码", "defaultValue": "CMB", "type": "1"},
        "return_url": {"innerName": "return_url", "isPassword": "0", "outerName": "返回url", "defaultValue": "/payment/alipayReturn.jsp", "type": "1"},
        "service": {"innerName": "service", "isPassword": "0", "outerName": "默认网银代码", "defaultValue": "create_direct_pay_by_user", "type": "1"},
        "icon_height": {"innerName": "icon_height", "isPassword": "0", "outerName": "按钮图标高", "defaultValue": "40", "type": "1"},
        "paymethod": {"innerName": "paymethod", "isPassword": "0", "outerName": "默认支付方式", "defaultValue": "bankPay", "type": "1"},
        "partner": {"innerName": "partner", "isPassword": "0", "outerName": "合作伙伴ID", "defaultValue": "", "type": "1"},
        "seller_email": {"innerName": "seller_email", "isPassword": "0", "outerName": "卖家email", "defaultValue": "", "type": "1"},
        "key": {"innerName": "key", "isPassword": "0", "outerName": "校验交易码", "defaultValue": "", "type": "1"},
        "expenseRation": {"innerName": "expenseRation", "isPassword": "0", "outerName": "银行费用率（%）", "defaultValue": "", "type": "1"},
        "lowerLimit": {"innerName": "lowerLimit", "isPassword": "0", "outerName": "手续费下限（分）", "defaultValue": "", "type": "1"},
        "enterpriseAccountName": {"innerName": "enterpriseAccountName", "isPassword": "0", "outerName": "企业开户名称", "defaultValue": "", "type": "1"},
        "enterpriseBankName": {"innerName": "enterpriseBankName", "isPassword": "0", "outerName": "企业开户银行", "defaultValue": "", "type": "1"},
        "enterpriseBankAccount": {"innerName": "enterpriseBankAccount", "isPassword": "0", "outerName": "企业银行账号", "defaultValue": "", "type": "1"}
    },
    "addBackOrderShow": "Y",
    "payInterfaceAPI": "net.xinshi.isone.modules.payment.applyimpl.Alipay",
    "isPayOnLine": "Y",
    "logoUrl": "/resources/bank/logo_AliPay.jpg",
    "isMerApp": "Y",
    "isThirdPart": "Y"
});
addToList('PayInterfaces', 'payi_100', 'payi_100');


var payi_220={
    "id": "payi_220",
    "payInterfaceName": "银联全渠道网关支付",
    "payInterfaceDescription": "银联v5支付",
    "values": {
        "frontUrl": {
            "innerName": "frontUrl",
            "isPassword": "0",
            "outerName": "同步通知Url",
            "type": "1",
            "defaultValue": "/payment/AcpPayReturn.jsp"
        },
        "validateCertDir": {
            "innerName": "validateCertDir",
            "isPassword": "0",
            "outerName": "验证签名证书目录",
            "type": "1",
            "defaultValue": "F:/data/isonev45/payment/unionpayV5"
        },
        "backUrl": {
            "innerName": "backUrl",
            "isPassword": "0",
            "outerName": "异步通知Url",
            "defaultValue": "/payment/AcpPayNotify.jsp",
            "type": "1"
        },
        "signCertType": {
            "innerName": "signCertType",
            "isPassword": "0",
            "outerName": "签名证书类型",
            "defaultValue": "PKCS12",
            "type": "1"
        },
        "backTransUrl": {
            "innerName": "backTransUrl",
            "isPassword": "0",
            "outerName": "后台交易请求地址",
            "type": "1",
            "defaultValue": "https://gateway.95516.com/gateway/api/backTransReq.do"
        },
        "merId": {
            "innerName": "merId",
            "isPassword": "0",
            "outerName": "商户号",
            "type": "1",
            "defaultValue": "955177053119994"
        },
        "signCertPath": {
            "innerName": "signCertPath",
            "isPassword": "0",
            "outerName": "签名证书路径",
            "type": "1",
            "defaultValue": "F:/data/isonev45/payment/unionpayV5/MerPrK.pfx"
        },
        "singleQueryUrl": {
            "innerName": "singleQueryUrl",
            "isPassword": "0",
            "outerName": "单笔查询请求地址",
            "defaultValue": "https://gateway.95516.com/gateway/api/queryTrans.do",
            "type": "1"
        },
        "signCertPwd": {
            "innerName": "signCertPwd",
            "isPassword": "0",
            "outerName": "签名证书密码",
            "type": "1",
            "defaultValue": "123456"
        },
        "frontTransUrl": {
            "innerName": "frontTransUrl",
            "isPassword": "0",
            "outerName": "前台交易请求地址",
            "type": "1",
            "defaultValue": "https://gateway.95516.com/gateway/api/frontTransReq.do"
        },
        "enterpriseAccountName": {"innerName": "enterpriseAccountName", "isPassword": "0", "outerName": "企业开户名称", "defaultValue": "", "type": "1"},
        "enterpriseBankName": {"innerName": "enterpriseBankName", "isPassword": "0", "outerName": "企业开户银行", "defaultValue": "", "type": "1"},
        "enterpriseBankAccount": {"innerName": "enterpriseBankAccount", "isPassword": "0", "outerName": "企业银行账号", "defaultValue": "", "type": "1"}
    },
    "payInterfaceAPI": "net.xinshi.isone.modules.payment.applyimpl.AcpPay",
    "isPayOnLine": "Y",
    "isMerApp": "Y",
    "logoUrl":"/resources/bank/logo_UnionPay.png",
    "isMobile": "N",
    "isThirdPart": "Y",
    "isSys": true
};

saveObject("payi_220",payi_220);
addToList('PayInterfaces', 'payi_220', 'payi_220');

saveObject('payi_0', {"id": "payi_0", "payInterfaceDescription": "货到付款支付", "payInterfaceName": "货到付款", "values": {}, "payInterfaceAPI": "", "isPayOnLine": "N", "logoUrl": "../upload/logo_none_150_60.jpg", "isMerApp": "Y", "isSys": true, "isThirdPart": "N"});
addToList('PayInterfaces', 'payi_0', 'payi_0');
saveObject('payi_1', {"id": "payi_1", "payInterfaceDescription": "在线支付", "payInterfaceName": "在线支付", "values": {}, "payInterfaceAPI": "", "isPayOnLine": "Y", "logoUrl": "../upload/logo_none_150_60.jpg", "isMerApp": "Y", "isSys": true, "isThirdPart": "N"});
addToList('PayInterfaces', 'payi_1', 'payi_1');
saveObject('payi_2', {"id": "payi_2", "payInterfaceDescription": "购物券", "payInterfaceName": "购物券", "values": {}, "payInterfaceAPI": "", "isPayOnLine": "Y", "logoUrl": "../upload/logo_none_150_60.jpg", "isMerApp": "Y", "isSys": true, "isThirdPart": "N"});
addToList('PayInterfaces', 'payi_2', 'payi_2');
saveObject('payi_4', {"id": "payi_4", "payInterfaceDescription": "积分支付", "payInterfaceName": "积分支付", "values": {}, "payInterfaceAPI": "", "isPayOnLine": "Y", "logoUrl": "../upload/logo_none_150_60.jpg", "isMerApp": "Y", "isSys": true, "isThirdPart": "N"});
addToList('PayInterfaces', 'payi_4', 'payi_4');

saveObject('payi_20', {"id": "payi_20", "payInterfaceDescription": "货到付款-pos机支付", "payInterfaceName": "货到付款-pos机收款", "values": {}, "payInterfaceAPI": "", "isPayOnLine": "N", "logoUrl": "../upload/logo_none_150_60.jpg", "isMerApp": "Y", "isSys": true, "isThirdPart": "N"});
addToList('PayInterfaces', 'payi_20', 'payi_20');
saveObject('payi_21', {"id": "payi_21", "payInterfaceDescription": "货到付款-现金支付", "payInterfaceName": "货到付款-现金支付", "values": {}, "payInterfaceAPI": "", "isPayOnLine": "N", "logoUrl": "../upload/logo_none_150_60.jpg", "isMerApp": "Y", "isSys": true, "isThirdPart": "N"});
addToList('PayInterfaces', 'payi_21', 'payi_21');

//going to import order/all.jsx
//#import init/order/all.jsx
//---------------------支付方式结束-----------------------

//---------------------普通订单状态处理规则----------------------
var orderDispatchRules = {
    "id" : "OrderStateDispatchRule_common_common_ONLY",
    "col_OrderRoot" : {
    "values" : [{
        "desc" : "货到付款，未确认的订单",
        "listToStatesDes" : "用于订单列表显示按钮",
        "rule" : "payType==301,states.processState.state==p100,javascript:order.isZeroBuyAmount()==false;payType==300,states.processState.state==p100,states.payState.state==p201,javascript:order.needApproval()==false",
        "toStates" : [{
            "toState" : "p101",
            "toStateType" : "processState",
            "toStateImage" : "validation",
            "toStateName" : "确认订单"
        }
        ]
    }, {
        "desc" : "未送货未签收的订单，可以取消",
        "listToStatesDes" : "用于订单列表显示按钮",
        "rule" : "javascript:order.hasShipping()==false,javascript:order.hasSigned()==false,javascript:order.needApproval()==false",
        "toStates" : [{
            "toState" : "p111",
            "toAutoStateDeal" : true,
            "toStateType" : "processState",
            "toStateImage" : "delete",
            "toStateName" : "取消订单"
        }
        ]
    }, {
        "desc" : "线上支付，已支付订单,如果没有确认，则可以变成已经确认",
        "listToStatesDes" : "用于订单列表显示按钮",
        "rule" : "payType==300,states.processState.state==p100,states.payState.state==p201,javascript:order.needApproval()==false",
        "ruleDesc" : "在线支付订单且已支付",
        "toStates" : [{
            "toState" : "p101",
            "toStateType" : "processState",
            "toStateImage" : "validation",
            "toStateName" : "确认订单"
        }
        ]
    }, {
        "desc" : "已确认订单，并且与erp无关",
        "listToStatesDes" : "用于订单列表显示按钮",
        "rule" : "states.processState.state==p101,javascript:order.isOrderWorkWithERP()==false,javascript:order.needApproval()==false",
        "ruleDesc" : "订单处于已确认状态，且其商品信息存在已签收或者已出库状态",
        "toStates" : [{
            "toState" : "p102",
            "toStateType" : "processState",
            "toStateImage" : "peisong",
            "toStateName" : "已出库"
        }
        ]
    }, {
        "desc" : "线上支付，已配送订单",
        "listToStatesDes" : "用于订单列表显示按钮",
        "rule" : "payType==300,states.processState.state==p102,states.payState.state==p201,javascript:order.isOrderWorkWithERP()==false,javascript:order.needApproval()==false",
        "ruleDesc" : "在线支付订单在已出库，且订单已支付和所有商品都已签收",
        "toStates" : [{
            "toState" : "p112",
            "toStateType" : "processState",
            "toStateImage" : "qianshou",
            "toStateName" : "已签收"
        }
        ]
    },  {
        "desc" : "线下支付，已配送订单",
        "listToStatesDes" : "用于订单列表显示按钮",
        "rule" : "payType==301,states.processState.state==p102,javascript:order.isOrderWorkWithERP()==false,javascript:order.needApproval()==false",
        "ruleDesc" : "线下订单在已出库，可以变成已签收",
        "toStates" : [{
            "toState" : "p112",
            "toStateType" : "processState",
            "toStateImage" : "qianshou",
            "toStateName" : "已签收"
        }
        ]
    },{
        "desc" : "支付订单",
        "listToStatesDes" : "用于订单列表显示按钮",
        "rule" : "states.processState.state==p100|p101|p102|p112,states.payState.state==p200,javascript:order.needApproval()==false",
        "toStates" : [{
            "toState" : "p201",
            "toAutoStateDeal" : true,
            "toStateType" : "payState",
            "toStateImage" : "confirmPay",
            "toStateName" : "确认收款"
        }
        ]
    }
    ],
        "desc" : "所有订单"
    }
};
saveObject('OrderStateDispatchRule_common_common_ONLY', orderDispatchRules);

saveObject('OrderStateAutoDeal_common_ONLY', {
    "id": "OrderStateAutoDeal_common_ONLY",
    "values": [{
        "toState": "p101",
        "description": "一旦支付默认订单就为已确认。",
        "rule": "states.payState.state==p201,states.processState.state==p100,javascript:order.needApproval()==false",
        "toStateType": "processState"
    }, {
        "toState": "p101",
        "description": "订单如果处于配送中，但已签收和配送中数量为0，则订单就调整为备货中（已确认）。",
        "rule": "states.processState.state==p102,javascript:order.hasShipping()==false,javascript:order.hasRejectedAmount()==false,javascript:order.hasSigned()==false,javascript:order.needApproval()==false",
        "toStateType": "processState"
    }, {
        "toState": "p102",
        "description": "一旦确认的订单如果出现商品处于配送中时，则调整订单状态为配送中。",
        "rule": "states.processState.state==p101|p100,javascript:order.allSigned()==false,javascript:order.hasShipping()==true,javascript:order.needApproval()==false;states.processState.state==p101|p100,javascript:order.allSigned()==false,javascript:order.hasSigned()==true,javascript:order.needApproval()==false",
        "toStateType": "processState"
    }, {
        "toState": "p112",
        "description": "订单所有商品都已签收,则调整订单处理状态为已签收。",
        "rule": "javascript:order.allSigned()==true,javascript:order.needApproval()==false",
        "toStateType": "processState"
    }, {
        "toState": "p113",
        "description": "订单商品存在拒收数量,则调整订单处理状态为已拒收。",
        "rule": "states.processState.state==p102,javascript:order.hasRejectedAmount()==true,javascript:order.needApproval()==false",
        "toStateType": "processState"
    }, {
        "toState": "p201",
        "description": "一旦订单全部支付完成默认订单为已支付。",
        "rule": "states.payState.state==p200,javascript:order.allPaid()==true,javascript:order.needApproval()==false",
        "toStateType": "payState",
        "toAutoDealNext": true
    }, {
        "toState": "p200",
        "description": "一旦订单未完全支付，则订单为待支付。",
        "rule": "states.payState.state==p201,javascript:order.allPaid()==false,javascript:order.needApproval()==false",
        "toStateType": "payState"
    }]
});

//------------------订单状态规则------------------


//退款单------------begin
saveObject('c_o_m_1004', {"id":"c_o_m_1004","parentId":"col_m_OrderRoot","title":"退款管理","name":"退款管理","columntype":"coltype_Default"});
saveObject('c_o_m_1004_100', {"id":"c_o_m_1004_100","parentId":"c_o_m_1004","title":"退货退款单","name":"退货退款单","columntype":"coltype_m_order_refund_return","pos":100});
saveObject('c_o_m_1004_200', {"id":"c_o_m_1004_200","parentId":"c_o_m_1004","title":"订单变更退款单","name":"订单变更退款单","columntype":"coltype_m_order_refund_change","pos":101});
saveObject('c_o_m_1004_300', {"id":"c_o_m_1004_300","parentId":"c_o_m_1004","title":"订单取消退款单","name":"订单取消退款单","columntype":"coltype_m_order_refund_cancel","pos":102});
saveObject('c_o_m_1004_400', {"id":"c_o_m_1004_400","parentId":"c_o_m_1004","title":"其他原因退款单","name":"其他原因退款单","columntype":"coltype_m_order_refund_reason","pos":103});
clearList('c_o_m_1004_children');
addToList('c_o_m_1004_children','00100','c_o_m_1004_100');
addToList('c_o_m_1004_children','00101','c_o_m_1004_200');
addToList('c_o_m_1004_children','00102','c_o_m_1004_300');
addToList('c_o_m_1004_children','00103','c_o_m_1004_400');

//退款单------------end

saveObject('user_source_config', {
        "online": {
            "id": "online",
            "values": {
                sys: {id: 'sys', name: '网上商城', entrance: {'default': '默认', backend: '后台添加'}},
                phone: {"id": 'phone', name: '手机客户端', entrance: {'default': '默认'}},
                qq: {id: 'qq', name: '腾讯QQ', entrance: {'default': '默认'}},
                sina: {id: 'sina', name: '新浪微博', entrance: {'default': '默认'}}
            },
            "name": "线上"
        },
        "offline": {
            "id": "offline",
            "values": {
                100: {id: '100', name: '后台导入'}
            },
            "name": "线下"
        }
    }
);

saveObject('PaymentScope', {
    "id": "PaymentScope",
    "description": "支付方式的适用范围",
    "values": [
        {"id": "common", "name": "普通订单"}
    ]});
//地区
saveObject('c_region_1602', {"id":"c_region_1602","parentId":"col_region","pos":"100","title":"中国","name":"中国","columntype":"coltype_RegionMgt"});
addToList('col_region_children','00100','c_region_1602');

saveObject('CommendTypes_product', {"id": "CommendTypes_product", "value": [
    {"name": "最佳组合", "key": "combination"},
    {"name": "购买此商品的人还购买过", "key": "historyBuy"}
]});
saveObject('CommendTypes_info', {"id": "CommendTypes_info", "value": [
    {"name": "相关信息", "key": "i_related"}
]});
