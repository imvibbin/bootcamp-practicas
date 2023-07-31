package com.exercises.spring.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
  @GetMapping({ "/", "/index" })
  public String index() {
    return "index-test.html";
  }

  @GetMapping("/second")
  public String secondPage() {
    return "second-page.html";
  }

  @GetMapping("/third")
  public String thirdPage() {
    return "third-page.html";
  }

}
