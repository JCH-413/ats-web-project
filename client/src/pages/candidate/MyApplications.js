import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const MyApplications = () => {
  const [filterStatus, setFilterStatus] = useState('All');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await api.get('/applications/mine');
        setApplications(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Failed to load applications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const statuses = ['All', 'Submitted', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Rejected', 'Selected'];

  const filtered = filterStatus === 'All' 
    ? applications 
    : applications.filter(a => a.status === filterStatus);

  const getStatusBadge = (status) => {
    const map = {
      'Submitted': 'badge-submitted',
      'Under Review': 'badge-review',
      'Shortlisted': 'badge-shortlisted',
      'Interview Scheduled': 'badge-interview',
      'Rejected': 'badge-rejected',
      'Selected': 'badge-selected',
    };
    return map[status] || 'badge-submitted';
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>My Applications</h1>
        <p>Track the status of all your job applications</p>
      </div>

      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {statuses.map(s => (
          <button
            key={s}
            className={`btn btn-sm ${filterStatus === s ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterStatus(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
          <p>Loading your applications...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--danger)' }}>
          <p>{error}</p>
        </div>
      ) : (
        <div className="table-container">
          {filtered.length === 0 ? (
            <div className="empty-state" style={{ padding: '3rem 1rem' }}>
              <h3>No applications found</h3>
              <p>{filterStatus === 'All' ? 'You have not applied for any jobs yet.' : `No applications found with status "${filterStatus}".`}</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Branch</th>
                  <th>Status</th>
                  <th>Applied Date</th>
                  <th>Resume</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app) => {
                  const positionTitle = app.jobId?.title || 'Unknown Role';
                  const department = app.jobId?.department || 'N/A';
                  const branchName = app.jobId?.branch?.name || app.jobId?.branch || 'Remote';
                  const dateString = app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A';

                  return (
                    <tr key={app._id || app.id}>
                      <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{positionTitle}</td>
                      <td>{department}</td>
                      <td><span className="job-meta-item">{branchName}</span></td>
                      <td><span className={`badge ${getStatusBadge(app.status)}`}>{app.status}</span></td>
                      <td>{dateString}</td>
                      <td>
                        {app.resumeURL ? (
                          <a href={app.resumeURL} className="btn btn-secondary btn-sm" target="_blank" rel="noreferrer">
                            View
                          </a>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>None</span>
                        )}
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

export default MyApplications;

