package com.backservice.backservicemanagement.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "tb_services")
@Data
public class Services {
  
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String name;
  private String description;
  private LocalDate initialDate;
  private LocalDate endDate;

  private BigDecimal serviceValue;
  private BigDecimal amountPaid;
  private LocalDate payDate;
  
  private String status;
}
