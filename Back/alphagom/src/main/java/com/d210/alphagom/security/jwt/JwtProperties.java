package com.d210.alphagom.security.jwt;

public interface JwtProperties {
    long accessTokenValidTime = 3 * 60 * 1000L;
    long refreshTokenValidTime = 365 * 24 * 60 * 60 * 1000L;
}
