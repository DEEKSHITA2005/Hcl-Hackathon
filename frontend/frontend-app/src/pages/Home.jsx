import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Shield, Clock, ArrowRight } from 'lucide-react';

export default function Home() {
    const navigate = useNavigate();

  return (
    <div className="page-container animate-fade-in">
      
      {/* Navigation Bar */}
      <nav className="glass-panel home-nav">
        <div className="logo">
          <div className="logo-icon">
            <Calendar size={24} />
          </div>
          <h1 className="logo-text">HealthSync</h1>
        </div>
        <div className="nav-links">
          {/* Using / (root) since you set Login to be the root route in App.jsx */}
          <Link to="/login" className="nav-link-raw">Log In</Link>
          <button className="btn-primary" onClick={() => navigate("/signup")}>Register as Patient</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="hero-section">
        <div>
          <h2 className="hero-title">
            Your Health,<br/>
            <span className="highlight-text">Scheduled Simply.</span>
          </h2>
          <p className="hero-description">
            Book, manage, and track your healthcare appointments with top specialists using our secure and intuitive platform.
          </p>
          <button className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', padding: '16px 32px' }}>
            Book New Appointment <ArrowRight size={20} />
          </button>
        </div>

        {/* Feature Cards Grid */}
        <div className="feature-grid">
          <div className="glass-panel feature-card">
            <div className="feature-icon feature-icon-blue">
              <Clock size={28} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>24/7 Booking</h3>
              <p className="text-muted">Schedule appointments at your convenience, day or night, without waiting on hold.</p>
            </div>
          </div>

          <div className="glass-panel feature-card">
            <div className="feature-icon feature-icon-green">
              <Shield size={28} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>HIPAA Compliant</h3>
              <p className="text-muted">Your medical data is encrypted and strictly protected under healthcare regulations.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
