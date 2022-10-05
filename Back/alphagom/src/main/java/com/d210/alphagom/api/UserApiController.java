package com.d210.alphagom.api;

import com.d210.alphagom.api.dto.ResponseDTO;
import com.d210.alphagom.api.dto.UserResponse;
import com.d210.alphagom.domain.entity.User;
import com.d210.alphagom.domain.service.UserService;
import com.d210.alphagom.security.oauth.user.KakaoLogin;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Tag(name = "User", description = "User api 입니다.")
@Slf4j
@RestController
@RequestMapping("/api/be")
@RequiredArgsConstructor
public class UserApiController {

    private final UserService userService;

    private final KakaoLogin kakaoLogin;

    @Operation(summary = "유저 정보 조회", description = "유저 정보 조회 api 입니다.")
    @GetMapping("/user/{userId}")
    public ResponseEntity<UserResponse> getUserInfo(@PathVariable Long userId) {

        log.info("{}번 유저 정보 조회", userId);
        User user = userService.findUser(userId);
        return ResponseEntity.ok(new UserResponse(user.getName()));
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
    public HashMap<String, String> klogin(@RequestParam String authorize_code) {
        log.info("카카오 로그인");
        String access_token = kakaoLogin.getAccessToken(authorize_code);
        HashMap<String, String> userinfo = kakaoLogin.getUserInfo(access_token);
        System.out.println("userInfo : " + userinfo);
        return userinfo;
    }
}
