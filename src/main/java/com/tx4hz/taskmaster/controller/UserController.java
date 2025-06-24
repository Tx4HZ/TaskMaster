package com.tx4hz.taskmaster.controller;

import com.tx4hz.taskmaster.dto.AuthUserRequest;
import com.tx4hz.taskmaster.dto.CreateUserRequest;
import com.tx4hz.taskmaster.dto.UpdateUserRequest;
import com.tx4hz.taskmaster.dto.UserDTO;
import com.tx4hz.taskmaster.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserDTO createUser(@Valid @RequestBody CreateUserRequest request) throws IllegalStateException {
        return userService.createUser(request);
    }

    @PostMapping("/login")
    public String authUser(@RequestBody AuthUserRequest  userDTO) {
        return userService.authUser(userDTO);
    }

    @GetMapping("/{id}")
    public UserDTO getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/{id}")
    public UserDTO updateUser(@PathVariable Long id, @RequestBody UpdateUserRequest request) {
        return userService.updateUser(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
