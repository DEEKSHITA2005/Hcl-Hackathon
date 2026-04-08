package com.hcl.HealthSync.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.hcl.HealthSync.model.Admin;




import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Integer> {

    Admin findByEmail(String email);
}