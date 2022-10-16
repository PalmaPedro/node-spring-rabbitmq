package com.pedropalma.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.io.Serializable;

@Component
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@id", scope = TemperatureSensor.class)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TemperatureSensor implements Serializable {

    @Id
    @SequenceGenerator(name="sensor_id_sequence", sequenceName = "sensor_id_sequence")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sensor_id_sequence")
    private Integer id;
    //private String location;
    //private String timestamp;
    private double value;
}
