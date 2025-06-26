package com.tx4hz.taskmaster.service;

import com.tx4hz.taskmaster.dto.CreateProfileDTO;
import com.tx4hz.taskmaster.dto.ProfileDTO;
import com.tx4hz.taskmaster.model.Profile;
import com.tx4hz.taskmaster.model.User;
import com.tx4hz.taskmaster.repository.ProfileRepository;
import com.tx4hz.taskmaster.repository.UserRepository;
import com.tx4hz.taskmaster.service.mapper.ProfileMapper;
import com.tx4hz.taskmaster.service.mapper.UserMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {
    private final ProfileRepository profileRepository;
    private final ProfileMapper profileMapper;
    private final UserRepository userRepository;

    public ProfileService(ProfileRepository profileRepository, ProfileMapper profileMapper, UserRepository userRepository, UserMapper userMapper) {
        this.profileRepository = profileRepository;
        this.profileMapper = profileMapper;
        this.userRepository = userRepository;
    }

    /**
     * Create the profile of the authenticated user based on the provided DTO.
     *
     * @param createProfileDTO DTO containing created profile information
     * @return ProfileDTO representing the created profile
     * @throws EntityNotFoundException if the user is not found or user already has a profile
     */
    @Transactional
    public ProfileDTO createProfile(CreateProfileDTO createProfileDTO) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found with username: " + username));

        if (user.getProfile() != null) {
            throw new RuntimeException("User already has a profile");
        }

        Profile savedProfile = profileRepository.save(profileMapper.toEntity(createProfileDTO));
        user.setProfile(savedProfile);
        userRepository.save(user);

        return profileMapper.toDTO(savedProfile);
    }

    /**
     * Updates the profile of the authenticated user based on the provided DTO.
     *
     * @param updateProfile DTO containing updated profile information
     * @return ProfileDTO representing the updated profile
     * @throws EntityNotFoundException if the user or profile is not found
     */
    @Transactional
    public ProfileDTO updateProfile(CreateProfileDTO updateProfile) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found with username: " + username));
        
        Profile profile = Optional.ofNullable(user.getProfile())
                .orElseThrow(() -> new EntityNotFoundException("Profile not found for user: " + username));
        
        updateProfileFields(profile, updateProfile);

        Profile updatedProfile = profileRepository.save(profile);

        return profileMapper.toDTO(updatedProfile);
    }

    /**
     * Helper method to update profile fields from DTO.
     *
     * @param profile       The profile entity to update
     * @param updateProfile The DTO containing updated data
     */
    private void updateProfileFields(Profile profile, CreateProfileDTO updateProfile) {
        profile.setName(updateProfile.getName());
        profile.setSurname(updateProfile.getSurname());
        profile.setPatronymic(updateProfile.getPatronymic());
        profile.setBirthday(updateProfile.getBirthday());
        profile.setStatus(updateProfile.getStatus());
        profile.setTechnologies(updateProfile.getTechnologies());
    }
}
