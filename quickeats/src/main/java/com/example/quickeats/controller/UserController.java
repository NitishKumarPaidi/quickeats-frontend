package com.example.quickeats.controller;

import com.example.quickeats.dto.LoginRequest;
import com.example.quickeats.model.User;
import com.example.quickeats.repository.UserRepository;
import com.example.quickeats.config.JwtUtil;
import com.example.quickeats.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
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
        // System.out.println("Login attempt: " + loginRequest.getEmail() + " / " +
        // loginRequest.getPassword());
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // System.out.println("Found user: " + user.getEmail() + " / " +
            // user.getPassword());

            // Simple password check (later we will encrypt passwords)
            if (user.getPassword().equals(loginRequest.getPassword())) {

                String token = JwtUtil.generateToken(user.getEmail());
                // System.out.println("✅ Password matched. Returning token.");
                return ResponseEntity.ok(Map.of(
                        "token", token,
                        "name", user.getName(),
                        "id", user.getId()));
            }
            // else {
            // System.out.println("❌ Password mismatch");
            // }
        }
        // else {
        // System.out.println("❌ User not found");
        // }

        return ResponseEntity.status(401).body("Invalid email or password");
    }

}
