package com.cbu.cbustudy.repository;

import com.cbu.cbustudy.entity.StudyMember;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Repository
@Transactional
@RequiredArgsConstructor
public class StudyMemberRepositoryImpl implements StudyMemberRepository{

    private final EntityManager em;

    @Override
    public StudyMember insert(StudyMember studyMember) {
        em.persist(studyMember);
        return studyMember;
    }

    @Override
    public List<StudyMember> selectAll() {
        return em.createQuery("SELECT sm FROM StudyMember sm", StudyMember.class).getResultList();
    }

    @Override
    public List<StudyMember> selectByStudyId(Long studyId) {
        return selectAll().stream()
                .filter(studyMember -> studyMember.getStudy().getId() == studyId)
                .collect(Collectors.toList());
    }

    @Override
    public List<StudyMember> selectByMemberId(Long memberId) {
        return selectAll().stream()
                .filter(studyMember -> studyMember.getMember().getId() == memberId)
                .collect(Collectors.toList());
    }

    @Override
    public Long selectCountByMemberId(Long memberId) {
        return em.createQuery("SELECT COUNT(sm) FROM StudyMember sm WHERE sm.member.id = :memberId", Long.class)
                .setParameter("memberId", memberId)
                .getSingleResult();
    }

    @Override
    public Long selectAcceptedCountByStudyId(Long studyId) {
        return em.createQuery("SELECT COUNT(sm) FROM StudyMember sm WHERE sm.study.id = :studyId AND sm.accepted = true", Long.class)
                .setParameter("studyId", studyId)
                .getSingleResult();
    }

    @Override
    public Optional<StudyMember> selectByMemberIdAndStudyId(Long memberId, Long studyId) {
        log.info("memberId: {}, studyId: {}", memberId, studyId);
        return selectAll().stream()
                .filter(studyMember -> studyMember.getMember().getId() == memberId)
                .filter(studyMember -> studyMember.getStudy().getId() == studyId)
                .findAny();
    }

    @Override
    public void delete(StudyMember studyMember) {
        em.remove(studyMember);
    }

    @Override
    public StudyMember updateStudyMemberAcceptedIsTrue(StudyMember studyMember) {
        studyMember.setAccepted(true);
        return studyMember;
    }
}
