<%@ page import="net.xinshi.isone.modules.IsoneModulesEngine" %>
<%@ page import="net.xinshi.isone.modules.message.tools.MessageAddUtil" %>
<%@ page import="net.xinshi.isone.modules.user.LoginSessionUtils" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="net.xinshi.isone.modules.product.tools.ProductValueUtil" %>
<%@ page import="net.xinshi.isone.modules.message.bean.MessageSubType" %>
<%@ page import="net.xinshi.isone.session.ISessionService" %>
<%@ page import="net.xinshi.isone.base.IsoneBaseEngine" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    try {

        String userId = LoginSessionUtils.getFrontendLoginUserId(request);
        if (StringUtils.isBlank(userId)) {
            out.print("notLogin");
            return;
        }

        String productId = request.getParameter("productId");
        String enquiryType = request.getParameter("enquiryType");
        String title = request.getParameter("title");
        String content = request.getParameter("content");
        String ValidateCode = request.getParameter("ValidateCode");

        if (StringUtils.isBlank(content) || StringUtils.isEmpty(content)) {
            out.print("6");//咨询内容为空
            return;
        }
        if (StringUtils.isBlank(enquiryType) || MessageSubType.valueOf(enquiryType) == null) {
            out.print("1");//商品咨询类型参数为空或者类型不存在
            return;
        }
        if (StringUtils.isBlank(title)) {
            title = "";
        }

        JSONObject jProduct = IsoneModulesEngine.productService.getProduct(productId);
        if (jProduct == null) {
            out.print("2");//咨询的商品不存在
            return;
        }

            if (StringUtils.isEmpty(ValidateCode) && StringUtils.isBlank(ValidateCode)) {
                out.print("3");//验证码位空
                return;
            }
            String sessionValidateCode = IsoneBaseEngine.sessionService.getSessionValue(ISessionService.VALIDATE_CODE, request);
            if (StringUtils.isBlank(sessionValidateCode) || !sessionValidateCode.equalsIgnoreCase(ValidateCode)) {
                out.print("4");//验证码不对
                return;
            }

        String merchantId = ProductValueUtil.getMerchantId(jProduct);

        JSONObject jMessage = new JSONObject();
        jMessage.put("messageSubType", enquiryType);
        jMessage.put("fromObjId", userId);
        jMessage.put("toObjId", merchantId);
        jMessage.put("targetObjId", productId);
        jMessage.put("title", title);
        jMessage.put("content", content);

        JSONObject jDoResult = MessageAddUtil.addProductEnquiryMessage(jMessage);
        if (jDoResult.optString("state").equals("0")) {
            out.print("5");
        } else {
            out.print("添加失败，原因是：" + jDoResult.optString("msg"));
        }
    } catch (Exception ex) {
        ex.printStackTrace();
        out.print("操作出现异常：" + ex.getMessage());
    }

%>