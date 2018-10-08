package com.infoscape.sms.controller;

import com.aliyuncs.exceptions.ClientException;
import com.github.qcloudsms.httpclient.HTTPException;
import com.infoscape.sms.Util.Result;
import com.infoscape.sms.Util.SpringUtil;
import com.infoscape.sms.exception.ServiceException;
import com.infoscape.sms.service.SmsSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;


@RestController
public class SenderController{

    @Autowired
    private Environment env;

    @Value("${sms.provider}")
    private String sms_provider;


    @RequestMapping(value = "/sms/rest_api", method = RequestMethod.POST)
    public Result smsSender(String templateId, String templateParams, String nationCode, String phoneNumber) throws ClientException, HTTPException, IOException {
        SmsSender smsSender = (SmsSender) SpringUtil.getBean(sms_provider);
        String tempId = env.getProperty(templateId);
        System.out.println("templateId:" + templateId + ", templateParams:" + templateParams + ",nationCode:" + nationCode + ",phoneNumber:" + phoneNumber);
        if(smsSender==null){
            throw new ServiceException("找不到接口实现类");
        }
        if(tempId==null){
            throw new ServiceException("找不到短信模板id");
        }
        return smsSender.singleSend(tempId,templateParams,nationCode,phoneNumber);
    }

}
