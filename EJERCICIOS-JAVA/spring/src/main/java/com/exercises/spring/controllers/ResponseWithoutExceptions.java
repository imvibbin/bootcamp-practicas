package com.exercises.spring.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/apiVersion")

public class ResponseWithoutExceptions {

  @GetMapping("/hacercafe")
  @ResponseStatus(HttpStatus.OK)
  public String makingCoffee() {
    return "Making coffee";
  }

  @GetMapping("hacerte")
  @ResponseStatus(value = HttpStatus.I_AM_A_TEAPOT, reason = "I'm a freaking tea pot")
  public String imATeaPot() {
    return "I'm a freaking tea pot";
  }

  @GetMapping("notfound")
  @ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Not found bruh")
  public String notFound() {
    return "Not found bruh";
  }

}
