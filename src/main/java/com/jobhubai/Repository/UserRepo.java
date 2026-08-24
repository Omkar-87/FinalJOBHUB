package com.jobhubai.Repository;

import com.jobhubai.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    User findByEmail(String email);

    User findByUsername(String username);

    boolean existsByUsername(String username);
}