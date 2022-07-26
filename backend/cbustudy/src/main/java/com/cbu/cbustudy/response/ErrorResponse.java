package com.cbu.cbustudy.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ErrorResponse {
    private String code;
    private String message;
    private Integer status;
    private String error;

    public ErrorResponse(ErrorType errorType) {
        this.code = errorType.getCode();
        this.message = errorType.getMessage();
        this.status = errorType.getStatus().value();
        this.error = errorType.getStatus().getReasonPhrase();
    }
}
