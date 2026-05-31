import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Resume/Cover Letter upload states
  const [uploadingResume, setUploadingResume] = useState(false);
  const [resumeName, setResumeName] = useState(user?.resumeName || '');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
      if (user.resumeName) {
        setResumeName(user.resumeName);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Endpoint expects name and phone for profile updates.
      // User can implement PUT /api/auth/profile in authController.js
      await api.put('/auth/profile', {
        name: formData.name,
        phone: formData.phone,
      });
      setSuccess('Profile updated successfully! Refresh the page to see changes in headers.');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to update profile details.');
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingResume(true);
    setError('');
    setSuccess('');

    try {
      const uploadData = new FormData();
      uploadData.append('resume', file);

      // User can implement POST /api/auth/resume in authController.js
      const { data } = await api.post('/auth/resume', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setResumeName(file.name);
      setSuccess('Resume uploaded successfully!');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to upload resume.');
    } finally {
      setUploadingResume(false);
    }
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>Manage your personal information and resume</p>
      </div>

      {success && (
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', marginBottom: '1.5rem', color: 'var(--success)', fontSize: '0.85rem' }}>
          {success}
        </div>
      )}

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', marginBottom: '1.5rem', color: 'var(--danger)', fontSize: '0.85rem' }}>
          {error}
        </div>
      )}

      <div className="grid-2" style={{ gridTemplateColumns: '1fr 2fr' }}>
        {/* Profile Card */}
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="profile-avatar" style={{ margin: '0 auto 1rem' }}>
            {formData.name ? formData.name.charAt(0).toUpperCase() : '?'}
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{formData.name || 'Candidate Name'}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{formData.email}</p>
          
          <div style={{ textAlign: 'left', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem' }}>Resume</h4>
            <div style={{ background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', padding: '1rem', textAlign: 'center' }}>
              {resumeName ? (
                <p style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.75rem' }}>
                  {resumeName}
                </p>
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>No resume uploaded yet (PDF only)</p>
              )}
              <input type="file" accept=".pdf" style={{ display: 'none' }} id="resume-upload" onChange={handleResumeUpload} />
              <label htmlFor="resume-upload" className="btn btn-primary btn-sm" style={{ cursor: 'pointer' }} disabled={uploadingResume}>
                {uploadingResume ? 'Uploading...' : 'Upload Resume'}
              </label>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Edit Profile</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" className="form-control" value={formData.email} disabled style={{ opacity: 0.6 }} />
              <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Email cannot be changed</small>
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} placeholder="+92 XXX XXXXXXX" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
