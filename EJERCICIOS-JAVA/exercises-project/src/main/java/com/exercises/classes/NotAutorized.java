package com.exercises.classes;

public class NotAutorized extends Exception {
    public NotAutorized() {
       super("The arguments are not the required ones");
    }
}
