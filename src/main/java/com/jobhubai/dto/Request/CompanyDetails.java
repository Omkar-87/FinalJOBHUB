package com.jobhubai.dto.Request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CompanyDetails {
    @NotBlank(message = "Company name is required")
    private String name;

    private String description;

    private Double netWorth;

    private String website;

    private String location;
}
