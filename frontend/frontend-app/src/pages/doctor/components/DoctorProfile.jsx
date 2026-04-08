import React, { useEffect,useState } from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';

export default function DoctorProfile() {
  const userEmail = localStorage.getItem('userEmail');
  const [profile,setProfile] = useState({})
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)
  const doctorToken = localStorage.getItem('doctorToken')

  const updateProfile = () =>{
    const doctorToken = localStorage.getItem('doctorToken');
    fetch('http://localhost:5001/doctor/updateprofile',{
      method: 'PUT',
      headers:{
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${doctorToken}`
      },
      body: JSON.stringify(profile)
    })
    .then(res => {
      if (res.ok) {
        alert("Profile updated successfully!");
        return res.json().catch(() => profile); // Default back to current profile if no JSON return
      } else {
        throw new Error("Failed to update profile");
      }
    })
    .then(data => {
      if (data && data.id) setProfile(data);
      setLoading(false);
    })
    .catch(err => {
      setError(err)
      setLoading(false)
    })
  }
  const fetchProfile = () => {
    fetch('http://localhost:5000/doctor/profile',{
      method: 'GET',
      headers:{
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${doctorToken}`
      }

    })
    .then(res => res.json())  
    .then(data => {
      setProfile(data)
      //console.log(data);
      setLoading(false)
    })
    .catch(err => {
      setError(err)
      setLoading(false)
    })

  }
  useEffect(() => {
    fetchProfile()
  },[])


  return (
    <main className="patient-main animate-fade-in">
      <header className="patient-topbar" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="patient-greeting" style={{ fontSize: '1.5rem' }}>My Profile</h1>
          <p className="text-muted">Manage your personal and contact information.</p>
        </div>
        <button className="btn-primary" onClick={updateProfile}>Save Changes</button>
      </header>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Profile Card Sidebar */}
        
        <div className="patient-card" style={{ width: '300px', height: 'fit-content', textAlign: 'center' }}>
          <div className="patient-avatar" style={{ width: '100px', height: '100px', fontSize: '2.5rem', margin: '0 auto 1.5rem' }}>
            {profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{profile?.name || 'Loading...'}</h2>
          <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Patient ID: #{profile?.id || '---'}</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
              <Mail size={18} /> <span>{profile?.email || userEmail}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
              <Phone size={18} /> <span>{profile?.phno || 'Not provided'}</span>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        {loading ? (
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading profile data...</div>
        ) : (
          <div className="patient-card" style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Personal Information</h3>
            
            <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Full Name</label>
                <input 
                  type="text" 
                  value={profile?.name || ''} 
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Email</label>
                <input 
                  type="email" 
                  value={profile?.email || userEmail || ''} 
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Age</label>
                <input 
                  type="number" 
                  value={profile?.age || ''} 
                  onChange={(e) => setProfile({...profile, age: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Gender</label>
                <select 
                  value={profile?.gender || 'Male'} 
                  onChange={(e) => setProfile({...profile, gender: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', background: 'white' }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Phone / Contact Information</label>
                <input 
                  type="text" 
                  value={profile?.phno || ''} 
                  onChange={(e) => setProfile({...profile, phno: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }} 
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
