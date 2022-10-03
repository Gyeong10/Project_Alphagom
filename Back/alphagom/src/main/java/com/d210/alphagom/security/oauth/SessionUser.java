package com.d210.alphagom.security.oauth;

import com.d210.alphagom.domain.entity.User;

import java.io.Serializable;

public class SessionUser implements Serializable {
    private String name;
    private String email;
    private String picture;

    public SessionUser(User user){
        this.name = user.getName();
        this.email = user.getEmail();
        this.picture = user.getPicture();
    }
}
