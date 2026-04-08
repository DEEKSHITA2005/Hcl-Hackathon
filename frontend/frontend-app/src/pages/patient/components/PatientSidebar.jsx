import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Home, FileText, User, Settings, LogOut } from 'lucide-react';

export default function PatientSidebar() {
  const navigate = useNavigate();

  const onLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/login');
  };
  return (
    <aside className="patient-sidebar">
      <Link  className="logo-link">
        <div className="icon-circle icon-blue" style={{ width: '40px', height: '40px', margin: 0 }}>
          <Calendar size={20} />
        </div>
        <span className="logo-text" style={{ fontSize: '1.25rem' }}>HealthSync</span>
      </Link>
      
      <nav className="patient-nav">
        <Link to="/patient" className="patient-nav-item active"><Home size={20} /> Dashboard</Link>
        <Link to="/patient/appointments" className="patient-nav-item"><Calendar size={20} /> Appointments</Link>
        <Link to="/patient/records" className="patient-nav-item"><FileText size={20} /> Records</Link>
        <Link to="/patient/profile" className="patient-nav-item"><User size={20} /> Profile</Link>
        <Link to="/patient/settings" className="patient-nav-item"><Settings size={20} /> Settings</Link>
        
        <Link to="/login" className="patient-nav-item patient-logout" onClick={onLogout}><LogOut size={20} /> Log Out</Link>
      </nav>
    </aside>
  );
}
