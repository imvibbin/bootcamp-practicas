package com.exercises.spring.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exercises.spring.pojos.TextToJson;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@RestController
@RequestMapping("/generate-json")
public class JsonController {

  @GetMapping
  public String landingPage() {
    return "Sup, this is the landing page for generating a JSON";
  }

  @GetMapping("/text-to-json")
  public TextToJson textToJson() {
    return new TextToJson("Text to JSON");
  }

  @RequestMapping(path = "/string-to-json", produces = "application/json")
  public String stringToJson() {
    return "{\"type\": \"String to JSON\"}";
  }

  @GetMapping("/objectnode") 
  public ObjectNode objectToJson() {
    ObjectMapper mapper = new ObjectMapper();
    ObjectNode objectNode = mapper.createObjectNode();
    objectNode.put("type", "Object node based generated");
    objectNode.put("name", "John");
    objectNode.put("surname", "Kervin");
    return objectNode;
  }

  @GetMapping("/response-entity")
  public ResponseEntity<String> responseEntityToJson() {
    final HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.setContentType(MediaType.APPLICATION_JSON);
    return new ResponseEntity<String>("{\"type\": \"Response entity based generated\"}", httpHeaders, HttpStatus.OK);
  }

}
