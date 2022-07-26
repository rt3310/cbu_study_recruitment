package com.cbu.cbustudy.service;

import com.cbu.cbustudy.entity.Study;
import com.cbu.cbustudy.entity.StudyPreparation;
import com.cbu.cbustudy.entity.StudyRestriction;
import com.cbu.cbustudy.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class StudyServiceImpl implements StudyService{

    private final StudyRepository studyRepository;

    @Override
    public Study save(Study study) {
        return studyRepository.insert(study);
    }

    @Override
    public List<Study> findAll() {
        return studyRepository.selectAll();
    }

    @Override
    public List<Study> findByMemberId(Long memberId) {
        return studyRepository.selectByMemberId(memberId);
    }

    @Override
    public Study findById(Long id) {
        return studyRepository.selectById(id).orElseThrow(() -> new IllegalArgumentException("스터디가 존재하지 않습니다."));
    }

    @Override
    public List<Study> findInNotClosed() {
        return studyRepository.selectInNotClosed();
    }

    @Override
    public Long getNotClosedCount() {
        return studyRepository.selectNotClosedCount();
    }

    @Override
    public Long getCountByMemberId(Long memberId) {
        return studyRepository.selectCountByMemberId(memberId);
    }

    @Override
    public boolean isFulledStudy(Study study) {
        return study.getMemberTally() >= study.getMemberTotal();
    }

    @Override
    public Study openStudy(Study study) {
        return studyRepository.updateClosedIsFalse(study);
    }

    @Override
    public Study closeStudy(Study study) {
        return studyRepository.updateClosedIsTrue(study);
    }

    @Override
    public void remove(Study study) {
        studyRepository.delete(study);
    }

    @Override
    public List<StudyPreparation> saveStudyPreparations(List<StudyPreparation> studyPreparations) {
        List<StudyPreparation> savedStudyPreparations = new ArrayList<>();
        studyPreparations.stream()
                .forEach(studyPreparation -> savedStudyPreparations.add(studyRepository.insertStudyPreparation(studyPreparation)));
        return savedStudyPreparations;
    }

    @Override
    public List<StudyPreparation> findStudyPreparationsByStudyId(Long studyId) {
        return studyRepository.selectStudyPreparationsByStudyId(studyId);
    }

    @Override
    public List<StudyRestriction> saveStudyRestrictions(List<StudyRestriction> studyRestrictions) {
        List<StudyRestriction> savedStudyRestrictions = new ArrayList<>();
        studyRestrictions.stream()
                .forEach(studyRestriction -> savedStudyRestrictions.add(studyRepository.insertStudyRestriction(studyRestriction)));
        return savedStudyRestrictions;
    }

    @Override
    public List<StudyRestriction> findStudyRestrictionsByStudyId(Long studyId) {
        return studyRepository.selectStudyRestrictionsByStudyId(studyId);
    }
}
