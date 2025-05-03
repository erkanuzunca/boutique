package com.butik;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.butik.model")
@EnableJpaRepositories(basePackages = "com.butik.repository")
public class ButikBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ButikBackendApplication.class, args);

	}

}
