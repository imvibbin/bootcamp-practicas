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
    private Scanner sc;
    private List<String> chosenElements;

    // Constructor to initialize the SelectQueryGenerator
    public SelectQueryGenerator(Scanner scanner) {
        this.sc = scanner;
        this.chosenElements = new ArrayList<>();
    }

    // Method to generate the SELECT query
    public String generateSelectQuery(String DB_TABLE1) {
        boolean finalStepCompleted = false;
        boolean firstStepCompleted = true;

        do {
            // Get available options to choose from and prompt the user
            String availableOptionsToChoose = concatenateElements(chosenElements, AVAILABLE_ELEMENTS);
            System.out.println("What elements do you want to show?");
            System.out.println(">> Select between these options: " + availableOptionsToChoose);
            String selectedElement = sc.nextLine().toLowerCase();

            // Check if the selected element is already chosen
            if (chosenElements.contains(selectedElement)) {
                System.err.println(">> Element already selected");
                firstStepCompleted = false;
            } else {
                // Validate the selected element
                if (checkElementChosen(selectedElement)) {
                    System.out.println(checkElementChosen(selectedElement));
                    // Check if "all" is already chosen and prevent adding additional elements
                    if (chosenElements.size() >= 1 && !chosenElements.contains("all") && selectedElement.equals("all")) {
                        firstStepCompleted = false;
                    } else {
                        // Add the valid selected element to the chosenElements list
                        chosenElements.add(selectedElement);
                        firstStepCompleted = true;
                    }
                }
            }

            // Break the loop if "all" is chosen or the maximum number of elements (3) is reached
            if (chosenElements.contains("all") || chosenElements.size() == 3) {
                break;
            }

            // If the first step is not completed, prompt the user to select a valid option
            if (!firstStepCompleted) {
                System.err.println(">> Please select a valid option.");
            } else {
                // Ask if the user wants to add another element
                System.out.println("Do you want to add another element? Yes / No");
                String yesOrNo = sc.nextLine().toLowerCase();
                finalStepCompleted = !yesOrNo.equals("yes");
            }
        } while (!finalStepCompleted);

        // Concatenate the chosen elements into the SELECT query
        String elementsToSelect = concatenateElements(chosenElements, SELECT_QUERY);
        return String.format("SELECT %s FROM %s;", elementsToSelect, DB_TABLE1);
    }

    // Method to check if the selected element is valid
    private boolean checkElementChosen(String selectedElement) {
        return (selectedElement.equals("all")
                || selectedElement.equals("name")
                || selectedElement.equals("surname")
                || selectedElement.equals("location"));
    }

    // Method to concatenate elements based on the type
    private String concatenateElements(List<String> elements, String type) {
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

    // Method to get available elements to choose
    private List<String> getAvailableElementsToChoose(List<String> chosenElements) {
        List<String> elementsToChoose = new ArrayList<>(Arrays.asList("all", "name", "surname", "location"));

        // Remove the elements already chosen
        elementsToChoose.removeAll(chosenElements);

        // Remove "all" if there is another element selected
        if (chosenElements.size() >= 1) {
            elementsToChoose.remove("all");
        }

        return elementsToChoose;
    }
}
