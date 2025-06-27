package com.tx4hz.taskmaster.controller;

import com.tx4hz.taskmaster.dto.*;
import com.tx4hz.taskmaster.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing user-related operations, including registration, authentication,
 * retrieval, updating, and deletion of users.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Registers a new user with the provided details.
     *
     * @param createUserDTO DTO containing user registration data
     * @return ResponseEntity with created UserDTO or error message
     */
    @PostMapping("/register")
    public ResponseEntity<EntityResponse<UserDTO>> createUser(@Valid @RequestBody CreateUserDTO createUserDTO) {
        try {
            UserDTO userDTO = userService.createUser(createUserDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(EntityResponse.success(userDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(EntityResponse.error("Failed to create user: " + e.getMessage()));
        }
    }

    /**
     * Authenticates a user and returns a JWT token.
     *
     * @param userDTO DTO containing username and password
     * @return JWT token if authentication is successful, "Fail" otherwise
     */
    @PostMapping("/login")
    public ResponseEntity<String> authUser(@RequestBody CreateUserDTO  userDTO) {
        String token = userService.authUser(userDTO);
        return ResponseEntity.status(token.equals("Fail") ? HttpStatus.UNAUTHORIZED : HttpStatus.OK)
                .body(token);
    }

    /**
     * Retrieves a user by their ID.
     *
     * @param id User ID
     * @return ResponseEntity with UserDTO or error message
     */
    @GetMapping("/{id}")
    public ResponseEntity<EntityResponse<UserDTO>> getUser(@PathVariable Long id) {
        try {
            UserDTO userDTO = userService.getUserById(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(EntityResponse.success(userDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(EntityResponse.error("Failed to find user: " + e.getMessage()));
        }
    }

    /**
     * Retrieves all users.
     *
     * @return ResponseEntity with list of UserDTOs or error message
     */
    @GetMapping
    public ResponseEntity<EntityResponse<List<UserDTO>>> getAllUsers() {
        try {
            List<UserDTO> userDTO = userService.getAllUsers();
            return ResponseEntity.status(HttpStatus.OK)
                    .body(EntityResponse.success(userDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(EntityResponse.error("Failed to get users: " + e.getMessage()));
        }
    }

    /**
     * Updates an existing user's details.
     *
     * @param id            User ID
     * @param createUserDTO DTO containing updated user data
     * @return ResponseEntity with updated UserDTO or error message
     */
    @PutMapping("/{id}")
    public ResponseEntity<EntityResponse<UserDTO>> updateUser(@PathVariable Long id, @RequestBody CreateUserDTO createUserDTO) {
        try {
            UserDTO userDTO = userService.updateUser(id, createUserDTO);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(EntityResponse.success(userDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(EntityResponse.error("Failed to update user: " + e.getMessage()));
        }
    }

    /**
     * Deletes a user by their ID.
     *
     * @param id User ID
     * @return ResponseEntity with success or error message
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<EntityResponse> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(EntityResponse.success("User with id " + id + "deleted"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(EntityResponse.error("Failed to update user: " + e.getMessage()));
        }
    }
}