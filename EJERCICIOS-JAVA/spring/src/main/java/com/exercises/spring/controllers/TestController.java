package com.exercises.spring.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {

    @GetMapping("/html")
    public String displayDefaultControllerHTML() {
       return "default-controller.html";
    }
}
