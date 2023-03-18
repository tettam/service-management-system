package com.backservice.backservicemanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backservice.backservicemanagement.entity.Services;

public interface ServiceRepository extends JpaRepository<Services, Long>{
  
}
