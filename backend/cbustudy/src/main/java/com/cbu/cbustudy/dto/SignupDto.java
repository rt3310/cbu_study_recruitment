package com.cbu.cbustudy.dto;

import com.cbu.cbustudy.entity.Member;
import com.cbu.cbustudy.entity.Authority;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SignupDto {

    private Long id;
    @NotBlank
    private String loginId;
    @NotBlank
    private String passwd;
    @NotBlank
    private String memberName;
    @NotNull
    private String academic;
    @NotNull
    private Integer grade;
    @NotNull
    private String department;

    public Member toMember(Authority authority) {
        return Member.builder()
                .loginId(loginId)
                .passwd(passwd)
                .memberName(memberName)
                .academic(academic)
                .grade(grade)
                .department(department)
                .authority(authority)
                .build();
    }
}
