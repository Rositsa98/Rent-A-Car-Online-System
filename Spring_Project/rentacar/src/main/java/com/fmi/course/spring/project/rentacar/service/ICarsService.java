package com.fmi.course.spring.project.rentacar.service;

import com.fmi.course.spring.project.rentacar.model.Car;

import java.util.List;

public interface ICarsService {
    List<Car> findAllCars();

   Car findCarById(String id);

    Car addCar(Car car);

    Car updateCar(Car car);

    Car deleteCar(String id);

    List<String> listModelsOfCars();

    List<String> listLocationsOfCars();

    Car findCarByModel(String model);

    long count();
}
