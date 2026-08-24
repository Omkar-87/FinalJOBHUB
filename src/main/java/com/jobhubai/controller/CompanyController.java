package com.jobhubai.controller;

import com.jobhubai.Service.CompanyService;
import com.jobhubai.dto.Request.CompanyDetails;
import com.jobhubai.dto.Request.UpdateCompanyDetails;
import com.jobhubai.dto.Response.CompanyResponse;
import com.jobhubai.dto.Response.JobResponse;
import com.jobhubai.entity.Company;
import com.jobhubai.entity.Job;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/company")
public class CompanyController {
    final
    CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping("postCompanies")
    public ResponseEntity<String>createCompany(@Valid @RequestBody CompanyDetails companyDetails, Authentication authentication)
    {
               companyService.createCompany(companyDetails,authentication.getName());
               return ResponseEntity.ok("Company Created Sucesfully");


    }
    @GetMapping("GetCompanies")
    public List<CompanyResponse> getCompanies()
    {
        return companyService.getAllCompanies();
    }
    @GetMapping("/{name}")
    public CompanyResponse getCompany(@PathVariable String name)
    {
        return companyService.findCompany(name);
    }
    @PatchMapping("/profile")
    public void updateCompany(
            @RequestBody UpdateCompanyDetails dto,
            Authentication authentication) {

        companyService.updateCompany(dto, authentication.getName());
    }
    @GetMapping("/{id}/Jobs")
    public List<JobResponse> getJobs(@PathVariable Long id)
    {
         return companyService.findJobs(id);
    }


}
