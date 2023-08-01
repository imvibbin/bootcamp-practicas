package com.exercises.spring.controllers;

import java.util.HashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ParamsController {
  @GetMapping("/with-params")
  public Map<String, Object> person(@RequestParam(required = false) String name, String surname) {
    Map<String, Object> person = new HashMap<>();
    if (name == null && surname == null) {
      person.put("name", "unknown");
      person.put("surname", "unknown");
    } else {
      person.put("name", name);
      person.put("surname", surname);
    }
    return person;
  }
}
