package com.hcl.HealthSync.service;

import com.hcl.HealthSync.model.Admin;

public interface AdminService {

    Admin register(Admin admin);

    String verify(String email, String password);
}