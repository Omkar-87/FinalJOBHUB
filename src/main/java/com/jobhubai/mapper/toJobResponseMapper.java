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
        response.setCompany(job.getCompany());
        response.setSkills(job.getSkills());
        response.setRequiredSkills(job.getRequiredSkills());
        response.setPreferredSkills(job.getPreferredSkills());
        response.setQualifications(job.getQualifications());

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
        job.setStatus(details.getStatus());
        job.setExperienceRequired(details.getExperienceRequired());
        job.setSkills(details.getSkills());
        job.setRequiredSkills(details.getRequiredSkills());
        job.setPreferredSkills(details.getPreferredSkills());
        job.setQualifications(details.getQualifications());

        return job;
    }

    public void updateEntity(Job job, JobDetails details) {

        job.setTitle(details.getTitle());
        job.setDescription(details.getDescription());
        job.setSalaryMin(details.getSalaryMin());
        job.setSalaryMax(details.getSalaryMax());
        job.setLocation(details.getLocation());
        job.setJobType(details.getJobType());
        job.setStatus(details.getStatus());
        job.setExperienceRequired(details.getExperienceRequired());
        job.setSkills(details.getSkills());
        job.setRequiredSkills(details.getRequiredSkills());
        job.setPreferredSkills(details.getPreferredSkills());
        job.setQualifications(details.getQualifications());
    }
}