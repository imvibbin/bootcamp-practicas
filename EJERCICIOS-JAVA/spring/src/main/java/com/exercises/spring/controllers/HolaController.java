package com.exercises.spring.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HolaController {

  @GetMapping({ "/hola", "/hello", "salut" })
  public String main() {
    return "Hello, hola, salut";
  }
}
