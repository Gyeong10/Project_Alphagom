package com.d210.alphagom.security.exception;

import javax.security.auth.message.AuthException;

public class LoginException extends AuthException {
    public LoginException() {
        super("이메일 혹은 패스워드를 다시 확인해주세요.");
    }
}
