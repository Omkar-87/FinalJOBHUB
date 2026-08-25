package com.jobhubai.mapper;

import com.jobhubai.dto.Request.JobDetails;
import com.jobhubai.dto.Response.JobResponse;
import com.jobhubai.entity.Job;
import org.springframework.stereotype.Component;

@Component
public class toJobResponseMapper {
    public JobResponse toResponse(Job job) {

        JobResponse response = new JobResponse();
        response.setId(job.getId());
        response.setTitle(job.getTitle());
        response.setDescription(job.getDescription());
        response.setSalaryMin(job.getSalaryMin());
        response.setSalaryMax(job.getSalaryMax());
        response.setLocation(job.getLocation());
        response.setJobType(job.getJobType());
        response.setStatus(job.getStatus());
        response.setExperienceRequired(job.getExperienceRequired());

        return response;
    }

    public Job toEntity(JobDetails details) {
        Job job = new Job();

        job.setTitle(details.getTitle());
        job.setDescription(details.getDescription());
        job.setSalaryMin(details.getSalaryMin());
        job.setSalaryMax(details.getSalaryMax());
        job.setLocation(details.getLocation());
        job.setJobType(details.getJobType());
        job.setExperienceRequired(details.getExperienceRequired());

        return job;
    }
}
