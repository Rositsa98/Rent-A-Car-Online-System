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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
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
            Car car1 = new Car(null, "bmw", 50000.50, 5,4,true,true,true,"https://www.digital.bg/f/logo/704/860_f09e0c434f35ba7adf7626f23a57c58a.jpg","Sofia Airport",null, new Date(System.currentTimeMillis()));
            Car car2 = new Car(null, "audi", 30000.50, 5,4,true,true,true,"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTeP9tfLp41I_lGmRtmBbKD_Bjr04A9-WyvqDWfgmNs4N6N1_Fw", "Sofia Center",null,new Date(System.currentTimeMillis()));
            Car car3 = new Car(null, "peugeot", 20000.50, 5,4,true,true,true,"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS4ZCj1h79LIXBadZKq1iQL3hJ3CmFUz_uDTTCXs7MoYqHjAT1-", "Sofia Studentski grad",null, null);
            Car car4 = new Car(null, "mercedes", 70000.50, 5,4,true,true,true, "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTqSV3eQQx_1LEEgDmFhUE8ircoAzQKX0EFJXRNEKpWVYFl4ti8","Sofia Boyana",null, new Date(System.currentTimeMillis()));
            carsService.addCar(car1);
            carsService.addCar(car2);
            carsService.addCar(car3);
            carsService.addCar(car4);
        }
    }
}
