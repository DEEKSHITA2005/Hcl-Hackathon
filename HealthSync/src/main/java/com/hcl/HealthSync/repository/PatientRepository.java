package com.hcl.HealthSync.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hcl.HealthSync.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Integer> {
    Patient findByEmailAndPassword(String email, String password);

    // Better approach (recommended)
    Patient findByEmail(String email);
	
}
