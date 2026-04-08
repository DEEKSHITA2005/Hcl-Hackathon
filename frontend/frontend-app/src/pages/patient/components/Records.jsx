import React from 'react';
import { FileText, Download, Activity, Eye } from 'lucide-react';

export default function Records() {
  return (
    <main className="patient-main animate-fade-in">
      <header className="patient-topbar" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="patient-greeting" style={{ fontSize: '1.5rem' }}>Medical Records</h1>
          <p className="text-muted">Access your lab results, prescriptions, and visit summaries securely.</p>
        </div>
      </header>

      <div className="patient-card">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '1rem' }}>
          
          {/* Record Item 1 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', border: '1px solid var(--border-color)', borderRadius: '10px', background: '#f8fafc' }}>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <div className="icon-circle icon-blue" style={{ width: '45px', height: '45px', margin: 0 }}>
                <Activity size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>Complete Blood Count (CBC)</h4>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>Ordered by Dr. Jenkins • Oct 10, 2023</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span className="patient-badge" style={{ background: '#dcfce7', color: '#166534' }}>Normal</span>
              <button style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: '500' }}>
                <Eye size={18} /> View
              </button>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <Download size={20} />
              </button>
            </div>
          </div>

          {/* Record Item 2 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', border: '1px solid var(--border-color)', borderRadius: '10px', background: '#f8fafc' }}>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <div className="icon-circle icon-green" style={{ width: '45px', height: '45px', margin: 0 }}>
                <FileText size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>Visit Summary</h4>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>General Checkup • Sep 05, 2023</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: '500' }}>
                <Eye size={18} /> View
              </button>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <Download size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
