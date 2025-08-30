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
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            // Simple password check (later we will encrypt passwords)
            if (user.getPassword().equals(loginRequest.getPassword())) {
                // System.out.println("Login attempt: " + loginRequest.getEmail() + " / " +
                // loginRequest.getPassword());
                // userOpt.ifPresent(u -> System.out.println("Found user: " + u.getEmail() + " /
                // " + u.getPassword()));

                String token = JwtUtil.generateToken(user.getEmail());
                return ResponseEntity.ok(Map.of(
                        "token", "Bearer " + token,
                        "name", user.getName()));
            }
        }

        return ResponseEntity.status(401).body("Invalid email or password");
    }

    // // Get current logged-in user info (using JWT)
    // @GetMapping("/me")
    // public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization")
    // String authHeader) {
    // try {
    // String token = authHeader.replace("Bearer ", "");
    // String email = JwtUtil.validateToken(token);
    // Optional<User> userOpt = userRepository.findByEmail(email);
    // if (userOpt.isPresent()) {
    // return ResponseEntity.ok(userOpt.get());
    // } else {
    // return ResponseEntity.status(404).body("User not found");
    // }
    // } catch (Exception e) {
    // return ResponseEntity.status(401).body("Invalid token");
    // }
    // }

}
