import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Stethoscope, Video, X } from 'lucide-react';

export default function Appointments() {
  const [showForm, setShowForm] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    time: '',
    reason: ''
  });
  const [statusMsg, setStatusMsg] = useState('');

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const fetchAppointments = async () => {
    try {
      const patientToken = localStorage.getItem('patientToken');
      const patientId = patientToken ? parseJwt(patientToken)?.id : null;
      if (!patientId) return;

      const response = await fetch(`http://localhost:5000/api/appointment/patient/${patientId}`, {
        headers: {
          'Authorization': `Bearer ${patientToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        console.error('Failed to fetch appointments');
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Fetch doctors when modal opens
  useEffect(() => {
    if (showForm) {
      const patientToken = localStorage.getItem('patientToken');
      fetch('http://localhost:5000/admin/getalldoctors', {
        headers: { 'Authorization': `Bearer ${patientToken}` }
      })
        .then(async res => {
          if (!res.ok) {
             throw new Error(`HTTP error! status: ${res.status}`);
          }
          const text = await res.text();
          try {
             return text ? JSON.parse(text) : [];
          } catch { // Ignore error for now, try to fix malformed array
             console.error("Raw response that failed JSON parse:", text);
             // Attempt to fix some common malformed JSON trailing issues if the backend is truncating/corrupting string
             // Try to find the valid array part in the text
             const validJsonMatch = text.match(/\[.*\]/s);
             if (validJsonMatch) {
                try {
                   return JSON.parse(validJsonMatch[0]);
                } catch {
                   console.error("Could not parse extracted array text either.");
                   return [];
                }
             }
             return [];
          }
        })
        .then(data => setDoctors(Array.isArray(data) ? data : []))
        .catch(err => console.error('Failed to load doctors', err));
    }
  }, [showForm]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    setStatusMsg('Booking...');
    try {
      const { doctorId, date, time, reason } = formData;
      const patientToken = localStorage.getItem('patientToken');
      const patientId = patientToken ? parseJwt(patientToken)?.id : null;

      if (!patientToken || !patientId) {
        setStatusMsg("Error: You are not logged in. No token found.");
        return;
      }

      const appointmentBody = {
        patientId: patientId,
        doctorId: doctorId,
        appointmentDate: date,
        appointmentTime: time,
        issue: reason,
        mode: 'ONLINE',
        status: 'PENDING'
      };

      const response = await fetch(`http://localhost:5000/api/appointment/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${patientToken}`
        },
        body: JSON.stringify(appointmentBody)
      });

      const result = await response.text();

      if (response.ok || result.includes("successfully")) {
        setStatusMsg(result);
        setTimeout(() => {
          setShowForm(false);
          setStatusMsg('');
          setFormData({ doctorId: '', date: '', time: '', reason: '' });
        }, 2000);
      } else {
        setStatusMsg(`Error: ${result}`);
      }
    } catch (err) {
      console.error(err);
      setStatusMsg("Error connecting to server. Ensure the backend is running.");
    }
  };

  return (
    <main className="patient-main animate-fade-in" style={{ position: 'relative' }}>
      <header className="patient-topbar" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="patient-greeting" style={{ fontSize: '1.5rem' }}>My Appointments</h1>
          <p className="text-muted">Manage your upcoming and past bookings.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(true)}>Book New Appointment</button>
      </header>

      <div className="patient-card">
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Upcoming</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {appointments.length === 0 ? (
            <p className="text-muted">No appointments found.</p>
          ) : (
            appointments.map((appt, idx) => (
              <div key={idx} className="patient-appointment-item" style={{ borderLeft: '4px solid var(--primary-color)' }}>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  <div className="patient-time-box" style={{ minWidth: '100px' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                      {appt.appointmentDate || 'N/A'}
                    </div>
                    <div style={{ fontWeight: '700', color: 'var(--primary-color)', fontSize: '1.1rem' }}>
                      {appt.appointmentTime || 'TBD'}
                    </div>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {appt.doctor ? `Dr. ${appt.doctor.name}` : 'Unknown Doctor'} 
                      <span className="patient-badge">{appt.status || 'Confirmed'}</span>
                    </h4>
                    <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Stethoscope size={16}/> Cardiology</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={16}/> Room 302, Main Wing</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                  <button style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white', cursor: 'pointer', fontWeight: '500' }}>Reschedule</button>
                  <button style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #fecaca', background: '#fef2f2', color: '#ef4444', cursor: 'pointer', fontWeight: '500' }}>Cancel</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Book Appointment Modal */}
      {showForm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)'
        }}>
          <div className="patient-card animate-fade-in" style={{ width: '100%', maxWidth: '500px', margin: '1rem', position: 'relative', background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <button onClick={() => setShowForm(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', cursor: 'pointer', background: 'none', border: 'none', color: 'var(--text-muted)' }}>
              <X size={24} />
            </button>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: '#0f172a' }}>Book New Appointment</h2>

            <form onSubmit={handleBookAppointment} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Doctor Dropdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#475569' }}>Select Doctor</label>
                <select
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleInputChange}
                  required
                  style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', background: 'white' }}
                >
                  <option value="">-- Choose a Doctor --</option>
                  {doctors.map(doc => (
                    <option key={doc.id} value={doc.id}>
                      Dr. {doc.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#475569' }}>Date</label>
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} required style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#475569' }}>Time</label>
                  <input type="time" name="time" value={formData.time} onChange={handleInputChange} required style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#475569' }}>Reason for Visit</label>
                <textarea name="reason" value={formData.reason} onChange={handleInputChange} required rows={3} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', resize: 'vertical', fontSize: '1rem' }} placeholder="Briefly describe your symptoms"></textarea>
              </div>

              {statusMsg && (
                <div style={{ padding: '0.75rem', borderRadius: '8px', background: statusMsg.includes('success') ? '#dcfce7' : '#fee2e2', color: statusMsg.includes('success') ? '#166534' : '#991b1b', fontSize: '0.9rem', textAlign: 'center', fontWeight: '500' }}>
                  {statusMsg}
                </div>
              )}

              <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', width: '100%', padding: '0.75rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
                <CalendarIcon size={20} /> Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
