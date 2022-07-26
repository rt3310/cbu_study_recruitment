package com.cbu.cbustudy.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Study {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    @CreatedDate
    private LocalDateTime createdDate;
    private LocalDateTime deadline;
    private Integer memberTally;
    private Integer memberTotal;
    private Boolean closed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "study", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<StudyMember> studyMembers = new ArrayList<>();

    @OneToMany(mappedBy = "study", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<StudyPreparation> studyPreparations = new ArrayList<>();

    @OneToMany(mappedBy = "study", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<StudyRestriction> studyRestrictions = new ArrayList<>();

    @Builder
    public Study(String title, String content, LocalDateTime deadline, Integer memberTally, Integer memberTotal, Boolean closed, Member member) {
        this.title = title;
        this.content = content;
        this.deadline = deadline;
        this.memberTally = memberTally;
        this.memberTotal = memberTotal;
        this.closed = closed;
        setMember(member);
    }

    public void setMemberTally(Integer memberTally) {
        this.memberTally = memberTally;
    }

    public void setClosed(Boolean closed) {
        this.closed = closed;
    }

    private void setMember(Member member) {
        if (this.member != null) {
            this.member.getStudies().remove(this);
        }
        this.member = member;
        member.getStudies().add(this);
    }
}
