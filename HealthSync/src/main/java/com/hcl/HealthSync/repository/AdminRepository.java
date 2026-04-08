package com.hcl.HealthSync.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.hcl.HealthSync.model.Admin;

<<<<<<< HEAD
=======
import org.springframework.data.jpa.repository.JpaRepository;
import com.hcl.HealthSync.model.Admin;

>>>>>>> d33e4af793bb679765fd92251dd4eb493f15497b
import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Integer> {

    Optional<Admin> findByEmail(String email);
}