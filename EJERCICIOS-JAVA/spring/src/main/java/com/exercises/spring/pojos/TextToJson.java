package com.exercises.spring.pojos;

public class TextToJson {
  private String message = "";

  public TextToJson(String message) {
    this.message = message;
  }

  public String getMessage() {
    return this.message;
  }

  public void setMessage(String message) {
    this.message = message;
  }
}
