package com.d210.alphagom.domain.entity;

import com.d210.alphagom.common.AuthProvider;
import com.d210.alphagom.common.Role;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user")
public class User extends BaseTimeEntity {
    // BaseTimeEntity : 모든 Entity의 상위 클래스에서 createdDate, updateDate를 자동으로 관리해주는 역할

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String password;

//    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column
    private String picture;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private boolean isCastle = false;

    /*
     * 추가 정보
     */
    private String nickname;

    private LocalDate birth;

    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider;

    private String refreshToken;

    @Builder
    public User(String name, String email, String picture, Role role, AuthProvider authProvider){
        this.name = name;
        this.email = email;
        this.picture = picture;
        this.role = role;
        this.authProvider = authProvider;
    }

    @Builder
    public User(String email, String password, String name, String nickname) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.nickname = nickname;
        this.role = Role.USER;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void updateIsCastle(boolean isCastle) {
        this.isCastle = isCastle;
    }

    public User update(String name, String picture){
        this.name = name;
        this.picture = picture;

        return this;
    }

    public String getRoleKey(){
        return this.role.getKey();
    }

    public void createRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
