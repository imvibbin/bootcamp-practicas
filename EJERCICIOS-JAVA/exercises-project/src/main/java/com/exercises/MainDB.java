package com.exercises;

import com.exercises.classes.DatabaseConfig;
import com.exercises.classes.QueryGenerator;
import com.exercises.classes.SelectQueryGenerator;

import java.sql.*;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

public class MainDB {
    public static void main(String[] args) {
        String queryToExecute = "";
        // DB connection properties
        Connection connection;
        DatabaseConfig db = new DatabaseConfig(
                "jdbc:mysql://localhost:3306/",
                "root",
                "admin",
                "db_jdbc",
                "table1");

        // Initialize Scanner
        try (Scanner sc = new Scanner(System.in)) {
            QueryGenerator queryGenerator = new QueryGenerator(sc, db);
            System.out.println("WELCOME TO JDBC!");
            System.out.println(">> SQL QUERY GENERATOR <<");
            String selectedQueryConfig;
            String selectedQueryType = null;

            do {
                System.out.println("Please select one of the following ways to create an SQL query: ");
                System.out.println("AUTO: This is the easier way to create a sql query");
                System.out.println("MANUAL: This is the hardest way to create a sql query");
                System.out.print("--> ");
                selectedQueryConfig = sc.nextLine().toLowerCase();
                if (selectedQueryConfig.equals("auto")) {
                    System.out.println("What type of query do you want to execute?");
                    System.out.println(">> Select between these options: Create (INSERT) / Read (SELECT) / Update (UPDATE) / Delete (DELETE)");
                    System.out.print("--> ");
                    selectedQueryType = sc.nextLine().toLowerCase();
                    if (checkElementChosen(selectedQueryType)) {
                        queryToExecute = queryGenerator.generateQuery(
                                db.getDbTable(),
                                selectedQueryType.equals("read") ? "select" : selectedQueryType.equals("create") ? "insert" : selectedQueryType);
                        break;
                    } else System.err.println(">> Please select a valid option");
                } else if (selectedQueryConfig.equals("manual")) {
                    System.out.println("Please type your SQL query: ");
                    System.out.print("--> ");
                    queryToExecute = sc.nextLine();
                    break;
                } else {
                    System.err.println(">> Please select a valid option");
                }
            } while (true);

            System.out.println("############  " + queryToExecute + "  ############");

            // DB connection and other operations (keep as is)
            connection = DriverManager.getConnection(db.getDbUrl() + db.getDbDatabase(), db.getDbUser(), db.getDbPassword());
            System.out.println(showSqlQuery(queryToExecute, connection, selectedQueryType));

            System.out.println("Connection success.");
            connection.close();
            System.out.println("Connection closed.");

        } catch (SQLException e) {
            System.err.println("Connection failed: " + e.getMessage());
        }
    }

    private static String showSqlQuery(String queryToExecute, Connection connection, String queryType) throws SQLException {
        StringBuilder queryResult = new StringBuilder();
        Statement statement = connection.createStatement();
        if (queryType.equals("read")) {
            ResultSet result = statement.executeQuery(queryToExecute);
            while (result.next()) {
                String name = result.getString("name");
                String surname = result.getString("surname");
                String location = result.getString("location");
                queryResult.append(String.format("%s %s %s\n", name, surname, location));
            }
        } else if (queryType.equals("create")) {
            int rowsAffected = statement.executeUpdate(queryToExecute);
        }

        return queryResult.toString();
    }
    public static boolean checkElementChosen(String selectedElement) {
        List<String> elementsToChoose = Arrays.asList("create", "insert", "read", "select", "update", "delete");
        return elementsToChoose.contains(selectedElement);
    }
}
