import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ManageApplicants = () => {
  const [filterStatus, setFilterStatus] = useState('All');
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchApplicants = async () => {
    try {
      const { data } = await api.get('/applications');
      setApplicants(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching applicants:', err);
      setError('Failed to fetch applicant postings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const statuses = ['All', 'Submitted', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Rejected', 'Selected'];
  
  const filtered = filterStatus === 'All' 
    ? applicants 
    : applicants.filter(a => a.status === filterStatus);

  const getStatusBadge = (status) => {
    const map = {
      'Submitted': 'badge-submitted', 'Under Review': 'badge-review', 'Shortlisted': 'badge-shortlisted',
      'Interview Scheduled': 'badge-interview', 'Rejected': 'badge-rejected', 'Selected': 'badge-selected',
    };
    return map[status] || 'badge-submitted';
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/applications/${id}/status`, { status: newStatus });
      // Update local state instead of doing full reload
      setApplicants(prev => prev.map(a => a._id === id ? { ...a, status: newStatus } : a));
    } catch (err) {
      console.error('Error changing applicant status:', err);
      alert(err.response?.data?.message || 'Failed to update candidate status.');
    }
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>👥 Manage Applicants</h1>
        <p>Review, shortlist, and manage all candidate applications</p>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', marginBottom: '1.5rem', color: 'var(--danger)', fontSize: '0.85rem' }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {statuses.map(s => (
          <button key={s} className={`btn btn-sm ${filterStatus === s ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilterStatus(s)}>
            {s} {s !== 'All' && `(${applicants.filter(a => a.status === s).length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
          <p>Loading candidate applicants...</p>
        </div>
      ) : (
        <div className="table-container">
          <div className="table-header">
            <h3>Applications ({filtered.length})</h3>
          </div>
          {filtered.length === 0 ? (
            <div className="empty-state" style={{ padding: '3rem 1rem' }}>
              <h3>No candidates found</h3>
              <p>{filterStatus === 'All' ? 'No applications have been submitted yet.' : `No candidates found with status "${filterStatus}".`}</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Position</th>
                  <th>Branch</th>
                  <th>Status</th>
                  <th>Applied</th>
                  <th>Resume</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app) => {
                  const candidateName = app.userId?.name || 'Anonymous';
                  const candidateEmail = app.userId?.email || 'N/A';
                  const positionTitle = app.jobId?.title || 'Unknown Role';
                  const branchName = app.jobId?.branch?.name || app.jobId?.branch || 'Remote';
                  const dateString = app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A';

                  return (
                    <tr key={app._id || app.id}>
                      <td>
                        <div>
                          <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{candidateName}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{candidateEmail}</div>
                        </div>
                      </td>
                      <td>{positionTitle}</td>
                      <td><span className="job-meta-item">📍 {branchName}</span></td>
                      <td><span className={`badge ${getStatusBadge(app.status)}`}>{app.status}</span></td>
                      <td>{dateString}</td>
                      <td>
                        {app.resumeURL ? (
                          <a href={app.resumeURL} className="btn btn-secondary btn-sm" target="_blank" rel="noreferrer">
                            📎 View
                          </a>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>None</span>
                        )}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn btn-success btn-sm" onClick={() => handleStatusChange(app._id || app.id, 'Shortlisted')} title="Shortlist">✓</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleStatusChange(app._id || app.id, 'Rejected')} title="Reject">✕</button>
                          <button className="btn btn-secondary btn-sm" onClick={() => handleStatusChange(app._id || app.id, 'Interview Scheduled')} title="Schedule Interview">📅</button>
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

export default ManageApplicants;
