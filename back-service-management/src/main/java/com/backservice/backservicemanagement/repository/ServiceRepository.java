package com.backservice.backservicemanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backservice.backservicemanagement.entity.Services;

public interface ServiceRepository extends JpaRepository<Services, Long>{
  
  @Query("select s from Services s where (s.amountPaid is null or s.amountPaid = 0) and s.status <> 'canceled'")
  List<Services> findServicePendingPayment();

  @Query("select s from Services s where s.status = 'canceled'")
  List<Services> findServiceCanceledPayment();
}
