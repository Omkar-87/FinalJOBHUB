package com.jobhubai.dto.Response;

import com.jobhubai.enums.JobStatus;
import com.jobhubai.enums.JobType;
import lombok.Data;

@Data
public class JobResponse {
    private String title;

    private String description;

    private Long salaryMin;

    private Long salaryMax;

    private String location;

    private JobType jobType;

    private JobStatus status;

    private Integer experienceRequired;
}