package com.jobhubai.Repository;

import com.jobhubai.entity.ResetPassword;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResetRepo
        extends JpaRepository<ResetPassword, Long> {

}