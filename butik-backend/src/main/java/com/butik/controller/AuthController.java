package com.butik.controller;

import com.butik.model.Admin;
import com.butik.model.AuthRequest;
import com.butik.repository.AdminRepository;
import com.butik.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtUtil jwtUtil;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(JwtUtil jwtUtil, AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.jwtUtil = jwtUtil;
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")

    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        return adminRepository.findByUsername(request.getUsername())
                .filter(admin -> passwordEncoder.matches(request.getPassword(), admin.getPassword()))
                .map(admin -> ResponseEntity.ok(jwtUtil.generateToken(admin.getUsername())))
                .orElse(ResponseEntity.status(401).body("Kullanıcı adı veya şifre hatalı"));
    }
}

