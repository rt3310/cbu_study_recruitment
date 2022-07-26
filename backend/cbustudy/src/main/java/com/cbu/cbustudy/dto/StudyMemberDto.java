package com.cbu.cbustudy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudyMemberDto {

    private Long id;
    private Boolean accepted;
    private Long studyId;
    private Long memberId;
    private String memberName;
    private String memberDepartment;
}
