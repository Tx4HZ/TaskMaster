package com.tx4hz.taskmaster.dto;

import lombok.Data;

@Data
public class AuthUserRequest {
    private String username;
    private String password;
}
