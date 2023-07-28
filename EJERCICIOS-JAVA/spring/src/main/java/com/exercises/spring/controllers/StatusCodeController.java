package com.exercises.spring.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RestController
@RequestMapping("/response-status")
public class StatusCodeController {

    @GetMapping
    public ResponseEntity<Integer> responseStatus() {
        Random random = new Random();
        int number = random.nextInt();
        switch (number) {
            case 1 -> {
                return ResponseEntity.status(HttpStatus.OK).body(number);
            }
            case 2 -> {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(number);
            }
            default -> {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(number);
            }
        }
    }
}
