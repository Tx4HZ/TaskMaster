package com.tx4hz.taskmaster.controller;

import com.tx4hz.taskmaster.dto.CreateProfileDTO;
import com.tx4hz.taskmaster.dto.ProfileDTO;
import com.tx4hz.taskmaster.model.Profile;
import com.tx4hz.taskmaster.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {
    private final ProfileService profileService;


    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping
    public ProfileDTO createProfile(@RequestBody CreateProfileDTO createProfileDTO) {
        return profileService.createProfile(createProfileDTO);
    }

    @PutMapping
    public ProfileDTO updateProfile(@RequestBody CreateProfileDTO updateProfile) {
        return profileService.updateProfile(updateProfile);
    }
}
