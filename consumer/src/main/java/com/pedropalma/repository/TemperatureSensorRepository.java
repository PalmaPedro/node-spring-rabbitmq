package com.pedropalma.repository;

import com.pedropalma.entity.TemperatureSensor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TemperatureSensorRepository extends JpaRepository<TemperatureSensor, Integer> {
}
