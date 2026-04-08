import React from 'react';
import { Settings, Save } from 'lucide-react';

export default function AdminSettings() {
  return (
    <main className="doc-main">
      <header className="doc-topbar">
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-main)' }}>System Settings</h1>
          <p className="text-muted">Manage global application configurations</p>
        </div>
      </header>

      <div className="doc-schedule-card">
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Security Policies</h2>
        
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Session Timeout (minutes)</label>
            <input 
              type="number" 
              defaultValue="30"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-main)',
                color: 'var(--text-main)'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Require Two-Factor Authentication</label>
            <select
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-main)',
                color: 'var(--text-main)'
              }}
            >
              <option>All Users</option>
              <option>Doctors and Admins Only</option>
              <option>Optional</option>
            </select>
          </div>
          
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', width: '200px' }}>
            <Save size={18} /> Save Settings
          </button>
        </div>
      </div>
    </main>
  );
}
