package com.backservice.backservicemanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backservice.backservicemanagement.entity.Services;
import com.backservice.backservicemanagement.service.ServicesService;

import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/api/services")
public class ServicesController {
  
  @Autowired
  private ServicesService service;

  @GetMapping("/")
  public ResponseEntity<List<Services>> findAll(){
    List<Services> list = service.findAll();
    return ResponseEntity.ok().body(list);
  }

  @GetMapping("/pedingPayment")
  public ResponseEntity<List<Services>> findServicePendingPaymen(){
    List<Services> list = service.findServicePendingPayment();
    return ResponseEntity.ok().body(list);
  }

  @GetMapping("/canceledPayment")
  public ResponseEntity<List<Services>> findServiceCanceledPayment(){
    List<Services> list = service.findServiceCanceledPayment();
    return ResponseEntity.ok().body(list);
  }

  @PostMapping("/")
    public ResponseEntity<Services> insert(@RequestBody Services obj){
    Services newObj = service.insert(obj);
    return ResponseEntity.status(201).body(newObj);
  }

  @PutMapping("/")
  public ResponseEntity<Services> update(@RequestBody Services obj){
    Services newObj = service.update(obj);
    return ResponseEntity.ok().body(newObj);
  }

  @DeleteMapping("/")
  public ResponseEntity<Void> delete(@PathParam("id") Long id){
    service.delete(id);
    return ResponseEntity.ok().build();
  }


}
