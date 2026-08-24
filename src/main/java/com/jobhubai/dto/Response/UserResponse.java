package com.jobhubai.dto.Response;

import com.jobhubai.enums.CurrentJobCondition;
import com.jobhubai.enums.Role;
import jakarta.persistence.Column;
import lombok.Data;

import java.util.List;
@Data
public class UserResponse {

    private String name;
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    private Integer experience;
    private CurrentJobCondition currentJobCondition;
    private Role role;
}
