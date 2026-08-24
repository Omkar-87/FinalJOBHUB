package com.jobhubai.mapper;

import com.jobhubai.dto.Request.CompanyDetails;
import com.jobhubai.entity.Company;
import org.springframework.stereotype.Component;

@Component
public class toCompanyEntity {

    public Company toEntity(CompanyDetails companyDetails) {

        Company company = new Company();

        company.setName(companyDetails.getName());
        company.setDescription(companyDetails.getDescription());
        company.setLocation(companyDetails.getLocation());
        company.setWebsite(companyDetails.getWebsite());
        company.setNetWorth(companyDetails.getNetWorth());

        return company;
    }
}

