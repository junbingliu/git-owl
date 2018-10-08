<%@page contentType="text/html; charset=UTF-8" %>
<%@ page import="net.xinshi.isone.commons.DigestUtil" %>
<%@ page import="net.xinshi.isone.commons.Util" %>
<%@ page import="net.xinshi.isone.functions.sysargument.SysArgumentFunction" %>
<%@ page import="net.xinshi.isone.modules.IsoneModulesEngine" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="java.net.URLEncoder" %>
<%@ page import="net.xinshi.isone.modules.exchangeapi.client.UserHttpHandler" %>
<%@ page import="net.xinshi.isone.modules.merchant.MerchantSysArgumentUtil" %>
<%@ page import="net.xinshi.isone.modules.noticeTrigger.NoticeConstants" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<c:set value="${pageContext.request.contextPath}" var="frontPath"/>
<%
    try {
        JSONObject jResult = new JSONObject();
        String email = request.getParameter("email");
        if (StringUtils.isEmpty(email) && StringUtils.isBlank(email)) {
            jResult.put("state", "0");
            jResult.put("msg", "邮箱为空");
            out.print(jResult);
            return;
        }

        if (!Util.isMatcher(email, "^(([_a-zA-Z0-9\\-]+(\\.[_a-zA-Z0-9\\-]*)*@[a-zA-Z0-9\\-]+([\\.][a-zA-Z0-9\\-]+)+))$")) {
            jResult.put("state", "13");
            jResult.put("msg", "邮箱格式错误");
            out.print(jResult);
            return;
        }
        if (Util.isMatcher(email, "[\u4e00-\u9fa5]")) {
            jResult.put("state", "9");
            jResult.put("msg", "邮箱格式错误");
            out.print(jResult);
            return;
        }


        JSONObject jUser = IsoneModulesEngine.memberService.getUserByKey(email);

        request.setAttribute("user", jUser);

        String userId = jUser.optString("id");
        //默认设置为普通会员

        JSONObject jWebUrl = SysArgumentFunction.getSysArgument("head_merchant", "col_sysargument", "webUrl");
        double num = (Math.random() * 9000 + 1000);
        int sRand = (int) num;
        int enableCode = Integer.valueOf(sRand);
        String loginId = jUser.optString("loginId");
        if(StringUtils.isBlank(loginId)){
            loginId = jUser.optString("id");
        }
        String params = "loginid=" + loginId + "&email=" + email + "&enableCode=" + enableCode;
        DigestUtil du = new DigestUtil();
        String encond = "";
        encond = du.digestString(params, "SHA");
        encond = URLEncoder.encode(encond, "UTF-8");
        if (jUser != null) {
            String emailResult = IsoneModulesEngine.memberService.judgeMemberField(email);
            if (!emailResult.equals("null") && !emailResult.equals(userId)) {
                jResult.put("state", "16");
                jResult.put("msg", "该邮箱已被占用");
                out.print("2");
                return;
            }
            jUser.put("email",email);

            jUser.put("encond", encond);
            jUser.put("enableCode", enableCode);
            jUser.put("checkedemailStatus", "0"); //设置邮箱未激活
            jUser.put("validateEmailTime", System.currentTimeMillis());  //设置发送时间，一遍过期。
            //判断是否使用会员登录系统
            boolean isEnableUC = MerchantSysArgumentUtil.isEnableUCenterSys();
            if (isEnableUC) {
                JSONObject jArgs=new JSONObject();
                jArgs.put("email", email);
                jArgs.put("encond", encond);
                jArgs.put("enableCode", enableCode);
                jArgs.put("checkedemailStatus", "0");
                jArgs.put("validateEmailTime", System.currentTimeMillis());
                JSONObject result = UserHttpHandler.synUpdateUserInfo(userId, jArgs);
                if(result != null){
                    String status=result.optString("status");
                    if(!"0".equals(status)){
                        jResult.put("state", "15");
                        jResult.put("msg", "验证失败");
                        out.print("2");
                        return;
                    }
                }
            }
            IsoneModulesEngine.memberService.updateUser(jUser, userId);

            JSONObject jLabel = new JSONObject();
            jLabel.put("\\[user:name\\]", "<b>" + loginId + "</b>");
            String activeUrl = jWebUrl.optString("value") + "/appMarket/appEditor/email_activation_handler.jsp?loginid=" + loginId + "&encond=" + encond + "&email=" + email;
            jLabel.put("\\[validateInfo\\]", activeUrl);
            IsoneModulesEngine.noticeTrigger.sendNotice(userId, email, NoticeConstants.VALIDATE_CODE_SEND_NOTICE, "head_merchant", jLabel);
            jResult.put("state", "ok");
            jResult.put("msg", "验证成功");
            jResult.put("userId",userId);
            out.print(jResult);
        } else {
            jResult.put("state", "failed");
            jResult.put("msg", "验证失败");
            out.print(jResult);
        }

    } catch (Exception e) {
        e.printStackTrace();
        out.print("8"); //系统繁忙，请稍后重试
    }

%>


