package com.hcl.HealthSync.controller;

import com.hcl.HealthSync.model.Patient;
import com.hcl.HealthSync.service.DoctorService;
import com.hcl.HealthSync.service.JWTService;
import com.hcl.HealthSync.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/patient")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @Autowired
    private DoctorService doctorService;
//
//    @Autowired
//    private AppointmentService appointmentService;

    @Autowired
    private JWTService jwtService;


    @PostMapping("/register")
    public Patient savePatient(@RequestBody Patient p) {
        return patientService.savePatient(p);
    }

    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password) {
        return patientService.verify(email, password);
    }



}
