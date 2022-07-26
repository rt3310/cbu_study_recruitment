package com.cbu.cbustudy.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class StudyMember {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean accepted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private Study study;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public StudyMember(boolean accepted, Study study, Member member) {
        this.accepted = accepted;
        setStudy(study);
        setMember(member);
    }

    public void setAccepted(Boolean accepted) {
        this.accepted = accepted;
    }

    private void setStudy(Study study) {
        if (this.study != null) {
            this.study.getStudyMembers().remove(this);
        }
        this.study = study;
        study.getStudyMembers().add(this);
    }

    private void setMember(Member member) {
        if (this.member != null) {
            this.member.getStudyMembers().remove(this);
        }
        this.member = member;
        member.getStudyMembers().add(this);
    }
}
