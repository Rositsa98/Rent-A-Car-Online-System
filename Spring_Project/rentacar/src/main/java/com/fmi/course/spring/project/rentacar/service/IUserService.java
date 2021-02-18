package com.fmi.course.spring.project.rentacar.service;

import com.fmi.course.spring.project.rentacar.model.User;
import com.fmi.course.spring.project.rentacar.model.registration.RegistrationRequest;

import java.util.List;

public interface IUserService {


    List<User> findAllUsers();

    User findUserById(String id);

    User addUser(User user);

    User updateUser(User user);

    User deleteUser(String id);

    User findUserByUsername(String username);

    long count();

    List<String> findUserRoles(String username);

    User convertRegistrationRequestToUser(RegistrationRequest registrationRequest);
}
