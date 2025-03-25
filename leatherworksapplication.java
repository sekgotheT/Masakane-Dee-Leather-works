package com.leatherworks;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
@ComponentScan(basePackages = "com.leatherworks")  // Ensures correct package scanning
@EnableTransactionManagement  // Enables transaction management for database operations
@EnableScheduling  // Enables scheduled tasks (if needed)
public class LeatherWorksApplication {
    
    private static final Logger logger = LoggerFactory.getLogger(LeatherWorksApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(LeatherWorksApplication.class, args);
        logger.info("✅ LeatherWorks Application is running on port 8080...");
    }
}
