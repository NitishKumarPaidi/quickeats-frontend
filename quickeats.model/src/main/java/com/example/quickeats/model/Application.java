package com.example.quickeats.model;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.example.quickeats")
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
