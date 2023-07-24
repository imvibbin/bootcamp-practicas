package com.exercises.classes;

import com.exercises.enums.TypeOfConcatenations;

import java.util.ArrayList;
import java.util.Scanner;
import java.util.*;

public class QueryGenerator {

    // Constants for type comparison
    private final static String SELECT_QUERY = TypeOfConcatenations.SELECT_QUERY.toString();
    private final static String INSERT_QUERY = TypeOfConcatenations.INSERT_QUERY.toString();
    private final static String AVAILABLE_ELEMENTS = TypeOfConcatenations.AVAILABLE_ELEMENTS.toString();

    // Scanner to read user input and list to store chosen elements
    private final Scanner sc;
    private final List<String> chosenElements;
    private final DatabaseConfig databaseConfig;

    private final SelectQueryGenerator selectQueryGenerator;
    private final InsertQueryGenerator insertQueryGenerator;

    //    private UpdateQueryGenerator updateQueryGenerator;
//    private DeleteQueryGenerator deleteQueryGenerator;
    // Constructor to initialize the SelectQueryGenerator
    public QueryGenerator(Scanner scanner, DatabaseConfig databaseConfig) {
        this.sc = scanner;
        this.chosenElements = new ArrayList<>();
        this.databaseConfig = databaseConfig;
        this.selectQueryGenerator = new SelectQueryGenerator(this.sc, this);
        this.insertQueryGenerator = new InsertQueryGenerator(this.sc, this, databaseConfig);
//        this.updateQueryGenerator = new UpdateQueryGenerator();
//        this.deleteQueryGenerator = new DeleteQueryGenerator();
    }

    // Method to generate the SELECT query
    public String generateQuery(String DB_TABLE1, String typeOfQueryToGenerate) {
        String selectedElement = "";
        boolean firstStepCompleted = true;
        boolean finalStepCompleted = false;

        do {
            // Get available options to choose from and prompt the user
            System.out.println("SELECTED QUERY TYPE: " + typeOfQueryToGenerate);
            if (typeOfQueryToGenerate.equals("select"))
                selectedElement = this.selectQueryGenerator.selectQueryPrompts(this.chosenElements);
            if (typeOfQueryToGenerate.equals("insert"))
                selectedElement = this.insertQueryGenerator.insertQueryPrompts(this.chosenElements);

            System.out.println("SELECTED ELEMENT: " + selectedElement);
            // Check if the selected element is already chosen
            if (this.chosenElements.contains(selectedElement)) {
                System.err.println(">> Element already selected");
                firstStepCompleted = false;
            } else {
                // Validate the selected element
                if (checkElementChosen(selectedElement)) {
                    System.out.println(checkElementChosen(selectedElement));
                    // Check if "all" is already chosen and prevent adding additional elements
                    if (this.chosenElements.size() >= 1 && !this.chosenElements.contains("all") && selectedElement.equals("all")) {
                        firstStepCompleted = false;
                    } else {
                        // Add the valid selected element to the chosenElements list
                        this.chosenElements.add(selectedElement);
                        firstStepCompleted = true;
                    }
                }
            }

            // Break the loop if "all" is chosen or the maximum number of elements (3) is reached
            if (this.chosenElements.contains("all") || this.chosenElements.size() == 3) break;

            // If the first step is not completed, prompt the user to select a valid option
            if (!firstStepCompleted) {
                System.err.println(">> Please select a valid option.");
            } else {
                boolean askIfYesOrNoAgain = true;
                do {
                    // Ask if the user wants to add another element
                    System.out.println("Do you want to add another element? Yes / No");
                    String yesOrNo = sc.nextLine().toLowerCase();
                    if (yesOrNo.equals("yes") || yesOrNo.equals("no")) {
                        askIfYesOrNoAgain = false;
                        finalStepCompleted = !yesOrNo.equals("yes");
                    } else {
                        System.err.println("Please select: Yes / No");
                    }
                } while (askIfYesOrNoAgain);
            }
        } while (!finalStepCompleted);

        // Concatenate the chosen elements into the SELECT query
        String generatedQuery = "";
        if (typeOfQueryToGenerate.equals("select"))
            generatedQuery = this.selectQueryGenerator.generateSelectQuery(DB_TABLE1, this.chosenElements);
        if (typeOfQueryToGenerate.equals("insert")) {
            List<String> elementsToInsert = this.insertQueryGenerator.insertQueryValues(this.chosenElements);
            generatedQuery = this.insertQueryGenerator.generateInsertQuery(DB_TABLE1, this.chosenElements, elementsToInsert);
        }
        if (typeOfQueryToGenerate.equals("update"))
            generatedQuery = this.selectQueryGenerator.generateSelectQuery(DB_TABLE1, this.chosenElements);
        if (typeOfQueryToGenerate.equals("delete"))
            generatedQuery = this.selectQueryGenerator.generateSelectQuery(DB_TABLE1, this.chosenElements);
        return generatedQuery;
    }

    // Method to check if the selected element is valid
    private boolean checkElementChosen(String selectedElement) {
        List<String> elementToChoose = Arrays.asList("all", "name", "surname", "location");
        return elementToChoose.contains(selectedElement);
    }

    // Method to concatenate elements based on the type
    public String concatenateElements(List<String> elements, String type) {
        // Determine the ArrayList and splitByTypeOfRequest based on the type
        List<String> elementsToConcatenate;
        String allElementsAvailable = "name, surname, location";
        String splitByTypeOfRequest;

        if (type.equals(SELECT_QUERY) || type.equals(INSERT_QUERY)) {
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
            if (type.equals(AVAILABLE_ELEMENTS)) {
                char firstChar = element.charAt(0);
                element = Character.toUpperCase(firstChar) + element.substring(1);
            }

            if (type.equals(INSERT_QUERY)) {
                if (i == 0)
                    concatenatedElements.append("(");
                if (element.equals("all")) {
                    concatenatedElements.append(allElementsAvailable);
                    i = elementsToConcatenate.size() - 1;
                } else {
                    concatenatedElements.append(i == 0 ? element : splitByTypeOfRequest + element);
                }
                if (i == elementsToConcatenate.size() - 1)
                    concatenatedElements.append(")");
            } else {
                concatenatedElements.append(i == 0 ? element.equals("all") ? "*" : element : splitByTypeOfRequest + element);
            }
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
