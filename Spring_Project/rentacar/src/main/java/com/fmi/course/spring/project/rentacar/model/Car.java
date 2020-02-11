package com.fmi.course.spring.project.rentacar.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Date;

@Document(collection = "cars")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
public class Car {
    @Id
    private String id;
    @NonNull
    @NotNull
    @Size(min= 2, max = 60)
    private String model;
    private double price;
    private int seats;
    private int doors;
    private boolean automatic;
    private boolean airConditioning;
    private boolean available;
    private String imageURL;
    private String location;
    private User resUser;

    @PastOrPresent
    private Date rentDate;

//    public Car(String id, String model, double price, int seats, int doors, boolean automatic, boolean airConditioning, boolean available) {
//    }

    public String getId() {
        return id;
    }
    public String getModel() {
        return model;
    }

    public String getLocation() {
        return location;
    }
}
