package com.auth.auth_app_backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Auth-App Built by Akshay",
                description = "Generic auth app that can be used with any application.",
                contact = @Contact(
                        name = "Akshay",
                        email = "akshayvishwakarma770@gmail.com",
                        url = "https://ak1715.github.io/Portfolio/"
                ),
                version = "1.0",
                summary = "This app is very useful if you don't want to create auth app from scratch."
        ),
        security = {
                @SecurityRequirement(
                        name = "bearerAuth"
                )
        }
)
@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT"
)
public class APIDocConfig {
}
