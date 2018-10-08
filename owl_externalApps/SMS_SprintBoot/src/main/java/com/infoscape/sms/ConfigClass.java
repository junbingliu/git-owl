package com.infoscape.sms;

import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.dysmsapi.model.v20170525.QuerySendDetailsRequest;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsRequest;
import com.aliyuncs.profile.DefaultProfile;
import com.github.qcloudsms.SmsSingleSender;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ConfigClass {

    @Value("${tx.appid}")
    private int appid_tx;

    @Value("${tx.appkey}")
    private String appkey_tx;

    @Value("${al.accessKeyId}")
    private String accessKeyId_al;

    @Value("${al.accessKeySecret}")
    private String secret_al;

    @Bean(name="smsSingleSender")
    public SmsSingleSender createSmsSingleSenderBean() {
        return new SmsSingleSender(appid_tx,appkey_tx);
    }

    @Bean(name="acsClient")
    public DefaultAcsClient createDefaultAcsClientBean(){
        String regionId = "cn-hangzhou";
        DefaultProfile profile = DefaultProfile.getProfile(regionId,accessKeyId_al,secret_al);
        return new DefaultAcsClient(profile);
    }

    @Bean(name="sendSmsRequest")
    public SendSmsRequest createSendSmsRequestBean(){
        return new SendSmsRequest();
    }

    @Bean(name = "querySendDetailsRequest")
    public QuerySendDetailsRequest createQuerySendDetailsRequestBean(){
        return new QuerySendDetailsRequest();
    }

}
