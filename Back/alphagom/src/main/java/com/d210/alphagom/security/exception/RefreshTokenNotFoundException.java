package com.d210.alphagom.security.exception;

import javax.security.auth.message.AuthException;

public class RefreshTokenNotFoundException extends AuthException {
    public RefreshTokenNotFoundException() {
        super("토큰이 유효하지 않습니다.");
    }
}
