package com.hcl.HealthSync.service;

import com.hcl.HealthSync.model.Admin;
import com.hcl.HealthSync.model.Doctor;

public interface AdminService {

    Admin register(Admin admin);

    String verify(String email, String password);

    Doctor addDoctor(Doctor doctor);
}