package com.cbu.cbustudy.controller;

import com.cbu.cbustudy.dto.StudyDto;
import com.cbu.cbustudy.dto.StudyMemberDto;
import com.cbu.cbustudy.entity.*;
import com.cbu.cbustudy.entity.loghistory.Category;
import com.cbu.cbustudy.entity.loghistory.LogHistory;
import com.cbu.cbustudy.entity.loghistory.LogType;
import com.cbu.cbustudy.response.Response;
import com.cbu.cbustudy.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/studies")
@RequiredArgsConstructor
public class StudyController {

    private final StudyService studyService;
    private final MemberService memberService;
    private final StudyMemberService studyMemberService;
    private final LogHistoryService logHistoryService;
    private final ResponseService responseService;

    @GetMapping
    public ResponseEntity<Response<List<StudyDto>>> getStudies() {
        List<StudyDto> studyDtos = studyService.findAll().stream()
                .map(study -> StudyDto.builder()
                        .id(study.getId())
                        .title(study.getTitle())
                        .content(study.getContent())
                        .createdDate(study.getCreatedDate())
                        .deadline(study.getDeadline())
                        .memberTally(study.getMemberTally())
                        .memberTotal(study.getMemberTotal())
                        .closed(study.getClosed())
                        .memberId(study.getMember().getId())
                        .memberName(study.getMember().getMemberName())
                        .studyPreparations(studyService.findStudyPreparationsByStudyId(study.getId()).stream()
                                .map(studyPreparation -> studyPreparation.getPreparation())
                                .collect(Collectors.toList()))
                        .studyRestrictions(studyService.findStudyRestrictionsByStudyId(study.getId()).stream()
                                .map(studyRestriction -> studyRestriction.getRestriction())
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseService.getResult("studies", studyDtos));
    }

    @PostMapping
    public ResponseEntity<Response<StudyDto>> postStudy(@RequestBody @Validated StudyDto studyDto, BindingResult bindingResult, Principal principal, HttpServletRequest request) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(responseService.getFailResult(bindingResult.getFieldError().getDefaultMessage()));
        }
        Member member = memberService.findByLoginId(principal.getName());

        Study study = studyService.save(studyDto.toStudy(member));
        List<String> studyPreparations = studyService.saveStudyPreparations(studyDto.toStudyPreparations(study)).stream()
                .map(studyPreparation -> studyPreparation.getPreparation())
                .collect(Collectors.toList());
        List<String> studyRestrictions = studyService.saveStudyRestrictions(studyDto.toStudyRestrictions(study)).stream()
                .map(studyRestriction -> studyRestriction.getRestriction())
                .collect(Collectors.toList());
        studyMemberService.save(StudyMember.builder().accepted(true).study(study).member(member).build());
        logHistoryService.save(LogHistory.builder()
                .logType(LogType.INFO)
                .category(Category.STUDY)
                .message("스터디를 개설하였습니다.")
                .ip(IpGetter.getClientIP(request))
                .member(member)
                .build());

        StudyDto savedStudyDto = StudyDto.builder()
                .id(study.getId())
                .title(study.getTitle())
                .content(study.getContent())
                .createdDate(study.getCreatedDate())
                .deadline(study.getDeadline())
                .memberTally(study.getMemberTally())
                .memberTotal(study.getMemberTotal())
                .closed(study.getClosed())
                .memberId(study.getMember().getId())
                .memberName(study.getMember().getMemberName())
                .studyPreparations(studyPreparations)
                .studyRestrictions(studyRestrictions)
                .build();

        return ResponseEntity.ok(responseService.getResult("study", savedStudyDto));
    }

    @GetMapping("/opened")
    public ResponseEntity<Response<List<StudyDto>>> getNotClosedStudies() {
        List<StudyDto> studyDtos = studyService.findInNotClosed().stream()
                .map(study -> StudyDto.builder()
                        .id(study.getId())
                        .title(study.getTitle())
                        .content(study.getContent())
                        .createdDate(study.getCreatedDate())
                        .deadline(study.getDeadline())
                        .memberTally(study.getMemberTally())
                        .memberTotal(study.getMemberTotal())
                        .closed(study.getClosed())
                        .memberId(study.getMember().getId())
                        .memberName(study.getMember().getMemberName())
                        .studyPreparations(studyService.findStudyPreparationsByStudyId(study.getId()).stream()
                                .map(studyPreparation -> studyPreparation.getPreparation())
                                .collect(Collectors.toList()))
                        .studyRestrictions(studyService.findStudyRestrictionsByStudyId(study.getId()).stream()
                                .map(studyRestriction -> studyRestriction.getRestriction())
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseService.getResult("studies", studyDtos));
    }

    @PutMapping("/{studyId}/close")
    public ResponseEntity<Response> closeStudy(@PathVariable Long studyId, Principal principal, HttpServletRequest request) {
        Member member = memberService.findByLoginId(principal.getName());
        Study study = studyService.findById(studyId);

        if (member.getId() != study.getMember().getId()) {
            return ResponseEntity.badRequest().body(responseService.getFailResult("스터디 생성자가 아닙니다."));
        }
        studyService.closeStudy(study);
        logHistoryService.save(LogHistory.builder()
                .logType(LogType.INFO)
                .category(Category.STUDY)
                .message("스터디 모집을 마감하였습니다.")
                .ip(IpGetter.getClientIP(request))
                .member(member)
                .build());

        return ResponseEntity.ok(responseService.getSuccessResult());
    }

    @PutMapping("/{studyId}/open")
    public ResponseEntity<Response> openStudy(@PathVariable Long studyId, Principal principal, HttpServletRequest request) {
        Member member = memberService.findByLoginId(principal.getName());
        Study study = studyService.findById(studyId);

        if (member.getId() != study.getMember().getId()) {
            return ResponseEntity.badRequest().body(responseService.getFailResult("스터디 생성자가 아닙니다."));
        }

        studyService.openStudy(study);
        logHistoryService.save(LogHistory.builder()
                .logType(LogType.INFO)
                .category(Category.STUDY)
                .message("스터디 모집을 재개하였습니다.")
                .ip(IpGetter.getClientIP(request))
                .member(member)
                .build());

        return ResponseEntity.ok(responseService.getSuccessResult());
    }

    @GetMapping("/count")
    public ResponseEntity<Response<Long>> getNotClosedCount() {
        return ResponseEntity.ok(responseService.getResult("notClosedCount", studyService.getNotClosedCount()));
    }

    @GetMapping("/{studyId}/members")
    public ResponseEntity<Response<StudyMemberDto>> getStudyMembers(@PathVariable Long studyId) {
        List<StudyMemberDto> studyMemberDtos = studyMemberService.findByStudyId(studyId).stream()
                .map(studyMember -> StudyMemberDto.builder()
                        .id(studyMember.getId())
                        .studyId(studyMember.getStudy().getId())
                        .memberId(studyMember.getMember().getId())
                        .memberName(studyMember.getMember().getMemberName())
                        .memberDepartment(studyMember.getMember().getDepartment())
                        .accepted(studyMember.getAccepted())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseService.getResult("studyMembers", studyMemberDtos));
    }

    @PostMapping("/{studyId}/members")
    public ResponseEntity<Response<StudyMemberDto>> applyStudyMember(@PathVariable Long studyId, Principal principal, HttpServletRequest request) {
        Member member = memberService.findByLoginId(principal.getName());
        Study study = studyService.findById(studyId);

        if (studyService.isFulledStudy(study)) {
            return ResponseEntity.badRequest().body(responseService.getFailResult("이미 인원이 다 찼습니다."));
        }

        if (studyMemberService.IsExistStudyMember(member.getId(), studyId)) {
            return ResponseEntity.badRequest().body(responseService.getFailResult("이미 스터디를 신청하였습니다."));
        }

        StudyMember studyMember = studyMemberService.save(StudyMember.builder()
                .accepted(false)
                .member(member)
                .study(study)
                .build());

        logHistoryService.save(LogHistory.builder()
                .logType(LogType.INFO)
                .category(Category.STUDY)
                .message(study.getId() + "번 스터디를 신청하였습니다.")
                .ip(IpGetter.getClientIP(request))
                .member(member)
                .build());

        StudyMemberDto studyMemberDto = StudyMemberDto.builder()
                .id(studyMember.getId())
                .accepted(studyMember.getAccepted())
                .studyId(studyMember.getStudy().getId())
                .memberId(studyMember.getMember().getId())
                .memberName(studyMember.getMember().getMemberName())
                .memberDepartment(studyMember.getMember().getDepartment())
                .build();

        return ResponseEntity.ok(responseService.getResult("studyMember", studyMemberDto));
    }

    @PutMapping("/{studyId}/members/{memberId}")
    public ResponseEntity<Response<StudyMember>> acceptStudyMember(@PathVariable Long studyId, @PathVariable Long memberId, Principal principal, HttpServletRequest request) {
        Member loginMember = memberService.findByLoginId(principal.getName());
        if (loginMember.getId() != studyService.findById(studyId).getMember().getId()) {
            return ResponseEntity.badRequest().body(responseService.getFailResult("스터디 생성자가 아닙니다."));
        }

        StudyMember studyMember = studyMemberService.acceptStudyApply(studyMemberService.findStudyMemberByMemberIdAndStudyId(memberId, studyId));

        logHistoryService.save(LogHistory.builder()
                .logType(LogType.INFO)
                .category(Category.STUDY)
                .message(studyMember.getMember().getLoginId() + "님의 스터디 신청을 승인하였습니다.")
                .ip(IpGetter.getClientIP(request))
                .member(loginMember)
                .build());

        return ResponseEntity
                .ok(responseService.getResult("studyMember", studyMember));
    }

    @DeleteMapping("/{studyId}/members/{memberId}")
    public ResponseEntity<Response> deleteStudyMember(@PathVariable Long studyId, @PathVariable Long memberId, Principal principal, HttpServletRequest request) {
        Member loginMember = memberService.findByLoginId(principal.getName());
        Member studyCreator = studyService.findById(studyId).getMember();
        if (loginMember.getId() != studyCreator.getId() && loginMember.getId() != memberId) {
            return ResponseEntity.badRequest().body(responseService.getFailResult("스터디 생성자 또는 신청자가 아닙니다."));
        }

        if (studyCreator.getId() == memberId) {
            return ResponseEntity.badRequest().body(responseService.getFailResult("스터디 개설자는 취소할 수 없습니다."));
        }

        StudyMember studyMember = studyMemberService.findStudyMemberByMemberIdAndStudyId(memberId, studyId);
        Member member = studyMember.getMember();
        studyMemberService.remove(studyMember);

        logHistoryService.save(LogHistory.builder()
                .logType(LogType.INFO)
                .category(Category.STUDY)
                .message("스터디에서 제외되었습니다.")
                .ip(IpGetter.getClientIP(request))
                .member(member)
                .build());

        return ResponseEntity.ok(responseService.getSuccessResult());
    }
}
