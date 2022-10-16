package com.pedropalma.service;

import com.pedropalma.entity.TemperatureSensor;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.annotation.RabbitListenerConfigurer;
import org.springframework.amqp.rabbit.listener.RabbitListenerEndpointRegistrar;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class RabbitMQReceiverService implements RabbitListenerConfigurer {
    private static final Logger logger = LoggerFactory.getLogger(RabbitMQReceiverService.class);
    private final TemperatureSensorService temperatureSensorService;
    private final SimpMessagingTemplate simpMessagingTemplate;
    @Override
    public void configureRabbitListeners(RabbitListenerEndpointRegistrar rabbitListenerEndpointRegistrar) {
    }
    @RabbitListener(queues = "${spring.rabbitmq.queue}")
    public void receivedMessage(TemperatureSensor temperatureData) {
        logger.info("Temperature value received ... " +temperatureData);
        temperatureSensorService.saveTemperatureDataToDB(temperatureData);
        simpMessagingTemplate.convertAndSend("/queue/temperature.queue", temperatureData);
    }
}
