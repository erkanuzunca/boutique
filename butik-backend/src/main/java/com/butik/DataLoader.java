package com.butik;

import com.butik.model.Admin;
import com.butik.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    // Constructor Dependency Injection
    public DataLoader(AdminRepository adminRepository, BCryptPasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Admin kullanıcıyı şifreyle birlikte ekliyoruz
        Admin admin = adminRepository.findByUsername("admin").orElse(null);
        if (admin != null) {
            // Şifreyi BCrypt ile şifrele
            admin.setPassword(passwordEncoder.encode("adminpassword"));
            adminRepository.save(admin); // Şifreyi güncelle ve kaydet
            System.out.println("Admin kullanıcı şifresi BCrypt ile güncellendi.");
        } else {
            // Eğer admin kullanıcı yoksa, yeni bir admin oluştur
            admin = new Admin();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("1234")); // BCrypt şifreleme
            adminRepository.save(admin);
            System.out.println("Admin kullanıcı veritabanına eklendi.");
        }
    }
}
