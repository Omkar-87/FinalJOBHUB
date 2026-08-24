package com.jobhubai.Repository;

import com.jobhubai.entity.Resume;
import com.jobhubai.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeRepo extends JpaRepository<Resume,Long> {
    Resume findByUser(User user);
}
