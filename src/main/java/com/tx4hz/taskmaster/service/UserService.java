package com.tx4hz.taskmaster.service;

import com.tx4hz.taskmaster.dto.*;
import com.tx4hz.taskmaster.model.Profile;
import com.tx4hz.taskmaster.model.User;
import com.tx4hz.taskmaster.repository.UserRepository;
import com.tx4hz.taskmaster.service.mapper.UserMapper;
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
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JWTService jwtService, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userMapper = userMapper;
    }

    /**
     * Creates a new user with the provided details, encoding the password and checking for duplicates.
     *
     * @param createUserDTO DTO containing user creation data
     * @return UserDTO of the created user
     * @throws IllegalStateException if username or email is already taken
     */
    public UserDTO createUser(CreateUserDTO createUserDTO) {
        if (userRepository.existsByUsername(createUserDTO.getUsername()) && userRepository.existsByEmail(createUserDTO.getEmail())){
            throw new IllegalStateException("You cannot use this data");
        }
        createUserDTO.setPassword(passwordEncoder.encode(createUserDTO.getPassword()));
        User user = userMapper.toEntity(createUserDTO);
        User savedUser = userRepository.save(user);
        return userMapper.toDTO(savedUser);
    }

    /**
     * Authenticates a user and generates a JWT token if successful.
     *
     * @param userDTO DTO containing username and password
     * @return JWT token if authentication is successful, "Fail" otherwise
     */
    public String authUser(CreateUserDTO userDTO) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword()));

        return authentication.isAuthenticated() ? jwtService.generateToken(userDTO.getUsername()) : "Fail";
    }

    /**
     * Retrieves a user by their ID.
     *
     * @param id User ID
     * @return UserDTO of the found user
     * @throws IllegalStateException if user is not found
     */
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("User not found by " + id + " id"));
        return userMapper.toDTO(user);
    }

    /**
     * Retrieves all users.
     *
     * @return List of UserDTOs
     */
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Updates an existing user's details.
     *
     * @param id      User ID
     * @param request DTO containing updated user data
     * @return Updated UserDTO
     * @throws IllegalStateException if user is not found or data is invalid
     */
    @Transactional
    public UserDTO updateUser(Long id, CreateUserDTO request) {
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
        return userMapper.toDTO(updatedUser);
    }

    /**
     * Deletes a user by their ID.
     *
     * @param id User ID
     * @throws IllegalStateException if user is not found
     */
    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalStateException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }
}