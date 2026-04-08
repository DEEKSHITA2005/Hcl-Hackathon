import React, { useState, useEffect } from 'react';
import { Search, MoreVertical, X, UserPlus } from 'lucide-react';

export default function Manage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    experience: '',
    mode: 'ONLINE',
    specialization: '',
    email: '',
    phno: '',
    password: ''
  });

  const fetchDoctors = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const res = await fetch("http://localhost:5000/admin/getalldoctors", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${adminToken}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setDoctors(data);
      } else {
        console.error("Failed to fetch doctors");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        specialization: formData.specialization,
        email: formData.email,
        experience: parseInt(formData.experience, 10) || 0,
        mode: formData.mode,
        phno: formData.phno,
        password: formData.password
      };

      const adminToken = localStorage.getItem('adminToken');
      
      const res = await fetch("http://localhost:5000/admin/doctor/add", {
        method: 'POST',
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${adminToken}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Doctor added successfully!");
        setFormData({ name: '', experience: '', mode: 'ONLINE', specialization: '', email: '', phno: '', password: '' });
        setIsModalOpen(false);
        fetchDoctors();
      } else {
        alert("Failed to add doctor. Please try again.");
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("An error occurred. Make sure the backend server is running.");
    }
  };

  return (
    <main className="doc-main" style={{ position: 'relative' }}>
      <header className="doc-topbar">
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-main)' }}>Manage Users</h1>
          <p className="text-muted">View, edit, or add new Doctors and Patients.</p>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search by name, ID, or role..." 
            style={{
              width: '100%',
              padding: '1rem 1rem 1rem 3rem',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-main)',
              color: 'var(--text-main)'
            }}
          />
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)} style={{ padding: '0 1.5rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <UserPlus size={18} /> Add New Doctor
        </button>
      </div>

      <div className="doc-schedule-card">
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>User Directory</h2>
        
        <div>
          {doctors.length > 0 ? (
            doctors.map((doc, index) => (
              <div key={doc.id || doc.doctorId || index} className="doc-patient-row" style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)', marginBottom: '0' }}>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                  <div className="icon-circle icon-blue" style={{ width: '45px', height: '45px', margin: 0, fontWeight: 'bold' }}>
                    {doc.name ? doc.name.substring(0, 2).toUpperCase() : 'DR'}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem' }}>{doc.name ? (doc.name.startsWith('Dr.') ? doc.name : `Dr. ${doc.name}`) : 'Unknown Doctor'}</h4>
                    <p className="text-muted" style={{ fontSize: '0.9rem' }}>{doc.specialized || 'General'} • ID: #{doc.id || doc.doctorId || 'N/A'}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ padding: '4px 12px', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>Doctor</span>
                  <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><MoreVertical size={20} /></button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">No doctors found.</p>
          )}
        </div>
      </div>

      {/* Add New Doctor Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-main)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '600px',
            padding: '2rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>Register New Doctor</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Full Name *</label>
                  <input required name="name" value={formData.name} onChange={handleChange} type="text" maxLength="50" placeholder="Dr. Jane Smith" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-light)', color: 'var(--text-main)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Specialization *</label>
                  <input required name="specialization" value={formData.specialization} onChange={handleChange} type="text" maxLength="50" placeholder="e.g. Cardiology" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-light)', color: 'var(--text-main)' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Experience (Years) *</label>
                  <input required name="experience" value={formData.experience} onChange={handleChange} type="number" min="0" max="60" placeholder="5" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-light)', color: 'var(--text-main)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Mode *</label>
                  <select required name="mode" value={formData.mode} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-light)', color: 'var(--text-main)' }}>
                    <option value="ONLINE">Online</option>
                    <option value="OFFLINE">Offline</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Email Address *</label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" maxLength="50" placeholder="doctor@hospital.com" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-light)', color: 'var(--text-main)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Phone Number *</label>
                  <input required name="phno" value={formData.phno} onChange={handleChange} type="tel" maxLength="20" placeholder="+1 (555) 000-0000" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-light)', color: 'var(--text-main)' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Password *</label>
                <input required name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Create a strong password" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-light)', color: 'var(--text-main)' }} />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '0.75rem', fontWeight: '600' }}>Save Doctor</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
