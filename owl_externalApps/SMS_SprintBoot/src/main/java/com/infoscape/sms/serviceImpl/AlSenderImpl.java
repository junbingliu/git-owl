package com.infoscape.sms.serviceImpl;

import com.aliyuncs.IAcsClient;
import com.aliyuncs.dysmsapi.model.v20170525.QuerySendDetailsRequest;
import com.aliyuncs.dysmsapi.model.v20170525.QuerySendDetailsResponse;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsRequest;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsResponse;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.profile.DefaultProfile;
import com.infoscape.sms.Util.JsonUtil;
import com.infoscape.sms.Util.Result;
import com.infoscape.sms.exception.ServiceException;
import com.infoscape.sms.service.SmsSender;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;


@Service("aly")
public class AlSenderImpl implements SmsSender {

    private static final Logger logger = LoggerFactory.getLogger(AlSenderImpl.class);

    @Autowired
    private IAcsClient acsClient;

    @Value("${sms.sign}")
    private String sms_sign;

    @Autowired
    private SendSmsRequest sendSmsRequest;

    @Autowired
    private QuerySendDetailsRequest querySendDetailsRequest;

    //产品名称:云通信短信API产品,开发者无需替换
    static final String product = "Dysmsapi";
    //产品域名,开发者无需替换
    static final String domain = "dysmsapi.aliyuncs.com";


    public Result singleSend(String templateId, String templateParams, String nationCode, String phoneNumber) throws ClientException {

        if(sms_sign==null||sms_sign.trim().isEmpty()){
            throw new ServiceException("签名为空");
        }
        if(templateId==null||templateId.trim().isEmpty()){
            throw new ServiceException("模板id为空");
        }
        if(templateParams==null){
            throw new ServiceException("模板参数为空");
        }
        if(nationCode==null||nationCode.trim().isEmpty()){
            throw new ServiceException("区号为空");
        }
        if(phoneNumber==null||phoneNumber.trim().isEmpty()){
            throw new ServiceException("手机号码为空");
        }

        //可自助调整超时时间
        System.setProperty("sun.net.client.defaultConnectTimeout", "10000");
        System.setProperty("sun.net.client.defaultReadTimeout", "10000");

        DefaultProfile.addEndpoint("cn-hangzhou", "cn-hangzhou", product, domain);

        if(nationCode.equals("86")){
            sendSmsRequest.setPhoneNumbers(phoneNumber);
        }else {
            sendSmsRequest.setPhoneNumbers(nationCode+phoneNumber);
        }
        sendSmsRequest.setSignName(sms_sign);
        sendSmsRequest.setTemplateCode(templateId);
        sendSmsRequest.setTemplateParam(templateParams);

        //选填-上行短信扩展码(无特殊需求用户请忽略此字段)
        //request.setSmsUpExtendCode("90997");

        //可选:outId为提供给业务方扩展字段,最终在短信回执消息中将此值带回给调用者
        //request.setOutId("yourOutId");

        SendSmsResponse sendSmsResponse = acsClient.getAcsResponse(sendSmsRequest);

        if(sendSmsResponse.getCode() != null && sendSmsResponse.getCode().equals("OK")) {
            QuerySendDetailsResponse querySendDetailsResponse = this.querySendDetails(sendSmsResponse.getBizId(),phoneNumber);
            System.out.print("阿里云短信服务发送情况报告："+JsonUtil.objectToJson(querySendDetailsResponse));
            logger.info("阿里云短信服务发送情况报告："+ JsonUtil.objectToJson(querySendDetailsResponse));
            return new Result(Result.SUCCESS,querySendDetailsResponse);
        }else {
            System.out.print("阿里云短信服务发送情况报告："+JsonUtil.objectToJson(sendSmsResponse));
            logger.info("阿里云短信服务发送情况报告："+ JsonUtil.objectToJson(sendSmsResponse));
            return new Result(Result.ERROR,sendSmsResponse);
        }

    }

    public QuerySendDetailsResponse querySendDetails(String bizId,String phoneNumber) throws ClientException {

        if(bizId==null||bizId.trim().isEmpty()){
            throw new ServiceException("bizId不存在");
        }
        //必填-号码
        querySendDetailsRequest.setPhoneNumber(phoneNumber);
        //可选-流水号
        querySendDetailsRequest.setBizId(bizId);
        //必填-发送日期 支持30天内记录查询，格式yyyyMMdd
        SimpleDateFormat ft = new SimpleDateFormat("yyyyMMdd");
        querySendDetailsRequest.setSendDate(ft.format(new Date()));
        //必填-页大小
        querySendDetailsRequest.setPageSize(10L);
        //必填-当前页码从1开始计数
        querySendDetailsRequest.setCurrentPage(1L);

        QuerySendDetailsResponse querySendDetailsResponse = acsClient.getAcsResponse(querySendDetailsRequest);

        return querySendDetailsResponse;
    }

}
