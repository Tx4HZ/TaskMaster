package com.tx4hz.taskmaster.controller;

import com.tx4hz.taskmaster.dto.*;
import com.tx4hz.taskmaster.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

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

    @PostMapping("/login")
    public String authUser(@RequestBody AuthUserRequest  userDTO) {
        return userService.authUser(userDTO);
    }

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

    @DeleteMapping("/{id}")
    public ResponseEntity<EntityResponse> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(EntityResponse.success("User with id " + id + "deleted"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(EntityResponse.error("Failed to update user: " + e.getMessage()));
        }
    }
}
