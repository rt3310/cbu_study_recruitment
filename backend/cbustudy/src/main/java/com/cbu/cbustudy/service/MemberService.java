package com.cbu.cbustudy.service;

import com.cbu.cbustudy.entity.Member;
import java.util.List;

public interface MemberService {
    Member signup(Member member);
    List<Member> findAll();
    Member findById(Long id);
    Member findByLoginId(String loginId);
    Member setRefreshToken(Member member, String refreshToken);
    void remove(Member member);
}