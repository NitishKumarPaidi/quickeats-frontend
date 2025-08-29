package com.example.quickeats.controller;

import com.example.quickeats.model.User;
import com.example.quickeats.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173") // frontend URL
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {
        User savedUser = service.register(user);
        return ResponseEntity.ok(savedUser);
    }
}
