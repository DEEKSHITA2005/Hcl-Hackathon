package com.hcl.HealthSync.service;

import com.hcl.HealthSync.model.Patient;
import com.hcl.HealthSync.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PatientServiceImpl implements PatientService{
    @Autowired
    private PatientRepository patientRepository;

//    @Autowired
//    private AppointmentRepo appointmentRepo;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public Patient savePatient(Patient p) {
        p.setPassword(passwordEncoder.encode(p.getPassword()));
        return patientRepository.save(p);
    }

    @Override
    public String verify(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

        if(authentication.isAuthenticated()){
            Patient patient = patientRepository.findByEmail(email);
            return jwtService.generateToken(email,"ROLE_PATIENT",patient.getId());
        }
        return "FAiled";
    }
}
