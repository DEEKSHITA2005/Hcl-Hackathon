import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ShieldCheck, Activity } from 'lucide-react';

export default function AdminMain() {
  return (
    <main className="doc-main">
      <header className="doc-topbar">
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-main)' }}>Admin Dashboard</h1>
          <p className="text-muted">System Overview and Management.</p>
        </div>
        <div className="icon-circle icon-green" style={{ width: '45px', height: '45px', margin: 0, fontWeight: 'bold' }}>AD</div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="doc-stat-card">
          <div className="icon-circle icon-blue" style={{ margin: '0', width: '50px', height: '50px' }}><Users size={24} /></div>
          <div>
            <p className="text-muted" style={{ fontSize: '0.9rem', fontWeight: '600' }}>Total Accounts</p>
            <h3 style={{ fontSize: '1.5rem' }}>450</h3>
          </div>
        </div>
        <div className="doc-stat-card">
          <div className="icon-circle icon-green" style={{ margin: '0', width: '50px', height: '50px' }}><Activity size={24} /></div>
          <div>
            <p className="text-muted" style={{ fontSize: '0.9rem', fontWeight: '600' }}>Active Sessions</p>
            <h3 style={{ fontSize: '1.5rem' }}>24</h3>
          </div>
        </div>
        <div className="doc-stat-card">
          <div className="icon-circle icon-green" style={{ margin: '0', width: '50px', height: '50px' }}><ShieldCheck size={24} /></div>
          <div>
            <p className="text-muted" style={{ fontSize: '0.9rem', fontWeight: '600' }}>System Status</p>
            <h3 style={{ fontSize: '1.5rem' }}>Secure</h3>
          </div>
        </div>
      </div>

      <div className="doc-schedule-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Recent Activity</h2>
          <Link to="/admin" className="link-text">View All</Link>
        </div>
        
        <div>
          <div className="doc-patient-row" style={{ borderLeft: '4px solid var(--primary-color)', paddingLeft: '1rem' }}>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <div style={{ minWidth: '80px' }}>
                <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text-main)' }}>10:30 AM</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Today</div>
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem' }}>New Doctor Account Created</h4>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>Dr. Sarah Jenkins was added to the system.</p>
              </div>
            </div>
            <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Review logs</button>
          </div>
        </div>
      </div>
    </main>
  );
}
