package com.jobhubai.Repository;

import com.jobhubai.entity.Company;
import com.jobhubai.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface JobRepo extends JpaRepository<Job,Long>, JpaSpecificationExecutor<Job> {


    List<Job> findByCompany(Company company);
    List<Job> findByTitleContainingIgnoreCaseOrfindBy
}
