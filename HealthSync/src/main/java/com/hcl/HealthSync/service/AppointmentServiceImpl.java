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
public class AppointmentServiceImpl implements AppointmentService {

	@Autowired
	private AppointmentRepository ar;

	@Autowired
	private SlotRepository sr;

	@Override
	@Transactional
	public String createAppointment(Appointment a) {
		// TODO Auto-generated method stub
		Slot slot;
		if (a.getSlotId() != null) {
			slot = sr.findByIdForUpdate(a.getSlotId())
					.orElseThrow(() -> new CustomException("Slot not found"));
		} else {
			slot = new Slot();
			slot.setDoctorId(a.getDoctorId());
			slot.setBooked(false);
			
			// Parse date and time if available
			if (a.getAppointmentDate() != null && !a.getAppointmentDate().isEmpty()) {
				slot.setDate(java.time.LocalDate.parse(a.getAppointmentDate()));
			} else {
				slot.setDate(java.time.LocalDate.now());
			}
			
			if (a.getAppointmentTime() != null && !a.getAppointmentTime().isEmpty()) {
				slot.setStartTime(java.time.LocalTime.parse(a.getAppointmentTime()));
				slot.setEndTime(java.time.LocalTime.parse(a.getAppointmentTime()).plusHours(1));
			} else {
				slot.setStartTime(java.time.LocalTime.now());
				slot.setEndTime(java.time.LocalTime.now().plusHours(1));
			}
			slot = sr.save(slot);
		}

		if (slot.isBooked()) {
			return " Slot already booked!";
		}

		slot.setBooked(true);
		sr.save(slot); // Ensure slot is updated in DB

		a.setSlotId(slot.getId()); // Use the dynamically created or existing slot id
		a.setStatus(Status.PENDING);
		a.setBookingDate(java.time.LocalDateTime.now()); // Fallback for bookingDate

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

		Appointment a = ar.findById(appointmentId).orElseThrow(() -> new CustomException("Appointment not found"));
		a.setStatus(Status.valueOf(status.toUpperCase()));
		ar.save(a);
		return "Appointment status updated";
	}

}
