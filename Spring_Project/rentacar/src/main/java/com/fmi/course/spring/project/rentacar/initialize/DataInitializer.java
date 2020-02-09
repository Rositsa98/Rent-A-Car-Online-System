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
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class DataInitializer implements ApplicationRunner {
    @Autowired
    private UserService usersService;
    @Autowired
    private CarsService carsService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (usersService.count() == 0) {

            List<String> adminRoles = new ArrayList<>();
            adminRoles.add("ROLE_ADMIN");
            List<String> userRoles = new ArrayList<>();
            userRoles.add("ROLE_USER");
            List<String> operatorRoles = new ArrayList<>();
            operatorRoles.add("ROLE_OPERATOR");

            User userAdmin = new User(null, "admin", "admin123&", "Admin", "Admin", "Admin", "088",
                    adminRoles, true, LocalDateTime.now(), LocalDateTime.now());
            usersService.addUser(userAdmin);

            User userNormal = new User(null, "user", "user", "User", "User", "User", "088",
                    userRoles, true, LocalDateTime.now(), LocalDateTime.now());
            usersService.addUser(userNormal);

            User userOperator = new User(null, "operator", "admin123&", "Operator", "Operator", "Operator", "088",
                    operatorRoles, true, LocalDateTime.now(), LocalDateTime.now());
            usersService.addUser(userOperator);
        }
        if(carsService.count() == 0) {
            Car car = new Car(null, "bmw", 50000.50, 5,4,true,true,true);
            carsService.addCar(car);
        }
    }
}
