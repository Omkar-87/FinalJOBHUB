package com.jobhubai.Service;

import com.jobhubai.Repository.UserRepo;
import com.jobhubai.dto.Request.UpdateProfile;
import com.jobhubai.dto.Response.UserResponse;
import com.jobhubai.entity.User;
import com.jobhubai.exception.NotFound;
import com.jobhubai.mapper.toResponseMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private final UserRepo repo;
    @Autowired
    private final toResponseMapper responseMapper;

    public UserService(UserRepo repo, toResponseMapper responseMapper) {
        this.repo = repo;
        this.responseMapper = responseMapper;
    }

    public UserResponse getUser(Long id) {

        User user = repo.findById(id)
                .orElseThrow(() -> new NotFound("User not found"));

        return responseMapper.toResponse(user);
    }


    public String updateProfile(
            String username,
            UpdateProfile updatedProfile) {

        User user = repo.findByusername(username);

        if (user == null) {
            throw new NotFound("User not found");
        }

        if (updatedProfile.getName() != null) {
            user.setName(updatedProfile.getName());
        }

        if (updatedProfile.getEmail() != null) {
            user.setEmail(updatedProfile.getEmail());
        }

        repo.save(user);

        return "Profile successfully updated";
    }


    public String deleteProfile(Long id) {

        User user = repo.findById(id)
                .orElseThrow(() -> new NotFound("User not found"));

        repo.delete(user);

        return "User deleted successfully";
    }
}