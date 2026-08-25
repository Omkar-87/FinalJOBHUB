package com.jobhubai.Service;

import com.jobhubai.Repository.CompanyRepo;
import com.jobhubai.Repository.JobRepo;
import com.jobhubai.Repository.UserRepo;
import com.jobhubai.dto.Request.JobDetails;
import com.jobhubai.dto.Response.JobResponse;
import com.jobhubai.entity.Company;
import com.jobhubai.entity.Job;
import com.jobhubai.entity.User;
import com.jobhubai.enums.JobType;
import com.jobhubai.exception.NotFound;
import com.jobhubai.mapper.toJobResponseMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import javax.print.attribute.standard.JobStateReason;
import java.util.List;

@Service
public class JobService {
    final
    UserRepo repo;
    final
    CompanyRepo companyRepo;
    final
    toJobResponseMapper toJobResponseMapper;
    final
    JobRepo jobRepo;



    public JobService(UserRepo repo, CompanyRepo companyRepo, toJobResponseMapper toJobResponseMapper, JobRepo jobRepo) {
        this.repo = repo;
        this.companyRepo = companyRepo;
        this.toJobResponseMapper = toJobResponseMapper;
        this.jobRepo = jobRepo;
    }

    public JobResponse createJobs(JobDetails jobDetails, String name) {
        User user=repo.findByUsername(name);
        if(user==null)
        {
            throw new NotFound("User not found");
        }
        Company company=companyRepo.findByUser(user);
        if(company==null)
        {
            throw new NotFound("Company not found");
        }
        Job job=toJobResponseMapper.toEntity(jobDetails);

        job.setCompany(company);
        jobRepo.save(job);
        JobResponse jobResponse= toJobResponseMapper.toResponse(job);
        return jobResponse;



    }

    public List<JobResponse> findJobs(@Valid String keyWord, String title, String description, Long salaryMin, Long salaryMax, String location, JobType jobType, Integer experience, Company company) {

    }
}
