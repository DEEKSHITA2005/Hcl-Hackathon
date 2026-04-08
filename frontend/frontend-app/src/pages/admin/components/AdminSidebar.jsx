import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Users, Settings, LogOut, ShieldAlert } from 'lucide-react';

export default function AdminSidebar() {
  const navigate = useNavigate();

  const onLogout = (e)=>{
    e.preventDefault();
    localStorage.clear();
    navigate('/login');
  }
  return (
    <aside className="doc-sidebar">
      <Link to="/admin" className="logo-link">
        <div className="icon-circle icon-green" style={{ width: '40px', height: '40px', margin: 0 }}>
          <ShieldAlert size={20} />
        </div>
        <span className="logo-text" style={{ fontSize: '1.25rem', color: 'white' }}>HealthSync Admin</span>
      </Link>
      
      <nav className="doc-nav">
        <Link to="/admin" className="doc-nav-item active"><Home size={20} /> Dashboard</Link>
        <Link to="/admin/manage" className="doc-nav-item"><Users size={20} /> Manage Users</Link>
        <Link to="/admin/settings" className="doc-nav-item"><Settings size={20} /> Settings</Link>
        
        <Link  className="doc-nav-item" style={{ marginTop: 'auto', color: '#fca5a5' }} onClick={onLogout}>
          <LogOut size={20} /> Log Out
        </Link>
      </nav>
    </aside>
  );
}
