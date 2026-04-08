package com.hcl.HealthSync.service;

import com.hcl.HealthSync.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorService  {
    List<Doctor> getAllDoctors();

    Doctor getProfile(int doctorId);
   // Doctor findByEmail(String email);
   String verify(String email, String password);
}
