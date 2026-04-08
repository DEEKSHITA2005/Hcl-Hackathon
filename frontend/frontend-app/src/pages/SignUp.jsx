import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus } from 'lucide-react';


export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phno: "",
    age: "",
    gender: "Male",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const backendUrl = "http://localhost:5000";
    fetch(`${backendUrl}/patient/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        phno: form.phno,
        age: Number(form.age),
        gender: form.gender,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Registration failed");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Registration successful:", data);
        alert("Registration successful! You can now login.");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Registration error:", err);
        setError("Registration failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="page-container center-content">
      
      <Link to="/" className="back-link">
        <ArrowLeft size={20} /> Back to Login
      </Link>

      <div className="glass-panel auth-card signup-card animate-fade-in">
        <div className="text-center" style={{ marginBottom: '2rem' }}>
          <div className="icon-circle icon-green">
            <UserPlus size={30} />
          </div>
          <h2 className="auth-title">Create Account</h2>
          <p className="text-muted">Join HealthSync to schedule appointments</p>
        </div>


        <form onSubmit={handleRegister}>
          <div className="form-row">
            <div className="form-col">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="form-input"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="patient@example.com"
              className="form-input"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a strong password"
              className="form-input"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              id="phno"
              placeholder="Enter your phone number"
              className="form-input"
              value={form.phno}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Age</label>
            <input
              type="number"
              id="age"
              placeholder="Enter your age"
              className="form-input"
              value={form.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Gender</label>
            <select
              className="form-input"
              id="gender"
              value={form.gender}
              onChange={handleChange}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {error && (
            <div className="form-error" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>
          )}

          <button type="submit" className="btn-primary btn-full" disabled={loading}>
            {loading ? "Registering..." : "Register as Patient"}
          </button>
        </form>

        <p className="text-center text-muted" style={{ marginTop: '2rem' }}>
          Already have an account? <Link to="/" className="link-text">Log in here</Link>
        </p>
      </div>
    </div>
  );
}
