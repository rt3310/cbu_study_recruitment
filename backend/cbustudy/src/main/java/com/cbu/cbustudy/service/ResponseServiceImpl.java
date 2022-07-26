package com.cbu.cbustudy.service;

import com.cbu.cbustudy.response.ErrorResponse;
import com.cbu.cbustudy.response.ErrorType;
import com.cbu.cbustudy.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ResponseServiceImpl implements ResponseService{

    @Override
    public <T> Response<T> getResult(String key, Object obj) {
        Map<String,Object> map = new HashMap<>();
        map.put(key,obj);
        T data;

        if("".equals(key)) {
            data = (T) obj;
        } else {
            data = (T) map;
        }

        return (Response<T>) Response.builder()
                .response(true)
                .success(ReturnResponse.SUCCESS.returnSuccess)
                .data(data)
                .build();
    }

    @Override
    public Response getSuccessResult() {
        return Response.builder()
                .response(true)
                .success(ReturnResponse.SUCCESS.returnSuccess)
                .build();
    }

    @Override
    public Response getInvalidResult(String message) {
        return Response.builder()
                .response(false)
                .success(ReturnResponse.SUCCESS.returnSuccess)
                .error(message)
                .build();
    }

    @Override
    public Response getFailResult(ErrorResponse errorResponse) {
        return Response.builder()
                .response(false)
                .success(ReturnResponse.FAIL.returnSuccess)
                .error(errorResponse)
                .build();
    }

    @Override
    public Response getFailResult(String message) {
        return Response.builder()
                .response(false)
                .success(ReturnResponse.FAIL.returnSuccess)
                .error(message)
                .build();
    }
}
