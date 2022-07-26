package com.cbu.cbustudy.controller;

import com.cbu.cbustudy.dto.LoginDto;
import com.cbu.cbustudy.dto.MemberDto;
import com.cbu.cbustudy.dto.SignupDto;
import com.cbu.cbustudy.dto.StudyDto;
import com.cbu.cbustudy.entity.Member;
import com.cbu.cbustudy.entity.Authority;
import com.cbu.cbustudy.entity.Study;
import com.cbu.cbustudy.entity.loghistory.Category;
import com.cbu.cbustudy.entity.loghistory.LogHistory;
import com.cbu.cbustudy.entity.loghistory.LogType;
import com.cbu.cbustudy.response.Response;
import com.cbu.cbustudy.security.JwtTokenProvider;
import com.cbu.cbustudy.security.MemberDetailsService;
import com.cbu.cbustudy.security.UserAuthentication;
import com.cbu.cbustudy.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberDetailsService memberDetailsService;
    private final StudyService studyService;
    private final StudyMemberService studyMemberService;
    private final LogHistoryService logHistoryService;
    private final ResponseService responseService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping
    public ResponseEntity<Response<List<MemberDto>>> getMembers() {
        return ResponseEntity.ok(responseService.getResult("members", memberService.findAll()));
    }

    @GetMapping("/my")
    public ResponseEntity getMember(Principal principal) {
        Member member = memberService.findByLoginId(principal.getName());
        MemberDto memberDto = MemberDto.builder()
                .id(member.getId())
                .loginId(member.getLoginId())
                .memberName(member.getMemberName())
                .academic(member.getAcademic())
                .grade(member.getGrade())
                .department(member.getDepartment())
                .build();

        return ResponseEntity.ok(responseService.getResult("member", memberDto));
    }

    @GetMapping("/my/studies")
    public ResponseEntity<Response<List<Study>>> getMyStudies(Principal principal) {
        Member member = memberService.findByLoginId(principal.getName());
        List<StudyDto> studyDtos = studyService.findByMemberId(member.getId()).stream()
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

    @GetMapping("/my/studies/count")
    public ResponseEntity<Response<Long>> getMyStudyCount(Principal principal) {
        Member member = memberService.findByLoginId(principal.getName());
        return ResponseEntity.ok(responseService.getResult("studyCount", studyService.getCountByMemberId(member.getId())));
    }

    @GetMapping("/my/studies/applied")
    public ResponseEntity<Response<List<StudyDto>>> getMyAppliedStudies(Principal principal) {
        Member member = memberService.findByLoginId(principal.getName());
        List<StudyDto> studyDtos = studyMemberService.findByMemberId(member.getId()).stream()
                .map(studyMember -> studyMember.getStudy())
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

    @GetMapping("/my/studies/applied/count")
    public ResponseEntity<Response<Long>> getMyAppliedStudyCount(Principal principal) {
        Member member = memberService.findByLoginId(principal.getName());
        return ResponseEntity.ok(responseService.getResult("appliedStudyCount", studyMemberService.getCountByMemberId(member.getId())));
    }

    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody @Validated LoginDto loginDto, BindingResult bindingResult, HttpServletResponse response, HttpServletRequest request) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(responseService.getFailResult(bindingResult.getFieldError().getDefaultMessage()));
        }
        String loginId = loginDto.getLoginId();
        String passwd = loginDto.getPasswd();

        UserDetails memberDetails = memberDetailsService.loadUserByUsername(loginId);
        if (!bCryptPasswordEncoder.matches(passwd, memberDetails.getPassword())) {
            return ResponseEntity.badRequest().body(responseService.getFailResult("사용자 정보가 일치하지 않습니다."));
        }
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("authorities", memberDetails.getAuthorities().toString());

        Map<String, String> tokens = jwtTokenProvider.generateTokenSet(new UserAuthentication(loginId, passwd, memberDetails.getAuthorities()).getName(), claims);
        String accessToken = tokens.get("accessToken");
        String refreshToken = tokens.get("refreshToken");

        Cookie cookie = new Cookie("token", "Bearer+" + accessToken);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 24 * 1);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);

        Member member = memberService.findByLoginId(memberDetails.getUsername());
        memberService.setRefreshToken(member, "Bearer+" + refreshToken);

        logHistoryService.save(LogHistory.builder()
                .logType(LogType.INFO)
                .category(Category.LOGIN)
                .message("로그인하였습니다.")
                .ip(IpGetter.getClientIP(request))
                .member(member)
                .build());

        return ResponseEntity.ok(responseService.getSuccessResult());
    }

    @GetMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response, Principal principal) {
        Member member = memberService.findByLoginId(principal.getName());

        Cookie cookie = new Cookie("token", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);

        logHistoryService.save(LogHistory.builder()
                .logType(LogType.INFO)
                .category(Category.LOGOUT)
                .message("로그아웃하였습니다.")
                .ip(IpGetter.getClientIP(request))
                .member(member)
                .build());

        return ResponseEntity.ok(responseService.getSuccessResult());
    }

    @PostMapping("/signup")
    public ResponseEntity<Response<Member>> signup(@RequestBody @Validated SignupDto signupDto, BindingResult bindingResult, HttpServletRequest request) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(responseService.getFailResult(bindingResult.getFieldError().getDefaultMessage()));
        }
        Member member = signupDto.toMember(Authority.ROLE_USER);
        member.encryptPassword(bCryptPasswordEncoder);

        logHistoryService.save(LogHistory.builder()
                .logType(LogType.INFO)
                .category(Category.SIGNUP)
                .message("회원가입하였습니다.")
                .ip(IpGetter.getClientIP(request))
                .member(member)
                .build());

        return ResponseEntity.ok(responseService.getResult("member", memberService.signup(member)));
    }


}
