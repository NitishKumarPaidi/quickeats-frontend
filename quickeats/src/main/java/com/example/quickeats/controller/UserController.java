package com.example.quickeats.controller;

import com.example.quickeats.dto.LoginRequest;
import com.example.quickeats.model.User;
import com.example.quickeats.repository.UserRepository;
import com.example.quickeats.config.JwtUtil;
import com.example.quickeats.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    // Signup API
    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return userService.registerUser(user);
    }

    // Login API
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            // Simple password check (later we will encrypt passwords)
            if (user.getPassword().equals(loginRequest.getPassword())) {
                String token = JwtUtil.generateToken(user.getEmail());
                return ResponseEntity.ok("Bearer " + token);
            }
        }

        return ResponseEntity.status(401).body("Invalid email or password");
    }
}
