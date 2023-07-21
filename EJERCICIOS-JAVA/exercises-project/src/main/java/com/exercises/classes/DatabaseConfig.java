package com.exercises.classes;

public class DatabaseConfig {
    private final String dbUrl;
    private final String dbUser;
    private final String dbPassword;
    private final String dbDatabase;
    private final String dbTable;

    public DatabaseConfig(String dbUrl, String dbUser, String dbPassword, String dbDatabase, String dbTable) {
        this.dbUrl = dbUrl;
        this.dbUser = dbUser;
        this.dbPassword = dbPassword;
        this.dbDatabase = dbDatabase;
        this.dbTable = dbTable;
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

    public String getDbTable() {
        return dbTable;
    }
}