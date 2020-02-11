package com.fmi.course.spring.project.rentacar.controller;


import com.fmi.course.spring.project.rentacar.model.Car;
import com.fmi.course.spring.project.rentacar.service.impl.CarsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {

    @Autowired
    private CarsService carsService;

    @RequestMapping(value = "{fromDate}/{toDate}", method = RequestMethod.GET)
    public  Map<String, Integer>  getRentedCars(@PathVariable("fromDate") String fromDate, @PathVariable("toDate") String toDate) throws ParseException {
        List<Car> cars = carsService.findAllCars();

        Date from =new SimpleDateFormat("dd-MM-yyyy").parse(fromDate);
        Date to = new SimpleDateFormat("dd-MM-yyyy").parse(toDate);

        //map with day and number of cars
        Map<String, Integer> resultCars = initCarsMap();

        for (Car car : cars) {
            if (car.getRentDate()!=null && car.getRentDate().after(from) && car.getRentDate().before(to)) {

                Calendar c = Calendar.getInstance();
                c.setTime(car.getRentDate());
                int dayOfWeek = c.get(Calendar.DAY_OF_WEEK);

                String keyDay = this.castDayOfWeek(dayOfWeek);
                int value = resultCars.get(keyDay);

                resultCars.put(keyDay, value+1);
            }
        }

        return resultCars;
    }

    @RequestMapping(value = "/availableCarBrands", method = RequestMethod.GET)
    public Map<String, Integer> availableCarBrands() {
        List<Car> cars = carsService.findAllCars();
        Map<String, Integer> resultCars = new HashMap<>();

        for (Car car : cars) {
            if (car.isAvailable()==true) {

                if(resultCars.get(car.getModel())!=null){
                    int value = resultCars.get(car.getModel()) +1;
                    resultCars.put(car.getModel(), value);
                }

                resultCars.put(car.getModel(), 1);
            }
        }

        return resultCars;
    }

    private Map<String, Integer> initCarsMap(){
        Map<String, Integer> resultCars = new HashMap<>();
        resultCars.put("Monday", 0);
        resultCars.put("Tuesday", 0);
        resultCars.put("Wednesday", 0);
        resultCars.put("Thursday", 0);
        resultCars.put("Friday", 0);
        resultCars.put("Saturday", 0);
        resultCars.put("Sunday", 0);

        return resultCars;
    }

    private String castDayOfWeek(int day) {
        switch (day) {
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
            case 7:
                return "Sunday";
        }
        return null;
    }


}
