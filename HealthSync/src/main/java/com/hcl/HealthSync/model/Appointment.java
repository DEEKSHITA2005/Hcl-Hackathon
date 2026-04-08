package com.hcl.HealthSync.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity

public class Appointment {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(name = "patient_id", nullable = false)
	    private Long patientId;

	    // 🔗 Many appointments → One doctor
	    @Column(name = "doctor_id", nullable = false)
	    private Long doctorId;

	  
	    @Column(name = "slot_id", nullable = false, unique = true) 
	    private Long slotId;

	   
	    @Enumerated(EnumType.STRING)
	    @Column(nullable = false)
	    private Mode mode;

	  
	    @Enumerated(EnumType.STRING)
	    @Column(nullable = false)
	    private Status status;

	    @Column(name = "booking_date", nullable = false)
	    private LocalDateTime bookingDate;

		public Appointment() {
			super();
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public Long getPatientId() {
			return patientId;
		}

		public void setPatientId(Long patientId) {
			this.patientId = patientId;
		}

		public Long getDoctorId() {
			return doctorId;
		}

		public void setDoctorId(Long doctorId) {
			this.doctorId = doctorId;
		}

		public Long getSlotId() {
			return slotId;
		}

		public void setSlotId(Long slotId) {
			this.slotId = slotId;
		}

		public Mode getMode() {
			return mode;
		}

		public void setMode(Mode mode) {
			this.mode = mode;
		}

		public Status getStatus() {
			return status;
		}

		public void setStatus(Status status) {
			this.status = status;
		}

		public LocalDateTime getBookingDate() {
			return bookingDate;
		}

		public void setBookingDate(LocalDateTime bookingDate) {
			this.bookingDate = bookingDate;
		}

	
}
