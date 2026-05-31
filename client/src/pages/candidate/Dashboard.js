import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const CandidateDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await api.get('/applications/mine');
        setApplications(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching candidate applications:', err);
        setError('Failed to load application history.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const totalApplied = applications.length;
  const underReview = applications.filter(a => ['Submitted', 'Under Review'].includes(a.status)).length;
  const interviews = applications.filter(a => a.status === 'Interview Scheduled').length;
  const offers = applications.filter(a => a.status === 'Selected').length;

  const stats = [
    { label: 'Applications Sent', value: totalApplied, color: 'purple' },
    { label: 'Under Review', value: underReview, color: 'teal' },
    { label: 'Interviews', value: interviews, color: 'pink' },
    { label: 'Offers', value: offers, color: 'yellow' },
  ];

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

  const recentApplications = applications.slice(0, 5);

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>Welcome, Candidate</h1>
        <p>Track your applications and manage your profile</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
          <p>Loading your dashboard details...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--danger)' }}>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div className={`stat-card ${stat.color}`} key={i}>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid-2">
            <div className="table-container" style={{ gridColumn: 'span 2' }}>
              <div className="table-header">
                <h3>My Recent Applications</h3>
                <Link to="/candidate/applications" className="btn btn-secondary btn-sm">View All →</Link>
              </div>
              
              {recentApplications.length === 0 ? (
                <div className="empty-state" style={{ padding: '3rem 1rem' }}>
                  <p>You haven't submitted any job applications yet.</p>
                  <Link to="/jobs" className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }}>Find a Job</Link>
                </div>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Position</th>
                      <th>Branch</th>
                      <th>Status</th>
                      <th>Applied Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentApplications.map((app) => {
                      const positionTitle = app.jobId?.title || 'Unknown Role';
                      const branchName = app.jobId?.branch?.name || app.jobId?.branch || 'Remote';
                      const dateString = app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A';
                      
                      return (
                        <tr key={app._id || app.id}>
                          <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{positionTitle}</td>
                          <td><span className="job-meta-item">{branchName}</span></td>
                          <td><span className={`badge ${getStatusBadge(app.status)}`}>{app.status}</span></td>
                          <td>{dateString}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="card" style={{ marginTop: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Quick Actions</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/jobs" className="btn btn-primary">Browse Jobs</Link>
              <Link to="/candidate/profile" className="btn btn-secondary">Edit Profile</Link>
              <Link to="/candidate/applications" className="btn btn-secondary">All Applications</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CandidateDashboard;
