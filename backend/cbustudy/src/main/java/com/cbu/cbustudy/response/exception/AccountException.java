package com.cbu.cbustudy.response.exception;

import com.cbu.cbustudy.response.ErrorType;

public class AccountException extends BaseException {

    public AccountException(String message) {
        super(message);
    }

    public AccountException(ErrorType errorType) {
        super(errorType);
    }
}
