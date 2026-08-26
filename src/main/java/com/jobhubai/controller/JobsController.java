package com.jobhubai.controller;

import com.jobhubai.Service.JobService;
import com.jobhubai.dto.Request.JobDetails;
import com.jobhubai.dto.Response.JobResponse;
import com.jobhubai.entity.Company;
import com.jobhubai.entity.Job;
import com.jobhubai.enums.JobStatus;
import com.jobhubai.enums.JobType;
import com.jobhubai.enums.workMode;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobsController {
    final
    JobService jobService;

    public JobsController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping("CreatingJob")
    public JobResponse createJob(@Valid @RequestBody JobDetails jobDetails, Authentication authentication)
    {
         return jobService.createJobs(jobDetails,authentication.getName());
    }
    @GetMapping
    public List<JobResponse> getJob(@Valid@RequestParam(required = false) String keyWord, @RequestParam(required = false) String title, @RequestParam(required = false) String description, @RequestParam(required = false) Long salaryMin, @RequestParam(required = false) Long SalaryMax, @RequestParam(required = false) String Location, @RequestParam(required = false)JobType jobType, @RequestParam(required = false) Integer experience, @RequestParam(required = false)Company company,@RequestParam(required = false) workMode workMode,@RequestParam(required = false)String skill,@RequestParam(required = false)Integer datePosted)
    {
        return  jobService.findJobs(keyWord,title,description,salaryMin,SalaryMax,Location,jobType,experience,company,workMode,skill,datePosted);
    }
    @GetMapping("{id}")
    public JobResponse getIndividualJob(@Valid@RequestParam Long id)
    {
        return  jobService.findIndividualJob(id);
    }
    @PutMapping("{id}")
    public JobResponse updateJob(Authentication authentication,JobDetails jobDetails,Long id)
    {
        return jobService.updateJob(authentication.getName(),jobDetails,id);
    }



}
