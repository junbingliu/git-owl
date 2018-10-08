package com.infoscape.sms.exception;

import com.infoscape.sms.Util.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 全局异常处理器
 */

@ControllerAdvice
public class GlobalExceptionResolver{
	
	private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionResolver.class);

	@ExceptionHandler(Exception.class)
	@ResponseBody
	public Result handler(Exception e){
		e.printStackTrace();
		if(e instanceof ServiceException){
			//业务异常日志打印
			logger.info(ExceptionEnum.SERVICE_ERROR.getMsg()+": ",e);
			return new Result(ExceptionEnum.SERVICE_ERROR.getCode(),e);
		}else {
			//系统异常日志打印
			logger.error(ExceptionEnum.SYSTEM_ERROR.getMsg()+": ",e);
			return new Result(ExceptionEnum.SYSTEM_ERROR.getCode(),e);
		}
	}

}
