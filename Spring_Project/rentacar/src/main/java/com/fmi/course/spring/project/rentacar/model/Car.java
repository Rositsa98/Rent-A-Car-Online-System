package com.fmi.course.spring.project.rentacar.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

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

    public String getId() {
        return id;
    }
    public String getModel() {
        return model;
    }

}
