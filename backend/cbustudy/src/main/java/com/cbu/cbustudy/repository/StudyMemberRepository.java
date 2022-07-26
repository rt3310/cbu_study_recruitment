package com.cbu.cbustudy.repository;

import com.cbu.cbustudy.entity.StudyMember;

import java.util.List;
import java.util.Optional;

public interface StudyMemberRepository {
    StudyMember insert(StudyMember studyMember);
    List<StudyMember> selectAll();
    List<StudyMember> selectByStudyId(Long studyId);
    List<StudyMember> selectByMemberId(Long memberId);
    Long selectCountByMemberId(Long memberId);
    Long selectAcceptedCountByStudyId(Long studyId);
    Optional<StudyMember> selectByMemberIdAndStudyId(Long memberId, Long studyId);
    void delete(StudyMember studyMember);
    StudyMember updateStudyMemberAcceptedIsTrue(StudyMember studyMember);
}
