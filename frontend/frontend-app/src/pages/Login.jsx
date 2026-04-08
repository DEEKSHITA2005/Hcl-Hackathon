import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Stethoscope, AlertCircle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  
  // State to track which role the user selects
  const [role, setRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (role === 'patient') {
      try {
        setLoading(true);
        // POST request to backend with query parameters
        const url = `http://localhost:5000/patient/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (response.ok) {
          const token = await response.text();
          
          // Store token in localStorage
          localStorage.setItem('patientToken', token.trim());
          localStorage.setItem('userRole', 'patient');
          localStorage.setItem('userEmail', email);
          
          // Redirect to patient dashboard
          navigate('/patient');
        } else {
          setError('Invalid email or password. Please try again.');
        }
      } catch (err) {
        console.error("Login error:", err);
        setError('Network error. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    } else if (role === 'admin') {
      try{
        setLoading(true);
        const url = `http://localhost:5000/admin/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
          }
        });

        if(response.ok){
          const token = await response.text();
          localStorage.setItem('adminToken',token.trim());
          localStorage.setItem('userRole','admin');
          localStorage.setItem('userEmail',email);

          navigate('/admin');
        }
        else{
          setError('Invalid email or password. Please try again.');
        }
      } catch(err){
        console.error("Login error:",err);
        setError("Network Error. Please check your connection and try again.");
      }
      finally{
        setLoading(false);
      }
    }
    else if(role == 'doctor'){
      // For doctor and admin, direct navigation based on dropdown for now
      try{
        setLoading(true);
        const url = `http://localhost:5000/doctor/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
          }
        });

        if(response.ok){
          const token = await response.text();
          localStorage.setItem('doctorToken',token.trim());
          localStorage.setItem('userRole','doctor');
          localStorage.setItem('userEmail',email);

          navigate('/doctor');
        }
        else{
          setError('Invalid email or password. Please try again.');
        }
      } catch(err){
        console.error("Login error:",err);
        setError("Network Error. Please check your connection and try again.");
      }
      finally{
        setLoading(false);
      }
      
    }
  };

  return (
    <div className="page-container center-content">
      <Link to="/" className="back-link">
        <ArrowLeft size={20} /> Back to Home
      </Link>

      <div className="glass-panel auth-card animate-fade-in">
        <div className="text-center" style={{ marginBottom: '2rem' }}>
          <div className="icon-circle icon-blue">
            <Stethoscope size={30} />
          </div>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="text-muted">Log in to your account</p>
        </div>

        {error && (
          <div className="alert-error" style={{ marginBottom: '1.5rem', padding: '0.75rem', borderRadius: '8px', backgroundColor: '#fee2e2', color: '#b91c1c', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          
          {/* Role Selection Dropdown */}
          <div className="form-group">
            <label className="form-label">I am a...</label>
            <select 
              className="form-input" 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              style={{ background: 'white', cursor: 'pointer' }}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              placeholder="patient@example.com" 
              className="form-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="form-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>
          </div>

          <button type="submit" className="btn-primary btn-full" disabled={loading} style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-muted" style={{ marginTop: '2rem' }}>
          Don't have an account? <Link to="/signup" className="link-text">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
