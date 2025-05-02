package com.butik.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // CSRF koruması kapalı
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/**").permitAll() // Tüm endpoint'lere erişim serbest
                        .anyRequest().authenticated()
                );
        return http.build();
    }
}
