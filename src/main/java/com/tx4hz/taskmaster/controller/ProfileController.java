package com.tx4hz.taskmaster.controller;

import com.tx4hz.taskmaster.dto.CreateProfileDTO;
import com.tx4hz.taskmaster.dto.EntityResponse;
import com.tx4hz.taskmaster.dto.ProfileDTO;
import com.tx4hz.taskmaster.service.ProfileService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing user profile operations, including creation and updating.
 */
@RestController
@RequestMapping("/api/profiles")
public class ProfileController {
    private final ProfileService profileService;


    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    /**
     * Creates a profile for the authenticated user.
     *
     * @param createProfileDTO DTO containing profile creation data
     * @return ResponseEntity with created ProfileDTO or error message
     */
    @PostMapping
    public ResponseEntity<EntityResponse<ProfileDTO>> createProfile(@RequestBody CreateProfileDTO createProfileDTO) {
        try {
            ProfileDTO profileDTO = profileService.createProfile(createProfileDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(EntityResponse.success(profileDTO));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(EntityResponse.error("Failed to create profile: " + e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(EntityResponse.error("Failed to create profile: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(EntityResponse.error("Failed to create profile: " + e.getMessage()));
        }
    }

    /**
     * Updates the profile of the authenticated user.
     *
     * @param updateProfileDTO DTO containing updated profile data
     * @return ResponseEntity with updated ProfileDTO or error message
     */
    @PutMapping
    public ResponseEntity<EntityResponse<ProfileDTO>> updateProfile(@RequestBody CreateProfileDTO updateProfileDTO) {
        try {
            ProfileDTO profileDTO = profileService.updateProfile(updateProfileDTO);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(EntityResponse.success(profileDTO));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(EntityResponse.error("Failed to update profile: " + e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(EntityResponse.error("Failed to update profile: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(EntityResponse.error("Failed to update profile: " + e.getMessage()));
        }
    }
}