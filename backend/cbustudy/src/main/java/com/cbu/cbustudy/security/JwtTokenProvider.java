package com.cbu.cbustudy.security;

import com.cbu.cbustudy.entity.Member;
import com.cbu.cbustudy.service.MemberService;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {
    private final String JWT_SECRET = "secretKey";
    private final int JWT_EXPIRATION_MS = 1000 * 60 * 60;

    private final MemberService memberService;

    public String generateToken(Authentication authentication) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION_MS);

        return Jwts.builder()
                .setSubject((String) authentication.getPrincipal())
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS256, JWT_SECRET)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            log.error("Invalid JWT signature");
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException e) {
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException e) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty");
        }
        return false;
    }

    public String getUserIdFromJWT(String token) {
        return Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody()
                .getId();
    }

    public Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();
    }

    public Date getExpirationDateFromJWT(String token) {
        return Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
    }

    public Boolean isTokenExpired(String token) {
        Date expiration = getExpirationDateFromJWT(token);
        return expiration.before(new Date());
    }

    public String generateAccessToken(String id, Map<String, Object> claims) {
        return Jwts.builder()
                .setClaims(claims)
                .setId(id)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION_MS * 1))
                .signWith(SignatureAlgorithm.HS256, JWT_SECRET)
                .compact();
    }

    public String generateRefreshToken(String id) {
        return Jwts.builder()
                .setId(id)
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION_MS * 5))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .signWith(SignatureAlgorithm.HS256, JWT_SECRET)
                .compact();
    }

    public Map<String, String> generateTokenSet(String id, Map<String, Object> claims) {
        HashMap<String, String> tokens = new HashMap<>();

        tokens.put("accessToken", generateAccessToken(id, claims));
        tokens.put("refreshToken", generateRefreshToken(id));

        return tokens;
    }

    public Boolean reissueRefreshToken(String id) throws Exception {
        log.info("[reissueRefreshToken] refreshToken 재발급 요청");

        Member member = memberService.findByLoginId(id);
        String refreshToken = member.getRefreshToken().substring(7);

        if (refreshToken == null) {
            log.info("[reissueRefreshToken] refreshToken 정보가 존재하지 않습니다.");
            return false;
        }

        try {
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(refreshToken);
            log.info("[reissueRefreshToken] refreshToken이 유효합니다.");
            return true;
        } catch (ExpiredJwtException e) {
            memberService.setRefreshToken(member, "Bearer+" + generateRefreshToken(id));
            log.info("[reissueRefreshToken] refreshToken 재발급 완료");
            return true;
        } catch (Exception e) {
            log.error("[reissueRefreshToken] Exception: {}", e.getMessage());
            return false;
        }
    }
}
