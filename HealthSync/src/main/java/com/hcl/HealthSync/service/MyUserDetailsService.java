package com.hcl.HealthSync.service;

import com.hcl.HealthSync.model.*;
import com.hcl.HealthSync.repository.AdminRepository;
import com.hcl.HealthSync.repository.DoctorRepository;
import com.hcl.HealthSync.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService
{

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // TODO Auto-generated method stub

//        Admin admin = adminRepository.findByEmail(email);
//        if(admin != null){
//            System.out.println("Admin Found");
//            return new AdminPrincipal(admin);
//        }
//
//        Doctor doctor = doctorRepository.findByEmail(email);
//        if(doctor != null){
//            System.out.println("Doctor Found");
//            return new DoctorPrincipal(doctor);
//        }


        Patient patient = patientRepository.findByEmail(email);
        if(patient != null) {
            System.out.println("Patient Found");
            return new PatientPrincipal(patient);
        }
        throw new UsernameNotFoundException(email + "Not Found");
    }
}
