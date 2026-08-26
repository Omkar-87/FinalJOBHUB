package com.jobhubai.dto.Request;

import com.jobhubai.enums.JobStatus;
import com.jobhubai.enums.JobType;
import lombok.Data;

import java.util.List;

@Data
public class JobDetails {

    private String title;

    private String description;

    private Long salaryMin;

    private Long salaryMax;

    private String location;

    private JobType jobType;

    private JobStatus status = JobStatus.OPEN;

    private Integer experienceRequired;

    private List<String> skills;

    private List<String> requiredSkills;

    private List<String> preferredSkills;

    private List<String> qualifications;
}