package com.miweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication // Anotación que indica que es una clase de configuración de Spring Boot
public class MiwebApplication {

    public static void main(String[] args) {
        SpringApplication.run(MiwebApplication.class, args); // Arranca la aplicación
    }
}
