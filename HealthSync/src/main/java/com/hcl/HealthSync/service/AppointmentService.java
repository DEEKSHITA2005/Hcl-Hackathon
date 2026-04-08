package com.hcl.HealthSync.service;

import java.util.List;

import com.hcl.HealthSync.model.Appointment;

public interface AppointmentService {
	
	public String createAppointment(Appointment a);
	
	public List<Appointment> getAppointmentByPatientId(long patientId);
	public List<Appointment> getAllAppointment();
	public List<Appointment> getAppointMentByDoctorId(long doctorId);
	public String updateStatus(long appointmentId,String status);
	

}
