package com.jobhubai.dto.Request;

import com.jobhubai.enums.Role;
import jakarta.persistence.Column;
import lombok.Data;

@Data
public class UpdateProfile {
    private String name;
    private String email;
    private Role role;
}
