package com.exercises.spring.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/response-status")
public class StatusCodeController {
  @GetMapping
  public ResponseEntity<Integer> responseStatus() {
    Random random = new Random();
    int number = random.nextInt(2);
    switch (number) {
      case 0 -> {
        return ResponseEntity.status(HttpStatus.OK).body(number);
      }
      case 1 -> {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(number);
      }
      default -> {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(number);
      }
    }
  }

  @GetMapping("/annotation-status")
  @ResponseStatus(HttpStatus.I_AM_A_TEAPOT)
  public Map<String, Object> getJson() {
    Map<String, Object> jsonData = new HashMap<>();
    jsonData.put("name", "John");
    jsonData.put("age", 21);
    jsonData.put("mail", "johnkvc31@hotmail.com");
    return jsonData;
  }

}
