package com.cbu.cbustudy.response.exception;

import com.cbu.cbustudy.response.ErrorResponse;
import com.cbu.cbustudy.response.Response;
import com.cbu.cbustudy.service.ResponseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class ControllerAdvice {

    private final ResponseService responseService;

    @ExceptionHandler(AccountException.class)
    public ResponseEntity<Response> accountExceptionHandle(AccountException e) {
        log.error("accountException: {}", e.getErrorType());
        return ResponseEntity.badRequest().body(responseService.getFailResult(e.getMessage()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Response> illegalArgumentExceptionHandle(IllegalArgumentException e) {
        log.error("IllegalArgumentException: {}", e.getMessage());
        e.printStackTrace();
        return ResponseEntity.badRequest().body(responseService.getFailResult(e.getMessage()));
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<Response> usernameNotFoundExceptionHandle(UsernameNotFoundException e) {
        log.error("usernameNotFoundException: {}", e.getMessage());
        return ResponseEntity.badRequest().body(responseService.getFailResult(e.getMessage()));
    }

    @ExceptionHandler
    public ResponseEntity<Response> generalExceptionHandle(Exception e) {
        log.error("generalException: {}", e.getMessage());
        e.printStackTrace();
        return ResponseEntity.badRequest().body(responseService.getFailResult(e.getMessage()));
    }
}
