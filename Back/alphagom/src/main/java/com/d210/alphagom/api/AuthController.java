package com.d210.alphagom.api;

import com.d210.alphagom.api.dto.login.LoginRequest;
import com.d210.alphagom.api.dto.login.LoginResponse;
import com.d210.alphagom.security.exception.MethodArgumentNotValidException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/api/be/auth")
@RequiredArgsConstructor
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request, BindingResult bindingResult) {
        log.info("로그인 요청");

        validateRequest(bindingResult);

//        Long memberId = authService.login(request.getEmail(), request.getPassword());
//        String refreshToken = authService.createRefreshToken(memberId);
//        Member member = memberService.findMember(memberId);
//        String accessToken = tokenProvider.createAccessToken(member);
//
//        return ResponseEntity.ok().body(new LoginResponse("로그인되었습니다.", accessToken, refreshToken));
        return null;
    }

    private void validateRequest(BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            throw new MethodArgumentNotValidException(bindingResult);
    }
}
