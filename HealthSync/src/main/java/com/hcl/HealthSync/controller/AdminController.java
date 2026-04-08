package com.hcl.HealthSync.controller;

import com.hcl.HealthSync.model.Doctor;
import com.hcl.HealthSync.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hcl.HealthSync.model.Admin;
import com.hcl.HealthSync.service.AdminService;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private DoctorService doctorService;

    // Register Admin
    @PostMapping("/register")
    public Admin register(@RequestBody Admin admin) {
        return adminService.register(admin);
    }

    // Login Admin
    @PostMapping("/login")
    public String login(@RequestParam String email,
                       @RequestParam String password) {
        return adminService.verify(email, password);
    }

    @PostMapping("/doctor/add")
    public ResponseEntity<Doctor> addDoctor(@RequestBody Doctor doctor) {
        Doctor savedDoctor = adminService.addDoctor(doctor);
        return ResponseEntity.ok(savedDoctor);
    }


    @GetMapping("/getalldoctors")
    public List<Doctor> getAllDoctors(){
        return doctorService.getAllDoctors();
    }




}