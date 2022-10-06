package com.d210.alphagom.api;

import com.d210.alphagom.api.dto.ResponseDTO;
import com.d210.alphagom.api.dto.User.UserSignUpRequest;
import com.d210.alphagom.api.dto.UserResponse;
import com.d210.alphagom.api.dto.login.LoginResponse;
import com.d210.alphagom.common.AuthProvider;
import com.d210.alphagom.common.Role;
import com.d210.alphagom.domain.entity.User;
import com.d210.alphagom.domain.service.UserService;
import com.d210.alphagom.security.exception.MethodArgumentNotValidException;
import com.d210.alphagom.security.oauth.AuthService;
import com.d210.alphagom.security.oauth.MyTokenProvider;
import com.d210.alphagom.security.oauth.user.KakaoLogin;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Optional;

@Tag(name = "User", description = "User api 입니다.")
@Slf4j
@RestController
@RequestMapping("/api/be")
@RequiredArgsConstructor
public class UserApiController {

    private final UserService userService;
    private final AuthService authService;
    private final MyTokenProvider tokenProvider;

    private final KakaoLogin kakaoLogin;
    private final PasswordEncoder passwordEncoder;

    @Operation(summary = "유저 정보 조회", description = "유저 정보 조회 api 입니다.")
    @GetMapping("/user/{userId}")
    public ResponseEntity<UserResponse> getUserInfo(@PathVariable Long userId) {

        log.info("{}번 유저 정보 조회", userId);
        User user = userService.findUser(userId);
        return ResponseEntity.ok(new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getPicture(), user.getNickname()));
    }

    @Operation(summary = "유저 닉네임 저장", description = "유저 닉네임 저장 api 입니다.")
    @PostMapping("/user/{userId}/nickname/{nickname}")
    public ResponseEntity<?> saveNickName(@PathVariable Long userId, @PathVariable String nickname) {
        
        log.info("{}번 유저 닉네임 : {} 저장", userId, nickname);
        userService.saveNickname(userId, nickname);
        return ResponseEntity.ok(new ResponseDTO("닉네임이 저장되었습니다"));
    }

    @Operation(summary = "튜토리얼 통과 여부 저장", description = "튜토리얼 통과 여부 저장 api 입니다.")
    @PutMapping("/user/{userId}/castle")
    public ResponseEntity<?> checkPassCastle(@PathVariable Long userId) {
        
        log.info("{}번 유저 튜토리얼 통과", userId);
        userService.checkIsCastle(userId);
        return ResponseEntity.ok(new ResponseDTO("튜토리얼을 통과하였습니다."));
    }

    @GetMapping("/klogin")
//    public HashMap<String, String> klogin(@RequestParam String authorize_code) {
    public ResponseEntity<?> klogin(@RequestParam String authorize_code) {
        log.info("카카오 로그인");
        String access_token = kakaoLogin.getAccessToken(authorize_code);
        HashMap<String, String> userinfo = kakaoLogin.getUserInfo(access_token);
        System.out.println("userInfo : " + userinfo);

        // email 로 이미 회원가입 했는지 안했는지 체크
        log.info("회원가입 여부 체크");
        Optional<User> user = userService.findByEmail(userinfo.get("email"));
        if (!user.isPresent()) { // 회원가입 안했으면 DB에 저장 (회원가입)
            User tmpuser = User.builder()
                    .email(userinfo.get("email"))
                    .name(userinfo.get("nickname"))
                    .picture(userinfo.get("picture"))
                    .role(Role.USER)
                    .authProvider(AuthProvider.KAKAO)
                    .build();
            userService.joinMember(tmpuser);
            user = userService.findByEmail(tmpuser.getEmail());
        }

        // 회원가입 했으면
        // 로그인 해서 jwt를 보내준다.
        log.info("로그인 요청");
        String refreshToken = authService.createRefreshToken(user.get().getId());
        String accessToken = tokenProvider.createAccessToken(user.get());
//        return userinfo;
        return ResponseEntity.ok().body(new LoginResponse("로그인되었습니다.", user.get().getId(), accessToken, refreshToken));
    }

    @PostMapping("/signup")
    public ResponseEntity<ResponseDTO> signup(@Valid @RequestBody UserSignUpRequest request, BindingResult bindingResult) {
        log.info("회원가입 요청");
        validateRequest(bindingResult);
        userService.joinMember(request.convertMember(passwordEncoder));
        return ResponseEntity.ok(new ResponseDTO("회원가입이 완료되었습니다."));
    }

    private void validateRequest(BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            throw new MethodArgumentNotValidException(bindingResult);
    }
}
