import React, { useState } from 'react';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: 'Ahmed Khan',
    email: 'ahmed@example.com',
    phone: '+92 300 1234567',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend API
    alert('Profile update functionality will be connected to the backend API');
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>👤 My Profile</h1>
        <p>Manage your personal information and resume</p>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: '1fr 2fr' }}>
        {/* Profile Card */}
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="profile-avatar" style={{ margin: '0 auto 1rem' }}>
            {formData.name.charAt(0)}
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{formData.name}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{formData.email}</p>
          
          <div style={{ textAlign: 'left', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem' }}>📎 Resume</h4>
            <div style={{ background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', padding: '1rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>Upload your resume (PDF only)</p>
              <input type="file" accept=".pdf" style={{ display: 'none' }} id="resume-upload" />
              <label htmlFor="resume-upload" className="btn btn-primary btn-sm" style={{ cursor: 'pointer' }}>
                📤 Upload Resume
              </label>
            </div>

            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '1.25rem', marginBottom: '1rem' }}>📝 Cover Letter</h4>
            <div style={{ background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', padding: '1rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>Upload cover letter (PDF/DOCX)</p>
              <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} id="cover-upload" />
              <label htmlFor="cover-upload" className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
                📤 Upload Cover Letter
              </label>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>✏️ Edit Profile</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} disabled style={{ opacity: 0.6 }} />
              <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Email cannot be changed</small>
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} placeholder="+92 XXX XXXXXXX" />
            </div>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
