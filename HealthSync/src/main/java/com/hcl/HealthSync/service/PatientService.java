package com.hcl.HealthSync.service;

import com.hcl.HealthSync.model.Patient;

public interface PatientService
{

    Patient savePatient(Patient p);

    String verify(String email, String password);
}
