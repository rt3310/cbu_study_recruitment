package com.cbu.cbustudy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class CbustudyApplication {

	public static void main(String[] args) {
		SpringApplication.run(CbustudyApplication.class, args);
	}

}
