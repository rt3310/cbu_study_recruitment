package com.cbu.cbustudy.service;

import com.cbu.cbustudy.entity.Study;
import com.cbu.cbustudy.entity.StudyMember;
import com.cbu.cbustudy.repository.StudyMemberRepository;
import com.cbu.cbustudy.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class StudyMemberServiceImpl implements StudyMemberService {

    private final StudyRepository studyRepository;
    private final StudyMemberRepository studyMemberRepository;

    @Override
    public StudyMember save(StudyMember studyMember) {
        return studyMemberRepository.insert(studyMember);
    }

    @Override
    public List<StudyMember> findByStudyId(Long studyId) {
        return studyMemberRepository.selectByStudyId(studyId);
    }

    @Override
    public List<StudyMember> findByMemberId(Long memberId) {
        return studyMemberRepository.selectByMemberId(memberId);
    }

    @Override
    public StudyMember findStudyMemberByMemberIdAndStudyId(Long memberId, Long studyId) {
        Optional<StudyMember> studyMember = studyMemberRepository.selectByMemberIdAndStudyId(memberId, studyId);
        if (studyMember.isEmpty()) {
            throw new IllegalArgumentException("스터디 멤버가 존재하지 않습니다");
        }
        return studyMember.get();
    }

    @Override
    public Long getCountByMemberId(Long memberId) {
        return studyMemberRepository.selectCountByMemberId(memberId);
    }

    @Override
    public Boolean IsExistStudyMember(Long memberId, Long studyId) {
        return studyMemberRepository.selectByMemberIdAndStudyId(memberId, studyId).isPresent();
    }

    @Override
    public void remove(StudyMember studyMember) {
        Study study = studyMember.getStudy();
        studyMemberRepository.delete(studyMember);
        studyRepository.updateMemberTally(study, studyMemberRepository.selectAcceptedCountByStudyId(study.getId()).intValue());
    }

    @Override
    public StudyMember acceptStudyApply(StudyMember studyMember) {
        StudyMember updatedStudyMember = studyMemberRepository.updateStudyMemberAcceptedIsTrue(studyMember);
        Study study = updatedStudyMember.getStudy();
        studyRepository.updateMemberTally(study, studyMemberRepository.selectAcceptedCountByStudyId(study.getId()).intValue());
        return updatedStudyMember;
    }


}
