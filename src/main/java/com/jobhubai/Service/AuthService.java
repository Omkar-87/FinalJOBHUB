package com.jobhubai.Service;

import com.jobhubai.dto.Request.LoginRequest;
import com.jobhubai.dto.Request.NewPassword;
import com.jobhubai.dto.Request.RegisterRequest;
import com.jobhubai.dto.Request.ResetPass;
import com.jobhubai.dto.Response.AuthResponse;
import com.jobhubai.entity.ResetPassword;
import com.jobhubai.entity.User;
import com.jobhubai.enums.Role;
import com.jobhubai.exception.DuplicateException;
import com.jobhubai.exception.NoAcessException;
import com.jobhubai.mapper.toUserEntity;
import com.jobhubai.Repository.ResetRepo;
import com.jobhubai.Repository.UserRepo;
import com.jobhubai.security.JWTservice;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;

@Service
public class AuthService {

    @Autowired
    UserRepo repo;

    @Autowired
    private toUserEntity toUserEntity;

    @Autowired
    private JWTservice Jwt;

    @Autowired
    ResetRepo resetRepo;

    @Autowired
    AuthenticationManager authenticationManager;

    private final BCryptPasswordEncoder encoder =
            new BCryptPasswordEncoder();


    // =========================
    // REGISTER
    // =========================

    public AuthResponse register(RegisterRequest registerRequest) {

        if (registerRequest.getRole()== Role.ADMIN) {
            throw new NoAcessException("Aukat me rahe Bhadwe");
        }

        if (repo.existsByEmail(registerRequest.getEmail())) {
            throw new DuplicateException("Bsdk tu alag he kya ise ");
        }

        User user = toUserEntity.toUser(registerRequest);

        if (registerRequest.getRole()==Role.EMPLOYEE) {

            user.setRole(registerRequest.getRole());
            user.setExperience(registerRequest.getExperience());

        }

        if (registerRequest.getRole()==Role.EMPLOYER) {

            user.setRole(registerRequest.getRole());
            user.setUsername(registerRequest.getUsername());

            user.getCompany().setName(
                    registerRequest.getUsername()
            );

            user.getCompany().setDescription(
                    registerRequest.getDescription()
            );

            user.getCompany().setNetWorth(
                    registerRequest.getNetWorth()
            );
        }

        repo.save(user);

        return sendData(registerRequest.getUsername());
    }


    // =========================
    // LOGIN
    // =========================

    public AuthResponse verify(@Valid LoginRequest loginRequest) {

        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                );

        Authentication authentication =
                authenticationManager.authenticate(token);

        if (authentication.isAuthenticated()) {

            return sendData(
                    loginRequest.getUsername()
            );
        }

        return null;
    }


    // =========================
    // SEND JWT + USER DATA
    // =========================

    public AuthResponse sendData(String username) {

        User user =
                repo.findByUsername(username);

        String token =
                Jwt.generateToken(username);

        AuthResponse authResponse =
                new AuthResponse(
                        token,
                        user.getUsername(),
                        user.getEmail(),
                        user.getRole()
                );

        return authResponse;
    }


    // =========================
    // FORGOT PASSWORD
    // =========================

    public String reset(@Valid ResetPass resetPass) {

        if (repo.existsByEmail(resetPass.getEmail())) {

            SecureRandom secureRandom =
                    new SecureRandom();

            byte[] token = new byte[32];

            secureRandom.nextBytes(token);

            String tokenString =
                    Base64.getEncoder()
                            .encodeToString(token);

            User user =
                    repo.findByEmail(
                            resetPass.getEmail()
                    );

            ResetPassword resetPassword =
                    user.getResetPassword();

            resetPassword.setUser(user);

            resetPassword.setToken(
                    encoder.encode(tokenString)
            );

            resetPassword.setEmail(
                    resetPass.getEmail()
            );

            resetPassword.setExpiration(
                    LocalDateTime.now().plusMinutes(30)
            );

            resetPassword.setUsed(false);

            resetRepo.save(resetPassword);
        }

        return "Checking Chal rahi he ruk jaa";
    }


    // =========================
    // CONFIRM NEW PASSWORD
    // =========================

    public String confirm(
            @Valid NewPassword newPassword) {

        User user =
                repo.findByEmail(
                        newPassword.getEmail()
                );

        ResetPassword resetPassword =
                user.getResetPassword();

        boolean correct =
                encoder.matches(
                        newPassword.getToken(),
                        resetPassword.getToken()
                );

        boolean time =
                LocalDateTime.now()
                        .isBefore(
                                resetPassword.getExpiration()
                        );

        boolean used =
                !resetPassword.isUsed();


        if (correct && time && used) {

            if (newPassword.getNewPassword()
                    .equals(
                            newPassword
                                    .getConfirmNewPassword()
                    )) {

                user.setPassword(
                        encoder.encode(
                                newPassword
                                        .getNewPassword()
                        )
                );

            } else {

                return "Dhang se likh le passWord";
            }

            repo.save(user);

            resetPassword.setUsed(true);

            resetRepo.save(resetPassword);

            return "Password changed Successfully";

        } else {

            return "Sach bola kar bkl";
        }
    }
}