package com.jobhubai.mapper;

import com.jobhubai.dto.Request.RegisterRequest;
import com.jobhubai.entity.Company;
import com.jobhubai.entity.User;
import com.jobhubai.enums.Role;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class toUserEntity {

    private final BCryptPasswordEncoder encoder =
            new BCryptPasswordEncoder();

    public User toUser(RegisterRequest request) {

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setUsername(request.getEmail());

        user.setPassword(
                encoder.encode(request.getPassword())
        );

        user.setRole(request.getRole());

        if (request.getRole() == Role.EMPLOYER) {

            Company company = new Company();

            company.setName(request.getName());
            company.setDescription(request.getDescription());
            company.setNetWorth(request.getNetWorth());

            user.setCompany(company);
        }

        return user;
    }
}