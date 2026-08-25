package com.jobhubai.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Company extends Auditable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Double netWorth;

    private String website;

    private String location;
    @OneToOne(mappedBy = "company")
    User user;
    @OneToMany(mappedBy = "company")
    List<Job> job;
}