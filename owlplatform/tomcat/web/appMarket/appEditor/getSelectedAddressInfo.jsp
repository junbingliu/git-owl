<%@ page import="net.xinshi.isone.base.IsoneBaseEngine" %>
<%@ page import="net.xinshi.isone.modules.IsoneModulesEngine" %>
<%@ page import="net.xinshi.isone.modules.user.LoginSessionUtils" %>
<%@ page import="net.xinshi.isone.security.Md5Service" %>
<%@ page import="net.xinshi.pigeon.adapter.StaticPigeonEngine" %>
<%@ page import="org.apache.commons.codec.digest.DigestUtils" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="org.json.JSONObject" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    JSONObject jResult = new JSONObject();
    try {
        String userId = LoginSessionUtils.getFrontendLoginUserId(request);
        if (StringUtils.isBlank(userId)) {
            jResult.put("code", "101");
            jResult.put("msg", "请先登录");
            out.print(jResult);
            return;
        }

        String addressId = request.getParameter("addressId");
        String idCardSpex = request.getParameter("spex");
        JSONObject jAddress = IsoneModulesEngine.deliveryAddressService.getAddress(userId, addressId);
        if (jAddress == null) {
            jResult.put("code", "102");
            jResult.put("msg", "地址不存在");
            out.print(jResult);
            return;
        }


        String certificate = jAddress.optString("certificate");
        if (StringUtils.isNotBlank(certificate)) {
            certificate = Md5Service.decString(jAddress.optString("certificate"), "!@#$%^");
            //解密身份证信息
            jAddress.put("certificate", certificate);
        }

        String certifyState = jAddress.optString("state", "0");//默认为未审核状态返回
        String idCardFrontPic = jAddress.optString("idCardFrontPic");
        String idCardBackPic = jAddress.optString("idCardBackPic");
        String userName = jAddress.optString("userName");

        //先从地址本获取身份证图片，再根据姓名和身份证号到身份证库获取
        boolean isGetFontPicFromIdCardLib = true;
        boolean isGetBackPicFromIdCardLib = true;
        if (!certifyState.equals("2")) {
            if (StringUtils.isNotBlank(idCardFrontPic)) {
                jAddress.put("idCardFrontPicPreviewPath", IsoneBaseEngine.fileService.getRelatedUrl(idCardFrontPic, idCardSpex));
                jAddress.put("idCardFrontPicPreviewFullPath", IsoneBaseEngine.fileService.getFullPath(idCardFrontPic));

                isGetFontPicFromIdCardLib = false;
            }

            if (StringUtils.isNotBlank(idCardBackPic)) {
                jAddress.put("idCardBackPicPreviewPath", IsoneBaseEngine.fileService.getRelatedUrl(idCardBackPic, idCardSpex));
                jAddress.put("idCardBackPicPreviewFullPath", IsoneBaseEngine.fileService.getFullPath(idCardBackPic));

                isGetBackPicFromIdCardLib = false;
            }
        }

        if (isGetFontPicFromIdCardLib && isGetBackPicFromIdCardLib && StringUtils.isNotBlank(userName) && StringUtils.isNotBlank(certificate)) {
            JSONObject jIdCardInfo = getIdCardByName(userName, certificate);
            if (jIdCardInfo != null) {
                if (isGetFontPicFromIdCardLib) {
                    idCardFrontPic = jIdCardInfo.optString("idCardFrontPic");
                    if (StringUtils.isNotBlank(idCardFrontPic)) {
                        jAddress.put("idCardFrontPic", idCardFrontPic);
                        jAddress.put("idCardFrontPicPreviewPath", IsoneBaseEngine.fileService.getRelatedUrl(idCardFrontPic, idCardSpex));
                        jAddress.put("idCardFrontPicPreviewFullPath", IsoneBaseEngine.fileService.getFullPath(idCardFrontPic));
                    }
                }

                if (isGetBackPicFromIdCardLib) {
                    idCardBackPic = jIdCardInfo.optString("idCardBackPic");
                    if (StringUtils.isNotBlank(idCardBackPic)) {
                        jAddress.put("idCardBackPic", idCardBackPic);
                        jAddress.put("idCardBackPicPreviewPath", IsoneBaseEngine.fileService.getRelatedUrl(idCardBackPic, idCardSpex));
                        jAddress.put("idCardBackPicPreviewFullPath", IsoneBaseEngine.fileService.getFullPath(idCardBackPic));
                    }
                }
            }
        }

        jResult.put("code", "0");
        jResult.put("address", jAddress);
        jResult.put("msg", "");
        out.print(jResult);
    } catch (Exception e) {
        e.printStackTrace();
        jResult.put("code", "99");
        jResult.put("msg", "出现异常,异常信息：" + e.getMessage());
        out.print(jResult);
        return;
    }
%>

<%!
    JSONObject getIdCardByName(String name, String idCard) throws Exception {
        String id = getId(name, idCard);
        String s = StaticPigeonEngine.pigeon.getFlexObjectFactory().getContent(id);
        if (StringUtils.isBlank(s)) {
            return null;
        }

        return new JSONObject(s);
    }

    String getId(String name, String idCard) throws Exception {
        return "IDCardLibObj_" + DigestUtils.md5Hex(name + "_" + idCard);
    }
%>
