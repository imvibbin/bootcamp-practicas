package com.exercises;

import com.exercises.classes.DatabaseConfig;
import com.exercises.classes.SelectQueryGenerator;

import java.sql.Connection;
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
            System.out.println("WELCOME TO JDBC!");
            String selectedQueryType;
            do {
                System.out.println("What type of query do you want to execute?");
                System.out.println(">> Select between these options: Create / Read / Update / Delete");
                selectedQueryType = sc.nextLine().toLowerCase();
            } while (!selectedQueryType.equals("read"));

            // Create a new instance of SelectQueryGenerator
            SelectQueryGenerator queryGenerator = new SelectQueryGenerator(sc);
            System.out.println(queryGenerator.generateSelectQuery(db.getDbTable()));

            // DB connection and other operations (keep as is)
            connection = DriverManager.getConnection(db.getDbUrl(), db.getDbUser(), db.getDbPassword());
            System.out.println("Connection success.");
            connection.close();
            System.out.println("Connection closed.");
        } catch (SQLException e) {
            System.err.println("Connection failed: " + e.getMessage());
        }
    }
}
