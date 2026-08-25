package com.jobhubai.dto.Request;

import com.jobhubai.enums.JobStatus;
import com.jobhubai.enums.JobType;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;
import lombok.Data;

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
}
