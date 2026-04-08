package com.hcl.HealthSync.service;

import com.hcl.HealthSync.model.Doctor;
import com.hcl.HealthSync.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService{
    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @Override
    public Doctor getProfile(int doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow();
        return doctor;
    }

    @Override
    public String verify(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

        if(authentication.isAuthenticated()){
            Doctor doctor = doctorRepository.findByEmail(email);
            return jwtService.generateToken(email,"ROLE_DOCTOR",doctor.getDoctor_id());
        }
        return "FAiled";
    }


}
