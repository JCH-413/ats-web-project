import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ManageJobs = () => {
  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '', department: '', branch: '', seats: 1, type: 'Full-time', description: '',
  });

  const fetchJobsAndBranches = async () => {
    try {
      const [jobsRes, branchesRes] = await Promise.allSettled([
        api.get('/jobs'),
        api.get('/branches')
      ]);

      if (jobsRes.status === 'fulfilled') {
        setJobs(Array.isArray(jobsRes.value.data) ? jobsRes.value.data : []);
      }
      
      if (branchesRes.status === 'fulfilled' && Array.isArray(branchesRes.value.data)) {
        setBranches(branchesRes.value.data);
        if (branchesRes.value.data.length > 0 && !formData.branch) {
          setFormData(prev => ({ ...prev, branch: branchesRes.value.data[0]._id || branchesRes.value.data[0] }));
        }
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobsAndBranches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.branch && branches.length > 0) {
      formData.branch = branches[0]._id || branches[0];
    }
    
    setSaving(true);
    setError('');

    try {
      await api.post('/jobs', formData);
      setShowForm(false);
      setFormData({
        title: '', department: '', branch: branches[0]?._id || '', seats: 1, type: 'Full-time', description: '',
      });
      // Refetch
      fetchJobsAndBranches();
    } catch (err) {
      console.error('Error publishing job:', err);
      setError(err.response?.data?.message || 'Failed to publish new job. Please verify your backend API is running.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job posting? This will remove all applications associated with it.')) {
      return;
    }
    
    try {
      await api.delete(`/jobs/${jobId}`);
      setJobs(jobs.filter(j => j._id !== jobId));
    } catch (err) {
      console.error('Error deleting job:', err);
      alert('Failed to delete the job. Please verify your backend API handles DELETE /api/jobs/:id');
    }
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <h1>Manage Jobs</h1>
          <p>Create, edit, and manage job postings across branches</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Post New Job'}
        </button>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', marginBottom: '1.5rem', color: 'var(--danger)', fontSize: '0.85rem' }}>
          {error}
        </div>
      )}

      {showForm && (
        <div className="card slide-up" style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Create New Job Posting</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label>Job Title</label>
                <input type="text" name="title" className="form-control" placeholder="e.g., Senior React Developer" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input type="text" name="department" className="form-control" placeholder="e.g., Engineering" value={formData.department} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Branch</label>
                <select name="branch" className="form-control" value={formData.branch} onChange={handleChange} required>
                  {branches.map(b => (
                    <option key={b._id || b} value={b._id || b}>{b.name || b}</option>
                  ))}
                  {branches.length === 0 && (
                    <option value="">-- No branches found in DB --</option>
                  )}
                </select>
                {branches.length === 0 && (
                  <small style={{ color: 'var(--text-muted)' }}>* Note: You will need branch records in the database to link them.</small>
                )}
              </div>
              <div className="form-group">
                <label>Available Seats</label>
                <input type="number" name="seats" className="form-control" min="1" value={formData.seats} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Job Type</label>
                <select name="type" className="form-control" value={formData.type} onChange={handleChange}>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Job Description</label>
              <textarea name="description" className="form-control" rows="4" placeholder="Describe the role, responsibilities, and qualifications..." value={formData.description} onChange={handleChange} style={{ resize: 'vertical' }} required></textarea>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-success" disabled={saving}>
                {saving ? 'Publishing...' : '✓ Publish Job'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
          <p>Loading active job posts...</p>
        </div>
      ) : (
        <div className="table-container">
          <div className="table-header">
            <h3>Active Job Postings</h3>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{jobs.length} total</span>
          </div>
          {jobs.length === 0 ? (
            <div className="empty-state" style={{ padding: '3rem 1rem' }}>
              <h3>No jobs published yet</h3>
              <p>Click "+ Post New Job" to create your first active posting.</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Department</th>
                  <th>Branch</th>
                  <th>Type</th>
                  <th>Seats</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id || job.id}>
                    <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{job.title}</td>
                    <td>{job.department}</td>
                    <td><span className="job-meta-item">📍 {job.branch?.name || job.branch || 'Remote'}</span></td>
                    <td>{job.type || 'Full-time'}</td>
                    <td>{job.seats || 1}</td>
                    <td>
                      <span className={`badge ${job.isOpen !== false ? 'badge-shortlisted' : 'badge-rejected'}`}>
                        {job.isOpen !== false ? 'Open' : 'Closed'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(job._id || job.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
