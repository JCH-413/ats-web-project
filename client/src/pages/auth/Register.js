import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'candidate',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setError('');
    // TODO: Connect to backend API
    alert('Registration functionality will be connected to the backend API');
  };

  return (
    <div className="auth-container fade-in">
      <div className="auth-card">
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800, color: 'white', margin: '0 auto 1rem' }}>ON</div>
        </div>
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join OpsNex to start your career journey</p>

        {error && (
          <div style={{ background: 'rgba(225, 112, 85, 0.1)', border: '1px solid var(--danger)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', marginBottom: '1rem', color: 'var(--danger)', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" className="form-control" placeholder="John Doe" value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" className="form-control" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select name="role" className="form-control" value={formData.role} onChange={handleChange}>
              <option value="candidate">Candidate</option>
              <option value="hr">HR / Recruiter</option>
            </select>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="form-control" placeholder="At least 6 characters" value={formData.password} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" className="form-control" placeholder="Repeat your password" value={formData.confirmPassword} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary btn-lg">Create Account</button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
