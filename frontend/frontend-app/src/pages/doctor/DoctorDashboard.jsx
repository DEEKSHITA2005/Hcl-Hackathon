import React from 'react';
import DoctorSidebar from './components/DoctorSidebar';
import DoctorMain from './components/DoctorMain';
import './Doctor.css';
import { Outlet } from 'react-router-dom';

export default function DoctorDashboard() {
  return (
    <div className="doc-dashboard animate-fade-in">
      <DoctorSidebar />
      <Outlet />
    </div>
  );
}
