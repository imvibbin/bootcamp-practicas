package com.exercises.classes;

import com.exercises.enums.TypeOfConcatenations;

import java.util.List;
import java.util.ArrayList;
import java.util.Scanner;

public class UpdateQueryGenerator {
    private final Scanner sc;
    private final DatabaseConfig databaseConfig;
    private final QueryGenerator queryGenerator;
    private final List<String> elementsToInsert;
    private final static String INSERT_QUERY = TypeOfConcatenations.UPDATE_QUERY.toString();
    private final static String AVAILABLE_ELEMENTS = TypeOfConcatenations.AVAILABLE_ELEMENTS.toString();

    // Constructor to initialize the SelectQueryGenerator
    public UpdateQueryGenerator(Scanner scanner, QueryGenerator queryGenerator, DatabaseConfig databaseConfig) {
        this.sc = scanner;
        this.databaseConfig = databaseConfig;
        this.queryGenerator = queryGenerator;
        this.elementsToInsert = new ArrayList<>();
    }

    // Method to generate the SELECT query
    public String updateQueryPrompts(List<String> chosenElements) {
        // Get available options to choose from and prompt the user
        String availableOptionsToChoose = this.queryGenerator.concatenateElements(chosenElements, AVAILABLE_ELEMENTS);
        System.out.println("What elements do you want to update?");
        System.out.println(">> Select between these options: " + availableOptionsToChoose);
        System.out.print("--> ");
        return sc.nextLine().toLowerCase();
    }

    public List<String> updateQueryValues(List<String> chosenOptions) {
        int index = 0;
        boolean valueIsAll = chosenOptions.contains("all");
        System.out.println("Replace the elements that you want:");
        do {
            if (valueIsAll) {
                System.out.print(">> "
                        + Character.toUpperCase(this.databaseConfig.getDbTableFields().get(index).charAt(0))
                        + this.databaseConfig.getDbTableFields().get(index).substring(1)
                        + ": ");
            } else {
                System.out.print(">> "
                        + Character.toUpperCase(chosenOptions.get(index).charAt(0))
                        + chosenOptions.get(index).substring(1)
                        + ": ");
            }
            String elementToAdd = sc.nextLine();
            if (checkInvalidValue(elementToAdd)) {
                System.err.print("\n>> Don't leave a blank space\n");
            } else {
                this.elementsToInsert.add("'" + elementToAdd + "'");
                index++;
            }
        } while(valueIsAll ? index < this.databaseConfig.getDbTableFields().size(): index < chosenOptions.size());
        return this.elementsToInsert;
    }

    public String generateUpdateQuery(String DB_TABLE1, List<String> chosenElements, List<String> elementsToAdd) {
        // Concatenate the chosen elements into the SELECT query
        String elementsToSelect = this.queryGenerator.concatenateElements(chosenElements, INSERT_QUERY);
        String elementsToInsert = this.queryGenerator.concatenateElements(elementsToAdd, INSERT_QUERY);
        return String.format("UPDATE %s SET %s WHERE %s;", DB_TABLE1, elementsToSelect, elementsToInsert);
    }

    public boolean checkInvalidValue(String elementToAdd) {
        return elementToAdd.equals("");
    }
}
