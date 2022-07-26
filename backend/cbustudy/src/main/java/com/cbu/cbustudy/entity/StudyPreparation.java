package com.cbu.cbustudy.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class StudyPreparation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String preparation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private Study study;

    @Builder
    public StudyPreparation(String preparation, Study study) {
        this.preparation = preparation;
        setStudy(study);
    }

    private void setStudy(Study study) {
        if (this.study != null) {
            this.study.getStudyPreparations().remove(this);
        }
        this.study = study;
        study.getStudyPreparations().add(this);
    }
}
