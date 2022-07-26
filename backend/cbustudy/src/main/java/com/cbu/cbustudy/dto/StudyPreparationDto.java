package com.cbu.cbustudy.dto;

import com.cbu.cbustudy.entity.Study;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudyPreparationDto {

    private Long id;
    @NotEmpty
    private String preparation;
    private Long studyId;
}
