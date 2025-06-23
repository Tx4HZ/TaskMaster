package com.tx4hz.taskmaster.dto;

import lombok.Data;

@Data
public class UpdateUserRequest {
    private String username;
    private String email;
    private String password;
}
