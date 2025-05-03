package com.butik.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        // Debug: Authorization header'ını logla
        System.out.println("JWT Header: " + authHeader);  // Bu satırı ekledik

        String username = null;
        String jwt = null;

        // Header "Bearer token" formatında mı?
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7); // "Bearer " kısmını at
            try {
                username = jwtUtil.extractUsername(jwt);  // Username'ı JWT'ten çıkarıyoruz
            } catch (Exception e) {
                System.out.println("JWT geçersiz: " + e.getMessage());
            }
        }

        // Kimlik doğrulaması yapılmadıysa ve kullanıcı varsa
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            if (jwtUtil.isTokenValid(jwt)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        username, null, Collections.emptyList());

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Debug: Kimlik doğrulama sonrası hangi kullanıcı ayarlandı
        System.out.println("Authenticated User: " + username);  // Bu satırı ekledik

        filterChain.doFilter(request, response);
    }
}
