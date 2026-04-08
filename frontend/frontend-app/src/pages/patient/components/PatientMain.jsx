import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Stethoscope } from 'lucide-react';

export default function PatientMain() {
  const userEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();
  return (
    <main className="patient-main">
      <header className="patient-topbar">
        <div>
          <h1 className="patient-greeting">Good morning, {userEmail.split('@')[0]}!</h1>
          <p className="text-muted">Here is your healthcare overview for today.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* <button className="btn-primary" onClick={() => navigate('/patient/appointments')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> Book Appointment
          </button> */}
          <div className="patient-avatar">JD</div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        
        <div className="patient-card">
          <div className="patient-card-header">
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Upcoming Appointments</h2>
            <Link to="/patient" className="link-text">View All</Link>
          </div>
          
          <div>
            <div className="patient-appointment-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div className="patient-time-box">
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>OCT 24</div>
                  <div style={{ fontWeight: '700', color: 'var(--primary-color)', fontSize: '1.1rem' }}>10:00 AM</div>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Dr. Sarah Jenkins</h4>
                  <p className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem' }}>
                    <Stethoscope size={16} /> Cardiology Specialist
                  </p>
                </div>
              </div>
              <span className="patient-badge">Upcoming</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="patient-card" style={{ marginBottom: '0' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Recent Tests</h2>
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Complete Blood Count</p>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>Taken on Oct 10, 2023</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
