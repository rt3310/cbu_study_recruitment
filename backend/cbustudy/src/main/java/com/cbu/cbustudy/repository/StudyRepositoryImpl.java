package com.cbu.cbustudy.repository;

import com.cbu.cbustudy.entity.Study;
import com.cbu.cbustudy.entity.StudyPreparation;
import com.cbu.cbustudy.entity.StudyRestriction;
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
public class StudyRepositoryImpl implements StudyRepository {

    private final EntityManager em;

    @Override
    public Study insert(Study study) {
        em.persist(study);
        return study;
    }

    @Override
    public List<Study> selectAll() {
        return em.createQuery("SELECT s FROM Study s", Study.class).getResultList();
    }

    @Override
    public List<Study> selectInNotClosed() {
        return selectAll().stream()
                .filter(study -> study.getClosed() == false)
                .collect(Collectors.toList());
    }

    @Override
    public List<Study> selectByMemberId(Long memberId) {
        return selectAll().stream()
                .filter(study -> study.getMember().getId() == memberId)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Study> selectById(Long id) {
        return Optional.ofNullable(em.find(Study.class, id));
    }

    @Override
    public Long selectNotClosedCount() {
        return em.createQuery("SELECT COUNT(s) FROM Study s WHERE s.closed = false", Long.class).getSingleResult();
    }

    @Override
    public Long selectCountByMemberId(Long memberId) {
        return em.createQuery("SELECT COUNT(s) FROM Study s WHERE s.member.id = :memberId", Long.class)
                .setParameter("memberId", memberId)
                .getSingleResult();
    }

    @Override
    public Study updateClosedIsTrue(Study study) {
        study.setClosed(true);
        return study;
    }

    @Override
    public Study updateClosedIsFalse(Study study) {
        study.setClosed(false);
        return study;
    }

    @Override
    public Study updateMemberTally(Study study, int memberTally) {
        study.setMemberTally(memberTally);
        return study;
    }

    @Override
    public void delete(Study study) {
        em.remove(study);
    }

    @Override
    public StudyPreparation insertStudyPreparation(StudyPreparation studyPreparation) {
        em.persist(studyPreparation);
        return studyPreparation;
    }

    @Override
    public List<StudyPreparation> selectStudyPreparationsByStudyId(Long studyId) {
        return em.createQuery("SELECT sp FROM StudyPreparation sp WHERE sp.study.id = :studyId", StudyPreparation.class)
                .setParameter("studyId", studyId)
                .getResultList();
    }

    @Override
    public StudyRestriction insertStudyRestriction(StudyRestriction studyRestriction) {
        em.persist(studyRestriction);
        return studyRestriction;
    }

    @Override
    public List<StudyRestriction> selectStudyRestrictionsByStudyId(Long studyId) {
        return em.createQuery("SELECT sr FROM StudyRestriction sr WHERE sr.study.id = :studyId", StudyRestriction.class)
                .setParameter("studyId", studyId)
                .getResultList();
    }
}
