package com.hcl.HealthSync.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hcl.HealthSync.Exception.CustomException;
import com.hcl.HealthSync.model.Appointment;
import com.hcl.HealthSync.model.Slot;
import com.hcl.HealthSync.model.Status;
import com.hcl.HealthSync.repository.AppointmentRepository;

import com.hcl.HealthSync.repository.SlotRepository;

import jakarta.transaction.Transactional;

@Service
public class AppointmentServiceImpl implements AppointmentService{
	
	@Autowired
	private AppointmentRepository ar;
	
	private SlotRepository sr;
	

	
	
	
	
	

	@Override
	@Transactional
	public String createAppointment(Appointment a) {
		// TODO Auto-generated method stub
	    Slot slot = sr.findByIdForUpdate(a.getSlotId())
	            .orElseThrow(() -> new CustomException("Slot not found"));
	    if (slot.isBooked()) {
	        return " Slot already booked!";
	    }
	    
	    slot.setBooked(true);
	    
	
		a.setStatus(Status.PENDING);
		
		ar.save(a);
		
		return "Appointment Booked Successfully";
	}

	@Override
	public List<Appointment> getAppointmentByPatientId(long patientId) {
		// TODO Auto-generated method stub
		
		
		return ar.findByPatientId(patientId);
	}

	@Override
	public List<Appointment> getAllAppointment() {
		// TODO Auto-generated method stub
		return ar.findAll();
	}



	@Override
	public List<Appointment> getAppointMentByDoctorId(long doctorId) {
		// TODO Auto-generated method stub
		return ar.findByDoctorId(doctorId);
	}

	@Override
	public String updateStatus(long appointmentId, String status) {
		// TODO Auto-generated method stub
		
		Appointment a = ar.findById(appointmentId).orElseThrow(() ->  new CustomException("Appointment not found"));
		 a.setStatus(Status.valueOf(status.toUpperCase()));
		 ar.save(a);
		return "Appointment status updated" ;
	}
	
	

}
