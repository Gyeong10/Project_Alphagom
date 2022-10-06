package com.d210.alphagom.config;

import com.d210.alphagom.common.Role;
import com.d210.alphagom.security.exception.JwtAccessDeniedHandler;
import com.d210.alphagom.security.exception.JwtAuthenticationEntryPoint;
import com.d210.alphagom.security.jwt.TokenProvider;
import com.d210.alphagom.security.oauth.CookieAuthorizationRequestRepository;
import com.d210.alphagom.security.oauth.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@RequiredArgsConstructor //final이 붙거나 @NotNull 이 붙은 필드의 생성자를 자동 생성해주는 롬복 어노테이션
@EnableWebSecurity // Spring Security 설정 활성화
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;

    private final TokenProvider tokenProvider;

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final CookieAuthorizationRequestRepository cookieAuthorizationRequestRepository;


    @Bean
    public WebSecurityCustomizer configure() {
        return (web) -> web.ignoring().mvcMatchers(
                "/v3/api-docs/**",
                "/swagger-ui/**"
        );
    }

    // PasswordEncoder 컨테이너 등록
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Order(SecurityProperties.BASIC_AUTH_ORDER)
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors()
                .configurationSource(corsConfigurationSource())
            .and()
                // exception handling 할 때 우리가 만든 클래스를 추가
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
            .and()
                .sessionManagement()
                // 웹 통신 방식 -> stateless 설정 - jwt 때문에 가능
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
                .csrf().disable() // csrf 보안 토큰 disable처리.
                .headers().frameOptions().disable() // h2-console 화면을 사용하기 위해 해당 옵션 disable
            .and()
                .authorizeRequests()// URL별 권한 권리
                .antMatchers("/","/css/**","/images/**","/js/**","/h2-console/**").permitAll()
                .antMatchers("/api/v1/test/").permitAll()
                .antMatchers("/api/be/**").permitAll()
                .antMatchers("/swagger-ui/**").permitAll()
//                .antMatchers("/api/be/**").hasRole(Role.USER.name()) // /api/v1/** 은 USER권한만 접근 가능
                .anyRequest().authenticated() // anyRequest : 설정된 값들 이외 나머지 URL 나타냄, authenticated : 인증된 사용자
            .and()
                .formLogin().disable()
                .oauth2Login() // OAuth2Login 설정 시작
                    .authorizationEndpoint() //프론트엔드에서 백엔드로 소셜로그인 요청을 보내는 URI
                        .baseUri("/api/be/oauth2/authorization") // 기본 URI는 /oauth2/authorization/{provider}
                        .authorizationRequestRepository(cookieAuthorizationRequestRepository)
                    .and()
                        .redirectionEndpoint()
                        .baseUri("/**/login/oauth2/authorization/**")
                    .and()
                        .userInfoEndpoint() // oauth2Login 성공 이후의 설정을 시작
                        // 소셜로그인 성공 시 후속 조치를 진행할 UserService 인터페이스 구현체 등록
                        .userService(customOAuth2UserService) // 리소스 서버에서 사용자 정보를 가져온 상태에서 추가로 진행하고자 하는 기능 명시 - DB 저장
//                    .and()
//                        .successHandler(oAuth2AuthenticationSuccessHandler())
//                        .failureHandler(oAuth2AuthenticationFailureHandler());
        ;
        http
                // 지정된 필터 앞에 커스텀 필터를 추가
                // JwtFilter 를 addFilterBefore 로 등록했던 JwtSecurityConfig 클래스를 적용
                .apply(new JwtSecurityConfig(tokenProvider));

        return http.build();
    }



    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}