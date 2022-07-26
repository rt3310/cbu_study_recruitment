package com.cbu.cbustudy.service;

import com.cbu.cbustudy.response.ErrorResponse;
import com.cbu.cbustudy.response.Response;
import lombok.Getter;

public interface ResponseService {
    @Getter
    public enum ReturnResponse {
        SUCCESS(0),
        FAIL(-1);

        Integer returnSuccess;

        ReturnResponse(Integer returnSuccess) {
            this.returnSuccess = returnSuccess;
        }
    }

    public <T> Response<T> getResult(String key, Object obj);
    public Response getSuccessResult();
    public Response getInvalidResult(String message);
    public Response getFailResult(ErrorResponse errorResponse);
    public Response getFailResult(String message);
}
