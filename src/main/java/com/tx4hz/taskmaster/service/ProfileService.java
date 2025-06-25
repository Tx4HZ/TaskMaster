package com.tx4hz.taskmaster.service;

import com.tx4hz.taskmaster.model.Profile;
import com.tx4hz.taskmaster.model.User;
import com.tx4hz.taskmaster.repository.ProfileRepository;
import com.tx4hz.taskmaster.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/* To-do:
*  create updateProfile()
*/

@Service
public class ProfileService {
    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public ProfileService(ProfileRepository profileRepository, UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Profile createProfile(Profile profile) {
        // Get auth user
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found: " + username);
        }

        User user = userOptional.get();

        // User have profile?
        if (user.getProfile() != null) {
            throw new RuntimeException("User already has a profile");
        }

        Profile savedProfile = profileRepository.save(profile);

        user.setProfile(savedProfile);

        userRepository.save(user);

        return savedProfile;
    }
}
