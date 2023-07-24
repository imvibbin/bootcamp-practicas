package com.exercises.classes;

import java.util.Arrays;
import java.util.List;

public class DatabaseConfig {
    private final String dbUrl;
    private final String dbUser;
    private final String dbPassword;
    private final String dbDatabase;
    private final String dbTable;
    private final List<String> dbTableFields;

    public DatabaseConfig(String dbUrl, String dbUser, String dbPassword, String dbDatabase, String dbTable) {
        this.dbUrl = dbUrl;
        this.dbUser = dbUser;
        this.dbPassword = dbPassword;
        this.dbDatabase = dbDatabase;
        this.dbTable = dbTable;
        this.dbTableFields = Arrays.asList("name", "surname", "location");
    }

    public String getDbUrl() {
        return dbUrl;
    }

    public String getDbUser() {
        return dbUser;
    }

    public String getDbPassword() {
        return dbPassword;
    }

    public String getDbDatabase() {
        return dbDatabase;
    }

    public String getDbTable() { return dbTable; }

    public List<String> getDbTableFields() { return dbTableFields; }
}