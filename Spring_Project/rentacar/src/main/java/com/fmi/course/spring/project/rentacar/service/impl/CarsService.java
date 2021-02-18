package com.fmi.course.spring.project.rentacar.service.impl;

import com.fmi.course.spring.project.rentacar.dao.ICarsRepository;
import com.fmi.course.spring.project.rentacar.exception.NonexisitngEntityException;
import com.fmi.course.spring.project.rentacar.model.Car;
import com.fmi.course.spring.project.rentacar.service.ICarsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CarsService  implements ICarsService {
    @Autowired
    ICarsRepository carsRepository;
    @Override
    public List<Car> findAllCars() {
        return carsRepository.findAll();
    }

    @Override
    public Car findCarById(String carId) {
        return carsRepository.findById(carId).orElseThrow(() -> new NonexisitngEntityException(
                String.format("Car with ID='%s' does not exist.", carId)));
    }

    @Override
    public Car addCar(Car car) {
        return carsRepository.insert(car);
    }

    @Override
    public Car updateCar(Car car) {
        Optional<Car> old = carsRepository.findById(car.getId());
        if (!old.isPresent()) {
            throw new NonexisitngEntityException(
                    String.format("Car with ID='%s' does not exist.", car.getId()));
        }
        return carsRepository.save(car);
    }

    @Override
    public Car deleteCar(String carId) {
        Optional<Car> old = carsRepository.findById(carId);
        if (!old.isPresent()) {
            throw new NonexisitngEntityException(
                    String.format("Car with ID='%s' does not exist.", carId));
        }
        carsRepository.deleteById(carId);
        return old.get();
    }

    @Override
    public List<String> listModelsOfCars() {
        return carsRepository.findAll().stream().map(car -> car.getModel()).collect(Collectors.toList());
    }
    @Override
    public List<String> listLocationsOfCars() {
        return carsRepository.findAll().stream().map(car -> car.getLocation()).collect(Collectors.toList());
    }

    @Override
    public Car findCarByModel(String model) {
        return carsRepository.findByModel(model).orElseThrow(() -> new NonexisitngEntityException(
                String.format("Car with model='%s' does not exist.", model)));
    }

    @Override
    public long count() {
        return carsRepository.count();
    }
}
