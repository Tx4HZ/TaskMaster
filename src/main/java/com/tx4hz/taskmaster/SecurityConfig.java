package com.tx4hz.taskmaster;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Отключение (для API обычно не нужно)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/users").permitAll() // Разрешить без аутентификации
                        .requestMatchers(HttpMethod.GET, "/api/users/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/api/users/**").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/api/users/**").permitAll()
                        .anyRequest().authenticated()
                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
