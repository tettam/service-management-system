package com.backservice.backservicemanagement.service;

import com.backservice.backservicemanagement.entity.Services;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.backservice.backservicemanagement.repository.ServiceRepository;

@Service
public class ServicesService {
  
  @Autowired
  private ServiceRepository repository;

  public List<Services> findAll(){
    return repository.findAll();
  }

  //List status pending
  public List<Services> findServicePendingPayment(){
    return repository.findServicePendingPayment();
  }

  //List status performed
  public List<Services> findServiceCanceledPayment(){
    return repository.findServiceCanceledPayment();
  }

  public Services insert(Services obj){
    if(obj.getAmountPaid() == null || obj.getAmountPaid().compareTo(BigDecimal.ZERO) == 0 || obj.getPayDate() == null){
      obj.setStatus("pending");
    }
    else {
      obj.setStatus("performed");
    }
    //obj.setInitialDate(LocalDate.now());
    return repository.saveAndFlush(obj);
  }

  public Services update(Services obj){
    if(obj.getAmountPaid() != null && obj.getAmountPaid().compareTo(BigDecimal.ZERO) > 0 || obj.getPayDate() != null) {
      obj.setStatus("performed");
    }
    return repository.saveAndFlush(obj);
  }

  public void delete(Long id){
    Services service = repository.findById(id).get();
    repository.delete(service);
  }

  public void canceledService(Long id){
    Services obj = repository.findById(id).get();
    obj.setStatus("canceled");
    repository.saveAndFlush(obj);
  }
}
