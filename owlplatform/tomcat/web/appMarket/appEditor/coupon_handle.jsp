<%@ page import="net.xinshi.isone.modules.IsoneModulesEngine" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="net.xinshi.isone.functions.card.CardFunction" %>
<%@ page import="net.xinshi.isone.functions.card.CardUtils" %>
<%@ page import="net.xinshi.pigeon.adapter.StaticPigeonEngine" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="java.util.List" %>
<%@ page import="net.xinshi.isone.modules.user.LoginSessionUtils" %>
<%@ page import="net.xinshi.isone.session.ISessionService" %>
<%@ page import="net.xinshi.isone.base.IsoneBaseEngine" %>
<%@ page import="net.xinshi.isone.modules.sysargument.SysArgumentUtil" %>
<%@ page import="net.xinshi.isone.functions.sysargument.SysArgumentFunction" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    try {
        JSONObject jResult = new JSONObject();
        String userId = LoginSessionUtils.getFrontendLoginUserId(request);
        if (StringUtils.isBlank(userId)) {
            jResult.put("state", "0");
            jResult.put("msg", "未登录");
            out.print(jResult.toString());
            return;
        }
        String batchId = request.getParameter("batchId");
        JSONObject awardCard= SysArgumentFunction.getSysArgument("head_merchant", "col_card_sysargument", "awardCard");
        String awardCardIds=awardCard.optString("value");
        if (StringUtils.isBlank(batchId) ) {
            jResult.put("state", "1");
            jResult.put("msg", "请选择需要领取的卡券类型！");
            out.print(jResult.toString());
            return;
        }
        String[] batches=awardCardIds.split(",");
        boolean isMatchBatch=false;
        for(String bId:batches){
            if(batchId.equals(bId)){
                isMatchBatch=true;
                break;
            }
        }
        if (!isMatchBatch){
            jResult.put("state", "1");
            jResult.put("msg", "请选择需要领取的卡券类型！");
            out.print(jResult.toString());
            return;
        }
        String validateCode = request.getParameter("ValidateCode");
        if (StringUtils.isEmpty(validateCode) && StringUtils.isBlank(validateCode)) {
            jResult.put("state", "6");
            jResult.put("msg", "请填写验证码！");
            out.print(jResult.toString());
            return;
        }
        String sessionValidateCode = IsoneBaseEngine.sessionService.getSessionValue(ISessionService.VALIDATE_CODE, request);
        if (StringUtils.isBlank(sessionValidateCode) || !sessionValidateCode.equalsIgnoreCase(validateCode)) {
            jResult.put("state", "7");
            jResult.put("msg", "验证码错误！");
            out.print(jResult.toString());
            return;
        }

        JSONObject jCardBatch = IsoneModulesEngine.cardBatchService.getCardBatch(batchId);
        if (jCardBatch == null) {
            //卡批次不存在
            jResult.put("state", "2");
            jResult.put("msg", "此卡劵不存在！");
            out.print(jResult.toString());
            return;
        }
        String name=jCardBatch.optString("outerName");
        boolean checkOk = CardUtils.checkCardBatch(jCardBatch);
        if (!checkOk) {
            //卡批次不能正常使用
            jResult.put("state", "3");
            jResult.put("msg", "对不起，"+name+"不能正常使用，请联系客服！");
            out.print(jResult.toString());
            return;
        }
        String key = "existObjectList_" + userId;
        String result = StaticPigeonEngine.pigeon.getFlexObjectFactory().getContent(key);
        int existCount=0;
        if (StringUtils.isNotBlank(result)) {
            JSONObject jExistResult = new JSONObject(result);
            existCount = jExistResult.optInt(batchId);
            if (existCount > 200) {
                //您已经领取过此券！
                jResult.put("state", "4");
                jResult.put("msg", "您领取"+name+"已达到最高次数！");
                out.print(jResult.toString());
                return;
            }
        }

        int count = 1;
        List<String> cardIds = CardFunction.getAbleUseCardIds(batchId, count);
        int state = CardFunction.bindCards2UserNoPwd(userId, cardIds, "送购物券。");
        if (state == 1) {
            existCount++;
            JSONObject jContent = new JSONObject();
            jContent.put(batchId, existCount);
            StaticPigeonEngine.pigeon.getFlexObjectFactory().saveContent(key, jContent.toString());
            jResult.put("state", "ok");
            jResult.put("msg", "恭喜您,"+name+"领取成功！");
            out.print(jResult.toString());
        }else{
            jResult.put("state", "5");
            jResult.put("msg", "领取"+name+"失败，请重新领取！");
            out.print(jResult.toString());
        }
    } catch (Exception e) {
        e.printStackTrace();
    }

%>