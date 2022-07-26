package com.cbu.cbustudy.repository;

import com.cbu.cbustudy.entity.Study;
import com.cbu.cbustudy.entity.StudyPreparation;
import com.cbu.cbustudy.entity.StudyRestriction;

import java.util.List;
import java.util.Optional;

public interface StudyRepository {
    Study insert(Study study);
    List<Study> selectAll();
    List<Study> selectInNotClosed();
    List<Study> selectByMemberId(Long memberId);
    Optional<Study> selectById(Long id);
    Long selectCountByMemberId(Long memberId);
    Long selectNotClosedCount();
    Study updateClosedIsTrue(Study study);
    Study updateClosedIsFalse(Study study);
    void delete(Study study);

    Study updateMemberTally(Study study, int memberTally);

    StudyPreparation insertStudyPreparation(StudyPreparation studyPreparation);
    List<StudyPreparation> selectStudyPreparationsByStudyId(Long studyId);
    StudyRestriction insertStudyRestriction(StudyRestriction studyRestriction);
    List<StudyRestriction> selectStudyRestrictionsByStudyId(Long studyId);
}
