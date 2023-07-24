package com.exercises;

import com.exercises.classes.DatabaseConfig;
import com.exercises.classes.QueryGenerator;
import com.exercises.classes.SelectQueryGenerator;

import java.sql.Array;
import java.sql.Connection;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
import java.sql.SQLException;
import java.sql.DriverManager;

public class MainDB {
    public static void main(String[] args) {
        // DB connection properties
        Connection connection;
        DatabaseConfig db = new DatabaseConfig(
                "jdbc:mysql://localhost:3306/db_test",
                "root",
                "admin",
                "db_jdbc",
                "table1");

        // Initialize Scanner
        try (Scanner sc = new Scanner(System.in)) {
            QueryGenerator queryGenerator = new QueryGenerator(sc, db);
            System.out.println("WELCOME TO JDBC!");
            String selectedQueryType;
            do {
                System.out.println("What type of query do you want to execute?");
                System.out.println(">> Select between these options: Create (1) / Read (2) / Update (3) / Delete (4)");
                System.out.print("  --> ");
                selectedQueryType = sc.nextLine().toLowerCase();
                if (checkElementChosen(selectedQueryType)) break;
                else System.err.println(">> Please select a valid option");
            } while (true);

            // Create a new instance of SelectQueryGenerator
            String queryType;
            switch (selectedQueryType) {
                case "1":
                case "create":
                    queryType = "insert";
                    break;
                case "2":
                case "read":
                    queryType = "select";
                    break;
                case "3":
                    queryType = "update";
                    break;
                case "4":
                    queryType = "delete";
                    break;
                default:
                    queryType = selectedQueryType;
                    break;
            }

            System.out.println(queryGenerator.generateQuery(db.getDbTable(), queryType));

            // DB connection and other operations (keep as is)
            connection = DriverManager.getConnection(db.getDbUrl(), db.getDbUser(), db.getDbPassword());
            System.out.println("Connection success.");
            connection.close();
            System.out.println("Connection closed.");
        } catch (SQLException e) {
            System.err.println("Connection failed: " + e.getMessage());
        }
    }

    public static boolean checkElementChosen(String selectedElement) {
        List<String> elementsToChoose = Arrays.asList("create", "insert", "read", "select", "update", "delete", "1", "2", "3", "4", "5");
        return elementsToChoose.contains(selectedElement);
    }
}
