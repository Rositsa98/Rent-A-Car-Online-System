package com.fmi.course.spring.project.rentacar.model.registration;

import java.io.Serializable;

public class RegistrationRequest implements Serializable {

    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String role;
    private String phone;


    public RegistrationRequest() {

    }

    public RegistrationRequest(String username, String password, String firstName, String lastName, String role, String phone) {
        this.setUsername(username);
        this.setPassword(password);
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setRole(role);
        this.setPhone(phone);
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
