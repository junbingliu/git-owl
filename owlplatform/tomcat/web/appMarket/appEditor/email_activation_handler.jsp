<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="net.xinshi.isone.commons.Global" %>
<%@ page import="net.xinshi.isone.modules.IsoneModulesEngine" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="java.net.URLEncoder" %>
<%@ page import="net.xinshi.isone.commons.DigestUtil" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.List" %>
<%@ page import="net.xinshi.isone.modules.user.LoginSessionUtils" %>
<%@ page import="net.xinshi.isone.modules.user.UserUtil" %>
<%@ page import="net.xinshi.isone.modules.businessruleEx.IsoneBusinessRuleEngineEx" %>
<%@ page import="net.xinshi.isone.modules.businessruleEx.rule.bean.Behavior" %>
<%@ page import="net.xinshi.isone.modules.user.LoginSessionUtils" %>
<%@ page import="net.xinshi.isone.modules.exchangeapi.client.UserHttpHandler" %>
<%@ page import="net.xinshi.isone.modules.merchant.MerchantSysArgumentUtil" %>
<%
    try {
        String contextPath = request.getContextPath();
        String loginid = request.getParameter("loginid");
        String loginidResult = IsoneModulesEngine.memberService.judgeMemberField(loginid);
        JSONObject jUser = IsoneModulesEngine.memberService.getUser(loginidResult);
        String userId = jUser.optString("id");
        if (jUser.optString("checkedemailStatus").equals("1")) {
            out.print("<script>window.location.href='/merchantEmailValidateResult?result=failed&msg=您已经验证完成，不需要重复验证！';</script>");
            return;
        }

        String isEnable = jUser.optString("isEnable");
        String objEnableCode = jUser.optString("encond");
        String enableCode = jUser.optString("enableCode");
        String email = request.getParameter("email");
        String encond = "";
        encond = request.getParameter("encond") == null ? "" : request.getParameter("encond");
        encond = URLEncoder.encode(encond, "UTF-8");
        DigestUtil du = new DigestUtil();
        String params = "loginid=" + loginid + "&email=" + email + "&enableCode=" + enableCode;

        String StrEncond = "";
        StrEncond = du.digestString(params, "SHA");
        StrEncond = URLEncoder.encode(StrEncond, "UTF-8");
        String msg = "";
        if (StringUtils.isBlank(loginid) || StringUtils.isBlank(encond)) {
            out.print("<script>location.href=/merchantEmailValidateResult?result=failed&msg=参数有误'</script>");

            return;
        }

        if (loginidResult.equals("null")) {
            IsoneModulesEngine.memberService.updateUser(jUser, userId);
            out.print("<script>location.href='/merchantEmailValidateResult?result=failed&msg=需要激活的账号不存在!'</script>");
            return;
        }

        if (jUser == null) {
            IsoneModulesEngine.memberService.updateUser(jUser, userId);
            out.print("<script>location.href='/merchantEmailValidateResult?result=failed&msg=需要激活的账号不存在!'</script>");
            return;
        }

        if (!objEnableCode.equalsIgnoreCase(StrEncond)) {
            jUser.remove("validateEmailTime");
            IsoneModulesEngine.memberService.updateUser(jUser, userId);
            out.print("<script>location.href='/merchantEmailValidateResult?result=failed&msg=激活验证码不一致!'</script>");
            return;
        }
        String grade = jUser.optString("grade");
        String gradeRecord = jUser.optString("gradeRecord");
        int myGrade = 0;
        if (!StringUtils.isBlank(grade)) {
            myGrade = Integer.parseInt(grade);
        }
        if (StringUtils.isBlank(gradeRecord)) {
            myGrade += 20;
        }
        grade = String.valueOf(myGrade);
        jUser.put("grade", grade);
        jUser.put("checkedemailStatus", "1");
        jUser.remove("validateEmailTime");
        jUser.put("email", email);
        Date date = new Date();
        SimpleDateFormat objSDF = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        jUser.put("lastModifiedTime", objSDF.format(date)); //修改最后时间
        //判断是否使用会员登录系统
        boolean isEnableUC = MerchantSysArgumentUtil.isEnableUCenterSys();
        if (isEnableUC) {
            JSONObject jArgs = new JSONObject();
            jArgs.put("grade", grade);
            jArgs.put("email", email);
            jArgs.put("checkedemailStatus", "1");
            jArgs.put("lastModifiedTime", objSDF.format(date));
            JSONObject jResult = UserHttpHandler.synUpdateUserInfo(userId, jArgs);
            if (jResult != null) {
                String status = jResult.optString("status");
                if (!"0".equals(status)) {
                    out.print("<script>location.href='/merchantEmailValidateResult?result=failed&msg=系统繁忙 !'</script>");
                    return;
                }
            }
        }

        IsoneModulesEngine.memberService.addMemberField(email, userId); //增加唯一的电子邮件
        IsoneModulesEngine.memberService.updateUser(jUser, userId);

        //执行注册奖励规则
        IsoneBusinessRuleEngineEx.registerPlanExecutor.executePlan(Global.HEAD_MERCHANT, userId, Behavior.email_activation);
        //执行推荐会员奖励规则
        IsoneBusinessRuleEngineEx.recommendMemberPlanExecutor.executePlan(Global.HEAD_MERCHANT, jUser.optString("recommendedUserId"), userId, Behavior.email_activation);

        session.removeAttribute("email");
        LoginSessionUtils.loginFrontend(request, response, jUser.optString("id"));
        List<JSONObject> merchantList = IsoneModulesEngine.merchantAdminService.getAllEnableMerchantByAdmin(userId);
        if (merchantList.size() > 0) {
            LoginSessionUtils.loginBackend(request, response, userId);
        }
        //记录最后登录时间
        boolean isOK = UserUtil.setLastLoginLog(jUser, request);
        request.setAttribute("isok", isOK);
        if (isOK) {
            IsoneModulesEngine.adminService.updateUser(jUser, userId);
        }

        out.print("<script>window.location.href='" + contextPath + "/merchantEmailValidateResult.jsp?result=success&userId=" + userId + "';</script>");
    } catch (Exception e) {
        out.print("<script>location.href='/merchantEmailValidateResult?result=failed&msg=系统繁忙 !'</script>");
        e.printStackTrace();
    }
%>