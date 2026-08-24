package com.jobhubai.Repository;

import com.jobhubai.entity.Company;
import com.jobhubai.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobRepo extends JpaRepository<Job,Long> {


    List<Job> findByCompany(Optional<Company> company);
}
