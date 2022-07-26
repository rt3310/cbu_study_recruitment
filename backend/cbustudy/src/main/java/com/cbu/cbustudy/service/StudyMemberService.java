package com.cbu.cbustudy.service;

import com.cbu.cbustudy.entity.StudyMember;

import java.util.List;
import java.util.Optional;

public interface StudyMemberService {
    StudyMember save(StudyMember studyMember);
    List<StudyMember> findByStudyId(Long studyId);
    List<StudyMember> findByMemberId(Long memberId);
    StudyMember findStudyMemberByMemberIdAndStudyId(Long memberId, Long studyId);
    Long getCountByMemberId(Long memberId);
    Boolean IsExistStudyMember(Long memberId, Long studyId);
    void remove(StudyMember studyMember);
    StudyMember acceptStudyApply(StudyMember studyMember);
}
