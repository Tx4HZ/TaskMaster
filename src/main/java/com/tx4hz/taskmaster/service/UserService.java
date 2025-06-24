package com.tx4hz.taskmaster.service;

import com.tx4hz.taskmaster.dto.AuthUserRequest;
import com.tx4hz.taskmaster.dto.CreateUserRequest;
import com.tx4hz.taskmaster.dto.UpdateUserRequest;
import com.tx4hz.taskmaster.dto.UserDTO;
import com.tx4hz.taskmaster.model.User;
import com.tx4hz.taskmaster.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JWTService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public UserDTO createUser(CreateUserRequest request) throws IllegalStateException {
        if (userRepository.existsByUsername(request.getUsername()) && userRepository.existsByEmail(request.getEmail())){
            throw new IllegalStateException("You cannot use this data");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User saveUser = userRepository.save(user);
        return convertToDto(saveUser);
    }

    public String authUser(AuthUserRequest userDTO) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword()));

        return authentication.isAuthenticated() ? jwtService.generateToken(userDTO.getUsername()) : "Fail";
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("User not found by " + id + " id"));
        return convertToDto(user);
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public UserDTO updateUser(Long id, UpdateUserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("User not found with id: " + id));

        if(request.getUsername() != null && !request.getUsername().isBlank()) {
            if (userRepository.existsByUsername(request.getUsername())) {
                throw new IllegalStateException("Username already taken");
            }
            user.setUsername(request.getUsername());
        }

        if(request.getEmail() != null && !request.getEmail().isBlank()) {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new IllegalStateException("Email already taken");
            }
            user.setEmail(request.getEmail());
        }

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        User updatedUser = userRepository.save(user);
        return convertToDto(updatedUser);
    }

    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalStateException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    private UserDTO convertToDto(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        return dto;
    }
}
