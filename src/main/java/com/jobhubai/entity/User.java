package com.jobhubai.entity;

import com.jobhubai.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;
    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private Role role;

    private Integer experience;

    @OneToOne(cascade = CascadeType.ALL)
    private Company company;

    @OneToOne(
            mappedBy = "user",
            cascade = CascadeType.ALL
    )
    private ResetPassword resetPassword;
}