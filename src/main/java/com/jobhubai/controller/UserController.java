package com.jobhubai.controller;

import com.jobhubai.Service.UserService;
import com.jobhubai.dto.Request.UpdateProfile;
import com.jobhubai.dto.Response.UserResponse;
import com.jobhubai.security.UserPrincipal;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }


    @PatchMapping("/profile")
    public String updateProfile(
            @Valid @RequestBody UpdateProfile updatedProfile,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        String username = userPrincipal.getUsername();

        return userService.updateProfile(
                username,
                updatedProfile
        );
    }

    @DeleteMapping("/{id}")
    public String deleteProfile(@PathVariable Long id) {
        return userService.deleteProfile(id);
    }
}