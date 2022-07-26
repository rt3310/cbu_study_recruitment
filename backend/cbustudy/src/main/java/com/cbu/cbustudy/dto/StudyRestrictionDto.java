package com.cbu.cbustudy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudyRestrictionDto {

    private Long id;
    private String restriction;
    private Long studyId;
}
