package com.cbu.cbustudy.dto;

import com.cbu.cbustudy.entity.Member;
import com.cbu.cbustudy.entity.Study;
import com.cbu.cbustudy.entity.StudyPreparation;
import com.cbu.cbustudy.entity.StudyRestriction;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudyDto {
    private Long id;

    @NotEmpty
    private String title;
    @NotNull
    private String content;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createdDate;
    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime deadline;
    private Integer memberTally;
    private Integer memberTotal;
    private Boolean closed;
    private Long memberId;
    private String memberName;
    private List<String> studyPreparations;
    private List<String> studyRestrictions;

    public Study toStudy(Member member) {
        return Study.builder()
                .title(title)
                .content(content)
                .deadline(deadline)
                .memberTally(1)
                .memberTotal(memberTotal)
                .closed(false)
                .member(member)
                .build();
    }

    public List<StudyPreparation> toStudyPreparations(Study study) {
        return studyPreparations.stream()
                .map(studyPreparation -> new StudyPreparation(studyPreparation, study))
                .collect(Collectors.toList());
    }

    public List<StudyRestriction> toStudyRestrictions(Study study) {
        return studyRestrictions.stream()
                .map(studyRestriction -> new StudyRestriction(studyRestriction, study))
                .collect(Collectors.toList());
    }
}
