import React from 'react';
import { Link } from 'react-router-dom';

const CandidateDashboard = () => {
  const stats = [
    { label: 'Applications Sent', value: '5', icon: '📄', color: 'purple' },
    { label: 'Under Review', value: '2', icon: '🔍', color: 'teal' },
    { label: 'Interviews', value: '1', icon: '📅', color: 'pink' },
    { label: 'Offers', value: '0', icon: '🎉', color: 'yellow' },
  ];

  const myApplications = [
    { id: 1, position: 'Senior React Developer', branch: 'Islamabad', status: 'Shortlisted', date: '2026-05-10' },
    { id: 2, position: 'UI/UX Designer', branch: 'Lahore', status: 'Under Review', date: '2026-05-08' },
    { id: 3, position: 'Product Manager', branch: 'Islamabad', status: 'Interview Scheduled', date: '2026-05-05' },
    { id: 4, position: 'Backend Engineer', branch: 'Karachi', status: 'Submitted', date: '2026-05-03' },
    { id: 5, position: 'DevOps Engineer', branch: 'Remote', status: 'Rejected', date: '2026-04-28' },
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

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>👋 Welcome, Candidate</h1>
        <p>Track your applications and manage your profile</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div className={`stat-card ${stat.color}`} key={i}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="table-container" style={{ gridColumn: 'span 2' }}>
          <div className="table-header">
            <h3>📋 My Recent Applications</h3>
            <Link to="/candidate/applications" className="btn btn-secondary btn-sm">View All →</Link>
          </div>
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
              {myApplications.map((app) => (
                <tr key={app.id}>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{app.position}</td>
                  <td><span className="job-meta-item">📍 {app.branch}</span></td>
                  <td><span className={`badge ${getStatusBadge(app.status)}`}>{app.status}</span></td>
                  <td>{app.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>🚀 Quick Actions</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/jobs" className="btn btn-primary">🔍 Browse Jobs</Link>
          <Link to="/candidate/profile" className="btn btn-secondary">✏️ Edit Profile</Link>
          <Link to="/candidate/applications" className="btn btn-secondary">📄 All Applications</Link>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
