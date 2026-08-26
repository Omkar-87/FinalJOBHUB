package com.jobhubai.dto.Response;

import com.jobhubai.entity.Company;
import com.jobhubai.enums.JobStatus;
import com.jobhubai.enums.JobType;
import lombok.Data;

import java.util.List;

@Data
public class JobResponse {
    private Long id;
    private String title;

    private String description;

    private Long salaryMin;

    private Long salaryMax;

    private String location;

    private JobType jobType;

    private JobStatus status;

    private Integer experienceRequired;
    private Company company;
    private List<String> skills;
    private List<String> requiredSkills;
    private List<String> preferredSkills;
    private String qualifications;

}