package com.fmi.course.spring.project.rentacar.initialize;

import com.fmi.course.spring.project.rentacar.model.Car;
import com.fmi.course.spring.project.rentacar.model.User;
import com.fmi.course.spring.project.rentacar.service.impl.CarsService;
import com.fmi.course.spring.project.rentacar.service.impl.UserService;
import io.micrometer.core.util.internal.logging.AbstractInternalLogger;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Slf4j
@Component
public class DataInitializer implements ApplicationRunner {
    @Autowired
    private UserService usersService;
    @Autowired
    private CarsService carsService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
//        log.info("Initializing application...");
        if (usersService.count() == 0) {
            User user = new User(null, "admin", "admin123&", "Admin", "Admin", "Admin", "088",
                    "ROLE_ADMIN", true, LocalDateTime.now(), LocalDateTime.now());
//            log.info("Creating root admin user: {}", user.getUsername());
            usersService.addUser(user);
        }
        if(carsService.count() == 0) {
            Car car = new Car(null, "bmw", 50000.50, 5,4,true,true,true);
            carsService.addCar(car);
        }
    }
}
