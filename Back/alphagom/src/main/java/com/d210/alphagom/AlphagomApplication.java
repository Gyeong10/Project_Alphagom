package com.d210.alphagom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing // JPA Auditing 어노테이션들을 모두 활성화
public class AlphagomApplication {

	public static void main(String[] args) {
		SpringApplication.run(AlphagomApplication.class, args);
	}

}
