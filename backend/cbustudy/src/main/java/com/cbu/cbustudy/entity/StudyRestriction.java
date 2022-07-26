package com.cbu.cbustudy.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class StudyRestriction {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String restriction;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private Study study;

    @Builder
    public StudyRestriction(String restriction, Study study) {
        this.restriction = restriction;
        setStudy(study);
    }

    private void setStudy(Study study) {
        if (this.study != null) {
            this.study.getStudyRestrictions().remove(this);
        }
        this.study = study;
        study.getStudyRestrictions().add(this);
    }
}
