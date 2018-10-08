//#import ps20.js
assertSystem("mall");
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

saveObject('c_10000', {"id":"c_10000","parentId":"col_ProductRoot","title":"所有商品","name":"所有商品","columntype":"coltype_standardProduct","attrTemplateId":"attrTemplate_10000","columnAttrTemplateId":"attrTemplate_20000","pos":"100"});

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
saveObject('ProductValidPublishTimes', {"free": {"time014": {"id": "time014", "name": "14天", "value": "15"}, "time999": {"id": "time999", "isDefault": "true", "name": "永久", "value": "-1"}, "time007": {"id": "time007", "name": "7天", "value": "8"}}, "common": {"time014": {"id": "time014", "name": "14天", "value": "15"}, "time999": {"id": "time999", "isDefault": "true", "name": "永久", "value": "-1"}, "time007": {"id": "time007", "name": "7天", "value": "8"}}, "defaultPublishState": "0"});


//信息管理
//仅仅是单机版的，多商家版还有更多得需要定义
saveObject('col_InfoRoot', {"id":"col_InfoRoot","parentId":"rootcolumn","title":"信息管理","name":"信息管理","columntype":"coltype_Default","pos":"107"});
saveObject('c_info_10000', {"id":"c_info_10000","parentId":"col_InfoRoot","title":"所有信息","name":"所有信息","columntype":"coltype_InfoMgt","pos":"100"});
clearList('col_InfoRoot_children');
addToList('col_InfoRoot_children','00100','c_info_10000');

//商家管理
saveObject('workspace_merchant', {"id":"workspace_merchant","icon":"merchantIcon","name":"商家","modules":"module_Default,module_ColumnMgt,module_MerchantMgt,module_MerchantGradeMgt,module_MerchantAdminsMgt,module_TemplateMgt,module_Organization,module_merchantCategory,module_MerchantEquityTemplatesMgt,module_MerchantEquityRolesMgt,module_MerchantEquityBusinessRangeMgt,module_MerchantEquityOthersMgt","defaultRoot":"col_MerchantRoot"});

addToList('workspaces','workspace_01','workspace_merchant');
saveObject('col_MerchantRoot', {"id":"col_MerchantRoot","parentId":"rootcolumn","title":"商家管理","name":"商家管理","columntype":"coltype_Default","pos":"100"});
saveObject('col_merchant_all', {"id":"col_merchant_all","parentId":"col_MerchantRoot","title":"组织机构主分类","name":"组织机构主分类","columntype":"coltype_Organization","pos":"100"});
saveObject('col_merchant_needcertify_update', {"id":"col_merchant_needcertify_update","parentId":"col_MerchantRoot","title":"修改待审核商家","name":"修改待审核商家","columntype":"coltype_SimpleMerchantMgt","pos":"101"});
saveObject('col_merchant_needcertify_add', {"id":"col_merchant_needcertify_add","parentId":"col_MerchantRoot","title":"新增待审核商家","name":"新增待审核商家","columntype":"coltype_SimpleMerchantMgt","pos":"101"});
saveObject('col_merchant_certify_notPass', {"id":"col_merchant_certify_notPass","parentId":"col_MerchantRoot","title":"审核未通过商家","name":"审核未通过商家","columntype":"coltype_SimpleMerchantMgt","pos":"101"});
saveObject('col_merchant_merchantgrade', {"id":"col_merchant_merchantgrade","parentId":"col_MerchantRoot","title":"商家等级管理","name":"商家等级管理","columntype":"coltype_Default","pos":"102"});
saveObject('col_merchant_sort_root',{id: 'col_merchant_sort_root',title: '商家主分类',name: '商家主分类', pos: '102',parentId: 'col_MerchantRoot',columntype: 'coltype_MerchantSortMgt', attrTemplateId:'attrTemplate_11000'});
saveObject('col_merchant_sort',{id: 'col_merchant_sort',title: '商家主分类',name: '商家主分类', pos: '102',parentId: 'col_MerchantRoot',columntype: 'coltype_Default', attrTemplateId:'attrTemplate_11000'});
saveObject('col_merchant_othersort_root',{id: 'col_merchant_othersort_root',title: '自定义商家分类',name: '自定义商家分类',pos: '103',parentId: 'col_MerchantRoot',columntype: 'coltype_MerchantOtherSortMgt'});
saveObject('col_merchant_othersort',{id: 'col_merchant_othersort',title: '自定义商家分类',name: '自定义商家分类',pos: '103',parentId: 'col_MerchantRoot',columntype: 'coltype_MerchantOtherSortMgt'});

saveObject('col_merGrade_100', {"id":"col_merGrade_100","parentId":"col_merchant_merchantgrade","title":"免费商家","name":"免费商家","columntype":"coltype_MerchantGradeMgt"});
addToList('col_merchant_merchantgrade_children','col_merGrade_100','col_merGrade_100');

clearList("col_MerchantRoot_children");

addToList('col_MerchantRoot_children','00100','col_merchant_all');
addToList('col_MerchantRoot_children','00101','col_merchant_needcertify_update');
addToList('col_MerchantRoot_children','00102','col_merchant_needcertify_add');
addToList('col_MerchantRoot_children','00103','col_merchant_certify_notPass');
addToList('col_MerchantRoot_children','00104','col_merchant_merchantgrade');
addToList('col_MerchantRoot_children','00105','col_merchant_sort_root');
addToList('col_MerchantRoot_children','00106','col_merchant_othersort_root');


//columnTypes
saveObject('coltype_Organization', {"id":"coltype_Organization","defaultActionModule":"module_MerchantMgt","defaultAction":"merchantList","modules":"module_Default,module_Organization,module_MerchantMgt,module_MerchantAdminsMgt"});
saveObject('coltype_Default', {"id":"coltype_Default","modules":"module_Default","defaultActionModule":"module_Default","defaultAction":"default"});
saveObject('coltype_MerchantMgt', {
    id: "coltype_MerchantMgt",
    description: "商家管理",
    defaultActionModule: "module_MerchantMgt",
    defaultAction: "merchantList",
    modules: "module_Default,module_MerchantMgt,module_MerchantAdminsMgt"
});
saveObject('coltype_SimpleMerchantMgt', {
    id: "coltype_SimpleMerchantMgt",
    description: "商家审核管理",
    defaultActionModule: "module_MerchantMgt",
    defaultAction: "merchantList",
    modules: "module_Default,module_MerchantMgt,module_MerchantAdminsMgt"
});
saveObject('coltype_MerchantGradeMgt', {
    id: "coltype_MerchantGradeMgt",
    description: "商家等级管理",
    defaultActionModule: "module_MerchantGradeMgt",
    defaultAction: "columnList",
    modules: "module_Default,module_MerchantGradeMgt"
});
saveObject('coltype_MerchantSortMgt', {
    id: 'coltype_MerchantSortMgt',
    description: "商家主分类管理",
    defaultActionModule: 'module_merchantCategory',
    defaultAction: 'merchantCategoryMgt',
    modules: 'module_Default,module_merchantCategory'
});
saveObject('coltype_MerchantOtherSortMgt', {
    id: 'coltype_MerchantOtherSortMgt',
    description: "商家自定义分类管理",
    defaultActionModule: 'module_merchantCategory',
    defaultAction: 'merchantCategoryMgt',
    modules: 'module_Default,module_merchantCategory'
});

//modules
saveObject('module_Organization', {"id":"module_Organization","name":"组织机构管理","actions":[{"actionData":"organizationBase","name":"基本权限","actionId":"organizationBase"},{"actionData":"organizationAdd","name":"添加组织机构","ismenu":true,"isnavibutton":true,"actionId":"organizationAdd"},{"actionData":"organizationList","name":"列出组织机构","ismenu":true,"isnavibutton":true,"actionId":"organizationList"},{"actionData":"organizationDelete","name":"删除组织机构","actionId":"organizationDelete"},{"actionData":"organizationUpdate","name":"修改组织机构","actionId":"organizationUpdate"},{"actionData":"organizationUpdatePos","name":"修改组织机构排序","actionId":"organizationUpdatePos"},{"actionData":"organizationAdminBind","name":"管理组织机构管理员","actionId":"organizationAdminBind"},{"actionData":"memberAdd","name":"新增会员","actionId":"memberAdd"},{"actionData": "moveMerchantMainColumn","name": "修改商家主分类","actionId": "moveMerchantMainColumn"},{"actionData": "merchantOpen","name": "添加商家服务开通","actionId": "merchantOpen"}]});
addToList('modules','module_Organization','module_Organization');
saveObject('module_Default', {"id":"module_Default","name":"无操作管理","actions":[{"actionData":"displayColumn","name":"显示","ismenu":false,"actionId":"displayColumn"},{"actionData":"default","name":"提醒显示","ismenu":false,"actionId":"default"}]});
addToList('modules','module_Default','module_Default');
saveObject('module_MerchantMgt', {
    "id": "module_MerchantMgt",
    "name": "商家管理",
    "actions": [
        {"actionData": "merchantBase", "name": "商家管理基本权限", "actionId": "merchantBase"},
        {"actionData": "businessRangeBase", "name": "功能范围基本权限", "actionId": "businessRangeBase"},
        {"actionData": "merchantAdd", "name": "添加商家", "ismenu": true, "isnavibutton": true, "actionId": "merchantAdd"},
        {"actionData": "merchantList", "name": "列出商家", "ismenu": true, "isnavibutton": true, "actionId": "merchantList"},
        {"actionData": "merchantUpdate", "name": "修改", "actionId": "merchantUpdate"},
        {"actionData": "merchantDelete", "name": "删除", "actionId": "merchantDelete"},
        {"actionData": "merchantCertify", "name": "审核", "actionId": "merchantCertify"},
        {"actionData": "merchantUpdatePos", "name": "修改排序", "actionId": "merchantUpdatePos"},
        {"actionData": "merchantCheckin", "name": "签入", "actionId": "merchantCheckin"},
        {"actionData": "merchantEnable", "name": "冻结/解冻", "actionId": "merchantEnable"},
        {"actionData": "merchantPublish", "name": "发布/不发布", "actionId": "merchantPublish"},
        {"actionData": "merchantOpen", "name": "服务开通", "actionId": "merchantOpen"},
        {"actionData": "businessRangeDispatch", "name": "功能范围分配", "actionId": "businessRangeDispatch"},
        {"actionData": "objectLogsList", "name": "查看日志", "actionId": "objectLogsList"},
        {"actionData": "SetMerchantState", "name": "状态设置", "actionId": "SetMerchantState"},
        {"actionData": "tipInfo", "name": "商家消息提醒", "actionId": "tipInfo"},
        {"actionData": "moveMerchant", "name": "移动商家组织机构", "actionId": "moveMerchant"},
        {"actionData": "setMerchantMap", "name": "设置商家地理位置", "actionId": "setMerchantMap"}
    ]});
saveObject('module_MerchantAdminsMgt', {
    "id": "module_MerchantAdminsMgt",
    "name": "商家账号管理",
    "actions": [
        {"actionData": "merchantAdminsBase", "name": "基本权限", "actionId": "merchantAdminsBase"},
        {"actionData": "listAdmins", "name": "列出账号", "ismenu": false, "actionId": "listAdmins"},
        {"actionData": "setRootAdmin", "name": "设置母帐号", "ismenu": false, "actionId": "setRootAdmin"},
        {"actionData": "addAdmin", "name": "添加子账号", "ismenu": false, "actionId": "addAdmin"},
        {"actionData": "updateSubAdmin", "name": "修改子帐号", "ismenu": false, "actionId": "updateSubAdmin"},
        {"actionData": "deleteAdmin", "name": "删除子账号", "ismenu": false, "actionId": "deleteAdmin"}
    ]});
addToList('modules', 'module_MerchantMgt', 'module_MerchantMgt');
addToList('modules', 'getGradeByMainColumn', 'getGradeByMainColumn');

saveObject('module_merchantCategory', {"id": "module_merchantCategory", "name": "商家分类管理", "actions": [
    {"actionData": "merchantCategoryMgt", "name": "管理商家分类", "ismenu": true, "isnavibutton": true, "actionId": "merchantCategoryMgt"},
    {"actionData": "merchantCategoryAdd", "name": "添加分类", "actionId": "merchantCategoryAdd"},
    {"actionData": "merchantCategoryList", "name": "列出子分类", "actionId": "merchantCategoryList"},
    {"actionData": "merchantCategoryDelete", "name": "删除分类", "actionId": "merchantCategoryDelete"},
    {"actionData": "merchantCategoryUpdate", "name": "修改分类", "actionId": "merchantCategoryUpdate"},
    {"actionData": "merchantCategoryUpdatePos", "name": "修改分类排序", "actionId": "merchantCategoryUpdatePos"},
    {"actionData": "merchantSortBindGrade", "name": "绑定分类等级", "actionId": "merchantSortBindGrade"}
]});

addToList("modules", "module_merchantCategory", "module_merchantCategory");
saveContent("_sysType_","community");

//支付方式开始
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
//---------------------支付方式结束-----------------------e

//---------------------普通订单状态处理规则----------------------
var orderDispatchRules = {
    "id" : "OrderStateDispatchRule_common_common",
    "col_OrderRoot": {
        "values": [{
            "desc": "处理各种状态下的订单信息",
            "listToStatesDes": "用于订单列表显示按钮",
            "rule": "javascript:order.hasShipping()==false,javascript:order.hasSigned()==false,states.processState.state==p100|p101|p102,javascript:order.needApproval()==false",
            "ruleDesc": "商品行不存在已签收和已出库数量，且订单是未签收和未取消的",
            "listToStates": [{
                "toState": "p111",
                "toAutoStateDeal": true,
                "toStateType": "processState",
                "toStateImage": "delete",
                "toStateName": "取消订单"
            }],
            "toStates": [{
                "toState": "p111",
                "toAutoStateDeal": true,
                "toStateType": "processState",
                "toStateImage": "delete",
                "toStateName": "取消订单"
            }]
        }, {
            "desc": "线上支付，已支付订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "rule": "payType==300,states.processState.state==p100,states.payState.state==p201,javascript:order.needApproval()==false",
            "ruleDesc": "在线支付订单待处理且已支付",
            "listToStates": [{
                "toState": "p101",
                "toStateType": "processState",
                "toStateImage": "validation",
                "toStateName": "确认订单"
            }],
            "toStates": [{
                "toState": "p101",
                "toStateType": "processState",
                "toStateImage": "validation",
                "toStateName": "确认订单"
            }]
        }, {
            "desc": "已审核订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "ruleBak": "states.processState.state==p101,javascript:order.hasShipping()==true;states.processState.state==p101,javascript:order.hasSigned()==true;",
            "rule": "states.processState.state==p101,javascript:order.needApproval()==false",
            "ruleDesc": "订单处于已确认状态，且其商品信息存在已签收或者已出库状态",
            "listToStates": [{
                "toState": "p102",
                "toStateType": "processState",
                "toStateImage": "peisong",
                "toStateName": "已出库"
            }],
            "toStates": [{
                "toState": "p102",
                "toStateType": "processState",
                "toStateImage": "peisong",
                "toStateName": "已出库"
            }]
        }, {
            "desc": "线上支付，已配送订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "ruleBak": "payType==300,states.processState.state==p102,states.payState.state==p201,javascript:order.allSigned()==true",
            "rule": "payType==300,states.processState.state==p102,states.payState.state==p201,javascript:order.needApproval()==false",
            "ruleDesc": "在线支付订单在已出库，且订单已支付和所有商品都已签收",
            "listToStates": [{
                "toState": "p112",
                "toStateType": "processState",
                "toStateImage": "qianshou",
                "toStateName": "已签收"
            }],
            "toStates": [{
                "toState": "p112",
                "toStateType": "processState",
                "toStateImage": "qianshou",
                "toStateName": "已签收"
            }]
        }, {
            "desc": "线下支付，待审核订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "rule": "payType==301,states.processState.state==p100,javascript:order.needApproval()==false",
            "ruleDesc": "线下待处理订单，由客服自已确认订单或者电话顾客确认订单。",
            "listToStates": [{
                "toState": "p101",
                "toStateType": "processState",
                "toStateImage": "validation",
                "toStateName": "确认订单"
            }],
            "toStates": [{
                "toState": "p101",
                "toStateType": "processState",
                "toStateImage": "validation",
                "toStateName": "确认订单"
            }]
        }, {
            "desc": "线下支付，已配送订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "ruleBak": "payType==301,states.processState.state==p102,javascript:order.allSigned()==true",
            "rule": "payType==301,states.processState.state==p102,javascript:order.needApproval()==false",
            "ruleDesc": "线下订单在已出库，且订单所有商品都已签收。",
            "listToStates": [{
                "toState": "p112",
                "toStateType": "processState",
                "toStateImage": "qianshou",
                "toStateName": "已签收"
            }],
            "toStates": [{
                "toState": "p112",
                "toStateType": "processState",
                "toStateImage": "qianshou",
                "toStateName": "已签收"
            }]
        }], "desc": "所有订单"
    }
};
saveObject('OrderStateDispatchRule_common_common', orderDispatchRules);

saveObject('OrderListDispatchRule_common_addOrder_ONLY', {
    "id": "OrderListDispatchRule_common_addOrder_ONLY",
    "values": [{
        "c_o_1000_add2list": ["101", "110"],
        "description": "待支付订单栏目",
        "c_o_m_1000_add2list": ["101", "110"],
        "rule": "payType==300,states.processState.state==p100|p101|p102|p112,states.payState.state==p200;payType==301,states.processState.state==p112,states.payState.state==p200",
        "c_o_u_1000_add2list": ["101", "110"]
    }, {
        "c_o_1000_add2list": ["100", "110"],
        "description": "待确认订单栏目",
        "c_o_m_1000_add2list": ["100", "110"],
        "rule": "payType==300,states.processState.state==p100,states.payState.state==p201;payType==301,states.processState.state==p100",
        "c_o_u_1000_add2list": ["100", "110"]
    }, {
        "c_o_1000_add2list": ["102", "110"],
        "description": "备货中订单栏目",
        "c_o_m_1000_add2list": ["102", "110"],
        "rule": "payType==300,states.processState.state==p101,states.payState.state==p201;payType==301,states.processState.state==p101",
        "c_o_u_1000_add2list": ["102", "110"]
    }]
});

saveObject('OrderListDispatchRule_common_updateOrder_ONLY', {
    "id": "OrderListDispatchRule_common_updateOrder_ONLY",
    "values": [{
        "c_o_1000_add2list": ["101"],
        "description": "待支付订单栏目",
        "c_o_m_1000_add2list": ["101"],
        "rule": "payType==300,states.processState.state==p100|p101|p102|p112,states.payState.state==p200;payType==301,states.processState.state==p112,states.payState.state==p200",
        "c_o_u_1000_add2list": ["101"]
    }, {
        "c_o_1000_add2list": ["100"],
        "description": "待确认订单栏目",
        "c_o_m_1000_add2list": ["100"],
        "rule": "payType==300,states.processState.state==p100,states.payState.state==p201;payType==301,states.processState.state==p100",
        "c_o_u_1000_add2list": ["100"]
    }, {
        "c_o_1000_add2list": ["102"],
        "description": "备货中订单栏目",
        "c_o_m_1000_add2list": ["102"],
        "rule": "payType==300,states.processState.state==p101,states.payState.state==p201;payType==301,states.processState.state==p101",
        "c_o_u_1000_add2list": ["102"]
    }, {
        "c_o_1000_add2list": ["103"],
        "description": "配送中订单栏目",
        "c_o_m_1000_add2list": ["103"],
        "rule": "payType==300,states.processState.state==p102,states.payState.state==p201;payType==301,states.processState.state==p102",
        "c_o_u_1000_add2list": ["103"]
    }, {
        "c_o_1000_add2list": ["105"],
        "description": "拒收未完成订单栏目",
        "c_o_m_1000_add2list": ["105"],
        "rule": "javascript:order.hasRejectedAmount()==true,states.processState.state==p100|p101|p102|p113",
        "c_o_u_1000_add2list": ["105"]
    }, {
        "c_o_1000_add2list": ["106"],
        "description": "缺货未完成订单栏目",
        "c_o_m_1000_add2list": ["106"],
        "rule": "javascript:order.hasShortAmount()==true,states.processState.state==p100|p101",
        "c_o_u_1000_add2list": ["106"]
    }, {
        "c_o_1000_add2list": ["110"],
        "description": "未完成订单栏目",
        "c_o_m_1000_add2list": ["110"],
        "rule": "states.processState.state==p100|p101|p102",
        "c_o_u_1000_add2list": ["110"]
    }, {
        "c_o_1000_add2list": ["112"],
        "description": "已签收订单栏目",
        "c_o_m_1000_add2list": ["112"],
        "rule": "states.processState.state==p112,states.payState.state==p201",
        "c_o_u_1000_add2list": ["112"]
    }, {
        "c_o_1000_add2list": ["111"],
        "description": "已取消订单栏目",
        "c_o_m_1000_add2list": ["111"],
        "rule": "states.processState.state==p111",
        "c_o_u_1000_add2list": ["111"]
    }, {
        "c_o_1000_add2list": ["120"],
        "description": "待审核订单栏目",
        "c_o_m_1000_add2list": ["120"],
        "rule": "states.approvalState.state==a101",
        "c_o_u_1000_add2list": ["120"]
    }]
});

saveObject('OrderRelatedList_common_ONLY', {
    "id": "OrderRelatedList_common_ONLY",
    "c_o_u_1000": [{
        "desc": "买方所拥有的栏目",
        "role": "buyerInfo.userId",
        "orderList": ["100", "101", "102", "103", "104", "105","106", "110", "111", "112"]
    }],
    "c_o_m_1000": [{
        "desc": "卖方所拥有的栏目",
        "role": "sellerInfo.merId",
        "orderList": ["100", "101", "102", "103", "104", "105","106", "110", "111", "112", "120"]
    }],
    "description": "根据订单类型配置相应的订单列表栏目(column表示此订单类型将以哪些栏目为基点.)",
    "columns": ["c_o_1000", "c_o_m_1000", "c_o_u_1000"],
    "c_o_1000": [{
        "description": "表示平台拥有哪些栏目",
        "role": "head_merchant",
        "orderList": ["100", "101", "102", "103", "104", "105","106", "110", "111", "112", "120"]
    }]
});

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


saveObject('OrderStateDispatchRule_common_common_ONLY', {
    "id": "OrderStateDispatchRule_common_common_ONLY",
    "c_o_m_1000_100": {
        "values": [{
            "desc": "确认订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "rule": "payType==301,states.processState.state==p100,javascript:order.isZeroBuyAmount()==false;payType==300,states.processState.state==p100,states.payState.state==p201,javascript:order.needApproval()==false",
            "listToStates": [{
                "toState": "p101",
                "toStateType": "processState",
                "toStateImage": "validation",
                "toStateName": "确认订单"
            }],
            "toStates": [{
                "toState": "p101",
                "toStateType": "processState",
                "toStateImage": "validation",
                "toStateName": "确认订单"
            }]
        }, {
            "desc": "取消订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "rule": "javascript:order.hasShipping()==false,javascript:order.hasSigned()==false,javascript:order.needApproval()==false",
            "listToStates": [{
                "toState": "p111",
                "toAutoStateDeal": true,
                "toStateType": "processState",
                "toStateImage": "delete",
                "toStateName": "取消订单"
            }],
            "toStates": [{
                "toState": "p111",
                "toAutoStateDeal": true,
                "toStateType": "processState",
                "toStateImage": "delete",
                "toStateName": "取消订单"
            }]
        }], "desc": "待审核订单栏目"
    },
    "c_o_m_1000_110": {
        "values": [{
            "desc": "处理各种状态下的订单信息",
            "listToStatesDes": "用于订单列表显示按钮",
            "rule": "javascript:order.hasShipping()==false,javascript:order.hasSigned()==false,states.processState.state==p100|p101|p102,javascript:order.needApproval()==false",
            "ruleDesc": "商品行不存在已签收和已出库数量，且订单是未签收和未取消的",
            "listToStates": [{
                "toState": "p111",
                "toAutoStateDeal": true,
                "toStateType": "processState",
                "toStateImage": "delete",
                "toStateName": "取消订单"
            }],
            "toStates": [{
                "toState": "p111",
                "toAutoStateDeal": true,
                "toStateType": "processState",
                "toStateImage": "delete",
                "toStateName": "取消订单"
            }]
        }, {
            "desc": "线上支付，已支付订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "rule": "payType==300,states.processState.state==p100,states.payState.state==p201,javascript:order.needApproval()==false",
            "ruleDesc": "在线支付订单待处理且已支付",
            "listToStates": [{
                "toState": "p101",
                "toStateType": "processState",
                "toStateImage": "validation",
                "toStateName": "确认订单"
            }],
            "toStates": [{
                "toState": "p101",
                "toStateType": "processState",
                "toStateImage": "validation",
                "toStateName": "确认订单"
            }]
        }, {
            "desc": "已审核订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "ruleBak": "states.processState.state==p101,javascript:order.hasShipping()==true;states.processState.state==p101,javascript:order.hasSigned()==true;",
            "rule": "states.processState.state==p101,javascript:order.needApproval()==false",
            "ruleDesc": "订单处于已确认状态，且其商品信息存在已签收或者已出库状态",
            "listToStates": [{
                "toState": "p102",
                "toStateType": "processState",
                "toStateImage": "peisong",
                "toStateName": "已出库"
            }],
            "toStates": [{
                "toState": "p102",
                "toStateType": "processState",
                "toStateImage": "peisong",
                "toStateName": "已出库"
            }]
        }, {
            "desc": "线上支付，已配送订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "ruleBak": "payType==300,states.processState.state==p102,states.payState.state==p201,javascript:order.allSigned()==true",
            "rule": "payType==300,states.processState.state==p102,states.payState.state==p201,javascript:order.needApproval()==false",
            "ruleDesc": "在线支付订单在已出库，且订单已支付和所有商品都已签收",
            "listToStates": [{
                "toState": "p112",
                "toStateType": "processState",
                "toStateImage": "qianshou",
                "toStateName": "已签收"
            }],
            "toStates": [{
                "toState": "p112",
                "toStateType": "processState",
                "toStateImage": "qianshou",
                "toStateName": "已签收"
            }]
        }, {
            "desc": "线下支付，待审核订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "rule": "payType==301,states.processState.state==p100,javascript:order.needApproval()==false",
            "ruleDesc": "线下待处理订单，由客服自已确认订单或者电话顾客确认订单。",
            "listToStates": [{
                "toState": "p101",
                "toStateType": "processState",
                "toStateImage": "validation",
                "toStateName": "确认订单"
            }],
            "toStates": [{
                "toState": "p101",
                "toStateType": "processState",
                "toStateImage": "validation",
                "toStateName": "确认订单"
            }]
        }, {
            "desc": "线下支付，已配送订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "ruleBak": "payType==301,states.processState.state==p102,javascript:order.allSigned()==true",
            "rule": "payType==301,states.processState.state==p102,javascript:order.needApproval()==false",
            "ruleDesc": "线下订单在已出库，且订单所有商品都已签收。",
            "listToStates": [{
                "toState": "p112",
                "toStateType": "processState",
                "toStateImage": "qianshou",
                "toStateName": "已签收"
            }],
            "toStates": [{
                "toState": "p112",
                "toStateType": "processState",
                "toStateImage": "qianshou",
                "toStateName": "已签收"
            }]
        }], "desc": "未完成订单栏目"
    },
    "c_o_m_1000_111": {"values": [], "desc": "已取消订单栏目"},
    "c_o_m_1000_all": {
        "values": [{
            "desc": "处理各种状态下的订单信息",
            "listToStatesDes": "用于订单列表显示按钮",
            "rule": "javascript:order.hasShipping()==false,javascript:order.hasSigned()==false,states.processState.state==p100|p101|p102,javascript:order.needApproval()==false",
            "ruleDesc": "商品行不存在已签收和已出库数量，且订单是未签收和未取消的",
            "listToStates": [{
                "toState": "p111",
                "toAutoStateDeal": true,
                "toStateType": "processState",
                "toStateImage": "delete",
                "toStateName": "取消订单"
            }],
            "toStates": [{
                "toState": "p111",
                "toAutoStateDeal": true,
                "toStateType": "processState",
                "toStateImage": "delete",
                "toStateName": "取消订单"
            }]
        }, {
            "desc": "线上支付，已支付订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "rule": "payType==300,states.processState.state==p100,states.payState.state==p201,javascript:order.needApproval()==false",
            "ruleDesc": "在线支付订单待处理且已支付",
            "listToStates": [{
                "toState": "p101",
                "toStateType": "processState",
                "toStateImage": "validation",
                "toStateName": "确认订单"
            }],
            "toStates": [{
                "toState": "p101",
                "toStateType": "processState",
                "toStateImage": "validation",
                "toStateName": "确认订单"
            }]
        }, {
            "desc": "已审核订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "ruleBak": "states.processState.state==p101,javascript:order.hasShipping()==true;states.processState.state==p101,javascript:order.hasSigned()==true;",
            "rule": "states.processState.state==p101,javascript:order.needApproval()==false",
            "ruleDesc": "订单处于已确认状态，且其商品信息存在已签收或者已出库状态",
            "listToStates": [{
                "toState": "p102",
                "toStateType": "processState",
                "toStateImage": "peisong",
                "toStateName": "已出库"
            }],
            "toStates": [{
                "toState": "p102",
                "toStateType": "processState",
                "toStateImage": "peisong",
                "toStateName": "已出库"
            }]
        }, {
            "desc": "线上支付，已配送订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "ruleBak": "payType==300,states.processState.state==p102,states.payState.state==p201,javascript:order.allSigned()==true",
            "rule": "payType==300,states.processState.state==p102,states.payState.state==p201,javascript:order.needApproval()==false",
            "ruleDesc": "在线支付订单在已出库，且订单已支付和所有商品都已签收",
            "listToStates": [{
                "toState": "p112",
                "toStateType": "processState",
                "toStateImage": "qianshou",
                "toStateName": "已签收"
            }],
            "toStates": [{
                "toState": "p112",
                "toStateType": "processState",
                "toStateImage": "qianshou",
                "toStateName": "已签收"
            }]
        }, {
            "desc": "线下支付，待审核订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "rule": "payType==301,states.processState.state==p100,javascript:order.needApproval()==false",
            "ruleDesc": "线下待处理订单，由客服自已确认订单或者电话顾客确认订单。",
            "listToStates": [{
                "toState": "p101",
                "toStateType": "processState",
                "toStateImage": "validation",
                "toStateName": "确认订单"
            }],
            "toStates": [{
                "toState": "p101",
                "toStateType": "processState",
                "toStateImage": "validation",
                "toStateName": "确认订单"
            }]
        }, {
            "desc": "线下支付，已配送订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "ruleBak": "payType==301,states.processState.state==p102,javascript:order.allSigned()==true",
            "rule": "payType==301,states.processState.state==p102,javascript:order.needApproval()==false",
            "ruleDesc": "线下订单在已出库，且订单所有商品都已签收。",
            "listToStates": [{
                "toState": "p112",
                "toStateType": "processState",
                "toStateImage": "qianshou",
                "toStateName": "已签收"
            }],
            "toStates": [{
                "toState": "p112",
                "toStateType": "processState",
                "toStateImage": "qianshou",
                "toStateName": "已签收"
            }]
        }], "desc": "所有订单"
    },
    "c_o_m_1000_120": {
        "values": [{
            "desc": "审批订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "rule": "states.approvalState.state==a101",
            "ruleDesc": "只要是需要审批的订单都要出现",
            "listToStates": [{
                "toState": "a102",
                "toAutoStateDeal": true,
                "toStateType": "approvalState",
                "toStateImage": "sptongguo",
                "toStateName": "审批通过"
            }],
            "toStates": [{
                "toState": "a102",
                "toAutoStateDeal": true,
                "toStateType": "approvalState",
                "toStateImage": "sptongguo",
                "toStateName": "审批通过"
            }]
        }], "desc": "修改待审批订单栏目"
    },
    "c_o_m_1000_105": {
        "values": [{
            "desc": "取消订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "rule": "states.processState.state==p100|p101|p102|p113,javascript:order.hasShipping()==false,javascript:order.hasSigned()==false,javascript:order.needApproval()==false",
            "listToStates": [{
                "toState": "p111",
                "toAutoStateDeal": true,
                "toStateType": "processState",
                "toStateImage": "delete",
                "toStateName": "取消订单"
            }],
            "toStates": [{
                "toState": "p111",
                "toAutoStateDeal": true,
                "toStateType": "processState",
                "toStateImage": "delete",
                "toStateName": "取消订单"
            }]
        }], "desc": "拒收未完成订单栏目"
    },
    "c_o_m_1000_106": {
        "values": [{
            "desc": "取消订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "rule": "states.processState.state==p100|p101|p113,javascript:order.hasShipping()==false,javascript:order.hasSigned()==false,javascript:order.needApproval()==false",
            "listToStates": [{
                "toState": "p111",
                "toAutoStateDeal": true,
                "toStateType": "processState",
                "toStateImage": "delete",
                "toStateName": "取消订单"
            }],
            "toStates": [{
                "toState": "p111",
                "toAutoStateDeal": true,
                "toStateType": "processState",
                "toStateImage": "delete",
                "toStateName": "取消订单"
            }]
        }], "desc": "拒收未完成订单栏目"
    },
    "c_o_m_1000_103": {
        "values": [{
            "desc": "线上支付，已配送订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "ruleBak": "payType==300,states.processState.state==p102,states.payState.state==p201,javascript:order.allSigned()==true",
            "rule": "payType==300,states.processState.state==p102,states.payState.state==p201,javascript:order.needApproval()==false",
            "ruleDesc": "在线支付订单在已出库，且订单已支付和所有商品都已签收",
            "listToStates": [{
                "toState": "p112",
                "toStateType": "processState",
                "toStateImage": "qianshou",
                "toStateName": "已签收"
            }],
            "toStates": [{
                "toState": "p112",
                "toStateType": "processState",
                "toStateImage": "qianshou",
                "toStateName": "已签收"
            }]
        }, {
            "desc": "线下支付，已配送订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "ruleBak": "payType==301,states.processState.state==p102,javascript:order.allSigned()==true",
            "rule": "payType==301,states.processState.state==p102,javascript:order.needApproval()==false",
            "ruleDesc": "线下订单在已出库，且订单所有商品都已签收。",
            "listToStates": [{
                "toState": "p112",
                "toStateType": "processState",
                "toStateImage": "qianshou",
                "toStateName": "已签收"
            }],
            "toStates": [{
                "toState": "p112",
                "toStateType": "processState",
                "toStateImage": "qianshou",
                "toStateName": "已签收"
            }]
        }, {
            "desc": "取消订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "rule": "states.processState.state==p100|p101|p102,javascript:order.hasShipping()==false,javascript:order.hasSigned()==false,javascript:order.needApproval()==false",
            "listToStates": [{
                "toState": "p111",
                "toAutoStateDeal": true,
                "toStateType": "processState",
                "toStateImage": "delete",
                "toStateName": "取消订单"
            }],
            "toStates": [{
                "toState": "p111",
                "toAutoStateDeal": true,
                "toStateType": "processState",
                "toStateImage": "delete",
                "toStateName": "取消订单"
            }]
        }], "desc": "已出库订单栏目"
    },
    "c_o_m_1000_102": {
        "values": [{
            "desc": "配送或者取消订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "ruleBak": "states.processState.state==p101,javascript:order.hasShipping()==true;states.processState.state==p101,javascript:order.hasSigned()==true;",
            "rule": "states.processState.state==p101,javascript:order.needApproval()==false",
            "listToStates": [{
                "toState": "p102",
                "toStateType": "processState",
                "toStateImage": "peisong",
                "toStateName": "已出库"
            }],
            "toStates": [{
                "toState": "p102",
                "toStateType": "processState",
                "toStateImage": "peisong",
                "toStateName": "已出库"
            }]
        }, {
            "desc": "取消订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "rule": "states.processState.state==p100|p101|p102,javascript:order.hasShipping()==false,javascript:order.hasSigned()==false,javascript:order.needApproval()==false",
            "listToStates": [{
                "toState": "p111",
                "toAutoStateDeal": true,
                "toStateType": "processState",
                "toStateImage": "delete",
                "toStateName": "取消订单"
            }],
            "toStates": [{
                "toState": "p111",
                "toAutoStateDeal": true,
                "toStateType": "processState",
                "toStateImage": "delete",
                "toStateName": "取消订单"
            }]
        }], "desc": "备货中订单栏目"
    },
    "c_o_m_1000_101": {
        "values": [{
            "desc": "线上支付订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "rule": "payType==300,states.processState.state==p100|p101|p102|p112,states.payState.state==p200,javascript:order.needApproval()==false",
            "listToStates": [{
                "toState": "p201",
                "toAutoStateDeal": true,
                "toStateType": "payState",
                "toStateImage": "confirmPay",
                "toStateName": "确认收款"
            }],
            "toStates": [{
                "toState": "p201",
                "toAutoStateDeal": true,
                "toStateType": "payState",
                "toStateImage": "confirmPay",
                "toStateName": "确认收款"
            }]
        }, {
            "desc": "线下支付订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "rule": "payType==301,states.processState.state==p112,states.payState.state==p200,javascript:order.needApproval()==false",
            "listToStates": [{
                "toState": "p201",
                "toAutoStateDeal": true,
                "toStateType": "payState",
                "toStateImage": "confirmPay",
                "toStateName": "确认收款"
            }],
            "toStates": [{
                "toState": "p201",
                "toAutoStateDeal": true,
                "toStateType": "payState",
                "toStateImage": "confirmPay",
                "toStateName": "确认收款"
            }]
        }, {
            "desc": "取消订单",
            "listToStatesDes": "用于订单列表显示按钮",
            "rule": "states.processState.state==p100|p101|p102,javascript:order.hasShipping()==false,javascript:order.hasSigned()==false,javascript:order.needApproval()==false",
            "listToStates": [{
                "toState": "p111",
                "toAutoStateDeal": true,
                "toStateType": "processState",
                "toStateImage": "delete",
                "toStateName": "取消订单"
            }],
            "toStates": [{
                "toState": "p111",
                "toAutoStateDeal": true,
                "toStateType": "processState",
                "toStateImage": "delete",
                "toStateName": "取消订单"
            }]
        }], "desc": "待支付订单栏目"
    }
});

saveObject('OrderStateModifyRule_common_common_ONLY', {
    "id": "OrderStateModifyRule_common_common_ONLY",
    "values": [{
        "description": "待审核订单",
        "rule": "states.processState.state==p100",
        "toStates": {
            "processState_p111": {"allow": true},
            "processState_p112": {"allow": true},
            "processState_p101": {"allow": true},
            "processState_p102": {"allow": true}
        }
    }, {
        "description": "已确认订单",
        "rule": "states.processState.state==p101",
        "toStates": {
            "processState_p111": {"allow": true},
            "processState_p112": {"allow": true},
            "processState_p101": {"allow": false, "info": "订单已经确认，无需重复操作（您可以再次搜索订单以显示最新订单列表信息）。"},
            "processState_p102": {"allow": true}
        }
    }, {
        "description": "配送中订单",
        "rule": "states.processState.state==p102",
        "toStates": {
            "processState_p111": {"allow": true},
            "processState_p112": {"allow": true},
            "processState_p113": {"allow": true},
            "processState_p101": {"allow": true},
            "processState_p102": {"allow": false, "info": "订单已经处于配送中，无需重复操作（您可以再次搜索订单以显示最新订单列表信息）。"}
        }
    }, {
        "description": "已拒收订单",
        "rule": "states.processState.state==p113",
        "toStates": {
            "processState_p102": {"allow": true},
            "processState_p111": {"allow": true},
            "processState_p113": {"allow": false, "info": "订单已经处于已拒收状态，无需重复操作（您可以再次搜索订单以显示最新订单列表信息）。"}
        }
    }, {
        "description": "已取消订单",
        "rule": "states.processState.state==p111",
        "toStates": {
            "processState_p111": {"allow": false, "info": "订单已经取消，无需重复操作（您可以再次搜索订单以显示最新订单列表信息）。"},
            "refundState_p303": {"allow": true}
        }
    }, {
        "description": "待支付订单",
        "rule": "states.payState.state==p200",
        "toStates": {
            "payState_p201": {"allow": true},
            "payState_p202": {"allow": true},
            "payState_p203": {"allow": true}
        }
    }, {
        "description": "部分支付订单",
        "rule": "states.payState.state==p202",
        "toStates": {
            "payState_p201": {"allow": true},
            "payState_p202": {"allow": false, "info": "订单已经是部分支付，无需重复操作（您可以再次搜索订单以显示最新订单列表信息）。"},
            "payState_p203": {"allow": true}
        }
    }, {
        "description": "已支付订单",
        "rule": "states.payState.state==p201",
        "toStates": {
            "payState_p200": {"allow": true},
            "payState_p201": {"allow": false, "info": "订单已经支付，无需重复操作（您可以再次搜索订单以显示最新订单列表信息）。"},
            "payState_p203": {"allow": true}
        }
    }, {
        "description": "待审批订单",
        "rule": "states.approvalState.state==a101",
        "toStates": {
            "approvalState_a102": {"allow": true},
            "approvalState_a101": {"allow": false, "info": "订单已经审批通过，无需重复操作（您可以再次搜索订单以显示最新订单列表信息）。"}
        }
    }, {
        "description": "需要审批订单",
        "rule": "states.approvalState.state==a100|p1|a102",
        "toStates": {"approvalState_a101": {"allow": true}}
    }],
    "description": "普通商家，普通订单"
});
saveObject('OrderStateModifyRule_platform_common_ONLY', {
    "id": "OrderStateModifyRule_platform_common_ONLY",
    "values": [{
        "description": "全部的操作权限",
        "rule": "",
        "toStates": {
            "payState_p200": {"allow": true},
            "processState_p111": {"allow": true},
            "payState_p201": {"allow": true},
            "processState_p113": {"allow": true},
            "processState_p112": {"allow": true},
            "approvalState_a102": {"allow": true},
            "payState_p202": {"allow": true},
            "payState_p203": {"allow": true},
            "refundState_p303": {"allow": true},
            "processState_p100": {"allow": true},
            "processState_p101": {"allow": true},
            "processState_p102": {"allow": true}
        }
    }],
    "description": "平台，普通订单"
});
saveObject('OrderStateModifyRule_user_common_ONLY', {
    "id": "OrderStateModifyRule_user_common_ONLY",
    "values": [{
        "description": "待审核订单",
        "rule": "states.processState.state==p100,javascript:order.needApproval()==false",
        "toStates": {"processState_p111": {"allow": true}}
    }, {
        "description": "已确认订单",
        "rule": "states.processState.state==p101,javascript:order.needApproval()==false",
        "toStates": {"processState_p112": {"allow": true}}
    }, {
        "description": "配送中订单",
        "rule": "states.processState.state==p102,javascript:order.needApproval()==false",
        "toStates": {"processState_p112": {"allow": true}}
    }, {
        "description": "待支付订单",
        "rule": "states.payState.state==p200,javascript:order.needApproval()==false",
        "toStates": {"payState_p201": {"allow": true}}
    }],
    "description": "用户，普通订单"
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

saveObject('c_o_1004', {"id":"c_o_1004","parentId":"col_OrderRoot","title":"退款管理","name":"退款管理","columntype":"coltype_Default"});
saveObject('c_o_1004_100', {"id":"c_o_1004_100","parentId":"c_o_1004","title":"退货退款单","name":"退货退款单","columntype":"coltype_order_refund_return","pos":100});
saveObject('c_o_1004_200', {"id":"c_o_1004_200","parentId":"c_o_1004","title":"订单变更退款单","name":"订单变更退款单","columntype":"coltype_order_refund_change","pos":101});
saveObject('c_o_1004_300', {"id":"c_o_1004_300","parentId":"c_o_1004","title":"订单取消退款单","name":"订单取消退款单","columntype":"coltype_order_refund_cancel","pos":102});
saveObject('c_o_1004_400', {"id":"c_o_1004_400","parentId":"c_o_1004","title":"其他原因退款单","name":"其他原因退款单","columntype":"coltype_order_refund_reason","pos":103});
addToList('c_o_1004_children','00100','c_o_1004_100');
addToList('c_o_1004_children','00101','c_o_1004_200');
addToList('c_o_1004_children','00102','c_o_1004_300');
addToList('c_o_1004_children','00103','c_o_1004_400');

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

//给商家分配默认应用
var merchantRightTemplate = {
    "id": "rightsTemplate_10000",
    "name": "默认商家权益",
    "apps": [
        {
            "name": "模板编辑器",
            "description": "",
            "icon": "http://img1.is1.com.cn/2015/6/24/8740007.png",
            "appId": "appEditor"
        },
        {
            "name": "支付方式设置",
            "description": "",
            "icon": "http://img1.is1.com.cn/2015/6/26/8780018.png",
            "appId": "paymentSetting"
        },
        {
            "name": "商品",
            "description": "",
            "icon": "http://img1.is1.com.cn/2015/6/24/8740015.png",
            "appId": "productApp"
        },
        {
            "name": "权限管理",
            "description": "",
            "icon": "http://img1.is1.com.cn/2014/12/16/5490005.png",
            "appId": "saasPrivilegeApp"
        },
        {
            "name": "应用权限",
            "description": "",
            "icon": "http://img1.is1.com.cn/2015/1/14/6190020.png",
            "appId": "appPrivilegeApp"
        },
        {
            "name": "品牌选择器",
            "description": "",
            "icon": "http://img1.is1.com.cn/2014/1/9/90021.png",
            "appId": "brandSelector"
        },
        {
            "name": "品牌库",
            "description": "",
            "icon": "http://img1.is1.com.cn/2014/1/9/90020.png",
            "appId": "brandLibrary"
        },
        {
            "name": "订购流程",
            "description": "",
            "icon": "http://img1.is1.com.cn/2014/12/16/5490005.png",
            "appId": "buyflowApp"
        },
        {
            "name": "配送管理",
            "description": "",
            "icon": "http://img1.is1.com.cn/2015/6/24/8740009.png",
            "appId": "delivery"
        },
        {
            "name": "文件浏览器",
            "description": "",
            "icon": "http://img1.is1.com.cn/2014/1/9/90020.png",
            "appId": "fileBrowserApp"
        },
        {
            "name": "文件管理器",
            "description": "",
            "icon": "http://img1.is1.com.cn/2014/1/9/90021.png",
            "appId": "fileManager"
        },
        {
            "name": "ewjTemplate",
            "description": "",
            "icon": "http://img1.is1.com.cn/2014/12/16/5490005.png",
            "appId": "ewjTemplate"
        },
        {
            "name": "登陆注册",
            "description": "",
            "icon": "http://img1.is1.com.cn/2014/12/16/5490005.png",
            "appId": "infoscapeLogin"
        },
        {
            "name": "登录模版",
            "description": "",
            "icon": "http://img1.is1.com.cn/2014/12/16/5490005.png",
            "appId": "loginTemplate"
        },
        {
            "name": "微信商城",
            "description": "",
            "icon": "http://img1.is1.com.cn/2014/1/9/90020.png",
            "appId": "mobileApp"
        },
        {
            "name": "商品类别选择器",
            "description": "",
            "icon": "http://img1.is1.com.cn/2014/1/9/90021.png",
            "appId": "productCategorySelector"
        },
        {
            "name": "地区选择器",
            "description": "",
            "icon": "http://img1.is1.com.cn/2015/1/13/6150048.png",
            "appId": "regionSelector"
        },
        {
            "name": "地区服务",
            "description": "",
            "icon": "http://img1.is1.com.cn/2015/6/24/8740001.png",
            "appId": "regionServer"
        },
        {
            "name": "地区服务选择器",
            "description": "",
            "icon": "http://img1.is1.com.cn/2015/6/24/8740001.png",
            "appId": "regionSwitcher"
        },
        {
            "name": "桌面",
            "description": "",
            "icon": "http://img1.is1.com.cn/2015/4/3/7200037.png",
            "appId": "shell20"
        },
        {
            "name": "装修微信商城",
            "description": "",
            "icon": "http://img1.is1.com.cn/2014/1/9/90020.png",
            "appId": "yongfuMobileTemplate"
        }
    ]
};
saveObject("rightsTemplate_10000",merchantRightTemplate);
addToList("allRightsTemplates","rightsTemplate_10000","rightsTemplate_10000");

var rightsRule = {
        "id": "rightsDispatchRule_10000",
        "name": "默认商家权益",
        "orgId": "col_merchant_all",
        "orgName": ">组织机构主分类",
        "mainCategoryId": "col_merchant_sort",
        "mainCategoryName": ">商家主分类",
        "templateId": "rightsTemplate_10000",
        "templateName": "默认商家权益"
};
saveObject("rightsDispatchRule_10000",rightsRule);
addToList("allRightsDispatchRules","rightsDispatchRule_10000","rightsDispatchRule_10000");

saveObject('CommendTypes_product', {"id": "CommendTypes_product", "value": [
    {"name": "最佳组合", "key": "combination"},
    {"name": "购买此商品的人还购买过", "key": "historyBuy"}
]});
saveObject('CommendTypes_info', {"id": "CommendTypes_info", "value": [
    {"name": "相关信息", "key": "i_related"}
]});
saveObject('col_merchant_sort',{id: 'col_merchant_sort',title: '商家主分类',name: '商家主分类', pos: '102',parentId: 'col_MerchantRoot',columntype: 'coltype_Default', attrTemplateId:'attrTemplate_merchant_sort'});
//信用相关的系统参数
saveObject('c_argument_creditConfig', {"id": "c_argument_creditConfig", "parentId": "col_sysargument_root", "title": "信用评价参数管理", "name": "信用评价参数管理", "columntype": "coltype_sysargument"});

//商品评论相关的系统参数
saveObject('head_merchant_c_argument_creditConfig_sysargument', {
      "id": "head_merchant_c_argument_creditConfig_sysargument",
      "values": {
          "mPositiveCommentEffectType": {
              description: "商家的好评信用评价生效机制，默认为1，1：立即生效，2：审核通过后生效，3：按设定的日期生效",
              name: "商家信用好评生效机制",
              value: "1",
              type: "0",
              isSys: true,
              key: "mPositiveCommentEffectType",
              merFilter: true,
              businessType: '信用评价相关参数',
              pos: 101,
              checkboxVal: [
                  {checkboxNum: "1", checkboxName: "立即生效"},
                  {checkboxNum: "2", checkboxName: "审核通过后生效"},
                  {checkboxNum: "3", checkboxName: "按设定的日期生效"}
              ],
              isMultipleChoice: "N"
          },
          "mPositiveCommentEffectTime": {
              "description": "单位为天，买家对商家的好评信用评价生效时间，默认为7天(注：只有商家的好评信用评价生效机制为按设定的日期生效时适用)",
              "name": "商家信用好评生效时间",
              "value": "7",
              "type": "0",
              "isSys": true,
              "key": "mPositiveCommentEffectTime",
              businessType: "信用评价相关参数",
              pos: 102
          },
          "mModerateCommentEffectType": {
              description: "商家的中评信用评价生效机制，默认为1，1：立即生效，2：审核通过后生效，3：按设定的日期生效",
              name: "商家信用中评生效机制",
              value: "1",
              type: "0",
              isSys: true,
              key: "mModerateCommentEffectType",
              merFilter: true,
              businessType: '信用评价相关参数',
              pos: 103,
              checkboxVal: [
                  {checkboxNum: "1", checkboxName: "立即生效"},
                  {checkboxNum: "2", checkboxName: "审核通过后生效"},
                  {checkboxNum: "3", checkboxName: "按设定的日期生效"}
              ],
              isMultipleChoice: "N"
          },
          "mModerateCommentEffectTime": {
              "description": "单位为天，买家对商家的中评信用评价生效时间，默认为7天(注：只有商家的中评信用评价生效机制为按设定的日期生效时适用)",
              "name": "商家信用中评生效时间",
              "value": "7",
              "type": "0",
              "isSys": true,
              "key": "mModerateCommentEffectTime",
              businessType: "信用评价相关参数",
              pos: 104
          },
          "mNegativeCommentEffectType": {
              description: "商家的差评信用评价生效机制，默认为1，1：立即生效，2：审核通过后生效，3：按设定的日期生效",
              name: "商家信用差评生效机制",
              value: "1",
              type: "0",
              isSys: true,
              key: "mNegativeCommentEffectType",
              merFilter: true,
              businessType: '信用评价相关参数',
              pos: 105,
              checkboxVal: [
                  {checkboxNum: "1", checkboxName: "立即生效"},
                  {checkboxNum: "2", checkboxName: "审核通过后生效"},
                  {checkboxNum: "3", checkboxName: "按设定的日期生效"}
              ],
              isMultipleChoice: "N"
          },
          "mNegativeCommentEffectTime": {
              "description": "单位为天，买家对商家的差评信用评价生效时间，默认为7天(注：只有商家的差评信用评价生效机制为按设定的日期生效时适用)",
              "name": "商家信用差评生效时间",
              "value": "7",
              "type": "0",
              "isSys": true,
              "key": "mNegativeCommentEffectTime",
              businessType: "信用评价相关参数",
              pos: 106
          },
          "autoPositiveCommentTime": {
              "description": "单位为天，买家确认收货后没有评论系统自动好评的时间，默认为3天",
              "name": "自动好评时间",
              "value": "3",
              "type": "0",
              "isSys": true,
              "key": "autoPositiveCommentTime",
              businessType: "信用评价相关参数",
              pos: 110
          },
          "autoPositiveCommentContent": {
              "description": "对于系统自动好评的评价，在没有评价内容的情况下显示的评价内容",
              "name": "自动好评默认显示的评价内容",
              "value": "好评",
              "type": "0",
              "isSys": true,
              "key": "autoPositiveCommentContent",
              businessType: "信用评价相关参数",
              pos: 111
          }
      },
      "columnId": "c_argument_creditConfig",
      "merchantId": "head_merchant"
  }
);
