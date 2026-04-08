package com.hcl.HealthSync.model;

import jakarta.persistence.*;

@Entity
@Table(name="doctor_table")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int doctor_id;

    @Column(nullable = false,length = 50)
    private String name;
    @Column(nullable = false,length = 50)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false,length = 10)
    private String phno;
    @Column(nullable = false)
    private String specialization;

    public Doctor(){

    }

    public Doctor(String phno, int doctor_id, String name, String email, String password, String specialization, int experience) {
        this.phno = phno;
        this.doctor_id = doctor_id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.specialization = specialization;
        this.experience = experience;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getPhno() {
        return phno;
    }

    public void setPhno(String phno) {
        this.phno = phno;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getDoctor_id() {
        return doctor_id;
    }

    public void setDoctor_id(int doctor_id) {
        this.doctor_id = doctor_id;
    }

    @Column(nullable = true)
    private int experience;

}
