import React from 'react';
import PatientSidebar from './components/PatientSidebar';
import PatientMain from './components/PatientMain';
import './Patient.css'; 
import { Outlet } from 'react-router-dom';

export default function PatientDashboard() {
  return (
    <div className="patient-dashboard animate-fade-in">
      <PatientSidebar />
      <Outlet />
    </div>
  );
}
