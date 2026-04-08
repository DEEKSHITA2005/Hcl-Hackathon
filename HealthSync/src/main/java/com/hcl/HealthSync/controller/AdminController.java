package com.hcl.HealthSync.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hcl.HealthSync.model.Admin;
import com.hcl.HealthSync.service.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

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
}