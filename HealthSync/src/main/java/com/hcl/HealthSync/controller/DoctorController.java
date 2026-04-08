package com.hcl.HealthSync.controller;

import com.hcl.HealthSync.service.DoctorService;
import com.hcl.HealthSync.service.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/doctor")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private JWTService jwtService;

    // ✅ Doctor Login API
    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password) {
        return doctorService.verify(email,password);
    }   

}
