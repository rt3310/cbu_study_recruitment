package com.cbu.cbustudy.entity;

import com.cbu.cbustudy.entity.loghistory.LogHistory;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String loginId;
    private String passwd;
    private String memberName;
    private String academic;
    private Integer grade;
    private String department;
    private String refreshToken;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Study> studies = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<StudyMember> studyMembers = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<LogHistory> logHistories = new ArrayList<>();

    @Builder
    public Member(Long id, String loginId, String passwd, String memberName, String academic, Integer grade, String department, Authority authority) {
        this.id = id;
        this.loginId = loginId;
        this.passwd = passwd;
        this.memberName = memberName;
        this.academic = academic;
        this.grade = grade;
        this.department = department;
        this.authority = authority;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void encryptPassword(PasswordEncoder passwordEncoder) {
        this.passwd = passwordEncoder.encode(passwd);
    }
}
