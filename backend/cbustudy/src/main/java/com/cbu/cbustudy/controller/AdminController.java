package com.cbu.cbustudy.controller;

import com.cbu.cbustudy.dto.LogHistoryDto;
import com.cbu.cbustudy.dto.LoginDto;
import com.cbu.cbustudy.dto.MemberDto;
import com.cbu.cbustudy.entity.Member;
import com.cbu.cbustudy.response.Response;
import com.cbu.cbustudy.security.JwtTokenProvider;
import com.cbu.cbustudy.security.MemberDetailsService;
import com.cbu.cbustudy.security.UserAuthentication;
import com.cbu.cbustudy.service.LogHistoryService;
import com.cbu.cbustudy.service.MemberService;
import com.cbu.cbustudy.service.ResponseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final MemberService memberService;
    private final MemberDetailsService memberDetailsService;
    private final LogHistoryService logHistoryService;
    private final ResponseService responseService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public ResponseEntity<Response> adminLogin(@RequestBody @Validated LoginDto loginDto, BindingResult bindingResult, HttpServletResponse response) throws UsernameNotFoundException {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(responseService.getFailResult(bindingResult.getFieldError().getDefaultMessage()));
        }
        String loginId = loginDto.getLoginId();
        String passwd = loginDto.getPasswd();

        UserDetails memberDetails = memberDetailsService.loadUserByUsername(loginId);
        if (!bCryptPasswordEncoder.matches(passwd, memberDetails.getPassword())) {
            return ResponseEntity.badRequest().body(responseService.getFailResult("사용자 정보가 일치하지 않습니다."));
        }
        if (memberDetails.getAuthorities().stream().filter(authority -> authority.getAuthority().equals("ROLE_ADMIN")).findAny().isEmpty()) {
            return ResponseEntity.badRequest().body(responseService.getFailResult("접근 권한이 없습니다. 관리자에게 문의하십시오."));
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

        memberService.setRefreshToken(memberService.findByLoginId(memberDetails.getUsername()), "Bearer+" + refreshToken);

        return ResponseEntity.ok(responseService.getSuccessResult());
    }

    @GetMapping("/my")
    public ResponseEntity<Response<MemberDto>> getAdmin(Principal principal) {
        Member member = memberService.findByLoginId(principal.getName());
        MemberDto memberDto = MemberDto.builder()
                .id(member.getId())
                .loginId(member.getLoginId())
                .memberName(member.getMemberName())
                .academic(member.getAcademic())
                .grade(member.getGrade())
                .department(member.getDepartment())
                .build();

        return ResponseEntity.ok(responseService.getResult("admin", memberDto));
    }

    @GetMapping("/logs")
    public ResponseEntity<Response<List<LogHistoryDto>>> getLogHistories() {
        List<LogHistoryDto> logHistoryDtos = logHistoryService.findAll().stream()
                .map(logHistory -> LogHistoryDto.builder()
                        .id(logHistory.getId())
                        .createdDate(logHistory.getCreatedDate())
                        .logType(logHistory.getLogType().name())
                        .category(logHistory.getCategory().name())
                        .message(logHistory.getMessage())
                        .memberId(logHistory.getMember().getId())
                        .memberName(logHistory.getMember().getMemberName())
                        .memberLoginId(logHistory.getMember().getLoginId())
                        .ip(logHistory.getIp())
                        .build())
                .collect(Collectors.toList());

        return ResponseEntity.ok(responseService.getResult("logHistories", logHistoryDtos));
    }
}
