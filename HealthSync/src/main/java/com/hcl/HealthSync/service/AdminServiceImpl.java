package com.hcl.HealthSync.service;


<<<<<<< HEAD
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService{

=======
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hcl.HealthSync.model.Admin;
import com.hcl.HealthSync.repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public Admin register(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    public Admin login(String email, String password) {
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!admin.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return admin;
    }
>>>>>>> d33e4af793bb679765fd92251dd4eb493f15497b
}
