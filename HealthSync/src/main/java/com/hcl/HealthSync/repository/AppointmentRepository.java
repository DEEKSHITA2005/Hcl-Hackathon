package com.hcl.HealthSync.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hcl.HealthSync.model.Appointment;

public interface AppointmentRepository  extends JpaRepository<Appointment, Long> {
	
	   List<Appointment> findByPatientId(Long patientId);

	    // ✅ Get by doctor
	    List<Appointment> findByDoctorId(Long doctorId);
}
