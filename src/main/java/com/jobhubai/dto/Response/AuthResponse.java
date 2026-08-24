package com.jobhubai.dto.Response;

import com.jobhubai.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {

    private String token;
    private String name;
    private String email;
    private Role role;


}