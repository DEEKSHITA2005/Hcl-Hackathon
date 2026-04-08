import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Home, Users, Settings, LogOut } from 'lucide-react';

export default function DoctorSidebar() {
  const navigate = useNavigate();

  const onLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/login');
  };

  return (
    <aside className="doc-sidebar">
      <Link  className="logo-link">
        <div className="icon-circle icon-green" style={{ width: '40px', height: '40px', margin: 0 }}>
          <Calendar size={20} />
        </div>
        <span className="logo-text" style={{ fontSize: '1.25rem', color: 'white' }}>HealthSync Pro</span>
      </Link>
      
      <nav className="doc-nav">
        <Link to="/doctor" className="doc-nav-item active"><Home size={20} /> Overview</Link>
        <Link to="/doctor/schedules" className="doc-nav-item"><Calendar size={20} /> Schedule</Link>
        <Link to="/doctor/patients" className="doc-nav-item"><Users size={20} /> Patients</Link>
        <Link to="/doctor/profile" className="doc-nav-item"><Users size={20} /> Profile</Link>
        <Link to="/doctor/settings" className="doc-nav-item"><Settings size={20} /> Settings</Link>
        
        <Link to="/login" className="doc-nav-item" style={{ marginTop: 'auto', color: '#fca5a5' }} onClick={onLogout}>
          <LogOut size={20} /> Log Out
        </Link>
      </nav>
    </aside>
  );
}
