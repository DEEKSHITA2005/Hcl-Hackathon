import React from 'react';
import { Bell, Lock, Shield } from 'lucide-react';

export default function Settings() {
  return (
    <main className="patient-main animate-fade-in">
      <header className="patient-topbar" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="patient-greeting" style={{ fontSize: '1.5rem' }}>Settings</h1>
          <p className="text-muted">Manage your account preferences and security.</p>
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px' }}>
        
        {/* Notifications */}
        <div className="patient-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Bell className="text-muted" size={24} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Notification Preferences</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
              <div>
                <p style={{ fontWeight: '500' }}>Appointment Reminders</p>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>Receive SMS and Email reminders 24h before.</p>
              </div>
              <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', accentColor: 'var(--primary-color)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: '500' }}>Test Results</p>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>Get notified when your lab results are ready.</p>
              </div>
              <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', accentColor: 'var(--primary-color)' }} />
            </div>
          </div>
        </div>

        {/* Security / Password */}
        <div className="patient-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Lock className="text-muted" size={24} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Security</h2>
          </div>
          
          <form style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', maxWidth: '400px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Current Password</label>
              <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>New Password</label>
              <input type="password" placeholder="New Password" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }} />
            </div>
            <button type="button" className="btn-primary" style={{ marginTop: '0.5rem', width: 'fit-content' }}>Update Password</button>
          </form>
        </div>

      </div>
    </main>
  );
}
