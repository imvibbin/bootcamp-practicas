package com.exercises.classes;

public class Developer {

    private String name;
    private String surname;
    private int age;
    private String rol;

    public Developer(String name, String surname, int age, String rol) {
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.rol = rol;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}
