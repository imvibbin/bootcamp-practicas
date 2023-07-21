package com.exercises;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.ArrayList;
import java.util.Scanner;

public class MainDB {
    public static void main(String[] args) {
        // DB ELEMENTS
        // >> DB connection properties
        Connection connection;
        final String DB_URL = "jdbc:mysql://localhost:3306/db_test";
        final String DB_USER = "root";
        final String DB_PASSWORD = "admin";

        // >> DB tables
        final String DB_TABLE1 = "db_jdbc.table1";

        // SCANNER ELEMENTS
        InputStream inputStream = System.in;
        Scanner sc = new Scanner(inputStream);
        boolean validInput = false;
        System.out.println("WELCOME TO JDBC!");
        do {
            System.out.println("What type of query do you want to execute?");
            System.out.println(">> Select between this options: Create / Read / Update / Delete");
            String selectedQueryType = sc.nextLine();
            if (selectedQueryType.toLowerCase().equals("read")) {
                System.out.println(selectQuery(sc, DB_TABLE1));
                validInput = true;
            }
        } while (!validInput);

        try {
            connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            System.out.println("All good!");
            connection.close();
            System.out.println("Connection closed.");
        } catch (Exception e) {
            System.err.println("Connection failed");
        }
    }

    public static String selectQuery(Scanner sc, String DB_TABLE1) {
        ArrayList<String> selectedElements = new ArrayList<>();
        StringBuilder elementsToSelect = new StringBuilder();
        boolean addElement = true;
        boolean elementExists = true;
        do {
            do {
                if (!elementExists) System.err.println(">> Please select a valid options");
                System.out.println("What table elements do you want to show?");
                System.out.println(">> Select between this options: " + controlAvailableOptions(selectedElements));
                String selectedElement = sc.nextLine();
                elementExists = checkIfElementExists(selectedElement);
                if (elementExists) selectedElements.add(selectedElement.toLowerCase());
            } while (!elementExists);
            if (selectedElements.contains("all")) break;
            System.out.println("Do you want to add an element? Yes / No");
            String yesOrNo = sc.nextLine();
            if (yesOrNo.toLowerCase().equals("no")) addElement = false;
        } while (addElement);
        for (String element : selectedElements) {
            System.out.println("TEST: Checking -> " + element);
            if (selectedElements.size() > 1) {
                elementsToSelect.append(selectedElements.lastIndexOf(element) == selectedElements.size() - 1 ? element : element + ", ");
            } else {
                elementsToSelect = element.equals("all") ? new StringBuilder("*") : new StringBuilder(element);
            }
        }
        return String.format("QUERY -> SELECT %s FROM %s", elementsToSelect.toString(), DB_TABLE1);
    }

    public static String controlAvailableOptions(ArrayList<String> selectedElements) {
        StringBuilder elementsAvailableToChoose = new StringBuilder();
        ArrayList<String> elementsToChoose = new ArrayList<>();
        elementsToChoose.add("all");
        elementsToChoose.add("name");
        elementsToChoose.add("surname");
        elementsToChoose.add("location");

        // Iterate through the selectedElements ArrayList
        for (String element : selectedElements) {
            // Check if the element is present in the elementsToChoose ArrayList
            if (elementsToChoose.contains(element)) {
                // Remove the element from the elementsToChoose ArrayList
                elementsToChoose.remove(element);
            }
        }

        for (String element : elementsToChoose) {
            if (elementsToChoose.size() > 1) {
                char firstChar = element.charAt(0);
                elementsAvailableToChoose.append(
                        elementsToChoose.lastIndexOf(element) == elementsToChoose.size() - 1
                                ? Character.toUpperCase(firstChar) + element.substring(1)
                                : Character.toUpperCase(firstChar) + element.substring(1) + " / "
                );
            } else {
                elementsAvailableToChoose = new StringBuilder(element);
            }
        }

        // Return the elementsAvailableToChoose string
        return elementsAvailableToChoose.toString();
    }

    public static boolean checkIfElementExists(String selectedElement) {
        System.out.println("TEST: Checking -> " + selectedElement);
        return selectedElement.toLowerCase().equals("all")
                || selectedElement.toLowerCase().equals("name")
                || selectedElement.toLowerCase().equals("surname")
                || selectedElement.toLowerCase().equals("location");
    }

}
