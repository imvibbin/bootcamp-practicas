package com.exercises;

import com.exercises.enums.TypeOfConcatenations;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.ArrayList;
import java.util.Scanner;
import java.sql.SQLException;
import java.util.*;

public class MainDB {
    // Constants for type comparison
    private static final String SELECT_QUERY = TypeOfConcatenations.SELECT_QUERY.toString();
    private static final String AVAILABLE_ELEMENTS = TypeOfConcatenations.AVAILABLE_ELEMENTS.toString();

    public static void main(String[] args) {
        // DB connection properties
        Connection connection;
        final String DB_URL = "jdbc:mysql://localhost:3306/db_test";
        final String DB_USER = "root";
        final String DB_PASSWORD = "admin";

        // DB tables
        final String DB_TABLE1 = "db_jdbc.table1";

        // Initialize Scanner
        try (Scanner sc = new Scanner(System.in)) {
            System.out.println("WELCOME TO JDBC!");
            String selectedQueryType;
            do {
                System.out.println("What type of query do you want to execute?");
                System.out.println(">> Select between these options: Create / Read / Update / Delete");
                selectedQueryType = sc.nextLine().toLowerCase();
            } while (!selectedQueryType.equals("read"));

            System.out.println(selectQuery(sc, DB_TABLE1));
            connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            System.out.println("All good!");
            connection.close();
            System.out.println("Connection closed.");
        } catch (SQLException e) {
            System.err.println("Connection failed: " + e.getMessage());
        }
    }

    public static String selectQuery(Scanner sc, String DB_TABLE1) {
        List<String> chosenElements = new ArrayList<>();
        boolean finalStepCompleted = false;
        boolean firstStepCompleted = true;
        do {
            String availableOptionsToChoose = concatenateElements(chosenElements, AVAILABLE_ELEMENTS);
            System.out.println("What elements do you want to show?");
            System.out.println(">> Select between these options: " + availableOptionsToChoose);
            String selectedElement = sc.nextLine().toLowerCase();
            if (chosenElements.contains(selectedElement)) {
                System.err.println(">> Element already selected");
                firstStepCompleted = false;
            } else {
                if (checkElementChosen(selectedElement)) {
                    if (chosenElements.size() >= 1 && !chosenElements.contains("all") && selectedElement.equals("all"))
                        firstStepCompleted = false;
                    else {
                        chosenElements.add(selectedElement);
                        firstStepCompleted = true;
                    }
                }
            }
            if (chosenElements.contains("all") || chosenElements.size() == 3) break;
            if (!firstStepCompleted) {
                System.err.println(">> Please select a valid option.");
            } else {
                System.out.println("Do you want to add another element? Yes / No");
                String yesOrNo = sc.nextLine().toLowerCase();
                finalStepCompleted = !yesOrNo.equals("yes");
            }
        } while (!finalStepCompleted);

        String elementsToSelect = concatenateElements(chosenElements, SELECT_QUERY);
        return String.format("QUERY -> SELECT %s FROM %s", elementsToSelect, DB_TABLE1);
    }

    public static boolean checkElementChosen(String selectedElement) {
        // Use a set for efficient element checking
        Set<String> validElements = new HashSet<>(Arrays.asList("all", "name", "surname", "location"));
        return validElements.contains(selectedElement);
    }

    public static String concatenateElements(List<String> elements, String type) {
        // Determine the ArrayList and splitByTypeOfRequest based on the type
        List<String> elementsToConcatenate;
        String splitByTypeOfRequest;

        if (type.equals(SELECT_QUERY)) {
            elementsToConcatenate = elements;
            splitByTypeOfRequest = ", ";
        } else if (type.equals(AVAILABLE_ELEMENTS)) {
            elementsToConcatenate = getAvailableElementsToChoose(elements);
            splitByTypeOfRequest = " / ";
        } else {
            // Handle unsupported types or set a default behavior
            return "";
        }

        // Iterate through elementsToChoose and build the result string
        StringBuilder concatenatedElements = new StringBuilder();

        for (int i = 0; i < elementsToConcatenate.size(); i++) {
            String element = elementsToConcatenate.get(i);

            // Check if type is not equal to SELECT_QUERY before capitalizing the first letter
            if (!type.equals(SELECT_QUERY)) {
                char firstChar = element.charAt(0);
                element = Character.toUpperCase(firstChar) + element.substring(1);
            }

            concatenatedElements.append(i == 0 ? element : splitByTypeOfRequest + (element.equals("all") ? "*" : element));
        }

        return concatenatedElements.toString();
    }

    public static List<String> getAvailableElementsToChoose(List<String> chosenElements) {
        List<String> elementsToChoose = new ArrayList<>(Arrays.asList("all", "name", "surname", "location"));

        // Remove the elements already chosen
        elementsToChoose.removeAll(chosenElements);

        // Remove "all" if there is another element selected
        if (chosenElements.size() >= 1) elementsToChoose.remove("all");

        return elementsToChoose;
    }
}
