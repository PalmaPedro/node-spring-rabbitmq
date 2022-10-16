package com.pedropalma.service;

import com.pedropalma.entity.TemperatureSensor;
import com.pedropalma.repository.TemperatureSensorRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class TemperatureSensorService {
    private final TemperatureSensorRepository temperatureSensorRepository;
    public void saveTemperatureDataToDB (TemperatureSensor temperatureData) {
        temperatureSensorRepository.save(temperatureData);
    }
}
