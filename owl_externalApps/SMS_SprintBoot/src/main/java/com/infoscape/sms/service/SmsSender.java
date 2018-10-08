package com.infoscape.sms.service;

import com.aliyuncs.exceptions.ClientException;
import com.github.qcloudsms.httpclient.HTTPException;
import com.infoscape.sms.Util.Result;

import java.io.IOException;

public interface SmsSender {
    Result singleSend(String templateId, String templateParams, String nationCode, String phoneNumber) throws ClientException, HTTPException, IOException;
}
