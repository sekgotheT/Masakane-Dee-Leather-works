package com.leatherworks;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
public class LeatherWorksApplication extends SpringBootServletInitializer {

    // Logger for tracking application startup
    private static final Logger logger = LoggerFactory.getLogger(LeatherWorksApplication.class);

    public static void main(String[] args) {
        // Starting Spring Boot application
        SpringApplication.run(LeatherWorksApplication.class, args);
        
        // Log the application startup message
        logger.info("✅ LeatherWorks Application Started Successfully!");
    }

    // Additional configuration for external server (if needed)
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(LeatherWorksApplication.class);
    }
}
