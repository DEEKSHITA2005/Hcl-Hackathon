package com.hcl.HealthSync.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hcl.HealthSync.model.Appointment;
import com.hcl.HealthSync.service.AppointmentService;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {
	

    @Autowired
    private AppointmentService appointmentService;

    // ✅ 1. Book Appointment
    @PostMapping("/book")
    public String createAppointment(@RequestBody Appointment appointment) {
        return appointmentService.createAppointment(appointment);
    }

    // ✅ 2. Get appointments by patient
    @GetMapping("/patient/{patientId}")
    public List<Appointment> getAppointmentsByPatient(
            @PathVariable long patientId) {
        return appointmentService.getAppointmentByPatientId(patientId);
    }

    // ✅ 3. Get appointments by doctor
    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getAppointmentsByDoctor(
            @PathVariable long doctorId) {
        return appointmentService.getAppointMentByDoctorId(doctorId);
    }

    // ✅ 4. Get all appointments (Admin)
    @GetMapping("/all")
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointment();
    }

    // ✅ 5. Update appointment status
    @PutMapping("/{appointmentId}/status")
    public String updateStatus(
            @PathVariable long appointmentId,
            @RequestParam String status) {

        return appointmentService.updateStatus(appointmentId, status);
    }
	
	

}
