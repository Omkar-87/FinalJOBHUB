package com.jobhubai.mapper;

import com.jobhubai.dto.Response.CompanyResponse;
import com.jobhubai.entity.Company;
import org.springframework.stereotype.Component;

@Component
public class toCompanyResponse {
    public CompanyResponse toResponse(Company company) {
        CompanyResponse response = new CompanyResponse();

        response.setName(company.getName());
        response.setWebsite(company.getWebsite());
        response.setNetWorth(company.getNetWorth());
        response.setLocation(company.getLocation());
        response.setDescription(company.getDescription());

        return response;
    }
}
