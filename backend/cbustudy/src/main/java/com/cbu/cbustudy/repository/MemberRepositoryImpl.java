package com.cbu.cbustudy.repository;

import com.cbu.cbustudy.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Slf4j
@Repository
@Transactional
@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepository{

    private final EntityManager em;

    @Override
    public Member insert(Member member) {
        em.persist(member);
        return member;
    }

    @Override
    public List<Member> selectAll() {
        return em.createQuery("SELECT m FROM Member m", Member.class).getResultList();
    }

    @Override
    public Optional<Member> selectById(Long id) {
        return Optional.ofNullable(em.find(Member.class, id));
    }

    @Override
    public Optional<Member> selectByLoginId(String loginId) {
        return selectAll().stream()
                .filter(member -> member.getLoginId().equals(loginId))
                .findAny();
    }

    @Override
    public Member updateRefreshToken(Member member, String refreshToken) {
        member.setRefreshToken(refreshToken);
        return member;
    }

    @Override
    public void delete(Member member) {
        em.remove(member);
    }
}
