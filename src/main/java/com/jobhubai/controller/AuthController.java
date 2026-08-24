package com.jobhubai.controller;

import com.jobhubai.dto.Request.LoginRequest;
import com.jobhubai.dto.Request.NewPassword;
import com.jobhubai.dto.Request.RegisterRequest;
import com.jobhubai.dto.Request.ResetPass;
import com.jobhubai.dto.Response.AuthResponse;
import com.jobhubai.Service.AuthService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    @Autowired
    private final AuthService authService;


    // =========================
    // REGISTER
    // =========================

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(
            @Valid @RequestBody RegisterRequest request) {

        return authService.register(request);
    }


    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public AuthResponse login(
            @Valid @RequestBody LoginRequest request) {

        return authService.verify(request);
    }


    // =========================
    // FORGOT PASSWORD
    // =========================

    @PostMapping("/forgot-password")
    public String forgotPassword(
            @Valid @RequestBody ResetPass request) {

        return authService.reset(request);
    }


    // =========================
    // RESET PASSWORD
    // =========================

    @PostMapping("/reset-password")
    public String resetPassword(
            @Valid @RequestBody NewPassword request) {

        return authService.confirm(request);
    }
}