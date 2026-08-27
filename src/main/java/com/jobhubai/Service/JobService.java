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
import com.jobhubai.enums.workMode;
import com.jobhubai.exception.NoAcessException;
import com.jobhubai.exception.NotFound;
import com.jobhubai.mapper.toJobResponseMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import javax.print.attribute.standard.JobStateReason;
import java.util.List;
import java.util.Optional;

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
    final
    JOBspecification JobSpecification;



    public JobService(UserRepo repo, CompanyRepo companyRepo, toJobResponseMapper toJobResponseMapper, JobRepo jobRepo, JOBspecification JobSpecification) {
        this.repo = repo;
        this.companyRepo = companyRepo;
        this.toJobResponseMapper = toJobResponseMapper;
        this.jobRepo = jobRepo;
        this.JobSpecification = JobSpecification;
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


    public List<JobResponse> findJobs(@Valid String keyWord, String title, String description, Long salaryMin, Long salaryMax, String location, JobType jobType, Integer experience, Company company, workMode workMode, String skill,Integer datePosted) {
        Specification<Job> spec=Specification.where(null);
        if(keyWord!=null&&!keyWord.isBlank())
        {
            spec=spec.and(JobSpecification.Keyword(keyWord));
        }

        if(salaryMax!=null&&!salaryMax.describeConstable().isEmpty())
        {
            spec=spec.and(JobSpecification.SalaryMax(salaryMax));
        }
        if(salaryMin!=null&&!salaryMin.describeConstable().isEmpty())
        {
            spec=spec.and(JobSpecification.SalaryMin(salaryMin));
        }

        if(jobType!=null)
        {
            spec=spec.and(JobSpecification.JobType(jobType));
        }
        if(experience!=null)
        {
            spec=spec.and(JobSpecification.Experience(experience));
        }

        if(workMode!=null)
        {
            spec=spec.and(JobSpecification.WorkMode(workMode));
        }
        if(skill!=null&&!skill.isBlank())
        {
            spec=spec.and(JobSpecification.Skill(skill));
        }
        if(datePosted!=null)
        {
            spec=spec.and(JobSpecification.timeStamp(datePosted));
        }
        return jobRepo.findAll(spec).stream().map(toJobResponseMapper::toResponse).toList();

    }

    public JobResponse findIndividualJob(@Valid Long id) {
        Optional<Job> job1=jobRepo.findById(id);
        if(job1.isEmpty())
        {
            throw new NotFound("Job Not found");
        }
        Job job=job1.get();
        return toJobResponseMapper.toResponse(job);

    }

    public JobResponse updateJob(String name,JobDetails jobDetails,Long id) {
        User user=repo.findByUsername(name);
        if(user==null)
        {
            throw new NotFound("User not found");
        }
        Optional<Job> job1=jobRepo.findById(id);
        if(job1.isEmpty())
        {
            throw new NotFound("Job not found");
        }
        Job job=job1.get();
        if(!job.getCreatedBy().equals(name))
        {
            throw new NoAcessException("Cannot be Acessed");
        }
        toJobResponseMapper.updateEntity(job,jobDetails);
        Job updatedJob=jobRepo.save(job);
        return toJobResponseMapper.toResponse(updatedJob);


    }
}
