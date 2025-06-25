package com.tx4hz.taskmaster.dto;


public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private ProfileDTO profile;

    public UserDTO() {
    }

    public UserDTO(Long id, String username, String email, ProfileDTO profile) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.profile = profile;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public ProfileDTO getProfile() {
        return profile;
    }

    public void setProfile(ProfileDTO profile) {
        this.profile = profile;
    }
}
