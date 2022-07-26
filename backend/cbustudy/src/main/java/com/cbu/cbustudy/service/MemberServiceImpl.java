package com.cbu.cbustudy.service;

import com.cbu.cbustudy.entity.Member;
import com.cbu.cbustudy.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;

    @Override
    public Member signup(Member member) {
        return memberRepository.insert(member);
    }

    @Override
    public List<Member> findAll() {
        return memberRepository.selectAll();
    }

    @Override
    public Member findById(Long id) {
        return memberRepository.selectById(id).orElseThrow(() -> new IllegalArgumentException("멤버가 존재하지 않습니다."));
    }

    @Override
    public Member findByLoginId(String loginId) {
        return memberRepository.selectByLoginId(loginId).orElseThrow(() -> new IllegalArgumentException("멤버가 존재하지 않습니다."));
    }

    @Override
    public Member setRefreshToken(Member member, String refreshToken) {
        return memberRepository.updateRefreshToken(member, refreshToken);
    }

    @Override
    public void remove(Member member) {
        memberRepository.delete(member);
    }
}
