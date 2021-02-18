package com.fmi.course.spring.project.rentacar.dao;

import com.fmi.course.spring.project.rentacar.model.Car;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ICarsRepository extends MongoRepository<Car, String> {
    Optional<Car> findByModel(String model);

}
