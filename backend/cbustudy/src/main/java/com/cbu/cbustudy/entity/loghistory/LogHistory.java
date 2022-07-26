package com.cbu.cbustudy.entity.loghistory;

import com.cbu.cbustudy.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class LogHistory {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    private LocalDateTime createdDate;
    @Enumerated(EnumType.STRING)
    private LogType logType;
    @Enumerated(EnumType.STRING)
    private Category category;
    private String message;
    private String ip;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public LogHistory(LogType logType, Category category, String message, String ip, Member member) {
        this.logType = logType;
        this.category = category;
        this.message = message;
        this.ip = ip;
        setMember(member);
    }

    private void setMember(Member member) {
        if (this.member != null) {
            this.member.getLogHistories().remove(this);
        }
        this.member = member;
        member.getLogHistories().add(this);
    }
}
