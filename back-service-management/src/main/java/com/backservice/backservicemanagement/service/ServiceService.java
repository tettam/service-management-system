package com.backservice.backservicemanagement.service;

import com.backservice.backservicemanagement.entity.Services;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.backservice.backservicemanagement.repository.ServiceRepository;

@Service
public class ServiceService {
  
  @Autowired
  private ServiceRepository repository;

  public List<Services> findAll(){
    return repository.findAll();
  }

  public Services insert(Services obj){
    if(obj.getAmountPaid() == null || obj.getAmountPaid().compareTo(BigDecimal.ZERO) == 0 || obj.getPayDate() == null){
      obj.setStatus("pendente!");
    }
    else {
      obj.setStatus("realizado!");
    }
    return repository.saveAndFlush(obj);
  }

  public Services update(Services obj){
    if(obj.getAmountPaid() != null && obj.getAmountPaid().compareTo(BigDecimal.ZERO) > 0 || obj.getPayDate() != null) {
      obj.setStatus("realizado!");
    }
    return repository.saveAndFlush(obj);
  }

  public void delete(Long id){
    Services service = repository.findById(id).get();
    repository.delete(service);
  }
}
