package com.infoscape.sms.serviceImpl;

import com.github.qcloudsms.SmsSingleSender;
import com.github.qcloudsms.SmsSingleSenderResult;
import com.github.qcloudsms.httpclient.HTTPException;
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

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;

@Service("txy")
public class TxSenderImpl implements SmsSender {

    private static final Logger logger = LoggerFactory.getLogger(TxSenderImpl.class);

    @Autowired
    private SmsSingleSender smsSingleSender;

    @Value("${sms.sign}")
    private String sms_sign;


    public Result singleSend(String templateId, String templateParams, String nationCode, String phoneNumber) throws HTTPException, IOException {

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

        int templateCode =  Integer.parseInt(templateId);

        String[] tempParams = parseJson(templateParams);

        SmsSingleSenderResult smsSingleSenderResult = smsSingleSender.sendWithParam(nationCode,phoneNumber,templateCode,tempParams,sms_sign,"","");

        System.out.print("腾讯云短信服务发送情况报告："+ JsonUtil.objectToJson(smsSingleSenderResult));
        logger.info("腾讯云短信服务发送情况报告："+ JsonUtil.objectToJson(smsSingleSenderResult));

        if(smsSingleSenderResult.result == 0){
            return new Result(Result.SUCCESS,smsSingleSenderResult);
        }else {
            return new Result(Result.ERROR,smsSingleSenderResult);
        }
    }

    public static String[] parseJson(String str){
        ArrayList<String> list =new ArrayList<String >();
        JSONObject jsonObject = new JSONObject(str);
        Iterator<String> it = jsonObject.keys();
        while(it.hasNext()) {
            String key = it.next();
            String value = jsonObject.getString(key);
            list.add(value);
            System.out.println("key: " + key + ",value:" + value);
        }
        String[] strings = new String[list.size()];
        return list.toArray(strings);
    }

}
