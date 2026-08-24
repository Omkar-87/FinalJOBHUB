package com.jobhubai.dto.Request;

import lombok.Data;

@Data
public class UpdateCompanyDetails {
    private Long id;

    private String name;
    private String description;
    private String location;
    private String website;
    private Double netWorth;
}

