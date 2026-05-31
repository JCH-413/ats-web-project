import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ManageInterviews = () => {
  const [showForm, setShowForm] = useState(false);
  const [interviews, setInterviews] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    applicationId: '', date: '', time: '', message: '',
  });

  const fetchInterviewsAndApplicants = async () => {
    try {
      const [interviewsRes, applicationsRes] = await Promise.allSettled([
        api.get('/interviews'),
        api.get('/applications')
      ]);

      if (interviewsRes.status === 'fulfilled') {
        setInterviews(Array.isArray(interviewsRes.value.data) ? interviewsRes.value.data : []);
      }
      if (applicationsRes.status === 'fulfilled' && Array.isArray(applicationsRes.value.data)) {
        const candidates = applicationsRes.value.data.filter(a => a.status !== 'Rejected');
        setApplications(candidates);
        if (candidates.length > 0 && !formData.applicationId) {
          setFormData(prev => ({ ...prev, applicationId: candidates[0]._id }));
        }
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch interview details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviewsAndApplicants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.applicationId && applications.length > 0) {
      formData.applicationId = applications[0]._id;
    }

    setSaving(true);
    setError('');

    try {
      await api.post('/interviews', formData);
      setShowForm(false);
      setFormData({ applicationId: applications[0]?._id || '', date: '', time: '', message: '' });
      fetchInterviewsAndApplicants();
    } catch (err) {
      console.error('Error scheduling interview:', err);
      setError(err.response?.data?.message || 'Failed to schedule interview. Please check your backend routes.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this scheduled interview?')) {
      return;
    }
    
    try {
      await api.delete(`/interviews/${id}`);
      setInterviews(interviews.filter(i => i._id !== id));
    } catch (err) {
      console.error('Error deleting interview:', err);
      alert('Failed to cancel the interview.');
    }
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <h1>📅 Manage Interviews</h1>
          <p>Schedule and track candidate interviews</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '➕ Schedule Interview'}
        </button>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', marginBottom: '1.5rem', color: 'var(--danger)', fontSize: '0.85rem' }}>
          {error}
        </div>
      )}

      {showForm && (
        <div className="card slide-up" style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Schedule New Interview</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label>Candidate & Position</label>
                <select name="applicationId" className="form-control" value={formData.applicationId} onChange={handleChange} required>
                  {applications.map(app => (
                    <option key={app._id} value={app._id}>
                      {app.userId?.name || 'Anonymous'} — {app.jobId?.title || 'Unknown Role'}
                    </option>
                  ))}
                  {applications.length === 0 && (
                    <option value="">-- No eligible candidates found --</option>
                  )}
                </select>
              </div>
              <div className="form-group">
                <label>Interview Date</label>
                <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Interview Time</label>
                <input type="time" name="time" className="form-control" value={formData.time} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Message to Candidate</label>
              <textarea name="message" className="form-control" rows="3" placeholder="Add any instructions or details for the interview..." value={formData.message} onChange={handleChange} style={{ resize: 'vertical' }}></textarea>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-success" disabled={saving}>
                {saving ? 'Scheduling...' : '✓ Schedule & Notify'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
          <p>Loading scheduled interviews...</p>
        </div>
      ) : (
        <div className="table-container">
          <div className="table-header">
            <h3>All Interviews</h3>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{interviews.length} total</span>
          </div>
          {interviews.length === 0 ? (
            <div className="empty-state" style={{ padding: '3rem 1rem' }}>
              <h3>No interviews scheduled</h3>
              <p>Schedule a new session using the candidate selector.</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Position</th>
                  <th>Branch</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {interviews.map((interview) => {
                  const candidateName = interview.applicationId?.userId?.name || 'Anonymous';
                  const positionTitle = interview.applicationId?.jobId?.title || 'Unknown Role';
                  const branchName = interview.applicationId?.jobId?.branch?.name || interview.applicationId?.jobId?.branch || 'Remote';
                  
                  return (
                    <tr key={interview._id || interview.id}>
                      <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{candidateName}</td>
                      <td>{positionTitle}</td>
                      <td><span className="job-meta-item">📍 {branchName}</span></td>
                      <td>{interview.date}</td>
                      <td>{interview.time}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(interview._id || interview.id)}>Cancel</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageInterviews;
