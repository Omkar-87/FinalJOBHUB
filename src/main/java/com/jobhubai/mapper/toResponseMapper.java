package com.jobhubai.mapper;

import com.jobhubai.dto.Response.UserResponse;
import com.jobhubai.entity.User;
import org.springframework.stereotype.Component;

@Component
public class toResponseMapper {
    public UserResponse toResponse(User user)
    {
        UserResponse userResponse=new UserResponse();
        userResponse.setName(user.getUsername());
        userResponse.setEmail(user.getEmail());
        userResponse.setExperience(user.getExperience());
        userResponse.setRole(user.getRole());
        return userResponse;
    }
}
