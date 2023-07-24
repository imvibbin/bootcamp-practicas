package com.exercises.classes;

import com.exercises.enums.TypeOfConcatenations;

import java.util.ArrayList;
import java.util.Scanner;
import java.util.*;

public class SelectQueryGenerator {

    // Constants for type comparison
    private final static String SELECT_QUERY = TypeOfConcatenations.SELECT_QUERY.toString();
    private final static String AVAILABLE_ELEMENTS = TypeOfConcatenations.AVAILABLE_ELEMENTS.toString();

    // Scanner to read user input and list to store chosen elements
    private final Scanner sc;
    private final QueryGenerator queryGenerator;

    // Constructor to initialize the SelectQueryGenerator
    public SelectQueryGenerator(Scanner scanner, QueryGenerator queryGenerator) {
        this.sc = scanner;
        this.queryGenerator = queryGenerator;
    }

    // Method to generate the SELECT query
    public String selectQueryPrompts(List<String> chosenElements) {
        // Get available options to choose from and prompt the user
        String availableOptionsToChoose = this.queryGenerator.concatenateElements(chosenElements, AVAILABLE_ELEMENTS);
        System.out.println("What elements do you want to show?");
        System.out.println(">> Select between these options: " + availableOptionsToChoose);
        System.out.print("--> ");
        return sc.nextLine().toLowerCase();
    }

    public String generateSelectQuery(String DB_TABLE1, List<String> chosenElements) {
        // Concatenate the chosen elements into the SELECT query
        String elementsToSelect = this.queryGenerator.concatenateElements(chosenElements, SELECT_QUERY);
        return String.format("SELECT %s FROM %s;", elementsToSelect, DB_TABLE1);
    }
}