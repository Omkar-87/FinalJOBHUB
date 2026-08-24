package com.jobhubai.dto.Response;

import lombok.Data;

@Data
public class CompanyResponse {
    Long id;
    String name;
    String description;
    String location;
    String website;
    Double netWorth;
}
