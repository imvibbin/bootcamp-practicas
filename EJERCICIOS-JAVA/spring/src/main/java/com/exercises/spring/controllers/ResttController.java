package com.exercises.spring.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest-controller")

public class ResttController {
  @GetMapping
  public Map<String, Object> main() {
    Map<String, Object> person = new HashMap<>();
    person.put("name", "John");
    person.put("surname", "Doe");
    person.put("happy", "NO");
    return person;
  }

}
