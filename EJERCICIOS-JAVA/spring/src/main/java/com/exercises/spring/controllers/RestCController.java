package com.exercises.spring.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class RestCController {

    @GetMapping("/rest")
    public Map<String, Object> getJson()  {
        Map<String, Object> jsonData = new HashMap<>();
        jsonData.put("name", "John");
        jsonData.put("age", 21);
        jsonData.put("mail", "johnkvc31@hotmail.com");
        return jsonData;
    }

}
