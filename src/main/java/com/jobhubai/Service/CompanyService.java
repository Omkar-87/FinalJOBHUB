package com.jobhubai.Service;

import com.jobhubai.Repository.CompanyRepo;
import com.jobhubai.Repository.JobRepo;
import com.jobhubai.Repository.UserRepo;
import com.jobhubai.dto.Request.CompanyDetails;
import com.jobhubai.dto.Request.UpdateCompanyDetails;
import com.jobhubai.dto.Response.CompanyResponse;
import com.jobhubai.dto.Response.JobResponse;
import com.jobhubai.entity.Company;
import com.jobhubai.entity.Job;
import com.jobhubai.entity.User;
import com.jobhubai.exception.DuplicateException;
import com.jobhubai.exception.NotFound;
import com.jobhubai.mapper.toCompanyEntity;
import com.jobhubai.mapper.toCompanyResponse;
import com.jobhubai.mapper.toJobResponseMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {
    final
    UserRepo repo;
    private final CompanyRepo companyRepo;

    private final toCompanyResponse toCompanyResponse;
    final
    toCompanyEntity companyEntity;
    final
    JobRepo jobRepo;
    toJobResponseMapper toJobResponseMapper;

    public CompanyService(UserRepo repo, CompanyRepo companyRepo, toCompanyResponse toCompanyResponse, toCompanyEntity companyEntity, JobRepo jobRepo) throws IOException {
        this.repo = repo;
        this.companyRepo = companyRepo;
        this.toCompanyResponse = toCompanyResponse;
        this.companyEntity = companyEntity;
        this.jobRepo = jobRepo;
    }

    public void createCompany(@Valid CompanyDetails companyDetails,String username) {
        User user=repo.findByusername(username);

        if(user==null)
        {
            throw new NotFound("User not found");
        }
        if(companyRepo.existsByname(companyDetails.getName()))
        {
            throw new DuplicateException("Company already exists");
        }


        Company company=new Company();
        company.setDescription(companyDetails.getDescription());
        company.setLocation(companyDetails.getLocation());
        company.setNetWorth(companyDetails.getNetWorth());
        company.setWebsite(companyDetails.getWebsite());
        company.setUser(user);
        companyRepo.save(company);
        user.setCompany(company);
        repo.save(user);

    }

    public List<CompanyResponse> getAllCompanies() {
        List<Company> companies=companyRepo.findAll();
        List<CompanyResponse> responses=new ArrayList<>();
        for(Company company:companies)
        {
            CompanyResponse response=toCompanyResponse.toResponse(company);
            responses.add(response);

        }
        return responses;

    }

    public CompanyResponse findCompany(String name) {
        Company company=companyRepo.findByName(name);
        if(company==null)
        {
            throw  new NotFound("Company not found");
        }



        return toCompanyResponse.toResponse(company);
    }


    public void updateCompany(UpdateCompanyDetails companyDetails, String username) {

        User user = repo.findByusername(username);

        if (user == null) {
            throw new NotFound("User not found");
        }

        Company company = user.getCompany();

        if (company == null) {
            throw new NotFound("Company not found");
        }

        company.setName(companyDetails.getName());
        company.setDescription(companyDetails.getDescription());
        company.setLocation(companyDetails.getLocation());
        company.setWebsite(companyDetails.getWebsite());
        company.setNetWorth(companyDetails.getNetWorth());

        companyRepo.save(company);
    }


    public List<JobResponse> findJobs(Long id) {
        Optional<Company> companyOpt = companyRepo.findById(id);
        if (companyOpt.isEmpty()) {
            throw new NotFound("Company not found");
        }
        Company company = companyOpt.get();
        List<JobResponse> jobs = new ArrayList<>();

        List<Job> job = jobRepo.findByCompany(company);
        for(Job jobss:job)
        {
            jobs.add(toJobResponseMapper.toResponse(jobss));
        }
        return jobs;
    }
    }



