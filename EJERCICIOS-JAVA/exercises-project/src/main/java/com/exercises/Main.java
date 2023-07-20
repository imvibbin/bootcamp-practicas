package com.exercises;
import com.exercises.classes.*;

import java.util.Objects;

public class Main {
    public static void main(String[] args) throws NotAutorized {
        if (Objects.equals(args[0], "Federico") && Objects.equals(args[1], "GarciaLorca")) {
            new Lorca().recitePoem();
        } else {
            throw new NotAutorized();
        }
    }
}