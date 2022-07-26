package com.cbu.cbustudy.repository;

import com.cbu.cbustudy.entity.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {
    Member insert(Member member);
    List<Member> selectAll();
    Optional<Member> selectById(Long id);
    Optional<Member> selectByLoginId(String loginId);
    Member updateRefreshToken(Member member, String refreshToken);
    void delete(Member member);
}
