package com.jobhubai.mapper;

import com.jobhubai.dto.Response.JobResponse;
import com.jobhubai.entity.Job;
import org.springframework.stereotype.Component;

@Component
public class toJobResponseMapper {
    public JobResponse toResponse(Job job) {

        JobResponse response = new JobResponse();

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
}
