package com.fmi.course.spring.project.rentacar.controller;

import com.fmi.course.spring.project.rentacar.exception.InvalidEntityException;
import com.fmi.course.spring.project.rentacar.model.Car;
import com.fmi.course.spring.project.rentacar.service.impl.CarsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/cars")
public class CarsController {
    @Autowired
    private CarsService carsService;
    @GetMapping
    public List<Car> getCars() {
        return carsService.findAllCars();
    }

    @GetMapping("{id}")
    public Car getCarById(@PathVariable("id") String carId) {
        return carsService.findCarById(carId);
    }
    @GetMapping("models")
    public List<String> getModelsOfCars() {
        return carsService.listModelsOfCars();
    }
    @GetMapping("locations")
    public List<String> getLocationsOfCars() {
        return carsService.listLocationsOfCars();
    }
    @PostMapping
    public ResponseEntity<Car> addCar(@Valid @RequestBody Car car, BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors()) {
            String message = bindingResult.getFieldErrors().stream()
                    .map(err -> String.format("Invalid '%s' -> '%s': %s\n",
                            err.getField(), err.getRejectedValue(), err.getDefaultMessage()))
                    .reduce("", (acc, errStr) -> acc + errStr);
            throw new InvalidEntityException(message);
        }
        Car created = carsService.addCar(car);
        return ResponseEntity.created(
                ServletUriComponentsBuilder.fromCurrentRequest().pathSegment("{id}").build(created.getId()))
                .body(created);
    }

    @PutMapping("{id}")
    public Car update(@PathVariable String id, @Valid @RequestBody Car car) {
        if (!id.equals(car.getId())) {
            throw new InvalidEntityException(
                    String.format("Entity ID='%s' is different from URL resource ID='%s'", car.getId(), id));
        }
        return carsService.updateCar(car);
    }

    @DeleteMapping("{id}")
    public Car remove(@PathVariable String id) {
        return carsService.deleteCar(id);
    }

}

