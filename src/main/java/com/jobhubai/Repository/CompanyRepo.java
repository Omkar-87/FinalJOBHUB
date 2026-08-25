package com.jobhubai.Repository;

import com.jobhubai.entity.Company;
import com.jobhubai.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CompanyRepo extends JpaRepository<Company,Long> {
    boolean existsByname(String name);
    List<Company>findAll();

    Company findByName(String name);

    Optional<Company> findById(Long id);

    Company findByUser(User user);
}
