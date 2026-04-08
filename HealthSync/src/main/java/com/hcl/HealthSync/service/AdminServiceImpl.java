package com.hcl.HealthSync.service;



import com.hcl.HealthSync.model.Doctor;
import com.hcl.HealthSync.model.Patient;
import com.hcl.HealthSync.repository.DoctorRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import com.hcl.HealthSync.model.Admin;
import com.hcl.HealthSync.repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTService jwtService;

    @Override
    public Admin register(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    @Override
    public String verify(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

        if(authentication.isAuthenticated()){
            Admin admin = adminRepository.findByEmail(email);
            return jwtService.generateToken(email,"ROLE_ADMIN",admin.getId());
        }
        return "FAiled";
    }

    @Override
    public Doctor addDoctor(Doctor doctor) {
        // Encode the doctor's password before saving
        doctor.setPassword(passwordEncoder.encode(doctor.getPassword()));
        return doctorRepository.save(doctor);
    }



}
