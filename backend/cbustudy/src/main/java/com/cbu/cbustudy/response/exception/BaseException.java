package com.cbu.cbustudy.response.exception;

import com.cbu.cbustudy.response.ErrorType;
import lombok.Getter;

public class BaseException extends RuntimeException {

    @Getter
    private ErrorType errorType;

    public BaseException(String message) {
        super(message);
    }

    public BaseException(ErrorType errorType) {
        super(errorType.getMessage());
        this.errorType = errorType;
    }
}
