<%@ page import="net.xinshi.isone.modules.merchant.MerchantSysArgumentUtil" %>
<%@ page import="net.xinshi.isone.modules.merchant.IMerchantService" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="net.xinshi.isone.modules.IsoneModulesEngine" %>
<%@ page import="net.xinshi.isone.commons.Global" %>
<%@ page import="net.xinshi.isone.modules.sysargument.SysArgumentUtil" %>
<%@ page import="net.xinshi.isone.base.IsoneBaseEngine" %>
<%@ page import="net.xinshi.isone.openapi.app.impl.Is1LoginAppService" %>
<%@ page import="java.util.List" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="net.xinshi.isone.functions.sysargument.SysArgumentFunction" %>
<%@ page import="net.xinshi.isone.functions.servicestore.ServiceStoreFunction" %>
<%@ page import="java.util.Random" %>
<%@page contentType="text/html; charset=UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fun" uri="http://www.infoscape.com.cn/integrateweb/frontEndFunctions" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="tc" uri="http://www.infoscape.com.cn/template/core" %>

<%
    StringBuilder randomStr = new StringBuilder();
    Random random = new Random();
    for(int i=0;i<6;i++){
        randomStr.append(random.nextInt(10));
    }
    String registerTokenCode = randomStr.toString();
    request.setAttribute("registerTokenCode", registerTokenCode);
    IsoneBaseEngine.sessionService.addSessionValue("registerTokenCode", registerTokenCode, request, response);

    request.setAttribute("rootId", IMerchantService.COLUMNID_MERCHANT_ALL);
    JSONObject jArgument = IsoneModulesEngine.sysArgumentService.getSysArgument(Global.HEAD_MERCHANT, "col_sysargument_loginservice");
    JSONObject jArgumentValues = SysArgumentUtil.getValues(jArgument);
    long mode = SysArgumentUtil.getSysArgumentLongValue(jArgumentValues,"mode");
    String userId = IsoneBaseEngine.sessionService.getSessionValue("userId",request);
    request.setAttribute("userId", userId);
    if(mode== Is1LoginAppService.Integration_Mode_Slav){
        response.sendRedirect("/openloginClient/register.jsp");
        return;
    }
    //页面随机数，以下是为了保证发送短信页面是由当前页面提交的
    String pageValidateCode = getPageRandomString();
    String pageValidateCodeValueAt = getPageRandomValueAt();
    String pageValidateCodeValue = getPageRandomValue(pageValidateCode, pageValidateCodeValueAt);
    IsoneBaseEngine.sessionService.addSessionValue("registerPhoneValidateCode", pageValidateCode, request, response);
    IsoneBaseEngine.sessionService.addSessionValue("registerPhoneValidateCodeValueAt", pageValidateCodeValueAt, request, response);
    request.setAttribute("pageValidateCode", "0." + pageValidateCode);
    request.setAttribute("pageValidateCodeValue", pageValidateCodeValue);

    JSONObject jResult = new JSONObject();
    jResult.put("pageValidateCode", "0." + pageValidateCode);
    jResult.put("pageValidateCodeValue", pageValidateCodeValue);
    out.print(jResult.toString());
%>

<%!
    static String PAGE_RAND_STRING = "0123456789";
    static int PAGE_RAND_LENGTH = 30;
    static int PAGE_VALUE_LENGTH = 10;

    String getPageRandomString() {
        Random random = new Random();
        StringBuilder rand = new StringBuilder();
        for (int i = 0; i < PAGE_RAND_LENGTH; i++) {

            rand.append(String.valueOf(PAGE_RAND_STRING.charAt(random.nextInt(10))));
        }

        return rand.toString();
    }

    String getPageRandomValueAt() {
        Random random = new Random();
        StringBuilder rand = new StringBuilder();
        for (int i = 0; i < PAGE_VALUE_LENGTH; i++) {
            if (rand.length() == 0) {
                rand.append(random.nextInt(PAGE_RAND_LENGTH));
            } else {
                rand.append(",").append(random.nextInt(PAGE_RAND_LENGTH));
            }
        }
        return rand.toString();
    }

    String getPageRandomValue(String pageValidateCode, String pageValidateCodeValueAt) {
        StringBuilder pageValidateCodeValueBegin = new StringBuilder();
        StringBuilder pageValidateCodeValueEnd = new StringBuilder();
        String[] valueAt = pageValidateCodeValueAt.split("[,]");
        for (int i = 0; i < valueAt.length; i++) {
            int iAt = Integer.parseInt(valueAt[i]);
            if (i % 2 == 0) {
                pageValidateCodeValueBegin.append(String.valueOf(pageValidateCode.charAt(iAt)));
            } else {
                pageValidateCodeValueEnd.append(String.valueOf(pageValidateCode.charAt(iAt)));
            }
        }

        return pageValidateCodeValueBegin.append(pageValidateCodeValueEnd).toString();
    }

%>