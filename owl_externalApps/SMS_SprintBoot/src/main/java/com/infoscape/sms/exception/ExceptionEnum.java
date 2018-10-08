package com.infoscape.sms.exception;

public enum ExceptionEnum {

    SYSTEM_ERROR(-1,"系统异常"), SERVICE_ERROR(1,"业务异常");

    private Integer code;
    private String msg;

    ExceptionEnum(Integer code,String msg) {
        this.code = code;
        this.msg = msg;
    }

    public Integer getCode() {
        return code;
    }

    public String getMsg() {
        return msg;

    }

}
