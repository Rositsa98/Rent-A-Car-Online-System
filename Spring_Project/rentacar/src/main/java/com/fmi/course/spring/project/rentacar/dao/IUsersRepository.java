package com.fmi.course.spring.project.rentacar.dao;

import com.fmi.course.spring.project.rentacar.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface IUsersRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
}
