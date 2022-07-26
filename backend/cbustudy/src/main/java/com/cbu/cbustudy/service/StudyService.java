package com.cbu.cbustudy.service;

import com.cbu.cbustudy.entity.Study;
import com.cbu.cbustudy.entity.StudyPreparation;
import com.cbu.cbustudy.entity.StudyRestriction;

import java.util.List;

public interface StudyService {
    Study save(Study study);
    List<Study> findAll();
    List<Study> findInNotClosed();
    List<Study> findByMemberId(Long memberId);
    Study findById(Long id);
    Long getNotClosedCount();
    Long getCountByMemberId(Long memberId);
    boolean isFulledStudy(Study study);
    Study openStudy(Study study);
    Study closeStudy(Study study);
    void remove(Study study);

    List<StudyPreparation> saveStudyPreparations(List<StudyPreparation> studyPreparations);
    List<StudyPreparation> findStudyPreparationsByStudyId(Long studyId);
    List<StudyRestriction> saveStudyRestrictions(List<StudyRestriction> studyRestrictions);
    List<StudyRestriction> findStudyRestrictionsByStudyId(Long studyId);
}
