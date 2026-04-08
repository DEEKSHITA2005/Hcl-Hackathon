package com.hcl.HealthSync.service;

import com.hcl.HealthSync.model.Admin;

public interface AdminService {

    Admin register(Admin admin);

    Admin login(String email, String password);
}