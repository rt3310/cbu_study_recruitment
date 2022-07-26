package com.cbu.cbustudy.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class Response<T> {

    /**
     * 요청 처리 상태: 0 성공, -1 오류
     */
    private Integer success;

    /**
     * 요청 처리 결과: true or false
     */
    private Boolean response;

    /**
     * 반환 데이터
     */
    private T data;

    /**
     * 에러 내용
     */
    private T error;

    @Builder
    public Response(Integer success, Boolean response, T data, T error) {
        this.success = success;
        this.response = response;
        this.data = data;
        this.error = error;
    }
}
