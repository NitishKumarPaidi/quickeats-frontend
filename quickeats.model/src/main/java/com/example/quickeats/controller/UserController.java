package com.example.quickeats.controller;

import com.example.quickeats.model.User;
import com.example.quickeats.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return userService.registerUser(user);
    }
}
