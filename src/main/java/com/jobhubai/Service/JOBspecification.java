package com.jobhubai.Service;

import com.jobhubai.entity.Company;
import com.jobhubai.entity.Job;
import com.jobhubai.enums.JobType;
import com.jobhubai.enums.workMode;
import jakarta.validation.Valid;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class JOBspecification {
    Specification<Job> specification;
    public Specification<Job> Keyword(@Valid String keyWord) {
        String keyword = keyWord.toLowerCase();

         specification=(root, query, criteriaBuilder) ->
                criteriaBuilder.or(
                criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("title")),
                        "%" + keyword + "%"
                ),
                criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("description")),
                        "%" + keyword + "%"
                ),
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("Location")),
                                "%" + keyword + "%"
                        )
        );
        return specification;

    }

    public Specification<Job> SalaryMax(Long salaryMax) {


        return (root, query, criteriaBuilder) ->
                criteriaBuilder.lessThan(
                                root.get("salaryMax"),
                                salaryMax
                        );
    }

    public Specification<Job> SalaryMin(Long salaryMin) {


        return (root, query, criteriaBuilder) ->
                criteriaBuilder.greaterThan(
                        root.get("salaryMax"),
                        salaryMin
                );
    }


    public Specification<Job> JobType(JobType jobType) {


        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(
                        root.get("JobType"),jobType
                );
    }

    public Specification<Job> Experience(Integer experience) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.greaterThan(
                        root.get("experience"),experience
                );

    }



    public Specification<Job> WorkMode(workMode workMode) {


        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(
                        root.get("workMode"),workMode
                );
    }

    public Specification<Job> Skill(String skill) {
        Specification<Job> specification=(root, query, criteriaBuilder) ->
            criteriaBuilder.like(
                    root.get("skill"),skill
            );
        return specification;

    }


    public Specification<Job> timeStamp(Integer datePosted) {
        LocalDateTime currentTime=LocalDateTime.now().minusHours(datePosted);
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.greaterThan(root.get("createdAt"),currentTime);
    }
}
